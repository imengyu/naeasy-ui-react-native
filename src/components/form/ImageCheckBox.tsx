import React from "react";
import { Image, ImageBackground, ImageSourcePropType, ImageStyle, StyleSheet } from "react-native";
import { CheckBox, CheckBoxProps } from "./CheckBox";

export interface ImageCheckBoxProps extends CheckBoxProps {
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
 * 一个自定义图片的 CheckBox
 */
export function ImageCheckBox(props: ImageCheckBoxProps) {
  return (
    <CheckBox
      { ...props }
      renderButton={(on) => <ImageCheckBoxButton { ...props } on={on} />}
    />
  );
}

const styles = StyleSheet.create({
  checkButtonBackground: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  checkButtonCheck: {
    width: 22,
    height: 22,
  },
});

interface ImageCheckBoxButtonProps extends ImageCheckBoxProps {
  on: boolean;
}

function ImageCheckBoxButton(props: ImageCheckBoxButtonProps) {
  return (
    <ImageBackground source={props.boxImage || require('../../images/check/image-check-box.png')} resizeMode="contain" style={{ ...styles.checkButtonBackground, ...props.boxImageStyle}}>
      { props.on ? <Image source={props.checkImage || require('../../images/check/image-check.png')} resizeMode="contain" style={{ ...styles.checkButtonCheck, ...props.checkImageStyle}} /> : <></> }
    </ImageBackground>
  );
}
