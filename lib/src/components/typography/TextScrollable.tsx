import React, { useCallback, useEffect, useRef, useState } from 'react';
import MeasureText from '../../utils/MeasureText';
import { Animated, Easing, LayoutChangeEvent, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { isIOS } from '../../utils';
import { ThemeWrapper } from '../../theme/Theme';

export interface TextScrollableProps {
  children?: string;
  /**
   * 外围容器的样式
   */
  style?: ViewStyle;
  /**
   * 文字的自定义样式
   */
  textStyle?: TextStyle;
  /**
   * 是否滚动播放，默认是。
   */
  scroll?: boolean;
  /**
   * 滚动动画时长（毫秒），默认10000毫秒
   */
  scrollDuration?: number;
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    overflow: 'hidden',
  },
  text: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
    top: 0,
  },
});

/**
 * 可以滚动的文字组件。
 */
export const TextScrollable = ThemeWrapper(function (props: TextScrollableProps) {

  const [ mesuredTextWidth, setMesuredTextWidth ] = useState(300);
  const [ scrollParentWidth, setScrollParentWidth ] = useState(0);
  const scrollAnimValue = useRef(new Animated.Value(0));
  const scrollAnim = useRef<Animated.CompositeAnimation|null>(null);
  const scrollState = useRef(false);

  const scrollParentHeight = useRef(0);


  const stopScroll = useCallback(() => {
    scrollState.current = false;
    if (scrollAnim.current) {
      scrollAnim.current.stop();
      scrollAnim.current = null;
    }
  }, []);
  const startScroll = useCallback(() => {

    MeasureText.measureText({
      fontSize: props.textStyle?.fontSize || 14,
      text: props.children || '',
      height: scrollParentHeight.current,
    }).then((textWidth) => {

      //文字宽度没有超出外层，不需要滚动
      if (textWidth < scrollParentWidth) {
        stopScroll();
        setMesuredTextWidth(textWidth);
        scrollAnimValue.current.setValue(scrollParentWidth / 2 - textWidth / 2);
        //console.log('MeasureText noscroll', scrollParentWidth / 2 - textWidth / 2, textWidth);
        return;
      }

      scrollAnimValue.current.setValue(scrollParentWidth);
      scrollAnim.current = Animated.timing(scrollAnimValue.current, {
        toValue: -textWidth,
        duration: props.scrollDuration || 10000,
        useNativeDriver: true,
        easing: Easing.linear,
      });
      const startAnim = () => {
        if (scrollAnim.current) {
          scrollState.current = true;
          scrollAnim.current.start(() => {
            scrollAnimValue.current.setValue(scrollParentWidth);
            if (scrollState.current)
              startAnim();
          });
        }
      };
      //console.log('MeasureText scroll', textWidth);
      if (!scrollState.current)
        startAnim();

      setMesuredTextWidth(textWidth);
    });
  }, [ scrollParentWidth, props.children, props.scrollDuration, props.textStyle, stopScroll ]);


  useEffect(() => {
    if (props.scroll !== false) {
      setTimeout(() => startScroll(), 20);
    }
    return () => {
      stopScroll();
    };
  }, [ scrollParentWidth, props.scroll, stopScroll, startScroll ]);


  function onScrollParentLayout(e: LayoutChangeEvent) {
    setScrollParentWidth(e.nativeEvent.layout.width);
    scrollParentHeight.current = e.nativeEvent.layout.height;
  }

  return (
    <View
      onLayout={(e)=> onScrollParentLayout(e)}
      style={[
        styles.contentView,
        props.style,
        { minHeight: (props.textStyle?.fontSize || 14) + (isIOS ? 6 : 4) },
      ]}>
      <Animated.Text style={[
        styles.text,
        props.textStyle,
        { width: mesuredTextWidth + 20 },
        { transform: [{ translateX: scrollAnimValue.current }] },
      ]}>{props.children}</Animated.Text>
    </View>
  );
});
