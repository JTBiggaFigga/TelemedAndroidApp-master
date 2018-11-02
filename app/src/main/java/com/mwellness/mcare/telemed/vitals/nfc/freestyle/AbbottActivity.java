package com.mwellness.mcare.telemed.vitals.nfc.freestyle;


import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.NfcV;
import android.os.Bundle;
import android.os.Handler;
import android.os.Vibrator;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.google.gson.Gson;
import com.mwellness.mcare.telemed.R;
import com.mwellness.mcare.telemed.app.jsinterfaces.BTReadingsJsInterface;
import com.mwellness.mcare.telemed.vitals.Vitals;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.Date;

/**
 *
 * Activity for reading data from FreeStyleLibre Tag
 *
 */
public class AbbottActivity extends Activity
{

    private boolean[] questionnaireAnswers = new boolean[2];

    private NfcAdapter mNfcAdapter;

    //private String lectura;
    private static float currentGlucose = 0f;

    //private TextView tvResult;
    private static final String TAG = AbbottActivity.class.getSimpleName();

    private ToggleButton q0Toggle;
    private ToggleButton q1Toggle;
    private Button submitBtn;

    private TextView mesgT;

    public static void log(String str) {
        Log.d("HTAbbot", str);
    }

    private static final boolean TEST = false;

    /*@Override
    protected void onStart() {
        super.onStart();

        *//*log("Setting dummy sugar value ... ");
        setDummySugarValue();*//*
    }*/

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_abbott);
        setContentView(R.layout.activity_abbott_basic);


        log("onCreate");

        //tvResult = (TextView)findViewById(R.id.result);

        mNfcAdapter = NfcAdapter.getDefaultAdapter(this);

        if(!TEST) {
            if (mNfcAdapter == null) {
                // Stop here, we definitely need NFC
                Toast.makeText(this, "This device doesn't support NFC.", Toast.LENGTH_LONG).show();
                finish();
                return;

            }
            else {

                if (!mNfcAdapter.isEnabled()) {
                    Toast.makeText(this, "NFC is disabled.", Toast.LENGTH_LONG).show();
                    finish();
                    return;

                }
            }
        }

        //initUi();

        mesgT = findViewById(R.id.mesgT);

        handleIntent(getIntent());
    }

    private void initAnswers() {
        for(int i = 0; i < questionnaireAnswers.length; i++) {
            questionnaireAnswers[i] = false;
        }
    }

    /*
    private void setDummySugarValue() {
        finalSugarMmol = 5.3;
    }
    */

    private void initUi() {

        q0Toggle = (ToggleButton) findViewById(R.id.q0Switch);
        q0Toggle.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean isChecked) {
                questionnaireAnswers[0] = isChecked;
            }
        });

        q1Toggle = (ToggleButton) findViewById(R.id.q1Switch);
        q1Toggle.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean isChecked) {
                questionnaireAnswers[1] = isChecked;
            }
        });

        submitBtn = (Button) findViewById(R.id.submitBtn);
        submitBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sendToServerAndFinish(0);
            }
        });

    }

    @Override
    protected void onResume() {
        super.onResume();

        /**
         * It's important, that the activity is in the foreground (resumed). Otherwise
         * an IllegalStateException is thrown.
         */
        if((!TEST))
            setupForegroundDispatch(this, mNfcAdapter);
    }

    @Override
    protected void onPause() {
        /**
         * Call this before onPause, otherwise an IllegalArgumentException is thrown as well.
         */
        if((!TEST))
            stopForegroundDispatch(this, mNfcAdapter);

        super.onPause();

        //finish();
    }

    @Override
    protected void onNewIntent(Intent intent) {
        /**
         * This method gets called, when a new Intent gets associated with the current activity instance.
         * Instead of creating a new activity, onNewIntent will be called. For more information have a look
         * at the documentation.
         *
         * In our case this method gets called, when the user attaches a Tag to the device.
         */
        handleIntent(intent);
    }

    private String getUserName() {


        String name = "";

        try {
            Context con = createPackageContext("air.com.xecare.android.debug", 0);
            SharedPreferences pref = con.getSharedPreferences("username", Context.MODE_PRIVATE);
            name = pref.getString("username", "");
        } catch (PackageManager.NameNotFoundException e) {
            Log.e("Not data shared", e.toString());
            name = "";
        }

        if(name.equals("")) {
            try {
                Context con = createPackageContext("air.com.xecare.android", 0);
                SharedPreferences pref = con.getSharedPreferences("username", Context.MODE_PRIVATE);
                name = pref.getString("username", "");
            } catch (PackageManager.NameNotFoundException e) {
                Log.e("Not data shared", e.toString());
                name = "";
            }
        }

        log("User name set: '" + name + "'");

        return name;
    }

    private void handleIntent(Intent intent) {

        String user = getUserName();
        if(user.equals("")) {
            finish();
            return;
        }

        initAnswers();

        String action = intent.getAction();

        if (NfcAdapter.ACTION_TECH_DISCOVERED.equals(action)) {

            log("NfcAdapter.ACTION_TECH_DISCOVERED");
            // In case we would still use the Tech Discovered Intent
            Tag tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
            String[] techList = tag.getTechList();
            String searchedTech = NfcV.class.getName();
            //new NfcVReaderTask().execute(tag);
            log(bytesToHex(tag.getId()));


            String bloodSugar = readNfc2(tag);

            Vibrator vibrator = (Vibrator)getSystemService(VIBRATOR_SERVICE);
            vibrator.vibrate(250);



        }
        else {
            log("Activity Started Without NFC Intent. Ending ... ");
            if(!TEST) {
                finish();
            }
        }

    }

    /**
     * @param activity The corresponding {@link Activity} requesting the foreground dispatch.
     * @param adapter The {@link NfcAdapter} used for the foreground dispatch.
     */
    public static void setupForegroundDispatch(final Activity activity, NfcAdapter adapter) {
        final Intent intent = new Intent(activity.getApplicationContext(), activity.getClass());
        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);

        final PendingIntent pendingIntent = PendingIntent.getActivity(activity.getApplicationContext(), 0, intent, 0);

        IntentFilter[] filters = new IntentFilter[1];
        String[][] techList = new String[][]{};

        // Notice that this is the same filter as in our manifest.
        filters[0] = new IntentFilter();
        filters[0].addAction(NfcAdapter.ACTION_NDEF_DISCOVERED);
        filters[0].addCategory(Intent.CATEGORY_DEFAULT);

        adapter.enableForegroundDispatch(activity, pendingIntent, filters, techList);
    }

    /**
     * @param activity The corresponding {@link Activity} requesting to stop the foreground dispatch.
     * @param adapter The {@link NfcAdapter} used for the foreground dispatch.
     */
    public static void stopForegroundDispatch(final Activity activity, NfcAdapter adapter) {
        adapter.disableForegroundDispatch(activity);
    }

    final protected static char[] hexArray = "0123456789ABCDEF".toCharArray();
    public static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for ( int j = 0; j < bytes.length; j++ ) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }


    private static final long nfcReadTimeout = 1000; // [ms]


    private double finalSugarMgdl = 0;
    private double finalSugarMmol = 0;
    private String readNfc2(Tag tag) {

        byte[] data = new byte[360];
        NfcV nfcvTag = NfcV.get(tag);
        final byte[] uid = tag.getId();

        log("Enter NdefReaderTask: " + nfcvTag.toString());

        log("Tag Tech List: "+ TextUtils.join(", ", tag.getTechList()));


        try {
            nfcvTag.connect();
        } catch (IOException e) {
            //Toast.makeText(, "Error opening NFC connection!", Toast.LENGTH_SHORT).show();
            log("Error opening NFC: " + e.getMessage());
            return null;
        }


        log("Connection Made");

        final int step = 3; //OpenLibre.NFC_USE_MULTI_BLOCK_READ ? 3 : 1;
        final int blockSize = 8;

        for (int blockIndex = 0; blockIndex <= 40; blockIndex += step) {

            byte[] cmd;
            //if (OpenLibre.NFC_USE_MULTI_BLOCK_READ) {
                cmd = new byte[]{0x02, 0x23, (byte) blockIndex, 0x02}; // multi-block read 3 blocks
            /*} else {
                cmd = new byte[]{0x60, 0x20, 0, 0, 0, 0, 0, 0, 0, 0, (byte) blockIndex, 0};
                System.arraycopy(uid, 0, cmd, 2, 8);
            }*/

            byte[] readData;
            Long startReadingTime = System.currentTimeMillis();
            while (true) {
                try {
                    readData = nfcvTag.transceive(cmd);
                    break;
                } catch (IOException e) {
                    if ((System.currentTimeMillis() > startReadingTime + nfcReadTimeout)) {
                        log("tag read timeout");
                        return e.getMessage();
                    }
                }
            }

            //if (OpenLibre.NFC_USE_MULTI_BLOCK_READ) {
            System.arraycopy(readData, 1, data, blockIndex * blockSize, readData.length - 1);
            /*} else {
                readData = Arrays.copyOfRange(readData, 2, readData.length);
                System.arraycopy(readData, 0, data, blockIndex * blockSize, blockSize);
            }*/

            //updateProgressBar(blockIndex);

        }


        String hexData = bytesToHex(data);

        RawTagData rawTagData = new RawTagData(bytesToHex(uid), data);
        ReadingData readingData = new ReadingData(rawTagData);
        PredictionData predictionData = new PredictionData(readingData.historyMap);

        /*ArrayList<Float> glValues = new ArrayList<Float>();
        int lastHistoryIndex = rawTagData.getIndexHistory();
        int lastTrendIndex = rawTagData.getIndexTrend();*/

        log(Arrays.toString(readingData.historyMap.toArray()));

        double bloodSugar = (double)(rawTagData.getTrendValue(rawTagData.getIndexTrend())/10);

        String str = "";
        str += ("lib: \n");
        str += ("lib: \n");
        str += ("lib: ==========================================  \n");
        str += ("lib:  Reading:\n");
        str += ("lib:   " + new Date() + "\n");
        str += ("lib: ==========================================  \n");

        str += ("lib:  History Index: " + rawTagData.getIndexHistory() + "\n");
        str += ("lib:  Trend Index: " + rawTagData.getIndexTrend() + "\n");
        str += ("lib:  History (" +rawTagData.getIndexHistory()+ "): " + rawTagData.getHistoryValue(rawTagData.getIndexHistory()) + "\n");
        str += ("lib:  Trend (" +rawTagData.getIndexTrend()+ "): " + bloodSugar + "\n");
        str += ("lib:  Glucose Slope: " + predictionData.glucoseSlopeRaw + "\n");
        str += ("lib:  Sensor Age: " + readingData.getSensorAgeInMinutes() + " minutes since start\n");
        str += ("lib:  History: " + new Gson().toJson(readingData.historyMap) + "\n");

        str += ("lib: ========================================== \n");
        str += ("lib:  \n");

        log(str);

        String jsonStr = str + "\n\n" + new Gson().toJson(readingData.trendReadingHM) + "\n\n=======\nFinal Reading: " + readingData.trendReadingHM.get(readingData.latestReadingAt) + " mmol\n\n" + hexData;


        finalSugarMmol = readingData.trendReadingHM.get(readingData.latestReadingAt);
        finalSugarMgdl = finalSugarMmol * 18.02;


        // broadcast intent for sugar value ...
        /*Intent fsintent = new Intent();
        fsintent.setAction("FREESTYLE_DATA_READY");
        fsintent.putExtra("bloodSugar", new DecimalFormat(".##").format(finalSugarMgdl) + "");
        sendBroadcast(fsintent);*/






        log("HEX_DATA: " + hexData);

        //writeToSDFile(jsonStr);

        //tvResult.setText(str.replaceAll("lib:", ""));

        sendToServerAndFinish(finalSugarMmol);

        return bloodSugar + "";
    }

    private void sendToServerAndFinish(double finalSugarMmol) {

        /*
        final String username = "pat";
        final String FQDN = "http://fluffy-mice.glitch.me";

        final String answersCsv = new Gson().toJson(questionnaireAnswers).toString();
        final String url = FQDN + "/sugar?u=" + username + "&g=" + finalSugarMmol + "&answers="+answersCsv;

        Intent transportIntent = new Intent(this, SugarCloudTransport.class);
        transportIntent.setData(Uri.parse(url));
        startService(transportIntent);
        */

        String sugarDecimal = new DecimalFormat(".##").format(finalSugarMgdl);

        mesgT.setText(String.format("Scanning .... %s", sugarDecimal));

        BTReadingsJsInterface.getInstance().saveVitalReadings(Vitals.VITAL_TYPE_SUGAR, sugarDecimal + "", "", "", System.currentTimeMillis());

        Handler handler = new Handler();
        handler.postDelayed(() -> finish(), 500);

    }



    /** Method to write ascii text characters to file on SD card. Note that you must add a
     WRITE_EXTERNAL_STORAGE permission to the manifest file or this method will throw
     a FileNotFound Exception because you won't have write permission. */

    private static void writeToSDFile(String str) {

        // Find the root of the external storage.
        // See http://developer.android.com/guide/topics/data/data-  storage.html#filesExternal

        File root = android.os.Environment.getExternalStorageDirectory();

        // See http://stackoverflow.com/questions/3551821/android-write-to-sd-card-folder

        File dir = new File(root.getAbsolutePath() + "/download");
        dir.mkdirs();
        File file = new File(dir, "myData_"+new Date().toString().replaceAll(" ", "_")+".txt");

        try {
            FileOutputStream f = new FileOutputStream(file);
            PrintWriter pw = new PrintWriter(f);
            pw.println(str);
            pw.flush();
            pw.close();
            f.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            Log.i(TAG, "******* File not found. Did you" +
                    " add a WRITE_EXTERNAL_STORAGE permission to the   manifest?");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String readNfc(Tag tag) {

        final NfcV nfcvTag = NfcV.get(tag);
        log("Enter NdefReaderTask: " + nfcvTag.toString());

        log("Tag ID: "+tag.getId());
        log("Tag Tech List: "+ TextUtils.join(", ", tag.getTechList()));


        try {
            nfcvTag.connect();
        } catch (IOException e) {
            //Toast.makeText(, "Error opening NFC connection!", Toast.LENGTH_SHORT).show();
            log("Error opening NFC: " + e.getMessage());
            return null;
        }

        log("Connection Made");

        String lectura = "";

        byte[][] bloques = new byte[40][8];
        byte[] allBlocks = new byte[40*8];

        log("---------------------------------------------------------------");

        log(nfcvTag.getMaxTransceiveLength() + " max tx length");
        //log("nfcvTag ID: "+nfcvTag.getDsfId());

        //log("getMaxTransceiveLength: "+nfcvTag.getMaxTransceiveLength());
        try {

            log("Getting System Information");

            // Get system information (0x2B)
            byte[] cmd = new byte[]{
                    (byte)0x20,
                    (byte)0x2B,
                    (byte)0x00, (byte)0x00, (byte)0x00, (byte)0x00, (byte)0x00, (byte)0x00, (byte)0x00, (byte)0x00 };
            System.arraycopy(tag.getId(), 0, cmd, 2, 8);
            byte[] systeminfo = nfcvTag.transceive(cmd);

            log("systeminfo: "+systeminfo.toString()+" - "+systeminfo.length);
            log("systeminfo HEX: "+bytesToHex(systeminfo));

            systeminfo = Arrays.copyOfRange(systeminfo, 2, systeminfo.length - 1);

            byte[] memorySize = { systeminfo[6], systeminfo[5]};
            log("Memory Size: "+bytesToHex(memorySize)+" ("+ Integer.parseInt(bytesToHex(memorySize).trim(), 16 ) + ")");

            byte[] blocks = { systeminfo[8]};
            log("blocks: "+bytesToHex(blocks)+" ("+ Integer.parseInt(bytesToHex(blocks).trim(), 16 ) + ")");

            int totalBlocks = Integer.parseInt(bytesToHex(blocks).trim(), 16);

            for(int i=3; i <= 40; i++) { // Leer solo los bloques que nos interesan
                	/*
	                cmd = new byte[] {
	                    (byte)0x00, // Flags
	                    (byte)0x23, // Command: Read multiple blocks
	                    (byte)i, // First block (offset)
	                    (byte)0x01  // Number of blocks
	                };
	                */
                // Read single block
                cmd = new byte[] {
                        (byte)0x20, // Flags
                        (byte)0x20, // Command: Read single blocks
                        (byte)0x00, (byte)0x00, (byte)0x00, (byte)0x00, (byte)0x00, (byte)0x00, (byte)0x00, (byte)0x00,
                        (byte) (i & 0x0ff), // block (offset)
                        };

                System.arraycopy(tag.getId(), 0, cmd, 2, 8);

                byte[] oneBlock = nfcvTag.transceive(cmd);

                log("userdata: "+oneBlock.toString()+" - "+oneBlock.length);
                oneBlock = Arrays.copyOfRange(oneBlock, 1, oneBlock.length);
                bloques[i-3] = Arrays.copyOf(oneBlock, 8);


                log("userdata HEX: "+bytesToHex(oneBlock));

                lectura = lectura + bytesToHex(oneBlock)+"\r\n";
            }

            String s = "";
            for(int i=0;i<40;i++) {
                log(bytesToHex(bloques[i]));
                s = s + bytesToHex(bloques[i]);
            }

            log("S: "+s);

            log("Next read: "+s.substring(4,6));
            int current = Integer.parseInt(s.substring(4, 6), 16);
            log("Next read: "+current);
            log("Next historic read "+s.substring(6,8));

            String[] bloque1 = new String[16];
            String[] bloque2 = new String[32];
            log("--------------------------------------------------");
            int j=0;
            for (int i=8; i< 8+15*12; i+=12)
            {
                log(s.substring(i,i+12));
                bloque1[j] = s.substring(i,i+12);

                final String g = s.substring(i+2,i+4)+s.substring(i,i+2);

                if (current == j) {
                    currentGlucose = glucoseReading(Integer.parseInt(g,16));
                }
                j++;


            }
            lectura = lectura + "Current approximate glucose "+currentGlucose;
            log("Current approximate glucose: "+currentGlucose);

            log("--------------------------------------------------");
            j=0;
            for (int i=188; i< 188+31*12; i+=12)
            {
                log(s.substring(i,i+12));
                bloque2[j] = s.substring(i,i+12);
                j++;
            }
            log("--------------------------------------------------");

        } catch (IOException e) {
            //Log.d(e)
            e.printStackTrace();
            //AbbottActivity.this.runOnUiThread(new Runnable() {
             //   public void run() {
            //        Toast.makeText(getApplicationContext(), "Error reading NFC!", Toast.LENGTH_SHORT).show();
            //    }
            //});
            log("Error READING Nfc: " + e.getMessage());

            return null;
        }

        addText(lectura);

        try {
            nfcvTag.close();
        } catch (IOException e) {
                /*
                AbbottActivity.this.runOnUiThread(new Runnable() {
                    public void run() {
                        Toast.makeText(getApplicationContext(), "Error closing NFC connection!", Toast.LENGTH_SHORT).show();
                    }
                });

                return null;
                */
        }


        /*MediaPlayer mp;
        mp = MediaPlayer.create(AbbottActivity.this, R.raw.notification);
        mp.setOnCompletionListener(new OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mp) {
                // TODO Auto-generated method stub
                mp.reset();
                mp.release();
                mp=null;
            }
        });
        mp.start();*/

            /*Date date = new Date() ;
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss") ;
            File myFile = new File("/sdcard/fsl_"+dateFormat.format(date) + ".log");
            try {
                myFile.createNewFile();
                FileOutputStream fOut = new FileOutputStream(myFile);
                OutputStreamWriter myOutWriter =new OutputStreamWriter(fOut);
                myOutWriter.append(lectura);
                myOutWriter.close();
                fOut.close();
            }
            catch (Exception e)
            {
            }*/

        Log.d(TAG, "Final Reading: " + lectura);


        return null;
    }

    private static void addText(final String s)
    {
        /*AbbottActivity.this.runOnUiThread(new Runnable() {
            public void run() {
                tvResult.setText(s);
            }
        });*/

    }

    private void GetTime(Long minutes){
        Long t3 = minutes;
        Long t4 = t3/1440;
        Long t5 = t3-(t4*1440);
        Long t6 = (t5/60);
        Long t7 = t5-(t6*60);
    }

    private static float glucoseReading(int val) {
        // ((0x4531 & 0xFFF) / 6) - 37;
        int bitmask = 0x0FFF;
        return Float.valueOf( Float.valueOf((val & bitmask) / 6) - 37);
    }


}


