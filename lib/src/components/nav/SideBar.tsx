import React from "react";
import CheckTools from "../../utils/CheckTools";
import { StyleSheet, Text, TextProps, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Badge, BadgeProps } from "../display/Badge";
import { Color } from "../../styles";
import { ThemeColor, useThemeContext } from "../../theme/Theme";
import { DynamicColorVar, DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";

//公共的SideBarItem
//==================================

export interface SideBarItemProps {
  /**
   * 标签名称，必填, 请保证不重复
   * @required true
   */
  name: string|number;
  /**
    * 标签文字
    */
  text?: string;
  /**
   * 是否可以点击
   * @default true
   */
  touchable?: boolean;
  /**
    * 标签文字样式
    */
  textStyle?: TextStyle;
  /**
    * 标签标记。为 0 或者 未定义时不显示，为 -1时显示圆点，为大于0的数时显示数字标记
    */
  badge?: number;
  /**
    * 自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props
    */
  badgeProps?: BadgeProps;
  /**
    * 自定义标签样式
    */
  style?: ViewStyle;
  /**
    * 自定义渲染文字回调
    * * selected ：表示当前标签是否选中
    * * textProps ：Text的属性，可以用于自定义图标渲染
    */
  renderText?: (selected: boolean, textProps: TextProps) => JSX.Element;
}

/**
 * 侧边导航的条目组件
 */
export function SideBarItem(_props: SideBarItemProps) {
  return (<></>);
}

//实际渲染的SideBarItem
//==================================

interface InternalSideBarItemProps extends SideBarItemProps {
  active?: boolean;
  activeBadgeStyle?: ViewStyle;
  activeColor?: ThemeColor;
  inactiveColor?: ThemeColor;
  activeStyle?: ViewStyle;
  inactiveStyle?: ViewStyle;
  onPress: () => void;
}
function InternalSideBarItem(props: InternalSideBarItemProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    activeColor = Color.primary,
    inactiveColor = Color.textSecond,
    active = false,
    touchable = true,
  } = props;

  const color = props.active ? themeContext.resolveThemeColor(activeColor) : themeContext.resolveThemeColor(inactiveColor);
  const textProps = {
    style: {
      ...themeStyles.sideText,
      color: color,
      ...props.textStyle,
    },
  };
  return (
    <TouchableOpacity activeOpacity={touchable ? 0.8 : 0.4} style={[themeStyles.sideItem, props.style, active ? props.activeStyle : props.inactiveStyle, touchable ? {} : { opacity: 0.4 } ]} onPress={touchable ? props.onPress : undefined}>
      { active ? <View style={[ themeStyles.sideActiveBadge, props.activeBadgeStyle ]} /> : <></> }
      <Badge content={props.badge === -1 ? '' : ((typeof props.badge === 'undefined' || props.badge === 0) ? 0 : props.badge)} offset={{ x: 3, y: 3 }} {...props.badgeProps}>
        {
          CheckTools.isNullOrEmpty(props.text) ?
            (props.renderText ? props.renderText(active, textProps) : <></>) :
            <Text { ...textProps }>{props.text}</Text>
        }
      </Badge>
    </TouchableOpacity>
  );
}

export interface SideBarProps {
  /**
   * 自定义外层样式
   */
  style?: ViewStyle;
  /**
    * 选中文字颜色
    * @default Color.primary
    */
  activeColor?: ThemeColor;
  /**
    * 选中时条目的样式
    */
  activeStyle?: ViewStyle;
  /**
    * 选中时条目左侧的标记的样式
    */
  activeBadgeStyle?: ViewStyle;
  /**
    * 未选中文字颜色
    * @default Color.textSecond
    */
  inactiveColor?: ThemeColor;
  /**
    * 未选中时条目的样式
    */
  inactiveStyle?: ViewStyle;
  /**
    * 标签文字样式
    */
  textStyle?: TextStyle;
  /**
    * 子级Tab
    */
  children: JSX.Element[];
  /**
    * 选中的条目，这是一个受控属性，请与 onSelectItem 配合。
    * @default ''
    */
  selectedItemName?: string|number,
  /**
    * 选中条目时发出此事件。
    */
  onSelectItem?: (name: string|number) => void;
  /**
    * 当点击已选中的 Tab 时发出此事件。
    */
  onClickItem?: (name: string|number) => void;
  /**
    * 可以用于自定义渲染背景图片
    */
  renderBackground?: () => JSX.Element;
}

/**
 * 侧边导航
 * 介绍：
 * 垂直展示的导航栏，用于在不同的内容区域之间进行切换。
 */
export function SideBar(props: SideBarProps) {

  const themeStyles = useThemeStyles(styles);

  const selectedItemName = CheckTools.returnDefinedValueOrdefault(props.selectedItemName, '');
  const activeStyle = props.activeStyle || themeStyles.activeStyle;
  const inactiveStyle = props.inactiveStyle || themeStyles.inactiveStyle;

  function renderItems() {
    const arr = [] as JSX.Element[];
    props.children.forEach(element => {
      const name = element.props.name as string|number;
      arr.push(
        <InternalSideBarItem
          { ...element.props }
          name={name}
          key={name}
          active={selectedItemName === name}
          activeColor={element.props.activeColor || props.activeColor}
          inactiveColor={element.props.inactiveColor || props.inactiveColor}
          activeStyle={element.props.activeStyle || activeStyle}
          inactiveStyle={element.props.inactiveStyle || inactiveStyle}
          textStyle={element.props.textStyle || props.textStyle}
          activeBadgeStyle={props.activeBadgeStyle}
          style={element.props.style || props.textStyle}
          onPress={() => {
            if (selectedItemName !== name) {
              props.onSelectItem && props.onSelectItem(name);
            } else {
              props.onClickItem && props.onClickItem(name);
            }
          }}
        />
      );
    });
    return arr;
  }

  return (
    <View style={[ themeStyles.container, props.style ]}>
      { props.renderBackground && props.renderBackground() }
      { renderItems() }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  sideItem: {
    position: 'relative',
    paddingVertical: DynamicVar('SideBarItemPaddingVertical', 18),
    paddingHorizontal: DynamicVar('SideBarItemPaddingHorizontal', 15),
    alignSelf: 'stretch',
  },
  sideActiveBadge: {
    backgroundColor: DynamicColorVar('SideBarItemActiveBadgeBackgroundColor', Color.primary),
    position: 'absolute',
    left: DynamicVar('SideBarItemActiveBadgeLeft', 0),
    top: DynamicVar('SideBarItemActiveBadgeTop', '100%'),
    right: DynamicVar('SideBarItemActiveBadgeRight', undefined),
    bottom: DynamicVar('SideBarItemActiveBadgeBottom', undefined),
    height: DynamicVar('SideBarItemActiveBadgeHeight', 15),
    width: DynamicVar('SideBarItemActiveBadgeWidth', 4),
  },
  sideText: {
    fontSize: DynamicVar('SideBarItemTextFontSize', 14),
  },
  activeStyle: {
    backgroundColor: DynamicColorVar('SideBarItemActiveBackgroundColor', Color.white),
  },
  inactiveStyle: {
    backgroundColor: DynamicColorVar('SideBarItemInactiveBackgroundColor', Color.light),
  },
});
