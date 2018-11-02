package com.mwellness.mcare.telemed.app.jsinterfaces;

import android.content.Context;
import android.webkit.JavascriptInterface;

import com.mwellness.mcare.telemed.app.ALog;

/**
 * Created by dev01 on 3/10/17.
 */

public class JSReferencesJsInterface {



    private static JSReferencesJsInterface jsReferences;

    private Context mContext;
    private String jsMainAppReferenceStr = "";

    /**
     * Get the singleton instance of Shared Preferences Access
     * @return
     */
    public static JSReferencesJsInterface getInstance() {
        if(jsReferences == null) {
            jsReferences = new JSReferencesJsInterface();
        }

        return jsReferences;
    }

    private JSReferencesJsInterface() {}

    private static void log(String str) {
        ALog.log(JSReferencesJsInterface.class, str);
    }


    /**
     * Set the angular main-app reference as a string. Can be referenced using window[referenceStr].
     * @param referenceStr
     */
    @JavascriptInterface
    public synchronized void setMainAppReferenceString(final String referenceStr) {
        log("Setting jsMainAppReferenceStr to " + referenceStr);
        this.jsMainAppReferenceStr = referenceStr;
    }

    @JavascriptInterface
    public synchronized String getJsMainAppReferenceStr() {
        return this.jsMainAppReferenceStr;
    }


}
