import React, { Component } from 'react';
import { Animated, Easing, EasingFunction, LayoutChangeEvent, NativeMethods, View, ViewStyle } from 'react-native';

interface CollapsibleProps {
  /**
   * 内容的对齐方式
   */
  align?: 'top'|'center'|'bottom';
  /**
   * 是否折叠子组件，默认为false
   */
  collapsed?: boolean;
  /**
   * 组件应折叠到哪个高度
   */
  collapsedHeight?: number;
  /**
   * 在折叠视图上是否启用点击事件，默认是
   */
  enablePointerEvents?: boolean;
  /**
   * 展开折叠的动画持续时间（毫秒），默认是300
   */
  duration?: number;
  /**
   * Function or function name from Easing (or tween-functions if < RN 0.8). Collapsible will try to combine Easing functions for you if you name them like tween-functions.
   * default: easeOutCubic
   */
  easing?: EasingFunction | undefined;
  /**
   * 是否在折叠的内容中渲染子对象，即使它不可见。默认是true
   */
  renderChildrenCollapsed?: boolean;
  /**
   * 容器附加的样式
   */
  style?: ViewStyle;
  /**
   * 切换动画完成时回调。有助于避免动画期间的繁重布局工作
   */
  onAnimationEnd?: () => void;

  children?: JSX.Element|JSX.Element[]|undefined,
}
interface CollapsibleState {
  measuring: boolean,
  measured: boolean,
  height: Animated.Value,
  contentHeight: number,
  animating: boolean,
}

/**
 * 可折叠展开组件
 */
export default class Collapsible extends Component<CollapsibleProps, CollapsibleState> {
  static defaultProps = {
    align: 'top',
    collapsed: true,
    collapsedHeight: 0,
    enablePointerEvents: false,
    duration: 300,
    onAnimationEnd: () => null,
    renderChildrenCollapsed: true,
  };

  unmounted = false;

  constructor(props: CollapsibleProps) {
    super(props);
    this.state = {
      measuring: false,
      measured: false,
      height: new Animated.Value(props.collapsedHeight || 0),
      contentHeight: 0,
      animating: false,
    };
  }

  componentDidUpdate(prevProps: CollapsibleProps) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this.setState({ measured: false }, () =>
        this._componentDidUpdate(prevProps)
      );
    } else {
      this._componentDidUpdate(prevProps);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  _componentDidUpdate(prevProps: CollapsibleProps) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this._toggleCollapsed(this.props.collapsed || false);
    } else if (
      this.props.collapsed &&
      prevProps.collapsedHeight !== this.props.collapsedHeight
    ) {
      this.state.height.setValue(this.props.collapsedHeight || 0);
    }
  }

  contentHandle: View|Animated.LegacyRef<View>|null = null;

  _handleRef = (ref: View | Animated.LegacyRef<View> | null) => {
    this.contentHandle = ref;
  };

  _measureContent(callback: (height: number) => void) {
    this.setState(
      {
        measuring: true,
      },
      () => {
        requestAnimationFrame(() => {
          if (!this.contentHandle) {
            this.setState(
              {
                measuring: false,
              },
              () => callback(this.props.collapsedHeight || 0)
            );
          } else {
            let ref;
            if (typeof (this.contentHandle as NativeMethods).measure === 'function') {
              ref = this.contentHandle;
            } else {
              ref = (this.contentHandle as Animated.LegacyRef<View>).getNode();
            }
            (ref as NativeMethods).measure((x: number, y: number, width: number, height: number) => {
              this.setState(
                {
                  measuring: false,
                  measured: true,
                  contentHeight: height,
                },
                () => callback(height)
              );
            });
          }
        });
      }
    );
  }

  _toggleCollapsed(collapsed: boolean) {
    if (collapsed) {
      this._transitionToHeight(this.props.collapsedHeight || 0);
    } else if (!this.contentHandle) {
      if (this.state.measured) {
        this._transitionToHeight(this.state.contentHeight);
      }
      return;
    } else {
      this._measureContent((contentHeight) => {
        this._transitionToHeight(contentHeight);
      });
    }
  }

  _animation : Animated.CompositeAnimation|null = null;

  _transitionToHeight(height: number) {
    const { duration } = this.props;
    if (this._animation) {
      this._animation.stop();
    }
    this.setState({ animating: true });
    this._animation = Animated.timing(this.state.height, {
      useNativeDriver: false,
      toValue: height ? height : 0,
      duration,
      easing: typeof this.props.easing === 'function' ? this.props.easing : Easing.ease,
    });
    this._animation.start(() => {
      if (this.unmounted) {
        return;
      }
      this.setState({ animating: false }, () => {
        if (this.unmounted) {
          return;
        }
        if (typeof this.props.onAnimationEnd === 'function')
          this.props.onAnimationEnd();
      });
    });
  }

  _handleLayoutChange = (event: LayoutChangeEvent) => {
    const contentHeight = event.nativeEvent.layout.height;
    if (
      this.state.animating ||
      this.props.collapsed ||
      this.state.measuring ||
      this.state.contentHeight === contentHeight
    ) {
      return;
    }

    this.state.height.setValue(contentHeight);
    this.setState({ contentHeight });
  };

  render() {
    const {
      collapsed,
      enablePointerEvents,
      renderChildrenCollapsed,
    } = this.props;
    const {
      height,
      contentHeight,
      measuring,
      measured,
      animating,
    } = this.state;
    const hasKnownHeight = !measuring && (measured || collapsed);
    const contentStyle = {} as ViewStyle;
    if (measuring) {
      contentStyle.position = 'absolute';
      contentStyle.opacity = 0;
    } else if (this.props.align === 'center') {
      contentStyle.transform = [
        {
          translateY: height.interpolate({
            inputRange: [0, contentHeight],
            outputRange: [contentHeight / -2, 0],
          }) as unknown as number,
        },
      ];
    } else if (this.props.align === 'bottom') {
      contentStyle.transform = [
        {
          translateY: height.interpolate({
            inputRange: [0, contentHeight],
            outputRange: [-contentHeight, 0],
          }) as unknown as number,
        },
      ];
    }
    if (animating) {
      contentStyle.height = contentHeight;
    }
    const shouldRenderChildren =
      renderChildrenCollapsed ||
      ((!collapsed || (collapsed && animating)) &&
        (animating || measuring || measured));

    return (
      <Animated.View
        style={hasKnownHeight && {
          overflow: 'hidden',
          height: height,
        }}
        pointerEvents={!enablePointerEvents && collapsed ? 'none' : 'auto'}
      >
        <Animated.View
          ref={this._handleRef}
          style={[this.props.style, contentStyle]}
          onLayout={this.state.animating ? undefined : this._handleLayoutChange}
        >
          {shouldRenderChildren && this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}
