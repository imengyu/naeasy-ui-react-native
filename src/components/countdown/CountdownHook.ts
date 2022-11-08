import { splitMillSeconds } from "../../utils/TimeUtils";
import { useMemo, useRef, useState, useCallback } from "react";

interface CountDownComposeOptions {
  /**
   * 倒计时时长，单位毫秒
   */
  time: number,
  /**
   * 是否开启毫秒级渲染，默认否
   */
  millisecond?: boolean,
  /**
   * 倒计时改变时触发的回调函数
   */
  onChange?: (current: CurrentTime) => void,
  /**
   * 倒计时结束时触发的回调函数
   */
  onFinish?: () => void,
}
export interface CurrentTime {
  /**
   * 剩余总时间（单位毫秒）
   */
  total: number,
  /**
   * 剩余天数
   */
  days: number,
  /**
   * 	剩余小时
   */
  hours: number,
  /**
   * 剩余分钟
   */
  minutes: number,
  /**
   * 剩余秒数
   */
  seconds: number,
  /**
   * 剩余毫秒
   */
  milliseconds: number,
}

/**
 * 提供倒计时管理能力的 HOOK。
 * @param options 参数
 * @returns 返回一个对象，可以用于控制倒计时启停。
 */
export function useCountDown(options: CountDownComposeOptions) {
  const [ now, setNow ] = useState(options.time);

  const current = useMemo(() => {

    const {days,hours,minutes,seconds,milliseconds} = splitMillSeconds(now);

    return {
      total: now,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  }, [ now ]);

  const timer = useRef<number>(0);

  const checkCallback = useCallback((v: number) => {
    if (v <= 0) {
      //小于0，结束
      stop();
      setNow(0);
      options.onFinish && options.onFinish();
    }
    options.onChange && options.onChange(current);
  }, [ current, options ]);

  /**
   * 开始倒计时
   */
  function start() {
    if (timer.current <= 0) {
      const subTime = options.millisecond ? 40 : 1000;
      timer.current = setInterval(() => {
        setNow((prev) => {
          const nowValue = prev - subTime;
          checkCallback(nowValue);
          return nowValue;
        });
      }, subTime) as unknown as number;
    }
  }
  /**
   * 暂停倒计时
   */
  function stop() {
    if (timer.current > 0) {
      clearInterval(timer.current);
      timer.current = 0;
    }
  }
  /**
   * 重置倒计时，支持传入新的倒计时时长
   */
  function reset(time?: number) {
    setNow(time || options.time);
  }

  return {
    /**
     * 当前剩余的时间
     */
    current,
    now,
    start,
    stop,
    reset,
  };
}
