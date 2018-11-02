package com.mwellness.mcare.telemed.app.jsinterfaces;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.AsyncTask;
import android.support.v4.content.LocalBroadcastManager;
import android.webkit.JavascriptInterface;

import com.mwellness.mcare.telemed.R;
import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.app.AMainActivity;
import com.mwellness.mcare.telemed.app.AMainApp;
import com.mwellness.mcare.telemed.app.AMainTts;
import com.mwellness.mcare.telemed.app.constants.ServerSettings;
import com.mwellness.mcare.telemed.bootstrap.utils.ArrayScaler;
import com.mwellness.mcare.telemed.bootstrap.utils.GsonUtils;
import com.mwellness.mcare.telemed.storage.roomdb.VitalsRecord;
import com.mwellness.mcare.telemed.storage.roomdb.VitalsRecordDao;
import com.mwellness.mcare.telemed.storage.roomdb.VitalsSqliteDatabase;
import com.mwellness.mcare.telemed.vitals.BtDeviceInfo;
import com.mwellness.mcare.telemed.vitals.Vitals;
import com.mwellness.mcare.telemed.vitals.bluetooth.ble.CancellableGatt;
import com.mwellness.mcare.telemed.vitals.bluetooth.ble.devices.Bp_AndUa651Ble_Communicator;
import com.mwellness.mcare.telemed.vitals.bluetooth.ble.devices.Spo2_InnovoBle_Communicator;
import com.mwellness.mcare.telemed.vitals.bluetooth.ble.devices.Weight_AndUc352Ble_Communicator;
import com.mwellness.mcare.telemed.vitals.bluetooth.spp.BtSppCommunicator;
import com.mwellness.mcare.telemed.vitals.bluetooth.spp.BtSppCommunicatorFactory;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;

/**
 * Created by dev01 on 12/29/17.
 */

public class BTReadingsJsInterface {

    private static volatile BTReadingsJsInterface btReadingsJsInterface;

    public static final long LE_SCAN_PERIOD = 10000;
    public static final long LE_SCAN_FOR_READING_TIMEOUT_MS = 300000;


    private static volatile boolean discoveringDevices = false;
    private static volatile HashMap<String, BluetoothDevice> discoveredDevicesMap = new HashMap<>();
    private static volatile List<BtDeviceInfo> discoveredDeviceInfoList = new ArrayList<>();


    private long lastOperationStartedAt = -1;
    private long lastOperationCancelledAt = -1;



    private static volatile boolean isCurrentlyPairing =false;
    private static volatile boolean pairingSuccess = false;



    /**
     * Get the singleton instance of Shared Preferences Access
     * @return
     */
    public static BTReadingsJsInterface getInstance() {



        if(btReadingsJsInterface == null) {
            btReadingsJsInterface = new BTReadingsJsInterface();
        }

        return btReadingsJsInterface;
    }

    private BTReadingsJsInterface() {
    }

    private static void log(String str) {
        ALog.log(BTReadingsJsInterface.class, str);
    }


    @JavascriptInterface
    public synchronized String getServerBaseUrl() {
        return ServerSettings.HTTP_SCHEME + "://" + ServerSettings.APP_SERVER_IP + ServerSettings.APP_SERVER_PORT_SUFFIX;
    }


    @JavascriptInterface
    public synchronized void closeApp() {
        AMainActivity.getWeakRef().get().finish();
    }

    @JavascriptInterface
    public synchronized void takeVitalReadings(final String type, final String jsCallbackStr) {
        log("Taking Readings for " + type);
    }

    @JavascriptInterface
    public synchronized void setLastOperationStartedAt(final long lastMajorOperationAt) {
        log("Setting Last Operation Started At; " + lastMajorOperationAt);
        this.lastOperationStartedAt = lastMajorOperationAt;
    }

    @JavascriptInterface
    public synchronized void setLastOperationCancelledAt(final long lastOperationCancelledAt) {

        log("Setting Last Operation Cancelled At; " + lastOperationCancelledAt);
        this.lastOperationCancelledAt = lastOperationCancelledAt;


        if(this.currLeScanCallback != null) {
            log("Stopping scanning!");
            BluetoothAdapter.getDefaultAdapter().stopLeScan(this.currLeScanCallback);
            this.currLeScanCallback = null;
        }

        if(this.currDeviceGattCallback != null) {
            log("Disconnecting Gatt!");
            this.currDeviceGattCallback.disconnectGatt();
            this.currDeviceGattCallback = null;
        }

        if(this.currSppCommunicator != null) {
            log("Disconnecting SPP!");
            this.currSppCommunicator.disconnectSpp();
            this.currSppCommunicator = null;
        }


        if(commThread != null) {
            log("Interrupting comm thread ... ");
            commThread.interrupt();
        }

        speak(" ");
    }

    public boolean wasThereAnOperationCancel() {
        if(this.lastOperationCancelledAt > this.lastOperationStartedAt)
            return true;

        return false;
    }

    @JavascriptInterface
    public synchronized long getCurrentTimestamp() {
        return System.currentTimeMillis();
    }


    @JavascriptInterface
    public synchronized boolean isBtDevicePaired(final String mac) {
        log("Checking for paired device with mac: " + mac);
        for(BluetoothDevice dev: BluetoothAdapter.getDefaultAdapter().getBondedDevices()) {
            if(dev.getAddress().equals(mac)) {
                return true;
            }
        }

        return false;
    }

    @JavascriptInterface
    public synchronized BluetoothDevice getPairedDevice(final String mac) {
        log("Getting paired device with mac: " + mac);
        for(BluetoothDevice dev: BluetoothAdapter.getDefaultAdapter().getBondedDevices()) {
            if(dev.getAddress().equals(mac)) {
                return dev;
            }
        }

        log("Device with mac: " + mac + " not paired .. ");
        return null;
    }

    @JavascriptInterface
    public synchronized void speak(final String text) {
        log("Speaking TTS: " + text);
        AMainTts.getInstance().speak(text);
    }

    @JavascriptInterface
    public synchronized void discoverBtDevices(final String prefix) {

        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... voids) {

                if(discoveringDevices) {
                    log("Currently Discovering ... Returning ... ");
                    return null;
                }

                discoveringDevices = true;

                log("Request received to discover SPP devices ... with prefix '" + prefix + "'");

                BluetoothAdapter mBtAdapter = BluetoothAdapter.getDefaultAdapter();


                discoveredDeviceInfoList = new ArrayList<>();
                discoveredDevicesMap = new HashMap<>();

                for(BluetoothDevice dev: mBtAdapter.getBondedDevices()) {
                    if(dev.getName().contains(prefix)) {
                        discoveredDeviceInfoList.add(new BtDeviceInfo(dev.getAddress() + "", dev.getName() + "", true));
                        discoveredDevicesMap.put(dev.getAddress(), dev);
                    }
                }

                IntentFilter filter = new IntentFilter();
                filter.addAction(BluetoothDevice.ACTION_FOUND);
                filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_STARTED);
                filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);

                AMainApp.getAppContext().registerReceiver(new BroadcastReceiver() {


                    @Override
                    public void onReceive(Context context, Intent intent) {

                        String action = intent.getAction();

                        if (BluetoothAdapter.ACTION_DISCOVERY_STARTED.equals(action)) {

                            discoveringDevices = true;


                        } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {

                            log("Discovery finished!");
                            log("Devices Found: " + GsonUtils.getInstance().toJson(discoveredDeviceInfoList));

                            sendSppDeviceDiscoveredListReady();

                            unregister();

                            discoveringDevices = false;

                        } else if (BluetoothDevice.ACTION_FOUND.equals(action)) {

                            BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                            log("Found Device: " + device.getName() + " (" + device.getAddress() + ")");
                            if (device.getName() == null) {
                                return;
                            }

                            if (device.getName().contains(prefix)) {
                                if(!discoveredDevicesMap.containsKey(device.getAddress())) {
                                    discoveredDeviceInfoList.add(new BtDeviceInfo(device.getAddress() + "", device.getName() + "", false));
                                    discoveredDevicesMap.put(device.getAddress(), device);
                                }
                            }

                        }
                    }

                    private void unregister() {
                        AMainApp.getAppContext().unregisterReceiver(this);
                        discoveringDevices = false;
                    }


                }, filter);

                log("Starting discovery ... ");
                mBtAdapter.startDiscovery();

                return null;
            }
        }.execute();
    }




    @JavascriptInterface
    public synchronized void scanBleDevices(final String prefix) {
        new Thread(new Runnable() {

            @Override
            public void run() {

                /*BluetoothAdapter.getDefaultAdapter().disable();

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                BluetoothAdapter.getDefaultAdapter().enable();*/


                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                if(discoveringDevices) {
                    log("Currently Discovering ... Returning ... ");
                    return;
                }
                log(" ");
                log("Discovering LE devices ... with prefix '" + prefix + "'");

                discoveredDevicesMap = new HashMap<>();
                discoveredDeviceInfoList = new ArrayList<>();

                scanLeDevice();
            }


            private void scanLeDevice() {

                if(discoveringDevices) {
                    log("Currently Discovering ... Returning ... ");
                    return;
                }

                discoveringDevices = true;
                BluetoothAdapter.getDefaultAdapter().startLeScan(mLeScanCallback);


                // Stops scanning after a pre-defined scan period.
                new Timer().schedule(new TimerTask() {

                    @Override
                    public void run() {

                        discoveringDevices = false;

                        log("FINISHED SCANNING FOR " + prefix);
                        sendBleDeviceDiscoveredListReady();

                        BluetoothAdapter.getDefaultAdapter().getBluetoothLeScanner().stopScan(mScanCallback);
                        BluetoothAdapter.getDefaultAdapter().stopLeScan(mLeScanCallback);



                    }
                }, LE_SCAN_PERIOD);

            }

            ScanCallback mScanCallback = new ScanCallback() {
                @Override
                public void onScanResult(int callbackType, ScanResult result) {

                }

                @Override
                public void onScanFailed(int errorCode) {

                }
            };

            BluetoothAdapter.LeScanCallback mLeScanCallback = new BluetoothAdapter.LeScanCallback() {
                @Override
                public void onLeScan(BluetoothDevice dev, int i, byte[] bytes) {

                    if(!discoveringDevices) {
                        log("onLeScan: Currently not discovering ... Returning!");
                        return;
                    }

                    log("\tFound BLE Device: " + dev.getName() + "/" + dev.getAddress());

                    final BtDeviceInfo btDeviceInfo = new BtDeviceInfo(dev.getAddress(), dev.getName(), true);

                    String devName = dev.getName() + "";
                    if(devName.contains(prefix)) {
                        if(!discoveredDevicesMap.containsKey(dev.getAddress())) {
                            log("\tFound OUR BLE Device: " + dev.getName() + "/" + dev.getAddress());
                            discoveredDevicesMap.put(dev.getAddress(), dev);
                            discoveredDeviceInfoList.add(btDeviceInfo);
                        }

                    }


                }
            };

        }).start();
    }

    @JavascriptInterface
    public synchronized void pairWithThisDevice(final String btname, final String mac, final String pin) {

        log("Attempting to pair with: " + btname + "/" + mac + " with pin: '" + pin + "'");

        final BluetoothDevice currPairingDev =  discoveredDevicesMap.get(mac);
        //new Thread(new Runnable() {

        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... voids) {


                if(isCurrentlyPairing) {
                    log("Currently pairing ... returning");
                    return null;
                }

                isCurrentlyPairing = true;

                final BroadcastReceiver pairingBroadcastReceiver = new BroadcastReceiver() {
                    @Override
                    public void onReceive(Context context, Intent intent) {

                        String action = intent.getAction();

                        switch(action) {
                            case BluetoothDevice.ACTION_PAIRING_REQUEST:

                                if(!pin.equals("none")) {
                                    currPairingDev.setPin(pin.getBytes());
                                    /*currPairingDev.setPairingConfirmation(true);
                                    try {
                                        currPairingDev.getClass().getMethod("cancelPairingUserInput").invoke(currPairingDev);
                                    } catch (IllegalAccessException e) {
                                        e.printStackTrace();
                                    } catch (InvocationTargetException e) {
                                        e.printStackTrace();
                                    } catch (NoSuchMethodException e) {
                                        e.printStackTrace();
                                    }*/
                                }
                                break;

                            case BluetoothDevice.ACTION_BOND_STATE_CHANGED:
                                BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                                if(currPairingDev.getAddress().equals(device.getAddress())) {
                                    log("our device bond state changed ... to " + device.getBondState());
                                    if (device.getBondState() == BluetoothDevice.BOND_BONDED) {
                                        pairingSuccess = true;
                                        isCurrentlyPairing = false;
                                        sendPairingSuccessBroadcast(device);
                                        unregister();
                                    }
                                }
                                break;
                        }//end-switch-action
                    }

                    private void unregister() {
                        AMainApp.getAppContext().unregisterReceiver(this);
                    }


                };


                log("Pairing with device: " + currPairingDev.getAddress() + " (" + currPairingDev.getName() + ")");

                IntentFilter filter = new IntentFilter();
                filter.addAction(BluetoothDevice.ACTION_PAIRING_REQUEST);
                filter.addAction(BluetoothDevice.ACTION_BOND_STATE_CHANGED);
                AMainApp.getAppContext().registerReceiver(pairingBroadcastReceiver, filter);

                currPairingDev.createBond();

                // wait for 30 seconds for success/failure
                final long pairingWaitTimeMs = 30000;
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            Thread.sleep(pairingWaitTimeMs);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }

                        if(!pairingSuccess) {
                            log("Failed Pairing");
                            sendPairingFailedBroadcast(currPairingDev);
                            unregister();
                        }
                        // else already unregistered and already paired
                    }

                    private void unregister() {
                        if(pairingBroadcastReceiver != null)
                            AMainApp.getAppContext().unregisterReceiver(pairingBroadcastReceiver);
                    }
                }).start();


                return null;
            }
        }.execute();


    }




    public static final UUID BT_SPP_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");



    BtSppCommunicator currSppCommunicator;

    @JavascriptInterface
    public synchronized void connectToSppDevice(final String mac, final String btname, final int vitalType) {
        log("Connecting to SPP Device: " + btname + "/" + mac);

        final WeakReference<BTReadingsJsInterface> btReadingsWRef = new WeakReference<>(this);
        final BluetoothDevice dev = getPairedDevice(mac);

        if(dev == null) {
            sendSppDeviceNotPairedForConnectBroadcast(dev);
            return;
        }

        commThread = new Thread(new Runnable() {
            @Override
            public void run() {

                final long startTime = System.currentTimeMillis();


                    BluetoothSocket sck = null;
                    try {
                        sck = dev.createRfcommSocketToServiceRecord(BT_SPP_UUID);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                    boolean timedOut = false;

                    while(true) {

                        if(sck == null) {
                            log("SPP Sck is null");
                            sendVitalErrorBroadcast("Error.", vitalType);
                            return;
                        }

                        if(commThread.isInterrupted()) {
                            log("Interrupted");
                            sendVitalErrorBroadcast("Interrupted.", vitalType);
                            return;
                        }

                        /*if(lastOperationCancelledAt > startTime) {
                            log("operation cancel called ... ");
                            sendVitalReadingTimeoutBroadcast(vitalType);
                            return;
                        }*/

                        if((System.currentTimeMillis() - startTime) > BtSppCommunicator.VITAL_READING_TIMEOUT_MS) {
                            timedOut = true;
                            break;
                        }

                        try {
                            log("Attempting to connect to: " + dev.getName());

                            sck.connect();

                            log("Connected");
                            break;

                        } catch (IOException e) {
                            e.printStackTrace();
                            try {Thread.sleep(1000);} catch (InterruptedException e1) {e1.printStackTrace();}
                        }

                    } // end while-not-connected

                    if(timedOut) {
                        log("Timed Out!!");
                        sendVitalReadingTimeoutBroadcast(vitalType);
                        return;
                    }

                    if(commThread.isInterrupted()) {
                        log("Interrupted");
                        try {
                            sck.close();
                            sck = null;
                        } catch (IOException e) {
                            e.printStackTrace();
                            sck = null;
                        }

                        return;
                    }

                    try {
                        currSppCommunicator = BtSppCommunicatorFactory.getCommunicator(vitalType);
                        if(currSppCommunicator == null) {
                            sendVitalErrorBroadcast("DEVICE_DRIVER_NOT_FOUND", vitalType);
                            return;
                        }

                        log("Calling currSppCommunicator for " + Vitals.getStrOf(vitalType));

                        currSppCommunicator.communicate(sck, sck.getInputStream(), sck.getOutputStream(), dev, btReadingsWRef);

                    } catch (IOException e) {
                        e.printStackTrace();
                        sendVitalErrorBroadcast("ERROR", vitalType);
                        return;
                    }




            }

        });

        commThread.start();

    } // end-connect-to-spp-device


    // really bad way to do it. But works best in time-constraint
    public Thread commThread;

    CancellableGatt currDeviceGattCallback;
    BluetoothAdapter.LeScanCallback currLeScanCallback;

    @JavascriptInterface
    public void connectToBleDevice(final String mac, final String btname, final int vitalType) {

        log(" ");
        log("====================== CONNECTING TO BLE DEVICE ======================================");

        log("Connecting to BLE Device: " + btname + "/" + mac);

        final WeakReference<BTReadingsJsInterface> btReadingsJsInterfaceWRef = new WeakReference<>(this);

        log("Scanning for device ... " + btname + "/" + mac);



        commThread = new Thread(new Runnable() {

            boolean connectCallMade = false;
            boolean ourDeviceFound = false;

            Timer discoveryTimedOutTimer = new Timer();

            @Override
            public void run() {


                log(" ");
                log("Discovering LE devices ... with name '" + btname + "'/" + mac);

                discoveredDevicesMap = new HashMap<>();
                discoveredDeviceInfoList = new ArrayList<>();

                currLeScanCallback = mLeScanCallback;

                scanLeDevice();


            }


            private void scanLeDevice()
            {
                BluetoothAdapter.getDefaultAdapter().startLeScan(mLeScanCallback);


                // Stops scanning after a pre-defined scan period.
                discoveryTimedOutTimer.schedule(new TimerTask() {

                    @Override
                    public void run() {

                        discoveringDevices = false;

                        BluetoothAdapter.getDefaultAdapter().getBluetoothLeScanner().stopScan(mScanCallback);
                        BluetoothAdapter.getDefaultAdapter().stopLeScan(mLeScanCallback);

                        sendVitalReadingTimeoutBroadcast(vitalType);

                    }
                }, LE_SCAN_FOR_READING_TIMEOUT_MS);

            }

            ScanCallback mScanCallback = new ScanCallback() {
                @Override
                public void onScanResult(int callbackType, ScanResult result) {

                }

                @Override
                public void onScanFailed(int errorCode) {

                }
            };

            BluetoothAdapter.LeScanCallback mLeScanCallback = new BluetoothAdapter.LeScanCallback() {
                @Override
                public void onLeScan(BluetoothDevice dev, int i, byte[] bytes) {

                    if(commThread.isInterrupted()) {
                        log("Interrupted");
                        BluetoothAdapter.getDefaultAdapter().stopLeScan(this);
                        return;
                    }


                    if(dev.getAddress().equals(mac)) {

                        log("\tFound BLE Device: " + dev.getName() + "/" + dev.getAddress());
                        log("\t\tAnd this in our device!");

                        if(ourDeviceFound) {
                            log("onLeScan: Our Device Already Found once ... ");
                            return;
                        }

                        if(connectCallMade) {
                            log("onLeScan: Connect Call Already Made ... ");
                            return;
                        }



                        discoveryTimedOutTimer.cancel();
                        discoveryTimedOutTimer.purge();

                        ourDeviceFound = true;

                        BluetoothAdapter.getDefaultAdapter().getBluetoothLeScanner().stopScan(mScanCallback);
                        BluetoothAdapter.getDefaultAdapter().stopLeScan(mLeScanCallback);

                        connectGatt(dev);

                    }
                }
            };


            private void connectGatt(final BluetoothDevice dev) {

                log("Connecting to " + dev.getName() + "/" + dev.getAddress());

                if(commThread.isInterrupted()) {
                    log("Interrupted");
                    return;
                }

                final boolean connectWhenAvailable = true;

                connectCallMade = true;
                log("Setting connectCallMade = true");


                switch (vitalType) {

                    case Vitals.VITAL_TYPE_SPO2:
                        currDeviceGattCallback = Spo2_InnovoBle_Communicator.getInstance(vitalType, btReadingsJsInterfaceWRef);
                        break;

                    case Vitals.VITAL_TYPE_WEIGHT:
                        currDeviceGattCallback = Weight_AndUc352Ble_Communicator.getInstance(vitalType, btReadingsJsInterfaceWRef);
                        //dev.connectGatt(AMainApp.getAppContext(), connectWhenAvailable, Weight_PyleCommunicator.getInstance(vitalType, btReadingsJsInterfaceWRef));
                        break;

                    case Vitals.VITAL_TYPE_BP:
                        currDeviceGattCallback = Bp_AndUa651Ble_Communicator.getInstance(vitalType, btReadingsJsInterfaceWRef);
                        //dev.connectGatt(AMainApp.getAppContext(), connectWhenAvailable, Bp_PyleCommunicator.getInstance(vitalType, btReadingsJsInterfaceWRef));
                        break;

                }

                dev.connectGatt(AMainApp.getAppContext(), connectWhenAvailable, currDeviceGattCallback);

            }

        });
        commThread.start();


    }



    // BROADCASTS ===================


    public void sendSppDeviceDiscoveredListReady() {

        log("Sending SPP deviceList as local broadcast ... ");
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_SPP_DEVICES_DISCOVERED_LIST_READY);
        i7.putExtra("deviceListJson", GsonUtils.getInstance().toJson(discoveredDeviceInfoList));
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);

    }


    // BLE
    public void sendBleDeviceDiscoveredListReady() {

        log("Sending BLE deviceList as local broadcast ... " + GsonUtils.getInstance(true).toJson(discoveredDeviceInfoList));
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_BLE_DEVICES_DISCOVERED_LIST_READY);
        i7.putExtra("deviceListJson", GsonUtils.getInstance().toJson(discoveredDeviceInfoList));
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);

    }

    private static void sendPairingSuccessBroadcast(final BluetoothDevice dev) {
        BtDeviceInfo devInfo = new BtDeviceInfo(dev.getAddress(), dev.getName(), true);
        log("Sending pairing success as local broadcast ... ");
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_DEVICE_PAIRING_SUCCESS);
        i7.putExtra("devInfoJson", GsonUtils.getInstance().toJson(devInfo));
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);
    }


    private static void sendPairingFailedBroadcast(final BluetoothDevice dev) {
        BtDeviceInfo devInfo = new BtDeviceInfo(dev.getAddress(), dev.getName(), false);
        log("Sending pairing failed as local broadcast ... ");
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_DEVICE_PAIRING_FAILED);
        i7.putExtra("devInfoJson", GsonUtils.getInstance().toJson(devInfo));
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);
    }


    private static void sendSppDeviceNotPairedForConnectBroadcast(final BluetoothDevice dev) {
        BtDeviceInfo devInfo = new BtDeviceInfo(dev.getAddress(), dev.getName(), false);
        log("Sending not_paired for connect as local broadcast ... ");
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_SPP_DEVICE_NOT_PAIRED_FOR_CONNECT);
        i7.putExtra("devInfoJson", GsonUtils.getInstance().toJson(devInfo));
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);
    }

    public void sendVitalReadingMiniMessageBroadcast(final String miniMesg) {
        log("Sending Bt Mini Message as local broadcast ... '" + miniMesg + "'");
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_DEVICE_READING_MINI_MESSAGE);
        i7.putExtra("miniMesg", miniMesg);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);
    }


    public void sendVitalErrorBroadcast(final String errorMesg, final int vitalType) {
        log("Sending vital error as local broadcast ... mesg: " + errorMesg);
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_DEVICE_READING_ERROR);
        i7.putExtra("vitalType", vitalType);
        i7.putExtra("errorMesg", errorMesg);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);
    }

    protected void sendVitalReadingTimeoutBroadcast(final int vitalType) {
        log("Sending Connect Timeout as local broadcast ... ");
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_DEVICE_READING_TIMEOUT);
        i7.putExtra("vitalType", vitalType);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);
    }


    public void sendVitalReadingFinishedBroadcast(final String finalReadingMessage, final int vitalType) {

        log("Sending Bt Finished as local broadcast ... with final reading '" + finalReadingMessage + "'");
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_DEVICE_READING_FINISHED);
        i7.putExtra("vitalType", vitalType);
        i7.putExtra("finalReadingMessage", finalReadingMessage);
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);
    }

    public void sendBleConnectedBroadcast(final BluetoothDevice dev) {
        BtDeviceInfo devInfo = new BtDeviceInfo(dev.getAddress(), dev.getName(), true);
        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.BT_EVENT_BLE_DEVICE_READING_CONNECTED);
        i7.putExtra("devInfoJson", GsonUtils.getInstance().toJson(devInfo));
        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcast(i7);
    }



    public void saveVitalReadings(final int vitalType, final String v1, final String v2, final String v3, final long timestamp) {

        AMainPreferences prefs = AMainPreferences.getInstance();
        final String userId = prefs.getString(AMainPreferences.PREF_KEY_AUTH0_USER_ID);
        final String username = prefs.getString(AMainPreferences.PREF_KEY_EMAIL);

        VitalsRecord vitalsRecord = new VitalsRecord(userId, username,
                vitalType, v1, v2, v3, timestamp);

        log("Saving Vitals ... " + GsonUtils.getInstance().toJson(vitalsRecord));
        VitalsRecordDao dao = VitalsSqliteDatabase.getInstance(AMainApp.getAppContext()).dao();
        dao.insertVital(vitalsRecord);
    }




    private static long testEcgStartedAt = -1;

    @JavascriptInterface
    public void testEcg() throws FileNotFoundException {

        if(testEcgStartedAt > -1) {
            final long currTime = System.currentTimeMillis();
            if (currTime - testEcgStartedAt < 30000) {
                log("last test ecg call was less than 30 seconds ago");
                return;
            }
        }

        new Thread(new Runnable() {
            @Override
            public void run() {

                testEcgStartedAt = System.currentTimeMillis();

                log("Starting test ECG");

                InputStream in = AMainApp.getAppContext().getResources().openRawResource(R.raw.ecg_test_data);

                Scanner scanner = new Scanner(in);

                int MAX_TOTAL_SECONDS = 30;
                int ONE_SECOND_SAMPLE_COUNT = 250;
                int SAMPLE_RATE = 360;
                int totalSeconds = 0;
                int j = 0;
                short[] chShorts = new short[SAMPLE_RATE];

                while(scanner.hasNextLine()) {

                    //if(totalSeconds > MAX_TOTAL_SAMPLE_COUNT) break;
                    if(totalSeconds > MAX_TOTAL_SECONDS) break;



                    chShorts[j] = (short) (Double.parseDouble(scanner.nextLine()) * 10000);

                    if(j == SAMPLE_RATE - 1) {

                        // scale to 250
                        chShorts = ArrayScaler.scaleArray(chShorts, ONE_SECOND_SAMPLE_COUNT);

                        // send 1 second data
                        Intent i7 = AMainActivity.createLocalBroadcastEventIntent(AMainActivity.EVENT_FAROS_NEW_ONE_SECOND_DATA);
                        i7.putExtra("ch1EcgOneSec", chShorts);
                        LocalBroadcastManager.getInstance(AMainApp.getAppContext()).sendBroadcastSync(i7);

                        // wait for 980 ms
                        try {
                            Thread.sleep(980);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }


                        chShorts = new short[SAMPLE_RATE];

                        log("TotalSeconds: " + totalSeconds);

                        totalSeconds++;
                        j = -1;
                    }

                    j++;

                    //dAL.add(Double.parseDouble(scanner.nextLine()));

                    if(!scanner.hasNextLine()) {
                        if(totalSeconds < MAX_TOTAL_SECONDS) {
                            in = AMainApp.getAppContext().getResources().openRawResource(R.raw.ecg_test_data);
                            scanner = new Scanner(in);
                        }
                    }

                }


                testEcgStartedAt = -1;


            }
        }).start();


    }



    @JavascriptInterface
    public void savePhoto(final String photoB64) {
        AMainPreferences prefs = AMainPreferences.getInstance();
        final String userId = prefs.getString(AMainPreferences.PREF_KEY_AUTH0_USER_ID);
        final String username = prefs.getString(AMainPreferences.PREF_KEY_EMAIL);

        VitalsRecord vitalsRecord = new VitalsRecord(userId, username,
                Vitals.VITAL_TYPE_PHOTO, photoB64, "", "", System.currentTimeMillis());

        log("Saving Photo ... " + GsonUtils.getInstance().toJson(vitalsRecord));
        VitalsRecordDao dao = VitalsSqliteDatabase.getInstance(AMainApp.getAppContext()).dao();
        dao.insertVital(vitalsRecord);
    }

}

