import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TextProps, Animated, Text } from "react-native";
import { RowView } from "../layout";

export interface VerticalScrollOneTextProps extends Omit<TextProps, 'children'> {
  /**
   * 文字
   */
  oneStr: string;
  /**
   * 动画时长
   * @default 230
   */
  animDuration?: number,
  /**
   * 动画方向
   * @default 'auto'
   */
  animDirection?: 'down'|'up'|'auto';
}
export interface VerticalScrollTextProps extends Omit<VerticalScrollOneTextProps, 'oneStr'> {
  /**
   * 文字字符串
   */
  numberString: string;
  /**
   * 居中
   * @default false
   */
  center?: boolean,
}
export interface VerticalScrollTextsProps extends Omit<VerticalScrollOneTextProps, 'oneStr'> {
  /**
   * 文字字符串
   */
  texts: string[];
  /**
   * 切换延时
   * @default 2000
   */
  interval: number;
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
 * 垂直滚动切换动画单个文字。默认是在 oneStr 更换时触发动画。
 */
export function VerticalScrollOneText(props: VerticalScrollOneTextProps) {

  const {
    oneStr,
    animDuration = 230,
    animDirection = 'auto',
  } = props;

  const [ textCurrent, setTextCurrent ] = useState(oneStr);
  const [ textNext, setTextNext ] = useState(oneStr);
  const [ textHeight, setTextHeight ] = useState(0);

  const oneStrPrev = useRef(oneStr);
  const noResetNext = useRef(false);

  const scrollAnimCurrent = useRef(new Animated.Value(0));
  const scrollAnimNext = useRef(new Animated.Value(-1000));
  const scrollAnimHandle = useRef<Animated.CompositeAnimation|null>();

  useEffect(() => {
    if (textHeight <= 0)
      return;

    //执行数字切换动画
    if (oneStrPrev.current !== oneStr) {
      setTextCurrent(oneStrPrev.current);
      setTextNext(oneStr);

      //停止之前动画
      if (scrollAnimHandle.current) {
        noResetNext.current = true;
        scrollAnimHandle.current.stop();
      }

      const isDown = animDirection === 'down' ||
        //根据数字自动判断应该往上还是往下
        (animDirection === 'auto' && oneStr.length === 1 && oneStrPrev.current > oneStr && oneStrPrev.current !== '9' && oneStr !== '0');

      //减小
      if (isDown) {
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

          if (noResetNext.current) {
            noResetNext.current = false;
            return;
          }
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
          if (noResetNext.current) {
            noResetNext.current = false;
            return;
          }
          //动画结束后重置位置
          scrollAnimCurrent.current.setValue(textHeight);
          scrollAnimNext.current.setValue(0);
        });
      }

      oneStrPrev.current = oneStr;
    }
  }, [ oneStr, textHeight, animDuration, animDirection ]);

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
 * 垂直滚动切换动画文字。默认是在 numberString 更换时触发动画。
 */
export function VerticalScrollText(props: VerticalScrollTextProps) {
  return (
    <RowView alignSelf={props.center ? 'center' : "flex-start"} center>
      { (props.numberString || '').split('').map((str, i) => <VerticalScrollOneText {...props} key={'VSCroll' + i} oneStr={str} />) }
    </RowView>
  );
}

/**
 * 垂直滚动切换动画文字（数组）
 */
export function VerticalScrollTexts(props: VerticalScrollTextsProps) {
  const {
    interval = 2000,
    texts,
  } = props;

  const currentIndex = useRef(0);
  const [ currentText, setCurrentText ] = useState(texts[0] || '');

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentText(texts[currentIndex.current]);
      currentIndex.current++;
      if (currentIndex.current >= texts.length)
        currentIndex.current = 0;
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [ interval, texts ]);

  return (
    <VerticalScrollOneText {...props} oneStr={currentText} />
  );
}
