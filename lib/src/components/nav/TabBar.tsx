import React from "react";
import CheckTools from "../../utils/CheckTools";
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Badge, BadgeProps } from "../display/Badge";
import { Color } from "../../styles";
import { Icon, IconProp } from "../basic/Icon";
import { ThemeColor, useThemeContext } from "../../theme/Theme";
import { DynamicColorVar, DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";

//公用的TabBarItem
//==================================

export interface TabBarItemProps {
  /**
   * 标签名称，必填
   * @required true
   */
  name: string;
  /**
   * 标签图标
   */
  icon?: string;
  /**
   * 图标透传样式
   */
  iconProps?: IconProp;
  /**
   * 标签图标大小
   * @default 23
   */
  iconSize?: number;
  /**
   * 标签文字
   */
  text?: string;
  /**
   * 标签文字样式
   */
  textStyle?: TextStyle;
  /**
   * 标签标记。为 0 或者 未定义时不显示，为 -1时显示圆点，为大于0的数时显示数字标记
   */
  badge?: number;
  /**
   * 指定当前标签是否凸起。凸起状态下可以使用 renderIcon 回调渲染自定义图片，图片不会把Tabbar撑开而是会溢出，可以实现凸起按钮的效果。
   * @default false
   */
  hump?: boolean;
  /**
   * 指定当前标签凸起的高度，数组第0位是选中时的凸起高度，第1位是未选中时的凸起高度。
   */
  humpHeight?: number[];
  /**
   * 自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props
   */
  badgeProps?: BadgeProps;
  /**
   * 是否懒加载当前标签，仅在标签模式中有效
   * @default false
   */
  lazy?: boolean;
  /**
   * 自定义标签样式
   */
  style?: ViewStyle;
  /**
   * 自定义渲染图标回调
   * * selected ：表示当前标签是否选中
   * * iconProps ：Icon的属性，可以用于自定义图标渲染
   */
  renderIcon?: (selected: boolean, iconProps: any) => JSX.Element;
}
/**
 * TabBar 组件的子条目，用于表示一个标签按钮。
 */
export function TabBarItem(_props: TabBarItemProps) {
  return (<></>);
}

//实际渲染的TabBarItem
//==================================

interface InternalTabBarItemProps extends TabBarItemProps {
  active?: boolean;
  activeColor?: ThemeColor;
  inactiveColor?: ThemeColor;
  onPress?: () => void;
}
function InternalTabBarItem(props: InternalTabBarItemProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    activeColor = Color.primary,
    inactiveColor = Color.textSecond,
    active = false,
    icon,
    iconSize = 23,
    humpHeight = [ iconSize, iconSize ],
  } = props;

  const color = themeContext.resolveThemeColor(active ? activeColor : inactiveColor);
  const iconProps = {
    ...props.iconProps,
    icon: icon,
    size: iconSize,
    color: color,
  };
  return (
    <TouchableOpacity activeOpacity={0.9} style={[themeStyles.tabItem, props.style ]} onPress={props.onPress}>
      <Badge containerStyle={{
        height: props.hump ? iconProps.size : undefined,
        position: props.hump ? 'absolute' : undefined,
        bottom: props.hump ? (props.active ? humpHeight[0] : humpHeight[1]) : undefined,
      }} content={props.badge === -1 ? '' : ((typeof props.badge === 'undefined' || props.badge === 0) ? 0 : props.badge)} offset={{ x: 3, y: 0 }} {...props.badgeProps}>
        { props.renderIcon ? props.renderIcon(props.active === true, iconProps) : <Icon { ...iconProps } /> }
      </Badge>
      { CheckTools.isNullOrEmpty(props.text) ? <></> : <Text style={[ themeStyles.tabText, { color: color }, props.textStyle ]}>{props.text}</Text> }
    </TouchableOpacity>
  );
}

//TabBar
//==================================

export interface TabBarProps {
  /**
   * 自定义外层样式
   */
  style?: ViewStyle;
  /**
   * 选中颜色
   */
  activeColor?: ThemeColor;
  /**
   * 未选中样式
   */
  inactiveColor?: ThemeColor;
  /**
   * 标签文字样式
   */
  textStyle?: TextStyle;
  /**
   * 子级Tab
   */
  children: JSX.Element[];
  /**
   * 选中的，这是一个受控属性，请与 onSelectTab 配合。
   * @default ''
   */
  selectedTabName?: string,
  /**
   * 选中 Tab 时发出此事件。
   */
  onSelectTab?: (name: string) => void;
  /**
   * 当点击已选中的 Tab 时发出此事件。
   */
  onClickTab?: (name: string) => void;
  /**
   * 可以用于自定义渲染背景图片
   */
  renderBackground?: () => JSX.Element;
}
/**
 * 底部导航栏组件，用于在不同页面之间进行切换。
 */
export function TabBar(props: TabBarProps) {

  const selectedTabName = props.selectedTabName || '';
  const themeStyles = useThemeStyles(styles);

  function renderItems() {
    const arr = [] as JSX.Element[];
    const itemWidth = `${100 / props.children.length}%`;
    props.children.forEach(element => {
      const name = element.props.name as string;
      arr.push(
        <InternalTabBarItem
          { ...element.props }
          name={name}
          key={name}
          active={selectedTabName === name}
          activeColor={element.props.activeColor || props.activeColor}
          inactiveColor={element.props.inactiveColor || props.inactiveColor}
          textStyle={element.props.textStyle || props.textStyle}
          onPress={() => {
            if (selectedTabName !== name) {
              props.onSelectTab && props.onSelectTab(name);
            } else {
              props.onClickTab && props.onClickTab(name);
            }
          }}
          style={{
            ...element.props.style,
            flexBasis: itemWidth,
            width: itemWidth,
          }}
        />
      );
    });
    return arr;
  }

  return (
    <View style={[ themeStyles.tabBar, props.style ]}>
      { props.renderBackground && props.renderBackground() }
      { renderItems() }
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'relative',
    backgroundColor: DynamicColorVar('TabBarBackgroundColor', Color.white),
    borderTopWidth: DynamicVar('TabBarBorderTopWidth', 1),
    borderTopColor: DynamicColorVar('TabBarBorderTopColor', Color.border),
    paddingVertical: DynamicVar('TabBarPaddingVertical', 10),
    paddingHorizontal: DynamicVar('TabBarPaddingHorizontal', 0),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: DynamicVar('TabBarItemTextFontSize', 13),
    marginTop: DynamicVar('TabBarItemTextMarginTop', 5),
  },
});

