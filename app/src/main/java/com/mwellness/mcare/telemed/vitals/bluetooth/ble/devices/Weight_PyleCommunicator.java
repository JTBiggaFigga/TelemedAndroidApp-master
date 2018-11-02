package com.mwellness.mcare.telemed.vitals.bluetooth.ble.devices;

import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCallback;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattDescriptor;
import android.bluetooth.BluetoothGattService;
import android.bluetooth.BluetoothProfile;

import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.app.jsinterfaces.BTReadingsJsInterface;
import com.mwellness.mcare.telemed.vitals.bluetooth.ble.GattServiceMap;

import java.lang.ref.WeakReference;
import java.text.DecimalFormat;
import java.util.UUID;

/**
 * Created by dev01 on 1/5/18.
 */

public class Weight_PyleCommunicator extends BluetoothGattCallback {

    private static final String OUR_SERVICE_UUID = "fff0";


    private int vitalType = -1;
    private BTReadingsJsInterface btReadingsJsInterface;

    private double wtKg = 0;

    private boolean onConnectedAndNotFinished = false;
    private boolean error = false;


    private static void log(final String str) {
        ALog.log(Weight_PyleCommunicator.class, "BTReadingsJs: " + str);
    }

    private static Weight_PyleCommunicator pyleWeighingScaleCommunicator;

    public static Weight_PyleCommunicator getInstance(final int vitalType, final WeakReference<BTReadingsJsInterface> btReadingsJsInterfaceWeakReference) {

        if(pyleWeighingScaleCommunicator == null) {
            pyleWeighingScaleCommunicator = new Weight_PyleCommunicator();
        }

        pyleWeighingScaleCommunicator.btReadingsJsInterface = btReadingsJsInterfaceWeakReference.get();
        pyleWeighingScaleCommunicator.vitalType = vitalType;
        pyleWeighingScaleCommunicator.wtKg = 0;

        return pyleWeighingScaleCommunicator;
    }

    @Override
    public void onConnectionStateChange(BluetoothGatt gatt, int status, int newState) {
        log("onConnectionStateChange");
        switch (newState) {

            case BluetoothProfile.STATE_CONNECTED:

                log("Connected");
                onConnectedAndNotFinished = true;
                error = false;

                btReadingsJsInterface.sendBleConnectedBroadcast(gatt.getDevice());

                try {

                    gatt.discoverServices();

                } catch (Exception e) {
                    e.printStackTrace();
                    log("GAAND LAG RAHI HAI");
                    error = true;
                    gatt.disconnect();
                }

                break;

            case BluetoothProfile.STATE_DISCONNECTED:

                log("onDisconnected");

                if(error) {
                    btReadingsJsInterface.sendVitalErrorBroadcast("Characteristic/Descriptor in null.", vitalType);
                    return;
                }

                if(onConnectedAndNotFinished)
                {
                    log("\t...But reading still not finished! :,(");
                    btReadingsJsInterface.sendVitalErrorBroadcast("DISCONNECTED_BEFORE_FINISHING", vitalType);
                    return;
                }

                break;

        }

    }

    @Override
    public void onServicesDiscovered(BluetoothGatt gatt, int status) {

        log("SERVICES DISCOVERED");

        if(gatt == null) {
            log("Gatt in null. Returning ... ");
            return;
        }

        /*BluetoothGattCharacteristic bgc = gatt.getService(UUID.fromString("0000fff0-0000-1000-8000-00805f9b34fb")).getCharacteristic(UUID.fromString("0000fff4-0000-1000-8000-00805f9b34fb"));
        BluetoothGattDescriptor descriptor = bgc.getDescriptor(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"));
        descriptor.setValue(BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE);
        gatt.writeDescriptor(descriptor);
        gatt.setCharacteristicNotification(bgc, true);*/

        for(BluetoothGattService bgs: gatt.getServices()) {

            String serviceUUID = bgs.getUuid().toString().substring(4, 8);
            String serviceString = (GattServiceMap.gattServiceMap.containsKey(serviceUUID) ? GattServiceMap.gattServiceMap.get(serviceUUID) : "Unknown");


            log("");
            log("Service Found UUID: " + bgs.getUuid().toString());
            log("Service Found: " + serviceUUID + " (" + serviceString + ")");
            log("Service Type: " + ((bgs.getType() == 0) ? "PRIMARY" : "SECONDARY"));
            log("Characteristics: " + bgs.getCharacteristics().size());

            if (serviceUUID.contains(OUR_SERVICE_UUID)) {



                log(" ");
                log("Found our Service ... Setting Notification Descriptor");

                BluetoothGattCharacteristic bgc = bgs.getCharacteristic(UUID.fromString("0000fff4-0000-1000-8000-00805f9b34fb"));

                // write notification descriptor
                BluetoothGattDescriptor descriptor = bgc.getDescriptor(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"));
                descriptor.setValue(BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE);
                gatt.writeDescriptor(descriptor);
                gatt.setCharacteristicNotification(bgc, true);

                break;
            }
        }
    }


    @Override
    public void onCharacteristicChanged(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic) {

        if(KILL_BT())
        {
            log("NATIVE_QUIT. Closing.");
            sendCurrentMiniMessage("");
            return;
        }


        log("");
        byte[] val = characteristic.getValue();
        log("VALUE HEX: " + getFrame(val));

        byte v4 = val[4];
        int kgv = ((int) ((val[5] >= 0)?val[5]:(val[5]+256)) + (256 * v4));

        wtKg = (double)(kgv)/10;
        String wtInLbs = "" + kgsToLbs(wtKg);

        if(val[0] == (byte) 0xCA)
        {
            log("TRANSITIONAL VALUE: " + wtKg + " kg ... " + toHex(val[5]));
            sendCurrentMiniMessage(wtKg + " kg / " + wtInLbs + " lbs (Unstable)");
        }
        else if(val[0] == (byte) 0xCF)
        {
            log("FINAL VALUE: " + wtKg + " kg ... " + toHex(val[5]));
            sendCurrentMiniMessage(wtKg + " kg / " + wtInLbs + " lbs (Final)");

            btReadingsJsInterface.saveVitalReadings(vitalType, wtInLbs + "", wtKg + "", "", System.currentTimeMillis());

            final String finalReadingMessage = wtKg + " kg / " + wtInLbs + " lbs";
            btReadingsJsInterface.sendVitalReadingFinishedBroadcast(finalReadingMessage, vitalType);

            onConnectedAndNotFinished = false;
            gatt.disconnect();

        }

    }





    private void sendCurrentMiniMessage(final String str) {
        btReadingsJsInterface.sendVitalReadingMiniMessageBroadcast(str);
    }

    private boolean KILL_BT() {

        if(btReadingsJsInterface.wasThereAnOperationCancel()) {
            log("There was an operation cancel");
            return true;
        }

        return false;
    }

    private String kgsToLbs(double wtInKgs)
    {
        DecimalFormat df = new DecimalFormat("#.0");

        String wtInLbs = "" + df.format(Math.round(((2.20462 * wtInKgs)) * 100)/100.0d);

        return wtInLbs;
    }









    ////// utils

    public int intOf2Bytes(byte highWord, byte lowWord)
    {
        int i = 0;
        i |= lowWord & 0xFF;
        i <<= 8;
        i |= highWord & 0xFF;
        return i;
    }

    public void bitString(int b) {
        int i;
        String str = "";
        for (i = 15; i >= 0; i--) {
            str += ((b >> i) & 0x01);
        }
        log(str + " = " + b);
    }

    public void bitString(byte b) {
        int i;
        String str = "";
        for (i = 7; i >= 0; i--) {
            str += ((b >> i) & 0x01);
        }
        log(str + " = " + b);
    }

    public int getNthLSBitFromByte(byte n, byte B)
    {
        return((B >> n) & 0x01); // [7,6,5,4,3,2,1,0]
    }

    public int getNthLSBitFromInt(byte n, int i)
    {
        //get the nth bit from integer
        return((i >> n) & 0x01); // [15,14 ... 1,0]
    }

    public String toHex(byte b)
    {
        //print the hex rep of b

        char[] kDigits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

        int value = (b + 256) % 256;
        int highIndex = value >> 4;
        int lowIndex = value & 0x0f;
        String str = "";
        str += kDigits[highIndex];
        str += kDigits[lowIndex];

        return str;
    }

    public void printFrame(byte[] bt)
    {
        // print the byte array
        String str = "";
        for(byte b:bt)
        {
            str += toHex(b) +", ";
        }
        log("[" + str + "]");
    }

    public String getFrame(byte[] bt)
    {
        // print the byte array
        String str = "";
        for(byte b:bt)
        {
            str += toHex(b) +", ";
        }

        return str;
    }
}
