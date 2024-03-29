import StringTools from "../../utils/StringTools";
import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { TextProps } from "react-native";
import { Text } from "../typography/Text";
import { CurrentTime, useCountDown } from "./CountdownHook";

export interface CountDownProps extends TextProps {
  /**
   * 倒计时时长，单位毫秒
   * @default 0
   */
  time?: number;
  /**
   * 时间格式
   * @default 'HH:mm:ss'
   */
  format?: string;
  /**
   * 是否自动开始倒计时
   * @default true
   */
  autoStart?: boolean;
  /**
   * 是否开启毫秒级渲染
   * @default false
   */
  millisecond?: boolean;
  /**
   * 自定义渲染
   */
  renderText?: (time: CurrentTime) => JSX.Element;
  /**
   * 倒计时结束事件
   */
  onFinish?: () => void;
}

export interface CountDownInstance {
  start: () => void;
  stop: () => void;
  reset: (time?: number) => void;
}

/**
 * 倒计时组件。用于实时展示倒计时数值，支持毫秒精度。
 */
export const CountDown = forwardRef<CountDownInstance, CountDownProps>((props, ref) => {

  const countdown = useCountDown({
    time: props.time || 0,
    millisecond: props.millisecond || false,
    onFinish: props.onFinish,
  });

  useEffect(() => {
    countdown.reset(props.time);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ props.time ]);

  useEffect(() => {
    if (props.autoStart !== false)
      countdown.start();
    return () => {
      countdown.stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    start() { countdown.start(); },
    stop() { countdown.stop(); },
    reset(time) { countdown.reset(time); },
  }));

  function formatText() {
    let str = props.format ? props.format : "HH:mm:ss";
    str = str.replace(/DD/, StringTools.pad(countdown.current.days, 2));
    str = str.replace(/HH/, StringTools.pad(countdown.current.hours, 2));
    str = str.replace(/mm/, StringTools.pad(countdown.current.minutes, 2));
    str = str.replace(/ss/, StringTools.pad(countdown.current.seconds, 2));
    str = str.replace(/SSS/, StringTools.pad(countdown.current.milliseconds, 3));
    str = str.replace(/SS/, StringTools.pad(Math.floor(countdown.current.milliseconds / 10), 2));
    str = str.replace(/S/, Math.floor(countdown.current.milliseconds / 100).toString());
    return str;
  }

  return (
    props.renderText ?
      props.renderText(countdown.current) :
      <Text { ...props }>{formatText()}</Text>
  );
});
