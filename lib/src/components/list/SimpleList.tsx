import React, { useState } from 'react';
import { View, ViewStyle, TextStyle, StyleSheet, FlatList, Text, TouchableHighlight, FlatListProps } from 'react-native';
import { Color, DynamicColor, DynamicThemeStyleSheet, PressedColor, ThemeSelector } from '../../styles';
import { CheckBoxDefaultButton, CheckBoxDefaultButtonProps } from '../form/CheckBox';
import { ThemeRender } from '../../theme/Theme';

const styles = DynamicThemeStyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: DynamicColor(Color.border),
    backgroundColor: DynamicColor(Color.white),
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 14,
    flex: 1,
    color: DynamicColor(Color.text),
  },
  itemTextChecked: {
    fontWeight: 'bold',
    color: DynamicColor(Color.primary),
  },
});

export interface SimpleListProps<T> extends Omit<FlatListProps<T>, "data"|"renderItem"|'getItemLayout'|'getItem'> {
  /**
   * 条目的自定义样式
   */
  itemStyle?: ViewStyle;
  /**
   * 条目文字的自定义样式
   */
  textStyle?: TextStyle;
  /**
   * 选中的条目的自定义样式
   */
  checkedItemStyle?: ViewStyle;
  /**
   * 选中的条目文字的自定义样式
   */
  checkedTextStyle?: TextStyle;
  /**
   * 源数据
   */
  data: T[],
  /**
   * 显示数据的prop
   */
  dataDisplayProp?: string,
  /**
   * 列表的选择模式
   *
   * * select 点击选择模式
   * * single-check 单选选择模式，条目右边有选择框
   * * mulit-check 多选选择模式，条目右边有选择框
   */
  mode?: 'select'|'single-check'|'mulit-check',
  /**
   * 当列表显示选择框时，选择框的自定义属性
   */
  checkProps?: CheckBoxDefaultButtonProps,
  /**
   * 当用使用选择框模式时，默认选中条目
   */
  defaultSelect?: T[],
  /**
   * 自定义渲染条目
   */
  renderItem?: (item: T, index: number) => JSX.Element,
  /**
   * 自定义渲染条目内容
   */
  renderItemContent?: (item: T, index: number) => JSX.Element,
  /**
   * 自定义条目key
   */
  keyExtractor?: (item: T, index: number) => string,
  /**
   * 当用户点击列表条目时发出此事件
   */
  onItemPress?: (item: T, index: number) => void,
  /**
   * 当用使用选择框模式时，选中条目更改时发出此事件
   */
  onSelectedItemChanged?: (items: T[]) => void,
}

/**
 * 简单条目列表
 */
export function SimpleList<T>(props: SimpleListProps<T>) {

  const data = props.data;
  const dataDisplayProp = props.dataDisplayProp;
  const mode = props.mode || 'select';

  const [ checkedList, setCheckedList ] = useState<T[]>(props.defaultSelect || []);

  function onItemPress(item: T, index: number) {
    if (mode === 'single-check') {
      setCheckedList([ item ]);

      props.onSelectedItemChanged && props.onSelectedItemChanged([ item ]);
    } else if (mode === 'mulit-check') {
      setCheckedList((prev) => {
        let arr : T[];
        if (prev.indexOf(item) >= 0)
          arr = prev.filter(k => k !== item);
        else
          arr = prev.concat([ item ]);

        setTimeout(() => {
          props.onSelectedItemChanged && props.onSelectedItemChanged(arr);
        }, 100);
        return arr;
      });
    }
    props.onItemPress && props.onItemPress(item, index);
  }

  const itemStyle = {
    ...styles.item,
    ...props.itemStyle,
  } as ViewStyle;
  const textStyle = {
    ...styles.itemText,
    ...props.textStyle,
  } as ViewStyle;
  const checkedItemStyle = {
    ...styles.item,
    ...props.checkedItemStyle,
  } as ViewStyle;
  const checkedTextStyle = {
    ...styles.itemText,
    ...styles.itemTextChecked,
    ...props.checkedTextStyle,
  } as ViewStyle;
  const checkProps = {
    borderColor: Color.border,
    checkColor: Color.white,
    color: Color.primary,
    size: 20,
    iconSize: mode === 'single-check' ? 10 : 16,
    type: mode === 'single-check' ? 'radio' : 'icon',
    disabled: false,
    ...props.checkProps,
  } as CheckBoxDefaultButtonProps;

  return (
    <ThemeRender>
      {() => (
        <FlatList<T>
          { ...props }
          data={data}
          renderItem={({ item, index }) => {
            const checked = checkedList.indexOf(item) >= 0;
            return (props.renderItem ? props.renderItem(item, index) :
              <TouchableHighlight
                underlayColor={ThemeSelector.color(PressedColor(Color.white))}
                onPress={() => onItemPress(item as T, index)}
              >
                <View style={checked ? checkedItemStyle : itemStyle}>
                  {
                    props.renderItemContent ?
                      props.renderItemContent(item, index) :
                      <Text style={checked ? checkedTextStyle : textStyle}>{
                        dataDisplayProp ?
                          (item as unknown as Record<string, string>)[dataDisplayProp] :
                          (item as unknown as string) }
                      </Text>
                  }
                  {
                    mode !== 'select' ?
                      <CheckBoxDefaultButton
                        { ...checkProps }
                        on={checked}
                      /> : <></>
                  }
                </View>
              </TouchableHighlight>
            );
          }}
        />
      )}
    </ThemeRender>
  );
}
