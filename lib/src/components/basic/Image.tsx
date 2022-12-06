import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ImageSourcePropType, TouchableOpacity, Image as ReactNativeImage, ImageStyle, ImageProps, View, ViewStyle, ActivityIndicator, Text } from 'react-native';
import { deviceWidth } from '../../utils/StyleConsts';
import { topLeft } from '../../utils/StyleTools';
import { ColumnView } from '../layout/ColumnView';
import { Color } from '../../styles';
import { ThemeColor, ThemeRender, useThemeContext } from '../../theme/Theme';
import { DynamicColorVar, DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';


/**
 * 主题变量：
 * |名称|类型|默认值|
 * |--|--|--|
 * |ImageLoadingColor|`ColorInfoItem`|`Color.white`|
 * |ImageGreyBackgroundColor|`ColorInfoItem`|`Color.background`|
 * |ImageRound|`boolean`|`false`|
 * |ImageShowGrey|`boolean`|`true`|
 * |ImageErrorViewTextColor|`ColorInfoItem`|`Color.text`|
 * |ImageErrorViewTextFontSize|`number`|`13`|
 * |ImageErrorViewBackgroundColor|`ColorInfoItem`|`Color.background`|
 */

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

const styles = StyleSheet.create({
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
    backgroundColor: DynamicColorVar('ImageErrorViewBackgroundColor', Color.background),
    ...topLeft(0,0),
  },
  errorViewText: {
    fontSize: DynamicVar('ImageErrorViewTextFontSize', 13),
    color: DynamicColorVar('ImageErrorViewTextColor', Color.text),
  },
});


/**
 * 图片包装组件组件
 */
export function Image(props: ImageWrapProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    showGrey = themeContext.getThemeVar('ImageShowGrey', true),
    round = themeContext.getThemeVar('ImageRound', false),
    loadingColor = themeContext.getThemeVar('ImageLoadingColor', Color.white),
    aspectRatio, height, width, radius,
    source, failedSource,
    showFailed, showLoading,
    touchable = false,
    onPress,
    onLongPress,
  } = props;

  const [ loading, setLoading ] = useState(props.loading || false);
  const [ loadFailed, setLoadFailed ] = useState(false);

  const style = {
    position: "relative",
    backgroundColor: showGrey ? themeContext.getThemeColorVar('ImageGreyBackgroundColor', Color.background) : undefined,
    aspectRatio: aspectRatio,
    height: height,
    width: width,
    borderRadius: round ? (radius || deviceWidth) : 0,
    overflow: 'hidden',
    ...props.style,
  };

  const renderImage = () => {
    return (
      <ReactNativeImage
        { ...props as ImageProps }
        resizeMode={props.resizeMode || "contain"}
        source={loadFailed && props.failedSource ? props.failedSource : source}
        style={{
          height: height,
          width: width,
          aspectRatio: aspectRatio,
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
      (showLoading && loading) ?
      <ColumnView
        center
        style={themeStyles.loadingView}
      >
        <ThemeRender>
          { () => <ActivityIndicator color={themeContext.resolveThemeColor(loadingColor)} /> }
        </ThemeRender>
      </ColumnView>
      : <></>
    );
  };
  const renderFailed = () => {
    return (
      (showFailed !== false && loadFailed && !failedSource) ?
        <ColumnView
          center
          style={themeStyles.errorView}
        >
          <ThemeRender>
            { () => <Text style={themeStyles.errorViewText}>加载失败</Text> }
          </ThemeRender>
        </ColumnView> :
        <></>
    );
  };

  return (
    touchable ?
      <TouchableOpacity
        activeOpacity={0.86}
        style={style as ViewStyle}
        onPress={onPress}
        onLongPress={onLongPress}
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
