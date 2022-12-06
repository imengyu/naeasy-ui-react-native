import React from 'react';
import CheckTools from '../../utils/CheckTools';
import { ImageSourcePropType, ImageStyle, Text, ViewStyle, Image, StyleSheet } from 'react-native';
import { Color } from '../../styles/ColorStyles';
import { rpx } from '../../utils/StyleConsts';
import { ColumnView } from '../layout/ColumnView';
import { selectStyleType } from '../../utils/StyleTools';
import { DynamicColor, useThemeStyles } from '../../theme/ThemeStyleSheet';
import { useThemeContext } from '../../theme/Theme';

type EmptyImageType = 'default'|'error'|'network'|'search';

export interface EmptyProp {
  /**
   * 图片下方的描述文字
   */
  description?: string,
  /**
   * 图片类型，可选值为 `error` `network` `search`，支持传入图片
   */
  image?: EmptyImageType|ImageSourcePropType,
  /**
   * 	图片大小
   */
  imageSize?: number,
  /**
   * 自定义样式
   */
  style?: ViewStyle;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  /**
   * 在 Empty 组件的下方插入自定义内容。
   */
  children?: JSX.Element|JSX.Element[],
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: rpx(20),
    flex: 1,
  },
  descriptionStyle: {
    paddingVertical: rpx(8),
    fontSize: 14,
    color: DynamicColor(Color.textSecond),
    textAlign: 'center',
  },
});

/**
 * 空状态组件
 *
 * 提供空状态时的占位提示。
 */
export function Empty(props: EmptyProp) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    imageSize = themeContext.getThemeVar('EmptyImageSize', 100),
    image,
    description = '',
    children,
  } = props;

  const imageStyle = {
    width: imageSize,
    height: imageSize,
  } as ImageStyle;

  return (
    <ColumnView style={[ themeStyles.view, props.style || {} ]} center pointerEvents={props.pointerEvents}>
      { typeof image === 'string' ?
        selectStyleType<JSX.Element, EmptyImageType>(image, 'default', {
          default: <Image source={require('../../images/empty-image-default.png')} style={imageStyle} />,
          error: <Image source={require('../../images/empty-image-error.png')} style={imageStyle} />,
          network: <Image source={require('../../images/empty-image-netowok.png')} style={imageStyle} />,
          search: <Image source={require('../../images/empty-image-search.png')} style={imageStyle} />,
        }) :
        (typeof image !== 'undefined' ? <Image source={image as ImageSourcePropType} style={imageStyle} /> : <></>)
      }
      { CheckTools.isNullOrEmpty(description) ? <></> : <Text style={styles.descriptionStyle}>{description}</Text> }
      { children as JSX.Element }
    </ColumnView>
  );
}
