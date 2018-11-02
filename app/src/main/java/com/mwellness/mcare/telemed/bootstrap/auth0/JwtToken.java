package com.mwellness.mcare.telemed.bootstrap.auth0;

import com.google.gson.Gson;

/**
 * Created by dev01 on 3/28/17.
 */

public class JwtToken {

    public static final String ALGO_HS256 = "HS256";

    private String header;
    private String body;

    public JwtToken(String header, String body) {
        this.header = header;
        this.body = body;
    }

    public String getHeader() {
        return header;
    }
    public JwtTokenHeader getJwtTokenHeader() {
        return new Gson().fromJson(header, JwtTokenHeader.class);
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getBody() {
        return body;
    }
    public JwtTokenBody getJwtTokenBody() {
        return new Gson().fromJson(body, JwtTokenBody.class);
    }

    public void setBody(String body) {
        this.body = body;
    }
}
