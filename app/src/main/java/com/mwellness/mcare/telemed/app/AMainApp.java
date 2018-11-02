package com.mwellness.mcare.telemed.app;

import android.app.ActivityManager;
import android.app.Application;
import android.bluetooth.BluetoothAdapter;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;
import android.text.SpannableStringBuilder;
import android.text.style.RelativeSizeSpan;
import android.view.Gravity;
import android.widget.TextView;
import android.widget.Toast;

import com.mwellness.mcare.telemed.R;
import com.mwellness.mcare.telemed.app.jsinterfaces.AMainPreferences;
import com.mwellness.mcare.telemed.bootstrap.utils.GsonUtils;
import com.mwellness.mcare.telemed.storage.roomdb.VitalsRecordDao;
import com.mwellness.mcare.telemed.storage.roomdb.VitalsSqliteDatabase;


/**
 *
 */
public class AMainApp extends Application {


    public static final String SHARED_PREF_NAME = "MCARE_TELEMED_PREF";
    public static final String AUTH0_CLIENT_ID = "cUV13sDbkOCQFuho580kh94IEcMeUi30";
    public static APatientProfile aPatientProfile = new APatientProfile();

    private static void log(String str) {
        ALog.log(AMainApp.class, str);
    }

    private static Context appContext;
    private static AMainApp app;

    public BluetoothAdapter mBtAdapter;

    public AMainApp() {

    }


    public static Context getAppContext() {
        return appContext;
    }
    public static AMainApp getAppInstance() {
        return app;
    }

    @Override
    public void onCreate() {

        super.onCreate();
        appContext = this;
        app = this;


        AMainTts.getInstance().speak(" ");


        new Thread(new Runnable() {
            @Override
            public void run() {
                log("Deleting all synchronized vitals");
                VitalsRecordDao dao = VitalsSqliteDatabase.getInstance(AMainApp.getAppContext()).dao();
                dao.deleteAllSynchronizedVitals();

            }
        }).start();



        LocalBroadcastManager.getInstance(this).registerReceiver(mBroadcastReceiver, new IntentFilter(AMainActivity.COMMON_LOCAL_BROADCAST_ACTION));
        log(AMainPreferences.getInstance().getAll());



        mBtAdapter = BluetoothAdapter.getDefaultAdapter();
        if(mBtAdapter != null && !mBtAdapter.isEnabled()) {
            log("Enabling Adapter");
            mBtAdapter.enable();
        }


    }



    private boolean isMyServiceRunning(Class<?> serviceClass) {
        ActivityManager manager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }


    public static void setCredentialDetails(String email, String auth0UserId, String accessToken, String idToken, String name, String fname, String lname, String pictureUrl) {

        AMainPreferences preferences = AMainPreferences.getInstance();

        log("TOKEN RECEIVED ... ");
        log(email + ", " + auth0UserId + ", " + accessToken + ", " + idToken);

        preferences.setString(AMainPreferences.PREF_KEY_EMAIL, email);
        aPatientProfile.setEmail(email);

        preferences.setString(AMainPreferences.PREF_KEY_AUTH0_USER_ID, auth0UserId);
        aPatientProfile.setAuth0UserId(auth0UserId);

        preferences.setString(AMainPreferences.PREF_KEY_ACCESS_TOKEN, accessToken);
        aPatientProfile.setAccessToken(accessToken);

        preferences.setString(AMainPreferences.PREF_KEY_ID_TOKEN, idToken);
        aPatientProfile.setAuth0IdToken(idToken);

        preferences.setString(AMainPreferences.PREF_KEY_FNAME, fname);
        aPatientProfile.setFname(fname);

        preferences.setString(AMainPreferences.PREF_KEY_LNAME, lname);
        aPatientProfile.setLname(lname);

        preferences.setString(AMainPreferences.PREF_KEY_FULL_NAME, name);
        aPatientProfile.setFullName(name);

        preferences.setString(AMainPreferences.PREF_KEY_PICTURE_URL, pictureUrl);
        aPatientProfile.setPictureUrl(pictureUrl);

        String patientProfileJsonStr = GsonUtils.getInstance().toJson(aPatientProfile);
        preferences.setString(AMainPreferences.PREF_KEY_PATIENT_PROFILE, patientProfileJsonStr);

        //log(GsonUtils.getInstance(true).toJson(preferences.getAll()));
        log(GsonUtils.getInstance(true).toJson(aPatientProfile));


        AMainState.setNewCurrentState(AMainState.STATE_AUTHORIZED);
    }


    public static final int MAIN_EVENT_MOBILE_BATTERY_UPDATE = 61002;
    public static final int MAIN_EVENT_INTERNET_STATUS_UPDATE = 61003;



    public BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {

            log("Received Broadcast: " + intent.getAction() + ": " + intent.getIntExtra(AMainActivity.BROADCAST_ACTION_WEBVIEW_EVENT_TYPE_KEY, -1));

            switch(intent.getAction()) {

                case AMainActivity.COMMON_LOCAL_BROADCAST_ACTION: {

                    // Get extra data included in the Intent
                    int eventType = intent.getIntExtra(AMainActivity.BROADCAST_ACTION_WEBVIEW_EVENT_TYPE_KEY, -1);
                    switch (eventType) {



                        case MAIN_EVENT_MOBILE_BATTERY_UPDATE: {


                            int mobileBattery = intent.getIntExtra("mobileBattery", -1);

                            log("Received Mobile Battery: " + mobileBattery);

                            Intent i = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.WEBVIEW_EVENT_MOBILE_BATTERY_UPDATE);
                            i.putExtra("mobileBattery", mobileBattery);
                            LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i);

                            break;
                        }

                        case MAIN_EVENT_INTERNET_STATUS_UPDATE: {

                            boolean internetStatus = intent.getBooleanExtra("internetStatus", false);

                            log("Received Internet Status: " + internetStatus);

                            Intent i = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.WEBVIEW_EVENT_INTERNET_STATUS_UPDATE);
                            i.putExtra("internetStatus", internetStatus);
                            LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i);

                            break;
                        }


                    }

                    break; // case-break
                }

            }
        }
    };





    @Override
    public void onLowMemory() {
        super.onLowMemory();
        log("onLowMemory()");
    }


    @Override
    public void onTerminate() {
        super.onTerminate();

        log("onTerminate()");

        // close database for vitals if open
        if(VitalsSqliteDatabase.getInstance(this).isOpen())
            VitalsSqliteDatabase.getInstance(this).close();


    }




    public static void showLongToast(final String str2, Context context) {

        try {
            SpannableStringBuilder biggerText2 = new SpannableStringBuilder(str2);
            biggerText2.setSpan(new RelativeSizeSpan(1.5f), 0, str2.length(), 0);
            Toast toast2 = Toast.makeText(context, biggerText2, Toast.LENGTH_LONG);
            TextView v2 = (TextView) toast2.getView().findViewById(android.R.id.message);
            if (v2 != null) v2.setGravity(Gravity.CENTER);
            toast2.getView().setBackground(context.getResources().getDrawable(R.drawable.toast_bg));

            toast2.show();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }


    public static void showShortToast(final String str, Context context) {
        //mHandler.obtainMessage(AMainApp.MESG_SHORT_TOAST, str).sendToTarget();

        try {
            SpannableStringBuilder biggerText = new SpannableStringBuilder(str);
            biggerText.setSpan(new RelativeSizeSpan(1.5f), 0, str.length(), 0);
            Toast toast = Toast.makeText(context, biggerText, Toast.LENGTH_SHORT);
            TextView v = (TextView) toast.getView().findViewById(android.R.id.message);
            if (v != null) v.setGravity(Gravity.CENTER);
            //toast.getView().setBackgroundColor(Color.argb(235, 88, 55, 55));
            toast.getView().setBackground(context.getResources().getDrawable(R.drawable.toast_bg));
            toast.show();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }


}

