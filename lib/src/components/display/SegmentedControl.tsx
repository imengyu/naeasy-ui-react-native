
import React from "react";
import { StyleSheet, Text, TextStyle, TouchableHighlight, ViewStyle } from "react-native";
import { Color, PressedColor } from "../../styles";
import { ThemeColor, useThemeContext } from "../../theme/Theme";
import { DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";
import { RowView } from "../layout/RowView";

const styles = StyleSheet.create({
  item: {
    flexGrow: 1,
    alignSelf: 'auto',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: DynamicVar('SegmentedControlItemPaddingHorizontal', 4),
    paddingVertical: DynamicVar('SegmentedControlItemPaddingVertical', 8),
    textAlign: 'center',
  },
  itemText: {
    fontSize: DynamicVar('SegmentedControlItemFontSize', 13),
    textAlign: 'center',
  },
});

export interface SegmentedControlCustomItem {
  label: string,
  disabled?: boolean,
  [index: string]: unknown;
}
export interface SegmentedControlProps {
  /**
   * 如果为false，用户将无法与控件交互。
   * @default true
   */
  touchable?: boolean | undefined;

  /**
   * 当用户点击某个段时调用的回调
   */
  onChange?: ((value: number) => void) | undefined;

  /**当用户点击某个段时调用的回调
   */
  onValueChange?: ((value: string|SegmentedControlCustomItem) => void) | undefined;

  /**
   * 选中的条目索引。
   */
  selectedIndex?: number | undefined;

  /**
   * 控制器的主颜色。
   * @default Color.primary
   */
  tintColor?: ThemeColor | undefined;
  /**
   * 条目激活时的文字颜色。
   * @default Color.white
   */
  activeTextColor?: ThemeColor | undefined;
  /**
   * 圆角
   * @default 5
   */
  radius?: number;
  /**
   * 控件段按钮的标签。
   */
  values?: string[] | SegmentedControlCustomItem[] | undefined;
}

/**
 * 分段控制器组件。
 */
export function SegmentedControl(props: SegmentedControlProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    touchable = true,
    tintColor: activeColor = themeContext.getThemeVar('SegmentedControlTintColor', Color.primary),
    activeTextColor = themeContext.getThemeVar('SegmentedControlActiveTextColor', Color.white),
    values = [],
    radius = themeContext.getThemeVar('SegmentedControlRadius', 5),
  } = props;

  const themeVars = themeContext.getThemeVars({
    SegmentedControlBorderWidth: 1,
    SegmentedControlPressedOpacity: 0.4,
  });
  const themeColorVars = themeContext.getThemeColorVars({
    SegmentedControlPressedColor: PressedColor(Color.white),
  });

  function onItemPress(index: number) {
    if (typeof props.onChange === 'function')
      props.onChange(index);
    if (typeof props.onValueChange === 'function')
      props.onValueChange(values[index]);
  }

  return (
    <RowView>
      {
        values.map((item, i) => {

          const activeTextColorV = themeContext.resolveThemeColor(activeTextColor);
          const activeColorV = themeContext.resolveThemeColor(activeColor);
          const itemStyles = [
            themeStyles.item,
            {
              borderWidth: themeVars.SegmentedControlBorderWidth,
              borderColor: activeColorV,
            },
          ];

          const maxLen = values.length;
          const pressedColor = themeContext.resolveThemeColor(themeColorVars.SegmentedControlPressedColor);

          return (
            <SegmentedControlItem
              key={i}
              index={i}
              maxLen={maxLen - 1}
              radius={radius}
              activeColor={activeColorV}
              activeTextColor={activeTextColorV}
              pressedColor={pressedColor}
              label={typeof item === 'object' ? item.label : item}
              disabled={!touchable || (typeof item === 'object' ? item.disabled || false : false)}
              active={i === props.selectedIndex}
              itemStyles={itemStyles}
              itemTextStyle={themeStyles.itemText}
              onItemPress={() => onItemPress(i)}
            />
          );
        })
      }
    </RowView>
  );
}

function SegmentedControlItem(props: {
  label: string,
  active: boolean,
  index: number,
  disabled: boolean,
  radius: number,
  maxLen: number,
  activeColor: string,
  activeTextColor: string,
  pressedColor: string,
  itemStyles: ViewStyle[],
  itemTextStyle: TextStyle,
  onItemPress?: () => void,
}) {
  const {
    label,
    active,
    radius,
    index,
    disabled,
    itemStyles,
    itemTextStyle,
    activeColor,
    pressedColor,
    activeTextColor,
    maxLen,
    onItemPress,
  } = props;

  return (
    <TouchableHighlight
      style={[
        ...itemStyles,
        disabled ? { opacity: 0.5 } : {},
        (index === 0 ? {
          borderTopLeftRadius: radius,
          borderBottomLeftRadius: radius,
        } : {}),
        (index !== maxLen ? {
          borderRightWidth: 0,
        } : {}),
        (index === maxLen ? {
          borderTopRightRadius: radius,
          borderBottomRightRadius: radius,
        } : {}),
        { backgroundColor: active ? activeColor : undefined },
      ]}
      underlayColor={pressedColor}
      onPress={disabled ? undefined : onItemPress}
    >
      <Text style={[
        itemTextStyle,
        { color: active ? activeTextColor : activeColor },
      ]}>{label}</Text>
    </TouchableHighlight>
  );
}
