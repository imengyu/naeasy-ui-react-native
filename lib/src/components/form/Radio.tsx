import React from "react";
import CheckTools from "../../utils/CheckTools";
import { Text, TextStyle, ViewStyle } from "react-native";
import { Color, DynamicThemeStyleSheet, ThemeColor, ThemeSelector } from "../../styles";
import { RowView } from "../layout/RowView";
import { ThemeWrapper } from "../../theme/Theme";
import { CheckBoxDefaultButton } from "./CheckBox";

export interface RadioProps {
  /**
   * 是否选中 单选框
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
   */
  disabled?: boolean;
  /**
   * 单选框的形状
   */
  shape?:"square"|"round";
  /**
   * 复选框占满整个父元素，默认否
   */
  block?: boolean,
  /**
   * 复选框按钮位置，默认在左
   */
  checkPosition?:"left"|"right";
  /**
   * 单选框内部形状
   * * color 一个纯色形状
   * * check 一个图标
   */
  checkType?: 'color'|'check';
  /**
   * 单选框内部形状，在 checkType 为 check 时有效。
   */
  checkIconName?: string;
  /**
   * 单选框的颜色，默认是 primary
   */
  color?: ThemeColor;
  /**
   * 禁用时的颜色，默认是 grey
   */
  disabledColor?: ThemeColor|undefined;
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
export const Radio = ThemeWrapper(function (props: RadioProps) {


  const text = props.children || props.text;
  const {
    checkPosition = 'left',
    name,
    disabled = false,
    value: valueProp = false,
    block = false,
    textColor = Color.text,
    disabledColor = Color.grey,
    color,
    shape,
    style = {},
    onValueChange,
  } = props;

  function renderButtonStub(value: boolean) {
    return props.renderButton ?
      props.renderButton(value) :
      <CheckBoxDefaultButton
        on={value}
        disabled={disabled}
        shape={shape}
        checkedBorderColor="transparent"
        checkedBackgroundColor={ThemeSelector.color(color)}
        disableBorderColor={ThemeSelector.color(disabledColor)}
        iconSize={10}
        type="radio"
      />;
  }

  return <RadioGroupContext.Consumer>{context => {
    let value = valueProp;

    if (context) {
      if (!name) {
        console.log('Radio in RadioGroup need name prop!');
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
        activeOpacity={0.75}
        align="center"
        onPress={disabled ? undefined : switchOn}
        style={[ block ? styles.radioBoxFull : styles.radioBox, style ]}
      >
        { checkPosition === 'left' ? renderButtonStub(value) : <></> }
        <Text style={[
          styles.radioText,
          props.textStyle,
          {
            color: ThemeSelector.color(disabled ? Color.grey : (textColor)),
            display: CheckTools.isNullOrEmpty(text) ? 'none' : 'flex',
          },
        ]}>{text}</Text>
        { checkPosition === 'right' ? renderButtonStub(value) : <></> }
      </RowView>
    );
  }}</RadioGroupContext.Consumer>;
});

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

const styles = DynamicThemeStyleSheet.create({
  radio: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBox: {
    marginHorizontal: 4,
  },
  radioBoxFull: {
    alignSelf: 'stretch',
    width: '100%',
    justifyContent: 'space-between',
    marginHorizontal: 0,
  },
  radioText: {
    fontSize: 14,
  },
});

