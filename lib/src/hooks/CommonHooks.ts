import { useEffect } from "react";

/**
 * 类似于 componentDidMount 事件的hook
 * @param func 回调
 */
export function useDidMountEffect(func: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(func, []);
}

/**
 * 类似于 componentWillUnMount 事件的hook
 * @param func 回调
 */
export function useWillUnMountEffect(func: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => func, []);
}
