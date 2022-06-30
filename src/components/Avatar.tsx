import React, { forwardRef, useState } from 'react';
import { Image, ImageSourcePropType, ImageStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import CheckTools from '../utils/CheckTools';

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
   * 头像的大小
   */
  size?: number,
  /**
   * 头像是否是圆形的
   */
  round?: boolean,
  /**
   * 样式
   */
  style?: ImageStyle;
  /**
   * 点击事件
   */
  onPress?: () => void,
}

/**
 * 头像组件，用于显示一个圆的头像
 */
export const Avatar = forwardRef<Image, AvatarProp>((props, ref) => {
  const [ error, setError ] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.86} onPress={props.onPress}>
      <Image
        ref={ref}
        onError={() => setError(true)}
        source={((error || CheckTools.isNullOrEmpty(props.url))) ? (props.defaultAvatar || require('@images/avatar.png')) : { uri: props.url }}
        style={{
          borderRadius: props.round ? (props.size || 30) / 2 : 4,
          width: props.size || 30,
          height: props.size || 30,
          ...props.style,
        }}
      />
    </TouchableOpacity>
  );
});
