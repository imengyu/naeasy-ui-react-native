import React from "react";
import { ImageSourcePropType, ImageStyle, ViewStyle } from "react-native";
import { Image } from "../Image";
import { RowView } from "../layout/RowView";
import { Text } from "../typography/Text";

export interface BadgeWithIconProps {
  /**
   * 外层背景颜色
   */
  backgroundColor?: string;
  /**
   * 文字颜色
   */
  textColor?: string;
  /**
   * 文字大小
   */
  textSize?: number;
  /**
   * 显示文字
   */
  text: string;
  /**
   * 图标的大小
   */
  iconSize?: number;
  /**
   * 图标
   */
  icon: ImageSourcePropType;
  /**
   * 外壳自定义样式
   */
  style?: ViewStyle;
  /**
   * 图标自定义样式
   */
  iconStyle?: ImageStyle;
}

/**
 * 一个可以显示数量，图标，背景的标记
 */
export function BadgeWithIcon(props: BadgeWithIconProps) {
  return (
    <RowView backgroundColor={props.backgroundColor} center alignSelf="center" style={{
      paddingHorizontal: 4,
      paddingVertical: 2,
      ...props.style,
    }}>
      <Image
        width={props.iconSize}
        height={props.iconSize}
        resizeMode="contain"
        source={props.icon}
        style={{
          backgroundColor: 'transparent',
          marginRight: 6,
          ...props.iconStyle,
        }}
      />
      <Text color={props.textColor} size={props.textSize}>{props.text}</Text>
    </RowView>
  );
}
