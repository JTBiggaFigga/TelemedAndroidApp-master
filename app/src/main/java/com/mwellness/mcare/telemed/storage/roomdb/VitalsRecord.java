package com.mwellness.mcare.telemed.storage.roomdb;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Index;
import android.arch.persistence.room.PrimaryKey;
import android.support.annotation.NonNull;

import java.util.UUID;

/**
 * Created by dev01 on 12/30/17.
 */

@Entity (
        tableName = VitalsRecord.TABLE_NAME,
        indices = {
                @Index(value = {VitalsRecord.COL_USER_ID, VitalsRecord.COL_VITAL_TYPE, VitalsRecord.COL_TIMESTAMP_MS}),
                @Index(value = {VitalsRecord.COL_USERNAME, VitalsRecord.COL_TIMESTAMP_MS})
        }
)
public class VitalsRecord {

    public static final String TABLE_NAME = "VitalsRecord";
    public static final String COL_RECORD_ID = "recordId";
    public static final String COL_USER_ID = "userId";
    public static final String COL_USERNAME = "username";
    public static final String COL_VITAL_TYPE = "vitalType";
    public static final String COL_V1 = "v1";
    public static final String COL_V2 = "v2";
    public static final String COL_V3 = "v3";
    public static final String COL_TIMESTAMP_MS = "timestampMs";
    public static final String COL_SYNCED_AT_MS = "syncedAtMs";



    @PrimaryKey
    @ColumnInfo(name = COL_RECORD_ID)
    @NonNull
    private String recordId = UUID.randomUUID().toString();

    @ColumnInfo(name = COL_USER_ID)
    private String userId;

    @ColumnInfo(name = COL_USERNAME)
    private String username;

    @ColumnInfo(name = COL_VITAL_TYPE)
    private int vitalType;

    @ColumnInfo(name = COL_V1)
    private String v1;

    @ColumnInfo(name = COL_V2)
    private String v2;

    @ColumnInfo(name = COL_V3)
    private String v3;

    @ColumnInfo(name = COL_TIMESTAMP_MS)
    private long timestampMs;



    @ColumnInfo(name = COL_SYNCED_AT_MS)
    private long synceddAtMs = -1;


    public VitalsRecord(String userId, String username, int vitalType,
                        String v1, String v2, String v3,
                        long timestampMs)
    {
        this.setRecordId(UUID.randomUUID().toString());
        this.userId = userId;
        this.username = username;
        this.vitalType = vitalType;
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.timestampMs = timestampMs;
        this.synceddAtMs = -1;
    }


    public void setRecordId(@NonNull String recordId) {
        this.recordId = recordId;
    }

    public String getRecordId() {
        return recordId;
    }

    public String getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public int getVitalType() {
        return vitalType;
    }

    public String getV1() {
        return v1;
    }

    public String getV2() {
        return v2;
    }

    public String getV3() {
        return v3;
    }

    public long getTimestampMs() {
        return timestampMs;
    }

    public long getSynceddAtMs() {
        return synceddAtMs;
    }

    public void setSynceddAtMs(long synceddAtMs) {
        this.synceddAtMs = synceddAtMs;
    }
}
