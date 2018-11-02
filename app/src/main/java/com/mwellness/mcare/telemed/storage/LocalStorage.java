package com.mwellness.mcare.telemed.storage;

import android.content.Context;

import java.io.File;

/**
 * Created by dev01 on 3/23/17.
 */

public class LocalStorage {


    public static String getInternalStoragePath(Context context) {
        return context.getFilesDir().getAbsolutePath();
    }

    public static String getExternalNonSdStoragePath(Context context) {
        return context.getExternalFilesDir(null).getAbsolutePath();
    }

    public static String getExternalSdCardStoragePath(Context context) {
        String path = "";
        File[] dirs = context.getExternalFilesDirs(null);

        switch (dirs.length) {
            case 0: {
                path = null;
                break;
            }
            case 1: {
                path = null;
                break;
            }

            case 2: {
                path = dirs[1].getAbsolutePath();
                break;
            }

            default: {
                path = null;
                break;
            }
        }

        return path;
    }


}
