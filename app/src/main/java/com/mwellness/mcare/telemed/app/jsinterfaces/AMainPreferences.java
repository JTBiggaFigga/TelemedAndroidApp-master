package com.mwellness.mcare.telemed.app.jsinterfaces;

import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.webkit.JavascriptInterface;

import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.app.AMainApp;
import com.mwellness.mcare.telemed.bootstrap.utils.GsonUtils;

/**
 * Created by dev01 on 3/10/17.
 */

public class AMainPreferences {


    private static AMainPreferences aMainPreferences;
    private SharedPreferences preferences;

    public static final String PREF_KEY_FULL_NAME = "PREF_KEY_FULL_NAME";
    public static final String PREF_KEY_FNAME = "PREF_KEY_FNAME";
    public static final String PREF_KEY_LNAME = "PREF_KEY_LNAME";
    public static final String PREF_KEY_EMAIL = "PREF_KEY_EMAIL";
    public static final String PREF_KEY_PICTURE_URL = "PREF_KEY_PICTURE_URL";
    public static final String PREF_KEY_AUTH0_USER_ID = "PREF_KEY_AUTH0_USER_ID";
    public static final String PREF_KEY_ACCESS_TOKEN = "PREF_KEY_ACCESS_TOKEN";
    public static final String PREF_KEY_ID_TOKEN = "PREF_KEY_ID_TOKEN";
    public static final String PREF_KEY_CODE_VERIFIER = "PREF_KEY_CODE_VERIFIER";


    public static final String PREF_KEY_PATIENT_PROFILE = "PREF_KEY_PATIENT_PROFILE";

    /**
     * Get the singleton instance of Shared Preferences Access
     * @return
     */
    public static AMainPreferences getInstance() {
        if(aMainPreferences == null) {
            aMainPreferences = new AMainPreferences();
        }

        return aMainPreferences;
    }

    private AMainPreferences() {
        this.preferences = PreferenceManager.getDefaultSharedPreferences(AMainApp.getAppContext()); //context.getSharedPreferences(AMainApp.SHARED_PREF_NAME, Context.MODE_PRIVATE);
    }

    private static void log(String str) {
        ALog.log(AMainPreferences.class, str);
    }


    @JavascriptInterface
    public synchronized String getString(String key) {
        log("Getting " + key + " in shared prefs");
        if(preferences.contains(key)) {
            return preferences.getString(key, "");
        }
        else {
            preferences.edit().putString(key, "").apply();
            return "";
        }
    }

    @JavascriptInterface
    public synchronized void setString(String key, String value) {
        log("Setting " + key + ": " + value + " in shared prefs");
        preferences.edit().putString(key, value).apply();
    }

    @JavascriptInterface
    public synchronized void setBoolean(String key, boolean value) {
        preferences.edit().putBoolean(key, value).apply();
    }

    @JavascriptInterface
    public synchronized boolean getBoolean(String key) {
        return preferences.getBoolean(key, false);
    }



    @JavascriptInterface
    public synchronized void setLong(String key, long value) {
        preferences.edit().putLong(key, value).apply();
    }

    @JavascriptInterface
    public synchronized long getLong(String key) {
        return preferences.getLong(key, -1);
    }

    @JavascriptInterface
    public synchronized String getAll() {
        return GsonUtils.getInstance(true).toJson(preferences.getAll());
    }

    /**
     * Delete all shared preferences
     */
    public synchronized void clearAllPreferences() {
        log("Clearing all prefs");
        preferences.edit().clear().apply();
    }


}
