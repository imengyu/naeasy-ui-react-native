import React from 'react';
import { FlexAlignType, TouchableHighlight, View, ViewProps, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';
import ArrayUtils from '../../utils/ArrayUtils';

export interface FlexViewProp extends ViewProps {

  children?: JSX.Element|JSX.Element[]|undefined,

  position?: "absolute" | "relative" | undefined;
  /**
   * 方向
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /**
   * 子元素在主轴上的对齐方式
   */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  /**
   * 当前元素在主轴上的对齐方式
   */
  alignSelf?: FlexAlignType | "auto" | undefined,
  /**
   * 子元素在交叉轴上的对齐方式
   */
  align?: FlexAlignType | undefined;
  /**
   * 主轴与交叉轴是否居中
   */
  center?: boolean;
  /**
   * 弹性布局是否换行
   */
  wrap?: boolean;
  /**
   * 特殊样式
   */
  style?: ViewStyle|ViewStyle[],
  /**
   * flex参数
   */
  flex?: number,
  /**
   * 内边距参数。支持数字或者数组
   * * 如果是数字，则设置所有方向边距
   * * 两位数组 [vetical,horizontal]
   * * 四位数组 [top,right,down,left]
   */
  padding?: number|number[],
  /**
   * 外边距参数。支持数字或者数组
   * * 如果是数字，则设置所有方向边距
   * * 两位数组 [vetical,horizontal]
   * * 四位数组 [top,right,down,left]
   */
  margin?: number|number[],
  top?: number|undefined,
  right?: number|undefined,
  bottom?: number|undefined,
  left?: number|undefined,
  /**
   * 是否可以点击
   */
  touchable?: boolean;
  /**
   * 背景颜色
   */
  backgroundColor?: string;
  /**
   * 按下时的颜色，默认无颜色（使用 TouchableOpacity）
   * 设置了这个值，则使用 TouchableHighlight
   * 没有设置这个值，则使用 TouchableOpacity
   */
  pressedColor?: string;
  /**
   * 按下时的透明度（仅在pressedColor未设置时有效）
   */
  activeOpacity?: number;
  /**
   * 宽度
   */
  width?: string|number;
  /**
   * 高度
   */
  height?: string|number;
  /**
   * 点击事件
   */
  onPress?: () => void;
}

const muteProps = [
  'style', 'direction', 'padding', 'margin',
];

const styles = StyleSheet.create({
  ghostView: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

/**
 * Flex组件，用于一些布局中快速写容器
 */
export class FlexView extends React.PureComponent<FlexViewProp> {
  render(): React.ReactNode {

    const style = {
      flexDirection: this.props.direction,
      flex: this.props.flex,
      justifyContent: this.props.center ? 'center' : this.props.justify,
      alignItems: this.props.center ? 'center' : this.props.align,
      position: this.props.position,
      alignSelf: this.props.alignSelf,
      flexWrap: this.props.wrap ? 'wrap' : 'nowrap',
      backgroundColor: this.props.backgroundColor,
      width: this.props.width,
      height: this.props.height,
      ...(this.props.style || {}),
    } as ViewStyle;

    //内边距样式
    const padding = this.props.padding;
    if (typeof padding === 'number') {
      style.padding = padding;
    } else if (padding instanceof Array) {
      style.padding = undefined;
      if (padding.length === 2) {
        style.paddingVertical = padding[0];
        style.paddingHorizontal = padding[1];
      } else if (padding.length === 4) {
        style.paddingTop = padding[0];
        style.paddingRight = padding[1];
        style.paddingBottom = padding[2];
        style.paddingLeft = padding[3];
      }
    }

    //外边距样式
    const margin = this.props.margin;
    if (typeof margin === 'number') {
      style.margin = margin;
    } else if (margin instanceof Array) {
      style.margin = undefined;
      if (margin.length === 2) {
        style.marginVertical = margin[0];
        style.marginHorizontal = margin[1];
      } else if (margin.length === 4) {
        style.marginTop = margin[0];
        style.marginRight = margin[1];
        style.marginBottom = margin[2];
        style.marginLeft = margin[3];
      }
    }

    //绝对距样式
    if (typeof this.props.left === 'number')
      style.left = this.props.left;
    if (typeof this.props.right === 'number')
      style.right = this.props.right;
    if (typeof this.props.top === 'number')
      style.top = this.props.top;
    if (typeof this.props.bottom === 'number')
      style.bottom = this.props.bottom;

    //需要筛选一下不需要的属性，防止直接设置到子view上面报错
    const viewProps = {} as ViewProps;
    for (const key in this.props) {
      if (!ArrayUtils.contains(muteProps, key)) {
        (viewProps as { [index: string]: unknown })[key] = (this.props as { [index: string]: unknown })[key];
      }
    }

    return (
      this.props.touchable ?
        (
          this.props.pressedColor ?
          <TouchableHighlight underlayColor={this.props.pressedColor} style={[ { position: 'relative' }, style ]} onPress={this.props.onPress}>
            <View {...viewProps} style={styles.ghostView}  />
          </TouchableHighlight> :
          <TouchableOpacity style={style} onPress={this.props.onPress} activeOpacity={this.props.activeOpacity}>
            { this.props.children }
          </TouchableOpacity>
        ) :
        <View style={style} {...viewProps} />
    );
  }
}
