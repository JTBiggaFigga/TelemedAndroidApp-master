package com.mwellness.mcare.telemed.vitals.bluetooth.spp.devices;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Message;
import android.support.v4.content.LocalBroadcastManager;

import com.mwellness.mcare.telemed.BuildConfig;
import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.app.AMainActivity;
import com.mwellness.mcare.telemed.app.AMainApp;
import com.mwellness.mcare.telemed.app.jsinterfaces.BTReadingsJsInterface;
import com.mwellness.mcare.telemed.bootstrap.utils.GsonUtils;
import com.mwellness.mcare.telemed.bootstrap.utils.NewJavaBase64;
import com.mwellness.mcare.telemed.bootstrap.utils.arrays.FromByteArray;
import com.mwellness.mcare.telemed.bootstrap.utils.arrays.ToByteArray;
import com.mwellness.mcare.telemed.vitals.bluetooth.spp.BtSppCommunicator;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * Created by dev01 on 1/4/18.
 */

public class Ecg_Faros360Communicator extends BtSppCommunicator {

    private static volatile Ecg_Faros360Communicator faros360EcgCommunicator;

    private static void log(final String str) {
        ALog.log(Ecg_Faros360Communicator.class, str);
    }

    public static final int FAROS_SAMPLE_RATE = 250;

    private ConcurrentLinkedQueue<Byte> farosByteQueue;
    public ConcurrentLinkedQueue<Short> ch1ShortQueue;

    private HandlerThread pktStateHandlerThread;

    public static Ecg_Faros360Communicator getInstance(final int vitalType) {

        //if(faros360EcgCommunicator == null)
        {
            faros360EcgCommunicator = new Ecg_Faros360Communicator();

            faros360EcgCommunicator.pktStateHandlerThread = new HandlerThread("farosBtInputStreamHandlerThread");
            faros360EcgCommunicator.pktStateHandlerThread.start();

            faros360EcgCommunicator.setVitalType(vitalType);
        }

        return faros360EcgCommunicator;
    }

    private void setVitalType(int vitalType) {
        super.vitalType = vitalType;
    }

    // defined in gradle build file
    public static final long RECORDING_TIME_MS = BuildConfig.ECG_RECORDING_TIME_MS;


    @Override
    public void disconnectSpp() {
        super.disconnectSpp();

        endEverything();

        final BluetoothSocket sck = super.sck;

        //sendStopStreamingCommand();

        /*new Thread(()-> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        */
        sendPowerOffCommand();
        //});

        new Thread(() -> {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            if(inputStreamThread != null) {
                try {
                    inputStreamThread.interrupt();
                    inputStreamThread.stop();
                    inputStreamThread = null;
                }
                catch (Exception e) {

                }
            }

            if(sck != null) {
                try {
                    log("Ecg_Faros360Communicator::disconnectSpp()");
                    sck.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }



        }).start();


    }


    Timer communicationAfterConnectedTimer;

    @Override
    public void communicate(final BluetoothSocket sck, final InputStream is, final OutputStream os, BluetoothDevice dev, WeakReference<BTReadingsJsInterface> callerInterfaceWR) {

        super.communicate(sck, is, os, dev, callerInterfaceWR);

        this.in = is;
        this.out = os;

        ended = false;

        final long communicationTimeoutMs = 10000;
        communicationAfterConnectedTimer = new Timer();
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


        farosByteQueue = new ConcurrentLinkedQueue<>();
        ch1ShortQueue = new ConcurrentLinkedQueue<>();

        sendBtSppConnectedBroadcast();


        log("Connected to Faros ... ");

        receivedData = false;

        log("Sending Stop Command");
        sendStopStreamingCommand();

        log("Starting Input Stream");
        runInputStreamThread();



    }



    private static boolean receivedData = false;

    private static boolean ended = false;

    private boolean RECORDING_MODE = false;

    private static final String LAST_COMMAND_SENT_POWER_OFF = "LAST_COMMAND_SENT_POWER_OFF";
    private static final String LAST_COMMAND_SENT_STOP_STREAMING = "LAST_COMMAND_SENT_STOP_STREAMING";
    private static final String LAST_COMMAND_SENT_GET_FIRMWARE_INFO = "LAST_COMMAND_SENT_GET_FIRMWARE_INFO";
    private static final String LAST_COMMAND_SENT_GET_BATTERY_INFO = "LAST_COMMAND_SENT_GET_BATTERY_INFO";
    private static final String LAST_COMMAND_SENT_SET_CONFIGURATION = "LAST_COMMAND_SENT_SET_CONFIGURATION";
    private static final String LAST_COMMAND_SENT_START_STREAMING = "LAST_COMMAND_SENT_START_STREAMING";
    private static final String LAST_COMMAND_SENT_NONE = "NONE";

    private String LAST_COMMAND_SENT = LAST_COMMAND_SENT_NONE;


    protected void endEverything() {
        this.ended = true;
    }


    protected long recordStartTimestamp = -1;

    protected Thread inputStreamThread;

    private void runInputStreamThread() {

        initPacketStateHandler();

        log("Started Receiving Async ...");

        inputStreamThread = new Thread(new Runnable() {
            @Override
            public void run() {

                while(!ended) {

                    try {
                        int count = in.available();

                        if(count == 0) {
                            Thread.sleep(500);
                            continue;
                        }

                        log(count + " bytes in buffer");

                        if(communicationAfterConnectedTimer != null) {
                            communicationAfterConnectedTimer.cancel();
                            communicationAfterConnectedTimer.purge();
                            communicationAfterConnectedTimer = null;
                        }

                        if(RECORDING_MODE) {

                            final byte[] signalPortion = new byte[count];
                            in.read(signalPortion);

                            pktStateHandler.obtainMessage(INPUT_RECEIVED_NEW_DATA, signalPortion).sendToTarget();
                        }
                        else
                        {

                            log("Last Command Sent: " + LAST_COMMAND_SENT);
                            switch (LAST_COMMAND_SENT) {

                                case LAST_COMMAND_SENT_STOP_STREAMING: {

                                    byte[] data = new byte[count];
                                    in.read(data);

                                    Arrays.copyOfRange(data, 0, count - 7);
                                    byte[] response = Arrays.copyOfRange(data, count - 7, count);

                                    String responseStr = new String(response);
                                    log("Response: " + responseStr);

                                    if(responseStr.equals("wbaack\r")) {
                                        log("STOP STREAMING ACK");
                                        pktStateHandler.obtainMessage(INPUT_HANDLER_STOP_STREAMING_RECEIVED_ACK).sendToTarget();
                                    }

                                    break;
                                }

                                case LAST_COMMAND_SENT_GET_FIRMWARE_INFO: {

                                    byte[] data = new byte[count];
                                    in.read(data);

                                    String responseStr = new String(data);
                                    log("Response: " + responseStr);

                                    log("FIRMWARE RECEIVED ACK: " + responseStr);

                                    pktStateHandler.obtainMessage(INPUT_HANDLER_FIRMWARE_INFO_RECEIVED_ACK).sendToTarget();

                                    break;
                                }

                                case LAST_COMMAND_SENT_GET_BATTERY_INFO: {

                                    byte[] data = new byte[count];
                                    in.read(data);

                                    String responseStr = new String(data);
                                    log("Response: " + responseStr);

                                    if(responseStr.contains("wbabat")) {

                                        int battery = Integer.parseInt(responseStr.split("wbabat")[1].replaceAll("\r", ""));

                                    /*Intent i2 = AMainActivity.createWebviewBroadcastEventIntent(AMainApplication.MAIN_EVENT_ECG_BATTERY_UPDATE);
                                    i2.putExtra("ecgBattery", battery);
                                    LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i2);*/

                                        log("BATTERY RECEIVED ACK: " + responseStr);
                                    }

                                    pktStateHandler.obtainMessage(INPUT_HANDLER_BATTERY_INFO_RECEIVED_ACK).sendToTarget();

                                    break;
                                }

                                case LAST_COMMAND_SENT_SET_CONFIGURATION: {

                                    byte[] response = new byte[7];
                                    in.read(response, 0, 7);

                                    String responseStr = new String(response);
                                    log("Response: " + responseStr);

                                    if(responseStr.equals("wbaack\r")) {
                                        log("CONFIG ACK");
                                        pktStateHandler.obtainMessage(INPUT_HANDLER_CONFIGURATION_RECEIVED_ACK).sendToTarget();
                                    }

                                    break;
                                }

                                case LAST_COMMAND_SENT_START_STREAMING: {

                                    byte[] data = new byte[count];
                                    in.read(data);

                                    byte[] response = Arrays.copyOfRange(data, 0, 7);
                                    byte[] signalPortion = Arrays.copyOfRange(data, 7, count);

                                    String responseStr = new String(response);
                                    log("Response: " + responseStr);




                                    if(responseStr.equals("wbav10\r")) {

                                        RECORDING_MODE = true;

                                        pktStateHandler.obtainMessage(INPUT_HANDLER_START_STREAMING_RECEIVED_ACK).sendToTarget();
                                        pktStateHandler.obtainMessage(INPUT_RECEIVED_NEW_DATA, signalPortion).sendToTarget();

                                        recordStartTimestamp = System.currentTimeMillis();

                                        /*// timeout thread
                                        new Thread(new Runnable() {

                                            @Override
                                            public void run() {


                                                log("Starting Timer for strip reading");
                                                try {
                                                    Thread.sleep(RECORDING_TIME_MS);
                                                } catch (InterruptedException e) {
                                                    e.printStackTrace();
                                                }


                                                log("Recording Time Finished!");

                                                if(ended) {
                                                    return;
                                                }



                                            }

                                        }).start();*/


                                        // packet parser
                                        new Thread(new Runnable() {
                                            @Override
                                            public void run() {

                                                log("Running byteQueue parser thread!");
                                                while(!ended) {

                                                    if(KILL_BT())
                                                    {
                                                        log("NATIVE_QUIT. Closing.");
                                                        setCurrentMiniMessage("");
                                                        return;
                                                    }

                                                    while (farosByteQueue.size() >= FAROS_PKT_SIZE) {

                                                        if(KILL_BT())
                                                        {
                                                            log("NATIVE_QUIT. Closing.");
                                                            setCurrentMiniMessage("");
                                                            return;
                                                        }

                                                        log("FarosTalk.inputByteQueue.size() = " + farosByteQueue.size());

                                                        byte[] farosPkt = new byte[FAROS_PKT_SIZE];
                                                        for (int i = 0; i < FAROS_PKT_SIZE; i++) {
                                                            farosPkt[i] = farosByteQueue.poll();
                                                        }

                                                        new FarosPacket(farosPkt, vitalType, faros360EcgCommunicator);
                                                    }

                                                    try {
                                                        Thread.sleep(100);
                                                    } catch (InterruptedException e) {
                                                        e.printStackTrace();
                                                    }
                                                } // end-while(!queue.len > faros_pkt_size)
                                            } // end-while (!ended)
                                        }).start();
                                    }

                                    break;
                                }

                            }

                        }

                    } catch (IOException e) {
                        e.printStackTrace();
                        break;
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                } // end-while (!ended)


                try {
                    out.close();
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        inputStreamThread.start();

    }





    private static final int INPUT_HANDLER_STOP_STREAMING_RECEIVED_ACK = 9001;
    private static final int INPUT_HANDLER_FIRMWARE_INFO_RECEIVED_ACK = 9011;
    private static final int INPUT_HANDLER_BATTERY_INFO_RECEIVED_ACK = 9012;
    private static final int INPUT_HANDLER_CONFIGURATION_RECEIVED_ACK = 9002;
    private static final int INPUT_HANDLER_START_STREAMING_RECEIVED_ACK = 9003;

    private static final int INPUT_RECEIVED_NEW_DATA = 9004;

    private void initPacketStateHandler() {

        // handler
        pktStateHandler = new Handler(pktStateHandlerThread.getLooper()) {

            @Override
            public void handleMessage(Message msg) {
                switch (msg.what) {

                    case INPUT_HANDLER_STOP_STREAMING_RECEIVED_ACK: {
                        log("STOP STREAMING ACK recd");

                        sendGetFirmwareInfoCommand();

                        break;
                    }


                    case INPUT_HANDLER_FIRMWARE_INFO_RECEIVED_ACK: {
                        log("FIRMWARE ACK recd");

                        sendGetBatteryInfoCommand();

                        break;
                    }

                    case INPUT_HANDLER_BATTERY_INFO_RECEIVED_ACK: {
                        log("BATTERY ACK recd");

                        sendConfigurationCommand();

                        break;
                    }


                    case INPUT_HANDLER_CONFIGURATION_RECEIVED_ACK: {
                        log("CONFIGURATION ACK recd");

                        sendStartStreamingCommand();

                        break;
                    }

                    case INPUT_HANDLER_START_STREAMING_RECEIVED_ACK: {

                        log("START STREAMING ACK recd");

                        // do nothing ...

                        break;
                    }



                    case INPUT_RECEIVED_NEW_DATA: {

                        receivedData = true;

                        log("Received new byte data from device ... adding to byte queue ... ");

                        for(byte b : (byte[]) msg.obj)
                            farosByteQueue.add(b);

                        break;
                    }
                }
            }
        };
    }

    private static final int FAROS_PKT_SIZE = 128;

    private Handler pktStateHandler;




    private String finalReadingMessage = "";
    private void setFinalReadingMessage(final String str) {
        log("Setting final Message: " + str);
        this.finalReadingMessage = str;
    }







    ///////////////////////////////////
    // COMMANDS ////////////////////
    ////////////////////////////


    private void sendStartStreamingCommand() {

        String cmd = "wbaom7\r";

        log(".");
        log("Sending Start Streaming ... ");
        log("SENDING COMMAND: " + cmd);
        sendBytesPktAsync(cmd.getBytes());

        LAST_COMMAND_SENT = LAST_COMMAND_SENT_START_STREAMING;
    }

    private void sendPowerOffCommand() {

        // 'stop streaming' command
        String cmd = "wbaom0\r";

        log(".");
        log("Sending Power Off Streaming ... ");
        log("SENDING COMMAND: " + cmd);
        sendBytesPktAsync(cmd.getBytes());

        LAST_COMMAND_SENT = LAST_COMMAND_SENT_POWER_OFF;
    }

    private void sendStopStreamingCommand() {

        // 'stop streaming' command
        String cmd = "wbaoms\r";

        log(".");
        log("Sending Stop Streaming ... ");
        log("SENDING COMMAND: " + cmd);
        sendBytesPktAsync(cmd.getBytes());

        LAST_COMMAND_SENT = LAST_COMMAND_SENT_STOP_STREAMING;
    }

    private void sendGetFirmwareInfoCommand() {

        String cmd = "wbainf\r";

        log(".");
        log("Sending Configuration ... ");
        log("SENDING COMMAND: " + cmd);
        sendBytesPktAsync(cmd.getBytes());

        LAST_COMMAND_SENT = LAST_COMMAND_SENT_GET_FIRMWARE_INFO;
    }

    private void sendGetBatteryInfoCommand() {

        String cmd = "wbabat\r";

        log(".");
        log("Sending Configuration ... ");
        log("SENDING COMMAND: " + cmd);
        sendBytesPktAsync(cmd.getBytes());

        LAST_COMMAND_SENT = LAST_COMMAND_SENT_GET_BATTERY_INFO;
    }

    private void sendConfigurationCommand() {

        //String cmd = "wbasds14000000\r";
        String cmd = "wbasds14000000\r";

        log(".");
        log("Sending Configuration ... ");
        log("SENDING COMMAND: " + cmd);
        sendBytesPktAsync(cmd.getBytes());

        LAST_COMMAND_SENT = LAST_COMMAND_SENT_SET_CONFIGURATION;
    }

    //
    private void sendBytesPktAsync(final byte[] pkt) {

        new Thread(new Runnable() {
            @Override
            public void run() {
                log("Sending: " + FromByteArray.toHexString(pkt));

                ByteArrayOutputStream bytearr = new ByteArrayOutputStream();
                try {
                    bytearr.write(pkt);
                } catch (IOException e2) {

                    log(e2.getMessage());
                    e2.printStackTrace();
                }

                try {
                    bytearr.writeTo(out);
                    out.flush();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
                bytearr.reset();
                try {
                    bytearr.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }).start();


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



    //
}


class FarosPacket {


    private int vitalType;

    public static long frameCount = 0;

    public static int lastPktNumber = -1;

    private byte[] body;

    private static ConcurrentLinkedQueue<Short> ch1Queue = new ConcurrentLinkedQueue<>();
    private static ConcurrentLinkedQueue<Short> ch2Queue = new ConcurrentLinkedQueue<>();


    Ecg_Faros360Communicator communicator;

    private void log(String str) {
        ALog.log(FarosPacket.class, str);
    }

    FarosPacket(final byte[] body, final int vitalType, Ecg_Faros360Communicator communicator) {

        this.communicator = communicator;

        this.vitalType = vitalType;

        log("Incoming frame size: " + body.length + " bytes");

        if((char) body[0] == 'M' && (char) body[1] == 'E' && (char) body[2] == 'P') {

            log(" ");
            log("===============================");
            log("MEP found!");

            this.body = body;

            frameCount++;
            log(frameCount + " frames so far ");

            parseFrame();

        }
    }

    private void parseFrame()
    {
        byte flag = body[3];

        byte battX = getNthBit(flag, (byte) 7);
        byte battY = getNthBit(flag, (byte) 6);

        int frameLevelBatteryLevel = computeBatteryLevel(battX, battY);

        log("Frame-level battery value: " + frameLevelBatteryLevel);

        onBatteryLevelDetected(frameLevelBatteryLevel);

        byte[] pktNumber = new byte[] {body[7], body[6], body[5], body[4]};
        int pktNumberInt = FromByteArray.toIntArray(pktNumber)[0];
        log("Pkt Number: " + pktNumberInt);


        int diffPktNumbers = (pktNumberInt - lastPktNumber);

        if(diffPktNumbers > 1 && lastPktNumber > -1) {
            createEmptyPackets(lastPktNumber, diffPktNumbers);
        }

        lastPktNumber = pktNumberInt;

        short[] ch1Shorts = byteArrayToShorts(Arrays.copyOfRange(body, 8, 108));
        short[] ch2Shorts = ch1Shorts; //byteArrayToShorts(Arrays.copyOfRange(body, 108, 208));

        addToQueue(ch1Shorts, ch2Shorts);

        log("");
        log("Ch1: " + GsonUtils.getInstance().toJson(ch1Shorts));
        log("Ch2: " + GsonUtils.getInstance().toJson(ch2Shorts));

    }


    private void createEmptyPackets(int firstNumber, int count) {

        for(int i = firstNumber; i < firstNumber + count; i++) {

            log("Creating empty pkt number: " + firstNumber);
            //addToQueue(new short[EcgProps.SAMPLE_RATE/5], new short[EcgProps.SAMPLE_RATE/5]);
            //addToQueue(new short[EcgProps.RECORDING_SAMPLE_RATE/5], new short[EcgProps.RECORDING_SAMPLE_RATE/5]);

        }

    }


    private byte getNthBit(byte theByte, byte nPosition)
    {
        return (byte) ((theByte >> nPosition) & (byte) 1);
    }

    private short[] byteArrayToShorts(final byte[] chByteArr) {

        short[] out = new short[chByteArr.length/2];

        for(int i = 0, j = 0; i < chByteArr.length; i+=2, j++) {
            byte lsb = chByteArr[i];
            byte msb = chByteArr[i+1];

            out[j] = FromByteArray.toShort(msb, lsb);
        }

        return out;
    }


    private int computeBatteryLevel(byte b1, byte b2) {

        if(b1 == 1 && b2 == 1) {
            return 100;
        }
        else if(b1 == 1 && b2 == 0) {
            return 50;
        }
        else if(b1 == 0 && b2 == 1) {
            return 20;
        }
        else if(b1 == 0 && b2 == 0) {
            return 5;
        }
        else {
            return 0;
        }
    }

    private synchronized void addToQueue(final short[] ch1S, final short[] ch2S) {

        for(short ch1: ch1S) {
            ch1Queue.add(ch1);
        }

        for(short ch2: ch2S) {
            ch2Queue.add(ch2);
        }

        if(ch1Queue.size() >= Ecg_Faros360Communicator.FAROS_SAMPLE_RATE) {

            ArrayList<Short> ch1Second = new ArrayList<>();
            ArrayList<Short> ch2Second = new ArrayList<>();

            for(int i = 0; i < Ecg_Faros360Communicator.FAROS_SAMPLE_RATE; i++) {
                ch1Second.add(ch1Queue.poll());
                ch2Second.add(ch2Queue.poll());
            }

            log(" ");
            log("One Second Complete ... ");
            log("Ch1 (1-second): " + GsonUtils.getInstance().toJson(ch1Second));
            log("Ch2 (1-second): " + GsonUtils.getInstance().toJson(ch2Second));

            onOneSecondDataAvailable(ch1Second, ch2Second);
        }
    }


    private void onBatteryLevelDetected(final int batteryLevel) {
        /*Intent i2 = AMainActivity.createWebviewBroadcastEventIntent(AMainApplication.MAIN_EVENT_ECG_BATTERY_UPDATE);
        i2.putExtra("ecgBattery", batteryLevel);
        LocalBroadcastManager.getInstance(AMainApplication.getAppContext()).sendBroadcast(i2);*/
    }


    private void onOneSecondDataAvailable(final ArrayList<Short> ch1, final ArrayList<Short> ch2) {


        short[] ch1Shorts = new short[ch1.size()];
        short[] ch2Shorts = new short[ch2.size()];

        int i = 0;
        for(Short s: ch1) { ch1Shorts[i] = s; i++; }
        i = 0;
        for(Short s: ch2) { ch2Shorts[i] = s; i++; }


        /*Intent i2 = AMainActivity.createWebviewBroadcastEventIntent(AMainApplication.MAIN_EVENT_ECG_NEW_ONE_SECOND_DATA);
        i2.putExtra("ch1", ch1Shorts);
        i2.putExtra("ch2", ch2Shorts);

        LocalBroadcastManager.getInstance(AMainApplication.getAppContext()).sendBroadcast(i2);*/

        sendOneSecondCh1MesgForViewing(ch1Shorts, ch2Shorts);
    }


    /**
     * Send one second data to a localbroadcast receiver for drawing on screen
     * @param ch1EcgOneSec
     */
    public synchronized void sendOneSecondCh1MesgForViewing(final short[] ch1EcgOneSec, final short[] ch2EcgOneSec) {

        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.EVENT_FAROS_NEW_ONE_SECOND_DATA);
        i7.putExtra("ch1EcgOneSec", ch1EcgOneSec);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcastSync(i7);

        for(short s: ch1EcgOneSec)
            //Ecg_Faros360Communicator.getInstance(vitalType).ch1ShortQueue.add(s);
            communicator.ch1ShortQueue.add(s);

        long sampleSize = communicator.ch1ShortQueue.size();
        long expectedSampleSize = (communicator.FAROS_SAMPLE_RATE * communicator.RECORDING_TIME_MS / 1000);
        if(sampleSize >= expectedSampleSize) {
            short[] ch1Shorts = new short[communicator.ch1ShortQueue.size()];
            int i = 0;
            for(short s: communicator.ch1ShortQueue) {
                ch1Shorts[i] = communicator.ch1ShortQueue.poll();
                i++;
            }


            final String ecgB64Str = NewJavaBase64.getEncoder().encodeToString(ToByteArray.fromShortArray(ch1Shorts));

            communicator.disconnectSpp();

            communicator.saveVitalReadings(vitalType, ecgB64Str, "", "", communicator.recordStartTimestamp);
            communicator.sendVitalReadingFinishedBroadcast("ECG Strip Finished.");
        }
    }


}
