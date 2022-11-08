import StringTools from "../../utils/StringTools";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { TextProps } from "react-native";
import { Text } from "../typography/Text";

export interface CountToProps extends Omit<TextProps, 'children'> {
  /**
   * 开始值。默认：0
   */
  startValue?: number;
  /**
   * 结束值
   */
  endValue: number;
  /**
   * 持续时间。默认：3000
   */
  duration?: number;
  /**
   * 是否将数字转换为千分符。默认：否
   */
  thousand?: boolean;
}
export interface CountToInstance {
  restart: () => void;
}

/**
 * 数字滚动至指定数字组件
 */
export const CountTo = forwardRef<CountToInstance, CountToProps>((props, ref) => {

  const startValue = props.startValue || 0;
  const endValue = props.endValue;
  const thousand = props.thousand === true;
  const duration = props.duration || 3000;

  const [ valueNow, setValueNow ] = useState(0);
  const interval = useRef(0);
  const speed = useRef(0);

  const startAnim = useCallback(() => {
    if (interval.current > 0)
      clearInterval(interval.current);
    if (startValue < endValue) {
      //+
      interval.current = setInterval(() => {
        setValueNow((prev) => {
          if (prev >= endValue) {
            clearInterval(interval.current);
            interval.current = 0;
            return endValue;
          }
          return prev + speed.current;
        });
      }, 50) as unknown as number;
    } else {
      //-
      interval.current = setInterval(() => {
        setValueNow((prev) => {
          if (prev <= endValue) {
            clearInterval(interval.current);
            interval.current = 0;
            return endValue;
          }
          return prev - speed.current;
        });
      }, 50) as unknown as number;
    }
  }, [ endValue, startValue ]);

  useImperativeHandle(ref, () => ({
    restart() {
      setValueNow(startValue);
      startAnim();
    },
  }));

  useEffect(() => {
    setValueNow(startValue);
    startAnim();
    return () => {
      if (interval.current > 0)
        clearInterval(interval.current);
    };
  }, [ startValue, startAnim ]);

  useEffect(() => {
    speed.current = Math.max(1, Math.floor(Math.abs(startValue - endValue) / (duration / 50)));
  }, [ startValue, endValue, duration ]);

  return (
    <Text>{ thousand ? StringTools.numberWithCommas(valueNow.toFixed(2)) : valueNow }</Text>
  );
});
