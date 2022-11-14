import React from 'react';
import CheckTools from '../utils/CheckTools';
import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, TouchableHighlight, View, ViewStyle } from 'react-native';
import { Color, PressedColor } from '../styles/ColorStyles';
import { rpx } from '../utils/StyleConsts';
import { borderBottom, borderTop, styleConfigPadding } from '../utils/StyleTools';
import { Icon, IconProp } from './Icon';
import { ColumnView } from './layout/ColumnView';
import { RowView } from './layout/RowView';
import { DynamicColor, DynamicThemeStyleSheet, ThemeColor, ThemeSelector } from '../styles';
import { ThemeWrapper } from '../theme/Theme';

//TODO: 优化代码样式

interface CellProp {
  /**
   * 左侧标题
   */
  title?: string,
  /**
   * 右侧内容
   */
  value?: string|number,
  /**
   * 设置右侧内容是否可以选择，默认否
   */
  valueSelectable?: boolean,
  /**
   * 标题下方的描述信息
   */
  label?: string,
  /**
   * 左侧图标名称或图片链接（http/https），等同于 IconFont 组件的 icon
   */
  icon?: string|ImageSourcePropType,
  /**
   * 当使用图标时，左图标的附加属性
   */
  iconProps?: IconProp;
  /**
   * 当左侧图标未设置时，是否在左侧追加一个占位区域，以和其他单元格对齐
   */
  iconPlaceholder?: boolean,
  /**
   * 左侧图标区域的宽度，默认是 20
   */
  iconWidth?: number|'auto',
  /**
   * 左侧图标的大小，默认是 15
   */
  iconSize?: number,
  /**
   * 右侧图标的大小，默认是 15
   */
  rightIconSize?: number,
  /**
   * 右侧图标名称或图片链接（http/https），等同于 IconFont 组件的 icon
   */
  rightIcon?: string|ImageSourcePropType,
  /**
   * 当使用图标时，右图标的附加属性
   */
  rightIconProps?: IconProp;
  /**
   * 是否可以点击
   */
  touchable?: boolean,
  /**
   * 是否展示右侧箭头
   */
  showArrow?: boolean,
  /**
   * 是否使内容垂直居中
   */
  center?: boolean,
  /**
   * 大小
   */
  size?:'small'|'medium'|'large',
  /**
   * 背景颜色
   */
  backgroundColor?: ThemeColor;
  /**
   * 自定义右侧渲染(会覆盖原有右侧内容)
   */
  renderRight?: () => JSX.Element|JSX.Element[],
  /**
   * 自定义右侧渲染(在原有内容之前，不会覆盖原有内容)
   */
  renderRightPrepend?: () => JSX.Element,
  /**
   * 自定义左侧渲染
   */
  renderLeft?: () => JSX.Element|JSX.Element[],
  /**
   * 自定义图标渲染
   */
  renderIcon?: (isLeft: boolean, name: string|ImageSourcePropType|undefined) => JSX.Element,
  /**
   * 自定义渲染子级
   */
  children?: JSX.Element,

  /**
   * 是否显示顶部边框，默认否
   */
  topBorder?: boolean;
  /**
   * 是否显示底部边框，默认是
   */
  bottomBorder?: boolean;
  /**
   * 按下的背景颜色
   */
  pressedColor?: ThemeColor,
  /**
   * 自定义样式
   */
  style?: ViewStyle,
  /**
   * 自定义左侧图标样式
   */
  iconStyle?: TextStyle|ImageStyle,
  /**
   * 自定义右侧图标样式
   */
  rightIconStyle?: TextStyle|ImageStyle,
  /**
   * 强制控制按钮的边距
   * * 如果是数字，则设置所有方向边距
   * * 两位数组 [vetical,horizontal]
   * * 四位数组 [top,right,down,left]
   */
  padding?: number|number[],

  /**
   * 点击事件
   */
  onPress?: () => void,
}

const styles = DynamicThemeStyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: rpx(20),
  },
  innerView: {
    width: '100%',
  },
  leftView: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 15,
    color: DynamicColor(Color.text),
  },
  titleIcon: {
    fontSize: 18,
    color: DynamicColor(Color.black),
  },
  label: {
    fontSize: 14,
    color: DynamicColor(Color.textSecond),
  },
  value: {
    fontSize: 14,
    color: DynamicColor(Color.textSecond),
    marginHorizontal: 10,
  },
});

/**
 * 单元格组件, 为列表中的单个展示项。
 */
 export const Cell = ThemeWrapper(function (props: CellProp) {
  function getStyle() {

    const style = {
      backgroundColor: ThemeSelector.color(props.backgroundColor || Color.white),
    } as ViewStyle;

    switch (props.size) {
      case 'large':
        style.minHeight = rpx(125);
        style.paddingVertical = rpx(15);
        break;
      default:
      case 'medium':
        style.minHeight = rpx(100);
        style.paddingVertical = rpx(10);
        break;
      case 'small':
        style.minHeight = rpx(80);
        style.paddingVertical = rpx(7);
    }

    //内边距样式的强制设置
    styleConfigPadding(style, props.padding);

    return style;
  }
  function getTextStyle() : TextStyle {
    switch (props.size) {
      case 'large': return { fontSize: 15 };
      case 'small': return { fontSize: 12 };
    }
    return { fontSize: 14 };
  }
  function getTitleStyle() : TextStyle {
    switch (props.size) {
      case 'large': return { fontSize: 17 };
      case 'small': return { fontSize: 13 };
    }
    return { fontSize: 15 };
  }
  function renderLeftIcon() {
    const leftIconWidth = props.iconWidth || 20;
    const iconSize = props.iconSize || 15;

    return (
      <RowView key="leftIcon" width={(props.iconPlaceholder || props.icon) ? leftIconWidth : 0} justify="center">
        { props.renderIcon ? props.renderIcon(true, props.icon) : <></> }
        { renderLeftIconInner() }
      </RowView>
    );

    function renderLeftIconInner() {
      if (typeof props.icon === 'string' && !CheckTools.isNullOrEmpty(props.icon)) {
        //图标
        if (props.icon.startsWith('http'))
          return <Image key="leftIcon" style={{width: iconSize, height: iconSize, ...props.iconStyle as ImageStyle}} source={{ uri: props.icon }} />;
        return <Icon key="leftIcon" icon={props.icon} {...props.iconProps} style={{...styles.titleIcon, fontSize: iconSize, ...props.iconStyle as TextStyle}} />;
      }
      if (typeof props.icon === 'object' || typeof props.icon === 'number')
        return <Image key="leftIcon" style={{ width: iconSize, height: iconSize, ...props.iconStyle as ImageStyle}} source={props.icon} />;
      return <View />;
    }
  }
  function renderRightIcon() {
    if (props.renderIcon)
      return props.renderIcon(false, props.rightIcon);
    const iconSize = props.rightIconSize || 15;
    if (typeof props.rightIcon === 'string') {
      if (props.rightIcon.startsWith('http'))
        return <Image key="rightIcon" style={{width: iconSize, height: iconSize, ...props.rightIconStyle as ImageStyle }} source={{ uri: props.rightIcon }} />;
      return <Icon key="rightIcon" icon={props.rightIcon} {...props.rightIconProps} style={{...styles.titleIcon, fontSize: iconSize, ...props.rightIconStyle as TextStyle}} />;
    }
    if (typeof props.rightIcon === 'object' || typeof props.rightIcon === 'number')
      return <Image style={{ width: iconSize, height: iconSize, ...props.rightIconStyle as ImageStyle }} key="rightIcon" source={props.rightIcon} />;
    return <View key="rightIcon" />;
  }
  function renderBase() {
    const arr = [];
    const textStyle = getTextStyle();
    if (props.renderLeft)
      arr.push(<RowView key="left">{ props.renderLeft() }</RowView>);
    else {
      arr.push(
        <RowView key="left" center>
          {renderLeftIcon()}
          <ColumnView style={styles.leftView}>
            <Text style={[
              styles.title,
              getTitleStyle(),
              { display: CheckTools.isNullOrEmpty(props.title) ? 'none' : 'flex' },
            ]}>{props.title}</Text>
            <Text style={[
              styles.label,
              textStyle,
              { display: CheckTools.isNullOrEmpty(props.label) ? 'none' : 'flex' },
            ]}>{props.label}</Text>
          </ColumnView>
        </RowView>
      );
    }
    if (props.renderRight)
      arr.push(<RowView key="right">{ props.renderRight() }</RowView>);
    else {
      arr.push(
        <RowView key="right" center>
          { props.renderRightPrepend ? props.renderRightPrepend() : <></> }
          { (!props.value || (typeof props.value === 'string' && props.value === '')) ? <></> : <Text key="value" selectable={props.valueSelectable === true} style={{...styles.value,...getTextStyle()}}>{'' + props.value}</Text> }
          {
            props.showArrow ?
              <Icon
                key="rightIcon"
                icon="arrow-right"
                size={(textStyle.fontSize || 16)}
                color={(textStyle.color || styles.titleIcon.color) as string}
              /> :
              renderRightIcon()
          }
        </RowView>
      );
    }
    return arr.flat();
  }

  const pressedColor = ThemeSelector.color(props.pressedColor || PressedColor(Color.white));

  return (
    <TouchableHighlight
      onPress={props.onPress}
      underlayColor={pressedColor}
      style={[
        styles.view,
        getStyle(),
        {
          ...(props.bottomBorder !== false ? borderBottom(1, 'solid', ThemeSelector.color(Color.divider)) : {}),
          ...(props.topBorder === true ? borderTop(1, 'solid', ThemeSelector.color(Color.divider)) : {}),
        },
        props.style,
      ]}
    >
      <RowView flex={1} align={props.center !== false ? 'center' : 'flex-start'} justify="space-between">
        { props.children ? props.children : renderBase() }
      </RowView>
    </TouchableHighlight>
  );
});
