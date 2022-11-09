import React from 'react';
import MeasureText from '@newbanker/react-native-measure-text';
import { Animated, Easing, Image, ImageSourcePropType, ImageStyle, LayoutChangeEvent, StyleSheet, Text, TextStyle, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Icon, IconProp } from './Icon';
import { RowView } from './layout/RowView';
import { Color, ThemeColor, ThemeSelector, ThemeUtils } from '../styles';
import { ThemeWrapper } from '../theme/Theme';

export interface NoticeBarProps {
  /**
   * 左边的图标, 可以传入图片
   */
  icon?: string|ImageSourcePropType|undefined;
  /**
   * 图标或者图片的自定义样式
   */
  iconStyle?: ImageStyle|TextStyle;
  /**
   * 图标额外属性
   */
  iconProps?: IconProp;
  /**
   * 内容
   */
  content?: string;
  /**
   * 文字的自定义样式
   */
  textStyle?: TextStyle;
  /**
   * 背景颜色
   */
  backgroundColor?: ThemeColor;
  /**
   * 文字颜色
   */
  textColor?: ThemeColor;
  /**
   * 是否滚动播放，默认是。
   */
  scroll?: boolean;
  /**
   * 滚动动画时长（毫秒），默认10000毫秒
   */
  scrollDuration?: number;
  /**
   * 文字是否换行，仅在非滚动播放时生效，默认否。
   */
  wrap?: boolean;
  /**
   * 是否可以关闭，默认否。
   */
  closeable?: boolean;
  /**
   * 用户点击关闭时的回调
   */
  onClose?: () => void;
  /**
   * 用户点击时的回调
   */
  onPress?: () => void;
}
interface NoticeBarState {
  mesuredTextWidth: number;
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexGrow: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  contentView: {
    flex: 1,
    overflow: 'hidden',
  },
});


class NoticeBarComponent extends React.PureComponent<NoticeBarProps, NoticeBarState> {


  state: Readonly<NoticeBarState> = {
    mesuredTextWidth: 100,
  };
  scrollAnimValue = new Animated.Value(0);
  scrollAnim: Animated.CompositeAnimation | null = null;

  componentDidMount() {
    if (this.props.scroll !== false) {
      setTimeout(() => this.startScroll(), 100);
    }
  }
  componentWillUnmount() {
    this.stopScroll();
  }
  componentDidUpdate() {
    //监听状态更改
    if (this.props.scroll !== false && this.scrollAnim == null) {
      this.startScroll();
    } else if (this.props.scroll === false && this.scrollAnim != null) {
      this.stopScroll();
    }
  }

  scrollParentWidth = 0;
  scrollParentHeight = 0;

  startScroll() {

    //计算文字的宽度
    MeasureText.width({
      fontSize: this.props.textStyle?.fontSize || 14,
      text: this.props.content || '',
      height: this.scrollParentHeight,
    }).then((textWidth) => {

      //开始播放动画，从屏幕右边滚动至 -textWidth 位置。
      this.scrollAnimValue.setValue(this.scrollParentWidth);
      this.scrollAnim = Animated.timing(this.scrollAnimValue, {
        toValue: -textWidth,
        duration: this.props.scrollDuration || 10000,
        useNativeDriver: true,
        easing: Easing.linear,
      });
      const startAnim = () => {
        if (this.scrollAnim) {
          this.scrollAnim.start(() => {
            //动画结束后立即重新开始
            this.scrollAnimValue.setValue(this.scrollParentWidth);
            startAnim();
          });
        }
      };
      startAnim();

      this.setState({ mesuredTextWidth: textWidth });
    });
  }
  stopScroll() {
    if (this.scrollAnim) {
      this.scrollAnim.stop();
      this.scrollAnim = null;
    }
  }

  onScrollParentLayout(e: LayoutChangeEvent) {
    //容器宽度获取
    this.scrollParentWidth = e.nativeEvent.layout.width;
    this.scrollParentHeight = e.nativeEvent.layout.height;
  }

  renderLeftIcon() {
    const icon = this.props.icon || 'notification';
    if (typeof icon === 'string') {
      if (icon.startsWith('http'))
        return <Image key="leftIcon" style={[ styles.icon, this.props.iconStyle as ImageStyle ]} source={{ uri: icon }} />;
      return <Icon key="leftIcon" icon={icon} {...this.props.iconProps} style={{
        ...styles.icon,
        ...this.props.iconStyle,
      }} color={this.props.textColor || Color.warning} />;
    }
    if (typeof icon === 'object' || typeof icon === 'number')
      return <Image key="leftIcon" style={[ styles.icon, this.props.iconStyle as ImageStyle ]} source={icon} />;
    return <></>;
  }
  renderClose() {
    return (
      this.props.closeable ?
        <TouchableOpacity onPress={this.props.onClose}>
          <Icon key="closeIcon" icon="close" style={styles.icon} color={this.props.textColor || Color.warning} />
        </TouchableOpacity> : <></>
    );
  }
  //渲染不会滚动的文字
  renderText() {
    return (
      <Text numberOfLines={this.props.wrap ? undefined : 1} style={{
        width: 'auto',
        flex: 1,
        color: ThemeSelector.color(this.props.textColor || Color.warning),
        alignSelf: 'auto',
      }}>{this.props.content}</Text>
    );
  }
  //渲染会滚动的文字
  renderScrollText() {
    return (
      <View onLayout={(e)=>this.onScrollParentLayout(e)} style={styles.contentView}>
        <Text style={this.props.textStyle} />
        <Animated.Text style={{
          ...this.props.textStyle,
          position: 'absolute',
          left: 0,
          top: 0,
          width: this.state.mesuredTextWidth + 20,
          color: ThemeSelector.color(this.props.textColor || Color.warning),
          transform: [{
            translateX: this.scrollAnimValue,
          }],
        }}>{this.props.content}</Animated.Text>
      </View>
    );
  }

  render(): React.ReactNode {
    return (
      <RowView touchable style={[
        styles.view,
        {
          backgroundColor: this.props.backgroundColor ?
            ThemeSelector.color(this.props.backgroundColor) :
            ThemeUtils.makeAplhaColor(ThemeSelector.colorNoNull(Color.warning), 0.15),
        },
      ]} onPress={this.props.onPress}>
        { this.renderLeftIcon() }
        { this.props.scroll === false ? this.renderText() : this.renderScrollText() }
        { this.renderClose() }
      </RowView>
    );
  }
}

/**
 * 通知栏组件。用于循环播放展示一组消息通知。
 */
export const NoticeBar = ThemeWrapper(NoticeBarComponent);
