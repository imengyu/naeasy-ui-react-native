import React from 'react';
import { ImageSourcePropType, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Color } from '../../styles/ColorStyles';
import { Avatar } from './Avatar';
import { RowView } from '../layout/RowView';
import { DynamicThemeStyleSheet, ThemeColor, ThemeSelector } from '../../styles';
import { ThemeWrapper } from '../../theme/Theme';

interface AvatarStackProp {
  /**
   * 默认头像
   */
  defaultAvatar?: ImageSourcePropType,
  /**
   * 头像的图标URL
   */
  urls: string[],
  /**
   * 最大显示多少个头像，超过后显示数字，默认 5
   */
  maxCount?: number,
  /**
   * 超过最大显示后是否显示数字，默认 true
   */
  showOverflowCount?: boolean,
  /**
   * 设置头像之间的距离。默认：-大小/3
   */
  imageMargin?: number,
  /**
   * 头像的大小，默认30
   */
  size?: number,
  /**
   * 头像是否是圆形的，默认 true
   */
  round?: boolean,
  /**
   * 头像是圆角的大小，仅在 round=false 时有效，默认 0
   */
  radius?: number,
  /**
   * 是否为头像添加边框，默认 false
   */
  border?: boolean,
  /**
   * 头像边框宽度，默认 1
   */
  borderWidth?: number,
  /**
   * 头像边框颜色，默认 Color.white
   */
  borderColor?: ThemeColor,
  /**
   * 超出显示文字背景样式
   */
  overflowCountStyle?: ViewStyle,
  /**
   * 超出显示文字自定义样式
   */
  overflowCountTextStyle?: TextStyle,
  /**
   * 点击事件
   */
  onPress?: () => void,
}


const styles = DynamicThemeStyleSheet.create({
  overflowCount: {
    backgroundColor: Color.white.light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  overflowCountText: {
    fontSize: 12,
    color: Color.text.light,
  },
});


/**
 * 头像堆叠组件，用于显示一组圆的头像
 */
export const AvatarStack = ThemeWrapper(function (props: AvatarStackProp) {

  const {
    imageMargin,
    maxCount = 5,
    border,
    borderWidth = 1.5,
    borderColor = Color.white,
    round = true,
    size = 30,
    radius = 0,
    showOverflowCount = true,
    overflowCountStyle,
    overflowCountTextStyle,
    urls,
    defaultAvatar,
  } = props;

  function renderImages() {
    const array : Array<JSX.Element> = [];
    const imageStyle = {
      marginLeft: imageMargin || -(size / 3),
      borderRadius: round ? (size / 2) : radius,
      borderWidth: border ? borderWidth : 0,
      borderColor: ThemeSelector.color(borderColor),
      width: size,
      height: size,
    };

    for (let i = 0; i < urls.length; i++) {
      const element = urls[i];
      if (i === 0) {
        array.push(<Avatar url={element} key={i} style={{
          ...imageStyle,
          marginLeft: 0,
        }} />);
      } else if (i < maxCount) {
        array.push(<Avatar url={element} key={i} defaultAvatar={defaultAvatar} style={imageStyle} />);
      } else {
        if (showOverflowCount) {
          array.push(
            <View key={i} style={[
              imageStyle,
              styles.overflowCount,
              overflowCountStyle,
            ]}>
              <Text style={[
                styles.overflowCountText,
                overflowCountTextStyle,
              ]}>+{urls.length - i}</Text>
            </View>
          );
        }
        break;
      }
    }

    return array;
  }

  return (<RowView center>{renderImages()}</RowView>);
});
