import { solveSize } from "../../utils/StyleTools";
import React from "react";
import { Text as ReactNativeText, TextProps as ReactNativeTextProps, TextStyle } from "react-native";

export interface TextProps extends ReactNativeTextProps {
  /**
   * 字号，支持rpx
   */
  size?: number|string;
  /**
   * 背景颜色
   */
  backgroundColor?: string;
  /**
   * 文字的 textAlign
   */
  align?: "auto" | "left" | "right" | "center" | "justify" | undefined;
  /**
   * 文字颜色
   */
  color?: string;
  /**
   * 是否是粗体(设置后weight属性无效)
   */
  bold?: boolean;
  /**
   * 文字粗细
   */
  weight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
  /**
   * 是否是斜体
   */
  italic?: boolean;
  /**
   * 是否加下划线
   */
  underline?: boolean;
  /**
   * 是否加删除线
   */
  lineThrough?: boolean;
}

/**
 * 对Text组件做了一个封装。提供了一些方便开发的属性。
 */
export function Text(props: TextProps) {
  let textDecorationLine = 'none';
  if (props.underline && props.lineThrough)
    textDecorationLine = 'underline line-through';
  else if (props.underline)
    textDecorationLine = 'underline';
  else if (props.lineThrough)
    textDecorationLine = 'line-through';

  const styleMaker = {
    textAlign: props.align,
    backgroundColor: props.backgroundColor,
    color: props.color,
    fontSize: solveSize(props.size),
    fontStyle: props.italic ? 'italic' : 'normal',
    fontWeight: props.bold ? 'bold' : props.weight,
    textDecorationLine: textDecorationLine,
  } as TextStyle;

  return (<ReactNativeText {...props} style={[ styleMaker, props.style ]} />);
}
