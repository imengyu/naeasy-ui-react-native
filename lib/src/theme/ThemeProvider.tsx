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
    getThemeColor: (srcColor) => ThemeSelector.color(theme, srcColor) as string,
    getThemeColorData: (key, defaultValue) => ThemeSelector.color(theme, themeData[key] as ThemeColor, defaultValue) as string,
    getThemeData: (key, defaultValue) => (themeData[key] as any || defaultValue),
  };

  return (
    <ThemeContext.Provider value={themeContextData}>
      {children}
    </ThemeContext.Provider>
  );
}
