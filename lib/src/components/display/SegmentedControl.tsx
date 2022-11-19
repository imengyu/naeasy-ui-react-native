
import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { Color, PressedColor, ThemeColor, ThemeSelector } from "../../styles";
import { border } from "../../utils/StyleTools";
import { RowView } from "../layout/RowView";
import { ThemeWrapper } from "../../theme/Theme";

const styles = StyleSheet.create({
  item: {
    flexGrow: 1,
    alignSelf: 'auto',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 13,
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
   * 如果为false，用户将无法与控件交互。默认值为true。
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
   */
  tintColor?: ThemeColor | undefined;
  /**
   * 条目激活时的文字颜色。
   */
  activeTextColor?: ThemeColor | undefined;
  /**
   * 圆角
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
export const SegmentedControl = ThemeWrapper(function (props: SegmentedControlProps) {

  const {
    touchable = true,
    tintColor: activeColor = Color.primary,
    activeTextColor = Color.white,
    values = [],
    radius = 5,
  } = props;

  function SegmentedControlItem(itemProps: {
    label: string,
    active: boolean,
    index: number,
    disabled: boolean|undefined,
  }) {
    const disabled = itemProps.disabled || touchable === false;
    return (
      <TouchableHighlight
        style={[
          styles.item,
          border(1, 'solid', ThemeSelector.color(activeColor)),
          disabled ? { opacity: 0.5 } : {},
          (itemProps.index === 0 ? {
            borderTopLeftRadius: radius,
            borderBottomLeftRadius: radius,
          } : {}),
          (itemProps.index !== values.length - 1 ? {
            borderRightWidth: 0,
          } : {}),
          (itemProps.index === values.length - 1 ? {
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
          } : {}),
          { backgroundColor: itemProps.active ? ThemeSelector.color(activeColor) : undefined },
        ]}
        underlayColor={ThemeSelector.color(PressedColor(Color.white))}
        onPress={disabled ? undefined : () => onItemPress(itemProps.index)}
      >
        <Text style={[
          styles.itemText,
          { color: ThemeSelector.color(itemProps.active ? activeTextColor : activeColor) },
        ]}>{itemProps.label}</Text>
      </TouchableHighlight>
    );
  }

  function onItemPress(index: number) {
    if (typeof props.onChange === 'function')
      props.onChange(index);
    if (typeof props.onValueChange === 'function')
      props.onValueChange(values[index]);
  }

  return (
    <RowView>
      {
        values.map((item, i) => (
          <SegmentedControlItem
            key={i}
            index={i}
            label={typeof item === 'object' ? item.label : item}
            disabled={typeof item === 'object' ? item.disabled : false}
            active={i === props.selectedIndex}
          />
        ))
      }
    </RowView>
  );
});
