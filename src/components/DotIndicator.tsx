import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Color } from '../styles/ColorStyles';

/**
 * 指示器的参数
 */
interface DotIndicatorProp {
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
  size: number;
  /**
   * 指示器圆点激活时的颜色
   */
  activeColor?: string,
  /**
   * 指示器圆点的颜色
   */
  deactiveColor?: string,
  /**
   * 指示器圆点激活时的样式
   */
  activeDotStyle?: ViewStyle,
  /**
   * 指示器圆点的样式
   */
  dotStyle?: ViewStyle,
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
 * 一个显示圆点的指示器，不可操作
 */
export function DotIndicator(props: DotIndicatorProp) {
  const size = props.size || 10;
  const deactiveColor = props.deactiveColor || Color.grey;
  const activeColor = props.activeColor || Color.primary;

  return (
    <View style={styles.view}>
      { new Array(props.count).fill(0).map((_,index) =>
      <View key={index} style={index === props.currentIndex ? {
          width: size,
          height: size,
          backgroundColor: activeColor,
          ...styles.activeDot,
          ...props.activeDotStyle,
        } : {
          width: size,
          height: size,
          backgroundColor: deactiveColor,
          ...styles.dot,
          ...props.dotStyle,
        }}
      />) }
    </View>
  );
}
