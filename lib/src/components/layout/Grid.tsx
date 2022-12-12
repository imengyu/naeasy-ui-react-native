import React from 'react';
import CheckTools from '../../utils/CheckTools';
import ObjectUtils from '../../utils/ObjectUtils';
import { ImageSourcePropType, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { Color, PressedColor } from '../../styles';
import { Icon, IconProp } from '../basic/Icon';
import { FlexView } from './FlexView';
import { RowView } from './RowView';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';

interface GridProp {
  /**
   * 自定义列数
   * @default 4
   */
  columnNum?: number;
  /**
   * 设置 square 属性后，格子的高度会和宽度保持一致。
   * @default false
   */
  square?: boolean;
  /**
   * 格子内容排列的方向，可选值为 horizontal
   * @default 'vetical'
   */
  direction?: 'vetical'|'horizontal',
  /**
   * 是否显示边框
   * @default true
   */
  border?: boolean;
  /**
   * 边框的宽度
   * @default StyleSheet.hairlineWidth
   */
  borderWidth?: number;
  /**
   * 边框颜色
   * @default Color.border
   */
  borderColor?: ThemeColor;
  /**
   * 统一设置条目的自定义属性
   */
  itemProps?: GridItemProp;

  children?: JSX.Element[],
}
interface GridItemProp {
  /**
   * 标题
   */
  title?: string,
  /**
   * 文字颜色
   * @default Color.black
   */
  titleColor?: ThemeColor,
  /**
   * 文字自定义样式
   */
  titleStyle?: TextStyle,
  /**
   * 背景颜色
   * @default Color.white
   */
  backgroundColor?: ThemeColor,
  /**
   * 点击高亮颜色
   * @default PressedColor(Color.white)
   */
  highlightColor?: ThemeColor,
  /**
   * 图标名称或图片链接（http/https），等同于 Icon 组件的 icon
   */
  icon?: string|ImageSourcePropType,
  /**
   * 图标大小
   */
  iconSize?: number,
  /**
   * 图标颜色
   * @default Color.text
   */
  iconColor?: ThemeColor,
  /**
   * 图标自定义属性
   */
  iconProps?: IconProp;
  /**
   * 如果填写字段，则在图片位置显示文字。同时icon不生效。
   */
  imageAsTtile?: string;
  /**
   * 图片位置显示文字的颜色。
   * @default Color.text
   */
  imageAsTtileColor?: ThemeColor;
  /**
   * 图片位置显示文字的样式。
   */
  imageAsTtileStyle?: TextStyle;
  /**
   * 格子内容排列的方向，可选值为 horizontal
   * @default 'vetical'
   */
  direction?: 'vetical'|'horizontal',
  /**
   * 点击事件
   */
  onPress?: () => void,
  /**
   * 自定义样式
   */
  style?: ViewStyle,

  children?: JSX.Element|JSX.Element[],
}

const styles = StyleSheet.create({
  itemView: {
    paddingVertical: DynamicVar('GridItemPaddingVertical', 8),
    paddingHorizontal: DynamicVar('GridItemPaddingHorizontal', 8),
  },
  title: {
    fontSize: DynamicVar('GridItemTitleFontSize', 14),
  },
  titleImage: {
    fontSize: DynamicVar('GridItemImageAsTtileFontSize', 18),
  },
  icon: {
    marginHorizontal: DynamicVar('GridItemIconMarginHorizontal', 6),
    marginVertical: DynamicVar('GridItemIconMarginVertical', 0),
  },
});

/**
 * 网格块按钮。包含一个图标和文字。
 */
export function GridItem(props: GridItemProp) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    icon,
    highlightColor = themeContext.getThemeVar('GridItemHighlightColor', PressedColor(Color.white)),
    backgroundColor = themeContext.getThemeVar('GridItemBackgroundColor', Color.white),
    iconColor = themeContext.getThemeVar('GridItemIconColor', Color.text),
    iconSize = themeContext.getThemeVar('GridItemIconSize', 22),
    iconProps,
    imageAsTtile = themeContext.getThemeVar('GridItemImageAsTtile', false),
    imageAsTtileColor = themeContext.getThemeVar('GridItemImageAsTtileColor', Color.text),
    imageAsTtileStyle,
    title,
    titleColor = themeContext.getThemeVar('GridItemTitleColor', Color.black),
    titleStyle,
    direction = themeContext.getThemeVar('GridItemDirection', 'vetical'),
    children,
    style,
    onPress,
  } = props;

  function renderIcon() {
    return <Icon key="icon"
      icon={icon}
      style={themeStyles.icon}
      color={iconColor}
      size={iconSize}
      {...iconProps}
    />;
  }

  return (
    <TouchableHighlight
      underlayColor={themeContext.resolveThemeColor(highlightColor)}
      onPress={onPress}
      style={[
        themeStyles.itemView,
        style,
        { backgroundColor: themeContext.resolveThemeColor(backgroundColor) },
      ]}
    >
      <FlexView style={themeStyles.itemView} center flex={1} direction={direction === 'horizontal' ? 'row' : 'column'}>
        {
          !CheckTools.isNullOrEmpty(imageAsTtile) ?
            <Text style={[
              themeStyles.titleImage,
              { color: themeContext.resolveThemeColor(imageAsTtileColor) },
              imageAsTtileStyle,
            ]} >{imageAsTtile}</Text> :
            (icon ? renderIcon() : <></>)
        }
        {
          !CheckTools.isNullOrEmpty(title) ?
            <Text style={[
              themeStyles.title,
              { color: themeContext.resolveThemeColor(titleColor) },
              direction === 'vetical' ? { marginTop: 6 } : {},
              titleStyle,
            ]} >{title}</Text> :
            <></>
        }
        { children as JSX.Element }
      </FlexView>
    </TouchableHighlight>
  );
}

/**
 * 宫格可以在水平方向上把页面分隔成等宽度的区块, 主要使用场景如：热门内容等。
 */
export function Grid(props: GridProp) {

  const themeContext = useThemeContext();

  const {
    columnNum = themeContext.getThemeVar('GridColumnNum', 4),
    square = themeContext.getThemeVar('GridSquare', false),
    border = themeContext.getThemeVar('GridBorder', true),
    borderColor = themeContext.getThemeVar('GridBorderColor', Color.border),
    borderWidth = themeContext.getThemeVar('GridBorderWidth', StyleSheet.hairlineWidth),
    direction = themeContext.getThemeVar('GridDirection', 'vetical'),
    children,
    itemProps,
  } = props;

  const borderColorValue = themeContext.resolveThemeColor(borderColor);

  function renderChildren() {

    const arr = [] as JSX.Element[];
    if (children) {

      const flexBasis = (100 / columnNum);
      const len = children.length;

      for (let index = 0; index < len; index++) {
        const element = children[index];

        //对 GridItem 进行处理
        if (element) {
          //添加样式
          const style = ObjectUtils.clone({
            ...(itemProps?.style || {}),
            ...element.props.style,
          }) as ViewStyle;
          const key = index;
          const backgroundColor = element.props.backgroundColor || style.backgroundColor || Color.white;
          const directionInner = element.props.direction || direction;

          style.flexBasis = `${flexBasis}%`;
          style.backgroundColor = backgroundColor;
          if (square) {
            style.aspectRatio = 1;
          }
          if (border) {
            if ((index + 1) % columnNum !== 0) {
              style.borderRightColor = borderColorValue;
              style.borderRightWidth = borderWidth;
            }
            style.borderBottomColor = borderColorValue;
            style.borderBottomWidth = borderWidth;
          }

          arr.push(
            <GridItem
              { ...props.itemProps }
              { ...element.props }
              direction={directionInner}
              key={element.key || key}
              style={style} >
              { element.props.children }
            </GridItem>
          );
        }
      }
    }
    return arr;
  }

  const hostStyle = {
    borderTopWidth: border ? borderWidth : 0,
    borderColor: borderColorValue,
  } as ViewStyle;

  return (<RowView wrap style={hostStyle}>{renderChildren()}</RowView>);
}
