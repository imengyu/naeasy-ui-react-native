import React from 'react';
import CheckTools from '../../utils/CheckTools';
import ObjectUtils from '../../utils/ObjectUtils';
import { borderTop } from '../../utils/StyleTools';
import { Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { ThemeSelector, Color, ThemeColor, PressedColor } from '../../styles';
import { Icon, IconProp } from '../basic/Icon';
import { FlexView } from './FlexView';
import { RowView } from './RowView';
import { DynamicColor, DynamicThemeStyleSheet } from '../../styles/DynamicThemeStyleSheet';
import { ThemeWrapper } from '../../theme/Theme';

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
   * 背景颜色
   */
  backgroundColor?: ThemeColor,
  /**
   * 点击高亮颜色
   */
  highlightColor?: ThemeColor,
  /**
   * 图标名称或图片链接（http/https），等同于 IconFont 组件的 icon
   */
  icon?: string|ImageSourcePropType,
  /**
   * 如果填写字段，则在图片位置显示文字。同时icon不生效。
   */
  imageAsTtile?: string;
  /**
   * 图片位置显示文字的颜色。
   */
  imageAsTtileColor?: ThemeColor;
  /**
   * 图片位置显示文字的大小，默认是18。
   */
  imageAsTtileStyle?: TextStyle;
  /**
   * 格子内容排列的方向，可选值为 horizontal
   */
  direction?: 'vetical'|'horizontal',
  /**
   * 图标自定义样式
   */
  iconStyle?: ImageStyle,
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
   * 点击事件
   */
  onPress?: () => void,
  /**
   * 自定义样式
   */
  style?: ViewStyle,

  children?: JSX.Element|JSX.Element[],
}

const styles = DynamicThemeStyleSheet.create({
  itemView: {
    padding: 8,
  },
  title: {
    fontSize: 13,
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
 *
 * ![示意图](https://imengyu.top/assets/images/cui/cui-block-button.png)
 */
export const GridItem = ThemeWrapper(function (props: GridItemProp) {

  function renderIcon() {
    if (typeof props.icon === 'object' || typeof props.icon === 'number')
      return <Image key="leftIcon" style={[ styles.icon, props.iconStyle as ImageStyle ]} resizeMode="contain" source={props.icon} />;
    if (typeof props.icon === 'string') {
      if (props.icon.startsWith('http'))
        return <Image key="leftIcon" style={[ styles.icon, props.iconStyle as ImageStyle ]} source={{ uri: props.icon }} />;
      return <Icon key="leftIcon" icon={props.icon} {...props.iconProps} style={{
        ...styles.icon,
        ...props.iconStyle as TextStyle,
        color: ThemeSelector.color(props.iconColor, Color.black),
        fontSize: props.iconSize,
      }} color={(styles.title as TextStyle).color as string} />;
    }
    return <View key="leftIcon" />;
  }

  return (
    <TouchableHighlight
      underlayColor={ThemeSelector.color(props.highlightColor || PressedColor(Color.white))}
      onPress={props.onPress}
      style={[
        styles.itemView,
        props.style,
      ]}
    >
      <FlexView style={styles.itemView} center flex={1} direction={props.direction === 'horizontal' ? 'row' : 'column'}>
        {
          !CheckTools.isNullOrEmpty(props.imageAsTtile) ?
            <Text style={[ styles.titleImage, { color: ThemeSelector.color(props.imageAsTtileColor, Color.text) }, props.imageAsTtileStyle ]} >{props.imageAsTtile}</Text> :
            (props.icon ? renderIcon() : <></>)
        }
        {
          !CheckTools.isNullOrEmpty(props.title) ?
            <Text style={[ styles.title, { color: ThemeSelector.color(props.titleColor, Color.text) } ]} >{props.title}</Text> :
            <></>
        }
        { props.children as JSX.Element }
      </FlexView>
    </TouchableHighlight>
  );
});

/**
 * 单元格组件, 为列表中的单个展示项。
 */
export const Grid = ThemeWrapper(function (props: GridProp) {
  const borderColor = ThemeSelector.color(props.borderColor || Color.border);
  const borderWidth = props.borderWidth || StyleSheet.hairlineWidth;

  function renderChildren() {
    const columnNum = props.columnNum || 4;
    const square = props.square === true;
    const border = props.border !== false;
    const direction = props.direction || 'vetical';

    const arr = [] as JSX.Element[];
    if (props.children) {

      const flexBasis = (100 / columnNum);
      const len = props.children.length;

      for (let index = 0; index < len; index++) {
        const element = props.children[index];

        //对 GridItem 进行处理
        if (element) {
          //添加样式
          const style = ObjectUtils.clone({
            ...(props.itemProps?.style || {}),
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
    ...(props.border ? borderTop(borderWidth, 'solid', borderColor) : {}),
  };

  return (<RowView wrap style={hostStyle}>{renderChildren()}</RowView>);
});
