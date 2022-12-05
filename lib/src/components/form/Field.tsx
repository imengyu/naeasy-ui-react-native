import React from "react";
import CheckTools from "../../utils/CheckTools";
import { TextInputFocusEventData, View } from "react-native";
import { NativeSyntheticEvent } from "react-native";
import { Text, TextInput, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native";
import { Color, DynamicColor, StyleSheet, ThemeColor, ThemeSelector } from "../../styles";
import { selectStyleType } from "../../utils/StyleTools";
import { Icon } from "../basic/Icon";
import { ColumnView } from "../layout/ColumnView";
import { RowView } from "../layout/RowView";
import { Platform } from "react-native";
import { Form } from "./Form";
import { ThemeRender } from "../../theme/Theme";
import { rpx } from "../../utils";

export interface FieldProps extends Omit<TextInputProps, 'value'>, Omit<FormItemFieldProps, 'onBlurValid'> {
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
   */
  disabled?: boolean;
  /**
   * 是否内容垂直居中
   */
  center?: boolean;
  /**
   * 是否在 label 后面添加冒号
   */
  colon?: boolean;
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 是否显示表单必填星号
   */
  showRequiredBadge?: boolean;
  /**
   * 是否启用清除图标，点击清除图标后会清空输入框
   */
  clearButton?: boolean;
  /**
   * 左侧文本的宽度
   */
  labelWidth?: string|number;
  /**
   * 左侧文本对其
   */
  labelAlign?: 'left'|'center'|'right';
  /**
   * 左侧文本的flex占比，默认是2
   */
  labelFlex?: number;
  /**
   * 输入框的flex占比
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
   * 输入框文本对齐。默认： left
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
   * 输入内容格式化函数
   */
  formatter?: (text: string) => string;
  /**
   * 格式化函数触发的时机，可选值为 onBlur，默认是 onChangeText
   */
  formatTrigger?: 'onBlur'|'onChangeText';
  /**
   * 设置字段校验的时机
   * * onBlur 文本框失去焦点时校验
   * * onValueChange 数值更改时校验
   * * onSubmit 提交时校验(默认)
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
   * 是否显示字数统计，默认否
   */
  showWordLimit?: boolean;
  /**
   * 是否显左边标题，默认是
   */
  showLabel?: boolean;
  /**
   * 是否显右边箭头，默认 false
   */
  showRightArrow?: boolean;
  /**
   * 输入框自定义后缀
   */
  suffix?: JSX.Element;
  /**
   * 输入框前缀，这个前缀是显示在 label 后面，输入框前面
   */
  prefix?: JSX.Element;
  /**
   * 点击回调
   */
  onPress?: () => void;
  /**
   * 文字更改回调
   */
  onChangeText?: (text: string) => void;
  /**
   * 用于表单，失去焦点时验证回调
   */
  onBlurValid?: (instance: Field, text: unknown) => void;
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
 * 用于表单项的统一接口
 */
export interface FormItemFieldProps {
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
  onFocusValid?: (instance: Field) => void;
  /**
   * 用于表单，失去焦点时验证回调
   */
  onBlurValid?: (value: unknown) => void;
}

interface State {
  focused: boolean;
}

//TODO: 优化子组件的表单相关事件

const styles = StyleSheet.create({
  field: {
    paddingVertical: rpx(16),
    paddingHorizontal: rpx(32),
  },
  whiteItemField: {
    backgroundColor: DynamicColor(Color.white),
    borderBottomColor: DynamicColor(Color.background),
    borderBottomWidth: 1,
  },
  requiredMark: {
    fontSize: 14,
    alignSelf: 'flex-start',
    color: DynamicColor(Color.danger),
    ...Platform.select({
      android: {
        paddingVertical: 4,
      },
    }),
    marginHorizontal: 4,
  },
  labelText: {
    marginRight: 10,
    fontSize: 14,
    alignSelf: 'flex-start',
    ...Platform.select({
      android: {
        paddingVertical: 4,
      },
    }),
  },
  inputWapper2: {
    alignSelf: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  errorMessage: {
    fontSize: 12,
    color: DynamicColor(Color.danger),
    marginTop: 4,
  },
  wordLimitText: {
    fontSize: 12,
    color: DynamicColor(Color.textSecond),
    width: '100%',
    textAlign: 'right',
  },
  clearIcon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


/**
 * 表单条目组件
 */
export class Field extends React.Component<FieldProps, State> {

  state: Readonly<State> = {
    focused: false,
  };
  willUnmount = false;

  componentWillUnmount() {
    this.willUnmount = true;
  }

  /**
   * 获取输入框焦点
   */
  focus() {
    this.inputRef?.focus();
  }
  /**
   * 取消输入框焦点
   */
  blur() {
    this.inputRef?.blur();
  }
  /**
   * 清空输入框
   */
  clear() {
    this.inputRef?.clear();
  }
  /**
   * 返回值表明当前输入框是否获得了焦点。
   */
  isFocused() :boolean {
    return this.inputRef?.isFocused() || false;
  }

  inputRef : TextInput | null = null;

  emitChangeText = (text: string) => {
    if (this.props.onChangeText)
      this.props.onChangeText(text);
    if (this.props.onValueChange)
      this.props.onValueChange(text);
  };
  doFormatter(text: string) {
    const type = this.props.type || 'text';
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
    if (this.props.formatter)
      text = this.props.formatter(text);
    return text;
  }

  onChangeText = (text: string) => {
    if (this.props.formatTrigger !== 'onBlur') //格式化字符串
      text = this.doFormatter(text);
    this.emitChangeText(text);
  };
  onClear = () => {
    //清空按钮
    if (this.props.onClear) {
      if (this.props.onClear() !== true)
        this.emitChangeText('');
    }
    else
      this.emitChangeText('');
  };
  onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {

    if (this.props.formatTrigger === 'onBlur'){//格式化字符串
      const text = this.doFormatter(e.nativeEvent.text);
      this.emitChangeText(text);
    }

    this.props.onBlurValid && this.props.onBlurValid(this, e.nativeEvent.text);
    this.props.onBlur && this.props.onBlur(e);

    if (!this.willUnmount)
      this.setState({ focused: false });
  };
  onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {

    this.props.onFocusValid && this.props.onFocusValid(this);
    this.props.onFocus && this.props.onFocus(e);

    if (!this.willUnmount)
      this.setState({ focused: true });
  };

  renderWordLimit() {
    const { value, maxLength } = this.props;
    if (!this.props.renderInput && typeof value === 'string') {
      let wordString = value ? value.length : '0';
      if (maxLength)
        wordString += `/${maxLength}`;
      else
        wordString += `字`;
      return (
        <Text style={styles.wordLimitText}>{wordString}</Text>
      );
    }
    return <></>;
  }

  render(): React.ReactNode {
    const {
      label, labelColor = Color.text, labelDisableColor = Color.grey, labelFlex,
      inputDisableColor = Color.grey, inputColor = Color.text, inputFlex = 5,
      error = false, errorMessage, colon = true,
      fieldStyle = {}, activeFieldStyle = {}, labelStyle, inputStyle, activeInputStyle,
      required, center, showWordLimit, clearButton, clearButtonMode,
      labelWidth, labelAlign = "left", inputAlign = "left",
      type = "text",
      disabled = false, editable = true,
      showLabel = true, showRequiredBadge = true, showRightArrow = false,
      suffix, prefix,
      onPress, renderLeftIcon, renderRightButton, renderLeftButton,
    } = this.props;

    return (
      <ThemeRender>
        {() => (
          <RowView
            touchable={typeof onPress === 'function'} onPress={onPress}
            style={[ styles.field, fieldStyle, (this.state.focused ? activeFieldStyle : {}) ]}
            center={center}
          >
            { /* 左边的标签区域 */ }
            { (showLabel === false || (CheckTools.isNullOrEmpty(label) && !renderLeftIcon)) ? <></> : <RowView align="center" flex={labelFlex}>
              { required && showRequiredBadge ? <Text style={styles.requiredMark}>*</Text> : <></> }
              { renderLeftIcon ? renderLeftIcon() : <></> }
              {
                CheckTools.isNullOrEmpty(label) ?
                  <View style={labelStyle} /> :
                  <Text style={[
                    styles.labelText,
                    {
                      width: labelWidth,
                      textAlign: labelAlign || 'center',
                      color: ThemeSelector.color(disabled ? labelDisableColor : labelColor),
                    },
                    labelStyle,
                  ]}>{ label + (colon ? ': ' : '') }</Text>
              }
            </RowView> }

            { /* 输入框区域 */ }
            <ColumnView flex={inputFlex}>
              <RowView align="center" style={styles.inputWapper2}>
                { prefix }
                { renderLeftButton ? renderLeftButton() : <></> }
                {
                  this.props.renderInput ?
                    React.cloneElement(this.props.renderInput(), {
                      //劫持子元素的数据更改事件
                      value: this.props.value,
                      onValueChange: this.props.onValueChange,
                      onFocus: this.props.onFocus,
                      onBlur: this.props.onBlur,
                      onFocusValid: this.props.onFocusValid,
                      onBlurValid: (value: unknown) => this.props?.onBlurValid?.(this, value),
                    }) : <TextInput
                      ref={(input) => {this.inputRef = input;}}
                      style={[
                        styles.input,
                        inputStyle,
                        (this.state.focused ? activeInputStyle : {}),
                        {
                          color: ThemeSelector.color(disabled ? inputDisableColor : (error ? Color.danger : inputColor)),
                          textAlign: inputAlign,
                        },
                      ]}
                      placeholderTextColor={error ? ThemeSelector.color(Color.danger) : (this.props.placeholderTextColor || ThemeSelector.color(Color.textSecond) )}
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
                      { ...this.props }
                      value={this.props.value as string}
                      onChangeText={this.onChangeText}
                      onBlur={this.onBlur}
                      onFocus={this.onFocus}
                    />
                }
                { suffix }
                { renderRightButton ? renderRightButton() : <></> }
                { showRightArrow ? <Icon key="rightArrow" icon="arrow-right" size={16} /> : <></> }
              </RowView>
              { CheckTools.isNullOrEmpty(errorMessage) ? <></> : <Text style={styles.errorMessage}>{errorMessage}</Text> }
              { showWordLimit ? this.renderWordLimit() : <></> }
            </ColumnView>

            { /* 清除按钮 */ }
            {
              (clearButton && (
                clearButtonMode === 'always'
                || (clearButtonMode === 'while-editing' && this.state.focused))
                || (clearButtonMode === 'unless-editing' && this.props.value !== '')
              ) ?
                <TouchableOpacity style={styles.clearIcon} onPress={this.onClear}>
                  <Icon icon="delete-filling" color={Color.grey} />
                </TouchableOpacity> :
                <></>
            }
          </RowView>
        )}
      </ThemeRender>
    );
  }

  /**
   * 白底加边框的样式
   */
  static StyleWhiteItemField = styles.whiteItemField;
}

