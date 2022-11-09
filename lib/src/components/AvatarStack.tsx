import React from 'react';
import { ImageSourcePropType, Text, View } from 'react-native';
import { Color } from '../styles/ColorStyles';
import { Avatar } from './Avatar';
import { RowView } from './layout/RowView';
import { DynamicColor, DynamicThemeStyleSheet } from '../styles';
import { ThemeWrapper } from '../theme/Theme';

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
   * 最大显示多少个头像，超过后显示数字，默认是5个
   */
  maxCount?: number,
  /**
   * 超过最大显示后是否显示数字，默认是
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
   * 头像是否是圆形的
   */
  round?: boolean,
  /**
   * 点击事件
   */
  onPress?: () => void,
}


const styles = DynamicThemeStyleSheet.create({
  overflowCount: {
    backgroundColor: DynamicColor(Color.mask),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  overflowCountText: {
    fontSize: 12,
    color: DynamicColor(Color.white),
  },
});


/**
 * 头像堆叠组件，用于显示一组圆的头像
 */
export const AvatarStack = ThemeWrapper(function (props: AvatarStackProp) {

  function renderImages() {
    const array : Array<JSX.Element> = [];
    const maxCount = props.maxCount || 5;
    const size = props.size || 30;
    const imageStyle = {
      marginLeft: props.imageMargin || -(size / 3),
      borderRadius: props.round ? (size / 2) : 4,
      width: size,
      height: size,
    };
    const showOverflowCount = props.showOverflowCount !== false;

    for (let i = 0; i < props.urls.length; i++) {
      const element = props.urls[i];
      if (i === 0) {
        array.push(<Avatar url={element} key={i} style={{
          ...imageStyle,
          marginLeft: 0,
        }} />);
      } else if (i < maxCount) {
        array.push(<Avatar url={element} key={i} defaultAvatar={props.defaultAvatar} style={imageStyle} />);
      } else {
        if (showOverflowCount) {
          array.push(
            <View key={i} style={[imageStyle, styles.overflowCount]}>
              <Text style={styles.overflowCountText}>+{props.urls.length - i}</Text>
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
