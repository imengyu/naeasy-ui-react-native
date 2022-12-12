import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * 底栏高度占位组件
 */
export function XBarSpace(props: {
  /**
   * 背景颜色
   */
  backgroundColor?: string,
  /**
   * 占位组件的宽度
   */
  width?: number|string,
  /**
   * 自定义渲染
   * @param height 底栏高度
   */
  render?: (height: number) => JSX.Element;
}) {
  const insets = useSafeAreaInsets();

  return (props.render ?
    props.render(insets.bottom) :
    <View style={{
      height: insets.bottom,
      width: props.width,
      backgroundColor: props.backgroundColor,
    }}/>
  );
}
