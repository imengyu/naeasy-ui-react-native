import CheckTools from "../../utils/CheckTools";
import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { IconButton } from "../button/IconButton";
import { HorizontalScrollText } from "../typography/HorizontalScrollText";
import { Color } from "../../styles";
import { IconProp } from "../basic/Icon";
import { ThemeColor, useThemeContext } from "../../theme/Theme";
import { DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";

export type NavBarButtonTypes = 'back'|'menu'|'search'|'setting';

export interface NavBarProps {
  /**
   * 标题栏高度
   * @default 40
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
   * 标题对齐
   * @default 'center'
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
   * @default Color.black
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
   * 标题文字超出时，是否自动滚动
   * @default true
   */
  titleScroll?: boolean;
  /**
   * 图标透传样式
   */
  iconProps?: IconProp;
}

const style = StyleSheet.create({
  title: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: DynamicVar('NavBarTitleFontSize', 18),
    paddingHorizontal: DynamicVar('NavBarTitlePaddingHorizontal', 15),
  },
});

/**
 * 导航栏
 *
 * 为页面提供导航功能，常用于页面顶部。
 */
export function NavBar(props: NavBarProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(style);

  const {
    titleScroll = true,
    align = 'center',
    height = 40,
    showLeftButton = true,
    showRightButton = true,
    textColor = Color.black,
    leftButton,
    rightButton,
    renderLeft,
    renderRight,
    onLeftButtonPressed,
    onRightButtonPressed,
  } = themeContext.resolveThemeProps(props, {
    align: 'NavBarAlign',
    height: 'NavBarHeight',
    textColor: 'NavBarTitleColor',
  });

  function renderButtons(left: boolean) {
    const renderCustom = left ? renderLeft : renderRight;
    let button : string = (left ? leftButton : rightButton) || '';
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
          {...props.iconProps}
          onPress={left ? onLeftButtonPressed : onRightButtonPressed}
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
      themeStyles.title,
      {
        backgroundColor: themeContext.resolveThemeColor(props.backgroundColor),
        height: height,
        ...props.style,
      },
    ]}>
      { showLeftButton ? <View style={themeStyles.buttonWrapper}>{ renderButtons(true) }</View> : <></> }
      {
        props.title && (typeof props.title === 'string' ?
          (
            titleScroll ?
              <HorizontalScrollText
                style={{
                  flex: 1,
                }}
                textStyle={{
                  ...themeStyles.titleText,
                  ...props.titleStyle,
                  paddingHorizontal: 0,
                  color: themeContext.resolveThemeColor(textColor),
                }}
                scrollDuration={20000}
              >{props.title}</HorizontalScrollText> :
              <Text
                style={[
                  themeStyles.titleText,
                  props.titleStyle,
                  {
                    color: themeContext.resolveThemeColor(textColor),
                    textAlign: align,
                    flex: 1,
                  },
                ]}
              >{props.title}</Text>
          ) :
          props.title)
      }
      { showRightButton ? <View style={themeStyles.buttonWrapperEnd}>{ renderButtons(false) }</View> : <></> }
    </View>
  );
}
