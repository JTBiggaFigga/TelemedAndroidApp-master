
package com.mwellness.mcare.telemed.vitals.deviceinfo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DiPairingInstruction {

    @SerializedName("img_src")
    @Expose
    private String imgSrc;
    @SerializedName("text")
    @Expose
    private String text;

    /**
     * No args constructor for use in serialization
     * 
     */
    public DiPairingInstruction() {
    }

    /**
     * 
     * @param text
     * @param imgSrc
     */
    public DiPairingInstruction(String imgSrc, String text) {
        super();
        this.imgSrc = imgSrc;
        this.text = text;
    }

    public String getImgSrc() {
        return imgSrc;
    }

    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
