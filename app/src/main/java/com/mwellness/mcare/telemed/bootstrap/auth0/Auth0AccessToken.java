package com.mwellness.mcare.telemed.bootstrap.auth0;

/**
 * Created by dev01 on 3/28/17.
 */


public class Auth0AccessToken {

    public String access_token;
    public String refresh_toke;
    public String id_token;
    public String token_type;

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getRefresh_toke() {
        return refresh_toke;
    }

    public void setRefresh_toke(String refresh_toke) {
        this.refresh_toke = refresh_toke;
    }

    public String getId_token() {
        return id_token;
    }

    public void setId_token(String id_token) {
        this.id_token = id_token;
    }

    public String getToken_type() {
        return token_type;
    }

    public void setToken_type(String token_type) {
        this.token_type = token_type;
    }
}
