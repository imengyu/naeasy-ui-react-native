import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { Color, PressedColor } from '../styles/ColorStyles';
import CheckTools from '../utils/CheckTools';
import ObjectUtils from '../utils/ObjectUtils';
import { borderTop } from '../utils/StyleTools';
import { Iconfont } from './Iconfont';
import { FlexView } from './layout/FlexView';
import { RowView } from './layout/RowView';

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
  borderColor?: string;

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
  titleColor?: string,
  /**
   * 背景颜色
   */
  backgroundColor?: string,
  /**
   * 点击高亮颜色
   */
  highlightColor?: string,
  /**
   * 图标名称或图片链接（http/https），等同于 IconFont 组件的 icon
   */
  icon?: string|ImageSourcePropType,
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
  iconColor?: string,
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
    padding: 10,
  },
  title: {
    fontSize: 15,
    color: '#333',
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
export function GridItem(props: GridItemProp) {

  function renderIcon() {
    if (typeof props.icon === 'string') {
      if (props.icon.startsWith('http'))
        return <Image key="leftIcon" style={{...styles.icon, ...props.iconStyle as ImageStyle}} source={{ uri: props.icon }} />;
      return <Iconfont key="leftIcon" icon={props.icon} style={{
        ...styles.icon,
        ...props.iconStyle as TextStyle,
        color: props.iconColor,
        fontSize: props.iconSize,
      }} color={(styles.title as TextStyle).color as string} />;
    }
    if (typeof props.icon === 'object')
      return <Image key="leftIcon" style={{ ...styles.icon, ...props.iconStyle as ImageStyle}} source={props.icon} />;
    return <View key="leftIcon" />;
  }

  return (
    <TouchableHighlight
      underlayColor={props.highlightColor || PressedColor.default}
      onPress={props.onPress}
      style={{
        ...styles.itemView,
        ...props.style,
      }}
    >
      <FlexView style={styles.itemView} center flex={1} direction={props.direction === 'horizontal' ? 'row' : 'column'}>
        { props.icon ? renderIcon() : <></> }
        { !CheckTools.isNullOrEmpty(props.title) ? <Text style={{ ...styles.title, color: props.titleColor }} >{props.title}</Text> : <></> }
        { props.children as JSX.Element }
      </FlexView>
    </TouchableHighlight>
  );
}

/**
 * 单元格组件, 为列表中的单个展示项。
 */
export function Grid(props: GridProp) {
  const borderColor = props.borderColor || Color.darkBorder;
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
          const style = ObjectUtils.clone(element.props.style || {}) as ViewStyle;
          const key = index;
          const backgroundColor = element.props.backgroundColor || Color.white;
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
            <GridItem { ...element.props }
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
}
