import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Color, ThemeColor, ThemeSelector } from '../../styles';
import { ThemeWrapper } from '../../theme/Theme';

/**
 * 指示器的参数
 */
export interface DotIndicatorProp {
  /**
   * 指示器的圆点个数
   */
  count: number,
  /**
   * 当前指示器
   */
  currentIndex: number,
  /**
   * 圆点大小，默认10
   */
  size?: number;
  /**
   * 指示器圆点激活时的颜色
   */
  activeColor?: ThemeColor,
  /**
   * 指示器圆点的颜色
   */
  deactiveColor?: ThemeColor,
  /**
   * 指示器圆点激活时的样式
   */
  activeDotStyle?: ViewStyle,
  /**
   * 指示器圆点的样式
   */
  dotStyle?: ViewStyle,
  /**
   * 容器的样式
   */
  containerStyle?: ViewStyle,
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  activeDot: {
    borderRadius: 5,
    marginRight: 4,
  },
  dot: {
    borderRadius: 5,
    marginRight: 4,
  },
});

/**
 * DotIndicator 实例
 */
export interface DotIndicatorInstance {
  setCount: (value: number) => void;
  setCurrent: (value: number) => void;
}
export type DotIndicatorStateControlProps = Omit<DotIndicatorProp, 'count'|'currentIndex'>;
/**
 * 包装 DotIndicator，此组件用于直接控制 DotIndicator 显示，通常是在一个复杂的轮播中，防止页码更改刷新整个组件，而是直接刷新 DotIndicator 。
 */
export const DotIndicatorStateControl = forwardRef<DotIndicatorInstance, DotIndicatorStateControlProps>((props, ref) => {

  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);

  useImperativeHandle(ref, () => ({
    setCount,
    setCurrent,
  }));
  return <DotIndicator {...props} count={count} currentIndex={current} />;
});

/**
 * 一个显示圆点的指示器，不可操作
 */
export const DotIndicator = ThemeWrapper(function (props: DotIndicatorProp) {
  const size = props.size || 8;
  const deactiveColor = props.deactiveColor || Color.grey;
  const activeColor = props.activeColor || Color.primary;

  return (
    <View style={[styles.view, props.containerStyle]}>
      { new Array(props.count).fill(0).map((_,index) =>
      <View key={index} style={index === props.currentIndex ? {
          width: size,
          height: size,
          backgroundColor: ThemeSelector.color(activeColor),
          ...styles.activeDot,
          ...props.activeDotStyle,
        } : {
          width: size,
          height: size,
          backgroundColor: ThemeSelector.color(deactiveColor),
          ...styles.dot,
          ...props.dotStyle,
        }}
      />) }
    </View>
  );
});
