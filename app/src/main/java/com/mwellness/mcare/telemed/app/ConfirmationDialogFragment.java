package com.mwellness.mcare.telemed.app;

/**
 * Created by dev01 on 1/5/18.
 */

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.NonNull;

/**
 * Prompts the user to confirm permission request.
 */
public class ConfirmationDialogFragment extends DialogFragment {

    private static final String ARG_RESOURCES = "resources";

    /**
     * Creates a new instance of ConfirmationDialogFragment.
     *
     * @param resources The list of resources requested by PermissionRequest.
     * @return A new instance.
     */
    public static ConfirmationDialogFragment newInstance(String[] resources) {
        ConfirmationDialogFragment fragment = new ConfirmationDialogFragment();
        Bundle args = new Bundle();
        args.putStringArray(ARG_RESOURCES, resources);
        fragment.setArguments(args);
        return fragment;
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        final String[] resources = getArguments().getStringArray(ARG_RESOURCES);
        return new AlertDialog.Builder(getActivity())
                .setMessage("Allow Camera and Audio Capture?")
                .setNegativeButton("Deny", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        ((Listener) getActivity()).onConfirmation(false, resources);
                    }
                })
                .setPositiveButton("Allow", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        ((Listener) getActivity()).onConfirmation(true, resources);
                    }
                })
                .create();
    }

    /**
     * Callback for the user's response.
     */
    interface Listener {

        /**
         * Called when the PermissionRequest in allowed or denied by the user.
         *
         * @param allowed   True if the user allowed the request.
         * @param resources The resources to be granted.
         */
        void onConfirmation(boolean allowed, String[] resources);
    }

}