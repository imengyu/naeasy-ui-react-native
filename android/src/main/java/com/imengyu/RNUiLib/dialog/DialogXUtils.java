package com.imengyu.RNUiLib.dialog;

import android.content.Context;

import com.kongzue.dialogx.DialogX;
import com.kongzue.dialogx.style.IOSStyle;

public class DialogXUtils {
  private static boolean init = false;

  public static void checkAndInit(Context context) {
    if(!init) {
      DialogX.init(context.getApplicationContext());
      DialogX.globalStyle = IOSStyle.style();
      init = true;
    }
  }
}
