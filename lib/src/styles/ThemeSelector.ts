import { ThemeType } from "../theme/Theme";
import { ColorInfoItem } from "./ColorStyles";
import { DynamicThemeStyleSheetVar } from "./DynamicThemeStyleSheet";

export type ThemeColor = ColorInfoItem|string;

/**
 * 根据当前主题选择不同的颜色或者变量
 */
export class ThemeSelector {
  /**
   * 根据当前主题选择不同的颜色
   * @param object 类型预定义
   */
  public static color(object: ThemeColor|undefined|null, defaultValue?: ThemeColor|string) {
    if (typeof object === 'string')
      return object;
    if (!object) {
      if (typeof defaultValue === 'string')
        return defaultValue;
      return defaultValue?.[DynamicThemeStyleSheetVar.__theme];
    }
    return object[DynamicThemeStyleSheetVar.__theme];
  }
  /**
    * 根据当前主题选择不同的颜色
    * @param object 类型预定义
    */
  public static colorNoNull(object: ThemeColor|undefined, defaultValue?: ThemeColor|string) {
    return ThemeSelector.color(object, defaultValue) as string;
  }
  /**
   * 根据当前主题选择不同的变量
   * @param object 类型预定义
   */
  public static select<T>(object: Record<ThemeType, T>) {
    return object[DynamicThemeStyleSheetVar.__theme];
  }
}
