import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, ViewStyle } from 'react-native';
import { TouchableHighlight } from "react-native";
import { PressedColor } from "../../styles/ColorStyles";
import { selectStyleType } from '../../utils/StyleTools';

export type ImageButtonShapeType = 'round'|'square-full'|'custom';

export interface ImageButtonProps {
  /**
   * 按钮按下时的背景颜色
   */
  pressedBackgroundColor?: string,
  /**
   * 图片样式
   */
  imageStyle?: ImageStyle;
  /**
   * 按钮边距
   */
  padding?: number,
  /**
   * 图片大小
   */
  size?: number,
  /**
   * 按钮点击事件
   */
  onPress?: () => void;
  /**
   * 按钮的样式
   */
  style?: ViewStyle;
  /**
   * 按钮形状预设
   */
  shape?: ImageButtonShapeType;
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
export function ImageButton(props: ImageButtonProps) {
  return (
    <TouchableHighlight
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: props.padding,
        ...selectStyleType(props.shape, 'round', {
          "round": {
            borderRadius: 50,
          },
          "custom": {},
          "square-full": {
            height: '100%',
            aspectRatio: 1,
            borderRadius: 0,
          },
        }),
        ...props.style,
        opacity: props.disabled ? 0.3 : 1,
      }}
      underlayColor={props.pressedBackgroundColor || PressedColor.light}
      onPress={props.disabled ? undefined : props.onPress}
    >
      <Image
        source={props.source}
        style={{
          ...props.imageStyle,
          width: props.size,
          height: props.size,
        }}
      />
    </TouchableHighlight>
  );
}
