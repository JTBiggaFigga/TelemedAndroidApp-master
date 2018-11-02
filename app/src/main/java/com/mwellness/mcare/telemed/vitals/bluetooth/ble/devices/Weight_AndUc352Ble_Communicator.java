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

public class Weight_AndUc352Ble_Communicator extends CancellableGatt {

    private static final String OUR_SERVICE_UUID = "fff0";


    private int vitalType = -1;
    private BTReadingsJsInterface btReadingsJsInterface;


    private boolean onConnectedAndNotFinished = false;
    private boolean error = false;


    private static void log(final String str) {
        ALog.log(Weight_AndUc352Ble_Communicator.class, "BTReadingsJs: " + str);
    }

    private static Weight_AndUc352Ble_Communicator weight_andUc352Ble_communicator;

    public static Weight_AndUc352Ble_Communicator getInstance(final int vitalType, final WeakReference<BTReadingsJsInterface> btReadingsJsInterfaceWeakReference) {

        if(weight_andUc352Ble_communicator == null) {
            weight_andUc352Ble_communicator = new Weight_AndUc352Ble_Communicator();
        }

        log("getInstance() Called ... ");

        weight_andUc352Ble_communicator.btReadingsJsInterface = btReadingsJsInterfaceWeakReference.get();
        weight_andUc352Ble_communicator.vitalType = vitalType;

        return weight_andUc352Ble_communicator;
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

                    log("Discovering Services");
                    boolean discoveryStarted = gatt.discoverServices();
                    if(discoveryStarted)
                        log("Discovering Services ... started!");
                    else {
                        gatt.discoverServices();
                    }

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

    @Override
    public void onServicesDiscovered(BluetoothGatt gatt, int status) {

        if(gatt == null) {
            log("Gatt in null. Returning ... ");
            return;
        }

        log("\tServices Discovered.");



        BluetoothGattCharacteristic cc = gatt
                .getService(UUID.fromString("23434100-1fe4-1eff-80cb-00ff78297d8b"))
                .getCharacteristic(UUID.fromString("23434101-1fe4-1eff-80cb-00ff78297d8b"));

        BluetoothGattDescriptor dd = cc.getDescriptor(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"));
        dd.setValue(BluetoothGattDescriptor.ENABLE_INDICATION_VALUE);
        gatt.writeDescriptor(dd);

        gatt.setCharacteristicNotification(cc, true);

        if(true) {
            return;
        }



        /*for(BluetoothGattService s: gatt.getServices()) {

            log("\t\tService: " + s.getUuid());

            for(BluetoothGattCharacteristic c: s.getCharacteristics()) {

                log("\t\t\t\tCharacteristic: " + c.getUuid());

                //BluetoothGattCharacteristic bgc = gatt.getService(UUID.fromString("00001810-0000-1000-8000-00805f9b34fb")).getCharacteristic(UUID.fromString("0000fff4-0000-1000-8000-00805f9b34fb"));
                for(BluetoothGattDescriptor d: c.getDescriptors()) {
                    log("\t\t\t\t\t\tDescriptor: " + d.getUuid());
                    if(d.getUuid().equals(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"))) {

                        if(c.getUuid().toString().equals("23434101-1fe4-1eff-80cb-00ff78297d8b")) {
                            log("\t\t\t\t\t\t\tSetting notification as true ... ");

                            d.setValue(BluetoothGattDescriptor.ENABLE_INDICATION_VALUE);
                            gatt.writeDescriptor(d);

                            boolean notificationSet = gatt.setCharacteristicNotification(c, true);
                            if(notificationSet) {
                                log("\t\t\t\t\t\t\tSet Notification!");
                            }
                        }
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

        log("ONCHARACTERISTICREAD: " + characteristic.getUuid());

    }

    @Override
    public void onCharacteristicChanged(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic) {

        if(btReadingsJsInterface.commThread == null || btReadingsJsInterface.commThread.isInterrupted()) {
            disconnectGatt();
            return;
        }

        log("ONCHARACTERISTICCHANGED: " + characteristic.getUuid());

        String unit = "lbs";

        double wtLb = -1;
        double wtKg = -1;

        double convertedValue = -1;

        boolean error = false;

        int flag = characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT8, 0);
        String flagString = Integer.toBinaryString(flag);
        int offset=0;
        for(int index = flagString.length(); 0 < index ; index--) {
            String key = flagString.substring(index-1 , index);

            if(index == flagString.length()) {
                double convertValue = 0;
                if(key.equals("0")) {
                    unit = "kgs";
                    convertValue = 0.005f;
                }
                else {
                    unit = "lbs";
                    convertValue = 0.1f;
                }
                // Unit
                offset+=1;

                // Value
                log("stored value: " + (double)(characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT16, offset)));
                convertedValue = (double)(characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT16, offset)) * convertValue;
                log("V :"+convertedValue + " " + unit);
                offset+=2;
            }
            else if(index == flagString.length()-1) {
                if(key.equals("1")) {

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
                    log("ID :"+String.format("%02d", characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT8, offset)));
                    offset+=1;
                }
            }
            else if(index == flagString.length()-3) {
                if(key.equals("1")) {
                    // BMI and Height
                }
            }
        }


        if(unit.equals("kgs")) {
            wtKg = toSingleDecimal(convertedValue);
            wtLb = kgsToLbs(wtKg);
        }
        else {
            wtLb = toSingleDecimal(convertedValue);
            wtKg = lbsToKgs(wtLb);
        }

        log("FINAL VALUE: " + wtKg + " kg ... " + wtLb + " lbs ");
        sendCurrentMiniMessage(wtLb + " lbs" + " (" + wtKg + " kg)");

        btReadingsJsInterface.saveVitalReadings(vitalType, wtLb + "", wtKg + "", "", System.currentTimeMillis());

        final String finalReadingMessage = wtLb + " lbs" + " (" + wtKg + " kg)";
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

    private double kgsToLbs(double wtInKgs)
    {
        DecimalFormat df = new DecimalFormat("#.0");

        String wtInLbs = "" + df.format(Math.round(((2.20462 * wtInKgs)) * 100)/100.0d);

        return Double.parseDouble(wtInLbs);
    }


    private double lbsToKgs(double wtInLbs)
    {
        DecimalFormat df = new DecimalFormat("#.0");

        String wtInKgs = "" + df.format(Math.round(((0.45359237 * wtInLbs)) * 100)/100.0d);

        return Double.parseDouble(wtInKgs);
    }


    private double toSingleDecimal(double v) {
        DecimalFormat df = new DecimalFormat("#.0");

        String singleDec = "" + df.format(Math.round((v) * 100)/100.0d);

        return Double.parseDouble(singleDec);
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
