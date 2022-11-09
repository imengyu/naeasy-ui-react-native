import React from "react";
import { ImageSourcePropType, ImageStyle } from "react-native";
import { ImageCheckBoxButton } from "./ImageCheckBox";
import { Radio, RadioProps } from "./Radio";

export interface ImageRadioProps extends RadioProps {
  /**
   * 复选框没有选中时的背景框图片
   */
  boxImage?: ImageSourcePropType;
  /**
   * 背景框自定义样式
   */
  boxImageStyle?: ImageStyle;
  /**
   * 复选框选中时的勾图片
   */
  checkImage?: ImageSourcePropType;
  /**
   * 复选框选中时的勾图片自定义样式
   */
  checkImageStyle?: ImageStyle;
}

/**
 * 一个自定义图片的 Radio
 */
export function ImageRadio(props: ImageRadioProps) {
  return (
    <Radio
      { ...props }
      renderButton={(on) => <ImageCheckBoxButton
        boxImage={props.boxImage}
        boxImageStyle={props.boxImageStyle}
        checkImage={props.checkImage}
        checkImageStyle={props.checkImageStyle}
        on={on}
      />}
    />
  );
}
