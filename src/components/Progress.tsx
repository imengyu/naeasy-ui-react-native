import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { Color } from '../styles/ColorStyles';
import { selectStyleType } from '../utils/StyleTools';

type ProgressTypes = 'left-right'|'right-left'|'top-bottom'|'bottom-top';

export interface ProgressProp {
  /**
   * 当前进度，0-100
   */
  value: number,
  /**
   * 背景的颜色, 默认 gray
   */
  backgroundColor?: string,
  /**
   * 进度的颜色，默认 primary
   */
  progressColor?: string,
  /**
   * 进度条的方向
   * * left-right 横向，从左到右
   * * right-left 横向，从右到左
   * * top-bottom 竖向，从上到下
   * * bottom-top 竖向，从下到上
   */
  type?: ProgressTypes;
  /**
   * 进度条的高度，竖向模式时自动设置为高度
   */
  height?: number;
  /**
   * 进度条宽度，默认100%沾满父容器
   */
  width?: number;
  /**
   * 背景样式
   */
  style?: ViewStyle,
  /**
   * 是否是圆角，默认是
   */
  round?: boolean;
  /**
   * 是否有动画效果，默认否
   */
  animate?: boolean;
  /**
   * 动画效果时长，默认300ms
   */
  animateDuration?: number;
  /**
   * 进度的样式
   */
  progressStyle?: ViewStyle,
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    overflow: 'hidden',
  },
  progress: {
    position: 'absolute',
  },
});

/**
 * 进度条
 */
export function Progress(props: ProgressProp) {
  const type = props.type || 'left-right';
  const width = props.height || 10;
  const barWidth = props.width || '100%';
  const animateDuration = props.animateDuration || 300;

  const [ barRealWidth, setBarRealWidth ] = useState(0);
  const sideAnimValue = useRef(new Animated.Value(0)).current;
  const sideAnim = useRef<Animated.CompositeAnimation|null>();

  useEffect(() => {
    if (sideAnim.current)
      sideAnim.current.stop();
    if (props.animate) {
      sideAnim.current = Animated.timing(sideAnimValue, {
        toValue: (props.value / 100) * barRealWidth,
        duration: animateDuration,
        useNativeDriver: false,
      });
      sideAnim.current.start(() => { sideAnim.current = null; });
    } else {
      sideAnimValue.setValue((props.value / 100) * barRealWidth);
    }
    return () => {
      if (sideAnim.current) {
        sideAnim.current.stop();
        sideAnim.current = null;
      }
    };
  }, [ sideAnimValue, barRealWidth, animateDuration, props.value, props.animate ]);

  const progressStyles = {
    ...styles.progress,
    backgroundColor: props.progressColor || Color.primary,
    ...selectStyleType<ViewStyle, ProgressTypes>(type, 'left-right', {
      'left-right': { left: 0, height: width },
      'right-left': { right: 0, height: width },
      'top-bottom': { top: 0, width: width },
      'bottom-top': { bottom: 0, width: width },
    }),
  };

  return (
    <View style={{
      ...styles.view,
      ...selectStyleType<ViewStyle, ProgressTypes>(type, 'left-right', {
        'left-right': {
          height: width,
          width: barWidth,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
        },
        'right-left': {
          height: width,
          width: barWidth,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
        },
        'top-bottom': {
          width: width,
          height: barWidth,
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'flex-start',
        },
        'bottom-top': {
          width: width,
          height: barWidth,
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'flex-start',
        },
      }),
      borderRadius: props.round === false ? 0 : width,
      backgroundColor: props.backgroundColor || Color.grey,
      ...props.style,
    }} onLayout={(e) => setBarRealWidth(
      (typeof type === 'undefined' || type === 'left-right' || type === 'right-left') ?
        e.nativeEvent.layout.width :
        e.nativeEvent.layout.height)
    }>
      {
        (typeof type === 'undefined' || type === 'left-right' || type === 'right-left') ?
          <Animated.View style={[
            progressStyles,
            { width: sideAnimValue },
          ]} /> :
          <Animated.View style={[
            progressStyles,
            { height: sideAnimValue },
          ]} />
      }
    </View>
  );
}
