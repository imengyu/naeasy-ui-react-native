import React from 'react';
import { StyleSheet, View, ViewStyle } from "react-native";
import { LoadingPage, LoadingPageProps } from './LoadingPage';

interface LoadingViewProps {
  /**
   * 指定当前是否正在加载
   */
  loading?: boolean,
  /**
   * 外层样式
   */
  style?: ViewStyle,
  /**
   * 为空时使用默认的 LoadingPage 显示加载中页面，否则显示自定义页面
   */
  renderLoading?: JSX.Element|undefined,
  /**
   * 当使用 LoadingPage 时的自定义参数
   */
  loadingPageProps?: LoadingPageProps;

  children?: JSX.Element,
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
  },
});

/**
 * 一个加载中视图，可以用来包裹需要加载的内容
 */
export function LoadingView(props: LoadingViewProps) {

  const { style, children, loading, renderLoading, loadingPageProps } = props;

  return (
    <View style={[
      styles.view,
      style,
    ]}>
      {
        loading ?
          (renderLoading ? renderLoading : <LoadingPage {...loadingPageProps} />) :
          <></>
      }
      { children }
    </View>
  );
}
