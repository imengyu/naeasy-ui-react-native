package com.imengyu.RNUiLib.toolbox;

import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.content.res.Configuration;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Build;
import android.text.TextPaint;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.FileProvider;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.views.text.ReactFontManager;
import com.hjq.permissions.OnPermissionPageCallback;
import com.hjq.permissions.XXPermissions;
import com.imengyu.RNUiLib.utils.CacheUtils;
import com.imengyu.RNUiLib.utils.ClearCacheAsyncTask;
import com.imengyu.RNUiLib.utils.FileUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class MeasureTextModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;

  @NonNull
  @Override
  public String getName() {
    return "NaMeasureTextModule";
  }

  public MeasureTextModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  /**
   * Android P is adding new typefaces. This should be updated by that time.
   */
  private int getFontWeight(String fontWeight) {
    if ((fontWeight == null)) return Typeface.NORMAL;
    switch (fontWeight) {
      case "bold":
      case "500":
      case "600":
      case "700":
      case "800":
      case "900":
        return Typeface.BOLD;
      case "normal":
      case "100":
      case "200":
      case "300":
      case "400":
      default:
        return Typeface.NORMAL;
    }
  }
  private TextPaint createTextPaint(float fontSize, String fontFamily, String fontWeight) {
    TextPaint paint = new TextPaint(TextPaint.ANTI_ALIAS_FLAG);
    paint.setTextSize(fontSize * this.reactContext.getResources().getConfiguration().fontScale);
    AssetManager assetManager = getReactApplicationContext().getAssets();
    Typeface typeface = ReactFontManager.getInstance().getTypeface(fontFamily, getFontWeight(fontWeight), assetManager);
    paint.setTypeface(typeface);
    return paint;
  }

  @ReactMethod
  public void measureText(ReadableMap options, Callback callback) {
    String text = options.getString("text");
    float fontSize = (float)options.getDouble("fontSize");
    String fontFamily = options.getString("fontFamily");
    String fontWeight = options.getString("fontWeight");

    TextPaint paint = createTextPaint(fontSize, fontFamily, fontWeight);
    callback.invoke(paint.measureText(text));
  }

}

