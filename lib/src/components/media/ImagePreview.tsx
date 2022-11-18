import Portal from "../../portal";
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback } from "react";
import PagerView from "react-native-pager-view";
import { ActivityIndicator, Animated, BackHandler, GestureResponderEvent, PanResponder, PanResponderGestureState, Text, View, StyleSheet } from "react-native";
import { Color } from "../../styles/ColorStyles";
import { deviceWidth } from "../../utils";
import { LongPressGestureHandler, TapGestureHandler } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: Color.black.light,
  },
  pager: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  defaultIndicator: {
    backgroundColor: Color.mask.light,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
    color: Color.white.light,
    marginTop: 40,
  },
  imageZoomContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageZoomImage: {
    width: deviceWidth,
    height: 1,
    //backgroundColor: '#0f0',
  },
  imageZoomLoadingCon: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  absTouchView: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    //backgroundColor: '#F00',
    zIndex: 0,
  },
});

export interface ImagePreviewZoomProps{
  imageUrl: string,
  onLongPress: () => void;
  onEmitClose: () => void;
}
/**
 * 图片缩放组件。
 */
export function ImageZoomControl(props: ImagePreviewZoomProps) {

  const loadingOpacityValue = useRef(new Animated.Value(1));
  const [ imageHeightValue, setImageHeightValue ] = useState(1);
  const imageScaleValue = useRef(new Animated.Value(1));
  const imageScaleValueCurrent = useRef(1);
  const imagePositionValue = useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  const imagePositionValueCurrentX = useRef(1);
  const imagePositionValueCurrentY = useRef(1);

  //监听scale值和Position值
  imageScaleValue.current.addListener((v) => { imageScaleValueCurrent.current = v.value; });
  imagePositionValue.current.addListener((v) => {
    imagePositionValueCurrentX.current = v.x;
    imagePositionValueCurrentY.current = v.y;
  });
  useEffect(() => {
    const imageScaleValueV = imageScaleValue.current;
    const imagePositionValueV = imagePositionValue.current;
    return () => {
      if (imageScaleValueV)
        imageScaleValueV.removeAllListeners();
      if (imagePositionValueV)
        imagePositionValueV.removeAllListeners();
    };
  }, []);


  function checkPanGestureMove(evt: GestureResponderEvent, gestureState: PanResponderGestureState) {
    if ((gestureState.numberActiveTouches === 1 && imageScaleValueCurrent.current !== 1)
      || (imageScaleValueCurrent.current === 1 && (Math.abs(gestureState.dy) > 10 && Math.abs(gestureState.dx) < 5))
      || gestureState.numberActiveTouches === 2) {
      return true;
    } else {
      return false;
    }
  }

  const panScaleStartLen = useRef(0);
  const panPosStart = useRef({ x: 0, y: 0 });
  const panTouchStart = useRef({ x: 0, y: 0 });
  const panMoveCanClose = useRef(false);
  const panLastTouchCount = useRef(0);
  const imageSize = useRef({ x: 0, y: 0 });
  const containerSize = useRef({ x: 0, y: 0 });

  //todo: rewrite with React Native Gesture Handler
  //todo: 修改，换页后缩放重置

  const panResponder = useRef(PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: () => false,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: checkPanGestureMove,
    onMoveShouldSetPanResponderCapture: checkPanGestureMove,
    onPanResponderGrant: (evt, gestureState) => {
      const touch0 = evt.nativeEvent.touches[0];
      const touch1 = evt.nativeEvent.touches[1];

      if (gestureState.numberActiveTouches >= 1) {
        //移动之前设置下图片初始距离
        panPosStart.current.x = imagePositionValueCurrentX.current;
        panPosStart.current.y = imagePositionValueCurrentY.current;
      }

      //开始缩放时记录两指距离
      if (gestureState.numberActiveTouches >= 2) {
        panScaleStartLen.current = (Math.sqrt(Math.pow(touch0.pageX - touch1.pageX, 2) + Math.pow(touch0.pageY - touch1.pageY, 2)));
        //如果有两个点，则计算两个点的中点作为起始点
        panTouchStart.current.x = (touch0.pageX + touch1.pageX) / 2;
        panTouchStart.current.y = (touch0.pageY + touch1.pageY) / 2;
      }
      else {
        //否则使用单点
        panTouchStart.current.x = touch0.pageX;
        panTouchStart.current.y = touch0.pageY;
      }

      panLastTouchCount.current = gestureState.numberActiveTouches;
    },
    onPanResponderMove: (evt, gestureState) => {
      let scaleNow = imageScaleValueCurrent.current;
      if (panLastTouchCount.current === 1 && gestureState.numberActiveTouches >= 2) {
        const touch0 = evt.nativeEvent.touches[0];
        const touch1 = evt.nativeEvent.touches[1];
        //由一个点变两个点，再算一下两指距离
        panScaleStartLen.current = (Math.sqrt(Math.pow(touch0.pageX - touch1.pageX, 2) + Math.pow(touch0.pageY - touch1.pageY, 2)));
        //再算一下起始点
        panTouchStart.current.x = (touch0.pageX + touch1.pageX) / 2;
        panTouchStart.current.y = (touch0.pageY + touch1.pageY) / 2;
        panLastTouchCount.current = gestureState.numberActiveTouches;
        return;
      } else if (panLastTouchCount.current === 2 && gestureState.numberActiveTouches === 1) {
        const touch0 = evt.nativeEvent.touches[0];
        //由两个点变一个点，再算一下起始点
        panTouchStart.current.x = touch0.pageX;
        panTouchStart.current.y = touch0.pageY;
        panLastTouchCount.current = 1;
      }

      if (gestureState.numberActiveTouches === 2) {
        //现在两指距离-开始两指距离，算出缩放比率
        const touch0 = evt.nativeEvent.touches[0];
        const touch1 = evt.nativeEvent.touches[1];
        const nowLen = (Math.sqrt(Math.pow(touch0.pageX - touch1.pageX, 2) + Math.pow(touch0.pageY - touch1.pageY, 2)));
        const scale = (nowLen - panScaleStartLen.current) / 200;
        panScaleStartLen.current = nowLen;
        scaleNow = Math.max(Math.min(scaleNow + scale, 6),0.2 );//最小缩放到0.2 最大缩放到2

        imageScaleValue.current.setValue(scaleNow);
      }
      if (gestureState.numberActiveTouches >= 1) {
        if (scaleNow > 1) {
          let x = 0, y = 0;
          //如果有两个点，则计算两个点的中点作为点，否则使用单个点
          if (evt.nativeEvent.touches.length >= 2) {
            const touch0 = evt.nativeEvent.touches[0];
            const touch1 = evt.nativeEvent.touches[1];
            x = (touch0.pageX + touch1.pageX) / 2;
            y = (touch0.pageY + touch1.pageY) / 2;
          } else {
            const touch0 = evt.nativeEvent.touches[0];
            x = touch0.pageX;
            y = touch0.pageY;
          }
          //新的位移：手指移动距离+图片初始距离
          let finalPosX = x - panTouchStart.current.x + panPosStart.current.x;
          let finalPosY = y - panTouchStart.current.y + panPosStart.current.y;
          //判断，如果移动超出了图片宽高，则不许再移动
          const scaledWHalf = (imageSize.current.x * scaleNow / 2) - containerSize.current.x / 2;
          const scaledHHalf = containerSize.current.y / 2;
          if (finalPosX < -scaledWHalf) finalPosX = -scaledWHalf;
          if (finalPosX > scaledWHalf) finalPosX = scaledWHalf;
          if (finalPosY < -scaledHHalf) finalPosY = -scaledHHalf;
          if (finalPosY > scaledHHalf) finalPosY = scaledHHalf;

          imagePositionValue.current.setValue({
            x: finalPosX,
            y: finalPosY,
          });
        } else if (scaleNow === 1) {
          const touch0 = evt.nativeEvent.touches[0];
          //没有缩放的时候，下或者上拉拉可以关闭
          if (touch0) {
            //新的位移：手指移动距离+图片初始距离
            let finalPosY = touch0.pageY - panTouchStart.current.y + panPosStart.current.y;
            panMoveCanClose.current = Math.abs(touch0.pageY - panTouchStart.current.y) > 150;
            imagePositionValue.current.setValue({
              x: panPosStart.current.x,
              y: finalPosY,
            });
          }
        }
      }
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
      // 一般来说这意味着一个手势操作已经成功完成。
      //console.log('onPanResponderRelease', panLastTouchCount.current);

      if (panLastTouchCount.current === 1 && Math.abs(gestureState.dx) < 4 && Math.abs(gestureState.dy) < 4) {
        props.onEmitClose && props.onEmitClose();
      } else {
        if (imageScaleValueCurrent.current < 0.6) {
          //缩放太小，关闭
          props.onEmitClose && props.onEmitClose();
        } else if (imageScaleValueCurrent.current === 1) {
          //缩放==0，如果下拉上拉很大，则关闭，否则回弹
          if (panMoveCanClose.current)
            props.onEmitClose && props.onEmitClose();
          else
            Animated.timing(imagePositionValue.current, { toValue: { x: 0, y: 0 }, duration: 200, useNativeDriver: true }).start();
        }
        else if (imageScaleValueCurrent.current < 1.15) {
          //缩放小于0，动画回弹
          Animated.timing(imageScaleValue.current, { toValue: 1, duration: 200, useNativeDriver: true }).start();
          Animated.timing(imagePositionValue.current, { toValue: { x: 0, y: 0 }, duration: 200, useNativeDriver: true }).start();
        }
      }
    },
    onShouldBlockNativeResponder: () => true,
  }));

  return (
    <View
      style={styles.imageZoomContainer}
      onLayout={(e) => {
        containerSize.current = {
          x: e.nativeEvent.layout.width,
          y: e.nativeEvent.layout.height,
        };
      }}
    >
      <Animated.View pointerEvents="none" style={[styles.imageZoomLoadingCon, { opacity: loadingOpacityValue.current }]}>
        <ActivityIndicator color={Color.white.light} />
      </Animated.View>
      <LongPressGestureHandler onActivated={props.onLongPress}>
        <TapGestureHandler onActivated={props.onEmitClose}>
          <Animated.View style={styles.absTouchView} />
        </TapGestureHandler>
      </LongPressGestureHandler>
      <LongPressGestureHandler onActivated={props.onLongPress}>
        <Animated.Image
          { ...panResponder.current.panHandlers }
          resizeMode="contain"
          source={{ uri: props.imageUrl }}
          onLoad={(e) => {
            const height = deviceWidth / (e.nativeEvent.source.width / e.nativeEvent.source.height);
            setImageHeightValue(height);
            imageSize.current = {
              x: deviceWidth,
              y: height,
            };
          }}
          onLoadStart={() => loadingOpacityValue.current.setValue(1)}
          onLoadEnd={() => loadingOpacityValue.current.setValue(0)}
          style={[
            styles.imageZoomImage,
            {
              height: imageHeightValue,
              transform: [
                { translateX: imagePositionValue.current.x },
                { translateY: imagePositionValue.current.y },
                { scale: imageScaleValue.current },
              ],
            },
          ]}
        />
      </LongPressGestureHandler>
    </View>
  );
}

interface ImagePreviewIndicatorControlInstance {
  setCurrentIndex: (page: number) => void;
}
/**
 * 预览组件自定义内容渲染容器
 */
const ImagePreviewIndicatorControl = forwardRef<ImagePreviewIndicatorControlInstance, ImagePreviewControlProps>((props, ref) => {
  const [ currentIndex, setCurrentIndex ] = useState(props.selectIndex || 0);

  useImperativeHandle(ref, () => ({
    setCurrentIndex(page) {
      setCurrentIndex(page);
    },
  }));

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      { props.renderHeader && props.renderHeader() }
      { props.renderIndicator ?
        props.renderIndicator({ currentIndex: currentIndex + 1, count: props.imageUrls.length }) :
        <Text style={styles.defaultIndicator}>{currentIndex + 1}/{props.imageUrls.length}</Text>
      }
      { props.renderFooter && props.renderFooter() }
    </View>
  );
});

export interface ImagePreviewControlProps extends ImagePreviewOptions {
  onCloseAnimFnished: () => void;
}
/**
 * 图片预览分页组件，可以嵌入其他对话框中显示
 */
export function ImagePreviewControl(props: ImagePreviewControlProps) {

  const animFadeValue = useRef(new Animated.Value(0));
  const refIndicator = useRef<ImagePreviewIndicatorControlInstance>(null);

  //隐藏动画
  const doCloseAnim = useCallback(() => {
    Animated.timing(animFadeValue.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => props.onCloseAnimFnished());
  }, [ props ]);

  //显示动画
  useEffect(() => {
    Animated.timing(animFadeValue.current, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const backSubscription = BackHandler.addEventListener('hardwareBackPress', () => {
      doCloseAnim();
      return true;
    });

    return () => {
      backSubscription.remove();
    };
  }, [ doCloseAnim ]);


  function renderImages() {
    return props.imageUrls.map((url, i) => (
      <ImageZoomControl
        key={i}
        imageUrl={url}
        onLongPress={() => props.onLongPress?.(i, url)}
        onEmitClose={doCloseAnim}
      />
    ));
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: animFadeValue.current },
      ]}
    >
      <ImagePreviewIndicatorControl ref={refIndicator} { ...props } />
      <PagerView
        style={styles.pager}
        initialPage={props.selectIndex}
        orientation="horizontal"
        onPageSelected={(e) => refIndicator.current?.setCurrentIndex(e.nativeEvent.position)}
      >{ renderImages() }</PagerView>
    </Animated.View>
  );
}


export interface ImagePreviewOptions {
  imageUrls: string[],
  selectIndex?: number;
  renderIndicator?: (props: { currentIndex: number, count: number }) => JSX.Element,
  renderHeader?: () => JSX.Element,
  renderFooter?: () => JSX.Element,
  onLongPress?: (index: number, imageUrl: string) => void;
}

/**
 * 图片放大预览组件。
 */
export const ImagePreview = {
  /**
   * 显示图片放大预览组件
   */
  show(options: ImagePreviewOptions) {
    const key = Portal.add(
      <ImagePreviewControl
        { ...options }
        onCloseAnimFnished={() => {
          Portal.remove(key);
        }}
      />
    );
  },
};




