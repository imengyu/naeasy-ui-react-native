import React from "react";
import { StyleSheet, View, TextStyle, GestureResponderEvent } from "react-native";
import { Color, ThemeColor } from "../../styles";
import { Iconfont } from "../Icon";
import { ThemeWrapper } from "../../theme/Theme";

export interface RateProps {
  /**
   * 评星组件是否开启
   */
  value?: number;
  /**
   * 评星组件变化回调
   */
  onValueChange?: (value: number) => void;

  /**
   * 星星的数量
   */
  count?: number;
  /**
   * 星星未激活自定义样式
   */
  starStyle?: TextStyle;
  /**
   * 星星激活自定义样式
   */
  starActiveStyle?: TextStyle;
  /**
   * 星星激活的颜色
   */
  starActiveColor?: ThemeColor;
  /**
   * 星星未激活的颜色
   */
  starColor?: ThemeColor;
  /**
   * 选中时的图标
   */
  icon?: string;
  /**
   * 未选中时的图标
   */
  voidIcon?: string;
  /**
   * 星星之间的间距，默认3
   */
  space?: number;
  /**
   * 用户是否可以选择出半星
   */
  half?: boolean;

  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 评星组件是否禁用
   */
  disabled?: boolean;
  /**
   * 评星组件大小
   */
  size?: number;
  /**
   * 图标字体名称
   */
  iconFontFamily?: string;
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  activeHalf: {
    position: 'relative',
  },
});

/**
 * 评星组件组件。用于对事物进行评级操作。
 */
export const Rate = ThemeWrapper(function (props: RateProps) {

  const size = props.size || 24;
  const value = props.value || 0;
  const count = props.count || 5;
  const space = props.space || 3;
  const disabled = props.disabled === true;
  const half = props.half === true;

  const icon = props.icon || 'favorite-filling';
  const voidIcon = props.voidIcon || 'favorite';
  const starActiveColor = props.starActiveColor || Color.yellow;
  const starColor = props.starColor || Color.lightGrey;
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
        arr.push(<View style={styles.activeHalf} key={i}>
          <Iconfont icon={icon} fontFamily={props.iconFontFamily} color={disabled ? Color.grey : starActiveColor} size={size} style={starActiveHalfStyle} />
          <Iconfont icon={voidIcon} fontFamily={props.iconFontFamily} color={disabled ? Color.grey : starColor} size={size} style={starDeactiveStyle} />
        </View>);
      }
      else if (i < value)
        arr.push(<Iconfont key={i} icon={icon} fontFamily={props.iconFontFamily} color={disabled ? Color.grey : starActiveColor} size={size} style={starActiveStyle} />);
      else if (i >= value)
        arr.push(<Iconfont key={i} icon={voidIcon} fontFamily={props.iconFontFamily} color={disabled ? Color.grey : starColor} size={size} style={starDeactiveStyle} />);
    }

    return arr;
  }

  const touch = (!disabled && !props.readonly);

  return (
    <View style={styles.view}
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
});
