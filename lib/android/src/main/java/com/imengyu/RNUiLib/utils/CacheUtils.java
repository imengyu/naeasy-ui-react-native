package com.imengyu.RNUiLib.utils;

import android.content.Context;

import java.io.File;

public class CacheUtils {
  public static File getExternalCacheDir(Context context) {
    return context.getExternalCacheDir();
  }
  /**
   * 清除app缓存
   */
  public static void clearCache(Context context) {
    context.deleteDatabase("webview.db");
    context.deleteDatabase("webview.db-shm");
    context.deleteDatabase("webview.db-wal");
    context.deleteDatabase("webviewCache.db");
    context.deleteDatabase("webviewCache.db-shm");
    context.deleteDatabase("webviewCache.db-wal");
    //清除数据缓存
    clearCacheFolder(context.getFilesDir(), System.currentTimeMillis());
    clearCacheFolder(context.getCacheDir(), System.currentTimeMillis());
    clearCacheFolder(getExternalCacheDir(context), System.currentTimeMillis());
  }
  /**
   * 清除缓存目录
   * 目录
   * 当前系统时间
   */
  public static int clearCacheFolder(File dir, long curTime) {
    int deletedFiles = 0;
    if (dir != null && dir.isDirectory()) {
      try {
        for (File child : dir.listFiles()) {
          if (child.isDirectory()) {
            deletedFiles += clearCacheFolder(child, curTime);
          }
          if (child.lastModified() < curTime) {
            if (child.delete()) {
              deletedFiles++;
            }
          }
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    return deletedFiles;
  }
}
