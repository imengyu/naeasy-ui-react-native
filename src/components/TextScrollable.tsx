import React from 'react';
import { Animated, Easing, LayoutChangeEvent, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import MeasureText from '@newbanker/react-native-measure-text';

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
interface TextScrollableState {
  mesuredTextWidth: number;
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    overflow: 'hidden',
  },
});

/**
 * 可以滚动的文字组件。
 */
export class TextScrollable extends React.PureComponent<TextScrollableProps, TextScrollableState> {

  state: Readonly<TextScrollableState> = {
    mesuredTextWidth: 100,
  };
  scrollAnimValue = new Animated.Value(0);
  scrollAnim: Animated.CompositeAnimation | null = null;
  scrollState = false;

  children: string | undefined = '';

  componentDidMount() {
    if (this.props.scroll !== false) {
      setTimeout(() => this.startScroll(), 500);
    }
  }
  componentWillUnmount() {
    this.stopScroll();
  }
  componentDidUpdate() {
    if (this.props.scroll !== false && !this.scrollState) {
      this.startScroll();
    } else if (this.props.scroll === false && this.scrollState) {
      this.stopScroll();
    }
    //文字更改，重新开始
    if (this.scrollState && this.children !== this.props.children) {
      this.children = this.props.children;
      this.stopScroll();
      this.startScroll();
    }
  }

  scrollParentWidth = 0;
  scrollParentHeight = 0;

  startScroll() {

    MeasureText.width({
      fontSize: this.props.textStyle?.fontSize || 14,
      text: this.props.children || '',
      height: this.scrollParentHeight,
    }).then((textWidth) => {

      //文字宽度没有超出外层，不需要滚动
      if (textWidth < this.scrollParentWidth) {
        this.scrollAnimValue.setValue(this.scrollParentWidth / 2 - textWidth / 2);
        this.setState({ mesuredTextWidth: textWidth });
        return;
      }

      this.scrollAnimValue.setValue(this.scrollParentWidth);
      this.scrollAnim = Animated.timing(this.scrollAnimValue, {
        toValue: -textWidth,
        duration: this.props.scrollDuration || 10000,
        useNativeDriver: true,
        easing: Easing.linear,
      });
      const startAnim = () => {
        if (this.scrollAnim) {
          this.scrollState = true;
          this.scrollAnim.start(() => {
            this.scrollAnimValue.setValue(this.scrollParentWidth);
            if (this.scrollState)
              startAnim();
          });
        }
      };

      if (!this.scrollState)
        startAnim();

      this.setState({ mesuredTextWidth: textWidth });
    });
  }
  stopScroll() {
    if (this.scrollAnim) {
      this.scrollState = false;
      this.scrollAnim.stop();
      this.scrollAnim = null;
    }
  }

  onScrollParentLayout(e: LayoutChangeEvent) {
    this.scrollParentWidth = e.nativeEvent.layout.width;
    this.scrollParentHeight = e.nativeEvent.layout.height;
  }

  render(): React.ReactNode {
    return (
      <View onLayout={(e)=>this.onScrollParentLayout(e)} style={{...styles.contentView, ...this.props.style}}>
        <Text style={this.props.textStyle} />
        <Animated.Text style={{
          ...this.props.textStyle,
          position: 'absolute',
          left: 0,
          top: 0,
          width: this.state.mesuredTextWidth + 20,
          transform: [{
            translateX: this.scrollAnimValue,
          }],
        }}>{this.props.children}</Animated.Text>
      </View>
    );
  }
}
