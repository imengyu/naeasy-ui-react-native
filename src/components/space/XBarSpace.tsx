import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColor, ThemeSelector } from "../../styles";
import { ThemeWrapper } from "../../theme/Theme";
import { solveSize } from "../../utils";

/**
 * 底栏高度占位组件
 */
export const XBarSpace = ThemeWrapper(function (props: {
  /**
   * 背景颜色
   */
  backgroundColor?: ThemeColor,
  /**
   * 占位组件的宽度
   */
  width?: number|string,
}) {
  const insets = useSafeAreaInsets();
  return <View style={{
    height: insets.bottom,
    width: solveSize(props.width),
    backgroundColor: ThemeSelector.color(props.backgroundColor),
  }}/>;
});
