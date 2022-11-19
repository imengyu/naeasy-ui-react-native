import React from 'react';
import CheckTools from '../../utils/CheckTools';
import { Text, TextStyle, View } from 'react-native';
import { Color } from '../../styles/ColorStyles';
import { rpx } from '../../utils/StyleConsts';
import { ColumnView } from '../layout/ColumnView';
import { DynamicColor, DynamicThemeStyleSheet } from '../../styles';
import { ThemeWrapper } from '../../theme/Theme';

interface CellGroupProp {
  /**
   * 分组标题
   */
  title?: string,
  /**
   * 是否展示为圆角卡片风格
   */
  inset?: boolean,
  /**
   * 是否显示底部边距。默认否
   */
  showBottomMargin?: boolean,
  /**
   * 是否显示没有标题时顶部边距。默认是
   */
  showTopMargin?: boolean,
  /**
   * 是否显示没有标题时顶部边距大小。默认是 6rpx
   */
  showTopMarginSize?: number,
  /**
   * 标题的样式
   */
  titleStyle?: TextStyle,
  /**
   * 标题背景是否变暗
   */
  titleDark?:  boolean,
  children?: JSX.Element|JSX.Element[],
}

const styles = DynamicThemeStyleSheet.create({
  view: {
    width: '100%',
  },
  insetView: {
    marginHorizontal: rpx(30),
    marginVertical: 0,
    flexDirection: 'column',
    borderRadius: rpx(20),
    backgroundColor: DynamicColor(Color.white),
    overflow: 'hidden',
  },
  title: {
    color: DynamicColor(Color.textSecond),
    paddingVertical: rpx(12),
    paddingTop: rpx(24),
    paddingBottom: rpx(12),
  },
});

/**
 * 单元格分组组件
 */
export const CellGroup = ThemeWrapper(function (props: CellGroupProp) {
  const titleStyle = {
    ...styles.title,
    backgroundColor: props.titleDark ? Color.lightBorder : undefined,
    paddingHorizontal: props.inset ? rpx(48) : rpx(35),
    ...props.titleStyle,
  } as TextStyle;
  return (
    <ColumnView style={styles.view}>
      { CheckTools.isNullOrEmpty(props.title) ? (props.showTopMargin === false ? <></> : <View style={[titleStyle, { paddingTop: props.showTopMarginSize || rpx(6) }]} />) : <Text style={titleStyle}>{props.title}</Text> }
      { props.inset ? (<View style={styles.insetView}>{props.children as JSX.Element}</View>) : props.children as JSX.Element }
      { props.showBottomMargin ? <View style={titleStyle} /> : <></> }
    </ColumnView>
  );
});
