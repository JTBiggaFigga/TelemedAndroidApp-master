package com.mwellness.mcare.telemed.vitals.bluetooth.spp;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;

import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.app.AMainActivity;
import com.mwellness.mcare.telemed.app.AMainApp;
import com.mwellness.mcare.telemed.app.jsinterfaces.BTReadingsJsInterface;
import com.mwellness.mcare.telemed.bootstrap.utils.GsonUtils;
import com.mwellness.mcare.telemed.vitals.BtDeviceInfo;

import java.io.InputStream;
import java.io.OutputStream;
import java.lang.ref.WeakReference;

/**
 * Created by dev01 on 1/4/18.
 */

public abstract class BtSppCommunicator {

    private static void log(final String str) {
        ALog.log(BtSppCommunicator.class, str);
    }

    protected int vitalType;
    protected BluetoothSocket sck;
    protected InputStream in;
    protected OutputStream out;
    protected BluetoothDevice dev;
    protected WeakReference<BTReadingsJsInterface> btReadingsJsInterfaceWeakReference;


    public static int VITAL_READING_TIMEOUT_MS = 60000;

    public void communicate(BluetoothSocket sck, InputStream is, OutputStream os, BluetoothDevice dev, WeakReference<BTReadingsJsInterface> callerInterfaceWR) {
        this.sck = sck;
        this.in = is;
        this.out = os;
        this.dev = dev;
        this.btReadingsJsInterfaceWeakReference = callerInterfaceWR;
    }

    public void disconnectSpp() {

    }


    protected void sendVitalReadingMiniMessageBroadcast(final String miniMesg) {
        log("Sending Bt Mini Message as local broadcast ... '" + miniMesg + "'");
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_DEVICE_READING_MINI_MESSAGE);
        i7.putExtra("miniMesg", miniMesg);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);
    }



    protected void sendVitalDeviceErrorBroadcast(final String errorMesg) {
        btReadingsJsInterfaceWeakReference.get().sendVitalErrorBroadcast(errorMesg, vitalType);
    }


    protected void sendBtSppConnectedBroadcast() {
        BtDeviceInfo devInfo = new BtDeviceInfo(dev.getAddress(), dev.getName(), true);
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_SPP_DEVICE_READING_CONNECTED);
        i7.putExtra("devInfoJson", GsonUtils.getInstance().toJson(devInfo));
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);
    }



    public void sendVitalReadingFinishedBroadcast(final String finalReadingMessage) {

        btReadingsJsInterfaceWeakReference.get().sendVitalReadingFinishedBroadcast(finalReadingMessage, vitalType);
    }
    public void saveVitalReadings(final int vitalType, final String v1, final String v2, final String v3, final long timestamp) {

        btReadingsJsInterfaceWeakReference.get().saveVitalReadings(vitalType, v1, v2, v3, timestamp);
    }



    public static int intOf2Bytes(final byte highWord, final byte lowWord)
    {
        int i = 0;
        i |= lowWord & 0xFF;
        i <<= 8;
        i |= highWord & 0xFF;
        return i;
    }

    public static void bitString(final int b) {
        int i;
        String str = "";
        for (i = 15; i >= 0; i--) {
            str += ((b >> i) & 0x01);
        }
        log(str + " = " + b);
    }

    public static void bitString(final byte b) {
        int i;
        String str = "";
        for (i = 7; i >= 0; i--) {
            str += ((b >> i) & 0x01);
        }
        log(str + " = " + b);
    }

    public static int getNthLSBitFromByte(final byte n, final byte B)
    {
        return((B >> n) & 0x01); // [7,6,5,4,3,2,1,0]
    }

    public static int getNthLSBitFromInt(final byte n, final int i)
    {
        //get the nth bit from integer
        return((i >> n) & 0x01); // [15,14 ... 1,0]
    }

    public static String toHex(final byte b)
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

    public static void printFrame(final byte[] bt)
    {
        // print the byte array
        String str = "";
        for(byte b:bt)
        {
            str += toHex(b) +", ";
        }
        log("[" + str + "]");
    }


}
