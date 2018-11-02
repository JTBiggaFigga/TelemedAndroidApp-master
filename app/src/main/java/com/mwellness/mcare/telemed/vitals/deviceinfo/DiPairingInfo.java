
package com.mwellness.mcare.telemed.vitals.deviceinfo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DiPairingInfo {

    @SerializedName("pin")
    @Expose
    private String pin;
    @SerializedName("di_pairing_instruction")
    @Expose
    private DiPairingInstruction diPairingInstruction;

    /**
     * No args constructor for use in serialization
     * 
     */
    public DiPairingInfo() {
    }

    /**
     * 
     * @param pin
     * @param diPairingInstruction
     */
    public DiPairingInfo(String pin, DiPairingInstruction diPairingInstruction) {
        super();
        this.pin = pin;
        this.diPairingInstruction = diPairingInstruction;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public DiPairingInstruction getDiPairingInstruction() {
        return diPairingInstruction;
    }

    public void setDiPairingInstruction(DiPairingInstruction diPairingInstruction) {
        this.diPairingInstruction = diPairingInstruction;
    }

}
