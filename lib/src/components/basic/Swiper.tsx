import { ThemeColor } from '@imengyu/naeasy-ui-react-native';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, TranslateXTransform, TranslateYTransform, View, ViewProps, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { DotIndicatorInstance, DotIndicatorStateControl, DotIndicatorStateControlProps } from '../display';

export interface SwiperProps {
  /**
   * 是否显示面板指示点
   */
	indicatorDots?: boolean,
  /**
   * 指示点颜色
   */
  indicatorColor?: ThemeColor,
  /**
   * 指示点激活颜色
   */
  indicatorActiveColor?: ThemeColor,
  /**
   * 是否自动切换
   */
  autoplay?: boolean;
  /**
   * 当前所在滑块的 index
   */
  current?: number;
  /**
   * 自动切换时间间隔
   */
  interval?: number;
  /**
   * 滑动动画时长
   */
  duration?: number;
  /**
   * 	是否采用衔接滑动
   */
  circular?: boolean;
  /**
   * 滑动方向是否为纵向
   */
  vertical?: boolean;
  /**
   * 是否禁止用户手势操作
   */
  disableTouch?: boolean;
  /**
   * 子条目
   */
  children?: React.ReactElement<SwiperItemProps>[],
  /**
   * 自定义样式
   */
  style?: ViewStyle;
  /**
   * 自定义指示器组件
   */
  DotIndicatorComponent?: React.ComponentType<DotIndicatorStateControlProps>;
  /**
   * 当页码更改时发出事件
   */
  onPageChange?: (page: number) => void;
}
export interface SwiperItemProps extends ViewProps {
  translateX?: Animated.Value,
  translateY?: Animated.Value,
}
export interface SwiperInstance {
  /**
   * 上一页
   */
  nextPage: () => void;
  /**
   * 下一页
   */
  prevPage: () => void;
  /**
   * 切换页
   */
  switchPage: (page: number) => void;
}

/**
 * 仅可放置在swiper组件中，宽高自动设置为100%。
 */
export function SwiperItem(props: SwiperItemProps) {

  const transform = [] as Animated.WithAnimatedArray<TranslateXTransform|TranslateYTransform>;
  if (props.translateX)
    transform.push({ translateX: props.translateX });
  if (props.translateY)
    transform.push({ translateY: props.translateY });
  return (
    <Animated.View style={[
      styles.item,
      props.style,
      { transform: transform },
    ]} { ...props } />
  );
}
/**
 * 滑块视图容器
 */
export const Swiper = forwardRef<SwiperInstance, SwiperProps>((props, ref) => {

  const {
    children = [],
    current = 0,
    vertical = false,
    circular = false,
    autoplay = false,
    disableTouch = false,
    interval = 5000,
    duration = 200,
    style,
    indicatorDots = false,
    indicatorActiveColor,
    indicatorColor,
    DotIndicatorComponent = DotIndicatorStateControl,
    onPageChange,
  } = props;

  const [ animatedX, setAnimatedX ] = useState<Animated.Value[]>([]);
  const [ animatedY, setAnimatedY ] = useState<Animated.Value[]>([]);
  const [ width, setWidth ] = useState(0);
  const [ height, setHeight ] = useState(0);
  const currentIndex = useRef(current);
  const itemCount = useRef(0);
  const dotIndicator = useRef<DotIndicatorInstance>(null);
  const moveSize = vertical ? height : width;

  //构建动画数据

  useEffect(() => {
    if (width > 0 && height > 0 && itemCount.current !== children.length) {
      setAnimatedX(new Array(children.length).fill(null).map((_, i) => new Animated.Value(vertical ? 0 : (i === currentIndex.current ? 0 : width))));
      setAnimatedY(new Array(children.length).fill(null).map((_, i) => new Animated.Value(vertical ? (i === currentIndex.current ? 0 : height) : 0)));
      itemCount.current = children.length;
      dotIndicator.current?.setCount(itemCount.current);
    }
  }, [ children, width, height, vertical ]);

  const currentTransValue = useRef(0);

  //页码控制函数

  const getPage = useCallback((page: number) => {
    const index = currentIndex.current;
    const animated = vertical ? animatedY : animatedX;
    switch (page) {
      case -1:
        //上一页
        if (index > 0) return animated[index - 1];
        else if (circular && index !== 0) return animated[index - 1]; //循环情况下就从末尾开始
        break;
      case 0:
        //当前页
        return animated[index];
      case 1:
        //下一页
        if (index < itemCount.current - 1)
          return animated[index + 1];
        else if (circular && index !== 0) //循环情况下就从头开始
          return animated[0];
        break;
    }
    return null;
  }, [ animatedX, animatedY, circular, vertical ]);
  const pageChangeHandler = useCallback(() => {
    dotIndicator.current?.setCurrent(currentIndex.current);
    onPageChange?.(currentIndex.current);
  }, [ onPageChange ]);

  //换页控制函数

  const prevPage = useCallback((velocity?: number) => {

    if (!circular && currentIndex.current <= 0)
      return false;

    const animArray = [] as Animated.CompositeAnimation[];
    const prev = getPage(-1);
    const now = getPage(0);
    const next = getPage(1);
    const durationTimer = velocity ? (duration - (velocity / 2000) * (duration / 3)) : duration;

    //上一页 到 当前页 0
    if (prev) {
      if (!velocity)
        prev.setValue(moveSize);
      animArray.push(Animated.timing(prev, {
        toValue: 0,
        duration: durationTimer,
        useNativeDriver: true,
        easing: Easing.ease,
      }));
    }
    //当前页 到 下页 moveSize
    if (now) {
      animArray.push(Animated.timing(now, {
        toValue: moveSize,
        duration: durationTimer,
        useNativeDriver: true,
        easing: Easing.ease,
      }));
    }
    //下一页 到 下页 moveSize
    if (next) next.setValue(moveSize);

    if (currentIndex.current === 0)
      currentIndex.current = itemCount.current - 1; //循环时自动回到末尾
    else
      currentIndex.current = currentIndex.current - 1;

    pageChangeHandler();
    Animated.parallel(animArray).start();

    return true;
  }, [ circular, duration, getPage, moveSize, pageChangeHandler]);
  const nextPage = useCallback((velocity?: number) => {

    if (!circular && currentIndex.current >= itemCount.current - 1)
      return false;

    const animArray = [] as Animated.CompositeAnimation[];
    const prev = getPage(-1);
    const now = getPage(0);
    const next = getPage(1);
    const durationTimer = velocity ? (duration - (Math.abs(velocity) / 2000) * (duration / 3)) : duration;

    //上一页 到 -moveSize
    if (prev) prev.setValue(moveSize);

    //当前页 到 上页 -moveSize
    if (now) {
      animArray.push(Animated.timing(now, {
        toValue: -moveSize,
        duration: durationTimer,
        useNativeDriver: true,
        easing: Easing.ease,
      }));
    }
    //下一页 到 当前页 0
    if (next) {
      if (!velocity)
        next.setValue(moveSize);
      animArray.push(Animated.timing(next, {
        toValue: 0,
        duration: durationTimer,
        useNativeDriver: true,
        easing: Easing.ease,
      }));
    }

    if (currentIndex.current >= itemCount.current - 1)
      currentIndex.current = 0; //循环时自动回到起始
    else
      currentIndex.current = currentIndex.current + 1;

    pageChangeHandler();
    Animated.parallel(animArray).start();

    return true;
  }, [ circular, duration, getPage, moveSize, pageChangeHandler ]);
  const switchPage = useCallback((page?: number) => {
    const animArray = [] as Animated.CompositeAnimation[];


    if (typeof page !== 'undefined') {

      const left = page > currentIndex.current;
      const last = getPage(0);

      currentIndex.current = page;
      pageChangeHandler();

      const now = getPage(0);
      if (last) {
        animArray.push(Animated.timing(last, {
          toValue: left ? -moveSize : moveSize,
          duration: duration,
          useNativeDriver: true,
        }));
      }
      if (now) {
        now.setValue(left ? moveSize : -moveSize);
        animArray.push(Animated.timing(now, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }));
      }
    } else {
      const prev = getPage(-1);
      const now = getPage(0);
      const next = getPage(1);
      //上一页 到 上一页 -moveSize
      if (prev) {
        animArray.push(Animated.timing(prev, {
          toValue: -moveSize,
          duration: duration,
          useNativeDriver: true,
        }));
      }
      //当前页 到 0
      if (now) {
        animArray.push(Animated.timing(now, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }));
      }
      //下一页 到 下页 moveSize
      if (next) {
        animArray.push(Animated.timing(next, {
          toValue: moveSize,
          duration: duration,
          useNativeDriver: true,
        }));
      }
    }
    Animated.parallel(animArray).start();
  }, [ duration, getPage, moveSize, pageChangeHandler ]);

  //自动播放控制

  const autoPlayTimer = useRef(0);

  useEffect(() => {
    //清除之前定时器
    if (autoPlayTimer.current > 0) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = 0;
    }
    //设置切换定时器
    if (autoplay && interval > 0) {
      autoPlayTimer.current = setInterval(() => {
        if (currentIndex.current >= itemCount.current - 1 && !circular) switchPage(0);
        else nextPage();
      }, interval) as unknown as number;
    }

    return () => {
      if (autoPlayTimer.current > 0) {
        clearInterval(autoPlayTimer.current);
        autoPlayTimer.current = 0;
      }
    };
  }, [ circular, autoplay, interval, nextPage, switchPage ]);

  //监听传入页码更改

  useEffect(() => {
    if (currentIndex.current !== current)
      switchPage(current);
  }, [ current, switchPage ]);

  //外部公开函数

  useImperativeHandle(ref, () => ({
    prevPage,
    nextPage,
    switchPage,
  }));

  const gesture = Gesture.Pan()
    .maxPointers(1)
    .onUpdate((e) => {
      const prev = getPage(-1);
      const now = getPage(0);
      const next = getPage(1);
      if (vertical) {
        currentTransValue.current = e.translationY;
        if (e.translationY < 0 && !next)
          return;
        if (e.translationY > 0 && !prev)
          return;
        if (prev) prev.setValue(e.translationY - height);
        if (now) now.setValue(e.translationY);
        if (next) next.setValue(e.translationY + height);
      } else {
        currentTransValue.current = e.translationX;
        if (e.translationX < 0 && !next)
          return;
        if (e.translationX > 0 && !prev)
          return;
        if (prev) prev.setValue(e.translationX - width);
        if (now) now.setValue(e.translationX);
        if (next) next.setValue(e.translationX + width);
      }
    })
    .onEnd((e) => {
      const moved = currentTransValue.current;
      const velocity = vertical ? e.velocityY : e.velocityX;

      if ((moved < -moveSize / 4 || (moved < 0 && velocity > 500)) && nextPage(velocity)) {
        //右移
      } else if ((moved > moveSize / 4 || (moved > 0 && velocity > 500)) && prevPage(velocity)) {
        //左移
      } else {
        //回弹
        switchPage();
      }
    });

  if (vertical)
    gesture.activeOffsetY([ -2, 2 ]);
  else
    gesture.activeOffsetX([ -20, 20 ]);

  function renderChildren() {
    const result = [] as JSX.Element[];

    children.forEach((child, i) => (
      result.push(<SwiperItem
        key={child.key || i}
        translateX={animatedX[i]}
        translateY={animatedY[i]}
        { ...child.props }
      />)
    ));
    return result;
  }
  function renderInner() {
    return (
      <View
        style={[styles.container,style]}
        onLayout={(e) => {
          setWidth(e.nativeEvent.layout.width);
          setHeight(e.nativeEvent.layout.height);
        }}
      >
        { renderChildren() }
        { indicatorDots ? <DotIndicatorComponent ref={dotIndicator} activeColor={indicatorActiveColor} deactiveColor={indicatorColor} /> : <></> }
      </View>
    );
  }

  return (
    disableTouch ? renderInner() : <GestureDetector gesture={gesture}>{ renderInner() }</GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

