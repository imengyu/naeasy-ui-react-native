import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  I18nManager,
} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable, { SwipeableProps } from 'react-native-gesture-handler/Swipeable';
import { Color } from '../../styles/ColorStyles';

export interface SwipeableRightActionsRowAction {
  /**
   * 文字
   */
  text: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 文字颜色
   */
  textColor?: string;
  /**
   * 文字大小
   */
  textSize?: number;
  /**
   * 侧滑按钮的宽度。默认64
   */
  width?: number,
  /**
   * 按钮点击事件
   */
  onPress?: (close: () => void) => void;
  /**
   * 是否自动归位，默认是
   */
  autoBack?: boolean;
}
export interface SwipeableRightActionsRowProps extends Omit<SwipeableProps, 'renderRightActions'> {
  /**
   * 侧滑按钮
   */
  actions: SwipeableRightActionsRowAction[],

  children?: JSX.Element|JSX.Element[];
}

/**
 * 可滑动右侧操作的行组件
 */
export class SwipeableRightActionsRow extends Component<SwipeableRightActionsRowProps> {

  private renderRightAction = (
    item: SwipeableRightActionsRowAction,
    x: number,
    width: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      if (item.autoBack !== false)
        this.close();
      if (typeof item.onPress === 'function')
        item.onPress(this.close);
    };

    return (
      <Animated.View key={x} style={{ transform: [{ translateX: trans }], width: width }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: item.color }]}
          onPress={pressHandler}>
          <Text style={{
            ...styles.actionText,
            fontSize: item.textSize || 13,
            color: item.textColor || Color.white.light,
          }}>{item.text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => {
    let width = 0;
    this.props.actions.forEach((item) => { width += (item.width || 64); });

    return (<View
      style={{
        width: width,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {
        this.props.actions.map((item) => {
          const thisItemWidth = item.width || 64;
          const ele = this.renderRightAction(item, width, thisItemWidth, progress);
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
  private close = () => {
    this.swipeableRow?.close();
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        { ...this.props }
        ref={this.updateRef}
        friction={1}
        enableTrackpadTwoFingerGesture
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
