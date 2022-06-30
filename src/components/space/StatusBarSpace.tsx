import { NativeModules, StatusBar, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { isAndroid, isIOS } from "../../utils/PlatformTools";
import { useHeaderHeight } from '@react-navigation/elements';

const { StatusBarManager } = NativeModules;

interface StatusBarSpaceProps {
  /**
   * 是否包括状态栏高度，默认是
   */
  includeStatus?: boolean;
  /**
   * 是否包括标题栏高度，默认否
   */
  includeHeader?: boolean;
  /**
   * 自定义标题栏高度，默认从 react-navigation 获取高度
   */
  headerHeight?: number;
}

/**
 * 状态栏和标题栏高度占位组件
 */
export function StatusBarSpace(props: StatusBarSpaceProps) {
  const [ iOSStatusBarHeight, setIOSStatusBarHeight ] = useState(-1);
  const headerHeight = useHeaderHeight();

  let height = 0;
  if (props.includeStatus !== false) {
    height = isAndroid ? (StatusBar.currentHeight || 0) : iOSStatusBarHeight;
  }
  if (props.includeHeader === true) {
    height = props.headerHeight || headerHeight;
  }

  const isDestroying = useRef(false);

  useEffect(() => {
    if (isIOS && iOSStatusBarHeight === -1) {
      // 获取iOS状态栏高度
      StatusBarManager.getHeight((statusBarHeight: { height: number}) => {
        if (!isDestroying.current)
          setIOSStatusBarHeight(statusBarHeight.height);
      });
    }
    () => {
      isDestroying.current = true;
    };
  });

  return <View style={{ height }}/>;
}
