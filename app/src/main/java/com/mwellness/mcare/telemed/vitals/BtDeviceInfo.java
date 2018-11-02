package com.mwellness.mcare.telemed.vitals;

/**
 * Class for serialization
 */
public class BtDeviceInfo {
    String mac = "";
    String btname = "";
    boolean paired = false;
    public BtDeviceInfo(final String mac, final String btname, final boolean paired) {
        this.mac = mac;
        this.btname = btname;
        this.paired = paired;
    }
}
