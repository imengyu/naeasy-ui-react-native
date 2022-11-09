import React from 'react';
import CheckTools from '../utils/CheckTools';
import { ActivityIndicator, Text, TextStyle, View, ViewStyle } from "react-native";
import { Color, DynamicColor, DynamicThemeStyleSheet, ThemeColor, ThemeSelector } from "../styles";
import { ThemeWrapper } from '../theme/Theme';

interface LoadingViewProps {
  /**
   * 指定当前是否正在加载
   */
  loading?: boolean,
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

const styles = DynamicThemeStyleSheet.create({
  view: {
    position: 'relative',
  },
  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: DynamicColor(Color.mask),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  loadingText: {
    marginVertical: 10,
    fontSize: 15,
    color: DynamicColor(Color.primary),
  },
});

/**
 * 一个加载中视图，可以用来包裹需要加载的内容
 */
export const LoadingView = ThemeWrapper(function (props: LoadingViewProps) {

  const { style, children, loading, indicatorColor, indicatorStyle, loadingText, loadingTextStyle } = props;
  return (
    <View style={{
      ...styles.view,
      ...style,
    }}>
      { loading ? <View style={styles.loadingView}>
        <ActivityIndicator color={ThemeSelector.color(indicatorColor || Color.primary)} size="large" style={indicatorStyle} />
        <Text style={{
          ...styles.loadingText,
          ...loadingTextStyle,
          display: CheckTools.isNullOrEmpty(loadingText) ? 'none' : 'flex',
        }}>{loadingText}</Text>
      </View> : <></> }
      {children}
    </View>
  );
});
