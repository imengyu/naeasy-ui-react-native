import React from 'react';
import { Image, ImageProps, ImageSourcePropType, ImageStyle, Text, TextStyle, ViewStyle } from 'react-native';
import { LocalSvg, SvgFromUri, SvgFromXml, SvgProps } from 'react-native-svg';
import { Color, ThemeColor, ThemeSelector } from '../styles';
import { ThemeWrapper } from '../theme/Theme';

export interface IconProp {
  /**
   * 图标的名称。
   *
   * 可使用 IconUtils.configIconMap 函数添加自己的图标名称映射。
   */
  icon?: string,
  /**
   * 图标文字大小
   */
  size?: number,
  /**
   * 图标文字颜色
   */
  color?: ThemeColor|undefined,
  /**
   * 图标文字样式，注意，不同图标会使用不同的组件呈现，所以样式类型不能弄错。
   */
  style?: TextStyle|ViewStyle|ImageStyle,
  /**
   * 渲染Svg时使用的额外属性，具体请参考 react-native-svg 的配置。
   */
  svgProps?: SvgProps,
  /**
   * 渲染Image时使用的额外属性。
   */
  imageProps?: ImageProps,
  /**
   * 图标文字字体类名 默认是 iconfont
   */
  fontFamily?: string,
}

type IconMap = Record<string, string|{ source: ImageSourcePropType, svg: boolean }>;

//图标集
let iconMap = (require('../data/DefaultIcon.json') || {}) as IconMap;

export const IconUtils = {
  /**
   * 设置 Icon 组件的图标名称映射。
   * 如果已存在同名数据，则会覆盖之前的。
   *
   * key是图标的名字，value 可以是以下几种情况：
   * * 是一个 Unicode 字符，则会渲染为字体形式的图标
   * * 是一个 `{ source: ImageSourcePropType, svg: boolean }` 对象，则会尝试使用 Image 渲染为图片（或 `svg` 属性为 `true` 时会使用 `LocalSvg` 渲染为svg）
   * * 是一个 `&lt;svg` 开头的字符串，会使用 SvgXml 进行渲染为 svg
   */
  configIconMap(map: IconMap) {
    for (const key in map)
    iconMap[key] = map[key];
  },
  /**
   * 获取图标名称映射集
   * @returns 
   */
  getIconMap() {
    return iconMap;
  },
  /**
   * 从图标名称映射中获取指定名称的图标数据。
   * @param key 图标名称
   * @returns 返回图标数据，如果找不到，返回 undefined。
   */
  getIconDataFromMap(key: string) {
    return iconMap[key];
  },
};

/**
 * Icon 图标
 *
 * Icon 支持基于字体的图标集、Svg 图标、图片，你只需要预先通过 IconUtils.configIconMap
 * 设置自己的图标集，即可通过 name 快速显示一个图标。
 *
 * 内置图标请参考 TODO
 */
export const Icon = ThemeWrapper(function (props: IconProp) {

  const { icon, svgProps, imageProps, style, color } = props;
  const size = props.size || 20;

  const iconData = iconMap[icon || ''];
  const colorFinal = ThemeSelector.color(color, Color.black);

  function renderSvgUri() {
    return <SvgFromUri uri={iconData as string} width={size} height={size} fill={colorFinal} {...svgProps} />;
  }
  function renderSvgXml() {
    return <SvgFromXml xml={iconData as string} width={size} height={size} fill={colorFinal} {...svgProps} />;
  }

  function renderImage(source: ImageSourcePropType) {
    return <Image style={[
      { width: size, height: size },
      style as ImageStyle,
    ]} source={source} resizeMode="contain" { ...imageProps } />;
  }
  function renderText() {
    return <Text style={{
      color: colorFinal,
      fontSize: size,
      fontFamily: props.fontFamily || 'iconfont',
      ...style,
    }}>{iconData as string}</Text>;
  }

  if (typeof iconData === 'string') {
    if (iconData.length === 1) return renderText();
    else if (iconData.startsWith('<svg')) return renderSvgXml();
    else if (iconData.startsWith('http')) return iconData.endsWith('.svg') ? renderSvgUri() : renderImage({ uri: iconData });
  } else {
    if (iconData.svg)
      return <LocalSvg asset={iconData.source} width={size} height={size} {...svgProps} />;
    else
      return renderImage(iconData.source);
  }

  return <Text style={{ color: '#f00' }}>RenderFail:{iconData}</Text>;
});
