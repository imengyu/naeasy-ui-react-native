import React, { createRef, useEffect, useState, useRef } from 'react';
import CheckTools from '../../utils/CheckTools';
import { Color, DynamicColor, DynamicThemeStyleSheet, PressedColor, ThemeColor, ThemeSelector } from '../../styles';
import { border, borderBottom, selectStyleType } from '../../utils/StyleTools';
import { Text, TextStyle, TouchableHighlight, View, ViewStyle, TextInput, Animated } from 'react-native';
import { ColumnView } from '../layout/ColumnView';
import { NumberKeyBoard } from '../keyboard/NumberKeyBoard';
import { ThemeWrapper } from '../../theme/Theme';

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
   * 是否在组件初始化时激活键盘，默认否
   */
  startFocus?: boolean;
  /**
   * 使用系统输入键盘，否则使用 NumberKeyBoard ，默认是
   */
  useSystemInput?: boolean;
  /**
   * 输入框下方文字提示
   */
  info?: string;
  /**
   * 输入框格子之间的间距，默认0
   */
  gutter?: number;
  /**
   * 是否自动调整宽度，默认否
   */
  autoSize?: boolean;
  /**
   * 格子的边框，默认box
   */
  borderType?: NumberInputBorderType;
  /**
   * 格子的边框颜色
   */
  borderColor?: ThemeColor;
  /**
   * 格子的边框宽度
   */
  borderWidth?: number;
  /**
   * 已输入格子的边框颜色，仅在underline模式下有效
   */
  activeBorderColor?: ThemeColor;
  /**
   * 格子样式
   */
  boxStyle?: ViewStyle;
  /**
   * 是否禁用点击打开键盘，默认否
   */
  disableKeyPad?: boolean;
  /**
   * 是显示输入闪烁光标，默认是
   */
  showCursur?: boolean;
  /**
   * 是否在输入完成后自动收起键盘，默认是
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


const styles = DynamicThemeStyleSheet.create({
  view: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    width: 18,
    textAlign: 'center',
    color: DynamicColor(Color.text),
  },
  info: {
    marginTop: 5,
    textAlign: 'center',
    color: DynamicColor(Color.textSecond),
  },
  errorMessage: {
    marginTop: 5,
    textAlign: 'center',
    color: DynamicColor(Color.danger),
  },
  invisibleInput: {
    opacity: 0,
    position: 'absolute',
    height: 1,
    left: -300,
  },
  inputCursor: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -9,
    width: 1.5,
    marginLeft: -0.75,
    height: 18,
    backgroundColor: DynamicColor(Color.text),
  },
});

/**
 * 一个数字输入框
 */
export const NumberInput = ThemeWrapper(function (props: NumberInputProps) {

  const {
    useSystemInput = true,
    numberCount = 6,
    isPassword = false,
    autoSize = false,
    disableKeyPad = false,
    startFocus = false,
    finishHideKeyPad = true,
    showCursur = true,
    borderType = 'box',
    borderWidth = 1.5,
    gutter = 2,
    borderColor = Color.border,
    activeBorderColor = Color.primary,
    value,
    boxStyle,
    textStyle,
  } = props;

  const valueArr = value.split('');
  const inputCursorFadeAnimValue = useRef(new Animated.Value(0)).current;
  const inputCursorFadeAnim = useRef(Animated.loop(Animated.sequence([
    Animated.timing(inputCursorFadeAnimValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }),
    Animated.timing(inputCursorFadeAnimValue, {
      toValue: 0,
      duration: 600,
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
          ...border(borderWidth, 'solid', active ? activeBorderColor : borderColor),
        },
        underline: {
          ...borderBottom(borderWidth, 'solid', active ? activeBorderColor : borderColor),
          borderRadius: 0,
        },
      }) as ViewStyle;

      arr.push(
        <TouchableHighlight
          key={i}
          style={[
            styles.box,
            {
              marginHorizontal: gutter,
              flex: autoSize ? 1 : undefined,
            },
            finalBoxStyle,
            boxStyle,
          ]}
          underlayColor={ThemeSelector.color(PressedColor(Color.white))}
          onPress={disableKeyPad ? undefined : () => onBoxClicked(i)}
        >
          <View>
            <Text style={[
              styles.text,
              textStyle,
            ]}>{ valueThis ? (isPassword ? '●' : valueThis) : ' '}</Text>
            {
              !valueThis && activeCurrent && showCursur ?
                <Animated.View
                  style={[
                    styles.inputCursor,
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
        styles.view,
        props.style,
      ]}>
        {renderBoxs()}
      </View>
      <TextInput
        style={styles.invisibleInput}
        ref={inputRef}
        value={props.value}
        secureTextEntry={isPassword}
        keyboardType="number-pad"
        onChangeText={onInputChangeText}
        onBlur={onBlurInput}
      />
      { CheckTools.isNullOrEmpty(props.info) ? <></> : <Text style={styles.info}>{props.info}</Text> }
      { CheckTools.isNullOrEmpty(props.errorMessage) ? <></> : <Text style={styles.errorMessage}>{props.errorMessage}</Text> }

      <NumberKeyBoard
        show={showInput}
        onInput={onInput}
        onDelete={onDelete}
        onBlur={onBlurInput}
      />
    </ColumnView>
  );
});
