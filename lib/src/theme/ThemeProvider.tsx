import React from 'react';
import { ThemeColor, ThemeContext, ThemeContextData, ThemeSelector, ThemeType } from '../theme/Theme';

export interface ThemeProviderProps {
  /**
   * 主题
   */
  theme?: ThemeType;
  /**
   * 动态主题变量
   */
  themeData?: Record<string, unknown>;
  /**
   * 当子组件调用了 `setTheme` 函数后发出此事件，你应该在此事件中处理更新 theme。
   */
  onThemeChange?: (theme?: ThemeType) => void;

  children: JSX.Element|JSX.Element[];
}

/**
 * 主题 Provider，用于主题相关配置
 */
export function ThemeProvider(props: ThemeProviderProps) {
  const {
    theme = 'light',
    //全局样式数据
    themeData = {},
    onThemeChange,
    children,
  } = props;

  //传递数据
  const themeContextData: ThemeContextData = {
    theme,
    themeData,
    setTheme: (t) => onThemeChange?.(t),
    resolveThemeColor,
    getThemeColorVar,
    getThemeColorVars,
    getThemeVar,
    getThemeVars,
  };

  function resolveThemeColor(srcColor: ThemeColor) {
    return ThemeSelector.color(theme, srcColor) as string;
  }
  function getThemeColorVar(key: string, defaultValue: ThemeColor|undefined) {
    return ThemeSelector.colorNoNull(theme, themeData[key] as ThemeColor, defaultValue);
  }
  function getThemeColorVars<K extends string>(keyAndDefaults: { [P in K]: ThemeColor; }) {
    const result = {} as { [P in K]: string; };
    for (const key in keyAndDefaults)
      result[key] = getThemeColorVar(key, keyAndDefaults[key]);
    return result;
  }
  function getThemeVars<T, K extends string>(keyAndDefaults: { [P in K]: T; }) {
    const result = {} as { [P in K]: T; };
    for (const key in keyAndDefaults)
      result[key] = themeData[key] as T || keyAndDefaults[key];
    return result;
  }
  function getThemeVar<T>(key: string, defaultValue: T) {
    return themeData[key] as T || defaultValue;
  }

  return (
    <ThemeContext.Provider value={themeContextData}>
      {children}
    </ThemeContext.Provider>
  );
}
