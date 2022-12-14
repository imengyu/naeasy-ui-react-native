import React, { forwardRef, useMemo, useState } from "react";
import CheckTools from "../../utils/CheckTools";
import { StyleSheet, TextInputFocusEventData, View } from "react-native";
import { NativeSyntheticEvent } from "react-native";
import { Text, TextInput, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native";
import { Color } from "../../styles";
import { selectStyleType } from "../../utils/StyleTools";
import { Icon, IconProp } from "../basic/Icon";
import { ColumnView } from "../layout/ColumnView";
import { RowView } from "../layout/RowView";
import { Platform } from "react-native";
import { Form, FormItemFieldProps } from "./Form";
import { ThemeColor, useThemeContext } from "../../theme/Theme";
import { rpx } from "../../utils";
import { DynamicColorVar, DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";
import { useRef } from "react";
import { useImperativeHandle } from "react";

export interface FieldProps extends Omit<TextInputProps, 'value'|'placeholderTextColor'>, Omit<FormItemFieldProps, 'onBlurValid'> {
  /**
   * 输入框左侧文本
   */
  label?: string;
  /**
   * 名称，作为提交表单时的标识符
   */
  name?: string;
  /**
   * 输入框类型
   * @default 'text'
   */
  type?: 'text'|'tel'|'number'|'password'|'number'|'email'|'decimal';
  /**
   * 输入的最大字符数
   */
  maxLength?: number;
  /**
   * 输入框占位提示文字
   */
  placeholder?: string;
  /**
   * 是否禁用输入框
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否内容垂直居中
   * @default false
   */
  center?: boolean;
  /**
   * 是否在 label 后面添加冒号
   * @default true
   */
  colon?: boolean;
  /**
   * 是否必填
   * @default false
   */
  required?: boolean;
  /**
   * 是否显示表单必填星号
   * @default false
   */
  showRequiredBadge?: boolean;
  /**
   * 是否启用清除图标，点击清除图标后会清空输入框
   * @default false
   */
  clearButton?: boolean;
  /**
   * 清除图标的自定义属性
   */
  clearButtonProps?: IconProp;
  /**
   * 左侧文本的宽度
   */
  labelWidth?: string|number;
  /**
   * 左侧文本对齐
   * @default 'left'
   */
  labelAlign?: 'left'|'center'|'right';
  /**
   * 左侧文本的flex占比
   * @default undefined
   */
  labelFlex?: number;
  /**
   * 输入框的flex占比
   * @default 5
   */
  inputFlex?: number;
  /**
   * 左侧文本的样式
   */
  labelStyle?: TextStyle;
  /**
   * 左侧文本的颜色
   */
  labelColor?: ThemeColor;
  /**
   * 左侧文本的禁用颜色
   */
  labelDisableColor?: ThemeColor;
  /**
   * 输入框样式
   */
  inputStyle?: TextStyle;
  /**
   * 激活时的外壳样式
   */
  activeInputStyle?: TextStyle;
  /**
   * 输入框颜色
   */
  inputColor?: ThemeColor;
  /**
   * 输入框文本对齐。
   * @default 'left'
   */
  inputAlign?: 'left'|'center'|'right';
  /**
   * 输入框禁用颜色
   */
  inputDisableColor?: ThemeColor;
  /**
   * 外壳样式
   */
  fieldStyle?: ViewStyle;
  /**
   * 激活时的外壳样式
   */
  activeFieldStyle?: ViewStyle;
  /**
   * 错误时的文字颜色
   * @default Color.danger
   */
  errorTextColor?: ThemeColor;
  /**
   * 文本框水印文字颜色
   * @default Color.grey
   */
  placeholderTextColor?: ThemeColor;
  /**
   * 输入内容格式化函数
   */
  formatter?: (text: string) => string;
  /**
   * 格式化函数触发的时机，可选值为 onBlur
   * @default 'onChangeText'
   */
  formatTrigger?: 'onBlur'|'onChangeText';
  /**
   * 设置字段校验的时机
   * * onBlur 文本框失去焦点时校验
   * * onValueChange 数值更改时校验
   * * onSubmit 提交时校验(默认)
   * @default 'onSubmit'
   */
  validateTrigger?: 'onBlur'|'onValueChange'|'onSubmit';
  /**
   * 用于控制当前条目根据表单的值是否显示。
   */
  visibleIf?: (form: Form) => boolean;
  /**
   * 是否将输入内容标红。
   */
  error?: boolean;
  /**
   * 底部错误提示文案，为空时不展示
   */
  errorMessage?: string;
  /**
   * 是否显示字数统计
   * @default false
   */
  showWordLimit?: boolean;
  /**
   * 是否显左边标题
   * @default true
   */
  showLabel?: boolean;
  /**
   * 是否显右边箭头
   * @default false
   */
  showRightArrow?: boolean;
  /**
   * 右边箭头自定义属性
   */
  rightArrowProps?: IconProp;
  /**
   * 输入框自定义后缀
   */
  suffix?: JSX.Element;
  /**
   * 输入框前缀，这个前缀是显示在 label 后面，输入框前面
   */
  prefix?: JSX.Element;
  /**
   * 点击回调。如果为空，则条目无法点击。
   * @default undefined
   */
  onPress?: () => void;
  /**
   * 文字更改回调
   */
  onChangeText?: (text: string) => void;
  /**
   * 用于表单，失去焦点时验证回调
   */
  onBlurValid?: (instance: FieldInstance, text: unknown) => void;
  /**
   * 点击清除按钮时触发，返回true取消清除
   */
  onClear?: () => boolean;
  /**
   * 渲染左侧按钮
   */
  renderLeftButton?: () => JSX.Element;
  /**
   * 渲染右侧按钮
   */
  renderRightButton?: () => JSX.Element;
  /**
   * 渲染左侧图标区域
   */
  renderLeftIcon?: () => JSX.Element;
  /**
   * 渲染输入框区域
   */
  renderInput?: () => JSX.Element;
}

/**
 * Field 子组件相关表单事件上下文
 */
export const FieldItemContext = React.createContext<FieldItemContextData>({} as FieldItemContextData);
/**
 * Field 子组件相关表单事件上下文数据
 */
export interface FieldItemContextData {
  /**
   * 当前输入的值
   */
  value?: unknown;
  /**
   * 用于表单，更改时验证回调
   */
  onValueChange?: (value: unknown) => void;
  /**
   * 用于表单，获得点时验证回调
   */
  onFocusValid?: () => void;
  /**
   * 用于表单，失去焦点时验证回调
   */
  onBlurValid?: (value: unknown) => void;
}


//TODO: 优化子组件的表单相关事件

const styles = StyleSheet.create({
  field: {
    paddingVertical: DynamicVar('FieldPaddingVertical', rpx(16)),
    paddingHorizontal: DynamicVar('FieldPaddingHorizontal', rpx(32)),
  },
  requiredMark: {
    fontSize: DynamicVar('FieldRequiredMark', 14),
    alignSelf: 'flex-start',
    color: DynamicColorVar('FieldRequiredMark', Color.danger),
    ...Platform.select({
      android: {
        paddingVertical: DynamicVar('FieldRequiredMarkPaddingVertical', 4),
      },
    }),
    marginHorizontal: DynamicVar('FieldRequiredMarkMarginHorizontal', 4),
  },
  labelText: {
    marginRight: DynamicVar('FieldLabelMarginRight', 10),
    fontSize: DynamicVar('FieldLabelFontSize', 14),
    alignSelf: 'flex-start',
    ...Platform.select({
      android: {
        paddingVertical: DynamicVar('FieldLabelPaddingVertical', 4),
      },
    }),
  },
  inputWapper2: {
    alignSelf: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    paddingVertical: DynamicVar('FieldInputPaddingVertical', 0),
    paddingHorizontal: DynamicVar('FieldInputPaddingHorizontal', 0),
  },
  errorMessage: {
    fontSize: DynamicVar('FieldErrorMessageFontSize', 12),
    color: DynamicColorVar('FieldErrorMessageColor', Color.danger),
    marginTop: DynamicVar('FieldErrorMessageMarginTop', 4),
  },
  wordLimitText: {
    fontSize: DynamicVar('FieldWordLimitTextFontSize', 12),
    color: DynamicColorVar('FieldWordLimitTextColor', Color.textSecond),
    width: DynamicVar('FieldWordLimitTextWidth', '100%'),
    textAlign: DynamicVar('FieldWordLimitTextTextAlign', 'right'),
  },
  clearIcon: {
    width: DynamicVar('FieldClearIconWidth', 30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface FieldInstance {
  /**
   * 获取输入框焦点
   */
  focus: () => void;
  /**
   * 取消输入框焦点
   */
  blur: () => void;
  /**
   * 清空输入框
   */
  clear: () => void;
  /**
   * 返回值表明当前输入框是否获得了焦点。
   */
  isFocused: () => boolean;
}

/**
 * 表单条目组件
 */
export const Field = forwardRef<FieldInstance, FieldProps>((props, ref) => {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    label,
    labelColor = themeContext.getThemeVar('FieldLabelColor', Color.text),
    labelDisableColor = themeContext.getThemeVar('FieldLabelDisableColor', Color.grey),
    labelFlex = themeContext.getThemeVar('FieldLabelFlex', undefined),
    inputDisableColor = themeContext.getThemeVar('FieldInputDisableColor', Color.grey),
    inputColor = themeContext.getThemeVar('FieldInputColor', Color.text),
    inputFlex = themeContext.getThemeVar('FieldInputFlex', 5),
    placeholderTextColor = themeContext.getThemeVar('FieldPlaceholderTextColor', Color.textSecond),
    errorTextColor = themeContext.getThemeVar('FieldErrorTextColor',  Color.danger),
    error = false,
    errorMessage,
    colon = true,
    fieldStyle = themeContext.getThemeVar('FieldFieldStyle', {}),
    activeFieldStyle = themeContext.getThemeVar('FieldActiveFieldStyle', {}),
    labelStyle = themeContext.getThemeVar('FieldLabelStyle', {}),
    inputStyle = themeContext.getThemeVar('FieldInputStyle', {}),
    activeInputStyle = themeContext.getThemeVar('FieldActiveInputStyle', {}),
    required = false,
    center = false,
    showWordLimit,
    clearButton = false,
    clearButtonMode,
    labelWidth,
    labelAlign = "left",
    inputAlign = "left",
    type = "text",
    formatTrigger = 'onChangeText',
    disabled = false,
    editable = true,
    showLabel = true,
    showRequiredBadge = true,
    showRightArrow = false,
    rightArrowProps,
    clearButtonProps,
    suffix,
    prefix,
    value,
    maxLength,
    renderLeftIcon,
    renderRightButton,
    renderLeftButton,
    renderInput,
    onPress,
    onValueChange,
    onFocus,
    onBlur,
    onBlurValid,
    onFocusValid,
    onClear,
  } = props;

  const [ focused, setFocused ] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const instance = useMemo(() => ({
    focus() {
      inputRef.current?.focus();
    },
    blur() {
      inputRef.current?.blur();
    },
    clear() {
      inputRef.current?.clear();
    },
    isFocused() :boolean {
      return inputRef.current?.isFocused() || false;
    },
  }), []);

  useImperativeHandle(ref, () => instance);

  function emitChangeText(text: string) {
    if (props.onChangeText)
      props.onChangeText(text);
    if (onValueChange)
      onValueChange(text);
  }
  function doFormatter(text: string) {
    switch (type) {
      case 'decimal':
        text = text.replace(/[^\d.]/g, "");
        text = text.replace(/^\./g, ""); //必须保证第一个为数字而不是.
        text = text.replace(/\.{2,}/g, "."); //保证只有出现一个.而没有多个.
        text = text.replace(".","$#$").replace(/\./g, "").replace("$#$", ".");
        break;
      case 'number':
        text = text.replace(/[^\d]/g, '');
        break;
      case 'tel':
        text = text.replace(/[^(\d|\-|*|#)]/g, '');
        break;
    }
    if (props.formatter)
      text = props.formatter(text);
    return text;
  }
  function onChangeText(text: string) {
    if (formatTrigger !== 'onBlur') //格式化字符串
      text = doFormatter(text);
    emitChangeText(text);
  }
  function onClearHadler() {
    //清空按钮
    if (onClear) {
      if (onClear() !== true)
        emitChangeText('');
    }
    else emitChangeText('');
  }
  function onBlurHandler(e: NativeSyntheticEvent<TextInputFocusEventData>) {

    if (formatTrigger === 'onBlur'){//格式化字符串
      const text = doFormatter(e.nativeEvent.text);
      emitChangeText(text);
    }

    onBlurValid && onBlurValid(instance, e.nativeEvent.text);
    onBlur && onBlur(e);

    setFocused(false);
  }
  function onFocusHandler(e: NativeSyntheticEvent<TextInputFocusEventData>) {

    onFocusValid && onFocusValid(instance);
    onFocus && onFocus(e);

    setFocused(true);
  }

  const contextData = useMemo<FieldItemContextData>(() => ({
    value: value,
    onValueChange: onValueChange,
    onFocusValid: () => onFocusValid?.(instance),
    onBlurValid: (v: unknown) => onBlurValid?.(instance, v),
  }), [
    instance,
    value,
    onValueChange,
    onFocusValid,
    onBlurValid,
  ]);

  function renderWordLimit() {
    if (!renderInput && typeof value === 'string') {
      let wordString = value ? value.length : '0';
      if (maxLength)
        wordString += `/${maxLength}`;
      else
        wordString += `字`;
      return (
        <Text style={themeStyles.wordLimitText}>{wordString}</Text>
      );
    }
    return <></>;
  }

  return (
    <RowView
      touchable={typeof onPress === 'function'}
      onPress={onPress}
      style={[ themeStyles.field, fieldStyle, (focused ? activeFieldStyle : {}) ]}
      center={center}
    >
      { /* 左边的标签区域 */ }
      { (showLabel === false || (CheckTools.isNullOrEmpty(label) && !renderLeftIcon)) ? <></> : <RowView align="center" flex={labelFlex}>
        { required && showRequiredBadge ? <Text style={themeStyles.requiredMark}>*</Text> : <></> }
        { renderLeftIcon ? renderLeftIcon() : <></> }
        {
          CheckTools.isNullOrEmpty(label) ?
            <View style={labelStyle} /> :
            <Text style={[
              themeStyles.labelText,
              {
                width: labelWidth,
                textAlign: labelAlign,
                color: themeContext.resolveThemeColor(disabled ? labelDisableColor : labelColor),
              },
              labelStyle,
            ]}>{ label + (colon ? ': ' : '') }</Text>
        }
      </RowView> }

      { /* 输入框区域 */ }
      <ColumnView flex={inputFlex}>
        <RowView align="center" style={themeStyles.inputWapper2}>
          { prefix }
          { renderLeftButton ? renderLeftButton() : <></> }
          {
            renderInput ?
              <FieldItemContext.Provider value={contextData}>
                {
                  React.cloneElement(renderInput(), {
                    //劫持子元素的数据更改事件
                    value: value,
                    onValueChange: onValueChange,
                    onFocus: onFocus,
                    onBlur: onBlur,
                    onFocusValid: onFocusValid,
                    onBlurValid: (v: unknown) => onBlurValid?.(instance, v),
                  })
                }
              </FieldItemContext.Provider> :
              <TextInput
                { ...props }
                ref={inputRef}
                style={[
                  themeStyles.input,
                  inputStyle,
                  (focused ? activeInputStyle : {}),
                  {
                    color: themeContext.resolveThemeColor(disabled ? inputDisableColor : (error ? errorTextColor : inputColor)),
                    textAlign: inputAlign,
                  },
                ]}
                placeholderTextColor={themeContext.resolveThemeColor(error ? errorTextColor : placeholderTextColor)}
                keyboardType={selectStyleType(type, 'text', {
                  text: 'default',
                  password: 'default',
                  number: 'number-pad',
                  decimal: 'decimal-pad',
                  tel: 'phone-pad',
                  email: 'email-address',
                }) || 'default'}
                secureTextEntry={type === 'password'}
                textContentType={selectStyleType(type, 'text', {
                  text: 'none',
                  password: 'password',
                  number: 'none',
                  decimal: 'none',
                  tel: 'telephoneNumber',
                  email: 'emailAddress',
                })}
                editable={disabled === true ? false : editable}
                value={value as string}
                onChangeText={onChangeText}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
              />
          }
          { suffix }
          { renderRightButton ? renderRightButton() : <></> }
          { showRightArrow ? <Icon key="rightArrow" icon="arrow-right" size={themeContext.getThemeVar('FieldRightArrowSize', 16)} {...rightArrowProps} /> : <></> }
        </RowView>
        { CheckTools.isNullOrEmpty(errorMessage) ? <></> : <Text style={themeStyles.errorMessage}>{errorMessage}</Text> }
        { showWordLimit ? renderWordLimit() : <></> }
      </ColumnView>

      { /* 清除按钮 */ }
      {
        (clearButton && (
          clearButtonMode === 'always'
          || (clearButtonMode === 'while-editing' && focused))
          || (clearButtonMode === 'unless-editing' && value !== '')
        ) ?
          <TouchableOpacity style={themeStyles.clearIcon} onPress={onClearHadler}>
            <Icon icon="delete-filling" color={themeContext.getThemeVar('FieldClearIconColor', Color.grey)} {...clearButtonProps}  />
          </TouchableOpacity> :
          <></>
      }
    </RowView>
  );



});

