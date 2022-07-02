import React from "react";
import { View, ViewStyle } from "react-native";
import { Button } from "../Button";
import { Empty, EmptyProp } from "../Empty";
import { WhiteSpace } from "../white-space";

export interface LoadStateObject {
  /**
   * 当前加载是否无数据
   */
  empty?: boolean;
  /**
   * 错误信息
   */
  error?: unknown;
}
export interface LoadStateProps extends Omit<EmptyProp, 'children'> {
  /**
   * 状态控制
   */
  state: LoadStateObject,
  /**
   * 加载失败的文字前缀，默认是“加载失败 ”
   */
  errorText?: string;
  /**
   * 无数据文字，默认是“无数据”
   */
  emptyText?: string;
  /**
   * 重试按钮文字，默认是“重试”
   */
  retryText?: string;

  children?: JSX.Element[]|JSX.Element;
  /**
   * 容器自定义样式
   */
  style?: ViewStyle,
  /**
   * 自定义样式
   */
  emptyStyle?: ViewStyle,
  /**
   * 重试按钮回调
   */
  onRetry?: () => void;
}

/**
 * 一个包装组件，用于显示 加载失败和空状态
 */
export function LoadState(props: LoadStateProps) {
  const state = props.state;
  const errorText = props.errorText || '加载失败 ';
  const emptyText = props.emptyText || '无数据';
  const retryText = props.retryText || '重试';

  return (
    <View style={props.style}>
      { state.empty ? <Empty image="default" style={props.emptyStyle} description={emptyText} /> : <></> }
      { state.error ? <Empty image="error" style={props.emptyStyle} description={errorText + state.error}>
          <WhiteSpace />
          <Button shape="round" type="primary" onPress={props.onRetry}>{retryText}</Button>
        </Empty> : <></> }
      { props.children }
    </View>
  );
}
