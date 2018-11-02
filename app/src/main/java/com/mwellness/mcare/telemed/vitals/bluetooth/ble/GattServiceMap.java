package com.mwellness.mcare.telemed.vitals.bluetooth.ble;

import java.util.HashMap;

/**
 * Created by dev01 on 1/5/18.
 */

public class GattServiceMap {

    public static HashMap<String, String> gattServiceMap;

    static {
        gattServiceMap = new HashMap<>();

        gattServiceMap.put("1800", "Generic Access Service");
        gattServiceMap.put("1801", "GATT Service");
        gattServiceMap.put("180a", "Device Information Service");
        gattServiceMap.put("180f", "Battery Service");
        gattServiceMap.put("fff0", "Weight Service");
    }

}
