package com.mwellness.mcare.telemed.app.jsinterfaces;

import android.content.Context;
import android.webkit.JavascriptInterface;

import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.app.AMainActivity;
import com.mwellness.mcare.telemed.app.AMainApp;
import com.mwellness.mcare.telemed.bootstrap.auth0.Auth0AccessToken;
import com.mwellness.mcare.telemed.bootstrap.auth0.JwtToken;
import com.mwellness.mcare.telemed.bootstrap.auth0.JwtUtils;
import com.mwellness.mcare.telemed.bootstrap.http.AMainHttpClient;
import com.mwellness.mcare.telemed.bootstrap.utils.GsonUtils;

import java.io.IOException;
import java.lang.ref.WeakReference;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by dev01 on 3/8/17.
 */


public class AAuth0WebViewJsInterface {


    private WeakReference<AMainActivity> authWebViewActivity;

    private static AAuth0WebViewJsInterface aAuth0WebViewJsInterface;

    public static AAuth0WebViewJsInterface getInstance(WeakReference<AMainActivity> activity) {
        if(aAuth0WebViewJsInterface == null) {
            aAuth0WebViewJsInterface = new AAuth0WebViewJsInterface(activity);
        }

        return aAuth0WebViewJsInterface;
    }



    private AAuth0WebViewJsInterface(WeakReference<AMainActivity> activity) {
        this.authWebViewActivity = activity;
    }

    private static void log(String str) {
        ALog.log(AAuth0WebViewJsInterface.class, str);
    }

    @JavascriptInterface
    public void processAuthCode(String code) throws IOException {

        Context mContext = authWebViewActivity.get().getApplicationContext();
        AMainPreferences preferences = AMainPreferences.getInstance();

        String codeVerifier = preferences.getString(AMainPreferences.PREF_KEY_CODE_VERIFIER);


        String url = "https://qubitmed.auth0.com/oauth/token";
        String bodyString = "{\"grant_type\":\"authorization_code\"," +
                "\"client_id\": \"" + AMainApp.AUTH0_CLIENT_ID + "\"," +
                "\"code\": \""+code+"\",\"code_verifier\": \""+codeVerifier+"\"," +
                "\"redirect_uri\": \"" + AMainActivity.authCallbackUrl + "\" }";

        RequestBody requestBody = RequestBody.create(AMainHttpClient.MEDIATYPE_JSON, bodyString);
        Request request = new Request.Builder()
                .url(url)
                .header("content-type", "application/json")
                .post(requestBody)
                .build();


        log("Getting tokens: " + url);
        log("Request Body: " + bodyString);

        OkHttpClient client = AMainHttpClient.getInstance().getHttpClient();
        Call c = client.newCall(request);
        Response response = c.execute();


        String responseBody = response.body().string();
        log(responseBody);
        Auth0AccessToken auth0AccessToken = GsonUtils.getInstance().fromJson(responseBody, Auth0AccessToken.class);
        String accessToken = auth0AccessToken.getAccess_token();
        log("access token: " + accessToken);

        preferences.setString(AMainPreferences.PREF_KEY_ACCESS_TOKEN, accessToken);

        parseJwtToken(accessToken);

    }

    private void parseJwtToken(String token) {

        JwtToken jwtToken = JwtUtils.decode(token);
        if(jwtToken != null) {

        }

    }

    @JavascriptInterface
    public void setToken(String email, String auth0UserId, String accessToken, String idToken, String name, String fname, String lname, String pictureUrl) {


        AMainApp.setCredentialDetails(email, auth0UserId, accessToken, idToken, name, fname, lname, pictureUrl);

        if(authWebViewActivity != null)
            authWebViewActivity.get().openAppHomeUrl();

    }

    @JavascriptInterface
    public void echo(String str) {
        log("ECHOING: " + str);
    }

}
