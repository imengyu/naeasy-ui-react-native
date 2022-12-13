import React from "react";
import { StyleSheet, View, TextStyle, GestureResponderEvent } from "react-native";
import { Color } from "../../styles";
import { ThemeColor, useThemeContext } from "../../theme/Theme";
import { useThemeStyles } from "../../theme/ThemeStyleSheet";
import { Icon, IconProp } from "../basic/Icon";

export interface RateProps {
  /**
   * 评星组件参数值
   * @default 0
   */
  value?: number;
  /**
   * 评星组件变化回调
   */
  onValueChange?: (value: number) => void;

  /**
   * 星星的数量
   * @default 5
   */
  count?: number;
  /**
   * 星星未激活自定义样式
   */
  starStyle?: IconProp;
  /**
   * 星星激活自定义样式
   */
  starActiveStyle?: IconProp;
  /**
   * 星星激活的颜色
   * @default Color.warning
   */
  starActiveColor?: ThemeColor;
  /**
   * 星星未激活的颜色
   * @default Color.grey
   */
  starColor?: ThemeColor;
  /**
   * 星星禁用的颜色
   * @default Color.grey
   */
  starDisableColor?: ThemeColor;
  /**
   * 选中时的图标
   * @default 'favorite-filling'
   */
  icon?: string;
  /**
   * 未选中时的图标
   * @default 'favorite'
   */
  voidIcon?: string;
  /**
   * 星星之间的间距
   * @default 3
   */
  space?: number;
  /**
   * 用户是否可以选择出半星
   * @default false
   */
  half?: boolean;

  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 评星组件是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 评星组件大小
   * @default 24
   */
  size?: number;
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  activeHalf: {
    position: 'relative',
  },
});

/**
 * 评星组件组件。用于对事物进行评级操作。
 */
export function Rate(props: RateProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    size = 24,
    value = 0,
    count = 5,
    space = 3,
    disabled = false,
    half = false,
    icon = 'favorite-filling',
    voidIcon = 'favorite',
    starColor = Color.grey,
    starActiveColor = Color.warning,
    starDisableColor = Color.grey,
  } = themeContext.resolveThemeProps(props, {
    size: 'RateSize',
    icon: 'RateIcon',
    space: 'RateSpace',
    voidIcon: 'RateVoidIcon',
    starColor: 'RateColor',
    starActiveColor: 'RateActiveColor',
    starDisableColor: 'RateDisableColor',
  });

  const starActiveStyle = {
    marginRight: space,
    ...props.starActiveStyle,
  } as TextStyle;
  const starActiveHalfStyle = {
    ...props.starActiveStyle,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '50%',
    overflow: 'hidden',
    zIndex: 1,
  } as TextStyle;
  const starDeactiveStyle = {
    marginRight: space,
    ...props.starStyle,
  } as TextStyle;

  const width = (size + space) * count;

  function onResponderMove(e: GestureResponderEvent) {
    const x = e.nativeEvent.locationX;
    let v = x / width * count;

    if (half) {
      let demcial = v - Math.floor(v);
      if (demcial < 0.2) demcial = 0;
      else if (demcial > 0.8) demcial = 1;
      else demcial = 0.5;

      v = Math.floor(v) + demcial;
    }
    else
      v = Math.ceil(v);

    if (v !== value)
      props.onValueChange && props.onValueChange(v);
  }

  function renderStars() {
    const arr = [] as JSX.Element[];

    for (let i = 0; i < count; i++) {
      if (i === Math.floor(value) && i < Math.ceil(value)) {
        arr.push(<View style={themeStyles.activeHalf} key={i}>
          <View style={starActiveHalfStyle}>
            <Icon icon={icon} {...props.starActiveStyle} color={disabled ? starDisableColor : starActiveColor} size={size} style={starActiveStyle} />
          </View>
          <Icon icon={voidIcon} {...props.starStyle} color={disabled ? starDisableColor : starColor} size={size} style={starDeactiveStyle} />
        </View>);
      }
      else if (i < value)
        arr.push(<Icon key={i} icon={icon} {...props.starActiveStyle} color={disabled ? starDisableColor : starActiveColor} size={size} style={starActiveStyle} />);
      else if (i >= value)
        arr.push(<Icon key={i} icon={voidIcon} {...props.starStyle} color={disabled ? starDisableColor : starColor} size={size} style={starDeactiveStyle} />);
    }

    return arr;
  }

  const touch = (!disabled && !props.readonly);

  return (
    <View style={themeStyles.view}
      pointerEvents="box-only"
      onResponderMove={onResponderMove}
      onResponderRelease={onResponderMove}
      onStartShouldSetResponder={() => touch}
      onStartShouldSetResponderCapture={() => touch}
      onMoveShouldSetResponder={() => touch}
      onMoveShouldSetResponderCapture={() => touch}>
      { renderStars() }
    </View>
  );
}
