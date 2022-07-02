package com.imengyu.RNUiLib.dialog;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.kongzue.dialogx.dialogs.BottomMenu;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ActionSheetAndroidModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  @NonNull
  @Override
  public String getName() {
    return "ActionSheetAndroid";
  }
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    return constants;
  }

  public ActionSheetAndroidModule(ReactApplicationContext context) {
    super(context);
    DialogXUtils.checkAndInit(context);
    reactContext = context;
  }

  /**
   * 显示原生底部菜单
   * @param options
   * {
   *     title: string, //对话框标题
   *     options: string[], //条目文字
   *     message （字符串） - 弹出框顶部标题下方的信息
   *     showCancel?: boolean, //是否显示取消，默认是
   * }
   * @param callback 回调
   * {
   *     chooseIndex: number, //选中的条目索引
   *     chooseText: string, //选中的条目文字
   * }
   */
  @ReactMethod
  public void showActionSheetWithOptions(ReadableMap options, Callback callback) {
    List<CharSequence> choices = new ArrayList<>();
    String title = "";
    String message = "";
    boolean showCancel = true;
    if (options.hasKey("options")) {
      ReadableArray jchoices = options.getArray("options");
      if (jchoices != null) {
        for (int i = 0; i < jchoices.size(); i++)
          choices.add(jchoices.getString(i));
      }
    }
    if (options.hasKey("title"))
      title = options.getString("title");
    if (options.hasKey("message"))
      message = options.getString("message");
    if (options.hasKey("showCancel"))
      showCancel = options.getBoolean("showCancel");

    BottomMenu dialogInstance = BottomMenu.build();
    dialogInstance
            .setMenuList(choices)
            .setMessage(message)
            .setOnMenuItemClickListener((dialog, text, index) -> {
              callback.invoke(index);
              return false;
            });
    if (!title.isEmpty())
      dialogInstance.setTitle(title);
    if(showCancel) {
      dialogInstance
              .setCancelButton("取消")
              .setCancelButtonClickListener((dialog, text) -> {
                callback.invoke(-1);
                return false;
              });
    }
    dialogInstance.show();
  }
}

