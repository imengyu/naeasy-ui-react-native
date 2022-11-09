import React, { Component } from 'react';
import {
  Animated,
  View,
  I18nManager,
} from 'react-native';
import Swipeable, { SwipeableProps } from 'react-native-gesture-handler/Swipeable';

export interface SwipeableRowAction {
  /**
   * 渲染内容
   */
  renderAction: () => JSX.Element;
  /**
   * 侧滑按钮的宽度。默认64
   */
  width?: number,
}
export interface SwipeableRowProps extends Omit<SwipeableProps, 'renderRightActions'|'renderLeftActions'> {
  /**
   * 左边的侧滑按钮
   */
  leftActions: SwipeableRowAction[],
  /**
   * 右边的侧滑按钮
   */
  rightActions: SwipeableRowAction[],

  children?: JSX.Element|JSX.Element[];
}

/**
 * 可滑动行组件
 */
export class SwipeableRow extends Component<SwipeableRowProps> {

  private renderAction = (
    item: SwipeableRowAction,
    x: number,
    width: number,
    progress: Animated.AnimatedInterpolation
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View key={x} style={{ transform: [{ translateX: trans }], width: width }}>
        { item.renderAction() }
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    _dragAnimatedValue: Animated.AnimatedInterpolation
  ) => {
    let width = 0;
    this.props.rightActions.forEach((item) => { width += (item.width || 64); });

    return (<View
      style={{
        width: width,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {
        this.props.rightActions.map((item) => {
          const thisItemWidth = item.width || 64;
          const ele = this.renderAction(item, width, thisItemWidth, progress);
          width -= thisItemWidth;
          return ele;
        })
      }
    </View>);
  };
  private renderLeftActions = (
    progress: Animated.AnimatedInterpolation,
    _dragAnimatedValue: Animated.AnimatedInterpolation
  ) => {
    let width = 0;
    this.props.leftActions.forEach((item) => { width += (item.width || 64); });

    return (<View
      style={{
        width: width,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {
        this.props.leftActions.map((item) => {
          const thisItemWidth = item.width || 64;
          const ele = this.renderAction(item, -width, thisItemWidth, progress);
          width -= thisItemWidth;
          return ele;
        })
      }
    </View>);
  };

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };

  /**
   * 关闭已打开的操作
   */
  public close = () => {
    this.swipeableRow?.close();
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        enableTrackpadTwoFingerGesture
        renderRightActions={this.props.rightActions.length > 0 ? this.renderRightActions : undefined}
        renderLeftActions={this.props.leftActions.length > 0 ? this.renderLeftActions : undefined}
        {...this.props}
      >
        {children}
      </Swipeable>
    );
  }
}
