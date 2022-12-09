import React from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Color } from '../../styles';
import { ThemeContext } from '../../theme/Theme';
import { DynamicVar, transformThemeStyles } from '../../theme/ThemeStyleSheet';
import { rpx } from '../../utils/StyleConsts';
import { selectStyleType } from '../../utils/StyleTools';
import { Icon } from '../basic/Icon';
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
    zIndex:  DynamicVar('ToastZIndex', 109),
  },
  innerWrap: {
    alignItems: 'center',
    backgroundColor:  DynamicVar('ToastBackgroundColor', 'rgba(0,0,0,0.6)'),
    minWidth: DynamicVar('ToastMinWidth', 100),
    zIndex: DynamicVar('ToastInnerZIndex', 120),
  },
  iconToast: {
    borderRadius: DynamicVar('ToastWhenIconBorderRadius', 10),
    paddingVertical: DynamicVar('ToastWhenIconPaddingVertical', 20),
    paddingHorizontal: DynamicVar('ToastWhenIconPaddingHorizontal', 15),
  },
  textToast: {
    borderRadius: DynamicVar('ToastWhenTextBorderRadius', 10),
    paddingVertical: DynamicVar('ToastWhenTextPaddingVertical', 10),
    paddingHorizontal: DynamicVar('ToastWhenTextPaddingHorizontal', 15),
  },
  content: {
    color: DynamicVar('ToastContentColor', Color.white.light),
    fontSize: DynamicVar('ToastContentFontSize', 14),
  },
  image: {
    marginBottom: DynamicVar('ToastIconMarginBottom', 6),
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: DynamicVar('ToastLoadingPadding', 0),
    marginBottom: DynamicVar('ToastLoadingMarginBottom', 10),
  },
});

/**
 * Toast 组件的展示容器
 */
export class ToastContainer extends React.Component<ToastContainerProp, {
  toast: ToastContainerProp,
  fadeAnim: Animated.Value,
}> {

  static contextType = ThemeContext;

  context!: React.ContextType<typeof ThemeContext>;
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
    if (typeof props.duration !== 'undefined') {
      setTimeout(() => {
        this.noEndNext = true;
        this.loadAnim();
      }, 200);
    }
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
      success: this.context.getThemeVar('ToastIconSuccess', 'success'),
      fail: this.context.getThemeVar('ToastIconError', 'error'),
      offline: this.context.getThemeVar('ToastIconOffline', 'cry'),
      info: this.context.getThemeVar('ToastIconInfo', 'prompt'),
    };
    const themeStyles = transformThemeStyles(styles, this.context);

    let iconDom: React.ReactElement<any> | null = null;
    if (type === 'loading') {
      iconDom = (
        <ActivityIndicator
          animating
          style={themeStyles.centering}
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
          style={themeStyles.image}
          color={ textStyle?.color as string || '#fff'}
          size={36}
          { ...iconProps }
        />
      );
    }


    return (
      <Animated.View
        style={[
          themeStyles.container,
          selectStyleType<ViewStyle, IToastPosition>(position, 'center', {
            center: {
              justifyContent: 'center',
             },
            top: {
              justifyContent: 'flex-start',
              paddingTop: this.context.getThemeVar('ToastMarginWhenTop', rpx(200)),
            },
            bottom: {
              justifyContent: 'flex-end',
              paddingBottom: this.context.getThemeVar('ToastMarginWhenBottom', rpx(200)),
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
              themeStyles.innerWrap,
              toastStyle,
              iconDom ? themeStyles.iconToast : themeStyles.textToast,
            ]}>
            { iconDom }
            { React.isValidElement(content) ? (
              content
            ) : (
              <Text style={[ themeStyles.content, textStyle]}>{'' + content}</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}
