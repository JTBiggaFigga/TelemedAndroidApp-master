package com.mwellness.mcare.telemed.app;

import android.speech.tts.TextToSpeech;

import java.util.Locale;

/**
 * Created by dev01 on 1/21/18.
 */

public class AMainTts {

    private static void log(final String str) {
        ALog.log(AMainTts.class, str);
    }

    private static volatile AMainTts aMainTts;

    private TextToSpeech tts;

    public static AMainTts getInstance() {
        if(aMainTts == null) {
            aMainTts = new AMainTts();
            aMainTts.initTts();
        }

        return aMainTts;
    }

    private void initTts() {
        tts = new TextToSpeech(AMainApp.getAppContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if(status != TextToSpeech.ERROR) {
                    tts.setLanguage(Locale.US);
                    tts.setSpeechRate(0.75f);
                }
            }
        });
    }

    public void speak(final String str) {
        if(tts == null) {
            log("TTS Object is null");
            return;
        }

        tts.speak(str, TextToSpeech.QUEUE_FLUSH, null, null);
    }

    public void shutdownTts() {

        tts.stop();
        tts.shutdown();

        tts = null;

        aMainTts = null;
    }

}
