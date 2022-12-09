import ArrayUtils from '../../utils/ArrayUtils';
import React from 'react';
import { FlexAlignType, TouchableHighlight, View, ViewProps, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';
import { styleConfigMargin, styleConfigPadding } from '../../utils';
import { ThemeColor, useThemeContext } from '../../theme/Theme';

export interface FlexViewProp extends ViewProps {

  children?: React.ReactNode|undefined,

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
   * @default false
   */
  center?: boolean;
  /**
   * 弹性布局是否换行
   * @default false
   */
  wrap?: boolean;
  /**
   * 特殊样式
   */
  style?: ViewStyle|ViewStyle[]|undefined,
  /**
   * flex参数
   */
  flex?: number,
  /**
   * flexGrow参数
   */
  flexGrow?: number,
  /**
   * flexShrink参数
   */
  flexShrink?: number,
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
   * @default false
   */
  touchable?: boolean;
  /**
   * 背景颜色
   */
  backgroundColor?: ThemeColor;
  /**
   * 按下时的颜色，默认无颜色（使用 TouchableOpacity）
   * 设置了这个值，则使用 TouchableHighlight
   * 没有设置这个值，则使用 TouchableOpacity
   */
  pressedColor?: ThemeColor;
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
export function FlexView(props: FlexViewProp) {

  const themeContext = useThemeContext();

  const style = {
    flexDirection: props.direction,
    flex: props.flex,
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    justifyContent: props.center ? 'center' : props.justify,
    alignItems: props.center ? 'center' : props.align,
    position: props.position,
    alignSelf: props.alignSelf,
    flexWrap: props.wrap ? 'wrap' : 'nowrap',
    backgroundColor: themeContext.resolveThemeColor(props.backgroundColor),
    width: props.width,
    height: props.height,
    ...(props.style && !(props.style instanceof Array) ? props.style : {}),
  } as ViewStyle;


  //内边距样式
  styleConfigPadding(style, props.padding);
  //外边距样式
  styleConfigMargin(style, props.margin);

  //绝对距样式
  if (typeof props.left === 'number')
    style.left = props.left;
  if (typeof props.right === 'number')
    style.right = props.right;
  if (typeof props.top === 'number')
    style.top = props.top;
  if (typeof props.bottom === 'number')
    style.bottom = props.bottom;

  //需要筛选一下不需要的属性，防止直接设置到子view上面报错
  const viewProps = {} as ViewProps;
  for (const key in props) {
    if (!ArrayUtils.contains(muteProps, key)) {
      (viewProps as { [index: string]: unknown })[key] = (props as { [index: string]: unknown })[key];
    }
  }

  //处理传入style是数组的情况
  const finalStyle = props.style instanceof Array ? [ style ].concat(props.style) : style;

  return (
    props.touchable ?
      (
        props.pressedColor ?
        <TouchableHighlight
          underlayColor={themeContext.resolveThemeColor(props.pressedColor)}
          style={[ { position: 'relative' }, style ]}
          onPress={props.onPress}
        >
          <View {...viewProps} style={styles.ghostView}  />
        </TouchableHighlight> :
        <TouchableOpacity
          style={finalStyle}
          onPress={props.onPress}
          activeOpacity={props.activeOpacity}
        >
          { props.children }
        </TouchableOpacity>
      ) :
      <View {...viewProps} style={finalStyle}  />
  );
}
