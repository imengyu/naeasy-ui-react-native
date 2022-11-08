import React from 'react';
import CheckTools from '../utils/CheckTools';
import { ImageSourcePropType, ImageStyle, Text, ViewStyle, Image } from 'react-native';
import { Color } from '../styles/ColorStyles';
import { rpx } from '../utils/StyleConsts';
import { ColumnView } from './layout/ColumnView';
import { selectStyleType } from '../utils/StyleTools';
import { DynamicColor, DynamicThemeStyleSheet } from '../styles/DynamicThemeStyleSheet';
import { ThemeWrapper } from '../theme/Theme';


type EmptyImageType = 'default'|'error'|'network'|'search';

export interface EmptyProp {
  /**
   * 图片下方的描述文字
   */
  description?: string,
  /**
   * 图片类型，可选值为 error network search，支持传入图片
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

const styles = DynamicThemeStyleSheet.create({
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
 * 空状态组件。提供空状态时的占位提示。
 */
export const Empty = ThemeWrapper(function (props: EmptyProp) {
  const imageStyle = {
    width: props.imageSize || 100,
    height: props.imageSize || 100,
  } as ImageStyle;
  return (
    <ColumnView style={{ ...styles.view, ...props.style}} center pointerEvents={props.pointerEvents}>
      { typeof props.image === 'string' ?
        selectStyleType<JSX.Element, EmptyImageType>(props.image, 'default', {
          default: <Image source={require('../images/empty-image-default.png')} style={imageStyle} />,
          error: <Image source={require('../images/empty-image-error.png')} style={imageStyle} />,
          network: <Image source={require('../images/empty-image-netowok.png')} style={imageStyle} />,
          search: <Image source={require('../images/empty-image-search.png')} style={imageStyle} />,
        }) :
        (typeof props.image !== 'undefined' ? <Image source={props.image as ImageSourcePropType} style={imageStyle} /> : <></>)
      }
      { CheckTools.isNullOrEmpty(props.description) ? <></> : <Text style={styles.descriptionStyle}>{props.description}</Text> }
      { props.children as JSX.Element }
    </ColumnView>
  );
});
