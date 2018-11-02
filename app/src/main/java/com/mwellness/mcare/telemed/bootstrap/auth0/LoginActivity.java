package com.mwellness.mcare.telemed.bootstrap.auth0;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;

import com.auth0.android.Auth0;
import com.auth0.android.authentication.AuthenticationAPIClient;
import com.auth0.android.authentication.AuthenticationException;
import com.auth0.android.callback.BaseCallback;
import com.auth0.android.lock.AuthenticationCallback;
import com.auth0.android.lock.Lock;
import com.auth0.android.lock.LockCallback;
import com.auth0.android.lock.utils.LockException;
import com.auth0.android.management.ManagementException;
import com.auth0.android.management.UsersAPIClient;
import com.auth0.android.result.Credentials;
import com.auth0.android.result.UserProfile;
import com.google.gson.Gson;
import com.mwellness.mcare.telemed.app.ALog;
import com.mwellness.mcare.telemed.app.AMainActivity;
import com.mwellness.mcare.telemed.app.AMainApp;
import com.mwellness.mcare.telemed.app.AMainState;

import java.util.ArrayList;

public class LoginActivity extends AppCompatActivity {

    private Lock lock;
    private Auth0 auth0;


    private static ArrayList<String> allowConnections = new ArrayList<>();

    private static void log(String str) {
        ALog.log(LoginActivity.class, str);
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);


        // Check if credentials are available and valid
        String currState = AMainState.getCurrentState();
        log("CURR_STATE: " + currState);

        // if authorized
        if(!currState.equals("") && currState.equals(AMainState.STATE_AUTHORIZED)) {

            log("Going home ... ");

            Intent homeIntent = new Intent(AMainApp.getAppContext(), AMainActivity.class);
            startActivity(homeIntent);
            finish();
            return;

        }


        allowConnections.add("google-oauth2");

        // Your own Activity code
        auth0 = new Auth0("cUV13sDbkOCQFuho580kh94IEcMeUi30", "qubitmed.auth0.com");
        auth0.setOIDCConformant(true);
        lock = Lock.newBuilder(auth0, callback)
                .withAudience("https://qubitmed.auth0.com/userinfo")
                // ... Options
                .allowedConnections(allowConnections)
                .withScope("openid user_id name nickname email picture app_metadata")
                .withScheme("qubit")
                .build(this);


        startActivity(lock.newIntent(this));
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        // Your own Activity code
        if(lock!=null)
            lock.onDestroy(this);
        lock = null;

        finish();
    }

    private LockCallback callback = new AuthenticationCallback() {
        @Override
        public void onAuthentication(final Credentials credentials) {
            //Authenticated
            log(new Gson().toJson(credentials));

            // start home activity
            final UsersAPIClient usersClient = new UsersAPIClient(auth0, credentials.getIdToken());
            final AuthenticationAPIClient authenticationClient = new AuthenticationAPIClient(auth0);
            authenticationClient.userInfo(credentials.getAccessToken())
                    .start(new BaseCallback<UserProfile, AuthenticationException>() {

                        @Override
                        public void onSuccess(final UserProfile userInfo) {
                            String userId = userInfo.getId();
                            usersClient.getProfile(userId)
                                    .start(new BaseCallback<UserProfile, ManagementException>() {
                                        @Override
                                        public void onSuccess(UserProfile user) {
                                            // Display the user profile
                                            String fullName = "";
                                            String fname = "";
                                            String lname = "";
                                            if(user.getIdentities().get(0).isSocial()) {
                                                fname = user.getGivenName();
                                                lname = user.getFamilyName();
                                                fullName = user.getName();
                                            }
                                            else {
                                                fname = (String) user.getUserMetadata().get("fname");
                                                lname = (String) user.getUserMetadata().get("lname");
                                                fullName = fname + " " + lname;
                                            }

                                            boolean isPatient = false;
                                            if(user.getAppMetadata().containsKey("roles")) {

                                                for(String role: (ArrayList<String>) user.getAppMetadata().get("roles")) {
                                                    if(role.contains("patient")) {
                                                        isPatient = true;
                                                        break;
                                                    }
                                                }
                                            }

                                            if(!isPatient) {

                                                runOnUiThread( () -> {
                                                    Toast.makeText(AMainApp.getAppContext(), "UNAUTHORIZED ACCESS\nRole Unassigned.", Toast.LENGTH_LONG).show();
                                                });


                                                new Thread(()-> {

                                                    try {
                                                        Thread.sleep(3000);
                                                    } catch (InterruptedException e) {
                                                        e.printStackTrace();
                                                    }

                                                    finish();

                                                    try {
                                                        Thread.sleep(1000);
                                                    } catch (InterruptedException e) {
                                                        e.printStackTrace();
                                                    }

                                                    Intent loginIntent = new Intent(AMainApp.getAppContext(), LoginActivity.class);
                                                    startActivity(loginIntent);


                                                }).start();
                                                return;
                                            }

                                            AMainApp.setCredentialDetails(user.getEmail(), user.getId(), credentials.getAccessToken(), credentials.getIdToken(), fullName, fname, lname, user.getPictureURL());

                                            // open home activity
                                            Intent homeIntent = new Intent(AMainApp.getAppContext(), AMainActivity.class);
                                            startActivity(homeIntent);
                                        }

                                        @Override
                                        public void onFailure(ManagementException error) {
                                            //show error
                                        }
                                    });

                        }

                        @Override
                        public void onFailure(AuthenticationException error) {
                            //show error
                        }
                    });


            //AMainApp.setCredentialDetails();
            //startActivity(lock.newIntent(this));

        }

        @Override
        public void onCanceled() {
            //User pressed back
        }

        @Override
        public void onError(LockException error) {
            //Exception occurred
        }
    };
}
