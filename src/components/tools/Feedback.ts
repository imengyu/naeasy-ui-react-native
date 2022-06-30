import { isIOS } from "../../utils/PlatformTools";
import { NativeModules } from 'react-native';
import { selectStyleType } from "../../utils/StyleTools";

const ToolsManagerIOS = NativeModules.ToolsManagerIOS;

/**
 * IOS 触摸反馈
 */
const Feedback = {
  /**
   * 触发IOS选择反馈 （UISelectionFeedbackGenerator）
   */
  impactSelectionFeedbackGenerator() {
    if (isIOS)
      ToolsManagerIOS.impactSelectionFeedbackGenerator();
  },
  /**
   * 触发IOS提示反馈 （UINotificationFeedbackGenerator）
   * @param type 类型 UINotificationFeedbackType*
   */
  impactNotificationFeedbackGenerator(type: 'success'|'warning'|'error') {
    if (isIOS)
      ToolsManagerIOS.impactNotificationFeedbackGenerator(selectStyleType(type, 'success', {
        success: ToolsManagerIOS.UINotificationFeedbackTypeSuccess,
        warning: ToolsManagerIOS.UINotificationFeedbackTypeWarning,
        error: ToolsManagerIOS.UINotificationFeedbackTypeError,
      }));
  },
};

export default Feedback;
