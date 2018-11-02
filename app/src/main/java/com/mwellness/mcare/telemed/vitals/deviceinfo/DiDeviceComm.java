
package com.mwellness.mcare.telemed.vitals.deviceinfo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DiDeviceComm {

    @SerializedName("comm_type")
    @Expose
    private String commType;
    @SerializedName("di_comm_info")
    @Expose
    private DiCommInfo diCommInfo;

    /**
     * No args constructor for use in serialization
     * 
     */
    public DiDeviceComm() {
    }

    /**
     * 
     * @param diCommInfo
     * @param commType
     */
    public DiDeviceComm(String commType, DiCommInfo diCommInfo) {
        super();
        this.commType = commType;
        this.diCommInfo = diCommInfo;
    }

    public String getCommType() {
        return commType;
    }

    public void setCommType(String commType) {
        this.commType = commType;
    }

    public DiCommInfo getDiCommInfo() {
        return diCommInfo;
    }

    public void setDiCommInfo(DiCommInfo diCommInfo) {
        this.diCommInfo = diCommInfo;
    }

}
