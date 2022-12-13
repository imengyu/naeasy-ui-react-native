import React from "react";
import CheckTools from "../../utils/CheckTools";
import { StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { Color } from "../../styles";
import { RowView } from "../layout/RowView";
import { ThemeColor, useThemeContext } from "../../theme/Theme";
import { CheckBoxDefaultButton } from "./CheckBox";
import { DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";

export interface RadioProps {
  /**
   * 是否选中 单选框
   * @default false
   */
  value?: boolean;
  /**
   * 当前单选框在单选框组中的value，不能与其他重复
   */
  name?: string|number;
  /**
   * 单选框的文字
   */
  text?: string;
  /**
   * 单选框的文字
   */
  children?: string;
  /**
   * 是否禁用单选框
   * @default false
   */
  disabled?: boolean;
  /**
   * 单选框的形状
   * @default 'round'
   */
  shape?: "square"|"round";
  /**
   * 复选框占满整个父元素
   * @default false
   */
  block?: boolean,
  /**
   * 复选框按钮位置
   * @default 'left'
   */
  checkPosition?: "left"|"right";
  /**
   * 单选框内部形状
   * * color 一个纯色形状
   * * check 一个图标
   * @default 'color'
   */
  checkType?: 'color'|'check';
  /**
   * 单选框内部形状，在 checkType 为 check 时有效。
   */
  checkIconName?: string;
  /**
   * 按下时透明度
   * @default 0.75
   */
  activeOpacity?: number,
  /**
   * 单选框的颜色
   * @default Color.primary
   */
  color?: ThemeColor;
  /**
   * 禁用时的颜色
   * @default Color.grey
   */
  disabledColor?: ThemeColor|undefined;
  /**
   * 禁用时的文字颜色
   * @default Color.grey
   */
  disabledTextColor?: ThemeColor|undefined;
  /**
   * 文字颜色
   */
  textColor?: ThemeColor;
  /**
   * 自定义文字样式
   */
  textStyle?: TextStyle;
  /**
   * 自定义样式
   */
  style?: ViewStyle;
  /**
   * 用户更改选中时发生
   */
  onValueChange?: (value: boolean) =>  void;
  /**
   * 自定义渲染单选框按钮的回调
   */
  renderButton?: (on: boolean) => JSX.Element;
}

/**
 * 单选框
 */
export function Radio(props: RadioProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const text = props.children || props.text;
  const {
    checkPosition = 'left',
    name,
    disabled = false,
    value: valueProp = false,
    block = false,
    textColor = Color.text,
    disabledColor = Color.grey,
    color = Color.primary,
    disabledTextColor = Color.grey,
    activeOpacity = 0.75,
    shape = 'round',
    style = {},
    onValueChange,
  } = themeContext.resolveThemeProps(props, {
    textColor: 'RadioTextColor',
    disabledColor: 'RadioDisabledColor',
    disabledTextColor: 'RadioDisabledTextColor',
    activeOpacity: 'RadioActiveOpacity',
    color: 'RadioColor',
    shape: 'RadioShape',
  });

  function renderButtonStub(value: boolean) {
    return props.renderButton ?
      props.renderButton(value) :
      <CheckBoxDefaultButton
        on={value}
        disabled={disabled}
        shape={shape}
        checkedBorderColor="transparent"
        checkedBackgroundColor={themeContext.resolveThemeColor(color)}
        disableBorderColor={themeContext.resolveThemeColor(disabledColor)}
        iconSize={10}
        type="radio"
      />;
  }

  return <RadioGroupContext.Consumer>{context => {
    let value = valueProp;

    if (context) {
      if (!name) {
        console.warn('Radio in RadioGroup need a name prop!');
        return;
      }
      //Set value from parent
      value = context.value === name;
    }

    function switchOn() {
      if (context)
        context.onRadioCheck(name as string);
      else if (typeof onValueChange === 'function')
        onValueChange(!value);
    }

    return (
      <RowView
        touchable
        activeOpacity={activeOpacity}
        align="center"
        onPress={disabled ? undefined : switchOn}
        style={[ block ? themeStyles.radioBoxFull : themeStyles.radioBox, style ]}
      >
        { checkPosition === 'left' ? renderButtonStub(value) : <></> }
        <Text style={[
          themeStyles.radioText,
          props.textStyle,
          {
            color: themeContext.resolveThemeColor(disabled ? disabledTextColor : textColor),
            display: CheckTools.isNullOrEmpty(text) ? 'none' : 'flex',
          },
        ]}>{text}</Text>
        { checkPosition === 'right' ? renderButtonStub(value) : <></> }
      </RowView>
    );
  }}</RadioGroupContext.Consumer>;
}

export interface RadioGroupContextInfo {
  value: string,
  disabled: boolean,
  onRadioCheck: (name: string|undefined) => void;
}
export interface RadioGroupProps {
  /**
   * 当前单选框组选中的项目
   */
  value?: string|number;
  /**
   * 是否禁用整组单选框，设置后会禁用全部单选框。
   * @default false
   */
  disabled?: boolean;
  /**
   * 用户更改选中时发生
   */
  onValueChange?: (value: string|number) =>  void;

  children?: JSX.Element[];
}

export const RadioGroupContext = React.createContext<RadioGroupContextInfo|null>(null);

/**
 * 单选框组
 */
export function RadioGroup(props: RadioGroupProps) {

  function onValueChange(name: string|number|undefined) {
    if (typeof props.onValueChange === 'function')
      props.onValueChange(name || '');
  }

  return (
    <RadioGroupContext.Provider value={{
      value: props.value as string,
      disabled: props.disabled === true,
      onRadioCheck: onValueChange,
    }}>
      { props.children }
    </RadioGroupContext.Provider>
  );
}

const styles = StyleSheet.create({
  radio: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBox: {
    marginHorizontal: DynamicVar('RadioMarginHorizontal', 4),
  },
  radioBoxFull: {
    alignSelf: 'stretch',
    width: DynamicVar('RadioBlockWidth', '100%'),
    justifyContent: 'space-between',
    marginHorizontal:  DynamicVar('RadioBlockMarginHorizontal', 0),
  },
  radioText: {
    fontSize:  DynamicVar('RadioTextFontSize', 14),
  },
});

