import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Color } from '../../styles/ColorStyles';
import { Avatar } from './Avatar';
import { RowView } from '../layout/RowView';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicColorVar, DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';

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
   * 最大显示多少个头像，超过后显示数字
   * @default 5
   */
  maxCount?: number,
  /**
   * 超过最大显示后是否显示数字
   * @default true
   */
  showOverflowCount?: boolean,
  /**
   * 设置头像之间的距离
   * @default size / 3
   */
  imageMargin?: number,
  /**
   * 头像的大小
   * @default 30
   */
  size?: number,
  /**
   * 头像是否是圆形的
   * @default true
   */
  round?: boolean,
  /**
   * 头像是圆角的大小，仅在 round=false 时有效
   * @default 0
   */
  radius?: number,
  /**
   * 是否为头像添加边框
   * @default false
   */
  border?: boolean,
  /**
   * 头像边框宽度
   * @default 1.5
   */
  borderWidth?: number,
  /**
   * 头像边框颜色
   * @default Color.white
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


const styles = StyleSheet.create({
  overflowCount: {
    backgroundColor: DynamicColorVar('AvatarStackOverflowCountBackgroundColor', Color.white),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overflowCountText: {
    fontSize: DynamicVar('AvatarStackOverflowCountTextFontSize', 12),
    color: DynamicColorVar('AvatarStackOverflowCountTextColor', Color.text),
  },
});


/**
 * 头像堆叠组件，用于显示一组圆的头像
 */
export function AvatarStack(props: AvatarStackProp) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    imageMargin,
    maxCount = themeContext.getThemeVar('AvatarStackMaxCount', 5),
    border = false,
    borderWidth = themeContext.getThemeVar('AvatarStackBorderWidth', 1.5),
    borderColor = themeContext.getThemeVar('AvatarStackBorderColor', Color.white),
    round = themeContext.getThemeVar('AvatarStackRound', true),
    size = themeContext.getThemeVar('AvatarStackSize', 30),
    radius = themeContext.getThemeVar('AvatarStackRadius', 0),
    showOverflowCount = themeContext.getThemeVar('AvatarStackShowOverflowCount', true),
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
      borderColor: themeContext.resolveThemeColor(borderColor),
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
              themeStyles.overflowCount,
              overflowCountStyle,
            ]}>
              <Text style={[
                themeStyles.overflowCountText,
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
}
