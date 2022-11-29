import React, { forwardRef, useState } from 'react';
import { Image, ImageSourcePropType, ImageStyle, View, TextStyle, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Color, ThemeColor, ThemeSelector } from '../../styles';
import CheckTools from '../../utils/CheckTools';

export interface AvatarProp {
  /**
   * 默认头像
   */
  defaultAvatar?: ImageSourcePropType,
  /**
   * 头像的图标URL
   */
  url?: string;
  /**
   * 头像的大小。默认：40
   */
  size?: number,
  /**
   * 头像圆角大小，在 round=false 时有效 。默认：0
   */
  radius?: number,
  /**
   * 头像是否是圆形的
   */
  round?: boolean,
  /**
   * 样式
   */
  style?: ImageStyle;
  /**
   * 当未提供 url 时，支持在头像上显示文字, 建议显示1-2个汉字
   */
  text?: string;
  /**
   * 文字的颜色
   */
  textColor?: ThemeColor;
  /**
   * 文字的样式
   */
  textStyle?: TextStyle;
  /**
   * 文字的大小
   */
  textSize?: number,
  /**
   * 头像背景颜色
   */
  background?: ThemeColor;
  /**
   * 点击事件
   */
  onPress?: () => void,
}

/**
 * 头像组件，用于显示一个圆的头像
 */
export const Avatar = forwardRef<Image, AvatarProp>((props, ref) => {

  const {
    round = true,
    url,
    defaultAvatar = {},
    size = 40,
    background = Color.primary,
    textColor = '#fff',
    textSize = 16,
    radius = 0,
    textStyle,
    style,
    onPress,
  } = props;

  const [ error, setError ] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.86} onPress={onPress}>
      {
        url ? <Image
          ref={ref}
          onError={() => setError(true)}
          source={((error || CheckTools.isNullOrEmpty(url))) ? (defaultAvatar || {}) : { uri: url }}
          style={{
            borderRadius: round ? size / 2 : radius,
            width: size,
            height: size,
            ...style,
          }}
        />  :
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ThemeSelector.color(background),
          borderRadius: round ? size / 2 : radius,
          width: size,
          height: size,
          ...props.style,
        }}>
          <Text style={[
            {
              color: ThemeSelector.color(textColor),
              fontSize: textSize,
            },
            textStyle,
          ]}>{props.text}</Text>
        </View>
      }
    </TouchableOpacity>
  );
});
