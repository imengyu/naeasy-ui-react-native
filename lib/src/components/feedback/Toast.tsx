import React, { createRef } from 'react';
import Portal from '../../portal';
import { TextStyle, ViewStyle } from 'react-native';
import { IconProp } from '../basic/Icon';
import { ToastContainer, IToastPosition } from './ToastContainer';

export interface ToastPublicInstance {
  /**
   * 关闭当前显示的 Toast
   */
  close: () => void;
  /**
   * 更新当前显示的 Toast 属性。
   * @param newProps 需要更新的属性。
   */
  updateProps: (newProps: ToastProps) => void;
}
export interface ToastProps {
  /**
   * 自动关闭的延时，单位秒。为0不会自动关闭
   */
  duration?: number;
  /**
   * 自动关闭的延时，单位秒
   */
  type?: 'text'|'loading'|'success'|'fail'|'offline';
  /**
   * 自定义图标
   */
  icon?: string;
  /**
   * 图标自定义属性
   */
  iconProps?: IconProp;
  /**
   * 土司内容
   */
  content?: string|JSX.Element;
  /**
   * 关闭后回调
   */
  onClose?: () => void;
  /**
   * 提示显示位置
   */
  position?: IToastPosition;
  /**
   * 是否禁止背景点击
   */
  forbidClick?: boolean;
  /**
   * 是否在点击后关闭
   */
  closeOnClick?: boolean;
  /**
   * 土司背景的自定义样式
   */
  maskStyle?: ViewStyle;
  /**
   * 土司提示容器的自定义样式
   */
  toastStyle?: ViewStyle;
  /**
   * 土司提示文字的自定义样式
   */
  textStyle?: TextStyle;
}

const defaultProps = {
  position: 'center',
  type: 'text',
  textStyle: {
    color: 'white',
    fontSize: 14,
  },
  toastStyle: {
    backgroundColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
} as ToastProps;
let currentDefaultProps = { ...defaultProps } as ToastProps;
let currentToastId = 0;
let currentToastRef = createRef<ToastContainer>();

/**
 * 显示土司
 * @param props
 */
function show(props: ToastProps) : ToastPublicInstance {

  const { content } = props;

  //自动计算显示时长
  const defaultDuration = (typeof content === 'string') ?
    1000 + content.length / 200 * 10000
    : 2000;

  //公共接口
  const toastPublicInstance = {
    close() {
      Portal.remove(currentToastId);
      currentToastId = 0;
    },
    updateProps(newProps: ToastProps) {
      currentToastRef.current?.updateProps({
        ...props,
        ...newProps,
      });
    },
  } as ToastPublicInstance;

  if (currentToastId > 0) {
    currentToastRef.current?.updateProps(props);
    return toastPublicInstance;
  }

  currentToastId = Portal.add(
    <ToastContainer
      duration={defaultDuration}
      { ...props }
      ref={currentToastRef}
      onAnimationEnd={() => {
        Portal.remove(currentToastId);
        currentToastId = 0;
      }}
    />,
  );

  return toastPublicInstance;
}
/**
 * 显示文字土司
 * @param textString 文字
 */
function text(textString: string) {
  return show({
    position: 'center',
    content: textString,
    type: 'text',
  });
}
/**
 * 显示文字土司
 * @param textString 文字
 */
function info(textString: string) {
  return show({
    position: 'center',
    content: textString,
    type: 'text',
  });
}
/**
 * 显示带成功图标的土司
 * @param props
 */
function success(props: string|ToastProps) {
  return show({
    position: 'center',
    content: typeof props === 'string' ? props : undefined,
    ...(typeof props === 'object' ? props : {}),
    type: 'success',
  });
}
/**
 * 显示带失败图标的土司
 * @param props
 */
function fail(props: string|ToastProps) {
  return show({
    position: 'center',
    content: typeof props === 'string' ? props : undefined,
    ...(typeof props === 'object' ? props : {}),
    type: 'fail',
  });
}
/**
 * 显示带加载中的土司
 * @param props
 */
function loading(props: string|ToastProps) {
  return show({
    position: 'center',
    forbidClick: true,
    content: typeof props === 'string' ? props : undefined,
    ...(typeof props === 'object' ? props : {}),
    type: 'loading',
  });
}
/**
 * 显示带无网络图标的土司
 * @param props
 */
function offline(props: string|ToastProps) {
  return show({
    position: 'center',
    content: typeof props === 'string' ? props : undefined,
    ...(typeof props === 'object' ? props : {}),
    type: 'offline',
  });
}
/**
 * 关闭当前显示的 Toast
 */
function close() {
  if (currentToastId > 0) {
    Portal.remove(currentToastId);
    currentToastId = 0;
  }
}

/**
 * 一种轻量级反馈/提示，可以用来显示不会打断用户操作的内容，适合用于页面转场、数据交互的等场景中。
 *
 * 规则: 有 Icon 的 Toast，字数为 4-6 个；没有 Icon 的 Toast，字数不宜超过 14 个。
 */
export const Toast = {
  text,
  info,
  show,
  success,
  fail,
  loading,
  offline,
  close,
  /**
   * 	重置默认配置
   */
  resetDefaultOptions() {
    currentDefaultProps = { ...defaultProps };
  },
  /**
   * 修改默认配置
   * @param options 配置
   */
  setDefaultOptions(options: ToastProps) {
    currentDefaultProps = {
      ...currentDefaultProps,
      ...options,
    };
  },
};
