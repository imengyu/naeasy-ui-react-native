import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TextProps, Animated, Text } from "react-native";
import { RowView } from "../layout";

export interface VerticalScrollOneNumberTextProps extends Omit<TextProps, 'children'> {
  /**
   * 文字
   */
  oneStr: string;
  /**
   * 动画时长。默认：230
   */
  animDuration?: number,
}
export interface VerticalScrollTextProps extends Omit<VerticalScrollOneNumberTextProps, 'oneStr'> {
  /**
   * 文字字符串
   */
  numberString: string;
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    overflow: 'hidden',
  },
  scrollText: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

/**
 * 垂直滚动切换动画单个文字
 */
export function VerticalScrollOneNumberText(props: VerticalScrollOneNumberTextProps) {

  const {
    oneStr,
    animDuration = 230,
  } = props;

  const [ textCurrent, setTextCurrent ] = useState(oneStr);
  const [ textNext, setTextNext ] = useState(oneStr);
  const [ textHeight, setTextHeight ] = useState(0);

  const oneStrPrev = useRef(oneStr);

  const scrollAnimCurrent = useRef(new Animated.Value(0));
  const scrollAnimNext = useRef(new Animated.Value(-100));
  const scrollAnimHandle = useRef<Animated.CompositeAnimation|null>();

  useEffect(() => {
    //执行数字切换动画
    if (oneStrPrev.current !== oneStr) {
      setTextCurrent(oneStrPrev.current);
      setTextNext(oneStr);

      //停止之前动画
      if (scrollAnimHandle.current)
        scrollAnimHandle.current.stop();

      //减小
      if (oneStrPrev.current > oneStr) {
        scrollAnimCurrent.current.setValue(0);
        scrollAnimNext.current.setValue(-textHeight);

        scrollAnimHandle.current = Animated.parallel([
          //往下移动的动画
          Animated.timing(scrollAnimCurrent.current, {
            useNativeDriver: true,
            toValue: textHeight,
            duration: animDuration,
          }),
          Animated.timing(scrollAnimNext.current, {
            useNativeDriver: true,
            toValue: 0,
            duration: animDuration,
          }),
        ]);
        scrollAnimHandle.current.start(() => {
          scrollAnimHandle.current = null;
          //动画结束后重置位置
          scrollAnimCurrent.current.setValue(-textHeight);
          scrollAnimNext.current.setValue(0);
        });
      }
      //增加
      else {
        scrollAnimCurrent.current.setValue(0);
        scrollAnimNext.current.setValue(textHeight);

        scrollAnimHandle.current = Animated.parallel([
          //往上移动的动画
          Animated.timing(scrollAnimCurrent.current, {
            useNativeDriver: true,
            toValue: -textHeight,
            duration: animDuration,
          }),
          Animated.timing(scrollAnimNext.current, {
            useNativeDriver: true,
            toValue: 0,
            duration: animDuration,
          }),
        ]);
        scrollAnimHandle.current.start(() => {
          scrollAnimHandle.current = null;
          //动画结束后重置位置
          scrollAnimCurrent.current.setValue(textHeight);
          scrollAnimNext.current.setValue(0);
        });
      }

      oneStrPrev.current = oneStr;
    }
  }, [ oneStr, textHeight, animDuration ]);

  const sourceStyle = props.style ? (props.style instanceof Array ? props.style : [ props.style ]) : [];

  return (
    <Animated.View
      style={styles.view}
      onLayout={(e) => {
        setTextHeight(e.nativeEvent.layout.height);
      }}
    >
      <Animated.Text
        { ...props }
        children={textCurrent}
        style={[
          styles.scrollText,
          ...sourceStyle,
          { transform: [ { translateY: scrollAnimCurrent.current } ] },
        ]}
      />
      <Animated.Text
        { ...props }
        children={textNext}
        style={[
          styles.scrollText,
          ...sourceStyle,
          { transform: [ { translateY: scrollAnimNext.current } ] },
        ]}
      />

      <Text
        { ...props }
        style={[
          { opacity: 0 },
          ...sourceStyle,
        ]}
        children={textNext}
      />
    </Animated.View>
  );
}

/**
 * 垂直滚动切换动画文字
 */
export function VerticalScrollText(props: VerticalScrollTextProps) {
  return (
    <RowView alignSelf="flex-start" center>
      { (props.numberString || '').split('').map((str, i) => <VerticalScrollOneNumberText {...props} key={'VSCroll' + i} oneStr={str} />) }
    </RowView>
  );
}

