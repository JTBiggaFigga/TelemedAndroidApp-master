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

public class Sugar_ForaTestNGoCommunicator extends BtSppCommunicator {

    private static volatile Sugar_ForaTestNGoCommunicator foraTestNGoSugarCommunicator;

    private static void log(final String str) {
        ALog.log(Sugar_ForaTestNGoCommunicator.class, str);
    }

    public static BtSppCommunicator getInstance(final int vitalType) {

        if(foraTestNGoSugarCommunicator == null) {
            foraTestNGoSugarCommunicator = new Sugar_ForaTestNGoCommunicator();
        }

        foraTestNGoSugarCommunicator.setVitalType(vitalType);

        return foraTestNGoSugarCommunicator;
    }

    private void setVitalType(int vitalType) {
        super.vitalType = vitalType;
    }



    private boolean KILL_BT() {

        if(btReadingsJsInterfaceWeakReference.get().wasThereAnOperationCancel()) {
            log("There was an operation cancel");
            return true;
        }

        return false;
    }


    private void setCurrentMiniMessage(final String str) {
        sendVitalReadingMiniMessageBroadcast(str);
    }


    @Override
    public void communicate(final BluetoothSocket sck, final InputStream in, final OutputStream out, BluetoothDevice dev, WeakReference<BTReadingsJsInterface> callerInterfaceWR) {

        super.communicate(sck, in, out, dev, callerInterfaceWR);

        this.in = in;
        this.out = out;


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
            log("Clearing input Stream ... ");

            if(in.available() > 0)
            {
                while(in.available() > 0)
                {
                    if(KILL_BT()){log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");
                    //setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);
                    return;}
                    log(toHex((byte)in.read()));
                }
                log("Cleared ... ");
            }


            int n =  0; //getNumberOfReadings();

            if(KILL_BT()) {
                log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");
                //setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);
                return;
            }

            try {Thread.sleep(500);} catch (InterruptedException e) {e.printStackTrace();}


            // GETTING READING ...
            log("Requesting Reading ... ");
            String reading = (String) getReading(n);


            if(reading.equals("KILL_BT"))
            {
                log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");
                //setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);
                return;
            }

            if(reading.equals("DEVICE_READING_MEMORY_EMPTY"))
            {
                // POWER IT OFF
                log("POWEROFF");
                powerOffSensor();

                setCurrentMiniMessage("Device Memory is Empty.");
            }
            else
            {
                String str[] = reading.split(",");
                log("Reading: " + str.toString());

                sendSpotVitalReadingToServer(str[0], str[1], str[2]);

                //if(KILL_BT()){log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);return;}


                //log("Getting Battery Status");
                //getBatteryStatus();

                if(KILL_BT()) {
                    log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");
                    //setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);
                    return;
                }

                try {Thread.sleep(500);} catch (InterruptedException e) {e.printStackTrace();}

                log("Clearing readings");

                // DELETING READINGS
                deleteAllReadings();

                if(KILL_BT()) {
                    log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");
                    //setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);
                    return;
                }


                try {Thread.sleep(500);} catch (InterruptedException e) {e.printStackTrace();}

                // POWER IT OFF
                log("POWEROFF");
                powerOffSensor();

                // SET FINAL READING ...
                setCurrentMiniMessage(str[3]);

                sendVitalReadingFinishedBroadcast(finalReadingMessage);

                setCurrentMiniMessage("");
            }


        } catch (SecurityException e) {
            // TODO Auto-generated catch block
            log(e.getMessage());
        } catch (IllegalArgumentException e) {
            // TODO Auto-generated catch block
            log(e.getMessage());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            log(e.getMessage());
        }


    }


    private void sendSpotVitalReadingToServer(final String v1, final String v2, final String v3) {
        saveVitalReadings(vitalType, v1, v2, v3, System.currentTimeMillis());
    }


    private String finalReadingMessage = "";
    private void setFinalReadingMessage(final String str) {
        log("Setting final Message: " + str);
        this.finalReadingMessage = str;
    }


    private byte[] createFrame(byte cmd, byte d0, byte d1, byte d2, byte d3)
    {
        byte frame[] = new byte[8];

        frame[0] = (byte)0x51;
        frame[1] = (byte)cmd;
        frame[2] = (byte)d0;
        frame[3] = (byte)d1;
        frame[4] = (byte)d2;
        frame[5] = (byte)d3;
        frame[6] = (byte)0xa3;
        byte chksum = 0;
        for(byte i = 0; i < 7; i++)
        {
            chksum += frame[i];
        }
        frame[7] = (byte)chksum;

        printFrame(frame);

        return frame;
    }

    public void ignoreACK() throws IOException
    {
        // 8 BYTES TO IGNORE
        // You might want to implement if-else for an N-ACK
        in.read();in.read();in.read();in.read();in.read();in.read();in.read();in.read();
    }

    public void deleteAllReadings() throws IOException
    {
        try {Thread.sleep(500);} catch (InterruptedException e) {e.printStackTrace();}

        log("delete readings");

        if(KILL_BT())
        {
            log("NATIVE_QUIT. Closing.");
            setCurrentMiniMessage("");
            return;
        }

        setCurrentMiniMessage("Finishing ... ");

        log("CLEARING");
        byte clear_command[] = createFrame((byte)0x52,(byte)0x1,(byte)0,(byte)0,(byte)0);

        ByteArrayOutputStream bytearr1 = new ByteArrayOutputStream();
        try {
            bytearr1.write(clear_command);
            bytearr1.flush();
        } catch (IOException e4) {
            e4.printStackTrace();
        }
        try {
            bytearr1.writeTo(out);
        } catch (IOException e1) {
            e1.printStackTrace();
        }
        bytearr1.flush();
        bytearr1.reset();

        // getting ACK
        ignoreACK();

        setCurrentMiniMessage("");
    }

    public int getNumberOfReadings() throws IOException
    {
        try {Thread.sleep(500);} catch (InterruptedException e) {e.printStackTrace();}

        log("Getting Number of Records ... ");
        byte num_records_command[] = createFrame((byte)0x2b,(byte)0x1,(byte)0,(byte)0,(byte)0);
        ByteArrayOutputStream bytearr1 =  new ByteArrayOutputStream();
        try {
            bytearr1.write(num_records_command);
            bytearr1.flush();
        } catch (IOException e4) {
            // TODO Auto-generated catch block
            e4.printStackTrace();
        }
        try {
            bytearr1.writeTo(out);
        } catch (IOException e1) {
            e1.printStackTrace();
        }
        bytearr1.flush();
        bytearr1.reset();
        ////////////////////////////
        setCurrentMiniMessage("Communicating ... 20%");

        try {Thread.sleep(500);} catch (InterruptedException e) {e.printStackTrace();}

        ////////////// GET RESPONSE = NUMBER OF RECORDS //////////////////////////////
        while(in.available() < 0)
        {
            if(KILL_BT())
            {
                log("NATIVE_QUIT. Closing.");
                setCurrentMiniMessage("");
                return -1;
            }
        }

        if(KILL_BT()) {
            log("NATIVE_QUIT. Closing.");
            setCurrentMiniMessage("");
            return -1;
        }

        byte start = (byte)in.read(); // start
        byte cmd = (byte)in.read(); // command
        log("[" + toHex(start) + "," + toHex(cmd) + "]");
		/*
		if(cmd != (byte)0x2b)
		{
			log("bad command");
			log(toHex((byte)in.read()));
			log(toHex((byte)in.read()));
			log(toHex((byte)in.read()));
			log(toHex((byte)in.read()));
		}

		start = (byte)in.read();
		cmd = (byte)in.read();
		*/

        byte b1 = (byte)in.read();
        byte b2 = (byte)in.read();

        int index = intOf2Bytes(b1, b2);// D0

        log(toHex(b1));
        log(toHex(b2));

        log(toHex((byte)in.read()));
        log(toHex((byte)in.read()));
        log(toHex((byte)in.read()));
        log(toHex((byte)in.read()));

        //////////////////////////
        setCurrentMiniMessage("Communicating ... 50%");

        return index;
    }




    private void ignoreByteResponse() throws IOException
    {
        log("=== ACK BEGIN ====");
        log((byte) in.read() + ""); //stx
        log("=== ACK END ====");
    }

    public String getReading(int index) throws IOException
    {

        // GETTING Nth Reading Info from Device 0x25

        if(KILL_BT()) {
            log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");
            //setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);
            return "";
        }

        log("Getting Record Number " + index);
        byte command0[] = createFrame((byte)0x25,(byte)0,(byte)index,(byte)0,(byte)0x1);

        ByteArrayOutputStream bytearr1;
        bytearr1 = new ByteArrayOutputStream();
        try {
            bytearr1.write(command0);
            bytearr1.flush();
        } catch (IOException e4) {
            // TODO Auto-generated catch block
            log(e4.getMessage());
        }
        try {
            bytearr1.writeTo(out);
        } catch (IOException e1) {
            log(e1.getMessage());
        }
        bytearr1.flush();
        bytearr1.reset();

        if(KILL_BT()) {
            log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");
            //setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);
            return "";
        }

        try {Thread.sleep(500);} catch (InterruptedException e) {e.printStackTrace();}

        while(in.available() < 0)
        {
            if(KILL_BT()){log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");
            //setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);
            return "KILL_BT";}
        }

        log(toHex((byte)in.read())); // start ignore
        byte cmd = (byte)in.read();
        log(toHex(cmd)); // cmd ignore

        if(cmd != (byte)0x25)
        {
            log("2b found ... ");
            in.read();in.read();in.read();in.read();
            in.read();in.read();
            log("========= 2b flushed ========");

            byte start1 = (byte)in.read();
            log(toHex(start1));
            log(toHex((byte)in.read()));
        }

        if(cmd == (byte)0x25)
        {
            log("Receiving Reading Type ... ");
        }

        byte b1 = (byte)in.read();
        byte b2 = (byte)in.read();
        byte b3 = (byte)in.read();
        byte b4 = (byte)in.read();

        log(toBinS(b1));
        log(toBinS(b2));
        log(toBinS(b3));
        log(toBinS(b4));


        if(b1 == 0 && b2 == 0 && b3 == 0 && b4 == 0)
        {
            setFinalReadingMessage("Memory Empty. Please take a reading.");
            return "DEVICE_READING_MEMORY_EMPTY";
        }

        //play with b3
        // 8th bit (i.e b3[7]) of byte 3 indicates sugar or bp
        // 1 = BP
        // 0 = Sugar
        int type = Integer.parseInt(getNthBit(b3, 7));


        final int TYPE_BP = 1;
        final int TYPE_SUGAR = 0;


        log(((type==TYPE_BP)?"BP":"Sugar"));

        in.read();
        in.read(); // ignore




        ///////////////////////////////////////////
        // GETTING Nth Reading from Device 0x26

        if(KILL_BT()) {
            log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");
            //setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);
            return "";
        }

        try {Thread.sleep(500);} catch (InterruptedException e) {e.printStackTrace();}

        log("Getting Record Number " + index);
        byte command[] = createFrame((byte)0x26,(byte)0,(byte)index,(byte)0,(byte)0x1);

        ByteArrayOutputStream bytearr3;
        bytearr3 = new ByteArrayOutputStream();
        try {
            bytearr3.write(command);
            bytearr3.flush();
        } catch (IOException e4) {
            // TODO Auto-generated catch block
            log(e4.getMessage());
        }
        try {
            bytearr3.writeTo(out);
        } catch (IOException e1) {
            log(e1.getMessage());
        }
        bytearr3.flush();
        bytearr3.reset();

        if(KILL_BT()) {
            log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");
            //setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);
            return "";
        }


        setCurrentMiniMessage("Communicating ... 80%");

        try {Thread.sleep(500);} catch (InterruptedException e) {e.printStackTrace();}

        ////////// GET RESPONSE: SUGAR READING ///////
        while(in.available() < 0)
        {
            if(KILL_BT()) {
                log("NATIVE_QUIT. Closing.");setCurrentMiniMessage("");
                //setBTState(BT_STATE_FINISHED);setBTDevice(BT_DEV_NONE);
                return "";
            }
        }


        log(toHex((byte)in.read())); // start ignore
        byte cmd1 = (byte)in.read(); // cmd ignore
        log("cmd: " + toHex(cmd1));
        if(cmd1 != (byte)0x26)
        {
            log("cmd Not x26");
            in.read();in.read();in.read();in.read();
            in.read();in.read();
            in.read();// start
            log("cmd: " + toHex((byte)in.read()));
        }

        byte b11 = (byte)in.read();
        byte b21 = (byte)in.read();
        byte b31 = (byte)in.read();
        byte b41 = (byte)in.read();

        log("b1: " + toBinS(b11) + " = 0x" + toHex(b11));
        log("b2: " + toBinS(b21) + " = 0x" + toHex(b21));
        log("b3: " + toBinS(b31) + " = 0x" + toHex(b31));
        log("b4: " + toBinS(b41) + " = 0x" + toHex(b41));

        // DATA ////
        //sys = intOf2Bytes(b1, b2); // D0+D1
        ////////

        in.read();
        in.read(); // ignore

        if(b11 == (byte)0x99 && b21 == (byte)0x32 && b31 == (byte)0x2c && b41 == (byte)0x1b)
            return "DEVICE_READING_MEMORY_EMPTY";

        //log("[" + toHex(start) + "," + toHex(cmd) + "]");
        setCurrentMiniMessage("Communicating ... 100%");

        String displayStr = "";

        int sugar = intOf2Bytes(b11, b21);

        log("\nsugar: " + sugar + " mg/dl");
        setFinalReadingMessage("Sugar: " + sugar + " mg/dl");
        displayStr = "Blood Sugar: " + sugar+ " mg/dl";
        return sugar+",0,0,"+displayStr;




    }

    public void powerOffSensor() throws IOException
    {
        try {Thread.sleep(500);} catch (InterruptedException e) {e.printStackTrace();}

        // SENDING THE POWER OFF COMMAND 0x50
        byte poweroff_command[] = createFrame((byte)0x50,(byte)0,(byte)0,(byte)0,(byte)0);
        ByteArrayOutputStream bytearr1 = new ByteArrayOutputStream();
        try {
            bytearr1.write(poweroff_command);
            bytearr1.flush();
        } catch (IOException e4) {
            log(e4.getMessage());
        }
        try {
            bytearr1.writeTo(out);
        } catch (IOException e1) {
            log(e1.getMessage());
        }
        bytearr1.flush();
        bytearr1.reset();

        // NO NEED TO CATCH ACK
    }

    public String getNthBit(byte b, int n)
    {
        String s = toBinS(b);
        log(s);
        return s.charAt(s.length() - n - 1) + "";
    }

    public String toBinS(byte b)
    {
        String s = Integer.toBinaryString((int)b);

        String t = "";
        if(s.length() < 8)
        {
            for(int i = 0; i < (8-s.length()); i++)
            {
                t+="0";
            }
        }
        else if(s.length() > 8)
        {
            s = s.substring(s.length() - 8, s.length());
        }
        return t+s;
    }



}
