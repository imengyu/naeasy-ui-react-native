
import React from 'react';
import CheckTools from '../../utils/CheckTools';
import { ActivityIndicator, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Color, ThemeColor, ThemeSelector } from '../../styles';
import { ThemeWrapper } from '../../theme/Theme';

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
    marginVertical: 10,
    fontSize: 15,
  },
});

/**
 * 一个加载中视图，显示加载中状态
 */
export const LoadingPage = ThemeWrapper(function (props: LoadingPageProps) {

  const { style, children, indicatorColor, indicatorStyle, loadingText, loadingTextStyle } = props;
  return (
    <View style={{ ...styles.loadingView, ...style }}>
      <ActivityIndicator color={ThemeSelector.color(indicatorColor || Color.primary)} size="large" style={indicatorStyle} />
      <Text style={{
        ...styles.loadingText,
        display: CheckTools.isNullOrEmpty(loadingText) ? 'none' : 'flex',
        color: ThemeSelector.color(indicatorColor || Color.primary),
        ...loadingTextStyle,
      }}>{loadingText}</Text>
      { children }
    </View>
  );
});
