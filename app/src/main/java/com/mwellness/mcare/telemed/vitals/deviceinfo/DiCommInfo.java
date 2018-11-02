
package com.mwellness.mcare.telemed.vitals.deviceinfo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DiCommInfo {

    @SerializedName("bt_name")
    @Expose
    private String btName;
    @SerializedName("di_pairing_info")
    @Expose
    private DiPairingInfo diPairingInfo;

    /**
     * No args constructor for use in serialization
     * 
     */
    public DiCommInfo() {
    }

    /**
     * 
     * @param btName
     * @param diPairingInfo
     */
    public DiCommInfo(String btName, DiPairingInfo diPairingInfo) {
        super();
        this.btName = btName;
        this.diPairingInfo = diPairingInfo;
    }

    public String getBtName() {
        return btName;
    }

    public void setBtName(String btName) {
        this.btName = btName;
    }

    public DiPairingInfo getDiPairingInfo() {
        return diPairingInfo;
    }

    public void setDiPairingInfo(DiPairingInfo diPairingInfo) {
        this.diPairingInfo = diPairingInfo;
    }

}
