import React from 'react';
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { selectStyleType } from "../../utils/StyleTools";
import { RowView } from "../layout/RowView";
import { Color, ThemeColor, DynamicColor, StyleSheet, ThemeSelector } from '../../styles';
import { ThemeWrapper } from '../../theme/Theme';

type DividerOrientationTypes = 'left' | 'right' | 'center';

export interface DividerProps {
  /**
   * 是否虚线，默认 false
   */
  dashed?: boolean;
  /**
   * 是否虚线，默认 false
   */
  dotted?: boolean
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

const styles = StyleSheet.create({
  horizontalView: {
    position: 'relative',
    justifyContent: 'center',
  },
  verticalView: {
    position: 'relative',
    alignItems: 'center',
  },
  horizontalLine: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
  },
  verticalLine: {
    position: 'relative',
  },
  text: {
    flex: 0,
    flexShrink: 0,
    color: DynamicColor(Color.text),
    fontSize: 14,
    marginHorizontal: 10,
  },
});

/**
 * 分割线组件
 */
export const Divider = ThemeWrapper(function(props: DividerProps) {

  const {
    type,
    orientation,
    text,
    size = 20,
    width = 1,
    dotted = false,
    dashed = false,
  } = props;

  const borderStyle = dashed ? 'dashed' : dotted ? 'dotted' : 'solid';
  const color = ThemeSelector.color(props.color || Color.divider);
  const backgroundColor = ThemeSelector.color(props.backgroundColor || Color.transparent);
  const direction = selectStyleType<"flex-start"|"center"| "flex-end", DividerOrientationTypes>(orientation, 'center', {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  });

  //垂直线
  if (type === 'vertical') {
    return <View style={[
      styles.verticalLine,
      {
        backgroundColor,
        width: 0,
        height: size,
        marginLeft: size / 2  - width / 2,
        marginRight: size / 2  - width / 2,
        borderRightWidth: width,
        borderColor: color,
        borderStyle,
      },
    ]} />;
  }


  //水平线
  else {
    const lineStyle = [
      styles.horizontalLine,
      {
        backgroundColor,
        height: 0,
        marginTop: size / 2  - width / 2,
        marginBottom: size / 2  - width / 2,
        borderBottomWidth: width,
        borderColor: color,
        borderStyle,
      },
    ] as ViewStyle[];
    return (
      <RowView
        style={[
          styles.horizontalView,
          {
            backgroundColor,
            height: size,
          },
        ]}
        justify={direction}
        align="center"
      >
        { text && orientation !== 'left' ? <View style={lineStyle} /> : <></> }
        { text ? <Text style={[ styles.text, { backgroundColor }, props.textStyle ]}>{text}</Text> : <View style={lineStyle} /> }
        { text && orientation !== 'right' ? <View style={lineStyle} /> : <></> }
      </RowView>
    );
  }
});
