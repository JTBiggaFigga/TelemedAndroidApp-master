package com.mwellness.mcare.telemed.vitals.bluetooth.spp.devices;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;

import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.app.jsinterfaces.BTReadingsJsInterface;
import com.mwellness.mcare.telemed.vitals.bluetooth.spp.BtSppCommunicator;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.ref.WeakReference;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by dev01 on 1/4/18.
 */

public class Spo2_NoninCommunicator extends BtSppCommunicator {

    private static volatile Spo2_NoninCommunicator noninCommunicator;

    private static void log(final String str) {
        ALog.log(Spo2_NoninCommunicator.class, str);
    }

    public static BtSppCommunicator getInstance(final int vitalType) {

        if(noninCommunicator == null) {
            noninCommunicator = new Spo2_NoninCommunicator();
        }

        noninCommunicator.setVitalType(vitalType);

        return noninCommunicator;
    }

    private void setVitalType(int vitalType) {
        super.vitalType = vitalType;
    }

    @Override
    public void communicate(final BluetoothSocket sck, final InputStream is, final OutputStream os, BluetoothDevice dev, WeakReference<BTReadingsJsInterface> callerInterfaceWR) {

        super.communicate(sck, is, os, dev, callerInterfaceWR);

        this.in = is;
        this.out = os;

        final long communicationTimeoutMs = 60000;
        Timer communicationAfterConnectedTimer = new Timer();
        communicationAfterConnectedTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                log("Connected Communication Timed Out. " + communicationTimeoutMs + " ms passed.");
                try {
                    sck.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }, communicationTimeoutMs);



        sendBtSppConnectedBroadcast();

        try
        {

            try {
                sendFormatSelection();
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                log("Error: format selection: " + e1.getMessage());
            }

            if(KILL_BT())
            {
                log("NATIVE_QUIT. Closing.");
                setCurrentMiniMessage("");
                return;
            }


            log("Getting Battery Status");



            String res = startTimedStreamReading(); // will run for 10 seconds


            if(res.equals("KILL_BT")) {
                sendVitalDeviceErrorBroadcast("ERROR");
                return;
            }
            if(res.equals("ERROR")) {
                sendVitalDeviceErrorBroadcast("ERROR");
                return;
            }

            log("================ FINISHED =================");


            sendVitalReadingFinishedBroadcast(finalReadingMessage);

            setCurrentMiniMessage("");


        } catch (SecurityException e) {
            // TODO Auto-generated catch block
            log(e.getMessage());
            sendVitalDeviceErrorBroadcast("ERROR");
        } catch (IllegalArgumentException e) {
            // TODO Auto-generated catch block
            log(e.getMessage());
            sendVitalDeviceErrorBroadcast("ERROR");
        }

    }



    /*
    Don't send broadcasts from this function
     */
    private String startTimedStreamReading()
    {
        int count = 0;
        int hr_ = 0;
        int o2_ = 0;

        setCurrentMiniMessage("Receiving ... ");

        boolean lowBattery = false;
        while(true)
        {

            try {
                if(KILL_BT())
                {
                    log("NATIVE_QUIT. Closing.");
                    setCurrentMiniMessage("");
                    return "KILL_BT";
                }
                while(in.available() < 0)
                {
                    if(KILL_BT())
                    {
                        log("NATIVE_QUIT. Closing.");
                        setCurrentMiniMessage("");
                        return "KILL_BT";
                    }
                }
                if(KILL_BT())
                {
                    log("NATIVE_QUIT. Closing.");
                    setCurrentMiniMessage("");
                    return "KILL_BT";
                }

                byte b1 = (byte) in.read();
                byte b2 = (byte) in.read();
                byte b3 = (byte) in.read();
                byte b4 = (byte) in.read();


                boolean lowBatteryBool = ((b4 & 0x01)==1);
                short s1 = (short) ( b1 & 0x03 );
                short s2 = (short) b2;

                hr_ = (short) ((s1 << 7) | s2);
                o2_ = b3;

                String st = hr_ + " bpm, " + o2_ + " %";
                log(st);
                setCurrentMiniMessage("Receiving: " + st);

                count++;
                if(count % 5 == 0)
                {
                    // to write below
                    saveVitalReadings(vitalType, "" + o2_, "" + hr_, "", System.currentTimeMillis());
                }
                if(count > 10)
                    break;

            } catch (IOException e) {
                // TODO Auto-generated catch block
                log("NATIVE_QUIT. Closing.");
                setCurrentMiniMessage("");
                return "ERROR";
            }

        } // end of data fetch while
        setFinalReadingMessage("O2-Sat: " + o2_ + "%.  HR: " + hr_ + " bpm.");
        return "OK";
    }


    private String finalReadingMessage = "";
    private void setFinalReadingMessage(final String str) {
        log("Setting final Message: " + str);
        this.finalReadingMessage = str;
    }


    public void sendFormatSelection() throws IOException
    {
        byte final_command[] = new byte[8];

        final_command[0] = (byte) 0x02;
        final_command[1] = (byte) 0x70;
        final_command[2] = (byte) 0x04;
        final_command[3] = (byte) 0x02;
        final_command[4] = (byte) 0x08;
        final_command[5] = (byte) 0x01;
        final_command[6] = (byte) (0x76 + 0x08 + 0x01);
        final_command[7] = (byte) 0x03;

        ByteArrayOutputStream bytearr = new ByteArrayOutputStream();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e3) {
            log(e3.getMessage());
        }

        try {
            bytearr.write(final_command);
        } catch (IOException e2) {

            log(e2.getMessage());
            sendVitalDeviceErrorBroadcast("ERROR");
            return;
        }

        //Log.d("BT_Sugar", "Sending " + command);

        // SEND COMMAND
        try {
            bytearr.writeTo(out);
        } catch (IOException e1) {
            log(e1.getMessage());
            sendVitalDeviceErrorBroadcast("ERROR");
            return;
        }
        bytearr.reset();
        try {
            bytearr.close();
        } catch (IOException e) {
            log(e.getMessage());
            sendVitalDeviceErrorBroadcast("ERROR");
            return;
        }

        // YET TO IMPLEMENT READ BYTES for ACK
        // ..
        // ..
        // ..
        ignoreByteResponse();

    }


    private void ignoreByteResponse() throws IOException
    {
        log("=== ACK BEGIN ====");
        log((byte) in.read() + ""); //stx
        log("=== ACK END ====");
    }

    private void setCurrentMiniMessage(final String str) {
        sendVitalReadingMiniMessageBroadcast(str);
    }

    private boolean KILL_BT() {

        if(btReadingsJsInterfaceWeakReference.get().wasThereAnOperationCancel()) {
            log("There was an operation cancel");
            return true;
        }

        return false;
    }



}
