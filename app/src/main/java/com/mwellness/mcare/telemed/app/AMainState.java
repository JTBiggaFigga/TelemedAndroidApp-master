package com.mwellness.mcare.telemed.app;

import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;

import com.mwellness.mcare.telemed.app.jsinterfaces.AMainPreferences;

/**
 * Created by dev01 on 3/14/17.
 * This class maintains the state machine of the app.
 * Can set and reset state variable STATE_CURRENT.
 */

public class AMainState {

    public static final String STATE_UNAUTHORIZED = "STATE_UNAUTHORIZED";
    public static final String STATE_AUTHORIZED = "STATE_AUTHORIZED";
    public static final String STATE_BT_DISCOVERING = "STATE_BT_DISCOVERING";
    public static final String STATE_BT_SELECTED = "STATE_BT_SELECTED";
    public static final String STATE_BT_PAIRING = "STATE_BT_PAIRING";
    public static final String STATE_BT_PAIRED = "STATE_BT_PAIRED";

    public static final String STATE_CURRENT = "STATE_CURRENT";

    public static void log(String str) {
        ALog.log(AMainState.class, str);
    }

    /**
     * Get the current state of the app
     * @return
     */
    public static String getCurrentState() {

        String currState = STATE_UNAUTHORIZED;
        try {
            currState = AMainPreferences.getInstance().getString(STATE_CURRENT);
        } catch (NoSuchFieldError e) {
            AMainPreferences.getInstance().setString(STATE_CURRENT, STATE_UNAUTHORIZED);
        }

        return currState;
    }


    /**
     * Set new state of the app.
     * Setting new state also implies some booleans will be updated based on state.
     * These booleans are used by JS for updating UI states.
     * @param newState
     */
    public static void setNewCurrentState(final String newState)
    {

        String currState = getCurrentState();
        log("Switching from " + currState + " to " + newState);
        AMainPreferences.getInstance().setString(STATE_CURRENT, newState);

        // sending a broadcast to update JS variables
        Intent i = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.WEBVIEW_EVENT_UPDATE_STATE_VARS);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i);

        log(AMainPreferences.getInstance().getAll());

    }

    public static boolean getBooleanStateVariable(final String boolVariableName) {
        return AMainPreferences.getInstance().getBoolean(boolVariableName);
    }

    public static void setBooleanStateVariable(final String boolVariableName, final boolean value) {
        AMainPreferences.getInstance().setBoolean(boolVariableName, value);

        log(AMainPreferences.getInstance().getAll());
    }



}
