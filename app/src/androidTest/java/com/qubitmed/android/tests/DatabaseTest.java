package com.qubitmed.android.tests;

import android.arch.persistence.room.Room;
import android.support.test.InstrumentationRegistry;
import android.support.test.runner.AndroidJUnit4;
import android.test.suitebuilder.annotation.SmallTest;

import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.storage.roomdb.VitalsRecord;
import com.mwellness.mcare.telemed.storage.roomdb.VitalsSqliteDatabase;
import com.mwellness.mcare.telemed.vitals.Vitals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.assertEquals;


/**
 * Created by savimonty on 12/30/17.
 */

@RunWith(AndroidJUnit4.class)
@SmallTest
public class DatabaseTest {

    private VitalsSqliteDatabase vitalsSqliteDatabase;

    private static void log(final String str) {
        ALog.log(DatabaseTest.class, str);
        //System.out.println(DatabaseTest.class.getSimpleName() + ": " + str);
    }

    @Before
    public void initDb() throws Exception {

        log(" ");
        log("Starting Test");


        vitalsSqliteDatabase = Room.inMemoryDatabaseBuilder(
                InstrumentationRegistry.getContext(),
                VitalsSqliteDatabase.class)
                .build();
    }

    @Test
    public void insertAndGetVital() {

        final String v1 = "98";
        final String v2 = "72";

        final long ts = System.currentTimeMillis();
        VitalsRecord vitalsRecord = new VitalsRecord("savimonty", "savimonty", Vitals.VITAL_TYPE_SPO2, v1, v2, "", ts);

        vitalsSqliteDatabase.dao().insertVital(vitalsRecord);

        VitalsRecord vitalsRecordRecovered = vitalsSqliteDatabase.dao().getVitalRecordByTimestampMs("savimonty", ts);
        log("Created Record with RecordId: " + vitalsRecordRecovered.getRecordId());

        assertEquals(vitalsRecord.getV1(), vitalsRecordRecovered.getV1());
        assertEquals(vitalsRecord.getV2(), vitalsRecordRecovered.getV2());
        assertEquals(vitalsRecord.getTimestampMs(), vitalsRecordRecovered.getTimestampMs());

        final String recordId = vitalsRecordRecovered.getRecordId();
        final long syncedTsMs = System.currentTimeMillis();
        vitalsSqliteDatabase.dao().setVitalRecordSynced(recordId, syncedTsMs);

        VitalsRecord vr2 = vitalsSqliteDatabase.dao().getVitalRecordByRecordId(recordId);

        assertEquals(syncedTsMs, vr2.getSynceddAtMs());

    }

    @After
    public void closeDb() throws Exception {
        vitalsSqliteDatabase.close();
    }
}
