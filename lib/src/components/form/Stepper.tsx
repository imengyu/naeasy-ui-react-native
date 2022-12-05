import React, { useEffect, useState } from "react";
import CheckTools from "../../utils/CheckTools";
import { Text, TextInput, View } from "react-native";
import { Color, DynamicColor, StyleSheet } from "../../styles";
import { IconButton } from "../button/IconButton";
import { RowView } from "../layout/RowView";
import { ThemeWrapper } from "../../theme/Theme";

export interface StepperProps {
  /**
   * 当前数值
   */
  value?: number;
  /**
   * 数值变化回调
   */
  onValueChange?: (value: number) => void;
  /**
   * 最大值，默认无限制
   */
  maxValue?: number;
  /**
   * 最小值，默认 1
   */
  minValue?: number;
  /**
   * 中间输入框的宽度
   */
  inputWidth?: number;
  /**
   * 步长，每次点击时改变的值
   */
  step?: number;
  /**
   * 初始值，当 value 为空时生效
   */
  defaultValue?: number;
  /**
   * 固定显示的小数位数
   */
  decimalLength?: number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否禁用输入框，默认否
   */
  disableInput?: boolean;
  /**
   * 是否只允许输入整数，默认否
   */
  integer?: boolean;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
    backgroundColor: DynamicColor(Color.light),
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: DynamicColor(Color.light),
    color: DynamicColor(Color.text),
  },
  inputText: {
    textAlign: 'center',
    color: DynamicColor(Color.text),
  },
});

/**
 * 步进器。步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。
 */
export const Stepper = ThemeWrapper(function (props: StepperProps) {

  const { onValueChange, maxValue } = props;
  const value = props.value || 0;
  const disabled = props.disabled === true;
  const integer = props.integer === true;
  const decimalLength = props.decimalLength || 0;
  const defaultValue = props.defaultValue || 0;
  const minValue = props.minValue || 1;
  const step = props.step || 1;

  const [ stringValue, setStringValue ] = useState(value.toString());

  useEffect(() => {
    //数据更改时更新文字
    setStringValue((integer || decimalLength === 0) ? value.toString() : value.toFixed(decimalLength));
  }, [ decimalLength, value, integer ]);


  function setTextString(v: number) {
    setStringValue((integer || decimalLength === 0) ? v.toString() : v.toFixed(decimalLength));
  }

  function emitChange(v: number) {
    onValueChange && onValueChange(v);
  }
  function onTextBlur() {
    const s = stringValue;

    //输入框失去焦点后校验数值，用户可以从输入框直接输入数据
    if (CheckTools.isNullOrEmpty(s) || !CheckTools.isNumber(s)) {
      setTextString(defaultValue);
      emitChange(defaultValue);
      return;
    }

    let newValue = integer ? parseInt(s, 10) : parseFloat(s);
    if (newValue < minValue )
      newValue = minValue;
    if (maxValue && newValue > maxValue)
      newValue = maxValue;

    setTextString(newValue);
    emitChange(newValue);
  }
  function add() {
    //加
    let newValue = value + step;
    if (maxValue && newValue > maxValue)
      newValue = maxValue;
    emitChange(newValue);
  }
  function minus() {
    //键
    let newValue = value - step;
    if (newValue < minValue )
      newValue = minValue;
    emitChange(newValue);
  }

  return (
    <RowView>
      <IconButton icon="minus-bold" disabled={disabled || value <= minValue} onPress={minus} buttonStyle={styles.button} padding={5} />
      {
        props.disableInput === true ?
          <View
            style={{
              ...styles.input,
              width: props.inputWidth || 50,
            }}
          >
            <Text style={styles.inputText}>{stringValue}</Text>
          </View> :
          <TextInput
            style={{
              ...styles.input,
              width: props.inputWidth || 50,
            }}
            value={stringValue}
            onChangeText={setStringValue}
            onBlur={onTextBlur}
            editable={!disabled}
            keyboardType={integer ? "number-pad" : "decimal-pad"}
          />
      }
      <IconButton icon="add-bold" disabled={disabled || (maxValue ? value >= maxValue : undefined)} onPress={add} buttonStyle={styles.button} padding={5} />
    </RowView>
  );
});
