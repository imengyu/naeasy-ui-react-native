import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { ColorInfoItem } from '../styles';

export interface ThemeContextData {
  /**
   * 当前的主题
   */
  theme: ThemeType;
  /**
   * 主题全局数据
   */
  themeData: Record<string, unknown>;
  /**
   * 获取主题颜色数据。相当于 getThemeColor(getThemeVar(xx))
   * @param key 主题属性的名称
   * @param srcColor 默认值
   * @returns 可变颜色在当前主题所对应的颜色
   */
  getThemeColorVar: (key: string, defaultValue?: ThemeColor) => string;
  /**
   * 批量获取主题颜色数据 （getThemeColorVar）
   * @param keyAndDefaults 一个对象，key 是获取主题属性的名称，value是默认值。
   * @returns 返回可变颜色在当前主题所对应的颜色集，key 与传入的数据名称相同。
   */
  getThemeColorVars: <K extends string>(keyAndDefaults: { [P in K]: ThemeColor }) => { [P in K]: string };
  /**
   * 将可变颜色转为当前主题所对应的颜色。
   * @param srcColor 可变颜色
   * @returns 可变颜色在当前主题所对应的颜色
   */
  resolveThemeColor: (srcColor: ThemeColor|undefined, defaultValue?: ThemeColor) => string;
  /**
   * 对于主题组件，可用此函数转换他的 props 默认值，以从主题数据中获取属性默认值。
   * 未提供主题键的属性，将不会发生改动。
   * @param srcProps 源属性
   * @param keyAndDefaults 主题键与默认值
   */
  resolveThemeProps: <T, K extends string>(srcProps: T, themeKeys: { [P in K]: string }) => T;
  /**
   * 获取主题数据
   * @param key 主题属性的名称
   * @param srcColor 默认值
   * @returns 主题数据
   */
  getThemeVar: <T>(key: string, defaultValue: T) => T;
  /**
   * 批量获取主题数据（getThemeVar）
   * @param keyAndDefaults 一个对象，key 是获取主题属性的名称，value是默认值。
   */
  getThemeVars: <T, K extends string>(keyAndDefaults: { [P in K]: T }) => { [P in K]: T };
  /**
   * 设置当前的主题
   * @param theme 当前主题
   */
  setTheme: (theme: ThemeType) => void;
}
export type ThemeType = 'light'|'dark'|string;

//Context 定义
//=======================================

/**
 * 全局的主题上下文
 */
export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

/**
 * useContext(ThemeContext) 的简写
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn('Not found ThemeContext, Did you add ThemeProvider in your Root?');
  }
  return context;
};


//组件
//=======================================

/**
 * 提供一个包装组件，允许渲染时获取主题的值
 */
export function ThemeRender(props: {
  children: (theme: ThemeType, context: ThemeContextData) => JSX.Element|JSX.Element[],
}) {
  return (
    <ThemeContext.Consumer>
      {value => props.children(value.theme, value)}
    </ThemeContext.Consumer>
  );
}

//ThemeSelector
//=======================================

export type ThemeColor = ColorInfoItem|string;

/**
 * 根据当前主题选择不同的颜色或者变量
 */
export class ThemeSelector {
  /**
   * 根据当前主题选择不同的颜色
   * @param object 类型预定义
   */
  public static color(theme: ThemeType, object: ThemeColor|undefined|null, defaultValue?: ThemeColor|string) {
    if (typeof object === 'string')
      return object;
    if (!object) {
      if (typeof defaultValue === 'string')
        return defaultValue;
      return defaultValue?.[theme];
    }
    return object[theme];
  }
  /**
    * 根据当前主题选择不同的颜色
    * @param object 类型预定义
    */
  public static colorNoNull(theme: ThemeType, object: ThemeColor|undefined, defaultValue?: ThemeColor|string) {
    return ThemeSelector.color(theme, object, defaultValue) as string;
  }
  /**
   * 根据当前主题选择不同的变量
   * @param object 类型预定义
   */
  public static select<T>(theme: ThemeType, object: Record<ThemeType, T>) {
    return object[theme];
  }
}
