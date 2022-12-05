import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Text, TextInput, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Color, DynamicColor, StyleSheet, ThemeColor, ThemeSelector } from '../../styles';
import { Icon, IconProp } from '../basic/Icon';
import { RowView } from '../layout/RowView';
import { ThemeWrapper } from '../../theme/Theme';

export interface SearchBarProp {
  /**
   * 输入框初始值
   */
  intitalText?: string;
  /**
   * 输入框的placeholder
   */
  placeholder?: string;
  /**
   * 输入框的placeholderTextColor
   */
  placeholderTextColor?: ThemeColor;
  /**
   * 取消按钮的文字，默认是“取消”
   */
  cancelText?: string;
  /**
   * 点击取消按钮是否自动让输入框失去焦点，默认是
   */
  cancalLostFocus?: boolean;
  /**
   * 点击取消按钮是否自动清空输入框，默认是
   */
  cancalClear?: boolean;
  /**
   * 左侧图标, 默认是 search
   */
  leftIcon?: string|null;
  /**
   * 图标自定义属性
   */
  leftIconProps?: IconProp;
  /**
   * 取消按钮显示，默认是 show-active
   * * hidden 不显示
   * * show 一直显示
   * * show-active 当输入框激活时显示
   * * show-no-empty 当输入框有文字时显示
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
    backgroundColor: DynamicColor(Color.white),
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    position: 'relative',
  },
  inputInner: {
    flex: 1,
    paddingHorizontal: 10,
    color: DynamicColor(Color.text),
    ...Platform.select({
      ios: {
        paddingVertical: 8,
      },
      web: {
        paddingVertical: 8,
      },
      android: {
        paddingVertical: 2,
      },
    }),
  },
  cancel: {
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  leftIcon: {
    width: 20,
    color: DynamicColor(Color.text),
  },
});

/**
 * 用于搜索场景的输入框组件。
 */
export const SearchBar = ThemeWrapper(function (props: SearchBarProp) {

  const [ inputFocus, setInputFocus ] = useState(false);
  const [ value, setValue ] = useState(props.intitalText || '');
  const cancelState = props.cancelState || 'show-active';
  let inputRef : TextInput|null = null;

  function onCancel() {
    if (props.cancalLostFocus !== false)
      inputRef?.blur();
    if (props.cancalClear !== false)
      setValue('');
    props.onCancel && props.onCancel();
  }
  function onSumit() {
    inputRef?.blur();
    props.onSearch && props.onSearch(value);
  }


  function onCustomButtonClick(type: 'search'|'cancel') {
    if (type === 'search') onSumit();
    else if (type === 'cancel') onCancel();
  }

  return (
    <RowView center style={[ styles.view, props.style as ViewStyle ]}>
      <RowView center style={[ styles.input, props.containerStyle as ViewStyle ]}>
        {
          props.renderLeftIcon ?
            props.renderLeftIcon() :
            (
              props.leftIcon !== null ?
                <Icon icon={props.leftIcon || "search"} {...props.leftIconProps} style={styles.leftIcon} /> :
                <></>
            )
        }
        <TextInput
          ref={(input) => { inputRef = input; }}
          style={[ styles.inputInner, props.inputStyle ]}
          value={value}
          placeholder={props.placeholder}
          placeholderTextColor={ThemeSelector.color(props.placeholderTextColor, Color.textSecond)}
          onChangeText={(v) => {
            setValue(v);
            props.onValueChange && props.onValueChange(v);
          }}
          onFocus={() => {
            setInputFocus(true);
            props.onFocus?.();
          }}
          onBlur={() => {
            setInputFocus(false);
            props.onBlur?.();
          }}
          onSubmitEditing={onSumit}
        />
        { props.renderRightIcon ? props.renderRightIcon() : <></> }
      </RowView>
      { props.renderRightButton ? props.renderRightButton(onCustomButtonClick) : <></> }
      {
        (cancelState === 'show' || (inputFocus && cancelState === 'show-active') || (value !== '' && cancelState === 'show-no-empty')) ?
          (props.renderCancelButton ? props.renderCancelButton() : <TouchableOpacity onPress={onCancel} style={[ styles.cancel, props.cancelStyle ]}>
            <Text style={[
              { color: ThemeSelector.color(Color.primary) },
              props.cancelTextStyle,
            ]}>{props.cancelText || '取消'}</Text>
          </TouchableOpacity>)
        : <></>
      }
    </RowView>
  );
});
