
package com.mwellness.mcare.telemed.vitals.deviceinfo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class DiUsageInstructionSet {

    @SerializedName("di_usage_instruction")
    @Expose
    private DiUsageInstruction diUsageInstruction;

    /**
     * No args constructor for use in serialization
     * 
     */
    public DiUsageInstructionSet() {
    }

    /**
     * 
     * @param diUsageInstruction
     */
    public DiUsageInstructionSet(DiUsageInstruction diUsageInstruction) {
        super();
        this.diUsageInstruction = diUsageInstruction;
    }

    public DiUsageInstruction getDiUsageInstruction() {
        return diUsageInstruction;
    }

    public void setDiUsageInstruction(DiUsageInstruction diUsageInstruction) {
        this.diUsageInstruction = diUsageInstruction;
    }

}
