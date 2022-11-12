package com.imengyu.RNUiLib.utils;

import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.util.Log;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.FileProvider;

import com.imengyu.RNUiLib.pickerview.builder.OptionsPickerBuilder;
import com.imengyu.RNUiLib.pickerview.builder.TimePickerBuilder;
import com.imengyu.RNUiLib.pickerview.view.OptionsPickerView;
import com.imengyu.RNUiLib.pickerview.view.TimePickerView;
import com.imengyu.RNUiLib.whellview.view.WheelView;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class ToolboxAndroidModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  @NonNull
  @Override
  public String getName() {
    return "MToolboxModule";
  }
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    return constants;
  }

  private void sendEvent(String eventName, @Nullable WritableMap params) {
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
  }
  @ReactMethod
  public void addListener(String eventName) {
    // Set up any upstream listeners or background tasks as necessary
  }
  @ReactMethod
  public void removeListeners(Integer count) {
    // Remove upstream listeners, stop unnecessary background tasks
  }

  private static ToolboxAndroidModule singleton = null;

  public ToolboxAndroidModule(ReactApplicationContext context) {
    super(context);
    singleton = this;
    reactContext = context;
  }

  /**
   * 获取是不是深色模式
   */
  @ReactMethod
  public void isDarkMode(Callback callback) {
    int flag = reactContext.getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
    callback.invoke(flag == Configuration.UI_MODE_NIGHT_YES);
  }

  /**
   * 此回调需要在 MainActivity 的 onConfigurationChanged 回调，以为 js 环境中提供主题切换事件。
   *
   * https://developer.android.google.cn/guide/topics/ui/look-and-feel/darktheme?hl=zh-cn
   *
   * 还需要在manifests中声明uiMode，以自行处理深色主题背景的实现：
   * <activity
   *     android:name=".MainActivity"
   *     android:configChanges="uiMode" />
   */
  public static void onConfigurationChanged(Configuration configuration) {
    int currentNightMode = configuration.uiMode & Configuration.UI_MODE_NIGHT_MASK;
    WritableMap param = new WritableNativeMap();
    switch (currentNightMode) {
      case Configuration.UI_MODE_NIGHT_NO: param.putString("theme", "light"); break;
      case Configuration.UI_MODE_NIGHT_YES: param.putString("theme", "dark"); break;
    }
    singleton.sendEvent("onThemeChanged", param);
  }

  /**
   * 输出Log至android logcat
   * @param options
   * {
   *     tag?: string,
   *     level?: 'verbose'|'debug'|'info'|'warn'|'error',
   *     message: string,
   * }
   */
  @ReactMethod
  public void androidLog(ReadableMap options) {
    String message = options.getString("message");

    if (message == null)
      return;

    String level = options.getString("level");
    String tag = options.getString("tag");

    if (level == null) level = "debug";
    if (tag == null) tag = "MToolboxModule";

    switch (level) {
      case "verbose": Log.v(tag, message); break;
      case "info": Log.i(tag, message); break;
      case "warn": Log.w(tag, message); break;
      case "error": Log.e(tag, message); break;
      default:
      case "debug": Log.d(tag, message); break;
    }
  }

  //清除缓存
  @ReactMethod
  public void clearAppCache(Callback callback) {
    ClearCacheAsyncTask asyncTask = new ClearCacheAsyncTask(getReactApplicationContext(), callback);
    asyncTask.execute(10);
  }
  @ReactMethod
  public void getCacheInfo(ReadableMap options, final Callback infoCallback, final Callback errorCallback) {
    try {
      // 计算缓存大小
      long fileSize = 0;
      File filesDir = getReactApplicationContext().getFilesDir();// /data/data/package_name/files
      File cacheDir = getReactApplicationContext().getCacheDir();// /data/data/package_name/cache
      fileSize += FileUtils.getDirSize(filesDir);
      fileSize += FileUtils.getDirSize(cacheDir);
      File externalCacheDir = CacheUtils.getExternalCacheDir(getReactApplicationContext());//"<sdcard>/Android/data/<package_name>/cache/"
      fileSize += FileUtils.getDirSize(externalCacheDir);

      String strFileSize = FileUtils.formatFileSize(fileSize);
      String unit = FileUtils.formatFileSizeName(fileSize);

      WritableMap info = new WritableNativeMap();
      info.putString("filesDir", filesDir.getAbsolutePath());
      info.putString("cacheDir", cacheDir.getAbsolutePath());
      info.putString("cacheSizeString", strFileSize);
      info.putString("cacheUnit", unit);
      info.putInt("cacheSize", (int)fileSize);
      infoCallback.invoke(info);
    } catch (Exception e) {
      errorCallback.invoke(e.toString());
    }
  }
  @ReactMethod
  public void getPackageInfo(ReadableMap options, final Callback infoCallback, final Callback errorCallback) {
    try {
      PackageManager pm = reactContext.getPackageManager();
      PackageInfo p1 = pm.getPackageInfo(reactContext.getPackageName(), 0);
      WritableMap info = new WritableNativeMap();
      info.putString("packageName", p1.packageName);
      info.putInt("versionCode", p1.versionCode);
      info.putString("versionName", p1.versionName);
      infoCallback.invoke(info);
    } catch (Exception e) {
      errorCallback.invoke(e.toString());
    }
  }
  @ReactMethod
  public void installApk(String apkPath, final Callback successCallback, final Callback errorCallback) {
    try {
      File file = new File(apkPath);
      // 这里有文件流的读写，需要处理一下异常
      Intent intent = new Intent(Intent.ACTION_VIEW);
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        //如果SDK版本>=24，即：Build.VERSION.SDK_INT >= 24
        String packageName = reactContext.getApplicationContext().getPackageName();
        String authority = packageName + ".fileprovider";
        Uri uri = FileProvider.getUriForFile(reactContext, authority, file);
        intent.setDataAndType(uri, "application/vnd.android.package-archive");
      } else {
        Uri uri = Uri.fromFile(file);
        intent.setDataAndType(uri, "application/vnd.android.package-archive");
      }
      reactContext.startActivity(intent);
      successCallback.invoke();
    } catch (Exception e) {
      e.printStackTrace();
      errorCallback.invoke(e.toString());
    }
  }
}

