import React, { useState } from 'react';
import { View, ViewStyle, TextStyle, FlatList, Text, TouchableHighlight, FlatListProps, StyleSheet } from 'react-native';
import { Color, PressedColor } from '../../styles';
import { CheckBoxDefaultButton, CheckBoxDefaultButtonProps } from '../form/CheckBox';
import { ThemeRender, useThemeContext } from '../../theme/Theme';
import { DynamicColorVar, DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: DynamicVar('SimpleListItemPaddingHorizontal', 20),
    paddingVertical: DynamicVar('SimpleListItemPaddingVertical', 15),
    fontSize: DynamicVar('SimpleListItemFontSize', 14),
    borderTopWidth: DynamicVar('SimpleListItemBorderTopWidth', 0),
    borderBottomWidth: DynamicVar('SimpleListItemBorderBottomWidth', StyleSheet.hairlineWidth),
    borderColor: DynamicColorVar('SimpleListItemBorderColor', Color.border),
    color: DynamicColorVar('SimpleListItemColor', Color.text),
    backgroundColor: DynamicColorVar('SimpleListItemBackgroundColor', Color.white),
    flexDirection: 'row',
  },
  itemText: {
    flex: 1,
    fontSize: DynamicVar('SimpleListItemTextFontSize', 14),
    fontWeight: DynamicVar('SimpleListItemTextFontWeight', 'normal'),
    color: DynamicColorVar('SimpleListItemTextColor', Color.text),
  },
  itemTextChecked: {
    fontSize: DynamicVar('SimpleListItemCheckedTextFontSize', 14),
    fontWeight: DynamicVar('SimpleListItemCheckedTextFontWeight', 'bold'),
    color: DynamicColorVar('SimpleListItemCheckedTextColor', Color.primary),
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
   * 显示数据的prop，如果为空，则尝试直接把数据当 string 显示。
   */
  dataDisplayProp?: string,
  /**
   * 列表的选择模式
   *
   * * select 点击选择模式
   * * single-check 单选选择模式，条目右边有选择框
   * * mulit-check 多选选择模式，条目右边有选择框
   * @default 'select'
   */
  mode?: 'select'|'single-check'|'mulit-check',
  /**
   * 当列表显示选择框时，选择框的自定义属性
   * @default {
   *   borderColor: Color.border,
   *   checkColor: Color.white,
   *   color: Color.primary,
   *   size: 20,
   *   iconSize: mode === 'single-check' ? 10 : 16,
   *   type: mode === 'single-check' ? 'radio' : 'icon',
   *   disabled: false,
   * }
   */
  checkProps?: CheckBoxDefaultButtonProps,
  /**
   * 当用使用选择框模式时，默认选中条目
   * @default []
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

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

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
    ...themeStyles.item,
    ...props.itemStyle,
  } as ViewStyle;
  const textStyle = {
    ...themeStyles.itemText,
    ...props.textStyle,
  } as ViewStyle;
  const checkedItemStyle = {
    ...themeStyles.item,
    ...props.checkedItemStyle,
  } as ViewStyle;
  const checkedTextStyle = {
    ...themeStyles.itemText,
    ...themeStyles.itemTextChecked,
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
                underlayColor={themeContext.resolveThemeColor(PressedColor(Color.white))}
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
