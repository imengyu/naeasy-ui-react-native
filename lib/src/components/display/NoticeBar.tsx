import React, { useEffect, useState } from 'react';
import MeasureText from '../../utils/MeasureText';
import { Animated, Easing, ImageSourcePropType, ImageStyle, LayoutChangeEvent, StyleSheet, Text, TextStyle, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Icon, IconProp } from '../basic/Icon';
import { Color, ThemeUtils } from '../../styles';
import { RowView } from '../layout';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';
import { useRef } from 'react';
import { useCallback } from 'react';

export interface NoticeBarProps {
  /**
   * 左边的图标, 可以传入图片
   */
  icon?: string|ImageSourcePropType|undefined;
  /**
   * 图标或者图片的自定义样式
   */
  iconStyle?: ImageStyle|TextStyle;
  /**
   * 图标额外属性
   */
  iconProps?: IconProp;
  /**
   * 内容
   */
  content?: string;
  /**
   * 文字的自定义样式
   */
  textStyle?: TextStyle;
  /**
   * 背景颜色
   * @default ThemeUtils.makeAplhaColor(Color.warning, 0.15)
   */
  backgroundColor?: ThemeColor;
  /**
   * 文字颜色
   * @default Color.warning
   */
  textColor?: ThemeColor;
  /**
   * 是否滚动播放
   * @default true
   */
  scroll?: boolean;
  /**
   * 滚动动画时长（毫秒）
   * @default 100000
   */
  scrollDuration?: number;
  /**
   * 文字是否换行，仅在非滚动播放时生效
   * @default false
   */
  wrap?: boolean;
  /**
   * 是否显示关闭按钮。用户点击后会触发 `onClose` 事件，请自行处理 NoticeBar 的显示与否。
   * @default false
   */
  closeable?: boolean;
  /**
   * 自定义渲染左侧图标区域
   */
  renderLeft?: () => JSX.Element,
  /**
   * 自定义渲染右侧图标区域
   */
  renderRight?: () => JSX.Element,
  /**
   * 用户点击关闭时的回调
   */
  onClose?: () => void;
  /**
   * 用户点击时的回调
   */
  onPress?: () => void;
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    paddingHorizontal: DynamicVar('NoticeBarPaddingHorizontal', 10),
    paddingVertical: DynamicVar('NoticeBarPaddingVertical', 6),
    flexGrow: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  icon: {
    marginRight: DynamicVar('NoticeBarIconMarginRight', 5),
  },
  contentView: {
    flex: 1,
    overflow: 'hidden',
  },
});

/**
 * 通知栏组件。用于循环播放展示一组消息通知。
 */
export function NoticeBar(props: NoticeBarProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    content = '',
    icon = 'notification',
    iconProps,
    scroll = false,
    closeable = false,
    wrap = false,
    scrollDuration = themeContext.getThemeVar('NoticeBarScrollDuration', 10000),
    backgroundColor = themeContext.getThemeVar('NoticeBarBackgroundColor', ThemeUtils.makeAplhaColor(Color.warning, 0.15)),
    textColor = themeContext.getThemeVar('NoticeBarTextColor', Color.warning),
    textStyle = { fontSize: themeContext.getThemeVar('NoticeBarTextFontSize', 14) },
    renderLeft,
    renderRight,
    onClose,
    onPress,
  } = props;

  const [ mesuredTextWidth, setMesuredTextWidth ] = useState(0);
  const scrollParentWidth = useRef(0);
  const scrollParentHeight = useRef(0);

  const scrollAnimValue = useRef(new Animated.Value(0));
  const scrollAnim = useRef<Animated.CompositeAnimation|null>(null);

  const startScroll = useCallback(() => {

    //计算文字的宽度
    MeasureText.measureText({
      fontSize: textStyle.fontSize,
      text: content,
      height: scrollParentHeight.current,
    }).then((textWidth) => {

      //开始播放动画，从屏幕右边滚动至 -textWidth 位置。
      scrollAnimValue.current.setValue(scrollParentWidth.current);
      scrollAnim.current = Animated.timing(scrollAnimValue.current, {
        toValue: -textWidth,
        duration: scrollDuration,
        useNativeDriver: true,
        easing: Easing.linear,
      });
      const startAnim = () => {
        if (scrollAnim.current) {
          scrollAnim.current.start(() => {
            //动画结束后立即重新开始
            scrollAnimValue.current.setValue(scrollParentWidth.current);
            startAnim();
          });
        }
      };
      startAnim();
      setMesuredTextWidth(textWidth);
    });
  }, [ content, scrollDuration, textStyle ]);
  const stopScroll = useCallback(() => {
    if (scrollAnim.current) {
      scrollAnim.current.stop();
      scrollAnim.current = null;
    }
  }, []);

  useEffect(() => {
    if (scroll)
      startScroll();
    return () => {
      stopScroll();
    };
  }, [ scroll, startScroll, stopScroll ]);

  function onScrollParentLayout(e: LayoutChangeEvent) {
    //容器宽度获取
    scrollParentWidth.current = e.nativeEvent.layout.width;
    scrollParentHeight.current = e.nativeEvent.layout.height;
  }

  function renderLeftIcon() {
    if (typeof renderLeft === 'function')
      return renderLeft();
    return <Icon key="leftIcon" style={themeStyles.icon} color={textColor} icon={icon} {...iconProps} />;
  }
  function renderRightIcon() {
    if (typeof renderRight === 'function')
      return renderRight();
    return <></>;
  }
  function renderClose() {
    return (
      closeable ?
        <TouchableOpacity onPress={onClose}>
          <Icon key="closeIcon" icon="close" style={themeStyles.icon} color={textColor} />
        </TouchableOpacity> : <></>
    );
  }
  //渲染不会滚动的文字
  function renderText() {
    return (
      <Text numberOfLines={wrap ? undefined : 1} style={{
        width: 'auto',
        flex: 1,
        color: themeContext.resolveThemeColor(textColor),
        alignSelf: 'auto',
      }}>{content}</Text>
    );
  }
  //渲染会滚动的文字
  function renderScrollText() {
    return (
      <View onLayout={onScrollParentLayout} style={themeStyles.contentView}>
        <Text style={textStyle} />
        <Animated.Text style={{
          ...textStyle,
          position: 'absolute',
          left: 0,
          top: 0,
          width: mesuredTextWidth + 20,
          color: themeContext.resolveThemeColor(textColor),
          transform: [{ translateX: scrollAnimValue.current }],
        }}>{content}</Animated.Text>
      </View>
    );
  }

  return (
    <RowView touchable style={[
      styles.view,
      {
        backgroundColor: themeContext.resolveThemeColor(backgroundColor),
      },
    ]} onPress={onPress}>
      { renderLeftIcon() }
      { scroll ? renderScrollText() : renderText() }
      { renderRightIcon() }
      { renderClose() }
    </RowView>
  );
}
