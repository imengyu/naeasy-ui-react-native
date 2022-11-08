import React from "react";
import { ThemeColor } from "../../styles";
import { ThemeContext, ThemeType } from "../../theme/Theme";
import { StatusBar, StatusBarProps, StatusBarStyle } from "react-native";

export interface ThemedStatusBarProps extends Omit<StatusBarProps, 'backgroundColor'|'barStyle'> {
  barStyle?: Record<ThemeType, StatusBarStyle>;
  backgroundColor?: ThemeColor;
}

/**
 * 一个根据当前主题变换颜色的状态栏组件
 */
export function ThemedStatusBar(props: ThemedStatusBarProps) {
  return (
    <ThemeContext.Consumer>
      {value => (
        <StatusBar
          { ...props }
          barStyle={props.barStyle?.[value as ThemeType]}
          backgroundColor={typeof props.backgroundColor === 'string' ? props.backgroundColor : props.backgroundColor?.[value as ThemeType]}
        />
      )}
    </ThemeContext.Consumer>
  );
}
