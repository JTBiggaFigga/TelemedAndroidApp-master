package com.mwellness.mcare.telemed.bootstrap.auth0;


import android.util.Base64;

import com.mwellness.mcare.telemed.app.ALog;

import java.io.UnsupportedEncodingException;

/**
 * Created by dev01 on 3/28/17.
 */

public class JwtUtils {


    private static void log(String str) {
        ALog.log(JwtUtils.class, str);
    }

    public static JwtToken decode(String JWTEncoded) {
        try {
            String[] split = JWTEncoded.split("\\.");
            log("\tJWT_DECODED: Header: " + getJson(split[0]));
            log("\tJWT_DECODED: Body: " + getJson(split[1]));
            return new JwtToken(getJson(split[0]), getJson(split[1]));
        } catch (UnsupportedEncodingException e) {
            //Error
            return null;
        }
    }

    private static String getJson(String strEncoded) throws UnsupportedEncodingException{
        byte[] decodedBytes = Base64.decode(strEncoded, 0);
        return new String(decodedBytes, "UTF-8");
    }
}
