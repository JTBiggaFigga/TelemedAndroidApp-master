package com.mwellness.mcare.telemed.vitals.bluetooth.ble.devices;

import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattDescriptor;
import android.bluetooth.BluetoothGattService;
import android.bluetooth.BluetoothProfile;

import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.app.jsinterfaces.BTReadingsJsInterface;
import com.mwellness.mcare.telemed.vitals.bluetooth.ble.CancellableGatt;

import java.lang.ref.WeakReference;
import java.text.DecimalFormat;
import java.util.UUID;

/**
 * Created by dev01 on 1/5/18.
 */

public class Spo2_InnovoBle_Communicator extends CancellableGatt {

    private static final String OUR_SERVICE_UUID = "fff0";


    private int vitalType = -1;
    private BTReadingsJsInterface btReadingsJsInterface;


    private boolean onConnectedAndNotFinished = false;
    private boolean error = false;


    private static void log(final String str) {
        ALog.log(Spo2_InnovoBle_Communicator.class, str);
    }

    private static Spo2_InnovoBle_Communicator spo2_innovoBle_communicator;

    public static Spo2_InnovoBle_Communicator getInstance(final int vitalType, final WeakReference<BTReadingsJsInterface> btReadingsJsInterfaceWeakReference) {

        if(spo2_innovoBle_communicator == null) {
            spo2_innovoBle_communicator = new Spo2_InnovoBle_Communicator();
        }

        log("getInstance() Called ... ");

        spo2_innovoBle_communicator.btReadingsJsInterface = btReadingsJsInterfaceWeakReference.get();
        spo2_innovoBle_communicator.vitalType = vitalType;

        return spo2_innovoBle_communicator;
    }

    @Override
    public void onConnectionStateChange(BluetoothGatt gatt, int status, int newState) {
        log("onConnectionStateChange");
        switch (newState) {

            case BluetoothProfile.STATE_CONNECTED:

                super.setGattInstance(gatt);

                if(onConnectedAndNotFinished) {
                    log("Already Connected ... ");
                    return;
                }

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

                super.setGattInstance(null);

                if(btReadingsJsInterface.commThread == null || btReadingsJsInterface.commThread.isInterrupted()) {
                    return;
                }

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

                onConnectedAndNotFinished = false;

                gatt.disconnect();

                break;

        }

    }


    private int spo2Count = 0;

    @Override
    public void onServicesDiscovered(BluetoothGatt gatt, int status) {

        spo2Count = 0;

        if(gatt == null) {
            log("Gatt in null. Returning ... ");
            return;
        }

        log("\tServices Discovered.");
        for(BluetoothGattService s: gatt.getServices()) {

            log("\t\tService: " + s.getUuid());

            for(BluetoothGattCharacteristic c: s.getCharacteristics()) {

                log("\t\t\t\tCharacteristic: " + c.getUuid());

                //BluetoothGattCharacteristic bgc = gatt.getService(UUID.fromString("00001810-0000-1000-8000-00805f9b34fb")).getCharacteristic(UUID.fromString("0000fff4-0000-1000-8000-00805f9b34fb"));
                for(BluetoothGattDescriptor d: c.getDescriptors()) {
                    log("\t\t\t\t\t\tDescriptor: " + d.getUuid());
                    if(d.getUuid().equals(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"))) {
                        d.setValue(BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE);
                        gatt.writeDescriptor(d);
                        gatt.setCharacteristicNotification(c, true);
                    }
                }

                /*
                BluetoothGattDescriptor descriptor = bgc.getDescriptor(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"));
                descriptor.setValue(BluetoothGattDescriptor.DISABLE_NOTIFICATION_VALUE);
                descriptor.setValue(BluetoothGattDescriptor.ENABLE_INDICATION_VALUE);
                gatt.writeDescriptor(descriptor);
                gatt.setCharacteristicNotification(bgc, true);
                */
            }
        }
    }

    @Override
    public void onCharacteristicChanged(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic) {


        if(btReadingsJsInterface.commThread == null || btReadingsJsInterface.commThread.isInterrupted()) {
            disconnectGatt();
            return;
        }

        log("ONCHARACTERISTICCHANGED: " + characteristic.getUuid());

        byte[] bArr = characteristic.getValue();

        byte hr_ = 0;
        byte o2_ = 0;
        // if b0 == 0x81
        if(bArr[0] == (byte) 0x81) {

            hr_ = bArr[1];
            o2_ = bArr[2];


            String st = hr_ + " bpm, " + o2_ + " %";
            log(st);




            if(hr_ == -1 && o2_ == 127) {

            }
            else if(o2_ == -1 && hr_ == 127) {

            }
            else {
                spo2Count++;
                sendCurrentMiniMessage("Receiving: " + st)  ;

                if(spo2Count % 5 == 0) {

                    saveVitalReadings(vitalType, "" + o2_, "" + hr_, "", System.currentTimeMillis());
                }
            }



        }


        if(spo2Count > 10) {
            spo2Count = 0;

            this.sendVitalReadingFinishedBroadcast("O2-Sat: " + o2_ + "%.  HR: " + hr_ + " bpm.");

            onConnectedAndNotFinished = false;
            gatt.disconnect();
        }

    }


    protected void sendVitalReadingFinishedBroadcast(final String finalReadingMessage) {

        btReadingsJsInterface.sendVitalReadingFinishedBroadcast(finalReadingMessage, vitalType);
    }
    protected void saveVitalReadings(final int vitalType, final String v1, final String v2, final String v3, final long timestamp) {

        btReadingsJsInterface.saveVitalReadings(vitalType, v1, v2, v3, timestamp);
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
