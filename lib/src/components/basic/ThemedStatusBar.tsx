import React from "react";
import { ThemeColor, ThemeType, useThemeContext } from "../../theme/Theme";
import { StatusBar, StatusBarProps, StatusBarStyle } from "react-native";

export interface ThemedStatusBarProps extends Omit<StatusBarProps, 'backgroundColor'|'barStyle'> {
  barStyle?: Record<ThemeType, StatusBarStyle>;
  backgroundColor?: ThemeColor;
}

/**
 * 一个根据当前主题变换颜色的状态栏组件
 */
export function ThemedStatusBar(props: ThemedStatusBarProps) {
  const themeContext = useThemeContext();

  return (
    <StatusBar
      { ...props }
      barStyle={props.barStyle?.[themeContext.theme]}
      backgroundColor={themeContext.resolveThemeColor(props.backgroundColor as ThemeColor)}
    />
  );
}
