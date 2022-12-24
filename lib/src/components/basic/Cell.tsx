import React, { useMemo } from 'react';
import CheckTools from '../../utils/CheckTools';
import { ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, TouchableHighlight, ViewStyle } from 'react-native';
import { Color, PressedColor } from '../../styles/ColorStyles';
import { rpx } from '../../utils/StyleConsts';
import { styleConfigPadding } from '../../utils/StyleTools';
import { Icon, IconProp } from './Icon';
import { ColumnView } from '../layout/ColumnView';
import { RowView } from '../layout/RowView';
import { DynamicColorVar, DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';
import { ThemeColor, useThemeContext } from '../../theme/Theme';

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
   * 设置右侧内容是否可以选择
   * @default false
   */
  valueSelectable?: boolean,
  /**
   * 标题下方的描述信息
   */
  label?: string,
  /**
   * 左侧图标名称或图片链接（http/https），等同于 Icon 组件的 icon
   */
  icon?: string|ImageSourcePropType,
  /**
   * 当使用图标时，左图标的附加属性
   */
  iconProps?: IconProp;
  /**
   * 当左侧图标未设置时，是否在左侧追加一个占位区域，以和其他单元格对齐
   * @default false
   */
  iconPlaceholder?: boolean,
  /**
   * 左侧图标区域的宽度
   * @default 20
   */
  iconWidth?: number|'auto',
  /**
   * 左侧图标的大小
   * @default 15
   */
  iconSize?: number,
  /**
   * 右侧图标的大小
   * @default 15
   */
  rightIconSize?: number,
  /**
   * 右侧图标名称或图片链接（http/https），等同于 Icon 组件的 icon
   */
  rightIcon?: string|ImageSourcePropType,
  /**
   * 当使用图标时，右图标的附加属性
   */
  rightIconProps?: IconProp;
  /**
   * 是否可以点击
   * @default false
   */
  touchable?: boolean,
  /**
   * 是否展示右侧箭头
   * @default false
   */
  showArrow?: boolean,
  /**
   * 是否使内容垂直居中
   * @default false
   */
  center?: boolean,
  /**
   * 大小
   * @default medium
   */
  size?:'small'|'medium'|'large',
  /**
   * 背景颜色
   * @default Color.white
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
   * 是否显示顶部边框
   * @default false
   */
  topBorder?: boolean;
  /**
   * 是否显示底部边框
   * @default true
   */
  bottomBorder?: boolean;
  /**
   * 按下的背景颜色
   * @default PressedColor(Color.white)
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
   * 强制控制按钮的边距。如果是数字，则设置所有方向边距;两位数组 [vetical,horizontal];四位数组 [top,right,down,left]
   */
  padding?: number|number[],

  /**
   * 点击事件
   */
  onPress?: () => void,
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: DynamicVar('CellPaddingHorizontal', rpx(20)),
  },
  innerView: {
    width: '100%',
  },
  leftView: {
    marginHorizontal: 10,
  },
  title: {
    color: DynamicColorVar('CellTitleColor', Color.text),
  },
  titleIcon: {
    color: DynamicColorVar('CellTitleColor', Color.black),
  },
  label: {
    color: DynamicColorVar('CellLabelColor', Color.textSecond),
  },
  value: {
    color: DynamicColorVar('CellValueColor', Color.textSecond),
    marginHorizontal: DynamicVar('CellValuePaddingHorizontal', rpx(10)),
  },
});

/**
 * 单元格组件, 为列表中的单个展示项。
 */
export function Cell(props: CellProp) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);
  const themeVars = themeContext.getThemeVars({
    CellBorderWidth: 1,
    CellFontSizeLarge: 17.5,
    CellFontSizeMedium: 14,
    CellFontSizeSmall: 11.5,
    CellIconSize: 15,
    CellIconWidth: 20,
    CellHeightLarge: rpx(125),
    CellHeightMedium: rpx(100),
    CellHeightSmall: rpx(80),
    CellPaddingLarge: rpx(15),
    CellPaddingMedium: rpx(10),
    CellPaddingSmall: rpx(7),
  });
  const themeColorVars = themeContext.getThemeColorVars({
    CellBorderColor: Color.cellBorder,
  });

  const {
    backgroundColor = themeContext.getThemeVar('CellBackground', Color.white),
    size = themeContext.getThemeVar('CellSize', 'medium'),
    padding = themeContext.getThemeVar('CellPadding', []),
    pressedColor = themeContext.getThemeVar('CellPressedColor', PressedColor(Color.white)),
    bottomBorder = themeContext.getThemeVar('CellBottomBorder', true),
    topBorder = themeContext.getThemeVar('CellTopBorder', false),
    center = true,
    title,
    label,
    value,
    icon,
    iconPlaceholder = false,
    iconWidth = themeVars.CellIconWidth,
    iconSize = themeVars.CellIconSize,
    iconStyle,
    iconProps,
    rightIcon,
    rightIconProps,
    rightIconStyle,
    rightIconSize = themeVars.CellIconSize,
    showArrow = false,
    valueSelectable = false,
    children,
    renderRight,
    renderRightPrepend,
    renderIcon,
    renderLeft,
    onPress,
  } = props;

  //外层样式
  const style = useMemo(() => {
    const styleObj = {
      backgroundColor: themeContext.resolveThemeColor(backgroundColor),
    } as ViewStyle;

    switch (size) {
      case 'large':
        styleObj.minHeight = themeVars.CellHeightLarge as number;
        styleObj.paddingVertical = themeVars.CellPaddingLarge as number;
        break;
      default:
      case 'medium':
        styleObj.minHeight = themeVars.CellHeightMedium as number;
        styleObj.paddingVertical = themeVars.CellPaddingMedium as number;
        break;
      case 'small':
        styleObj.minHeight = themeVars.CellHeightSmall as number;
        styleObj.paddingVertical = themeVars.CellPaddingSmall as number;
    }

    //内边距样式的强制设置
    styleConfigPadding(styleObj, padding);

    //边框设置
    if (topBorder) {
      styleObj.borderTopWidth = themeVars.CellBorderWidth;
      styleObj.borderTopColor = themeColorVars.CellBorderColor;
      styleObj.borderStyle = 'solid';
    }
    if (bottomBorder) {
      styleObj.borderBottomWidth = themeVars.CellBorderWidth;
      styleObj.borderBottomColor = themeColorVars.CellBorderColor;
      styleObj.borderStyle = 'solid';
    }

    return styleObj;
  }, [
    themeContext, themeVars, themeColorVars,
    backgroundColor, size, padding,
    bottomBorder, topBorder,
  ]);
  //文字样式
  const textStyle = useMemo(() => {
    switch (size) {
      case 'large':
        return { fontSize: themeVars.CellFontSizeLarge };
      default:
        return { fontSize: themeVars.CellFontSizeMedium };
      case 'small':
        return { fontSize: themeVars.CellFontSizeSmall };
    }
  }, [
    size, themeVars,
  ]);

  function renderLeftIcon() {
    return (
      <RowView key="leftIcon" width={(iconPlaceholder || icon) ? iconWidth : 0} justify="center">
        { renderIcon ? renderIcon(true, icon) : <></> }
        { renderLeftIconInner() }
      </RowView>
    );

    function renderLeftIconInner() {
      return <Icon
        key="leftIcon"
        icon={icon}
        {...iconProps}
        style={{...themeStyles.titleIcon, fontSize: iconSize, ...iconStyle as TextStyle }}
      />;
    }
  }
  function renderRightIcon() {
    if (renderIcon)
      return renderIcon(false, rightIcon);
    return <Icon
      key="rightIcon"
      icon={rightIcon}
      {...rightIconProps}
      style={{...themeStyles.titleIcon, fontSize: rightIconSize, ...rightIconStyle as TextStyle}}
    />;
  }
  function renderBase() {
    const arr = [];
    if (renderLeft)
      arr.push(<RowView key="left">{ renderLeft() }</RowView>);
    else {
      arr.push(
        <RowView key="left" center>
          {renderLeftIcon()}
          <ColumnView style={themeStyles.leftView}>
            { CheckTools.isNullOrEmpty(title) ? <></> : <Text style={[ themeStyles.title, textStyle ]}>{title}</Text> }
            { CheckTools.isNullOrEmpty(label) ? <></> : <Text style={[ themeStyles.label, textStyle ]}>{label}</Text> }
          </ColumnView>
        </RowView>
      );
    }
    if (renderRight)
      arr.push(<RowView key="right">{ renderRight() }</RowView>);
    else {
      arr.push(
        <RowView key="right" center>
          { renderRightPrepend ? renderRightPrepend() : <></> }
          {
            (!value || (typeof value === 'string' && value === '')) ?
              <></> :
              <Text key="value" selectable={valueSelectable} style={[ themeStyles.value, textStyle ]}>{'' + value}</Text>
          }
          {
            showArrow ?
              <Icon
                key="rightArrow"
                icon="arrow-right"
                size={textStyle.fontSize}
                color={(themeStyles.titleIcon as TextStyle).color as string}
              /> :
              <></>
          }
          { renderRightIcon() }
        </RowView>
      );
    }
    return arr.flat();
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={themeContext.resolveThemeColor(pressedColor)}
      style={[
        themeStyles.view,
        style,
        props.style,
      ]}
    >
      <RowView flex={1} align={center ? 'center' : 'flex-start'} justify="space-between">
        { children ? children : renderBase() }
      </RowView>
    </TouchableHighlight>
  );
}
