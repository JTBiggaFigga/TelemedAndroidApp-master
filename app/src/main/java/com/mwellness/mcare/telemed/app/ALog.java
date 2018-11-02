package com.mwellness.mcare.telemed.app;

import android.util.Log;

import com.mwellness.mcare.telemed.BuildConfig;

public class ALog {
	
	public static void log(Class<?> cls, String str) {
		Log.d("TelemedQCare", BuildConfig.APP_NAME + ": " + cls.getSimpleName() + ": " + str);
	}

}
