import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { Color, PressedColor } from "../styles/ColorStyles";
import { border } from "../utils/StyleTools";
import { RowView } from "./layout/RowView";

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

export interface SegmentedControlProps {
  /**
   * 如果为false，用户将无法与控件交互。默认值为true。
   */
  enabled?: boolean | undefined;

  /**
   * 当用户点击某个段时调用的回调
   */
  onChange?: ((value: number) => void) | undefined;

  /**当用户点击某个段时调用的回调
   */
  onValueChange?: ((value: string) => void) | undefined;

  /**
   * 选中的条目索引。
   */
  selectedIndex?: number | undefined;

  /**
   * 控制器的主颜色。
   */
  tintColor?: string | undefined;
  /**
   * 条目激活时的文字颜色。
   */
  activeTextColor?: string | undefined;

  /**
   * 控件段按钮的标签按顺序排列。
   */
  values?: string[] | undefined;
}

/**
 * 分段控制器组件。
 */
export function SegmentedControl(props: SegmentedControlProps) {

  const enabled = props.enabled !== false;
  const activeColor = props.tintColor || Color.primary;
  const activeTextColor = props.activeTextColor || Color.white;
  const values = props.values || [];

  function SegmentedControlItem(itemProps: {
    label: string,
    active: boolean,
    index: number,
  }) {
    return (
      <TouchableHighlight
        style={{
          ...styles.item,
          ...(border(1, 'solid', activeColor)),
          ...(itemProps.index === 0 ? {
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          } : {}),
          ...(itemProps.index !== values.length - 1 ? {
            borderRightWidth: 0,
          } : {}),
          ...(itemProps.index === values.length - 1 ? {
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          } : {}),
          backgroundColor: itemProps.active ? activeColor : undefined,
        }}
        underlayColor={PressedColor.default}
        onPress={enabled ? () => onItemPress(itemProps.index) : undefined}
      >
        <Text style={{
          ...styles.itemText,
          color: itemProps.active ? activeTextColor : activeColor,
        }}>{itemProps.label}</Text>
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
            label={item}
            active={i === props.selectedIndex}
          />
        ))
      }
    </RowView>
  );
}
