package com.mwellness.mcare.telemed.vitals.nfc.freestyle;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Created by dev01 on 9/5/17.
 */

public class ReadingData {
    public static final String ID = "id";
    public static final String SENSOR = "sensor";
    public static final String SENSOR_AGE_IN_MINUTES = "sensorAgeInMinutes";
    public static final String DATE = "date";
    public static final String TIMEZONE_OFFSET_IN_MINUTES = "timezoneOffsetInMinutes";
    public static final String TREND = "trend";
    public static final String HISTORY = "historyMap";


    public static final int numHistoryValues = 32;
    public static final int historyIntervalInMinutes = 15;
    public static final int numTrendValues = 16;

    private String id;
    private SensorData sensor;
    private int sensorAgeInMinutes = -1;
    private long date = -1;
    private int timezoneOffsetInMinutes;
    public ArrayList<GlucoseData> historyMap = new ArrayList<GlucoseData>();

    public HashMap<Long, Double> trendReadingHM = new HashMap<Long, Double>();

    public long latestReadingAt = -1;

    public ReadingData() {}
    public ReadingData(RawTagData rawTagData) {
        id = rawTagData.getId();
        date = rawTagData.getDate();
        timezoneOffsetInMinutes = rawTagData.getTimezoneOffsetInMinutes();
        sensorAgeInMinutes = rawTagData.getSensorAgeInMinutes();


        // find or create entry for this sensor
        sensor = new SensorData(rawTagData);

        // check if sensor is of valid age
        if (sensorAgeInMinutes <= SensorData.minSensorAgeInMinutes || sensorAgeInMinutes > SensorData.maxSensorAgeInMinutes) {
            return;
        }

        // calculate time drift between sensor readings
        int lastSensorAgeInMinutes = 0;
        long lastReadingDate = sensor.getStartDate();

        double timeDriftFactor = 1;
        if (lastSensorAgeInMinutes < sensorAgeInMinutes) {
            timeDriftFactor = (date - lastReadingDate) / (double) TimeUnit.MINUTES.toMillis(sensorAgeInMinutes - lastSensorAgeInMinutes);
        }

        int indexTrend = rawTagData.getIndexTrend();

        int mostRecentHistoryAgeInMinutes = 3 + (sensorAgeInMinutes - 3) % historyIntervalInMinutes;


        // read trend values from ring buffer, starting at indexTrend (bytes 28-123)
        for (int counter = 0; counter < numTrendValues; counter++) {
            int index = (indexTrend + counter) % numTrendValues;

            int glucoseLevelRaw = rawTagData.getTrendValue(index);
            // skip zero values if the sensor has not filled the ring buffer yet completely
            if (glucoseLevelRaw > 0) {
                int dataAgeInMinutes = numTrendValues - counter;
                int ageInSensorMinutes = sensorAgeInMinutes - dataAgeInMinutes;
                long dataDate = lastReadingDate + (long) (TimeUnit.MINUTES.toMillis(ageInSensorMinutes - lastSensorAgeInMinutes) * timeDriftFactor);

                double glucoseMMOL = (((glucoseLevelRaw/10)/18.018) - 0.7);

                //trend.add(new GlucoseData(sensor, ageInSensorMinutes, timezoneOffsetInMinutes, glucoseLevelRaw, true, dataDate));
                AbbottActivity.log("(T) Glucose level: " + glucoseMMOL + " at " + dataDate + ": " + new Date(dataDate));

                trendReadingHM.put(dataDate, glucoseMMOL);
                latestReadingAt = dataDate;
            }


        }


        AbbottActivity.log("======================");

        int indexHistory = rawTagData.getIndexHistory();

        ArrayList<Integer> glucoseLevels = new ArrayList<Integer>();
        ArrayList<Integer> ageInSensorMinutesList = new ArrayList<Integer>();

        // read historyMap values from ring buffer, starting at indexHistory (bytes 124-315)
        for (int counter = 0; counter < numHistoryValues; counter++) {
            int index = (indexHistory + counter) % numHistoryValues;

            int glucoseLevelRaw = rawTagData.getHistoryValue(index);

            // skip zero values if the sensor has not filled the ring buffer yet completely
            if (glucoseLevelRaw > 0) {
                int dataAgeInMinutes = mostRecentHistoryAgeInMinutes + (numHistoryValues - (counter + 1)) * historyIntervalInMinutes;
                int ageInSensorMinutes = sensorAgeInMinutes - dataAgeInMinutes;
                long dataDate = lastReadingDate + (long) (TimeUnit.MINUTES.toMillis(ageInSensorMinutes - lastSensorAgeInMinutes) * timeDriftFactor);

                // skip the first hour of sensor data as it is faulty
                if (ageInSensorMinutes > SensorData.minSensorAgeInMinutes) {
                    glucoseLevels.add(glucoseLevelRaw);
                    AbbottActivity.log("(H) Glucose level: " + (((glucoseLevelRaw/10)/18.02) - 0.4) + " at " + dataDate + ": " + new Date(dataDate));
                    ageInSensorMinutesList.add(ageInSensorMinutes);
                }


            }
        }

        // check if there were actually any valid data points
        if (ageInSensorMinutesList.isEmpty()) {
            return;
        }

        // try to shift age to make this reading fit to older readings
        /*try {
            shiftAgeToMatchPreviousReadings(realmProcessedData, glucoseLevels, ageInSensorMinutesList);
        } catch (RuntimeException e) {
            Log.e("OpenLibre::ReadingData", e.getMessage() + " For reading with id " + id);
            realmProcessedData.close();
            return;
        }*/


        // create historyMap data point list
        for (int i = 0; i < glucoseLevels.size(); i++) {
            int glucoseLevelRaw = glucoseLevels.get(i);
            int ageInSensorMinutes = ageInSensorMinutesList.get(i);
            long dataDate = lastReadingDate + (long) (TimeUnit.MINUTES.toMillis(ageInSensorMinutes - lastSensorAgeInMinutes) * timeDriftFactor);

            GlucoseData glucoseData = new GlucoseData(sensor, ageInSensorMinutes, getTimezoneOffsetInMinutes(), glucoseLevelRaw/10, true, dataDate);
            historyMap.add(glucoseData);
        }

    }



    private static boolean listsStartEqual(List<Integer> l1, List<GlucoseData> l2) {
        int size = Math.min(l1.size(), l2.size());
        for (int i = 0; i < size; i++) {
            if (!l1.get(i).equals(l2.get(i).getGlucoseLevelRaw()))
                return false;
        }
        return true;
    }

    public String getId() {
        return id;
    }

    public long getDate() {
        return date;
    }

    public void setDate(long date) {
        this.date = date;
    }

    public int getTimezoneOffsetInMinutes() {
        return timezoneOffsetInMinutes;
    }

    public void setTimezoneOffsetInMinutes(int timezoneOffsetInMinutes) {
        this.timezoneOffsetInMinutes = timezoneOffsetInMinutes;
    }

    public int getSensorAgeInMinutes() {
        return sensorAgeInMinutes;
    }

    public SensorData getSensor() {
        return sensor;
    }

}