
package com.mwellness.mcare.telemed.vitals.deviceinfo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class VitalDeviceInfo {

    @SerializedName("di_device_comm")
    @Expose
    private DiDeviceComm diDeviceComm;
    @SerializedName("device_id")
    @Expose
    private String deviceId;
    @SerializedName("device_img_src")
    @Expose
    private String deviceImgSrc;
    @SerializedName("di_device_manufacturer")
    @Expose
    private DiDeviceManufacturer diDeviceManufacturer;
    @SerializedName("device_model_number")
    @Expose
    private String deviceModelNumber;
    @SerializedName("di_usage_instruction_set")
    @Expose
    private List<DiUsageInstructionSet> diUsageInstructionSet = null;

    /**
     * No args constructor for use in serialization
     * 
     */
    public VitalDeviceInfo() {
    }

    /**
     * 
     * @param diDeviceComm
     * @param diUsageInstructionSet
     * @param deviceImgSrc
     * @param deviceModelNumber
     * @param diDeviceManufacturer
     * @param deviceId
     */
    public VitalDeviceInfo(DiDeviceComm diDeviceComm, String deviceId, String deviceImgSrc, DiDeviceManufacturer diDeviceManufacturer, String deviceModelNumber, List<DiUsageInstructionSet> diUsageInstructionSet) {
        super();
        this.diDeviceComm = diDeviceComm;
        this.deviceId = deviceId;
        this.deviceImgSrc = deviceImgSrc;
        this.diDeviceManufacturer = diDeviceManufacturer;
        this.deviceModelNumber = deviceModelNumber;
        this.diUsageInstructionSet = diUsageInstructionSet;
    }

    public DiDeviceComm getDiDeviceComm() {
        return diDeviceComm;
    }

    public void setDiDeviceComm(DiDeviceComm diDeviceComm) {
        this.diDeviceComm = diDeviceComm;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getDeviceImgSrc() {
        return deviceImgSrc;
    }

    public void setDeviceImgSrc(String deviceImgSrc) {
        this.deviceImgSrc = deviceImgSrc;
    }

    public DiDeviceManufacturer getDiDeviceManufacturer() {
        return diDeviceManufacturer;
    }

    public void setDiDeviceManufacturer(DiDeviceManufacturer diDeviceManufacturer) {
        this.diDeviceManufacturer = diDeviceManufacturer;
    }

    public String getDeviceModelNumber() {
        return deviceModelNumber;
    }

    public void setDeviceModelNumber(String deviceModelNumber) {
        this.deviceModelNumber = deviceModelNumber;
    }

    public List<DiUsageInstructionSet> getDiUsageInstructionSet() {
        return diUsageInstructionSet;
    }

    public void setDiUsageInstructionSet(List<DiUsageInstructionSet> diUsageInstructionSet) {
        this.diUsageInstructionSet = diUsageInstructionSet;
    }

}
