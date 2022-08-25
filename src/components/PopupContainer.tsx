import React from 'react';
import { Animated, BackHandler, Easing, NativeEventSubscription, StyleSheet, ViewStyle, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Color } from '../styles/ColorStyles';
import { isAndroid } from '../utils/PlatformTools';
import { deviceHeight, deviceWidth } from '../utils/StyleConsts';
import { displayIf, selectStyleType, solveSize } from '../utils/StyleTools';
import { Iconfont } from './Iconfont';
import { RowView } from './layout/RowView';
import { SafeAreaMargin } from './space/SafeAreaMargin';

/**
 * 说明：
 * Popup 组件的主要实现容器。
 * 提供了 Popup 显示动画、显示位置、安全区等功能。
 * 你可以使用 Popup 组件来调用 Popup，不需要直接使用这个容器。
 */

/**
 * Popup 的显示位置
 */
export type PopupContainerPosition = 'center'|'top'|'bottom'|'left'|'right';
/**
 * Popup 关闭按钮显示位置
 */
export type PopupCloseButtonPosition = 'left'|'right';

export interface PopupContainerProps {
  /**
   * 渲染内容回调
   */
  renderContent: (close: () => void) => JSX.Element|JSX.Element[],
  /**
   * 弹窗关闭事件
   */
  onClose: () => void;

  onCloseAnimFinished?: () => void;
  /**
   * 是否显示当前弹窗
   */
  show: boolean;
  /**
   * 弹出层圆角
   */
  round?: boolean;
  /**
   * 是否可以点击遮罩关闭当前弹出层，同时会显示一个关闭按扭，默认否
   */
  closeable?: boolean;
  /**
   * 关闭按扭，如果设置false则不显示
   */
  closeIcon?: string|false;
  /**
   * 关闭按扭大小
   */
  closeIconSize?: number;
  /**
   * 关闭按扭位置
   */
  closeIconPosition?: PopupCloseButtonPosition,
  /**
   * 指定当前弹出层弹出位置
   */
  position?: PopupContainerPosition,
  /**
   * 遮罩的颜色
   */
  maskColor?: string,
  /**
   * 是否显示遮罩，默认是
   */
  mask?: boolean,
  /**
   * 弹出层背景颜色，默认是 白色
   */
  backgroundColor?: string;
  /**
   * 从侧边弹出时，是否自动设置安全区，默认是
   */
  safeArea?: boolean,
    /**
   * 指定当前弹出层的特殊样式
   */
  style?: ViewStyle,
  /**
   * 指定弹出层动画时长，毫秒
   */
  duration?: number,
  /**
   * 指定弹出层从侧边弹出的高度，如果是横向弹出，则设置宽度，默认是30%, 设置 auto 让大小自动根据内容调整
   */
  size?: string|number;
}
interface PopupContainerState {
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -200,
    paddingBottom: 200,
    zIndex: 110,
  },
  dialog: {
    position: 'relative',
    zIndex: 111,
    overflow: 'hidden',
  },
  dialogTitle: {
    zIndex: 110,
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

/**
 * Popup 组件的主要实现容器。你可以使用 Popup 组件来调用 Popup，不需要直接使用这个容器。
 */
export class PopupContainer extends React.PureComponent<PopupContainerProps, PopupContainerState> {

  state: Readonly<PopupContainerState> = {
  };

  anim: Animated.CompositeAnimation | null = null;
  animFadeValue = new Animated.Value(0);
  animScaleValue = new Animated.Value(0);
  animSideValue = new Animated.ValueXY({ x: 0, y: 0});

  _backHandlerEventSubscription: NativeEventSubscription | null = null;

  close() {
    const timing = Animated.timing;
    const { position } = this.props;
    const duration = this.props.duration || 400;

    this.animSideValue.setValue({ x: 0, y: 0});
    this.animScaleValue.setValue(1);
    this.animFadeValue.setValue(1);

    this.anim = Animated.parallel([
      timing(this.animFadeValue, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }),
      ...selectStyleType<Animated.CompositeAnimation[], PopupContainerPosition>(position, 'center', {
        top: [timing(this.animSideValue, {
          toValue: { x: 0, y: -deviceHeight},
          duration: duration,
          useNativeDriver: true,
        })],
        bottom: [timing(this.animSideValue, {
          toValue: { x: 0, y: deviceHeight * 2},
          duration: duration,
          useNativeDriver: true,
        })],
        left: [timing(this.animSideValue, {
          toValue: { x: -deviceWidth, y: 0},
          duration: duration,
          useNativeDriver: true,
        })],
        right: [timing(this.animSideValue, {
          toValue: { x: deviceHeight * 2, y: 0},
          duration: duration,
          useNativeDriver: true,
        })],
        center: [
          timing(this.animSideValue, {
            toValue: { x: 0, y: -10 },
            duration: duration,
            useNativeDriver: true,
          }),
          timing(this.animScaleValue, {
            toValue: 1.1,
            duration: duration,
            useNativeDriver: true,
          }),
        ],
      }),
    ]);
    this.anim.start(() => {
      if (this.props.onCloseAnimFinished)
        this.props.onCloseAnimFinished();
    });

    if (this._backHandlerEventSubscription) {
      this._backHandlerEventSubscription.remove();
      this._backHandlerEventSubscription = null;
    }
  }
  private callUpClose() {
    if (this.props.onClose)
      this.props.onClose();
  }

  componentDidMount() {
    const timing = Animated.timing;
    const { position } = this.props;
    const duration = this.props.duration || 350;
    const easing = Easing.bezier(0.28, 0.29, 0.1, 1);

    this.animFadeValue.setValue(0);
    this.animSideValue.setValue(selectStyleType(position, 'center', {
      center: { x: 0, y: -10},
      top: { x: 0, y: -deviceHeight},
      bottom: { x: 0, y: deviceHeight * 2},
      left: { x: -deviceWidth, y: 0},
      right: { x: deviceHeight * 2, y: 0},
    }));
    if (position === 'center')
      this.animScaleValue.setValue(1.3);
    else
      this.animScaleValue.setValue(1);

    this.anim = Animated.parallel([
      timing(this.animFadeValue, {
        toValue: 1,
        duration: duration + 100,
        useNativeDriver: true,
      }),
      ...selectStyleType<Animated.CompositeAnimation[], PopupContainerPosition>(position, 'center', {
        top: [timing(this.animSideValue, {
          toValue: { x: 0, y: 0 },
          duration: duration,
          useNativeDriver: true,
          easing,
        })],
        bottom: [timing(this.animSideValue, {
          toValue: { x: 0, y: 0 },
          duration: duration,
          useNativeDriver: true,
          easing,
        })],
        left: [timing(this.animSideValue, {
          toValue: { x: 0, y: 0 },
          duration: duration,
          useNativeDriver: true,
          easing,
        })],
        right: [timing(this.animSideValue, {
          toValue: { x: 0, y: 0 },
          duration: duration,
          useNativeDriver: true,
          easing,
        })],
        center: [
          timing(this.animSideValue, {
            toValue: { x: 0, y: 0 },
            duration: duration,
            useNativeDriver: true,
            easing,
          }),
          timing(this.animScaleValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
            easing,
          }),
        ],
      }),
    ]);
    this.anim.start();

    //监听安卓返回键
    if (isAndroid && this._backHandlerEventSubscription === null) {
      this._backHandlerEventSubscription = BackHandler.addEventListener('hardwareBackPress', () => {
        if (this.props.closeable)
          this.callUpClose();
        return true;
      });
    }
  }

  //渲染弹出层标题
  renderTitle(top: boolean) {
    const { closeable, closeIcon, closeIconPosition } = this.props;
    return (
      <RowView style={{
        ...styles.dialogTitle,
        top: top ? 0 : undefined,
        bottom: top ? undefined : 0,
        justifyContent: selectStyleType(closeIconPosition, 'right', { left: 'flex-start', right: 'flex-end' }),
        ...displayIf(closeable === true && closeIcon !== false),
      }}>
        {
          closeable === true && closeIcon !== false ?
          <TouchableOpacity onPress={() => this.callUpClose()}>
            <Iconfont icon={closeIcon || 'close'} size={this.props.closeIconSize || 25} />
          </TouchableOpacity> : <></>
        }
      </RowView>
    );
  }

  render(): React.ReactNode {
    const { position, maskColor, style, closeable, round } = this.props;
    const radius = round ? 10 : 0;
    const mask = this.props.mask !== false;
    const safeArea = this.props.safeArea !== false;
    const size = this.props.size || '10%';
    const backgroundColor = this.props.backgroundColor || Color.white;

    return (
      <View
        style={{
          ...styles.mask,
          ...selectStyleType(position, 'bottom', {
            center: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            top: {
              justifyContent: 'flex-start',
              alignItems: 'center',
            },
            bottom: {
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
            left: {
              alignItems: 'flex-start',
              justifyContent: 'center',
            },
            right: {
              alignItems: 'flex-end',
              justifyContent: 'center',
            },
          }),
        }}
        pointerEvents={mask ? 'auto' : 'box-none'}
      >
        { mask ? <Animated.View
          style={{
            ...styles.mask,
            opacity: this.animFadeValue,
            backgroundColor: maskColor || Color.mask,
          }}
          onTouchEnd={() => {
            if (closeable)
              this.callUpClose();
          }}
        /> : <></> }
        <Animated.View
          style={{
            ...styles.dialog,
            ...style,
            ...selectStyleType(position, 'bottom', {
              center: {
                flexDirection: 'row',
                borderRadius: radius,
              },
              top: {
                borderBottomLeftRadius: radius,
                borderBottomRightRadius: radius,
                width: deviceWidth,
                minHeight: solveSize(size),
              },
              bottom: {
                borderTopLeftRadius: radius,
                borderTopRightRadius: radius,
                width: deviceWidth,
                minHeight: solveSize(size),
              },
              left: {
                borderTopRightRadius: radius,
                borderBottomRightRadius: radius,
                height: deviceHeight,
                minWidth: solveSize(size),
              },
              right: {
                borderTopLeftRadius: radius,
                borderBottomLeftRadius: radius,
                height: deviceHeight,
                minWidth: solveSize(size),
              },
            }),
            backgroundColor: backgroundColor,
            transform: position !== 'center' && this.animSideValue ? [
              { translateX: this.animSideValue.x },
              { translateY: this.animSideValue.y },
            ] : [
              { scale: this.animScaleValue },
            ],
            opacity: position === 'center' ? this.animFadeValue : undefined,
          }}
        >
          <SafeAreaMargin
            top={safeArea && (position === 'top' || position === 'left' || position === 'right')}
            bottom={safeArea && (position === 'bottom' || position === 'left' || position === 'right')}>
            { position !== 'top' ? this.renderTitle(true) : <></> }
            { this.props.renderContent(() => this.callUpClose()) as JSX.Element }
            { position === 'top' ? this.renderTitle(false) : <></> }
          </SafeAreaMargin>
        </Animated.View>
      </View>
    );
  }
}
