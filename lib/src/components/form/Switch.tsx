import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableWithoutFeedback, View, ViewStyle, Animated } from "react-native";
import { Color, DynamicColor, StyleSheet, ThemeColor, ThemeSelector } from "../../styles";
import { FeedbackNative } from "../tools/Feedback";
import { ThemeWrapper } from "../../theme/Theme";
import { Switch as NativeSwitch } from 'react-native';

export interface SwitchProps {
  /**
   * 开关是否开启
   */
  value?: boolean;
  /**
   * 开关变化回调
   */
  onValueChange?: (value: boolean) => void;

  /**
   * 是否使用 RN 原生 Switch 组件
   */
  native?: boolean;
  /**
   * 开关的颜色
   */
  color?: ThemeColor;
  /**
   * 开关的反色
   */
  inverseColor?: ThemeColor;
  /**
   * 开关点的颜色
   */
  dotColor?: string;
  /**
   * 开关是否是加载中状态
   */
  loading?: boolean;
  /**
   * 开关是否禁用
   */
  disabled?: boolean;
  /**
   * 是否有触感反馈，默认是
   * @platform iOS
   */
  impactFeedback?: boolean;
  /**
   * 开关大小
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
    elevation: 4,
    shadowColor: DynamicColor(Color.black),
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
  },
});

/**
 * 开关组件。用于在打开和关闭状态之间进行切换。
 */
export const Switch = ThemeWrapper(function (props: SwitchProps) {

  const size = props.size || 30;
  const color = props.color || Color.primary;
  const inverseColor = props.inverseColor || Color.switch;
  const dotColor = props.dotColor || Color.white.light;
  const impactFeedback = props.impactFeedback !== true;
  const disabled = props.disabled === true;
  const dotPadding = 2;

  const [ opacityAnim ] = useState(new Animated.Value(0));
  const [ translateXAnim ] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacityAnim, {
      useNativeDriver: true,
      toValue: props.value ? 1 : 0,
      duration: 100,
    }).start();
    Animated.timing(translateXAnim, {
      useNativeDriver: true,
      toValue: props.value ? ((size * 1.8) - size) : 0,
      duration: 200,
    }).start();
  }, [ size, opacityAnim, translateXAnim, props.value ]);

  function change() {
    if (disabled === true || props.loading === true)
      return;
    if (impactFeedback)
      FeedbackNative.impactSelectionFeedbackGenerator();
    props.onValueChange && props.onValueChange(!props.value);
  }

  const style = {
    width: size * 1.8,
    height: size,
    borderRadius: size / 2,
  } as ViewStyle;

  return (
    props.native ?
      <NativeSwitch {...props} /> :
      <TouchableWithoutFeedback
        style={{
          ...styles.toggleOut,
          ...style,
        }}
        onPress={change}
      >
        <View style={[
          {
            backgroundColor: ThemeSelector.color(inverseColor),
            opacity: props.disabled ? 0.8 : 1,
          },
          styles.toggleOutView,
          style,
        ]}>
          <Animated.View
            style={[
              { backgroundColor: ThemeSelector.color(color) },
              styles.toggleActiveColor,
              { opacity: opacityAnim },
            ]}
          />
          <Animated.View
            style={[
              styles.toggleDot,
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
              styles.toggleDotInner,
              {
                backgroundColor: ThemeSelector.color(dotColor),
                borderRadius: size / 2,
                width: size - dotPadding * 2,
                height: size - dotPadding * 2,
              },
            ]}>
              { props.loading ? <ActivityIndicator color={ThemeSelector.color(props.value ? color : inverseColor)} /> : <></> }
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
  );
});
