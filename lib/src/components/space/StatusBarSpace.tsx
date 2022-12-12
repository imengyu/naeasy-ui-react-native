import React, { useEffect, useRef, useState } from "react";
import { isAndroid, isIOS } from "../../utils/PlatformTools";
import { NativeModules, StatusBar, StyleSheet, View } from "react-native";
import { ThemeColor, useThemeContext } from "../../theme/Theme";

const { StatusBarManager } = NativeModules;

interface StatusBarSpaceProps {
  /**
   * 背景颜色
   */
  backgroundColor?: ThemeColor;
  /**
   * 上方额外的背景颜色区域高度（dp），通常用于scrollview弹性下拉
   * @default 0
   */
  extendsBackgroundColorHeight?: number;
  /**
   * 自定义渲染
   */
  render?: JSX.Element;
  /**
   * 自定义渲染上方额外的背景颜色区域高度
   */
  renderExtendsBackground?: JSX.Element;
  /**
   * 是否包括状态栏高度
   * @default true
   */
  includeStatus?: boolean;
  /**
   * 是否包括标题栏高度
   * @default false
   */
  includeHeader?: boolean;
  /**
   * 自定义标题栏高度
   * @default 0
   */
  headerHeight?: number;
}

const style = StyleSheet.create({
  extendView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

/**
 * 状态栏和标题栏高度占位组件
 */
export function StatusBarSpace(props: StatusBarSpaceProps) {

  const themeContext = useThemeContext();
  const [ iOSStatusBarHeight, setIOSStatusBarHeight ] = useState(-1);

  let height = 0;
  if (props.includeStatus !== false) {
    height = isAndroid ? (StatusBar.currentHeight || 0) : iOSStatusBarHeight;
  }
  if (props.includeHeader === true) {
    height = props.headerHeight || 0;
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

  const extendsBackgroundColorHeight = props.extendsBackgroundColorHeight || 0;

  return (props.render ?
    props.render :
    <View style={{
      height,
      width: '100%',
      backgroundColor: themeContext.resolveThemeColor(props.backgroundColor),
    }}>
      { extendsBackgroundColorHeight > 0 ? (props.renderExtendsBackground ?
        props.renderExtendsBackground :
        <View style={[
          style.extendView,
          {
            top: -extendsBackgroundColorHeight,
            height: extendsBackgroundColorHeight,
            backgroundColor: themeContext.resolveThemeColor(props.backgroundColor),
          },
        ]} />
      ) : <></>  }
    </View>
  );
}
