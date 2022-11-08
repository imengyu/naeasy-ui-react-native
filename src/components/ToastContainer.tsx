import React from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Color } from '../styles';
import { rpx } from '../utils/StyleConsts';
import { selectStyleType } from '../utils/StyleTools';
import { Iconfont } from './Icon';

export type IToastPosition = 'top'|'bottom'|'center';

export interface ToastProps {
  content: string | React.ReactNode;
  duration?: number;
  onClose?: () => void;
  position?: IToastPosition;
  mask?: boolean;
  type?: string;
  onAnimationEnd?: () => void;
  toastStyle?: ViewStyle;
  maskStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 109,
  },
  innerWrap: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    minWidth: 100,
    zIndex: 120,
  },
  iconToast: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  textToast: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  content: {
    color: Color.white.light,
    fontSize: 14,
  },
  image: {
    marginBottom: 6,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
});

/**
 * Toast 组件的展示容器
 */
export class ToastContainer extends React.Component<ToastProps, any> {
  static defaultProps = {
    duration: 3,
    mask: true,
    onClose() {},
  }

  anim: Animated.CompositeAnimation | null = null;

  constructor(props: ToastProps) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { onAnimationEnd } = this.props;
    const duration = this.props.duration as number;
    const timing = Animated.timing;
    if (this.anim) {
      this.anim = null;
    }
    const animArr = [
      timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
    ];
    if (duration > 0) {
      animArr.push(
        timing(this.state.fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      );
    }
    this.anim = Animated.sequence(animArr);
    this.anim.start(() => {
      if (duration > 0) {
        this.anim = null;
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }
    });
  }

  componentWillUnmount() {
    if (this.anim) {
      this.anim.stop();
      this.anim = null;
    }

    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }

  render() {
    const { type = '', content, mask, position } = this.props;
    const iconType: {
      [key: string]: string
    } = {
      success: 'success',
      fail: 'error',
      offline: 'cry',
    };

    let iconDom: React.ReactElement<any> | null = null;
    if (type === 'loading') {
      iconDom = (
        <ActivityIndicator
          animating
          style={{
            ...styles.centering,
            marginBottom: 10,
          }}
          color={ this.props.textStyle?.color as string || '#fff'}
          size="large"
        />
      );
    } else if (type === 'info') {
      iconDom = null;
    } else {
      iconDom = (
        <Iconfont
          icon={iconType[type]}
          style={styles.image}
          color={ this.props.textStyle?.color as string || '#fff'}
          size={36}
        />
      );
    }

    return (
      <Animated.View
        style={[
          styles.container,
          selectStyleType<ViewStyle, IToastPosition>(position, 'center', {
            center: {
              justifyContent: 'center',
            },
            top: {
              justifyContent: 'flex-start',
              paddingTop: rpx(200),
            },
            bottom: {
              justifyContent: 'flex-end',
              paddingBottom: rpx(200),
            },
          }),
          this.props.maskStyle,
          { opacity: this.state.fadeAnim },
        ]}
        pointerEvents={mask ? undefined : 'box-none'}>
        <Animated.View style={{ opacity: this.state.fadeAnim }}>
          <TouchableOpacity
            onPress={this.props.onAnimationEnd}
            style={[
              styles.innerWrap,
              this.props.toastStyle,
              iconDom ? styles.iconToast : styles.textToast,
            ]}>
            { iconDom }
            { React.isValidElement(content) ? (
              content
            ) : (
              <Text style={[ styles.content, this.props.textStyle]}>{'' + content}</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}
