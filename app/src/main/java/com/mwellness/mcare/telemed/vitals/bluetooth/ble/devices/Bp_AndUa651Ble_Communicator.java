package com.mwellness.mcare.telemed.vitals.bluetooth.ble.devices;

import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattDescriptor;
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

public class Bp_AndUa651Ble_Communicator extends CancellableGatt {

    private static final String OUR_SERVICE_UUID = "fff0";


    private int vitalType = -1;
    private BTReadingsJsInterface btReadingsJsInterface;


    private boolean onConnectedAndNotFinished = false;
    private boolean error = false;


    private static void log(final String str) {
        ALog.log(Bp_AndUa651Ble_Communicator.class, str);
    }

    private static Bp_AndUa651Ble_Communicator bp_andUa651Ble_communicator;

    public static Bp_AndUa651Ble_Communicator getInstance(final int vitalType, final WeakReference<BTReadingsJsInterface> btReadingsJsInterfaceWeakReference) {

        if(bp_andUa651Ble_communicator == null) {
            bp_andUa651Ble_communicator = new Bp_AndUa651Ble_Communicator();
        }

        log("getInstance() Called ... ");

        bp_andUa651Ble_communicator.btReadingsJsInterface = btReadingsJsInterfaceWeakReference.get();
        bp_andUa651Ble_communicator.vitalType = vitalType;

        return bp_andUa651Ble_communicator;
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
                    //gatt.disconnect();
                }

                break;

            case BluetoothProfile.STATE_DISCONNECTED:

                super.setGattInstance(null);

                if(btReadingsJsInterface.commThread == null || btReadingsJsInterface.commThread.isInterrupted()) {
                    return;
                }

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

                onConnectedAndNotFinished = false;

                //gatt.disconnect();

                break;

        }

    }

    @Override
    public void onServicesDiscovered(BluetoothGatt gatt, int status) {

        if(gatt == null) {
            log("Gatt in null. Returning ... ");
            return;
        }

        log("\tServices Discovered.");

        BluetoothGattCharacteristic c = gatt.getService(UUID.fromString("00001810-0000-1000-8000-00805f9b34fb"))
                .getCharacteristic(UUID.randomUUID().fromString("00002a35-0000-1000-8000-00805f9b34fb"));
        BluetoothGattDescriptor d = c
                .getDescriptor(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"));

        d.setValue(BluetoothGattDescriptor.DISABLE_NOTIFICATION_VALUE);
        d.setValue(BluetoothGattDescriptor.ENABLE_INDICATION_VALUE);
        gatt.writeDescriptor(d);
        gatt.setCharacteristicNotification(c, true);


        /*for(BluetoothGattService s: gatt.getServices()) {

            log("\t\tService: " + s.getUuid());

            for(BluetoothGattCharacteristic c: s.getCharacteristics()) {

                log("\t\t\t\tCharacteristic: " + c.getUuid());

                //BluetoothGattCharacteristic bgc = gatt.getService(UUID.fromString("00001810-0000-1000-8000-00805f9b34fb")).getCharacteristic(UUID.fromString("0000fff4-0000-1000-8000-00805f9b34fb"));
                for(BluetoothGattDescriptor d: c.getDescriptors())
                {
                    log("\t\t\t\t\t\tDescriptor: " + d.getUuid());
                    if(d.getUuid().equals(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb")))
                    {
                        //d.setValue(BluetoothGattDescriptor.DISABLE_NOTIFICATION_VALUE);
                        d.setValue(BluetoothGattDescriptor.ENABLE_INDICATION_VALUE);
                        gatt.writeDescriptor(d);
                        gatt.setCharacteristicNotification(c, true);

                        d.setValue(BluetoothGattDescriptor.ENABLE_INDICATION_VALUE);
                        gatt.writeDescriptor(d);
                        gatt.setCharacteristicNotification(c, true);
                    }
                }

                *//*
                BluetoothGattDescriptor descriptor = bgc.getDescriptor(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"));
                descriptor.setValue(BluetoothGattDescriptor.DISABLE_NOTIFICATION_VALUE);
                descriptor.setValue(BluetoothGattDescriptor.ENABLE_INDICATION_VALUE);
                gatt.writeDescriptor(descriptor);
                gatt.setCharacteristicNotification(bgc, true);
                *//*
            }


        }*/


    }

    @Override
    public void onCharacteristicRead(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic, int gattStatusFlag) {


    }

    @Override
    public void onCharacteristicChanged(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic) {

        if(btReadingsJsInterface.commThread == null || btReadingsJsInterface.commThread.isInterrupted()) {
            disconnectGatt();
            return;
        }

        log("ONCHARACTERISTICCHANGED: " + characteristic.getUuid());

        String unit = "mmHg";

        float sys = -1;
        float dia = -1;
        float map = -1;
        float hr = -1;


        ///*
        final String KEY_BODY_MOVEMENT_DETECTION = "bodyMovementDetection" ;
        final String KEY_CUFF_FIT_DETECTION = "cuffFitDetection" ;
        final String KEY_IRREGULAR_PULSE_DETECTION = "irregularPulseDetection";
        final String KEY_PULSE_RATE_RANGE_DETECTION = "pulseRateRangeDetection";
        final String KEY_MEASUREMENT_POSITION_DETECTION = "measurementPositionDetection";

        boolean error = false;
        String errorMesg = "";

        int flag = characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT8, 0);
        String flagString = Integer.toBinaryString(flag);
        int offset=0;

        for(int index = flagString.length(); 0 < index ; index--) {

            String key = flagString.substring(index-1 , index);

            if(index == flagString.length()) {
                if(key.equals("0")) {
                    // mmHg
                    log("mmHg");
                }
                else {
                    // kPa
                    log("kPa");
                    unit = "kPa";
                }

                // Unit
                offset+=1;
                sys = characteristic.getFloatValue(BluetoothGattCharacteristic.FORMAT_SFLOAT, offset);
                if(unit.equals("kPa")) {
                    sys = sys * 7.50061683f;
                }
                log("Systolic :"+String.format("%f", characteristic.getFloatValue(BluetoothGattCharacteristic.FORMAT_SFLOAT, offset)));

                offset+=2;
                dia = characteristic.getFloatValue(BluetoothGattCharacteristic.FORMAT_SFLOAT, offset);
                if(unit.equals("kPa")) {
                    dia = dia * 7.50061683f;
                }
                log("Diastolic :"+String.format("%f", characteristic.getFloatValue(BluetoothGattCharacteristic.FORMAT_SFLOAT, offset)));

                offset+=2;
                map = characteristic.getFloatValue(BluetoothGattCharacteristic.FORMAT_SFLOAT, offset);
                if(unit.equals("kPa")) {
                    map = map * 7.50061683f;
                }
                log("Mean Arterial Pressure :"+String.format("%f", characteristic.getFloatValue(BluetoothGattCharacteristic.FORMAT_SFLOAT, offset)));

                offset+=2;
            }
            else if(index == flagString.length()-1) {
                if(key.equals("1")) {
                    // Time Stamp
                    log("Y :"+String.format("%04d", characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT16, offset)));

                    offset+=2;
                    log("M :"+String.format("%02d", characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT8, offset)));

                    offset+=1;
                    log("D :"+String.format("%02d", characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT8, offset)));

                    offset+=1;
                    log("H :"+String.format("%02d", characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT8, offset)));

                    offset+=1;
                    log("M :"+String.format("%02d", characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT8, offset)));

                    offset+=1;
                    log("S :"+String.format("%02d", characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT8, offset)));

                    offset+=1;
                }
                else {

                }
            }
            else if(index == flagString.length()-2) {
                if(key.equals("1")) {
                    // Pulse Rate
                    hr = characteristic.getFloatValue(BluetoothGattCharacteristic.FORMAT_SFLOAT, offset);
                    log("Pulse Rate :"+String.format("%f", characteristic.getFloatValue(BluetoothGattCharacteristic.FORMAT_SFLOAT, offset)));
                    offset+=2;
                }
            }
            else if(index == flagString.length()-3) {
                // UserID
            }
            else if(index == flagString.length()-4) {

                // Measurement Status Flag
                int statusFlag = characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT16, offset);
                String statusFlagString = Integer.toBinaryString(statusFlag);


                for(int i = statusFlagString.length(); 0 < i ; i--) {

                    String status = statusFlagString.substring(i-1 , i);

                    if(i == statusFlagString.length()) {
                        if(status.endsWith("1")) {
                            error = true;
                            errorMesg = KEY_BODY_MOVEMENT_DETECTION;
                            log(KEY_BODY_MOVEMENT_DETECTION);
                        }
                    }
                    else if(i == statusFlagString.length() - 1) {
                        if(status.endsWith("1")) {
                            error = true;
                            errorMesg = KEY_CUFF_FIT_DETECTION;
                            log(KEY_CUFF_FIT_DETECTION);
                        }

                    }
                    else if(i == statusFlagString.length() - 2) {
                        if(status.endsWith("1")) {
                            error = true;
                            errorMesg = KEY_IRREGULAR_PULSE_DETECTION;
                            log(KEY_IRREGULAR_PULSE_DETECTION);
                        }
                    }
                    else if(i == statusFlagString.length() - 3) {
                        i--;
                        String secondStatus = statusFlagString.substring(i-1 , i);
                        if(status.endsWith("1") && secondStatus.endsWith("0")) {
                            //bundle.putInt(KEY_PULSE_RATE_RANGE_DETECTION, 1);
                        }
                        else if(status.endsWith("0") && secondStatus.endsWith("1")) {
                            //bundle.putInt(KEY_PULSE_RATE_RANGE_DETECTION, 2);
                        }
                        else if(status.endsWith("1") && secondStatus.endsWith("1")) {
                            //bundle.putInt(KEY_PULSE_RATE_RANGE_DETECTION, 3);
                        }
                        else {
                            //bundle.putInt(KEY_PULSE_RATE_RANGE_DETECTION, 0);
                        }
                    }
                    else if(i == statusFlagString.length() - 5) {
                        //bundle.putInt(KEY_MEASUREMENT_POSITION_DETECTION,? 1 : 0);
                        if(status.endsWith("1")) {
                            error = true;
                            log(KEY_MEASUREMENT_POSITION_DETECTION);
                            errorMesg = KEY_MEASUREMENT_POSITION_DETECTION;
                        }
                    }
                }
            }
        } // end of readings ...
        //*/


        int sysI = (int) sys;
        int diaI = (int) dia;
        int mapI = (int) map;
        int hrI  = (int)  hr;

        if(sysI == 2047 && diaI == 2047 && mapI == 2047 && hrI == 2047) {

            log("ERROR IN READING ... ");

            btReadingsJsInterface.sendVitalErrorBroadcast("Error.", vitalType);

            gatt.disconnect();
            return;
        }

        if(error) {
            log("ERROR IN READING ... ");

            btReadingsJsInterface.sendVitalErrorBroadcast("Error. " , vitalType);

            //gatt.disconnect();
            //return;
        }

        log("FINAL VALUE: Sys = " + sysI + ", Dia = " + diaI + ", HR: " + hrI);

        sendCurrentMiniMessage(sysI + "/" + diaI + " @" + hrI + "bpm");

        btReadingsJsInterface.saveVitalReadings(vitalType, sysI + "",  diaI + "", hrI + "", System.currentTimeMillis());

        final String finalReadingMessage = "BP: " +  sysI + "/" +  diaI + " mmHg (" +  hrI + " bpm)";
        btReadingsJsInterface.sendVitalReadingFinishedBroadcast(finalReadingMessage, vitalType);

        onConnectedAndNotFinished = false;
        gatt.disconnect();

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
