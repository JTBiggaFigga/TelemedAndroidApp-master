package com.mwellness.mcare.telemed.app;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.BatteryManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.support.annotation.NonNull;
import android.support.v4.content.LocalBroadcastManager;
import android.view.View;
import android.view.Window;
import android.webkit.CookieManager;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.mwellness.mcare.telemed.BuildConfig;
import com.mwellness.mcare.telemed.R;
import com.mwellness.mcare.telemed.app.constants.ServerSettings;
import com.mwellness.mcare.telemed.app.jsinterfaces.AAuth0WebViewJsInterface;
import com.mwellness.mcare.telemed.app.jsinterfaces.AMainPreferences;
import com.mwellness.mcare.telemed.app.jsinterfaces.BTReadingsJsInterface;
import com.mwellness.mcare.telemed.app.jsinterfaces.JSReferencesJsInterface;
import com.mwellness.mcare.telemed.bootstrap.http.AMainHttpClient;
import com.mwellness.mcare.telemed.bootstrap.utils.GsonUtils;
import com.mwellness.mcare.telemed.vitals.Vitals;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.ref.WeakReference;
import java.security.NoSuchAlgorithmException;

import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class AMainActivity extends Activity implements ConfirmationDialogFragment.Listener {

    private static WebView mWebView;
    public static Handler activityHandler;
    private static WeakReference<AMainActivity> activityRef;


    static boolean active = false;

    private static void log(String str) {
        ALog.log(AMainActivity.class, str);
    }



    @Override
    public void onSaveInstanceState(Bundle outState) {
        outState.putBoolean("ALREADY_RUNNING", true);
        super.onSaveInstanceState(outState);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {

        log("Request Permission Result Available ... ");
        if (requestCode == 1) {

            if(grantResults.length > 0) {
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {


                } else {

                }
            }

            startServices();

        }


    }


    private void startServices() {

        String currAuthState = AMainState.getCurrentState();

        // if authorized
        if(currAuthState.equals(AMainState.STATE_AUTHORIZED) && !currAuthState.equals("")) {
            // if service not running ... run service
            // another place to start service in at globalexceptionhandler
            switch (BuildConfig.APP_NAME) {

                case "TelemedMobile": {
                    if (!isMyServiceRunning(AMainServiceTelemedMobile.class)) {
                        log("Service not running. Starting TelemedMobile Service");
                        Intent serviceIntent = new Intent(this, AMainServiceTelemedMobile.class);
                        startService(serviceIntent);
                    } else {
                        log("Service for TelemedMobile already running ... not doing anything ... ");
                    }
                    break;
                }

            }

        }


        // getting gps, battery and internet status
        new Thread(new Runnable() {
            @Override
            public void run() {

                getGps();

                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }



                getCurrentBatteryLevel();
                getInternetStatus();
            }
        }).start();


    }

    public static WeakReference<AMainActivity> getWeakRef() {
        return activityRef;
    }

    @Override
    protected void onStart() {
        super.onStart();

        LocalBroadcastManager.getInstance(this).registerReceiver(webViewReceiver, new IntentFilter(COMMON_LOCAL_BROADCAST_ACTION));

        // init TTS
        AMainTts.getInstance();

        // request permissions
        int pCheck = this.checkSelfPermission("Manifest.permission.ACCESS_FINE_LOCATION");
        pCheck += this.checkSelfPermission("Manifest.permission.ACCESS_COARSE_LOCATION");
        pCheck += this.checkSelfPermission("Manifest.permission.BLUETOOTH_ADMIN");
        pCheck += this.checkSelfPermission("Manifest.permission.BLUETOOTH_PRIVILEGED");
        pCheck += this.checkSelfPermission("Manifest.permission.BLUETOOTH");
        pCheck += this.checkSelfPermission("Manifest.permission.WRITE_EXTERNAL_STORAGE");
        pCheck += this.checkSelfPermission("Manifest.permission.CAMERA");
        pCheck += this.checkSelfPermission("Manifest.permission.RECORD_AUDIO");
        pCheck += this.checkSelfPermission("Manifest.permission.RECORD_VIDEO");
        pCheck += this.checkSelfPermission("android.webkit.resource.VIDEO_CAPTURE");
        pCheck += this.checkSelfPermission("android.webkit.resource.AUDIO_CAPTURE");

        log("pCheck: " + pCheck);


        if(pCheck != 0) {
            this.requestPermissions(new String[]{
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION,
                    Manifest.permission.BLUETOOTH_ADMIN,
                    Manifest.permission.BLUETOOTH_PRIVILEGED,
                    Manifest.permission.BLUETOOTH,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE,
                    Manifest.permission.CAMERA,
                    Manifest.permission.RECORD_AUDIO,
                    PermissionRequest.RESOURCE_VIDEO_CAPTURE,
                    PermissionRequest.RESOURCE_AUDIO_CAPTURE
            }, 1);
        }
        else {
            startServices();
        }

        active = true;



    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        log("onCreate()");

        //Remove title bar
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        setContentView(R.layout.activity_auth0_webview);




        activityRef = new WeakReference<>(this);

        // creating handler for few events
        if(activityHandler == null) {
            activityHandler = new AMainActivityHandler(activityRef);
        }

        mWebView = (WebView) findViewById(R.id.sleepWebView);




    }


    boolean isWebviewLoaded = false;

    @Override
    protected void onResume() {
        super.onResume();

        log("   ");
        log("======================================");
        log("onResume()");

        if(mWebView.getOriginalUrl() != null) {
            log("Webview already loaded with a url. Returning ... ");
            return;
        }

        initWebView(mWebView);

        String currAuthState = AMainState.getCurrentState();

        // if authorized
        if(currAuthState.equals(AMainState.STATE_AUTHORIZED) && !currAuthState.equals("")) {
            loadHomeUrl();
        }
        else {

            AMainState.setNewCurrentState(AMainState.STATE_UNAUTHORIZED);

            log("UNAUTHORIZED ... going to " + getLoginUrl());
            try {
                //mWebView.loadUrl("http://" + ServerSettings.APP_SERVER_IP + ":3099/login");
                showLoginPage();

            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }
    }




    @Override
    protected void onPause() {
        super.onPause();

        //AMainApp.showSignal = false;

        //LocalBroadcastManager.getInstance(this).unregisterReceiver(webViewReceiver);

        log("onPause() Called");

        setIsWebviewLoaded(isWebviewLoaded);

        //finish();
    }

    @Override
    protected void onStop() {
        super.onStop();

        log("onStop()");


    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        log("onDestroy()");

        AMainTts.getInstance().shutdownTts();

        active = false;

        setIsWebviewLoaded(false);

        LocalBroadcastManager.getInstance(this).unregisterReceiver(webViewReceiver);

        finish();
    }


    private void setServerSettings() {

    }

    /**
     * Initializing the WebView.
     */
    protected void initWebView(WebView mWebView) {

        //View root = mWebView.getRootView();
        //root.setBackgroundColor(getResources().getColor(android.R.color.black));

        //mWebView.clearCache(true);


        WebView.setWebContentsDebuggingEnabled(true);

        mWebView.addJavascriptInterface(AAuth0WebViewJsInterface.getInstance(activityRef), "JV_TMAuth0Java");
        mWebView.addJavascriptInterface(AMainPreferences.getInstance(), "JV_SharedPreferences");
        mWebView.addJavascriptInterface(JSReferencesJsInterface.getInstance(), "JV_JSReferences");
        mWebView.addJavascriptInterface(BTReadingsJsInterface.getInstance(), "JV_BTReadings");

        mWebView.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                return true;
            }
        });
        mWebView.setLongClickable(false);
        mWebView.clearCache(false);

        mWebView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                log(error.getErrorCode() + ": " + error.getDescription());
            }

            /*@Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return false;
            }*/

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {

                view.loadUrl(url);
                return false;
            }

            @Override
            public void onPageFinished(WebView view, final String url) {
                log("Page Loading Finished ... " + url);
                if(url.contains("index.html")) {
                    setServerSettings();
                }
                setIsWebviewLoaded(true);
            }

        });



        mWebView.setWebChromeClient(new WebChromeClient() {

            @Override
            public void onPermissionRequest(final PermissionRequest request) {


                log("Permission request: " + GsonUtils.getInstance().toJson(request.getResources()));
                log("Permission request from: " + request.getOrigin().getPath());

                activityRef.get().runOnUiThread(new Runnable() {

                    @Override
                    public void run() {
                        request.grant(request.getResources());
                    }
                });

                /*mPermissionRequest = request;
                ConfirmationDialogFragment
                    .newInstance(request.getResources())
                   .show(getFragmentManager(), FRAGMENT_DIALOG);
                   */


            }
        });


        WebSettings webSettings = mWebView.getSettings();
        webSettings.setDomStorageEnabled(true);
        webSettings.setJavaScriptEnabled(true);
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);

        //webSettings.setUserAgentString("Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30");

        webSettings.setAllowUniversalAccessFromFileURLs(true);

        CookieManager cookieManager = CookieManager.getInstance();
        /*cookieManager.removeAllCookies(new ValueCallback<Boolean>() {
            @Override
            public void onReceiveValue(Boolean aBoolean) {}
        });*/
        cookieManager.setAcceptCookie(true);
        webSettings.setSaveFormData(false);

    }




    private void getGps() {
        // get GPS location
        new Thread(new Runnable() {

            @SuppressLint("MissingPermission")
            @Override
            public void run() {

                Looper.prepare();

                log("GPS: Getting current location ... ");
                LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
                Location location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                if(location != null) {
                    syncUserLocation(location.getLatitude(), location.getLongitude());
                }
                else {
                    location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                    if(location != null) {
                        syncUserLocation(location.getLatitude(), location.getLongitude());
                    }
                    else {
                        log("GPS: location is null. Requesting Location Updates ... ");
                        locationManager.requestLocationUpdates(
                            LocationManager.NETWORK_PROVIDER, 5000, 10, new LocationListener() {
                                @Override
                                public void onLocationChanged(Location location) {
                                    log("GPS: onLocationChanged: locationListener: " + location.getLatitude() + "," + location.getLongitude());
                                    syncUserLocation(location.getLatitude(), location.getLongitude());
                                    locationManager.removeUpdates(this);
                                }

                                @Override
                                public void onStatusChanged(String s, int i, Bundle bundle) {

                                }

                                @Override
                                public void onProviderEnabled(String s) {

                                }

                                @Override
                                public void onProviderDisabled(String s) {

                                }
                            });
                    }
                }

                log((location == null)?"GPS: location is null":"GPS: Location: " + location.getLatitude() + "," + location.getLongitude());

            }
        }).start();
    }



    /**
     * Sync Location with Current User ...
     * @param lat
     * @param lng
     */
    private void syncUserLocation(final double lat, final double lng) {

        log("GPS: Syncing " + lat + ", " + lng);

        final String userId = AMainPreferences.getInstance().getString(AMainPreferences.PREF_KEY_AUTH0_USER_ID);
        final String token = AMainPreferences.getInstance().getString(AMainPreferences.PREF_KEY_ID_TOKEN);
        final String URL = ServerSettings.HTTP_SCHEME +"://"+ ServerSettings.APP_SERVER_IP + ServerSettings.APP_SERVER_PORT_SUFFIX + "/location";
        final long timestamp = System.currentTimeMillis();

        OkHttpClient httpClient = AMainHttpClient.getInstance().getHttpClient();

        RequestBody requestPostBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("userId", userId + "")
                .addFormDataPart("lat", lat + "")
                .addFormDataPart("lng", lng + "")
                .addFormDataPart("timestamp", timestamp + "")
                .build();

        Request request = new Request.Builder().addHeader("Authorization", "Bearer " + token).url(URL)
                .method("POST", RequestBody.create(null, new byte[0]))
                .post(requestPostBody)
                .build();

        try {
            Response response = httpClient.newCall(request).execute();
            final String responseBodyStr = response.body().string();
            final int responseCode = response.code();

            if(responseCode == 200 && responseBodyStr.contains("SUCCESS")) {
                log("Sync Success");
            }
            else {
                log("bah humbug!");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }




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

        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainApp.MAIN_EVENT_MOBILE_BATTERY_UPDATE);
        i7.putExtra("mobileBattery", (int) batteryPct);
        i7.putExtra("isCharging", isCharging);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);

    }

    private void getInternetStatus() {
        ConnectivityManager cm =
                (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);

        NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
        boolean isConnected = activeNetwork != null &&
                activeNetwork.isConnectedOrConnecting();

        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainApp.MAIN_EVENT_INTERNET_STATUS_UPDATE);
        i7.putExtra("internetStatus", isConnected);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);

    }


    private void showLoginPage() throws UnsupportedEncodingException, NoSuchAlgorithmException {
        mWebView.loadUrl(getLoginUrl());
    }

    private String getLoginUrl() {
        return "http://"+ServerSettings.APP_SERVER_IP +":3099/login";
    }


    public static final String authCallbackUrl = "http://"+ServerSettings.APP_SERVER_IP +":3099/mobile/codereceiver";


    private void startTransmissionAndGpsService() {

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


    private PermissionRequest mPermissionRequest;

    @Override
    public void onConfirmation(boolean allowed, String[] resources) {
        log("Allowed? " + allowed);
        if (allowed) {
            mPermissionRequest.grant(resources);
        } else {
            mPermissionRequest.deny();
        }
        mPermissionRequest = null;
    }

    private boolean getIsWebviewLoaded() {
        return AMainPreferences.getInstance().getBoolean("IS_WEBVIEW_LOADED");
    }

    private void setIsWebviewLoaded(boolean isLoaded) {
        AMainPreferences.getInstance().setBoolean("IS_WEBVIEW_LOADED", isLoaded);
    }

    public void openAppHomeUrl() {
        log("OPENING APP HOME ACTIVITY");

        Intent i = createLocalBroadcastEventIntent(WEBVIEW_EVENT_LOAD_PATIENT_HOME);
        LocalBroadcastManager.getInstance(this).sendBroadcast(i);

    }

    /**
     * Creates a Webview Loader Intent for Local Broadcast Events
     * @return
     */
    public static Intent createLocalBroadcastEventIntent(int BROADCAST_EVENT_TYPE) {
        Intent intent = new Intent(COMMON_LOCAL_BROADCAST_ACTION);
        intent.putExtra(BROADCAST_ACTION_WEBVIEW_EVENT_TYPE_KEY, BROADCAST_EVENT_TYPE);
        return intent;
    }


    // WEBVIEW BROADCAST RECEIVER
    public static final String COMMON_LOCAL_BROADCAST_ACTION = "COMMON_LOCAL_BROADCAST_ACTION";
    public static final String BROADCAST_ACTION_WEBVIEW_EVENT_TYPE_KEY = "BROADCAST_ACTION_WEBVIEW_EVENT_TYPE_KEY";


    public static final int WEBVIEW_EVENT_LOAD_PATIENT_HOME = 50002;
    public static final int WEBVIEW_EVENT_UPDATE_STATE_VARS = 50003;

    public static final int WEBVIEW_EVENT_ECG_BATTERY_UPDATE = 51001;
    public static final int WEBVIEW_EVENT_MOBILE_BATTERY_UPDATE = 51002;
    public static final int WEBVIEW_EVENT_INTERNET_STATUS_UPDATE = 51003;


    public static final int BT_EVENT_SPP_DEVICES_DISCOVERED_LIST_READY = 70000;
    public static final int BT_EVENT_BLE_DEVICES_DISCOVERED_LIST_READY = 71000;
    public static final int BT_EVENT_DEVICE_PAIRING_SUCCESS = 70001;
    public static final int BT_EVENT_DEVICE_PAIRING_FAILED = 70002;


    public static final int BT_EVENT_DEVICE_READING_ERROR = 70003;
    public static final int BT_EVENT_DEVICE_READING_TIMEOUT = 70004;
    public static final int BT_EVENT_SPP_DEVICE_READING_CONNECTED = 70005;
    public static final int BT_EVENT_BLE_DEVICE_READING_CONNECTED = 72001;
    public static final int BT_EVENT_DEVICE_READING_FINISHED = 70006;
    public static final int BT_EVENT_DEVICE_READING_MINI_MESSAGE = 70007;
    public static final int BT_EVENT_SPP_DEVICE_NOT_PAIRED_FOR_CONNECT = 70008;

    public static final int EVENT_FAROS_NEW_ONE_SECOND_DATA = 80001;

    private void loadHomeUrl() {

        mWebView.loadUrl(ServerSettings.NG_URL);



    }

    private void ngMainAppFunctionCall(final String fnCall, final long millisDelay) {
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                String mainCompRef = JSReferencesJsInterface.getInstance().getJsMainAppReferenceStr();
                log("Calling javascript function: " + fnCall);
                mWebView.loadUrl("javascript:window['"+mainCompRef+"']."+fnCall+";");
            }
        }, millisDelay);
    }

    private static long lastHomeLoadedAt = -1;
    private BroadcastReceiver webViewReceiver = new BroadcastReceiver() {

        private void updateStateVarsInWebView() {

            log("updating JS state variables");

            //loadWebViewWithUrl("javascript: SleepHomeJs.MainUi.updateStateVariables();");
        }

        private void loadWebViewWithUrl(final String url) {
            if(AMainActivity.active) {

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        mWebView.loadUrl(url);
                    }
                });

            }
        }

        @Override
        public void onReceive(Context context, Intent intent) {

            log("Received Broadcast: " + intent.getAction() + ": " + intent.getIntExtra(BROADCAST_ACTION_WEBVIEW_EVENT_TYPE_KEY, -1));

            switch(intent.getAction()) {

                case COMMON_LOCAL_BROADCAST_ACTION: {

                    // Get extra data included in the Intent

                    int eventType = intent.getIntExtra(BROADCAST_ACTION_WEBVIEW_EVENT_TYPE_KEY, -1);

                    switch (eventType) {

                        case WEBVIEW_EVENT_LOAD_PATIENT_HOME: {

                            long loadCalledAt = System.currentTimeMillis();

                            if(lastHomeLoadedAt > -1) {
                                if((loadCalledAt - lastHomeLoadedAt) < 2000) {
                                    log("load recently called");
                                    return;
                                }
                            }

                            lastHomeLoadedAt = loadCalledAt;


                            log("Loading Sleep Home View: Post Login Success");
                            loadHomeUrl();

                            break;
                        }


                        case WEBVIEW_EVENT_UPDATE_STATE_VARS: {

                            updateStateVarsInWebView();

                            break;

                        }


                        case WEBVIEW_EVENT_MOBILE_BATTERY_UPDATE: {

                            int mobileBattery = intent.getIntExtra("mobileBattery", -1);

                            log("Received Mobile Battery: " + mobileBattery);

                            loadWebViewWithUrl("javascript: HomeJs.MainUi.updateMobileBatteryValue("+mobileBattery+");");

                            break;
                        }

                        case WEBVIEW_EVENT_INTERNET_STATUS_UPDATE: {

                            boolean internetStatus = intent.getBooleanExtra("internetStatus", false);


                            log("Received Internet Status: " + internetStatus);

                            loadWebViewWithUrl("javascript: HomeJs.MainUi.updateNetworkConnectivity("+internetStatus+");");

                            break;
                        }

                        case BT_EVENT_SPP_DEVICES_DISCOVERED_LIST_READY: {

                            String deviceListJson = intent.getStringExtra("deviceListJson");
                            log("Devices Discovered: " + deviceListJson);
                            loadWebViewWithUrl("javascript: HomeJs.MainUi.onSppDevicesDiscovered("+deviceListJson+");");
                            break;
                        }

                        case BT_EVENT_BLE_DEVICES_DISCOVERED_LIST_READY: {

                            String deviceListJson = intent.getStringExtra("deviceListJson");
                            log("Devices Discovered: " + deviceListJson);
                            loadWebViewWithUrl("javascript: HomeJs.MainUi.onBleDevicesDiscovered("+deviceListJson+");");
                            break;
                        }

                        case BT_EVENT_DEVICE_PAIRING_SUCCESS: {
                            String devInfoJson = intent.getStringExtra("devInfoJson");
                            log("Pairing Successful: " + devInfoJson);
                            loadWebViewWithUrl("javascript: HomeJs.MainUi.onPairingSuccess("+devInfoJson+");");
                            break;
                        }

                        case BT_EVENT_DEVICE_PAIRING_FAILED: {
                            String devInfoJson = intent.getStringExtra("devInfoJson");
                            log("Pairing Failed: " + devInfoJson);
                            loadWebViewWithUrl("javascript: HomeJs.MainUi.onPairingFailed("+devInfoJson+");");
                            break;
                        }




                        case BT_EVENT_SPP_DEVICE_NOT_PAIRED_FOR_CONNECT: {
                            String devInfoJson = intent.getStringExtra("devInfoJson");
                            log("NOT Paired: " + devInfoJson);
                            loadWebViewWithUrl("javascript: HomeJs.MainUi.onSppDeviceNotPairedForConnect("+devInfoJson+");");
                            break;
                        }


                        case BT_EVENT_SPP_DEVICE_READING_CONNECTED: {
                            String devInfoJson = intent.getStringExtra("devInfoJson");
                            log("Device Connected: " + devInfoJson);
                            loadWebViewWithUrl("javascript: HomeJs.MainUi.onSppVitalConnected("+devInfoJson+");");
                            break;
                        }


                        case BT_EVENT_BLE_DEVICE_READING_CONNECTED: {
                            String devInfoJson = intent.getStringExtra("devInfoJson");
                            log("Ble Device Connected: " + devInfoJson);
                            loadWebViewWithUrl("javascript: HomeJs.MainUi.onBleVitalConnected("+devInfoJson+");");
                            break;
                        }



                        case BT_EVENT_DEVICE_READING_MINI_MESSAGE: {
                            String miniMesg = intent.getStringExtra("miniMesg");
                            log("Sending Mini Message: " + miniMesg);
                            loadWebViewWithUrl("javascript: HomeJs.MainUi.setVitalReadingMiniMesg('"+miniMesg+"');");
                            break;
                        }

                        case BT_EVENT_DEVICE_READING_FINISHED: {
                            String finalReadingMesg = intent.getStringExtra("finalReadingMessage");
                            int vitalType = intent.getIntExtra("vitalType", -1);

                            log("Reading Finished: " + Vitals.getStrOf(vitalType) + ", Final Mesg: " + finalReadingMesg);
                            loadWebViewWithUrl("javascript: HomeJs.MainUi.onVitalReadingFinished("+vitalType+",'"+finalReadingMesg+"');");
                            break;
                        }



                        case BT_EVENT_DEVICE_READING_TIMEOUT: {
                            int vitalType = intent.getIntExtra("vitalType", -1);
                            loadWebViewWithUrl("javascript: HomeJs.MainUi.onVitalReadingTimeout(" + vitalType + ");");
                            break;
                        }



                        case BT_EVENT_DEVICE_READING_ERROR: {
                            String errorMesg = intent.getStringExtra("errorMesg");
                            int vitalType = intent.getIntExtra("vitalType", -1);
                            log("Error with: " + Vitals.getStrOf(vitalType));
                            loadWebViewWithUrl("javascript: HomeJs.MainUi.onVitalReadingError("+vitalType+",'"+errorMesg+"');");
                            break;
                        }

                        case EVENT_FAROS_NEW_ONE_SECOND_DATA: {

                            short[] ch1EcgOneSec = intent.getShortArrayExtra("ch1EcgOneSec");
                            loadWebViewWithUrl("javascript: HomeJs.EcgViewUi.onNewOneSecondData(" + GsonUtils.getInstance().toJson(ch1EcgOneSec) + ");");

                            break;
                        }

                    }

                    break; // case-break--event-type
                }


            }

        }
    };



    private class AMainActivityHandler extends Handler
    {

        public static final int ACTIVITY_TOAST_LONG = 1;
        public static final int ACTIVITY_TOAST_SHORT = 2;

        private WeakReference<AMainActivity> aMainActivity;

        private void log(String str) {
            ALog.log(AMainActivityHandler.class, str);
        }

        AMainActivityHandler(WeakReference<AMainActivity> activity) {

            super(activity.get().getMainLooper());

            aMainActivity = activity;
        }



        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);

            switch (msg.what) {

                case ACTIVITY_TOAST_LONG:
                    String str = (String) msg.obj;

                    AMainApp.showLongToast(str, aMainActivity.get().getApplicationContext());

                    break;

                case ACTIVITY_TOAST_SHORT:
                    String str2 = (String) msg.obj;

                    AMainApp.showShortToast(str2, aMainActivity.get().getApplicationContext());

                    break;

            }
        }
    }


}



