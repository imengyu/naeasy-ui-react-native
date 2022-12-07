import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { selectStyleType } from "../../utils/StyleTools";
import { RowView } from "../layout/RowView";
import { Color } from '../../styles';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicColorVar, DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';

type DividerOrientationTypes = 'left' | 'right' | 'center';

export interface DividerProps {
  /**
   * 是否虚线
   * @default false
   */
  dashed?: boolean;
  /**
   * 是否虚线 (dotted)
   * @default false
   */
  dotted?: boolean
  /**
   * 线的颜色，默认 gray
   * @default Color.gray
   */
  color?: ThemeColor;
  /**
   * 线的颜色
   * @default none
   */
  backgroundColor?: ThemeColor;
  /**
   * 分割线标题的位置，默认 center
   */
  orientation?: DividerOrientationTypes;
  /**
   * 水平还是垂直类型
   * @default 'horizontal'
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
   * 分割线宽度
   * @default 1
   */
  width?: number;
  /**
   * 容器大小（垂直的时候是宽度，水平的时候是高度）
   * @default 20
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
    color: DynamicColorVar('DividerTextColor', Color.text),
    fontSize: DynamicVar('DividerTextFontSize', 14),
    marginHorizontal: DynamicVar('DividerTextMarginHorizontal', 10),
  },
});

/**
 * 分割线组件
 */
export function Divider(props: DividerProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    type,
    orientation,
    text,
    size = themeContext.getThemeVar('DividerSize', 20),
    width = themeContext.getThemeVar('DividerWidth', 1),
    color = themeContext.getThemeVar('DividerColor', Color.divider),
    backgroundColor = themeContext.getThemeVar('DividerBackgroundColor', Color.transparent),
    dotted = themeContext.getThemeVar('DividerDotted', false),
    dashed = themeContext.getThemeVar('DividerDashed', false),
  } = props;

  const borderStyle = dashed ? 'dashed' : dotted ? 'dotted' : 'solid';
  const direction = selectStyleType<"flex-start"|"center"| "flex-end", DividerOrientationTypes>(orientation, 'center', {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  });

  //垂直线
  if (type === 'vertical') {
    return <View style={[
      themeStyles.verticalLine,
      {
        backgroundColor: themeContext.resolveThemeColor(backgroundColor),
        width: 0,
        height: size,
        marginLeft: size / 2  - width / 2,
        marginRight: size / 2  - width / 2,
        borderRightWidth: width,
        borderColor: themeContext.resolveThemeColor(color),
        borderStyle,
      },
    ]} />;
  }
  //水平线
  else {
    const lineStyle = [
      themeStyles.horizontalLine,
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
          themeStyles.horizontalView,
          {
            backgroundColor: themeContext.resolveThemeColor(backgroundColor),
            height: size,
          },
        ]}
        justify={direction}
        align="center"
      >
        { text && orientation !== 'left' ? <View style={lineStyle} /> : <></> }
        { text ? <Text style={[ themeStyles.text, props.textStyle ]}>{text}</Text> : <View style={lineStyle} /> }
        { text && orientation !== 'right' ? <View style={lineStyle} /> : <></> }
      </RowView>
    );
  }
}
