import { Color, PressedColor } from '../../styles/ColorStyles';
import CheckTools from '../../utils/CheckTools';
import { border, borderBottom, borderRight, selectStyleType } from '../../utils/StyleTools';
import React, { createRef } from 'react';
import { StyleSheet, Text, TextStyle, TouchableHighlight, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native';
import { ColumnView } from '../layout/ColumnView';

export type NumberInputBorderType = 'underline'|'box';
export interface NumberInputProps {
  /**
   * 数值
   */
  value: string;
  /**
    * 文字更改回调
    */
  onChangeText?: (text: string) => void;
  /**
    * 用于表单，更改时验证回调
    */
  onValueChange?: (text: unknown) => void;
  /**
    * 用于表单，失去焦点时验证回调
    */
  onBlurValid?: (text: unknown) => void;
  /**
    * 当输入完成（全部位数都已经输入）时返回次事件
    */
  onEnterFinish?: (text: unknown) => void;
  /**
   * 底部错误提示文案，为空时不展示
   */
  errorMessage?: string;
  /**
   * 数字位数，默认6位
   */
  numberCount?: number;
  /**
   * 是否是密码，默认否
   */
  isPassword?: boolean;
  /**
   * 输入框下方文字提示
   */
  info?: string;
  /**
   * 输入框格子之间的间距，默认0
   */
  gutter?: number;
  /**
   * 格子的边框，默认box
   */
  borderType?: NumberInputBorderType;
  /**
   * 格子的边框颜色
   */
  borderColor?: string;
  /**
   * 格子的边框宽度
   */
  borderWidth?: number;
  /**
   * 已输入格子的边框颜色，仅在underline模式下有效
   */
  activeBorderColor?: string;
  /**
   * 格子样式
   */
  boxStyle?: ViewStyle;
  /**
   * 是否禁用点击打开键盘，默认否
   */
  disableKeyPad?: boolean;
  /**
   * 文字样式
   */
  textStyle?: TextStyle;
  /**
   * 外层样式
   */
  style?: ViewStyle;
}


const styles = StyleSheet.create({
  view: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    padding: 10,
    flex: 1,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  info: {
    marginTop: 5,
    textAlign: 'center',
    color: Color.grey,
  },
  errorMessage: {
    marginTop: 5,
    textAlign: 'center',
    color: Color.danger,
  },
  invisibleInput: {
    opacity: 0,
    position: 'absolute',
    height: 1,
    left: -300,
  },
});

/**
 * 一个数字输入框
 */
export function NumberInput(props: NumberInputProps) {

  const numberCount = props.numberCount || 6;
  const isPassword = props.isPassword === true;
  const disableKeyPad = props.disableKeyPad === true;
  const borderType = props.borderType || 'box';
  const borderWidth = props.borderWidth || 1;
  const borderColor = props.borderColor || Color.lightBorder;
  const activeBorderColor = props.activeBorderColor || borderColor;
  const valueArr = props.value.split('');

  let lastClickBoxRet = -1;
  const inputRef = createRef<TextInput>();

  function onInputChangeText(text: string) {
    //点击了前面的方格输入，需要清除方格后面的文字
    if (lastClickBoxRet >= 0 && text.length > lastClickBoxRet)
      text = (text.substring(0, lastClickBoxRet) + text.charAt(text.length - 1));
    if (text.length > numberCount)
      return;

    props.onChangeText && props.onChangeText(text);
    props.onValueChange && props.onValueChange(text);

    if (text.length === numberCount - 1)
      props.onEnterFinish && props.onEnterFinish(text);
  }
  function onBoxClicked(i: number) {
    lastClickBoxRet = i;
    inputRef.current?.focus();
  }

  function renderBoxs() {
    const arr = [] as JSX.Element[];
    for (let i = 0; i < numberCount; i++) {
      const valueThis = valueArr[i];

      const boxStyle = {
        ...styles.box,
        marginHorizontal: props.gutter,
        ...selectStyleType<ViewStyle, NumberInputBorderType>(borderType, 'box', {
          box: {
            ...( i !== numberCount - 1 ? borderRight(borderWidth, 'dotted', borderColor) : {}),
            backgroundColor: Color.white,
          },
          underline: {
            ...borderBottom(borderWidth, 'dotted', valueThis ? activeBorderColor : borderColor),
          },
        }),
      } as ViewStyle;

      arr.push(
        <TouchableHighlight key={i} style={boxStyle} underlayColor={PressedColor.default} onPress={disableKeyPad ? undefined : () => onBoxClicked(i)}>
          <Text style={styles.text}>{(valueThis ? (isPassword ? '●' : valueThis) : ' ')}</Text>
        </TouchableHighlight>
      );
    }
    return arr;
  }

  return (
    <ColumnView>
      <View style={{
        ...styles.view,
        ...(borderType === 'box' ? border(borderWidth, 'solid', borderColor) : {}),
        ...props.style,
      }}>
        {renderBoxs()}
      </View>
      <TextInput
        style={styles.invisibleInput}
        ref={inputRef}
        value={props.value}
        secureTextEntry={isPassword}
        keyboardType="number-pad"
        onChangeText={onInputChangeText}
      />
      { CheckTools.isNullOrEmpty(props.info) ? <></> : <Text style={styles.info}>{props.info}</Text> }
      { CheckTools.isNullOrEmpty(props.errorMessage) ? <></> : <Text style={styles.errorMessage}>{props.errorMessage}</Text> }
    </ColumnView>
  );
}
