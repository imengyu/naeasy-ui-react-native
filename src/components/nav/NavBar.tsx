import CheckTools from "../../utils/CheckTools";
import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { IconButton } from "../button/IconButton";
import { TextScrollable } from "../TextScrollable";
import { Color, ThemeColor, ThemeSelector } from "../../styles";
import { ThemeWrapper } from "../../theme/Theme";

export type NavBarButtonTypes = 'back'|'menu'|'search'|'setting';

export interface NavBarProps {
  /**
   * 标题栏高度，默认是 40dp
   */
  height?: number;
  /**
   * 左侧按钮
   */
  leftButton?: NavBarButtonTypes,
  /**
   * 标题文字，支持自定义元素
   */
  title?: string|JSX.Element,
  /**
   * 标题对齐，默认 center
   */
  align?: 'center'|'left',
  /**
   * 右侧按钮
   */
  rightButton?: NavBarButtonTypes,
  /**
   * 自定义渲染左侧按钮
   */
  renderLeft?: () => JSX.Element|JSX.Element[];
  /**
   * 自定义渲染右侧按钮
   */
  renderRight?: () => JSX.Element|JSX.Element[];
  /**
   * 右侧按钮点击事件
   */
  onRightButtonPressed?: () => void;
  /**
   * 左侧按钮点击事件
   */
  onLeftButtonPressed?: () => void;
  /**
   * 是否显示右侧按钮
   */
  showRightButton?: boolean;
  /**
   * 是否显示左侧按钮
   */
  showLeftButton?: boolean;
  /**
   * 自定义背景颜色
   */
  backgroundColor?: ThemeColor;
  /**
   * 自定义文字颜色
   */
  textColor?: ThemeColor;
  /**
   * 自定义样式
   */
  style?: ViewStyle;
  /**
   * 自定义标题文字样式
   */
  titleStyle?: TextStyle;
  /**
   * 标题文字超出时，是否自动滚动，默认 true
   */
  titleScroll?: boolean;
  /**
   * 图标字体名称
   */
  iconFontFamily?: string;
}

const style = StyleSheet.create({
  title: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f0',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height:  '100%',
  },
  buttonWrapperEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height:  '100%',
  },
  titleText: {
    fontSize: 18,
    paddingHorizontal: 15,
  },
});

/**
 * 导航栏
 *
 * 为页面提供导航功能，常用于页面顶部。
 */
export const NavBar = ThemeWrapper(function (props: NavBarProps) {
  const titleScroll = props.titleScroll !== false;
  const align = props.align || 'center';
  const showLeftButton = props.showLeftButton !== false;
  const showRightButton = props.showRightButton !== false;

  function renderButtons(left: boolean) {
    const renderCustom = left ? props.renderLeft : props.renderRight;
    let button : string = (left ? props.leftButton : props.rightButton) || '';
    switch (button) {
      case 'back': button = 'arrow-left-bold'; break;
      case 'menu': button = 'elipsis'; break;
      case 'search': button = 'search'; break;
      case 'setting': button = 'setting'; break;
    }
    const arr = [] as JSX.Element[];

    if (typeof renderCustom === 'function') {
      const ret = renderCustom();
      if (ret instanceof Array)
        arr.push(...ret);
      else
        arr.push(ret);
    }

    if (!CheckTools.isNullOrEmpty(button))
      arr.push(
        <IconButton
          key={button}
          icon={button}
          fontFamily={props.iconFontFamily}
          onPress={left ? props.onLeftButtonPressed : props.onRightButtonPressed}
          shape="square-full"
        />
      );
    else if (!left)
      arr.unshift(
        <IconButton
          key="space"
          shape="square-full"
        />
      );
    else
      arr.push(
        <IconButton
          key="space"
          shape="square-full"
        />
      );

    return arr;
  }

  return (
    <View style={[
      style.title,
      {
        backgroundColor: ThemeSelector.color(props.backgroundColor),
        height: props.height || 40,
        ...props.style,
      },
    ]}>
      { showLeftButton ? <View style={style.buttonWrapper}>{ renderButtons(true) }</View> : <></> }
      {
        props.title && (typeof props.title === 'string' ?
          (
            titleScroll ?
              <TextScrollable
                style={{
                  flex: 1,
                }}
                textStyle={{
                  ...style.titleText,
                  ...props.titleStyle,
                  paddingHorizontal: 0,
                  color: ThemeSelector.color(props.textColor || Color.black),
                }}
                scrollDuration={20000}
              >{props.title}</TextScrollable> :
              <Text
                style={[
                  style.titleText,
                  props.titleStyle,
                  {
                    color: ThemeSelector.color(props.textColor || Color.black),
                    textAlign: align,
                    flex: 1,
                  },
                ]}
              >{props.title}</Text>
          ) :
          props.title)
      }
      { showRightButton ? <View style={style.buttonWrapperEnd}>{ renderButtons(false) }</View> : <></> }
    </View>
  );
});
