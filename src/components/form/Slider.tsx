import { Color } from "../../styles";
import CheckTools from "../../utils/CheckTools";
import React, { useRef } from "react";
import { GestureResponderEvent, LayoutChangeEvent, PanResponder, StyleSheet, View, ViewStyle } from "react-native";

export interface SliderProps {
  /**
   * 当前数值
   */
  value?: number;
  /**
   * 步长，默认：1
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
   * 最大值，默认：100
   */
  maxValue?: number;
  /**
   * 最小值，默认：0
   */
  minValue?: number;
  /**
   * 进度条高度，默认：5
   */
  barHeight?: number;
  /**
   * 滑块按钮大小，默认：20
   */
  buttonSize?: number;
  /**
   * 进度条激活态颜色，默认：primary
   */
  activeColor?: string;
  /**
   * 进度条非激活态颜色，默认：grey
   */
  inactiveColor?: string;
  /**
   * 滑块的样式
   */
  trackStyle?: ViewStyle;
  /**
   * 外层的样式
   */
  style?: ViewStyle;
  /**
   * 是否可以滑动，否则无法修改滑块的值，默认：true
   */
  touchable?: boolean;
  /**
   * 是否垂直展示，默认：false
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
    borderRadius: 2,
  },
  barActive: {
    position: 'absolute',
    borderRadius: 2,
  },
  track: {
    position: 'absolute',
    backgroundColor: Color.white,
    elevation: 2,
    shadowColor: Color.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
});

export function Slider(props: SliderProps) {

  const vertical = props.vertical === true;
  const barHeight = props.barHeight || 5;
  const buttonSize = props.buttonSize || 20;
  const inactiveColor = props.inactiveColor || Color.grey;
  const activeColor = props.activeColor || Color.primary;
  const maxValue = props.maxValue || 100;
  const minValue = props.minValue || 0;
  const step = props.step || 1;
  const value = Math.min(Math.max(minValue, CheckTools.returnDefinedValueOrdefault(props.value, 50)), maxValue);

  const conRef = useRef<View>(null);

  const barWidth = useRef(0);
  const barTop = useRef(0);
  const touch = props.touchable !== false;
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
      onStartShouldSetPanResponder: () => touch,
      onStartShouldSetPanResponderCapture: () => {
        //rn 的 locationY 似乎返回有点不对，只能通过触摸pageY-元素pageY，才能获取正确的位置
        conRef.current?.measure((frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
          barTop.current = pageY;
        });
        return touch;
      },
      onMoveShouldSetPanResponder: () => touch,
      onMoveShouldSetPanResponderCapture: () => touch,
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
        styles.barContainer,
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
        styles.bar,
        {
          opacity: touch ? 1 : 0.5,
          width: vertical ? barHeight : '100%',
          height: vertical ? '100%' : barHeight,
          backgroundColor: inactiveColor,
        },
      ]}>
        <View style={[
          styles.barActive,
          {
            opacity: touch ? 1 : 0.5,
            width: vertical ? barHeight : `${valuePos}%`,
            height: vertical ? `${valuePos}%` : barHeight,
            backgroundColor: activeColor,
          },
        ]} />
      </View>
      { props.renderButton ? props.renderButton(valuePos) : <View style={[
        styles.track,
        {
          opacity: touch ? 1 : 0.9,
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
