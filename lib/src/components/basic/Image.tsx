import React, { useState } from 'react';
import CheckTools from '../../utils/CheckTools';
import { ImageURISource } from 'react-native';
import { ImageSourcePropType, TouchableOpacity, Image as ReactNativeImage, ImageStyle, ImageProps, View, ViewStyle, ActivityIndicator, Text } from 'react-native';
import { deviceWidth } from '../../utils/StyleConsts';
import { topLeft } from '../../utils/StyleTools';
import { ColumnView } from '../layout/ColumnView';
import { Color, ThemeColor, DynamicColor, DynamicThemeStyleSheet, ThemeSelector } from '../../styles';
import { ThemeRender } from '../../theme/Theme';

export interface ImageWrapProps extends Omit<ImageProps, 'width'|'height'> {
  /**
   * 图片
   */
  source: ImageSourcePropType,
  /**
   * 失败时显示图片
   */
  failedSource?: ImageSourcePropType,
  /**
   * 特殊样式
   */
  style?: ImageStyle,
  /**
   * 图片宽度
   */
  height?: number|string,
  /**
   * 图片高度
   */
  width?: number|string,
  /**
   * aspectRatio
   */
  aspectRatio?: number,
  /**
   * 是否显示加载中提示，默认否
   */
  showLoading?: boolean,
  /**
   * 是否显示加载失败提示，默认是
   */
  showFailed?: boolean,
  /**
   * 是否显示灰色占位，默认是
   */
  showGrey?: boolean,
  /**
   * 初始加载中状态
   */
  loading?: boolean,
  /**
   * 加载中圆圈颜色
   */
  loadingColor?: ThemeColor,
  /**
   * 指定图片是否可以点击，默认否
   */
  touchable?: boolean,
  /**
   * 图片是否有圆角
   */
  round?: boolean,
  /**
   * 当round为true的圆角大小，默认是50%
   */
  radius?: number,
  /**
   * 图片点击事件
   */
  onPress?: () => void;
  /**
   * 图片长按事件
   */
  onLongPress?: () => void;
}

const styles = DynamicThemeStyleSheet.create({
  loadingView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    ...topLeft(0,0),
  },
  errorView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: DynamicColor(Color.background),
    ...topLeft(0,0),
  },
  errorViewText: {
    fontSize: 13,
    color: DynamicColor(Color.text),
  },
});


/**
 * 图片包装组件组件
 */
export function Image(props: ImageWrapProps) {

  const [ loading, setLoading ] = useState(props.loading || false);
  const [ loadFailed, setLoadFailed ] = useState(false);

  const style = {
    position: "relative",
    backgroundColor: props.showGrey !== false ? ThemeSelector.color(Color.background) : undefined,
    aspectRatio: props.aspectRatio,
    height: props.height,
    width: props.width,
    borderRadius: props.round ? (props.radius || deviceWidth) : 0,
    overflow: 'hidden',
    ...props.style,
  };

  const renderImage = () => {
    let source = props.source;
    if (typeof source === 'object' && typeof (source as ImageURISource).uri === 'string' && CheckTools.isNullOrEmpty((source as ImageURISource).uri))
      source = props.defaultSource || {};
    return (
      <ReactNativeImage
        { ...props as ImageProps }
        resizeMode={props.resizeMode || "contain"}
        source={loadFailed && props.failedSource ? props.failedSource : source}
        style={{
          height: props.height,
          width: props.width,
          aspectRatio: props.aspectRatio,
          ...props.style,
        }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setLoadFailed(true);
        }}
      />
    );
  };
  const renderLoading = () => {
    return (
      (props.showLoading && loading) ?
      <ColumnView
        center
        style={styles.loadingView}
      >
        <ThemeRender>
          { () => <ActivityIndicator color={ThemeSelector.color(props.loadingColor || Color.white)} /> }
        </ThemeRender>
      </ColumnView>
      : <></>
    );
  };
  const renderFailed = () => {
    return (
      (props.showFailed !== false && loadFailed && !props.failedSource) ?
        <ColumnView
          center
          style={styles.errorView}
        >
          <ThemeRender>
            { () => <Text style={styles.errorViewText}>加载失败</Text> }
          </ThemeRender>
        </ColumnView> :
        <></>
    );
  };

  return (
    props.touchable ?
      <TouchableOpacity
        activeOpacity={0.86}
        style={style as ViewStyle}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
      >
        {renderImage()}
        {renderLoading()}
        {renderFailed()}
      </TouchableOpacity>
      : <View
        style={style as ViewStyle}
      >
        {renderImage()}
        {renderLoading()}
        {renderFailed()}
      </View>
  );
}
