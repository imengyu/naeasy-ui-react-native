import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, ViewStyle, Text, TextStyle } from 'react-native';
import { TouchableOpacity } from "react-native";
import { selectStyleType } from '../../utils/StyleTools';

export type ImageButtonShapeType = 'round'|'square-full'|'custom';

export interface ImageButtonProps {
  /**
   * 按钮按下时的透明度
   * @default 0.75
   */
  activeOpacity?: number,
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
   * @default undefined
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
   * @default custom
   */
  shape?: ImageButtonShapeType;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean|undefined;
  /**
   * 图片
   * @required true
   */
  source: ImageSourcePropType;
  /**
   * 在下方显示文字
   */
  text?: string;
  /**
   * 下方文字的样式
   */
  textStyle?: TextStyle;
}

/**
 * 显示图片的按钮
 */
export function ImageButton(props: ImageButtonProps) {

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: props.padding,
        ...selectStyleType(props.shape, 'custom', {
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
      activeOpacity={props.activeOpacity || 0.75}
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
      { props.text ? <Text style={props.textStyle}>{props.text}</Text> : <></> }
    </TouchableOpacity>
  );
}
