package com.reactanimatedbugapp;

import android.app.Activity;
import android.app.PictureInPictureParams;
import android.os.Build;
import android.util.Rational;

import androidx.annotation.RequiresApi;

public class ExternalPipManager {
    Rational aspectRatio = new Rational(1, 1);


    @RequiresApi(Build.VERSION_CODES.O)
    PictureInPictureParams pipParams = new PictureInPictureParams.Builder()
            .setAspectRatio(aspectRatio)
            .build();

    public void enterPipMode(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            activity.enterPictureInPictureMode(pipParams);
        }
    }
}
