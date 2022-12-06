import React from 'react';
import CheckTools from '../../utils/CheckTools';
import { Text, TextStyle, View, StyleSheet } from 'react-native';
import { Color } from '../../styles/ColorStyles';
import { rpx } from '../../utils/StyleConsts';
import { ColumnView } from '../layout/ColumnView';
import { DynamicColor, useThemeStyles } from '../../theme/ThemeStyleSheet';
import { useThemeContext } from '../../theme/Theme';

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

const styles = StyleSheet.create({
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
 *
 * 主题变量：
 * |名称|类型|默认值|
 * |--|--|--|
 * |CellGroupTitleDark|`boolean`|`false`|
 * |CellGroupInset|`boolean`|`false`|
 * |CellGroupShowTopMargin|`boolean`|`true`|
 * |CellGroupShowBottomMargin|`boolean`|`false`|
 * |CellGroupTopMarginSize|`number`|`rpx(6)`|
 * |CellGroupDarkTitleBackgroundColor|`ColorInfoItem`|`Color.lightBorder`|
 * |CellGroupInsetPaddingHorizontal|`number`|`rpx(48)`|
 * |CellGroupPaddingHorizontal|`number`|`rpx(35)`|
 */
export function CellGroup(props: CellGroupProp) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    titleDark = themeContext.getThemeVar('CellGroupTitleDark', false),
    inset = themeContext.getThemeVar('CellGroupInset', false),
    title,
    titleStyle,
    showTopMargin = themeContext.getThemeVar('CellGroupShowTopMargin', true),
    showBottomMargin = themeContext.getThemeVar('CellGroupShowBottomMargin', false),
    showTopMarginSize = themeContext.getThemeVar('CellGroupTopMarginSize', rpx(6)),
    children,
  } = props;

  const CellGroupDarkTitleBackgroundColor = themeContext.getThemeColorVar('CellGroupDarkTitleBackgroundColor', Color.lightBorder);
  const CellGroupInsetPaddingHorizontal = themeContext.getThemeVar('CellGroupInsetPaddingHorizontal', rpx(48));
  const CellGroupPaddingHorizontal = themeContext.getThemeVar('CellGroupPaddingHorizontal', rpx(35));

  const titleSpeicalStyle = {
    ...themeStyles.title,
    backgroundColor: titleDark ? CellGroupDarkTitleBackgroundColor : undefined,
    paddingHorizontal: inset ? CellGroupInsetPaddingHorizontal : CellGroupPaddingHorizontal,
  } as TextStyle;

  return (
    <ColumnView style={themeStyles.view}>
      {
        CheckTools.isNullOrEmpty(title) ?
          (showTopMargin ? <View style={[titleStyle, { paddingTop: showTopMarginSize }]} /> : <></>) :
          <Text style={[titleSpeicalStyle, titleStyle]}>{title}</Text>
      }
      {
        inset ?
          (<View style={themeStyles.insetView}>{children as JSX.Element}</View>) :
          children as JSX.Element
      }
      {
        showBottomMargin ?
          <View style={[titleSpeicalStyle, titleStyle]} /> :
          <></>
      }
    </ColumnView>
  );
}
