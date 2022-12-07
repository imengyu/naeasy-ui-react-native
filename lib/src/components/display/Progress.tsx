import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Color } from '../../styles';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';
import { selectStyleType } from '../../utils/StyleTools';

type ProgressTypes = 'left-right'|'right-left'|'top-bottom'|'bottom-top';

export interface ProgressProp {
  /**
   * 当前进度，0-100
   */
  value: number,
  /**
   * 背景的颜色
   * @default Color.gray
   */
  backgroundColor?: ThemeColor,
  /**
   * 进度的颜色
   * @default Color.primary
   */
  progressColor?: ThemeColor,
  /**
   * 进度条的方向
   * * left-right 横向，从左到右
   * * right-left 横向，从右到左
   * * top-bottom 竖向，从上到下
   * * bottom-top 竖向，从下到上
   * @default 'left-right'
   */
  type?: ProgressTypes;
  /**
   * 进度条的高度，竖向模式时自动设置为高度
   */
  height?: number;
  /**
   * 进度条宽度，默认100%沾满父容器
   * @default '100%'
   */
  width?: number;
  /**
   * 是否显示进度文字
   */
  showProgressText?: boolean;
  /**
   * 进度文字的位置。center 居中；right 居右；flow 跟随进度
   * @default 'flow'
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
   * 是否是圆角
   * @default true
   */
  round?: boolean;
  /**
   * round=true 时的圆角大小
   * @default 10
   */
  radius?: number;
  /**
   * 是否有动画效果
   * @default false
   */
  animate?: boolean;
  /**
   * 动画效果时长，ms
   * @default 300
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
    width: DynamicVar('ProgressTextWidth', 40),
    textAlign: DynamicVar('ProgressTextAlign', 'center'),
    paddingVertical: DynamicVar('ProgressTextPaddingVertical', 2),
    paddingHorizontal: DynamicVar('ProgressTextPaddingHorizontal', 4),
    borderRadius: DynamicVar('ProgressTextBorderRadius', 10),
    fontSize: DynamicVar('ProgressTextFontSize', 12),
    color: DynamicVar('ProgressTextColor', '#fff'),
  },
});

/**
 * 进度条
 */
export function Progress(props: ProgressProp) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    type = 'left-right',
    progressPos = 'flow',
    width: barWidth = '100%',
    height = themeContext.getThemeVar('ProgressHeight', 5),
    animateDuration = themeContext.getThemeVar('ProgressAnimateDuration', 300),
    showProgressText = themeContext.getThemeVar('ProgressShowProgressText', false),
    animate = themeContext.getThemeVar('ProgressAnimate', false),
    round = themeContext.getThemeVar('ProgressRound', true),
    radius = themeContext.getThemeVar('ProgressRadius', 10),
    progressTextStyle,
  } = props;

  const value = Math.min(100, Math.max(props.value || 0, 0));
  const barColor = themeContext.resolveThemeColor(props.progressColor, themeContext.getThemeVar('ProgressProgressColor', Color.primary));
  const barBackgroundColor = themeContext.resolveThemeColor(props.backgroundColor, themeContext.getThemeVar('ProgressBackgroundColor', Color.grey));
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
    themeStyles.progress,
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
        themeStyles.view,
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
              themeStyles.progressText,
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
}
