import React, { useEffect, useState } from "react";
import CheckTools from "../../utils/CheckTools";
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputFocusEventData, View } from "react-native";
import { Color } from "../../styles";
import { IconButton } from "../button/IconButton";
import { RowView } from "../layout/RowView";
import { useThemeContext } from "../../theme/Theme";
import { DynamicColorVar, DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";

export interface StepperProps {
  /**
   * 当前数值
   * @default 0
   */
  value?: number;
  /**
   * 数值变化回调
   */
  onValueChange?: (value: number) => void;
  /**
   * 最大值，为空无限制
   * @default undefined
   */
  maxValue?: number;
  /**
   * 最小值
   * @default 1
   */
  minValue?: number;
  /**
   * 中间输入框的宽度
   * @default 50
   */
  inputWidth?: number;
  /**
   * 步长，每次点击时改变的值
   * @default 1
   */
  step?: number;
  /**
   * 初始值，当 value 为空时生效
   * @default 0
   */
  defaultValue?: number;
  /**
   * 固定显示的小数位数
   * @default 10
   */
  decimalLength?: number;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否禁用输入框
   * @default false
   */
  disableInput?: boolean;
  /**
   * 是否只允许输入整数
   * @default false
   */
  integer?: boolean;
  /**
   * 加号图标名称
   * @default 'add-bold'
   */
  addIcon?: string;
  /**
   * 键号图标名称
   * @default 'minus-bold'
   */
  minusIcon?: string;

  /**
   * 自定义渲染加号
   */
  renderAdd?: (props: {
    onPress: () => void,
    disabled: boolean,
  }) => JSX.Element;
  /**
   * 自定义渲染减号
   */
  renderMinus?: (props: {
    onPress: () => void,
    disabled: boolean,
  }) => JSX.Element;
  /**
   * 自定义渲染中心
   */
  renderCenter?: (props: {
    disableInput: boolean,
    value: string|number,
    editable: boolean,
    integer: boolean,
    onChangeText: ((text: string) => void),
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
  }) => JSX.Element;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: DynamicVar('StepperButtonBorderRadius', 0),
    paddingVertical: DynamicVar('StepperButtonPaddingVertical', 0),
    paddingHorizontal: DynamicVar('StepperButtonPaddingHorizontal', 0),
    backgroundColor: DynamicColorVar('StepperButtonBackgroundColor', Color.light),
  },
  input: {
    paddingVertical: DynamicVar('StepperInputPaddingVertical', 0),
    paddingHorizontal: DynamicVar('StepperInputPaddingHorizontal', 10),
    marginHorizontal: DynamicVar('StepperInputMarginHorizontal', 4),
    marginVertical: DynamicVar('StepperInputMarginVertical', 0),
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: DynamicColorVar('StepperInputBackgroundColor', Color.light),
    color: DynamicColorVar('StepperInputTextColor', Color.text),
  },
  inputText: {
    textAlign: 'center',
    color: DynamicColorVar('StepperInputTextColor', Color.text),
  },
});

/**
 * 步进器。步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。
 */
export function Stepper(props: StepperProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    value = 0,
    disabled = false,
    integer = false,
    decimalLength = 10,
    defaultValue = 0,
    minValue = 1,
    maxValue = undefined,
    disableInput = false,
    inputWidth = themeContext.getThemeVar('StepperInputWidth', 50),
    step = 1,
    addIcon = themeContext.getThemeVar('StepperAddIcon', 'add-bold'),
    minusIcon = themeContext.getThemeVar('StepperMinusIcon', 'minus-bold'),
    onValueChange,
    renderAdd,
    renderMinus,
    renderCenter,
  } = props;

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
    <RowView align="center">
      {
        renderMinus ?
          renderMinus({
            disabled: disabled || value <= minValue,
            onPress: minus,
          }) :
          <IconButton
            icon={minusIcon}
            disabled={disabled || value <= minValue}
            onPress={minus}
            buttonStyle={themeStyles.button}
            padding={5}
          />
      }
      {
        renderCenter ? renderCenter({
          disableInput,
          value: stringValue,
          integer,
          onChangeText: setStringValue,
          onBlur: onTextBlur,
          editable: !disabled,
        }) : (
          disableInput ?
            <View
              style={{
                ...themeStyles.input,
                width: inputWidth,
              }}
            >
              <Text style={themeStyles.inputText}>{stringValue}</Text>
            </View> :
            <TextInput
              style={{
                ...themeStyles.input,
                width: inputWidth,
              }}
              value={stringValue}
              onChangeText={setStringValue}
              onBlur={onTextBlur}
              editable={!disabled}
              keyboardType={integer ? "number-pad" : "decimal-pad"}
            />
        )
      }
      {
        renderAdd ?
          renderAdd({
            disabled: disabled || value <= minValue,
            onPress: add,
          }) :
        <IconButton
          icon={addIcon}
          disabled={disabled || (maxValue ? value >= maxValue : undefined)}
          onPress={add}
          buttonStyle={themeStyles.button}
          padding={5}
        />
      }
    </RowView>
  );
}
