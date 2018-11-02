package com.mwellness.mcare.telemed.storage.roomdb;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;

/**
 * Created by dev01 on 12/30/17.
 */

@Dao
public interface VitalsRecordDao {

    @Insert
    public void insertVital(VitalsRecord vitalsRecord);


    @Query("SELECT * FROM " + VitalsRecord.TABLE_NAME + " where " + VitalsRecord.COL_USER_ID + "=:userId order by " + VitalsRecord.COL_TIMESTAMP_MS + " desc")
    public VitalsRecord[] getVitalsDesc(final String userId);

    @Query("SELECT * FROM " + VitalsRecord.TABLE_NAME + " where " + VitalsRecord.COL_USER_ID + "=:userId and " + VitalsRecord.COL_SYNCED_AT_MS + "=-1 order by " + VitalsRecord.COL_TIMESTAMP_MS)
    public VitalsRecord[] getVitalsNotSyncedAsc(final String userId);

    @Query("SELECT * FROM " + VitalsRecord.TABLE_NAME + " where " + VitalsRecord.COL_USER_ID + "=:userId and " + VitalsRecord.COL_TIMESTAMP_MS + "=:timestampMs")
    public VitalsRecord getVitalRecordByTimestampMs(final String userId, final long timestampMs);

    @Query("SELECT * FROM " + VitalsRecord.TABLE_NAME + " where " + VitalsRecord.COL_RECORD_ID + "=:recordId")
    public VitalsRecord getVitalRecordByRecordId(final String recordId);


    @Query("UPDATE " + VitalsRecord.TABLE_NAME + " set " + VitalsRecord.COL_SYNCED_AT_MS + "=:syncedAtTs where " + VitalsRecord.COL_RECORD_ID + "=:recordId")
    public int setVitalRecordSynced(final String recordId, final long syncedAtTs);



    @Query("DELETE FROM " + VitalsRecord.TABLE_NAME + " where " + VitalsRecord.COL_SYNCED_AT_MS + " !=-1")
    public int deleteAllSynchronizedVitals();
}
