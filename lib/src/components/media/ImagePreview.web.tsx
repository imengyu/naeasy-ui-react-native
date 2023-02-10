import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback } from "react";
export interface ImagePreviewControlProps extends ImagePreviewOptions {
  onCloseAnimFnished: () => void;
}
/**
 *  * 图片预览分页组件，可以嵌入其他对话框中显示
 */
export function ImagePreviewControl(props: ImagePreviewControlProps) {
  return (<></>);
}


export interface ImagePreviewOptions {
  imageUrls: string[],
  selectIndex?: number;
  renderIndicator?: (props: { currentIndex: number, count: number }) => JSX.Element,
  renderHeader?: () => JSX.Element,
  renderFooter?: () => JSX.Element,
  onLongPress?: (index: number, imageUrl: string) => void;
}

/**
 * 图片放大预览组件。
 */
export const ImagePreview = {
  /**
   * 显示图片放大预览组件
   */
  show(options: ImagePreviewOptions) {
  },
};




