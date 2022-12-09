
import React from 'react';
import CheckTools from '../../utils/CheckTools';
import { ActivityIndicator, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Color } from '../../styles';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';

export interface LoadingPageProps {
  /**
   * 加载器下方文字
   */
  loadingText?: string,
  /**
   * 加载器下方文字样式
   */
  loadingTextStyle?: TextStyle,
  /**
   * 加载器颜色
   * @default Color.primary
   */
  indicatorColor?: ThemeColor,
  /**
   * 加载器样式
   */
  indicatorStyle?: ViewStyle,
  /**
   * 容器自定义样式
   */
  style?: ViewStyle,

  children?: JSX.Element,
}

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  loadingText: {
    marginVertical: DynamicVar('LoadingPageTextMarginVertical', 10),
    fontSize: DynamicVar('LoadingPageTextFontSize', 15),
    color: DynamicVar('LoadingPageTextColor', Color.text),
  },
});

/**
 * 一个加载中视图，显示加载中状态
 */
export function LoadingPage(props: LoadingPageProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    style,
    children,
    indicatorColor = themeContext.getThemeColorVar('LoadingPageIndicatorColor', Color.primary),
    indicatorStyle,
    loadingText,
    loadingTextStyle,
  } = props;

  return (
    <View style={[ themeStyles.loadingView, style ]}>
      <ActivityIndicator
        color={themeContext.resolveThemeColor(indicatorColor)}
        size="large"
        style={indicatorStyle}
      />
      <Text
        style={[
          themeStyles.loadingText,
          {
            display: CheckTools.isNullOrEmpty(loadingText) ? 'none' : 'flex',
            color: themeContext.resolveThemeColor(indicatorColor),
          },
          loadingTextStyle,
        ]}
      >{loadingText}</Text>
      { children }
    </View>
  );
}
