package com.mwellness.mcare.telemed.bootstrap.auth0;

/**
 * Created by dev01 on 3/28/17.
 */

public class Auth0UserMetaData
{
    private String[] roles = new String[]{};

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }
}
