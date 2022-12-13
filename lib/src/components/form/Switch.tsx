import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableWithoutFeedback, View, ViewStyle, Animated, StyleSheet } from "react-native";
import { Color } from "../../styles";
import { FeedbackNative } from "../tools/Feedback";
import { Switch as NativeSwitch } from 'react-native';
import { ThemeColor, useThemeContext } from "../../theme/Theme";
import { DynamicColorVar, DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";

export interface SwitchProps {
  /**
   * 开关是否开启
   * @default false
   */
  value?: boolean;
  /**
   * 开关变化回调
   */
  onValueChange?: (value: boolean) => void;

  /**
   * 是否使用 RN 原生 Switch 组件
   * @default false
   */
  native?: boolean;
  /**
   * 开关的主颜色
   * @default Color.primary
   */
  color?: ThemeColor;
  /**
   * 开关的反色
   * @default Color.switch
   */
  inverseColor?: ThemeColor;
  /**
   * 开关点的颜色
   * @default Color.white.light
   */
  dotColor?: string;
  /**
   * 开关是否是加载中状态
   * @default false
   */
  loading?: boolean;
  /**
   * 开关是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否有触感反馈
   * @platform iOS
   * @default true
   */
  impactFeedback?: boolean;
  /**
   * 开关大小
   * @default 30
   */
  size?: number;
}

const styles = StyleSheet.create({
  toggleOut: {
    position: 'relative',
    overflow: 'hidden',
  },
  toggleOutView: {
    position: 'relative',
    overflow: 'hidden',
  },
  toggleActiveColor: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  toggleDot: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  toggleDotInner: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: DynamicVar('SwitchDotElevation', 4),
    shadowColor: DynamicColorVar('SwitchDotShadowColor', Color.black),
    shadowOffset: DynamicVar('SwitchDotShadowOffset', { width: 0, height: 1 }),
    shadowOpacity: DynamicVar('SwitchDotShadowOpacity', 0.3),
  },
});

/**
 * 开关组件。用于在打开和关闭状态之间进行切换。
 */
export function Switch(props: SwitchProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    size = 30,
    color = Color.primary,
    inverseColor = Color.switch,
    dotColor = Color.white.light,
    impactFeedback = true,
    disabled = false,
    loading = false,
    value = false,
    native = false,
    onValueChange,
  } = themeContext.resolveThemeProps(props, {
    size: 'SwitchSize',
    color: 'SwitchColor',
    inverseColor: 'SwitchInverseColor',
    dotColor: 'SwitchDotColor',
    impactFeedback: 'SwitchImpactFeedback',
  });

  const dotPadding = themeContext.getThemeVar('SwitchDotPadding', 2);
  const animDuration = themeContext.getThemeVar('SwitchAnimDuration', 200);

  const [ opacityAnim ] = useState(new Animated.Value(0));
  const [ translateXAnim ] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacityAnim, {
      useNativeDriver: true,
      toValue: value ? 1 : 0,
      duration: animDuration,
    }).start();
    Animated.timing(translateXAnim, {
      useNativeDriver: true,
      toValue: value ? ((size * 1.8) - size) : 0,
      duration: animDuration,
    }).start();
  }, [ animDuration, size, opacityAnim, translateXAnim, value ]);

  function change() {
    if (disabled === true || loading)
      return;
    if (impactFeedback)
      FeedbackNative.impactSelectionFeedbackGenerator();
    onValueChange && onValueChange(!value);
  }

  const style = {
    width: size * 1.8,
    height: size,
    borderRadius: size / 2,
  } as ViewStyle;

  return (
    native ?
      <NativeSwitch {...props} /> :
      <TouchableWithoutFeedback
        style={{
          ...themeStyles.toggleOut,
          ...style,
        }}
        onPress={change}
      >
        <View style={[
          {
            backgroundColor: themeContext.resolveThemeColor(inverseColor),
            opacity: disabled ? 0.8 : 1,
          },
          themeStyles.toggleOutView,
          style,
        ]}>
          <Animated.View
            style={[
              { backgroundColor: themeContext.resolveThemeColor(color) },
              themeStyles.toggleActiveColor,
              { opacity: opacityAnim },
            ]}
          />
          <Animated.View
            style={[
              themeStyles.toggleDot,
              {
                width: size,
                height: size,
              },
              {
                transform: [{
                  translateX: translateXAnim,
                }],
              },
            ]}
          >
            <View style={[
              themeStyles.toggleDotInner,
              {
                backgroundColor: themeContext.resolveThemeColor(dotColor),
                borderRadius: size / 2,
                width: size - dotPadding * 2,
                height: size - dotPadding * 2,
              },
            ]}>
              { loading ? <ActivityIndicator color={themeContext.resolveThemeColor(value ? color : inverseColor)} /> : <></> }
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
  );
}
