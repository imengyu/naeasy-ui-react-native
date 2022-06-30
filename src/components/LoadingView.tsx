import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Color } from "../styles/ColorStyles";
import CheckTools from '../utils/CheckTools';

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
  indicatorColor?: string,
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
  view: {
    position: 'relative',
  },
  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Color.maskWhite,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  loadingText: {
    marginVertical: 10,
    fontSize: 15,
    color: Color.primary,
  },
});

/**
 * 一个加载中视图，可以用来包裹需要加载的内容
 */
export function LoadingView(props: LoadingViewProps) {

  const { style, children, loading, indicatorColor, indicatorStyle, loadingText, loadingTextStyle } = props;
  return (
    <View style={{
      ...styles.view,
      ...style,
    }}>
      { loading ? <View style={styles.loadingView}>
        <ActivityIndicator color={indicatorColor || Color.primary} size="large" style={indicatorStyle} />
        <Text style={{
          ...styles.loadingText,
          ...loadingTextStyle,
          display: CheckTools.isNullOrEmpty(loadingText) ? 'none' : 'flex',
        }}>{loadingText}</Text>
      </View> : <></> }
      {children}
    </View>
  );
}

export default LoadingView;
