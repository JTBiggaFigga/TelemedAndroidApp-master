package com.mwellness.mcare.telemed.vitals.bluetooth.spp;

import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.vitals.Vitals;
import com.mwellness.mcare.telemed.vitals.bluetooth.spp.devices.Bp_ForaD30FCommunicator;
import com.mwellness.mcare.telemed.vitals.bluetooth.spp.devices.Ecg_Faros360Communicator;
import com.mwellness.mcare.telemed.vitals.bluetooth.spp.devices.Sugar_ForaTestNGoCommunicator;
import com.mwellness.mcare.telemed.vitals.bluetooth.spp.devices.Spo2_NoninCommunicator;

/**
 * Created by dev01 on 1/4/18.
 */

public class BtSppCommunicatorFactory {

    private static void log(final String str) {
        ALog.log(BtSppCommunicatorFactory.class, str);
    }

    public static BtSppCommunicator getCommunicator(final int vitalType) {

        switch (vitalType) {
            case Vitals.VITAL_TYPE_SPO2: {
                return Spo2_NoninCommunicator.getInstance(vitalType);
            }
            case Vitals.VITAL_TYPE_SUGAR: {
                return Sugar_ForaTestNGoCommunicator.getInstance(vitalType);
            }
            case Vitals.VITAL_TYPE_BP: {
                return Bp_ForaD30FCommunicator.getInstance(vitalType);
            }
            case Vitals.VITAL_TYPE_ECG: {
                return Ecg_Faros360Communicator.getInstance(vitalType);
            }
            default:
                return null;
        }

    }


}
