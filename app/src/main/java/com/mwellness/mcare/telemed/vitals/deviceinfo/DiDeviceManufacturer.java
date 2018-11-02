
package com.mwellness.mcare.telemed.vitals.deviceinfo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DiDeviceManufacturer {

    @SerializedName("manufacturer_id")
    @Expose
    private String manufacturerId;
    @SerializedName("manufacturer_name")
    @Expose
    private String manufacturerName;

    /**
     * No args constructor for use in serialization
     * 
     */
    public DiDeviceManufacturer() {
    }

    /**
     * 
     * @param manufacturerId
     * @param manufacturerName
     */
    public DiDeviceManufacturer(String manufacturerId, String manufacturerName) {
        super();
        this.manufacturerId = manufacturerId;
        this.manufacturerName = manufacturerName;
    }

    public String getManufacturerId() {
        return manufacturerId;
    }

    public void setManufacturerId(String manufacturerId) {
        this.manufacturerId = manufacturerId;
    }

    public String getManufacturerName() {
        return manufacturerName;
    }

    public void setManufacturerName(String manufacturerName) {
        this.manufacturerName = manufacturerName;
    }

}
