import React from 'react';
import { Image, ImageProps, ImageSourcePropType, ImageStyle, TouchableOpacity, ViewStyle } from 'react-native';

export interface ImageOpacityButtonProps {
  /**
   * 按钮按下时的透明度
   */
  pressedOpacity?: number,
  /**
   * 图片样式
   */
  imageStyle?: ImageStyle;
  /**
   * 图片
   */
  imageProps?: ImageProps;
  /**
   * 图片高
   */
  height?: number;
  /**
   * 图片宽
   */
  width?: number;
  /**
   * 按钮点击事件
   */
  onPress?: () => void;
  /**
   * 按钮的样式
   */
  style?: ViewStyle;
  /**
   * 是否禁用
   */
  disabled?: boolean|undefined;
  /**
   * 图片
   */
  source: ImageSourcePropType;
}

/**
 * 显示图片的按钮
 */
export function ImageOpacityButton(props: ImageOpacityButtonProps) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style,
        opacity: props.disabled ? 0.3 : 1,
      }}
      activeOpacity={props.pressedOpacity}
      onPress={props.disabled ? undefined : props.onPress}
    >
      <Image
        source={props.source}
        resizeMode="contain"
        style={{
          ...props.imageStyle,
          width: props.width,
          height: props.height,
        }}
        { ...props.imageProps }
      />
    </TouchableOpacity>
  );
}
