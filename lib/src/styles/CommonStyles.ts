import { StyleSheet } from "react-native";

/**
 * 一些通用样式
 */
export const CommonStyles = StyleSheet.create({
  FlexOne: {
    flex: 1,
  },
});

interface GlobalStyle {
  [index: string]: number|string|boolean;
}

/**
 * 全局静态样式变量配置
 */
export const GlobalStyle = {} as GlobalStyle;

/**
 * 配置全局静态样式变量
 * @param props 变量数据。如果已存在相同键的数据，则会覆盖
 */
export function ConfigGlobalStyle(props: GlobalStyle) {
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key))
      GlobalStyle[key] = props[key];
  }
}

/**
 * 获取全局静态样式变量配置
 * @param key 键
 * @param defaultValue 默认值
 * @returns 返回变量
 */
export function GetGlobalStyle<T>(key: string, defaultValue: T) {
  return GlobalStyle[key] || defaultValue;
}
