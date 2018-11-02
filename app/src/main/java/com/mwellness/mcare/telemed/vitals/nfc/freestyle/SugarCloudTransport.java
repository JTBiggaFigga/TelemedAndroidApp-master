package com.mwellness.mcare.telemed.vitals.nfc.freestyle;

import android.app.IntentService;
import android.content.Intent;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by dev01 on 10/2/17.
 */

public class SugarCloudTransport extends IntentService {

    public SugarCloudTransport(){
        super("");
    }

    public SugarCloudTransport(String name) {
        super(name);
    }

    private static void log(String str) {
        AbbottActivity.log(SugarCloudTransport.class.getSimpleName() + ": " + str);
    }

    @Override
    protected void onHandleIntent(Intent intent) {

        String url = intent.getDataString();


        log("Made Request to " + url);

        try {
            OkHttpClient client = new OkHttpClient();

            Request request = new Request.Builder()
                    .url(url)
                    .build();

            Response response = client.newCall(request).execute();

            String responseStr = response.body().string();
            log("Response from " + url + " ... " + responseStr);

        } catch (IOException e) {
            e.printStackTrace();
            log(e.getMessage());
        }

    }
}
