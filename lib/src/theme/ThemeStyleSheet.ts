import { useContext } from "react";
import { useMemo } from "react";
import { ColorValue, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { ColorInfoItem } from "../styles";
import { ThemeColor, ThemeContext, ThemeContextData } from "./Theme";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

const DYNAMIC_PROPTYPE_COLOR = 'Color';
const DYNAMIC_PROPTYPE_VAR = 'Var';
const DYNAMIC_PROPTYPE_COLOR_VAR = 'ColorVar';

/**
 * 转换动态主题样式组 `DynamicColor` `DynamicVar` 为真实样式。
 *
 * 你可以使用包装版本hook `useThemeStyles`，或者可以这样使用（同包装版本）：
 * ```
 * const sourceStyles = StyleSheet.create({
 *   italic: {
 *     color: DynamicColor(Color.text),
 *     fontStyle: 'italic',
 *   },
 * });
 * const themeData = useThemeContext();
 * const style = useMemo(() => transformThemeStyles(sourceStyles, themeData), [ sourceStyle, themeData ])
 * ```
 *
 * @param sourceStyle 源样式
 * @param themeData useThemeContext 返回的样式数据
 * @returns 对应样式组
 */
export function transformThemeStyles<T extends NamedStyles<T> | NamedStyles<any>>(sourceStyle: T | NamedStyles<T>, themeData: ThemeContextData) : T {
  const resultObjects = {} as NamedStyles<T>;
  for (const key in sourceStyle)
    resultObjects[key] = transformThemeStyle(sourceStyle[key], themeData);
  return resultObjects as T;
}
/**
 * 转换动态主题样式 `DynamicColor` `DynamicVar` 为真实样式。
 *
 * 你可以使用包装版本hook `useThemeStyle`，或者可以这样使用（同包装版本）：
 * ```
 * const sourceStyles = StyleSheet.create({
 *   italic: {
 *     color: DynamicColor(Color.text),
 *     fontStyle: 'italic',
 *   },
 * });
 * const themeData = useThemeContext();
 * const style = useMemo(() => transformThemeStyles(sourceStyles.italic, themeData), [ sourceStyle, themeData ])
 * ```
 *
 * @param sourceStyle 源样式
 * @param themeData useThemeContext 返回的样式数据
 * @returns 对应样式
 */
export function transformThemeStyle(sourceStyle: ViewStyle | TextStyle | ImageStyle, themeData: ThemeContextData) {

  const srcStyleObject = sourceStyle as Record<string, unknown>;
  const finalStyleObject = {} as Record<string, unknown>;

  let hasDynamicProp = false;
  for (const key2 in srcStyleObject) {
    //找到当前样式对象中是否有动态主题属性
    const styleValue = srcStyleObject[key2] as Record<string, unknown>;
    if (typeof styleValue === 'object' && styleValue.__isDaymicThemeProp__ === true) {
      //处理动态属性
      const proptype = styleValue.__daymicThemePropType__ as string;

      switch (proptype) {
        case DYNAMIC_PROPTYPE_COLOR:
          //动态颜色
          finalStyleObject[key2] = themeData.resolveThemeColor(styleValue as unknown as ColorInfoItem);
          break;
        case DYNAMIC_PROPTYPE_COLOR_VAR: {
          //动态颜色变量
          const propKey = styleValue.__daymicThemePropKey__ as string;
          const propDefaultValue = styleValue.__daymicThemePropDefaultValue__ as ColorInfoItem;
          finalStyleObject[key2] = themeData.getThemeColorVar(propKey, propDefaultValue);
          break;
        }
        default:
        case DYNAMIC_PROPTYPE_VAR: {
          //动态属性
          const propKey = styleValue.__daymicThemePropKey__ as string;
          const propDefaultValue = styleValue.__daymicThemePropDefaultValue__ as string;
          finalStyleObject[key2] = themeData.getThemeVar(propKey, propDefaultValue);
          break;
        }
      }

      hasDynamicProp = true;
    } else {
      //不是动态主题属性，原样返回
      finalStyleObject[key2] = styleValue;
    }
  }

  //如果有动态属性，则覆盖原有数据
  return hasDynamicProp ? finalStyleObject : srcStyleObject;
}

/**
 * 为 transformThemeStyles 进行包装，用于在主题更改时重新更新样式。
 * @param sourceStyle 源样式
 */
export function useThemeStyles<T>(sourceStyle: NamedStyles<T>) {
  const themeData =  useContext(ThemeContext);
  if (!themeData) {
    console.warn('Not found ThemeContext, Did you add ThemeProvider in your Root?');
  }
  return useMemo(() => transformThemeStyles(sourceStyle, themeData), [ sourceStyle, themeData ]) as NamedStyles<T>;
}
/**
 * 为 transformThemeStyle 进行包装，用于在主题更改时重新更新样式。
 * @param sourceStyle 源样式
 */
export function useThemeStyle<T extends ViewStyle | TextStyle | ImageStyle>(sourceStyle: T) {
  const themeData =  useContext(ThemeContext);
  if (!themeData) {
    console.warn('Not found ThemeContext, Did you add ThemeProvider in your Root?');
  }
  return useMemo(() => transformThemeStyle(sourceStyle, themeData), [ sourceStyle, themeData ]) as T;
}

/**
 * 标记这是一个动态主题颜色，请与 useThemeStyle 搭配使用。
 */
export function DynamicColor(src: ColorInfoItem) : ColorValue {
  const obj = {
    __isDaymicThemeProp__: true,
    __daymicThemePropType__: DYNAMIC_PROPTYPE_COLOR,
    __TYPE__: 'Color',
  };

  for (const key in src) {
    Object.defineProperty(obj, key, {
      get: function () {
        return src[key];
      },
    });
  }

  return obj as unknown as ColorValue;
}
/**
 * 标记这是一个动态主题颜色变量属性，请与 useThemeStyle 搭配使用。
 */
export function DynamicColorVar(propKey: string, defaultValue: ThemeColor) : ColorValue {
  return {
    __isDaymicThemeProp__: true,
    __daymicThemePropKey__: propKey,
    __daymicThemePropType__: DYNAMIC_PROPTYPE_COLOR_VAR,
    __daymicThemePropDefaultValue__: defaultValue,
  } as unknown as ColorValue;
}
/**
 * 标记这是一个动态主题变量属性，请与 useThemeStyle 搭配使用。
 */
export function DynamicVar<T>(propKey: string, defaultValue: T) : T {
  return {
    __isDaymicThemeProp__: true,
    __daymicThemePropKey__: propKey,
    __daymicThemePropType__: DYNAMIC_PROPTYPE_VAR,
    __daymicThemePropDefaultValue__: defaultValue,
  } as unknown as T;
}

