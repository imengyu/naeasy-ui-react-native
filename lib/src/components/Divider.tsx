import React from 'react';
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { selectStyleType } from "../utils/StyleTools";
import { ColumnView } from "./layout/ColumnView";
import { RowView } from "./layout/RowView";
import { Color, ThemeColor, DynamicColor, DynamicThemeStyleSheet, ThemeSelector } from '../styles';
import { ThemeWrapper } from '../theme/Theme';

type DividerOrientationTypes = 'left' | 'right' | 'center';

export interface DividerProps {
  /**
   * 是否虚线，默认 false
   */
  dashed?: boolean;
  /**
   * 线的颜色，默认 gray
   */
  color?: ThemeColor;
  /**
   * 线的颜色，默认 无
   */
  backgroundColor?: ThemeColor;
  /**
   * 分割线标题的位置，默认 center
   */
  orientation?: DividerOrientationTypes;
  /**
   * 水平还是垂直类型，默认 horizontal
   */
  type?: 'horizontal' | 'vertical';
  /**
   * 分割线上面的文字（仅水平状态有效）
   */
  text?: string,
  /**
   * 分割线上面的文字样式
   */
  textStyle?: TextStyle,
  /**
   * 分割线宽度，默认1
   */
  width?: number;
  /**
   * 容器大小（垂直的时候是宽度，水平的时候是高度），默认20
   */
  size?: number;
}

const styles = DynamicThemeStyleSheet.create({
  horizontalView: {
    position: 'relative',
    justifyContent: 'center',
  },
  verticalView: {
    position: 'relative',
    alignItems: 'center',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  verticalLine: {
    position: 'absolute',
    bottom: 0,
    top: 0,
  },
  text: {
    color: DynamicColor(Color.text),
    fontSize: 14,
  },
});

/**
 * 分割线组件
 */
export const Divider = ThemeWrapper(function(props: DividerProps) {

  const { type, orientation, text } = props;
  const color = props.color || Color.divider;
  const backgroundColor = props.backgroundColor || Color.transparent;
  const width = props.width || StyleSheet.hairlineWidth;
  const size = props.size || 20;
  const direction = selectStyleType<"flex-start"|"center"| "flex-end", DividerOrientationTypes>(orientation, 'center', {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  });

  return (
    type === 'vertical' ?
      <ColumnView style={{
        ...styles.verticalView,
        backgroundColor: ThemeSelector.color(backgroundColor),
        width: size,
        height: size,
      }} justify="center" align={direction}>
        <View style={{
          ...styles.verticalLine,
          backgroundColor: ThemeSelector.color(color),
          width: width,
          left: size / 2 - width / 2,
        }} />
      </ColumnView> :
      <RowView style={{
        ...styles.horizontalView,
        backgroundColor: ThemeSelector.color(backgroundColor),
        height: size,
      }} justify={direction} align="center">
        <View style={{
          ...styles.horizontalLine,
          backgroundColor: ThemeSelector.color(color),
          height: width,
          top: size / 2 - width / 2,
        }} />
        <Text style={[
          styles.text,
          { backgroundColor: ThemeSelector.color(backgroundColor) },
          props.textStyle,
        ]}>{text}</Text>
      </RowView>
  );
});
