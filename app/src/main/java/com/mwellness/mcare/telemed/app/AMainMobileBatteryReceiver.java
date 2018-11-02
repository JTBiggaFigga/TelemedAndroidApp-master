package com.mwellness.mcare.telemed.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.BatteryManager;
import android.support.v4.content.LocalBroadcastManager;

/**
 * Created by dev01 on 3/27/17.
 */

public class AMainMobileBatteryReceiver extends BroadcastReceiver {

    private static void log(String str) {
        ALog.log(AMainMobileBatteryReceiver.class, str);
    }

    @Override
    public void onReceive(Context context, Intent intent) {

        if(!intent.getAction().equals(Intent.ACTION_BATTERY_CHANGED)) {
            return;
        }


        int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        boolean isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING ||
                status == BatteryManager.BATTERY_STATUS_FULL;

        int chargePlug = intent.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1);
        boolean usbCharge = chargePlug == BatteryManager.BATTERY_PLUGGED_USB;
        boolean acCharge = chargePlug == BatteryManager.BATTERY_PLUGGED_AC;

        int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);


        float batteryPct = 100 * (level / (float)scale);

        log("Battery Received: " + batteryPct + "%");



        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainApp.MAIN_EVENT_MOBILE_BATTERY_UPDATE);
        i7.putExtra("mobileBattery", (int) batteryPct);
        i7.putExtra("isCharging", isCharging);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);

    }
}
