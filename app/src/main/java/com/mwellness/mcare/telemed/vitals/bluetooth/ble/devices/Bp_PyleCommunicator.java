package com.mwellness.mcare.telemed.vitals.bluetooth.ble.devices;

import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCallback;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattDescriptor;
import android.bluetooth.BluetoothProfile;

import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.app.jsinterfaces.BTReadingsJsInterface;

import java.lang.ref.WeakReference;
import java.text.DecimalFormat;
import java.util.UUID;

/**
 * Created by dev01 on 1/5/18.
 */

public class Bp_PyleCommunicator extends BluetoothGattCallback {

    private static final String OUR_SERVICE_UUID = "fff0";


    private int vitalType = -1;
    private BTReadingsJsInterface btReadingsJsInterface;


    private boolean onConnectedAndNotFinished = false;
    private boolean error = false;


    private static void log(final String str) {
        ALog.log(Bp_PyleCommunicator.class, str);
    }

    private static Bp_PyleCommunicator pyleBloodPressureCommunicator;

    public static Bp_PyleCommunicator getInstance(final int vitalType, final WeakReference<BTReadingsJsInterface> btReadingsJsInterfaceWeakReference) {

        if(pyleBloodPressureCommunicator == null) {
            pyleBloodPressureCommunicator = new Bp_PyleCommunicator();
        }

        pyleBloodPressureCommunicator.btReadingsJsInterface = btReadingsJsInterfaceWeakReference.get();
        pyleBloodPressureCommunicator.vitalType = vitalType;

        return pyleBloodPressureCommunicator;
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
                    log("Error while discovering services ... ");
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

                gatt.disconnect();

                break;

        }

    }

    @Override
    public void onServicesDiscovered(BluetoothGatt gatt, int status) {

        if(gatt == null) {
            log("Gatt in null. Returning ... ");
            return;
        }

        BluetoothGattCharacteristic bgc = gatt.getService(UUID.fromString("0000fff0-0000-1000-8000-00805f9b34fb")).getCharacteristic(UUID.fromString("0000fff4-0000-1000-8000-00805f9b34fb"));
        BluetoothGattDescriptor descriptor = bgc.getDescriptor(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"));
        descriptor.setValue(BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE);
        gatt.writeDescriptor(descriptor);
        gatt.setCharacteristicNotification(bgc, true);

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


        int sys = 0;
        int dia = 0;
        int hr = 0;

        if(val[0] == (byte) 0x20)
        {
            log("TRANSITIONAL VALUE: " + negativeByteToInt(val[1]) );
            sendCurrentMiniMessage("Measuring: " + negativeByteToInt(val[1]));

        }
        else if(val[0] == (byte)0x0C)
        {
            sys = negativeByteToInt(val[2]);
            dia = negativeByteToInt(val[4]);
            hr = negativeByteToInt(val[8]);

            log("FINAL VALUE: Sys = " + sys + ", Dia = " + dia + ", HR: " + hr);

            sendCurrentMiniMessage(sys + "/" + dia + " @" + hr + "bpm");

            btReadingsJsInterface.saveVitalReadings(vitalType, sys + "", dia + "", hr + "", System.currentTimeMillis());

            final String finalReadingMessage = "BP: " + sys + "/" + dia + " mmHg";
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




    public int negativeByteToInt(byte b)
    {
        if(b < 0)
            return b+256;

        return b;
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
