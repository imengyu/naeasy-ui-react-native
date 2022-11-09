import { ImageStyle, TextStyle, ViewStyle, ColorValue } from "react-native";
import { ColorInfoItem } from "./ColorStyles";
import { ThemeSelector } from "./ThemeSelector";

export namespace DynamicThemeStyleSheet {
  type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

  /**
   * 创建动态主题的样式。
   */
  export function create<T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>): T {
    const resultObjects = {} as NamedStyles<T>;
    for (const key in styles) {
      const oldStyleObject = styles[key] as Record<string, unknown>;
      const finalStyleObject = {} as Record<string, unknown>;

      let findThemeableKeys = [] as string[];

      for (const key2 in oldStyleObject) {
        //找到当前样式对象中是否有动态主题属性
        const styleValue = oldStyleObject[key2];
        if (typeof styleValue === 'object' && (styleValue as Record<string, unknown>)?.__isDaymicThemeProp__ === true)
          findThemeableKeys.push(key2);
        else {
          if (typeof styleValue !== 'undefined')
            finalStyleObject[key2] = styleValue;
        }
      }

      if (findThemeableKeys.length === 0) {
        //没有动态主题属性，原样返回
        resultObjects[key] = finalStyleObject;
        continue;
      }

      //有动态主题，所以生成一个getter方法

      const __lastDaymicThemeObj__ = `__lastDaymicThemeObj${key}__`;
      const __lastDaymicThemeValue__ = `__lastDaymicThemeValue${key}__`;

      Object.defineProperty(resultObjects, key, {
        get: function () {
          //样式没有更改，则返回上一次的对象
          if (this[__lastDaymicThemeObj__] && this[__lastDaymicThemeValue__] === ThemeSelector.theme)
            return this[__lastDaymicThemeObj__];

          //否则需要重新生成样式对象
          const resultStyleObj = { ...finalStyleObject } as Record<string, unknown>;

          //对动态的属性需要重新赋值生成
          for (const themeableKey of findThemeableKeys)
            resultStyleObj[themeableKey] = ThemeSelector.color(oldStyleObject[themeableKey] as unknown as ColorInfoItem);

          this[__lastDaymicThemeObj__] = resultStyleObj;
          this[__lastDaymicThemeValue__] = ThemeSelector.theme;

          return resultStyleObj;
        },
      });
    }
    return resultObjects as T;
  }
}

/**
 * 标记这是一个动态主题颜色，请与 DynamicThemeStyleSheet 搭配使用。
 */
export function DynamicColor(params: ColorInfoItem) : ColorValue {
  return {
    ...params,
    __isDaymicThemeProp__: true,
    __TYPE__: 'Color',
  } as unknown as ColorValue;
}
