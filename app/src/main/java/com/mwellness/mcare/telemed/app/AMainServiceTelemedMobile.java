package com.mwellness.mcare.telemed.app;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.BatteryManager;
import android.os.Binder;
import android.os.IBinder;
import android.support.annotation.Nullable;

import com.mwellness.mcare.telemed.R;
import com.mwellness.mcare.telemed.app.constants.ServerSettings;
import com.mwellness.mcare.telemed.app.jsinterfaces.AMainPreferences;
import com.mwellness.mcare.telemed.bootstrap.http.AMainHttpClient;
import com.mwellness.mcare.telemed.bootstrap.utils.GsonUtils;
import com.mwellness.mcare.telemed.storage.roomdb.VitalsRecord;
import com.mwellness.mcare.telemed.storage.roomdb.VitalsRecordDao;
import com.mwellness.mcare.telemed.storage.roomdb.VitalsSqliteDatabase;
import com.mwellness.mcare.telemed.vitals.Vitals;

import java.io.IOException;

import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class AMainServiceTelemedMobile extends Service {

    public static AMainServiceTelemedMobile mService = null;
    public static Context mContext = null;

    private final IBinder mBinder = new LocalBinder();

    private static Notification notification;


    private static boolean serviceRunning = false;
    private long VITAL_SYNC_LOOP_WAIT_TIME_MS = 10000;


    public class LocalBinder extends Binder {
        public AMainServiceTelemedMobile getService() {
            return AMainServiceTelemedMobile.this;
        }
    }


    public static void log(String str) {
        ALog.log(AMainServiceTelemedMobile.class, str);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {

        return mBinder;
    }

    @Override
    public boolean onUnbind(Intent intent) {

        return super.onUnbind(intent);
    }



    private static PendingIntent getContentIntent() {
        Intent showTaskIntent = new Intent(mContext, AMainActivity.class);

        showTaskIntent.setAction(Intent.ACTION_MAIN);
        showTaskIntent.addCategory(Intent.CATEGORY_LAUNCHER);
        showTaskIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        PendingIntent contentIntent = PendingIntent.getActivity(
                mContext, 0, showTaskIntent,
                PendingIntent.FLAG_UPDATE_CURRENT);

        return contentIntent;
    }



    @Override
    public void onCreate() {
        super.onCreate();

        log("onCreate()");

        mService = this;
        mContext = this;


        notification = new Notification.Builder(
                mContext).setSmallIcon(R.drawable.ic_launcher)
                .setContentTitle("mWellness")
                .setContentText("Cloud Sync Running ... ")
                //.setWhen(System.currentTimeMillis())
                .setContentIntent(getContentIntent()).build();



    }






    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        log("onStartCommand()");

        serviceRunning = true;

        // start vital sync loop
        new Thread(new Runnable() {
            @Override
            public void run() {

                /*createDummyVitalRecords();

                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }*/
                runVitalSyncLoop();

            }
        }).start();


        return Service.START_STICKY;
    }


    @Override
    public void onDestroy() {

        serviceRunning = false;


        log("service: onDestroy()");
        super.onDestroy();

    }



    /**
     * Get the current battery level
     */
    private void getCurrentBatteryLevel() {

        IntentFilter ifilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        Intent batteryStatus = registerReceiver(null, ifilter);

        int status = batteryStatus.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        boolean isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING ||
                status == BatteryManager.BATTERY_STATUS_FULL;

        int level = batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, -1);

        float batteryPct = 100 * (level / (float)scale);


        log("Battery Received: " + batteryPct + "%");

        /*Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainApp.MAIN_EVENT_MOBILE_BATTERY_UPDATE);
        i7.putExtra("mobileBattery", (int) batteryPct);
        i7.putExtra("isCharging", isCharging);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);*/

    }


    /**
     * Get Current Internet Status ...
     */
    private void getInternetStatus() {
        ConnectivityManager cm =
                (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);

        NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
        boolean isConnected = activeNetwork != null &&
                activeNetwork.isConnectedOrConnecting();

        /*Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainApp.MAIN_EVENT_INTERNET_STATUS_UPDATE);
        i7.putExtra("internetStatus", isConnected);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);*/

    }


    /**
     * Sync Vital Data with Cloud for current User Logged In
     * If Internet Is Available
     *      Make call when new vitals in taken ...
     *      TODO: Also make call during some automatic alarm every 30 minutes ...
     */

    public static volatile boolean vitalSyncLoopRunning = false;
    public void runVitalSyncLoop() {

        log(" ");
        log("     = Vital Sync Loop Called = ");
        log(" ");

        if(vitalSyncLoopRunning) {
            log("Already Running. Quitting ... ");
            return;
        }

        new Thread(new Runnable() {
            @Override
            public void run() {

                if(vitalSyncLoopRunning) {
                    log("Already Running. Quitting ... ");
                    return;
                }

                vitalSyncLoopRunning = true;

                final String userId = AMainPreferences.getInstance().getString(AMainPreferences.PREF_KEY_AUTH0_USER_ID);
                final String email = AMainPreferences.getInstance().getString(AMainPreferences.PREF_KEY_EMAIL);
                final String token = AMainPreferences.getInstance().getString(AMainPreferences.PREF_KEY_ID_TOKEN);


                log("Syncing vitals for user " + userId + " (" + email + ")");

                VitalsRecordDao dao = VitalsSqliteDatabase.getInstance(AMainApp.getAppContext()).dao();
                VitalsRecord[] vitalsRecordsNotSyncedForUserId = dao.getVitalsNotSyncedAsc(userId);

                OkHttpClient httpClient = AMainHttpClient.getInstance().getHttpClient();
                log(vitalsRecordsNotSyncedForUserId.length + " records left to sync");

                if(vitalsRecordsNotSyncedForUserId.length > 0) {
                    startForeground(1, notification);
                }

                for(VitalsRecord vitalsRecord: vitalsRecordsNotSyncedForUserId) {

                    log("Attempting to Sync: " + GsonUtils.getInstance(true).toJson(vitalsRecord));

                    String URL = "";
                    RequestBody requestPostBody;

                    if(vitalsRecord.getVitalType() == Vitals.VITAL_TYPE_ECG) {
                        URL = ServerSettings.HTTP_SCHEME + "://" + ServerSettings.APP_SERVER_IP + ServerSettings.APP_SERVER_PORT_SUFFIX + "/vitals/ecgstrip";
                        requestPostBody = new MultipartBody.Builder()
                                .setType(MultipartBody.FORM)
                                .addFormDataPart("ecgstripB64", vitalsRecord.getV1() + "")
                                .addFormDataPart("timestampMs", vitalsRecord.getTimestampMs() + "")
                                .build();
                    }
                    else if(vitalsRecord.getVitalType() == Vitals.VITAL_TYPE_PHOTO) {
                        URL = ServerSettings.HTTP_SCHEME + "://" + ServerSettings.APP_SERVER_IP + ServerSettings.APP_SERVER_PORT_SUFFIX + "/vitals/photos";
                        requestPostBody = new MultipartBody.Builder()
                                .setType(MultipartBody.FORM)
                                .addFormDataPart("photoB64", vitalsRecord.getV1() + "")
                                .addFormDataPart("timestampMs", vitalsRecord.getTimestampMs() + "")
                                .build();
                    }
                    else {
                        URL = ServerSettings.HTTP_SCHEME + "://" + ServerSettings.APP_SERVER_IP + ServerSettings.APP_SERVER_PORT_SUFFIX + "/vitals";
                        requestPostBody = new MultipartBody.Builder()
                                .setType(MultipartBody.FORM)
                                .addFormDataPart("vitalType", vitalsRecord.getVitalType() + "")
                                .addFormDataPart("v1", vitalsRecord.getV1() + "")
                                .addFormDataPart("v2", vitalsRecord.getV2() + "")
                                .addFormDataPart("v3", vitalsRecord.getV3() + "")
                                .addFormDataPart("timestampMs", vitalsRecord.getTimestampMs() + "")
                                .build();
                    }


                    Request request = new Request.Builder().addHeader("Authorization", "Bearer " + token).url(URL)
                            .method("POST", RequestBody.create(null, new byte[0]))
                            .post(requestPostBody)
                            .build();

                    try {
                        Response response = httpClient.newCall(request).execute();
                        final String responseBodyStr = response.body().string();
                        final int responseCode = response.code();

                        if((responseCode == 500 && responseBodyStr.contains("Duplicate entry"))) {
                            final long syncedAckMs = System.currentTimeMillis();
                            log("Setting Record " + vitalsRecord.getRecordId() + " Synced at " + syncedAckMs);
                            dao.setVitalRecordSynced(vitalsRecord.getRecordId(), syncedAckMs);
                        }
                        else if(responseCode == 200) {
                            log("Response: " + responseBodyStr);
                            if(responseBodyStr.contains("SUCCESS")) {
                                final long syncedAckMs = System.currentTimeMillis();
                                log("Setting Record " + vitalsRecord.getRecordId() + " Synced at " + syncedAckMs);
                                dao.setVitalRecordSynced(vitalsRecord.getRecordId(), syncedAckMs);
                            }
                            else {
                                dao.setVitalRecordSynced(vitalsRecord.getRecordId(), -500);
                            }
                        }
                        else {
                            log("Status in not 200.");
                            dao.setVitalRecordSynced(vitalsRecord.getRecordId(), -500);
                        }


                    } catch (IOException e) {
                        e.printStackTrace();
                        vitalSyncLoopRunning = false;
                        break;
                    }



                    // wait for some time
                    try {
                        Thread.sleep(200);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } // end: for-each-unsent-vital-record


                log("Outside sync loop!");


                stopForeground(true);
                vitalSyncLoopRunning = false;


                final long waitTime = 10000;
                log("Waiting for " + waitTime + " ms");
                try {
                    Thread.sleep(VITAL_SYNC_LOOP_WAIT_TIME_MS);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                runVitalSyncLoop();

            }}).start();
    }


    /**
     * Method to generate a group of dummy vitals in database ...
     */
    private void createDummyVitalRecords() {

        final String userId = AMainPreferences.getInstance().getString(AMainPreferences.PREF_KEY_AUTH0_USER_ID);
        final String email = AMainPreferences.getInstance().getString(AMainPreferences.PREF_KEY_EMAIL);


        VitalsRecordDao dao = VitalsSqliteDatabase.getInstance(AMainApp.getAppContext()).dao();

        int i = 5;
        dao.insertVital(new VitalsRecord(userId, email, Vitals.VITAL_TYPE_SPO2, "98", "72", "", System.currentTimeMillis() - (1000*i)));

        i--;
        dao.insertVital(new VitalsRecord(userId, email, Vitals.VITAL_TYPE_SPO2, "98", "71", "", System.currentTimeMillis() - (1000*i)));

        i--;
        dao.insertVital(new VitalsRecord(userId, email, Vitals.VITAL_TYPE_SPO2, "99", "70", "", System.currentTimeMillis() - (1000*i)));

        i--;
        dao.insertVital(new VitalsRecord(userId, email, Vitals.VITAL_TYPE_SPO2, "99", "74", "", System.currentTimeMillis() - (1000*i)));

        i--;
        dao.insertVital(new VitalsRecord(userId, email, Vitals.VITAL_TYPE_SPO2, "99", "73", "", System.currentTimeMillis() - (1000*i)));
    }


}
