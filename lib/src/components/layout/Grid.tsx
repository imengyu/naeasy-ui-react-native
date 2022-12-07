import React from 'react';
import CheckTools from '../../utils/CheckTools';
import ObjectUtils from '../../utils/ObjectUtils';
import { borderTop } from '../../utils/StyleTools';
import { ImageSourcePropType, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { Color, PressedColor } from '../../styles';
import { Icon, IconProp } from '../basic/Icon';
import { FlexView } from './FlexView';
import { RowView } from './RowView';
import { ThemeColor, ThemeWrapper } from '../../theme/Theme';
import { DynamicColor } from '../../theme/ThemeStyleSheet';

interface GridProp {
  /**
   * 自定义列数。默认一行展示四个格子。
   */
  columnNum?: number;
  /**
   * 设置 square 属性后，格子的高度会和宽度保持一致。
   */
  square?: boolean;
  /**
   * 格子内容排列的方向，可选值为 horizontal
   */
  direction?: 'vetical'|'horizontal',
  /**
   * 是否显示边框
   */
  border?: boolean;
  /**
   * 边框的宽度，默认是 StyleSheet.hairlineWidth
   */
  borderWidth?: number;
  /**
   * 边框颜色
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
   */
  titleColor?: ThemeColor,
  /**
   * 文字自定义样式
   */
  titleStyle?: TextStyle,
  /**
   * 背景颜色
   */
  backgroundColor?: ThemeColor,
  /**
   * 点击高亮颜色
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
   */
  imageAsTtileColor?: ThemeColor;
  /**
   * 图片位置显示文字的样式。
   */
  imageAsTtileStyle?: TextStyle;
  /**
   * 格子内容排列的方向，可选值为 horizontal
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
    padding: 8,
  },
  title: {
    fontSize: 14,
    color: DynamicColor(Color.text),
  },
  titleImage: {
    fontSize: 18,
    color: DynamicColor(Color.text),
  },
  icon: {
    marginHorizontal: 6,
  },
});

/**
 * 网格块按钮。包含一个图标和文字。
 */
export const GridItem = ThemeWrapper(function (props: GridItemProp) {

  const {
    icon,
    highlightColor,
    backgroundColor,
    iconColor,
    iconSize = 22,
    iconProps,
    imageAsTtile,
    imageAsTtileColor,
    imageAsTtileStyle,
    title,
    titleColor,
    titleStyle,
    direction,
    children,
    style,
    onPress,
  } = props;

  function renderIcon() {
    return <Icon key="icon"
      icon={icon}
      style={styles.icon}
      color={iconColor}
      size={iconSize}
      {...iconProps}
    />;
  }

  return (
    <TouchableHighlight
      underlayColor={ThemeSelector.color(highlightColor || PressedColor(Color.white))}
      onPress={onPress}
      style={[
        styles.itemView,
        style,
        { backgroundColor: ThemeSelector.color(backgroundColor) },
      ]}
    >
      <FlexView style={styles.itemView} center flex={1} direction={direction === 'horizontal' ? 'row' : 'column'}>
        {
          !CheckTools.isNullOrEmpty(imageAsTtile) ?
            <Text style={[
              styles.titleImage,
              { color: ThemeSelector.color(imageAsTtileColor, Color.text) },
              imageAsTtileStyle,
            ]} >{imageAsTtile}</Text> :
            (icon ? renderIcon() : <></>)
        }
        {
          !CheckTools.isNullOrEmpty(title) ?
            <Text style={[
              styles.title,
              { color: ThemeSelector.color(titleColor, Color.text) },
              direction === 'vetical' ? { marginTop: 6 } : {},
              titleStyle,
            ]} >{title}</Text> :
            <></>
        }
        { children as JSX.Element }
      </FlexView>
    </TouchableHighlight>
  );
});

/**
 * 宫格可以在水平方向上把页面分隔成等宽度的区块, 主要使用场景如：热门内容等。
 */
export const Grid = ThemeWrapper(function (props: GridProp) {

  const {
    columnNum = 4,
    square = false,
    border = true,
    borderWidth = StyleSheet.hairlineWidth,
    direction = 'vetical',
    children,
    itemProps,
  } = props;

  const borderColor = ThemeSelector.color(props.borderColor || Color.border);

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
              style.borderRightColor = borderColor;
              style.borderRightWidth = borderWidth;
            }
            style.borderBottomColor = borderColor;
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
    ...(border ? borderTop(borderWidth, 'solid', borderColor) : {}),
  };

  return (<RowView wrap style={hostStyle}>{renderChildren()}</RowView>);
});
