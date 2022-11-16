import React from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Color } from '../../styles';
import { rpx } from '../../utils/StyleConsts';
import { selectStyleType } from '../../utils/StyleTools';
import { Icon } from '../Icon';
import { ToastProps } from './Toast';

export type IToastPosition = 'top'|'bottom'|'center';

interface ToastContainerProp extends ToastProps {
  onAnimationEnd?: () => void;
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
export class ToastContainer extends React.Component<ToastContainerProp, {
  toast: ToastContainerProp,
  fadeAnim: Animated.Value,
}> {

  anim: Animated.CompositeAnimation | null = null;
  noEndNext = false;

  constructor(props: ToastContainerProp) {
    super(props);
    this.state = {
      toast: props,
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.loadAnim();
  }
  componentWillUnmount() {
    this.noEndNext = false;
    if (this.anim) {
      this.anim.stop();
      this.anim = null;
    }
    const { onClose } = this.state.toast;
    if (onClose) {
      onClose();
    }
  }

  loadAnim() {
    const { duration = 1000 } = this.state.toast;
    const { onAnimationEnd } = this.props;
    const timing = Animated.timing;
    if (this.anim) {
      this.anim.stop();
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
      if (this.noEndNext) {
        console.log('noEndNext true');
        this.noEndNext = false;
        return;
      }
      if (duration > 0) {
        this.anim = null;
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }
    });
  }

  updateProps(props: ToastProps) {
    this.setState({
      toast: props,
    });
    setTimeout(() => {
      this.noEndNext = true;
      this.loadAnim();
    }, 200);
  }

  render() {
    const {
      type = 'text',
      content,
      forbidClick,
      position,
      icon,
      iconProps,
      textStyle,
      toastStyle,
      maskStyle,
      onAnimationEnd,
    } = this.state.toast;
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
          color={ textStyle?.color as string || '#fff'}
          size="large"
        />
      );
    } else if (type === 'text') {
      iconDom = null;
    } else {
      iconDom = (
        <Icon
          icon={icon ||  iconType[type]}
          style={styles.image}
          color={ textStyle?.color as string || '#fff'}
          size={36}
          { ...iconProps }
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
          maskStyle,
          { opacity: this.state.fadeAnim },
        ]}
        pointerEvents={forbidClick ? undefined : 'box-none'}>
        <Animated.View style={{ opacity: this.state.fadeAnim }}>
          <TouchableOpacity
            onPress={onAnimationEnd}
            style={[
              styles.innerWrap,
              toastStyle,
              iconDom ? styles.iconToast : styles.textToast,
            ]}>
            { iconDom }
            { React.isValidElement(content) ? (
              content
            ) : (
              <Text style={[ styles.content, textStyle]}>{'' + content}</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}
