import React, { createRef, useEffect, useState, useRef } from 'react';
import CheckTools from '../../utils/CheckTools';
import { Color, PressedColor } from '../../styles';
import { selectStyleType } from '../../utils/StyleTools';
import { Text, TextStyle, TouchableHighlight, View, ViewStyle, TextInput, Animated, StyleSheet } from 'react-native';
import { ColumnView } from '../layout/ColumnView';
import { NumberKeyBoard } from '../keyboard/NumberKeyBoard';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicColorVar, DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';

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
   * 数字位数
   * @default 6
   */
  numberCount?: number;
  /**
   * 是否是密码
   * @default false
   */
  isPassword?: boolean;
  /**
   * 是否在组件初始化时激活键盘
   * @default false
   */
  startFocus?: boolean;
  /**
   * 使用系统输入键盘，否则使用 NumberKeyBoard 作为输入键盘，默认是
   * @default true
   */
  useSystemInput?: boolean;
  /**
   * 输入框下方文字提示
   */
  info?: string;
  /**
   * 输入框格子之间的间距
   * @default 0
   */
  gutter?: number;
  /**
   * 是否自动调整宽度
   * @default false
   */
  autoSize?: boolean;
  /**
   * 格子的边框，默认box
   * @default 'box'
   */
  borderType?: NumberInputBorderType;
  /**
   * 格子的边框颜色
   * @default Color.border
   */
  borderColor?: ThemeColor;
  /**
   * 格子的边框宽度
   * @default 1.5
   */
  borderWidth?: number;
  /**
   * 已输入格子的边框颜色
   * @default Color.primary
   */
  activeBorderColor?: ThemeColor;
  /**
   * 格子样式
   */
  boxStyle?: ViewStyle;
  /**
   * 是否禁用点击打开键盘
   * @default false
   */
  disableKeyPad?: boolean;
  /**
   * 是显示输入闪烁光标
   * @default true
   */
  showCursur?: boolean;
  /**
   * 是否在输入完成后自动收起键盘
   * @default true
   */
  finishHideKeyPad?: boolean;
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
    justifyContent: 'center',
  },
  box: {
    position: 'relative',
    paddingVertical: DynamicVar('NumberInputBoxPaddingVertical', 10),
    paddingHorizontal: DynamicVar('NumberInputBoxPaddingHorizontal', 12),
    borderRadius: DynamicVar('NumberInputBoxBorderRadius', 10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: DynamicVar('NumberInputTextFontSize', 18),
    width: DynamicVar('NumberInputTextWidth', 20),
    textAlign: 'center',
    color: DynamicColorVar('NumberInputTextColor', Color.text),
  },
  info: {
    marginTop: DynamicVar('NumberInputInfoMarginTop', 5),
    textAlign: 'center',
    color: DynamicColorVar('NumberInputInfoColor', Color.textSecond),
  },
  errorMessage: {
    marginTop: DynamicVar('NumberInputErrorMessageMarginTop', 5),
    textAlign: 'center',
    color: DynamicColorVar('NumberInputErrorMessageColor', Color.danger),
  },
  invisibleInput: {
    opacity: 0,
    position: 'absolute',
    height: 1,
    left: -300,
  },
  inputCursor: {
    position: 'absolute',
    top: DynamicVar('NumberInputCursorLeft', '50%'),
    left: DynamicVar('NumberInputCursorLeft', '50%'),
    marginTop: DynamicVar('NumberInputCursorMarginTop', -9),
    width: DynamicVar('NumberInputCursorWidth', 1.5),
    marginLeft: DynamicVar('NumberInputCursorMarginLeft', -0.75),
    height: DynamicVar('NumberInputCursorHeight', 18),
    backgroundColor: DynamicColorVar('NumberInputCursorBackgroundColor', Color.text),
  },
});

/**
 * 一个数字输入框
 */
export function NumberInput(props: NumberInputProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    useSystemInput = true,
    numberCount = 6,
    isPassword = false,
    autoSize = false,
    disableKeyPad = false,
    startFocus = false,
    finishHideKeyPad = true,
    showCursur = true,
    borderType = themeContext.getThemeVar('NumberInputBorderType', 'box'),
    borderWidth = themeContext.getThemeVar('NumberInputBorderWidth', 1.5),
    gutter = themeContext.getThemeVar('NumberInputGutter', 2),
    borderColor = themeContext.getThemeVar('NumberInputBorderColor', Color.border),
    activeBorderColor = themeContext.getThemeVar('NumberInputActiveBorderColor', Color.primary),
    value,
    boxStyle,
    textStyle,
    info,
    errorMessage,
  } = props;

  const themeVars = themeContext.getThemeVars({
    NumberInputCursorShowAnimDuration: 400,
    NumberInputCursorHideAnimDuration: 400,
  });

  const valueArr = value.split('');
  const inputCursorFadeAnimValue = useRef(new Animated.Value(0)).current;
  const inputCursorFadeAnim = useRef(Animated.loop(Animated.sequence([
    Animated.timing(inputCursorFadeAnimValue, {
      toValue: 1,
      duration: themeVars.NumberInputCursorShowAnimDuration,
      useNativeDriver: true,
    }),
    Animated.timing(inputCursorFadeAnimValue, {
      toValue: 0,
      duration: themeVars.NumberInputCursorHideAnimDuration,
      useNativeDriver: true,
    }),
  ]))).current;

  let lastClickBoxRet = -1;
  const inputRef = createRef<TextInput>();
  const textShadow = useRef(value);
  const [ showInput, setShowInput ] = useState(startFocus);
  const [ isFocus, setIsFocus ] = useState(startFocus);

  function focusInput() {
    if (useSystemInput)
      inputRef.current?.focus();
    else
      setShowInput(true);
    setIsFocus(true);

    if (showCursur)
      inputCursorFadeAnim.start();
  }
  function blurInput() {
    if (useSystemInput)
      inputRef.current?.blur();
    else
      setShowInput(false);

    setIsFocus(false);

    if (showCursur)
      inputCursorFadeAnim.stop();
  }
  function onBlurInput() {
    setIsFocus(false);
  }

  useEffect(() => {
    if (startFocus) {
      focusInput();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ startFocus ]);

  function onInputChangeText(text: string) {
    //点击了前面的方格输入，需要清除方格后面的文字
    if (lastClickBoxRet >= 0 && text.length > lastClickBoxRet) {
      text = (text.substring(0, lastClickBoxRet) + text.charAt(text.length - 1));
      lastClickBoxRet = -1;
    }
    if (text.length > numberCount)
      return;

    props.onChangeText && props.onChangeText(text);
    props.onValueChange && props.onValueChange(text);

    textShadow.current = text;

    if (text.length === numberCount) {
      props.onEnterFinish && props.onEnterFinish(text);
      if (finishHideKeyPad)
        blurInput();
    }
  }
  function onBoxClicked(i: number) {
    lastClickBoxRet = i;
    focusInput();
  }

  function renderBoxs() {
    const arr = [] as JSX.Element[];
    for (let i = 0; i < numberCount; i++) {
      const valueThis = valueArr[i];
      const activeCurrent = (isFocus && (i === 0) || Boolean(valueArr[i - 1]));
      const active = Boolean(valueThis) || activeCurrent;

      const finalBoxStyle = selectStyleType<ViewStyle, NumberInputBorderType>(borderType, 'box', {
        box: {
          borderWidth,
          borderColor: themeContext.resolveThemeColor(active ? activeBorderColor : borderColor),
        },
        underline: {
          borderBottomWidth: borderWidth,
          borderColor: 'transparent',
          borderBottomColor: themeContext.resolveThemeColor(active ? activeBorderColor : borderColor),
          borderRadius: 0,
        },
      }) as ViewStyle;

      arr.push(
        <TouchableHighlight
          key={i}
          style={[
            themeStyles.box,
            {
              marginHorizontal: gutter,
              flex: autoSize ? 1 : undefined,
            },
            finalBoxStyle,
            boxStyle,
          ]}
          underlayColor={themeContext.resolveThemeColor(PressedColor(Color.white))}
          onPress={disableKeyPad ? undefined : () => onBoxClicked(i)}
        >
          <View>
            <Text style={[
              themeStyles.text,
              textStyle,
            ]}>{ valueThis ? (isPassword ? '●' : valueThis) : ' '}</Text>
            {
              !valueThis && activeCurrent && showCursur ?
                <Animated.View
                  style={[
                    themeStyles.inputCursor,
                    { opacity: inputCursorFadeAnimValue },
                  ]}
                /> :
                <></>
            }
          </View>
        </TouchableHighlight>
      );
    }
    return arr;
  }

  function onInput(str: string) {
    onInputChangeText(textShadow.current + str);
  }
  function onDelete() {
    onInputChangeText(textShadow.current.substring(0, textShadow.current.length - 1));
  }

  return (
    <ColumnView>
      <View style={[
        themeStyles.view,
        props.style,
      ]}>
        {renderBoxs()}
      </View>
      <TextInput
        style={themeStyles.invisibleInput}
        ref={inputRef}
        value={value}
        secureTextEntry={isPassword}
        keyboardType="number-pad"
        onChangeText={onInputChangeText}
        onBlur={onBlurInput}
      />
      { CheckTools.isNullOrEmpty(info) ? <></> : <Text style={themeStyles.info}>{info}</Text> }
      { CheckTools.isNullOrEmpty(errorMessage) ? <></> : <Text style={themeStyles.errorMessage}>{errorMessage}</Text> }

      <NumberKeyBoard
        show={showInput}
        onInput={onInput}
        onDelete={onDelete}
        onBlur={onBlurInput}
      />
    </ColumnView>
  );
}
