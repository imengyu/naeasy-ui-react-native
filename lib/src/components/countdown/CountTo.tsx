import StringTools from "../../utils/StringTools";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { TextProps } from "react-native";
import { Text } from "../typography/Text";
import { VerticalScrollText } from "../typography/VerticalScrollNumberText";

export interface CountToProps extends Omit<TextProps, 'children'> {
  /**
   * 开始值
   * @default 0
   */
  startValue?: number;
  /**
   * 结束值
   */
  endValue: number;
  /**
   * 持续时间
   * @default 3000
   */
  duration?: number;
  /**
   * 是否将数字转换为千分符
   * @default false
   */
  thousand?: boolean;
  /**
   * 数字如果不足该位数，则在前面补0
   */
  numberCount?: number,
  /**
   * 保留小数位数
   * @default 0
   */
  decimalCount?: number,
  /**
   * 效果类型。默认：text
   * * text 普通文字切换效果
   * * scroller 文字上下滚动效果
   */
  type?: 'text'|'scroller';
}
export interface CountToInstance {
  restart: () => void;
}

/**
 * 数字滚动至指定数字组件
 */
export const CountTo = forwardRef<CountToInstance, CountToProps>((props, ref) => {

  const {
    startValue = 0,
    numberCount = 0,
    decimalCount = 0,
    endValue,
    thousand = false,
    duration = 3000,
    type = 'text',
  } = props;

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
      if (type === 'text') {
        setValueNow(startValue);
        startAnim();
      } else {
        setValueNow(startValue);
        setTimeout(() => setValueNow(endValue), 200);
      }
    },
  }));

  useEffect(() => {
    if (type === 'text') {
      setValueNow(startValue);
      startAnim();
    } else {
      setValueNow(endValue);
    }
    return () => {
      if (interval.current > 0) {
        clearInterval(interval.current);
        interval.current = 0;
      }
    };
  }, [ startValue, endValue, type, startAnim ]);

  useEffect(() => {
    speed.current = Math.max(1, Math.floor(Math.abs(startValue - endValue) / (duration / 50)));
  }, [ startValue, endValue, duration ]);

  //数字处理
  let valueString = decimalCount > 0 ? valueNow.toFixed(decimalCount) : valueNow.toString();
  if (valueString.length < numberCount)
    valueString = StringTools.pad(valueString, numberCount);

  //转为文字
  const finalString = (thousand ? StringTools.numberWithCommas(valueString) : valueString);

  if (type === 'scroller') {
    //上下滚动文字模式
    return <VerticalScrollText numberString={finalString} {...props} />;
  } else {
    //普通文字模式
    return <Text {...props}>{ finalString }</Text>;
  }
});


