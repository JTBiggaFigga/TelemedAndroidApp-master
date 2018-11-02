
package com.mwellness.mcare.telemed.vitals.deviceinfo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DiUsageInstruction {

    @SerializedName("at")
    @Expose
    private String at;
    @SerializedName("ref_num")
    @Expose
    private Integer refNum;
    @SerializedName("text")
    @Expose
    private String text;
    @SerializedName("voice")
    @Expose
    private String voice;
    @SerializedName("img_src")
    @Expose
    private String imgSrc;

    /**
     * No args constructor for use in serialization
     * 
     */
    public DiUsageInstruction() {
    }

    /**
     * 
     * @param text
     * @param voice
     * @param imgSrc
     * @param at
     * @param refNum
     */
    public DiUsageInstruction(String at, Integer refNum, String text, String voice, String imgSrc) {
        super();
        this.at = at;
        this.refNum = refNum;
        this.text = text;
        this.voice = voice;
        this.imgSrc = imgSrc;
    }

    public String getAt() {
        return at;
    }

    public void setAt(String at) {
        this.at = at;
    }

    public Integer getRefNum() {
        return refNum;
    }

    public void setRefNum(Integer refNum) {
        this.refNum = refNum;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getVoice() {
        return voice;
    }

    public void setVoice(String voice) {
        this.voice = voice;
    }

    public String getImgSrc() {
        return imgSrc;
    }

    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }

}
