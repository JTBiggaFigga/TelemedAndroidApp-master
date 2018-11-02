package com.mwellness.mcare.telemed.bootstrap.http;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;

/**
 * Created by dev01 on 3/28/17.
 */

public class AMainHttpClient {

    public static final MediaType MEDIATYPE_JSON = MediaType.parse("application/json; charset=utf-8");

    private static AMainHttpClient aMainHttpClient;
    private OkHttpClient httpClient;

    private AMainHttpClient() {
    }

    public static AMainHttpClient getInstance() {
        if(aMainHttpClient == null) {
            aMainHttpClient = new AMainHttpClient();
        }
        return aMainHttpClient;
    }

    public OkHttpClient getHttpClient() {
        if(httpClient == null) {
            httpClient = new OkHttpClient.Builder().build();
        }

        return httpClient;
    }
}
