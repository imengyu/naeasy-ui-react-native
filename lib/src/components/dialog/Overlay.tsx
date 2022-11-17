import React, { } from 'react';
import { Popup } from '../Popup';
import { PopupContainerProps } from '../PopupContainer';

export interface OverlayProps extends Omit<PopupContainerProps, 'renderContent'> {
  children?: React.ReactElement|undefined,
}

/**
 * 遮罩层组件。
 * 常用于自定义弹框。
 * 这个组件是 Popup 的封装组件
 */
export function Overlay(props: OverlayProps) {
  return (
    <Popup
      position="center"
      closeable
      closeIcon={false}
      backgroundColor="transparent"
      { ...props }
      renderContent={() => props.children || <></>}
    />
  );
}
