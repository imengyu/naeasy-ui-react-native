import React from "react";
import { Text as ReactNativeText, TextProps as ReactNativeTextProps, TextStyle } from "react-native";
import { Color, ThemeColor, ThemeSelector } from "../../styles";
import { ThemeWrapper } from "../../theme/Theme";
import { solveSize } from "../../utils/StyleTools";

export interface TextProps extends ReactNativeTextProps {
  /**
   * 字号，支持rpx
   */
  size?: number|string;
  /**
   * 背景颜色
   */
  backgroundColor?: ThemeColor;
  /**
   * 文字的 textAlign
   */
  align?: "auto" | "left" | "right" | "center" | "justify" | undefined;
  /**
   * 文字颜色
   */
  color?: ThemeColor;
  /**
   * 是否是粗体(设置后weight属性无效)
   */
  bold?: boolean;
  /**
   * 文字粗细
   */
  weight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
  /**
   * 宽度
   */
  width?: number;
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
  /**
   * 是否开启自动工具文字长短设置大小。
   */
  autoSize?: boolean;
  /**
   * 自动工具文字长短设置大小，在 autoSize 为 true 时有效。
   *
   * 这个是一个小功能，目的是为了在某些情况下（例如金额显示），容器宽度一定但是文字长短不定，
   * 此时需要自动缩放大小，文字越长，字号越小。
   *
   * 计算公式是 (1 - (text.length - minLen) / (maxLen - minLen)) * (maxSize - minSize) + minSize
   */
  autoSizeOption?: {
    /**
     * 最长文字长度，用于自动大小公式计算
     */
    maxLen: number;
    /**
     * 最短文字长度，如果输入文字长度小于这个值，则不会进行自动缩放
     */
    minLen: number;
    /**
     * 最大文字字号，用于自动大小公式计算
     */
    maxSize: number;
    /**
     * 最小文字字号，用于自动大小公式计算
     */
    minSize: number;
  };
}

/**
 * 对Text组件做了一个封装。提供了一些方便开发的属性。
 */
export const Text = ThemeWrapper(function (props: TextProps) {

  function getAutoSize() {
    //自动缩放大小，文字越长，字号越小
    const autoSizeOption = props.autoSizeOption;
    if (autoSizeOption) {
      const text = '' + props.children;
      if (text.length < autoSizeOption.minLen)
        return solveSize(props.size);
      return (1 - (text.length - autoSizeOption.minLen) / (autoSizeOption.maxLen - autoSizeOption.minLen))
        * (autoSizeOption.maxSize - autoSizeOption.minSize) + autoSizeOption.minSize;
    }
    return solveSize(props.size);
  }

  let textDecorationLine = 'none';
  if (props.underline && props.lineThrough)
    textDecorationLine = 'underline line-through';
  else if (props.underline)
    textDecorationLine = 'underline';
  else if (props.lineThrough)
    textDecorationLine = 'line-through';

  const styleMaker = {
    textAlign: props.align,
    backgroundColor: ThemeSelector.color(props.backgroundColor),
    color: ThemeSelector.color(props.color || Color.text),
    fontSize: props.autoSize === true ? getAutoSize() : solveSize(props.size),
    fontStyle: props.italic ? 'italic' : 'normal',
    fontWeight: props.bold ? 'bold' : props.weight,
    width: props.width,
    textDecorationLine: textDecorationLine,
  } as TextStyle;

  return (<ReactNativeText {...props} style={[ styleMaker, props.style ]} />);
});
