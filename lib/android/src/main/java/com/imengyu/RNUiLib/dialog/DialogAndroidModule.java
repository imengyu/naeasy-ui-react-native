package com.imengyu.RNUiLib.dialog;

import com.imengyu.RNUiLib.R;

import androidx.annotation.Keep;
import androidx.annotation.NonNull;
import android.text.InputType;
import android.widget.LinearLayout;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.kongzue.dialogx.dialogs.InputDialog;
import com.kongzue.dialogx.dialogs.MessageDialog;
import com.kongzue.dialogx.dialogs.PopTip;
import com.kongzue.dialogx.dialogs.TipDialog;
import com.kongzue.dialogx.dialogs.WaitDialog;
import com.kongzue.dialogx.interfaces.DialogLifecycleCallback;
import com.kongzue.dialogx.util.InputInfo;

import java.util.HashMap;

public class DialogAndroidModule extends ReactContextBaseJavaModule {

  @NonNull
  @Override
  public String getName() {
    return "DialogAndroid";
  }
  public DialogAndroidModule(ReactApplicationContext context) {
    super(context);
    DialogXUtils.checkAndInit(context);
  }
  
  private final HashMap<Integer, WaitDialog> waitDialogHashMap = new HashMap<>();
  private int waitDialogId = 0;
  private final HashMap<Integer, WaitDialog> tipDialogHashMap = new HashMap<>();
  private int tipDialogId = 0;
  
  /**
   * 显示原生加载中对话框
   * @param title 标题
   * @param callback 回调返回数据 dialogId: number, //当前对话框ID，可以使用此ID进行后续操作
   */
  @Keep
  @ReactMethod
  public void showLoading(String title, Callback callback) {
    try {
      waitDialogHashMap.put(++waitDialogId, WaitDialog.show(title));
      if(callback != null)
        callback.invoke(waitDialogId);
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }
  }
  /**
   * 隐藏原生加载中对话框
   * @param id: number, //showLoading 返回的ID
   */
  @Keep
  @ReactMethod
  public void hideLoading(Integer id) {
    try {
      WaitDialog dialog = waitDialogHashMap.get(id);
      if (dialog != null)
        dialog.doDismiss();
      waitDialogHashMap.remove(id);
    }
    catch (Exception e) {
      e.printStackTrace();
    }
  }
  /**
   * 更新原生加载中对话框的百分比
   * @param options
   * {
   *     id: number, //showLoading 返回的ID
   *     progress: number, //百分比，0-1
   * }
   */
  @Keep
  @ReactMethod
  public void setLoadingProgress(ReadableMap options) {
    if(options.hasKey("id") && options.hasKey("progress")) {
      int id = options.getInt("id");
      WaitDialog dialog = waitDialogHashMap.get(id);
      if(dialog != null) {
        dialog.setProgress((float)options.getDouble("progress"));
      }
    }
  }

  /**
   * 显示原生提示对话框
   *  @param options
   * {
   *     title: string, //标题
   *     type: 'success'|'warn'|'error'|'none', 提示类型
   *     duration: number, //显示时长，毫秒
   * }
   * @param callback 回调返回数据 dialogId: number, //当前对话框ID，可以使用此ID进行后续操作
   */
  @Keep
  @ReactMethod
  public void showTipDialog(ReadableMap options, Callback callback) {
    String title = "请稍候...";
    String type = "none";
    int duration = 2000;
    if(options.hasKey("title"))
      title = options.getString("title");
    if(options.hasKey("type"))
      type = options.getString("type");
    if(options.hasKey("duration"))
      duration = options.getInt("duration");

    TipDialog.TYPE type1 = TipDialog.TYPE.NONE;
    if (type != null) {
      switch (type) {
        case "success": type1 = TipDialog.TYPE.SUCCESS; break;
        case "warn": type1 = TipDialog.TYPE.WARNING; break;
        case "error": type1 = TipDialog.TYPE.ERROR; break;
      }
    }

    tipDialogHashMap.put(++tipDialogId, TipDialog.show(title, type1, duration));
    callback.invoke(tipDialogId);
  }
  /**
   * 隐藏原生提示对话框
   * @param id number, //showLoading 返回的ID
   */
  @Keep
  @ReactMethod
  public void hideTipDialog(int id) {
    WaitDialog dialog = tipDialogHashMap.get(id);
    if(dialog != null)
      dialog.doDismiss();
    tipDialogHashMap.remove(id);
  }

  /**
   * 显示原生输入对话框
   * @param options
   * {
   *     title: string, //对话框标题
   *     message: string, //对话框文字
   *     okText: string, //确定按钮文字，默认“确定”
   *     cancelText: string, //取消按钮文字，默认“取消”
   *     hintText: string, //输入框提示文字
   *     initialText: string, //输入框开始时的文字
   * }
   * @param callback 回调
   * (
   *     confirm: boolean, //是选中确定按钮还是取消按钮
   *     inputStr: string, //文本框输入的文字
   * }
   */
  @Keep
  @ReactMethod
  public void showInputDialog(ReadableMap options, Callback callback) {
    String title = "";
    String message = "";
    String okText = "确定";
    String cancelText = "取消";
    String hintText = "请输入";
    String initialText = "";
    boolean cancelable = true;
    boolean password = false;
    if(options.hasKey("title"))
      title = options.getString("title");
    if(options.hasKey("okText"))
      okText = options.getString("okText");
    if(okText == null || okText.isEmpty())
      okText = "确定";
    if(options.hasKey("cancelText"))
      cancelText = options.getString("cancelText");
    if(cancelText == null || cancelText.isEmpty())
      cancelText = "取消";
    if(options.hasKey("message"))
      message = options.getString("message");
    if(options.hasKey("hintText"))
      hintText = options.getString("hintText");
    if(options.hasKey("initialText"))
      initialText = options.getString("initialText");
    if (options.hasKey("cancelable"))
      cancelable = options.getBoolean("cancelable");
    if (options.hasKey("password"))
      password = options.getBoolean("password");

    InputInfo inputInfo = new InputInfo();
    inputInfo.setInputType(password ? (InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD) : InputType.TYPE_CLASS_TEXT);

    InputDialog dialogInstance = InputDialog.build();
    dialogInstance
            .setTitle(title)
            .setMessage(message)
            .setInputText(initialText)
            .setInputHintText(hintText)
            .setInputInfo(inputInfo)
            .setCancelable(cancelable)
            .setOkButton(okText, (baseDialog, v, inputStr) -> {
              callback.invoke("ok", inputStr);
              return false;
            })
            .setCancelButton(cancelText, (baseDialog, v, inputStr) -> {
              callback.invoke("cancel", inputStr);
              return false;
            })
            .show();
  }

  private boolean canNextDialogCallDismiss = true;

  /**
   * 显示原生信息对话框
   * @param options
   * {
   *     title: string, //对话框标题
   *     message: string, //对话框文字
   *     okText: string, //确定按钮文字，默认“确定”
   *     cancelText: string, //取消按钮文字，默认“取消”，为空时不显示
   *     thirdText: string, //第三按钮文字，默认“”，为空时不显示
   * }
   * @param callback 回调
   * (
   *     clicked: 'ok'|'cancel'|'other', //是选中确定按钮
   * )
   */
  @Keep
  @ReactMethod
  public void showMessageDialog(ReadableMap options, final Callback callback, final Callback dismissCallback) {
    try {
      canNextDialogCallDismiss = true;

      String title = "";
      String message = "";
      String okText = "确定";
      String cancelText = "";
      String thirdText = "";
      boolean cancelable = true;
      int buttonOrientation = LinearLayout.HORIZONTAL;
      if (options.hasKey("title"))
        title = options.getString("title");
      if (options.hasKey("okText"))
        okText = options.getString("okText");
      if(okText == null || okText.isEmpty())
        okText = "确定";
      if (options.hasKey("thirdText"))
        thirdText = options.getString("thirdText");
      if (options.hasKey("cancelText"))
        cancelText = options.getString("cancelText");
      if (options.hasKey("message"))
        message = options.getString("message");
      if (options.hasKey("cancelable"))
        cancelable = options.getBoolean("cancelable");
      if (options.hasKey("buttonVertical") && options.getBoolean("buttonVertical"))
        buttonOrientation = LinearLayout.VERTICAL;

      MessageDialog messageDialog = MessageDialog.build();
      messageDialog.setTitle(title);
      messageDialog.setMessage(message);
      messageDialog.setButtonOrientation(buttonOrientation);
      messageDialog.setOkButton(okText, (baseDialog, v) -> {
        callback.invoke("ok");
        canNextDialogCallDismiss = false;
        return false;
      });
      if (cancelText != null && !cancelText.equals(""))
        messageDialog.setCancelButton(cancelText, (baseDialog, v) -> {
          callback.invoke("cancel");
          canNextDialogCallDismiss = false;
          return false;
        });
      if (thirdText != null && !thirdText.equals(""))
        messageDialog.setOtherButton(thirdText, (baseDialog, v) -> {
          callback.invoke("third");
          canNextDialogCallDismiss = false;
          return false;
        });
      messageDialog.setCancelable(cancelable);
      messageDialog.setDialogLifecycleCallback(new DialogLifecycleCallback<MessageDialog>() {
        @Override
        public void onDismiss(MessageDialog dialog) {
          super.onDismiss(dialog);
          if(canNextDialogCallDismiss)
            dismissCallback.invoke();
        }
      });
      messageDialog.show();
    }
    catch (Exception e) {
      e.printStackTrace();
    }
  }

  /**
   * 显示PopTip
   * @param options
   * {
   *     title: string, //文字
   *     icon: ''|'success'|'error'|'warning'|'build'|'check'|'bug_report', //图标
   *     buttonText: string, //按钮文字
   *     duration: number, //显示时间，毫秒
   * }
   * @param callback
   * (
   *     click: false|'button'|'tip' //返回点击了什么，false没有，button点击了按钮，tip点击了PopTip
   * )
   */
  @Keep
  @ReactMethod
  public void showPopTip(ReadableMap options, Callback callback) {
    try {

      PopTip popTip = null;

      if(options.hasKey("title")) {
        String icon = "", title;
        if(options.hasKey("icon"))
          icon = options.getString("icon");
        title = options.getString("title");

        if (icon != null) {
          switch (icon) {
            case "":
            default:
              popTip = PopTip.show(title);
              break;
            case "success":
              popTip = PopTip.show(R.drawable.ic_done_black, title);
              break;
            case "error":
              popTip = PopTip.show(R.drawable.ic_error_black, title);
              break;
            case "warning":
              popTip = PopTip.show(R.drawable.ic_warning_black, title);
              break;
            case "build":
              popTip = PopTip.show(R.drawable.ic_build_black, title);
              break;
            case "check":
              popTip = PopTip.show(R.drawable.ic_check_circle_black, title);
              break;
            case "bug_report":
              popTip = PopTip.show(R.drawable.ic_bug_report_black, title);
              break;
          }
        }
      }
      if(popTip == null) {
        callback.invoke("no title");
        return;
      }
      if(options.hasKey("buttonText"))
        popTip.setButton(options.getString("buttonText"), (baseDialog, v) -> {
          callback.invoke("button");
          return false;
        });
      if(options.hasKey("duration"))
        popTip.autoDismiss(options.getInt("duration"));

      popTip.setOnPopTipClickListener((baseDialog, v) -> {
        callback.invoke("tip");
        return false;
      });

    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}

