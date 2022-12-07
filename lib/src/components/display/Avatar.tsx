import React, { forwardRef, useState } from 'react';
import CheckTools from '../../utils/CheckTools';
import { Image, ImageSourcePropType, ImageStyle, View, TextStyle, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Color } from '../../styles';
import { ThemeColor, useThemeContext } from '../../theme/Theme';

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
   * 头像的大小。
   * @default 40
   */
  size?: number,
  /**
   * 头像圆角大小，在 round=false 时有效
   * @default 0
   */
  radius?: number,
  /**
   * 头像是否是圆形的
   * @default true
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
   * @default '#fff'
   */
  textColor?: ThemeColor;
  /**
   * 文字的样式
   */
  textStyle?: TextStyle;
  /**
   * 文字的大小
   * @default 16
   */
  textSize?: number,
  /**
   * 头像背景颜色
   * @default Color.primaty
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

  const themeContext = useThemeContext();

  const {
    round = true,
    url,
    defaultAvatar = {},
    size = themeContext.getThemeVar('AvatarSize', 40),
    background = themeContext.getThemeVar('AvatarBackground', Color.primary),
    textColor = themeContext.getThemeVar('AvatarTextColor', '#fff'),
    textSize = themeContext.getThemeVar('AvatarTextSize', 16),
    radius = themeContext.getThemeVar('AvatarRadius', 0),
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
          backgroundColor: themeContext.resolveThemeColor(background),
          borderRadius: round ? size / 2 : radius,
          width: size,
          height: size,
          ...props.style,
        }}>
          <Text style={[
            {
              color: themeContext.resolveThemeColor(textColor),
              fontSize: textSize,
            },
            textStyle,
          ]}>{props.text}</Text>
        </View>
      }
    </TouchableOpacity>
  );
});
