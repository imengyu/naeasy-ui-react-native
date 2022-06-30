import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableWithoutFeedback, View, ViewStyle, Animated } from "react-native";
import { Color } from "../../styles/ColorStyles";
import Feedback from "../tools/Feedback";

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
   * 开关的颜色
   */
  color?: string;
  /**
   * 开关的反色
   */
  inverseColor?: string;
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
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
  },
});

/**
 * 开关组件。用于在打开和关闭状态之间进行切换。
 */
export function Switch(props: SwitchProps) {

  const size = props.size || 30;
  const color = props.color || Color.primary;
  const inverseColor = props.inverseColor || Color.grey;
  const dotColor = props.dotColor || Color.white;
  const impactFeedback = props.impactFeedback !== true;
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
    if (impactFeedback)
      Feedback.impactSelectionFeedbackGenerator();
    props.onValueChange && props.onValueChange(!props.value);
  }

  const style = {
    width: size * 1.8,
    height: size,
    borderRadius: size / 2,
  } as ViewStyle;

  return (
    <TouchableWithoutFeedback
      style={{
        ...styles.toggleOut,
        ...style,
      }}
      onPress={change}
    >
      <View style={{
        backgroundColor: inverseColor,
        opacity: props.disabled ? 0.8 : 1,
        ...styles.toggleOutView,
        ...style,
      }}>
        <Animated.View
          style={[
            {
              backgroundColor: color,
              ...styles.toggleActiveColor,
            },
            {
              opacity: opacityAnim,
            },
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
          <View style={{
            ...styles.toggleDotInner,
            backgroundColor: dotColor,
            borderRadius: size / 2,
            width: size - dotPadding * 2,
            height: size - dotPadding * 2,
          }}>
            { props.loading ? <ActivityIndicator color={props.value ? color : inverseColor} /> : <></> }
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
