import React, { useState } from 'react';
import { Platform } from 'react-native';
import { StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Color } from '../styles/ColorStyles';
import { Iconfont } from './Iconfont';
import { RowView } from './layout/RowView';

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
   * 取消按钮的文字，默认是“取消”
   */
  cancelText?: string;
  /**
   * 点击取消按钮是否自动让输入框失去焦点，默认是
   */
  cancalLostFocus?: boolean;
  /**
   * 左侧图标, 默认是 search
   */
  leftIcon?: string;
  /**
   * 图标字体名称
   */
  leftIconFontFamily?: string;
  /**
   * 取消按钮显示，默认是 show-active
   * * hidden 不显示
   * * show 一直显示
   * * show-active 当输入框激活时显示
   */
  cancelState?: 'hidden'|'show'|'show-active';
  /**
   * 点击取消事件
   */
  onCancel?: () => void;
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
  },
  input: {
    flex: 1,
    position: 'relative',
    backgroundColor: Color.white,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  inputInner: {
    flex: 1,
    paddingHorizontal: 10,
    ...Platform.select({
      ios: {
        paddingVertical: 8,
      },
      android: {
        paddingVertical: 2,
      },
    }),
  },
  cancel: {
    flex: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  cancelText: {
    color: Color.primary,
  },
  leftIcon: {
    width: 20,
  },
});

/**
 * 用于搜索场景的输入框组件。
 */
export function SearchBar(props: SearchBarProp) {

  const [ inputFocus, setInputFocus ] = useState(false);
  const [ value, setValue ] = useState(props.intitalText || '');
  const cancelState = props.cancelState || 'show-active';

  function onCancel() {
    if (props.cancalLostFocus !== false)
      inputRef?.blur();
    props.onCancel && props.onCancel();
  }
  function onSumit() {
    props.onSearch && props.onSearch(value);
  }

  let inputRef : TextInput|null = null;

  function onCustomButtonClick(type: 'search'|'cancel') {
    if (type === 'search') onSumit();
    else if (type === 'cancel') onCancel();
  }

  return (
    <RowView center style={props.style}>
      <RowView center style={{ ...styles.input, ...props.containerStyle}}>
        {
          props.renderLeftIcon ?
            props.renderLeftIcon() :
            <Iconfont icon={props.leftIcon || "search"} fontFamily={props.leftIconFontFamily} style={styles.leftIcon} />
        }
        <TextInput
          ref={(input) => { inputRef = input; }}
          style={{...styles.inputInner, ...props.inputStyle}}
          value={value}
          placeholder={props.placeholder}
          onChangeText={(v) => {
            setValue(v);
            props.onValueChange && props.onValueChange(v);
          }}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onSubmitEditing={onSumit}
        />
        { props.renderRightIcon ? props.renderRightIcon() : <></> }
      </RowView>
      { props.renderRightButton ? props.renderRightButton(onCustomButtonClick) : <></> }
      {
        (cancelState === 'show' || (inputFocus && cancelState === 'show-active')) ?
          (props.renderCancelButton ? props.renderCancelButton() : <TouchableOpacity onPress={onCancel} style={{...styles.cancel, ...props.cancelStyle }}>
            <Text style={{...styles.cancelText,...props.cancelTextStyle}}>{props.cancelText || '取消'}</Text>
          </TouchableOpacity>)
        : <></>
      }
    </RowView>
  );
}
