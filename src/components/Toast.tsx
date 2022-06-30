import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import Portal from '../portal';
import ToastContainer, { IToastPosition } from './ToastContainer';

interface IToastConfigurable {
  /**
   * 自动关闭的延时，单位秒
   */
  duration?: number;
  /**
   * 关闭后回调
   */
  onClose?: () => void;
  /**
   * 提示显示位置
   */
  position?: IToastPosition;
  /**
   * 是否显示透明蒙层，防止触摸穿透
   */
  mask?: boolean;
  /**
   * 是否允许叠加显示
   */
  stackable?: boolean;

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

export interface IToastProps extends IToastConfigurable {
  content: string | React.ReactNode
}


const SHORT = 2000;

const defaultConfig: IToastConfigurable = {
  duration: SHORT,
  position: 'center',
  onClose: () => {},
  mask: false,
  stackable: true,
};

let defaultProps = {
  ...defaultConfig,
};

const toastKeyMap: { [key: number]: 1 } = {};

function remove(key: number) {
  Portal.remove(key);
  delete toastKeyMap[key];
}

function removeAll() {
  Object.keys(toastKeyMap).forEach((_key) =>
    Portal.remove(Number.parseInt(_key, 10)),
  );
}

function notice(
  content: string | IToastProps,
  type: string,
  duration = defaultProps.duration,
  position = defaultProps.position,
  onClose = defaultProps.onClose,
  mask = defaultProps.mask,
) {
  let props = {
    ...defaultProps,
    content: content as string | React.ReactNode,
    position,
    type,
    duration,
    onClose,
    mask,
  };

  if (typeof content !== 'string') {
    props = {
      ...props,
      ...content,
    };
  }

  if (!props.stackable) {
    removeAll();
  }

  const key = Portal.add(
    <ToastContainer
      content={props.content}
      duration={props.duration}
      onClose={props.onClose}
      type={props.type}
      position={props.position}
      mask={props.mask}
      toastStyle={defaultProps.toastStyle}
      textStyle={defaultProps.textStyle}
      maskStyle={defaultProps.maskStyle}
      onAnimationEnd={() => {
        remove(key);
      }}
    />,
  );
  toastKeyMap[key] = 1;
  return key;
}

/**
 * 一种轻量级反馈/提示，可以用来显示不会打断用户操作的内容，适合用于页面转场、数据交互的等场景中。
 *
 * 规则: 有 Icon 的 Toast，字数为 4-6 个；没有 Icon 的 Toast，字数不宜超过 14 个。
 */
export default {
  /**
   * 短时间显示时长
   */
  SHORT,
  /**
   * 长时间显示时长
   */
  LONG: 6000,
  defaultConfig,
  /**
   * 获取当前配置
   * @returns 配置
   */
  getConfig: () => {
    return { ...defaultProps };
  },
  /**
   *  配置非必填项的默认值
   * @param props 配置
   */
  config(props: IToastConfigurable) {
    defaultProps = {
      ...defaultProps,
      ...props,
    };
  },
  /**
   * 显示信息提示
   * @param props: toast props
   */
  info(
    props: string | IToastProps,
    duration?: number,
    position?: IToastPosition,
    onClose?: () => void,
    mask?: boolean,
  ) {
    //根据文字长度设置显示时间
    if (duration === -12) {
      if (typeof props === 'string') duration = SHORT + props.length / 200 * 10000;
      else duration = 1500;
    }
    return notice(props, 'info', duration, position || 'center', onClose, mask);
  },
  /**
   * 显示成功提示
   * @param props: toast props
   */
  success(
    props: string | IToastProps,
    duration?: number,
    position?: IToastPosition,
    onClose?: () => void,
    mask?: boolean,
  ) {
    //根据文字长度设置显示时间
    if (duration === -12) {
      if (typeof props === 'string') duration = SHORT + props.length / 200 * 10000;
      else duration = 2000;
    }
    return notice(props, 'success', duration, position || 'center', onClose, mask);
  },
  /**
   * 显示失败提示
   * @param props: toast props
   */
  fail(
    props: string | IToastProps,
    duration?: number,
    position?: IToastPosition,
    onClose?: () => void,
    mask?: boolean,
  ) {
    //根据文字长度设置显示时间
    if (duration === -12) {
      if (typeof props === 'string') duration = SHORT + props.length / 100 * 10000;
      else duration = 4000;
    }
    return notice(props, 'fail', duration, position || 'center', onClose, mask);
  },
  /**
   * 显示无网络提示
   * @param props: toast props
   */
  offline(
    props: string | IToastProps,
    duration?: number,
    position?: IToastPosition,
    onClose?: () => void,
    mask?: boolean,
  ) {
    //根据文字长度设置显示时间
    if (duration === -12) {
      if (typeof props === 'string') duration = SHORT + props.length / 100 * 10000;
      else duration = 4000;
    }
    return notice(props, 'offline', duration, position || 'center', onClose, mask);
  },
  /**
   * 显示加载中提示
   * @param props: toast props
   */
  loading(
    props?: string | IToastProps,
    duration?: number,
    position?: IToastPosition,
    onClose?: () => void,
    mask?: boolean,
  ) {
    return notice(props || '拼命加载中', 'loading', duration || 0, position || 'center', onClose, mask || true);
  },
  notice,
  /**
   * 关闭指定的提示
   */
  remove,
  /**
   * 关闭所有提示
   */
  removeAll,
};
