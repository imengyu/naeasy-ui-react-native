import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Color } from '../../styles';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';

//TODO: 垂直模式
//TODO: 仿IOS长按操作

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
   * 圆点大小
   * @default 10
   */
  size?: number;
  /**
   * 指示器圆点激活时的颜色
   * @default Color.primary
   */
  activeColor?: ThemeColor,
  /**
   * 指示器圆点的颜色
   * @default Color.grey
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
    margin: DynamicVar('DotIndicatorMargin', 5),
  },
  dot: {
    borderRadius: DynamicVar('DotIndicatorDotRadius', 5),
    marginHorizontal: DynamicVar('DotIndicatorDotMarginHorizontal', 2),
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
export function DotIndicator(props: DotIndicatorProp) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    currentIndex,
    count,
    size = themeContext.getThemeVar('DotIndicatorSize', 8),
    deactiveColor = themeContext.getThemeVar('DotIndicatorDeactiveColor', Color.grey),
    activeColor = themeContext.getThemeVar('DotIndicatorActiveColor', Color.primary),
  } = props;

  return (
    <View style={[themeStyles.view, props.containerStyle]}>
      {
        new Array(count).fill(0).map((_,index) =>
          <View
            key={index}
            style={
              index === currentIndex ? [
                {
                  width: size,
                  height: size,
                  backgroundColor: themeContext.resolveThemeColor(activeColor),
                },
                themeStyles.dot,
                props.activeDotStyle,
              ] : [
                {
                  width: size,
                  height: size,
                  backgroundColor: themeContext.resolveThemeColor(deactiveColor),
                },
                themeStyles.dot,
                props.dotStyle,
              ]
            }
          />
        )
      }
    </View>
  );
}
