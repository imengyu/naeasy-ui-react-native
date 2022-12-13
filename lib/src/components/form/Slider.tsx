import CheckTools from "../../utils/CheckTools";
import React, { useRef } from "react";
import { GestureResponderEvent, LayoutChangeEvent, PanResponder, StyleSheet, View, ViewStyle } from "react-native";
import { Color } from "../../styles";
import { ThemeColor, useThemeContext } from "../../theme/Theme";
import { DynamicColorVar, DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";

export interface SliderProps {
  /**
   * 当前数值
   * @default 0
   */
  value?: number;
  /**
   * 步长
   * @default 1
   */
  step?: number;
  /**
   * 数值变化回调
   */
  onValueChange?: (value: number) => void;
  /**
   * 进度变化且结束拖动后触发
   */
  onEndChange?: (value: number) => void;
  /**
   * 最大值
   * @default 100
   */
  maxValue?: number;
  /**
   * 最小值
   * @default 0
   */
  minValue?: number;
  /**
   * 进度条高度
   * @default 5
   */
  barHeight?: number;
  /**
   * 滑块按钮大小
   * @default 20
   */
  buttonSize?: number;
  /**
   * 进度条激活态颜色
   * @default Color.primary
   */
  activeColor?: ThemeColor;
  /**
   * 进度条非激活态颜色
   * @default Color.grey
   */
  inactiveColor?: ThemeColor;
  /**
   * 滑块的样式
   */
  trackStyle?: ViewStyle;
  /**
   * 外层的样式
   */
  style?: ViewStyle;
  /**
   * 是否可以滑动，否则无法修改滑块的值
   * @default true
   */
  touchable?: boolean;
  /**
   * 是否垂直展示
   * @default false
   */
  vertical?: boolean;
  /**
   * 自定义渲染滑块按钮回调
   */
  renderButton?: (valuepos: number) => JSX.Element;
}

const styles = StyleSheet.create({
  barContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  bar: {
    position: 'relative',
    borderRadius: DynamicVar('SliderBarBorderRadius', 2),
  },
  barActive: {
    position: 'absolute',
    borderRadius: DynamicVar('SliderBarBorderRadius', 2),
  },
  track: {
    position: 'absolute',
    elevation: DynamicVar('SliderTrackElevation', 2),
    shadowColor: DynamicColorVar('SliderTrackShadowColor', Color.black),
    shadowOpacity: DynamicVar('SliderTrackShadowOpacity', 0.1),
    shadowOffset: DynamicVar('SliderTrackShadowOffset', { width: 0, height: 2 }),
  },
});

export function Slider(props: SliderProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    vertical = false,
    barHeight = 5,
    buttonSize = 20,
    inactiveColor = Color.grey,
    activeColor = Color.primary,
    maxValue = 100,
    minValue = 0,
    step = 1,
    touchable = true,
  } = themeContext.resolveThemeProps(props, {
    barHeight: 'SliderBarHeight',
    buttonSize: 'SliderTrackSize',
    inactiveColor: 'SliderInactiveColor',
    activeColor: 'SliderActiveColor',
  });

  const themeVars = themeContext.getThemeVars({
    SliderDisabledOpactity: 0.5,
    SliderTrackBackgroundColor: '#fff',
    SliderTrackDisabledBackgroundColor: '#eaeaea',
  });

  const value = Math.min(Math.max(minValue, CheckTools.returnDefinedValueOrdefault(props.value, 50)), maxValue);
  const conRef = useRef<View>(null);

  const barWidth = useRef(0);
  const barTop = useRef(0);
  const valuePos = Math.floor(((value - minValue) / (maxValue - minValue)) * 100);

  function onResponderMove(e: GestureResponderEvent) {
    //滑动是
    const pos = vertical ? (e.nativeEvent.pageY - barTop.current) : e.nativeEvent.locationX;
    let v = Math.floor(pos / barWidth.current * (maxValue - minValue) + minValue);
    v = Math.min(Math.max(minValue, v), maxValue);
    if (step > 1)
      v = Math.round(v / step) * step;
    if (v !== value)
      props.onValueChange && props.onValueChange(v);
    e.stopPropagation();
    return v;
  }
  function onLayout(e: LayoutChangeEvent) {
    //获取slider长度
    barWidth.current = vertical ?
      e.nativeEvent.layout.height :
      e.nativeEvent.layout.width;
  }

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => touchable,
      onStartShouldSetPanResponderCapture: () => {
        //rn 的 locationY 似乎返回有点不对，只能通过触摸pageY-元素pageY，才能获取正确的位置
        conRef.current?.measure((frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
          barTop.current = pageY;
        });
        return touchable;
      },
      onMoveShouldSetPanResponder: () => touchable,
      onMoveShouldSetPanResponderCapture: () => touchable,
      onPanResponderMove: (evt) => onResponderMove(evt),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt) => {
        const v = onResponderMove(evt);
        props.onEndChange && props.onEndChange(v);
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => true,
    })
  ).current;

  return (
    <View
      ref={conRef}
      style={[
        themeStyles.barContainer,
        {
          minHeight: vertical ? 100 : undefined,
          height: vertical ? undefined : Math.max(barHeight, buttonSize),
          width: vertical ? Math.max(barHeight, buttonSize) : '100%',
          ...props.style,
        },
      ]}
      onLayout={onLayout}
      pointerEvents="box-only"
      { ...panResponder.panHandlers }
      collapsable={false}
    >
      <View style={[
        themeStyles.bar,
        {
          opacity: touchable ? 1 : themeVars.SliderDisabledOpactity as number,
          width: vertical ? barHeight : '100%',
          height: vertical ? '100%' : barHeight,
          backgroundColor: themeContext.resolveThemeColor(inactiveColor),
        },
      ]}>
        <View style={[
          themeStyles.barActive,
          {
            opacity: touchable ? 1 : themeVars.SliderDisabledOpactity as number,
            width: vertical ? barHeight : `${valuePos}%`,
            height: vertical ? `${valuePos}%` : barHeight,
            backgroundColor: themeContext.resolveThemeColor(activeColor),
          },
        ]} />
      </View>
      { props.renderButton ? props.renderButton(valuePos) : <View style={[
        themeStyles.track,
        {
          backgroundColor: themeContext.resolveThemeColor((touchable ?
            themeVars.SliderTrackBackgroundColor :
            themeVars.SliderTrackDisabledBackgroundColor
          ) as string),
          left: vertical ? 0 : `${valuePos}%`,
          top: vertical ? `${valuePos}%` : 0,
          marginLeft: vertical ? 0 : (-buttonSize / 2) * (valuePos / 100),
          marginTop: vertical ? (-buttonSize / 2) * (valuePos / 100) : 0,
          borderRadius: buttonSize / 2,
          width: buttonSize,
          height: buttonSize,
          ...props.trackStyle,
        },
      ]} /> }
    </View>
  );
}
