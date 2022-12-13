import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Text, TextInput, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Color } from '../../styles';
import { Icon, IconProp } from '../basic/Icon';
import { RowView } from '../layout/RowView';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicColorVar, DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';

export interface SearchBarProp {
  /**
   * 输入框初始值
   */
  intitalText?: string;
  /**
   * 输入框的文字颜色
   * @default Color.black
   */
  inputColor?: ThemeColor;
  /**
   * 输入框的placeholder
   */
  placeholder?: string;
  /**
   * 输入框的placeholderTextColor
   * @default Color.textSecond
   */
  placeholderTextColor?: ThemeColor;
  /**
   * 取消按钮的文字
   * @default '取消'
   */
  cancelText?: string;
  /**
   * 取消按钮的文字颜色
   * @default Color.primary
   */
  cancelTextColor?: ThemeColor;
  /**
   * 点击取消按钮是否自动让输入框失去焦点
   * @default true
   */
  cancalLostFocus?: boolean;
  /**
   * 点击取消按钮是否自动清空输入框
   * @default true
   */
  cancalClear?: boolean;
  /**
   * 左侧图标
   * @default 'search'
   */
  leftIcon?: string|null;
  /**
   * 图标自定义属性
   */
  leftIconProps?: IconProp;
  /**
   * 取消按钮显示
   * * hidden 不显示
   * * show 一直显示
   * * show-active 当输入框激活时显示
   * * show-no-empty 当输入框有文字时显示
   * @default 'show-active'
   */
  cancelState?: 'hidden'|'show'|'show-active'|'show-no-empty';
  /**
   * 点击取消事件
   */
  onCancel?: () => void;
  /**
   * 激活事件
   */
  onFocus?: () => void;
  /**
   * 失去焦点事件
   */
  onBlur?: () => void;
  /**
   * 搜索事件
   */
  onSearch?: (value: string) => void;
  /**
   * 搜索文字更改事件
   */
  onValueChange?: (value: string) => void;
  /**
   * 自定义样式
   */
  style?: ViewStyle;
  /**
   * 容器自定义样式
   */
  containerStyle?: ViewStyle;
  /**
   * 自定义样式
   */
  inputStyle?: TextStyle;
  /**
   * 自定义样式
   */
  cancelStyle?: ViewStyle;
  /**
   * 自定义样式
   */
  cancelTextStyle?: TextStyle;

  renderRightButton?: (buttonCallback: (type: 'search'|'cancel') => void) => JSX.Element;
  renderLeftIcon?: () => JSX.Element;
  renderRightIcon?: () => JSX.Element;
  renderCancelButton?: () => JSX.Element;
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    backgroundColor: DynamicColorVar('SearchBarBackgroundColor', Color.white),
    borderRadius: DynamicVar('SearchBarBorderRadius', 20),
    paddingHorizontal: DynamicVar('SearchBarPaddingHorizontal', 10),
    paddingVertical: DynamicVar('SearchBarPaddingVertical', 0),
  },
  input: {
    flex: 1,
    position: 'relative',
  },
  inputInner: {
    flex: 1,
    paddingHorizontal: DynamicVar('SearchBarCancelPaddingHorizontal', 10),
    paddingVertical: DynamicVar('SearchBarCancelPaddingVertical', Platform.select({
      ios: 8,
      web: 8,
      android: 2,
    })),
  },
  cancel: {
    paddingVertical: DynamicVar('SearchBarCancelPaddingVertical', 0),
    paddingHorizontal: DynamicVar('SearchBarCancelPaddingHorizontal', 10),
  },
  leftIcon: {
    width: DynamicVar('SearchBarLeftIconWidth', 20),
    color: DynamicColorVar('SearchBarLeftIconColor', Color.text),
  },
});

/**
 * 用于搜索场景的输入框组件。
 */
export function SearchBar(props: SearchBarProp) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    cancelState = 'show-active',
    intitalText = '',
    cancalLostFocus = true,
    cancalClear = true,
    leftIcon = themeContext.getThemeVar('SearchBarLeftIcon', "search"),
    leftIconProps,
    style,
    inputStyle,
    inputColor = themeContext.getThemeVar('SearchBarTextColor', Color.black),
    cancelStyle,
    cancelTextStyle,
    containerStyle,
    placeholder,
    placeholderTextColor = themeContext.getThemeVar('SearchBarPlaceholderTextColor', Color.textSecond),
    cancelTextColor = themeContext.getThemeVar('SearchBarCancelTextColor', Color.primary),
    cancelText = '取消',
    onSearch,
    onBlur,
    onCancel,
    onFocus,
    onValueChange,
    renderLeftIcon,
    renderRightButton,
    renderRightIcon,
    renderCancelButton,
  } = props;

  const [ inputFocus, setInputFocus ] = useState(false);
  const [ value, setValue ] = useState(intitalText);

  let inputRef : TextInput|null = null;

  function onCancelPressed() {
    if (cancalLostFocus)
      inputRef?.blur();
    if (cancalClear)
      setValue('');
    onCancel && onCancel();
  }
  function onSumit() {
    inputRef?.blur();
    onSearch && onSearch(value);
  }


  function onCustomButtonClick(type: 'search'|'cancel') {
    if (type === 'search') onSumit();
    else if (type === 'cancel') onCancelPressed();
  }

  return (
    <RowView center style={[ themeStyles.view, style as ViewStyle ]}>
      <RowView center style={[ themeStyles.input, containerStyle as ViewStyle ]}>
        {
          renderLeftIcon ?
            renderLeftIcon() :
            (
              leftIcon !== null ?
                <Icon icon={leftIcon} {...leftIconProps} style={themeStyles.leftIcon} /> :
                <></>
            )
        }
        <TextInput
          ref={(input) => { inputRef = input; }}
          style={[ themeStyles.inputInner, inputStyle, { color: themeContext.resolveThemeColor(inputColor) } ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={themeContext.resolveThemeColor(placeholderTextColor)}
          onChangeText={(v) => {
            setValue(v);
            onValueChange && onValueChange(v);
          }}
          onFocus={() => {
            setInputFocus(true);
            onFocus?.();
          }}
          onBlur={() => {
            setInputFocus(false);
            onBlur?.();
          }}
          onSubmitEditing={onSumit}
        />
        { renderRightIcon ? renderRightIcon() : <></> }
      </RowView>
      { renderRightButton ? renderRightButton(onCustomButtonClick) : <></> }
      {
        (cancelState === 'show' || (inputFocus && cancelState === 'show-active') || (value !== '' && cancelState === 'show-no-empty')) ?
          (
            renderCancelButton ?
              renderCancelButton() :
              <TouchableOpacity
                onPress={onCancelPressed}
                style={[ themeStyles.cancel, cancelStyle ]}
              >
                <Text style={[
                  { color: themeContext.resolveThemeColor(cancelTextColor) },
                  cancelTextStyle,
                ]}>{cancelText}</Text>
              </TouchableOpacity>
          )
        : <></>
      }
    </RowView>
  );
}
