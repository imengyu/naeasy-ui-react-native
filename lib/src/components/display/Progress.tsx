import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Color, ThemeColor, ThemeSelector } from '../../styles';
import { selectStyleType } from '../../utils/StyleTools';
import { ThemeWrapper } from '../../theme/Theme';

type ProgressTypes = 'left-right'|'right-left'|'top-bottom'|'bottom-top';

export interface ProgressProp {
  /**
   * 当前进度，0-100
   */
  value: number,
  /**
   * 背景的颜色, 默认 gray
   */
  backgroundColor?: ThemeColor,
  /**
   * 进度的颜色，默认 primary
   */
  progressColor?: ThemeColor,
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
   * 是否显示进度文字
   */
  showProgressText?: boolean;
  /**
   * 进度文字的位置。默认：flow
   * * center 居中
   * * right 居右
   * * flow 跟随进度
   */
  progressPos?: 'left'|'right'|'flow';
  /**
   * 进度文字的自定义样式
   */
  progressTextStyle?: TextStyle;
  /**
   * 背景样式
   */
  style?: ViewStyle,
  /**
   * 是否是圆角，默认是
   */
  round?: boolean;
  /**
   * round=true 时的圆角大小
   */
  radius?: number;
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
  },
  progress: {
    position: 'absolute',
  },
  progressText: {
    position: 'absolute',
    width: 40,
    textAlign: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 10,
    fontSize: 12,
    color: '#fff',
  },
});

/**
 * 进度条
 */
export const Progress = ThemeWrapper(function (props: ProgressProp) {
  const {
    type = 'left-right',
    progressPos = 'flow',
    width: barWidth = '100%',
    height = 5,
    animateDuration = 300,
    showProgressText = false,
    animate = false,
    round = true,
    radius = 10,
    progressTextStyle,
  } = props;

  const value = Math.min(100, Math.max(props.value || 0, 0));
  const barColor = ThemeSelector.color(props.progressColor || Color.primary);
  const barBackgroundColor = ThemeSelector.color(props.backgroundColor || Color.grey);
  const barRadius = round ? radius : height;
  const isHorizontal = (typeof type === 'undefined' || type === 'left-right' || type === 'right-left');

  const [ barRealWidth, setBarRealWidth ] = useState(0);
  const [ barTextRealWidth, setBarTextRealWidth ] = useState(0);
  const sideAnimValue = useRef(new Animated.Value(0)).current;
  const sideAnimProgressTextValue = useRef(new Animated.Value(0)).current;
  const sideAnim = useRef<Animated.CompositeAnimation|null>();

  useEffect(() => {
    if (sideAnim.current)
      sideAnim.current.stop();
    if (animate) {
      sideAnim.current = Animated.parallel([
        Animated.timing(sideAnimValue, {
          toValue: (value / 100) * barRealWidth,
          duration: animateDuration,
          useNativeDriver: false,
        }),
        Animated.timing(sideAnimProgressTextValue, {
          toValue: (value / 100) * barRealWidth - (value / 100) * barTextRealWidth,
          duration: animateDuration,
          useNativeDriver: false,
        }),
      ]);
      sideAnim.current.start(() => { sideAnim.current = null; });
    } else {
      sideAnimValue.setValue((value / 100) * barRealWidth);
      sideAnimProgressTextValue.setValue((value / 100) * barRealWidth - (value / 100) * barTextRealWidth);
    }
    return () => {
      if (sideAnim.current) {
        sideAnim.current.stop();
        sideAnim.current = null;
      }
    };
  }, [
    sideAnimValue, sideAnimProgressTextValue,
    barRealWidth, barTextRealWidth,
    animateDuration, value, animate,
  ]);

  const progressStyles = [
    styles.progress,
    {
      borderRadius: barRadius,
      backgroundColor: barColor,
    },
    selectStyleType<ViewStyle, ProgressTypes>(type, 'left-right', {
      'left-right': { left: 0, height: height },
      'right-left': { right: 0, height: height },
      'top-bottom': { top: 0, width: height },
      'bottom-top': { bottom: 0, width: height },
    }),
  ];

  return (
    <View
      style={[
        styles.view,
        selectStyleType<ViewStyle, ProgressTypes>(type, 'left-right', {
          'left-right': {
            height: height,
            width: barWidth,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
          },
          'right-left': {
            height: height,
            width: barWidth,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
          },
          'top-bottom': {
            width: height,
            height: barWidth,
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'flex-start',
          },
          'bottom-top': {
            width: height,
            height: barWidth,
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'flex-start',
          },
        }),
        {
          borderRadius: barRadius,
          backgroundColor: barBackgroundColor,
        },
        props.style,
      ]}
      onLayout={(e) => setBarRealWidth(
        isHorizontal ?
          e.nativeEvent.layout.width :
          e.nativeEvent.layout.height)
      }
    >
      {
        isHorizontal ?
          <Animated.View style={[
            ...progressStyles,
            { width: sideAnimValue },
          ]} /> :
          <Animated.View style={[
            ...progressStyles,
            { height: sideAnimValue },
          ]} />
      }
      {
        showProgressText ?
          <Animated.Text
            style={[
              styles.progressText,
              { backgroundColor: barColor },
              selectStyleType(progressPos, 'flow', {
                left: {
                  left: 0,
                },
                right: {
                  right: 0,
                },
                flow: {},
              }),
              progressTextStyle,
              {
                transform: progressPos === 'flow' ? (isHorizontal ?
                  [ { translateX: sideAnimProgressTextValue } ] :
                  [ { translateY: sideAnimProgressTextValue } ]) : [],
              },
            ]}
            onLayout={(e) => setBarTextRealWidth(
              isHorizontal ?
                e.nativeEvent.layout.width :
                e.nativeEvent.layout.height)
            }
          >{value}%</Animated.Text> :
          <></>
      }
    </View>
  );
});
