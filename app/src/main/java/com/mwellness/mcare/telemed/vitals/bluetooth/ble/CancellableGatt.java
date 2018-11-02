package com.mwellness.mcare.telemed.vitals.bluetooth.ble;

import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCallback;

/**
 * Created by dev01 on 2/12/18.
 */

public abstract class CancellableGatt extends BluetoothGattCallback {
    BluetoothGatt gatt;

    public void setGattInstance(BluetoothGatt gatt) {
        this.gatt = gatt;
    }

    public void disconnectGatt() {
        if(gatt != null) {
            gatt.disconnect();
        }
    }

}
