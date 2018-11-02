package com.mwellness.mcare.telemed.app;

/**
 * Created by dev01 on 12/20/17.
 */

public class APatientProfile {

    private String fullName;
    private String fname;
    private String lname;
    private String email;
    private String pictureUrl;
    private String auth0UserId;
    private String auth0IdToken;
    private String accessToken;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public String getAuth0UserId() {
        return auth0UserId;
    }

    public void setAuth0UserId(String auth0UserId) {
        this.auth0UserId = auth0UserId;
    }

    public String getAuth0IdToken() {
        return auth0IdToken;
    }

    public void setAuth0IdToken(String auth0IdToken) {
        this.auth0IdToken = auth0IdToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
