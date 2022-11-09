import { ActionSheetIOS, ActionSheetIOSOptions } from "react-native";
import { isAndroid } from "../../utils/PlatformTools";
import { NativeModules } from 'react-native';

interface ActionSheetOptions extends ActionSheetIOSOptions {
  /**
   * 是否显示取消按钮
   */
  showCancel?: boolean|undefined,
}

/**
 * 对原版的 ActionSheet 封装，提供了Android的支持
 */
export const ActionSheetNative = {
  /**
   * 显示原生 ActionSheet
   * @param options 参数
   * @param callback 回调，buttonIndex表示点击的位置
   */
  showNativeActionSheetWithOptions(options: ActionSheetOptions, callback: (buttonIndex: number) => void) : void {
    if (isAndroid) {
      NativeModules.ActionSheetAndroid.showActionSheetWithOptions(options, (clickIndex: number) => {
        if (clickIndex === -1) callback(options.options.length);
        else callback(clickIndex);
      });
    }
    else {
      if (options.showCancel) {
        options.options.push('取消');
        options.cancelButtonIndex = options.options.length - 1;
      }
      ActionSheetIOS.showActionSheetWithOptions(options, callback);
    }
  },
};
