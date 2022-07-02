import { Alert as RNAlert, AlertButton, AlertOptions, AlertType } from "react-native";
import { isAndroid, isIOS } from "../utils/PlatformTools";
import { NativeModules } from 'react-native';
import { Toast } from "./Toast";

/**
 * 对原版的 Alert 封装，提供了Android的支持
 */
export const AlertNative = {
  /**
   * 创建并显示弹窗。
   * @param title 标题
   * @param message 提示文本
   * @param buttons 按钮配置
   * @param options Android的可选配置。
   */
  alert(title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) {
    if (isAndroid) {
      const button1 = buttons && buttons[0];
      const button2 = buttons && buttons[1];
      const button3 = buttons && buttons[2];
      NativeModules.DialogAndroid.showMessageDialog({
        title,
        message,
        okText: button1 ? button1.text : '',
        cancelText: button2 ? button2.text : '',
        thirdText: button3 ? button3.text : '',
        cancelable: options ? options.cancelable : true,
        buttonVertical: button1 !== undefined && button2 !== undefined && button3 !== undefined,
      }, (click: string) => {
        switch (click) {
          case 'ok':
            button1 && button1.onPress && button1.onPress();
            break;
          case 'cancel':
            button2 && button2.onPress && button2.onPress();
            break;
          case 'third':
            button3 && button3.onPress && button3.onPress();
            break;
        }
      }, () => {
        options && options.onDismiss && options.onDismiss();
      });
    } else {
      RNAlert.alert(title, message, buttons, options);
    }
  },
  /**
   * 创建并显示提示，以对话框的形式输入一些文本。
   * @param title 对话框的标题。
   * @param message 对话框的文本
   * @param callbackOrButtons 如果传递了一个函数，将使用提示的值调用它 (text: string)=>void，当用户点击“OK”时。如果传递了一个数组，按钮将根据数组内容进行配置。
   * @param type 文本框类型。
   * @param defaultValue 文本框中的默认文本。
   * @param keyboardType 第一个文本字段的键盘类型（如果存在）。文本输入键盘类型之一。
   */
  prompt(
    title: string,
    message?: string,
    callbackOrButtons?: ((text: string) => void) | AlertButton[],
    type?: AlertType,
    defaultValue?: string,
    keyboardType?: string) {
    if (isAndroid) {

      const button1 = typeof callbackOrButtons === 'object' && callbackOrButtons[0];
      const button2 = typeof callbackOrButtons === 'object' && callbackOrButtons[1];
      const button3 = typeof callbackOrButtons === 'object' && callbackOrButtons[2];

      NativeModules.DialogAndroid.showInputDialog({
        title,
        message,
        okText: button1 ? button1.text : '',
        cancelText: button2 ? button2.text : '',
        password: type === 'login-password',
        initialText: defaultValue,
        cancelable: false,
      }, (click: string, value: string) => {
        if (click === 'ok' && typeof callbackOrButtons === 'function')
          callbackOrButtons(value);
        switch (click) {
          case 'ok':
            button1 && button1.onPress && button1.onPress();
            break;
          case 'cancel':
            button2 && button2.onPress && button2.onPress();
            break;
          case 'third':
            button3 && button3.onPress && button3.onPress();
            break;
        }
      });
    } else if (isIOS) {
      RNAlert.prompt(title, message, callbackOrButtons, type, defaultValue, keyboardType);
    }
  },
  /**
   * 显示顶部提示
   */
  topTip(options: {
    /**
     * 提示内容
     */
    title: string,
    /**
     * 提示图标
     */
    icon?: 'success'|'error'|'warning'|''|undefined,
    /**
     * 用户点击提示事件
     */
    onTipClicked?: (() => void)|undefined,
    /**
     * 提示右侧按钮文字，如果为空，则不显示按钮
     */
    buttonText?: string|undefined,
    /**
     * 按钮点击事件
     */
    onButtonClicked?: (() => void)|undefined,
    /**
     * 显示时长，毫秒
     */
    duration?: number|undefined,
  }) {
    if (isAndroid)
      NativeModules.DialogAndroid.showMessageDialog({
        title: options.title,
        icon: options.icon,
        duration: options.duration,
        buttonText: options.buttonText,
      }, (ret: string) => {
        if (ret === 'button')
          options.onButtonClicked && options.onButtonClicked();
        else if (ret === 'button')
          options.onTipClicked && options.onTipClicked();
      });
    else if (isIOS) {
      //TODO 支持ios顶部提示图标和按钮和点击事件
      Toast.info({
        content: options.title,
      }, options.duration, 'top', () => {

      }, false);
    } else {
      throw new Error('Not support');
    }
  },
};
