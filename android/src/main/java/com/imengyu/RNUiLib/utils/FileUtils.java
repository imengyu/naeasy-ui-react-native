package com.imengyu.RNUiLib.utils;

import java.io.File;

public class FileUtils {
  /**
   * 获取目录文件大小
   *
   * @param dir
   * @return
   */
  public static long getDirSize(File dir) {
    if (dir == null) {
      return 0;
    }
    if (!dir.isDirectory()) {
      return 0;
    }
    long dirSize = 0;
    File[] files = dir.listFiles();
    for (File file : files) {
      if (file.isFile()) {
        dirSize += file.length();
      } else if (file.isDirectory()) {
        dirSize += file.length();
        dirSize += getDirSize(file); // 递归调用继续统计
      }
    }
    return dirSize;
  }

  /**
   * 转换文件大小名称
   * @return B/KB/MB/GB
   */
  public static String formatFileSizeName(long fileS) {
    java.text.DecimalFormat df = new java.text.DecimalFormat("#.00");
    String fileSizeString = "";
    if (fileS < 1024) {
      fileSizeString = "B";
    } else if (fileS < 1048576) {
      fileSizeString = "KB";
    } else if (fileS < 1073741824) {
      fileSizeString = "MB";
    } else {
      fileSizeString = "G";
    }
    return fileSizeString;
  }

  /**
   * 转换文件大小
   * @return B/KB/MB/GB
   */
  public static  String formatFileSize(long fileS) {
    java.text.DecimalFormat df = new java.text.DecimalFormat("#.00");
    String fileSizeString = "";
    if (fileS < 1024) {
      fileSizeString = df.format((double) fileS);
    } else if (fileS < 1048576) {
      fileSizeString = df.format((double) fileS / 1024);
    } else if (fileS < 1073741824) {
      fileSizeString = df.format((double) fileS / 1048576);
    } else {
      fileSizeString = df.format((double) fileS / 1073741824);
    }
    return fileSizeString;
  }
}
