import React from 'react';
import { ImageSourcePropType, Text, TextStyle } from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import { Color, ThemeColor, ThemeSelector } from '../styles';
import { ThemeWrapper } from '../theme/Theme';

export interface IconfontProp {
  /**
   * 图标的名称。
   *
   * 可使用 configIconfontMap 函数添加自己的图标名称映射。
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
   * 图标文字样式
   */
  style?: TextStyle,
  /**
   * 图标文字字体类名 默认是 iconfont
   */
  fontFamily?: string,
}

type IconMap = Record<string, string|ImageSourcePropType>;

//图标集
let iconMap = (require('../data/DefaultIcon.json') || {}) as IconMap;

export default {
  /**
   * 设置 Icon 组件的图标名称映射。
   * 如果已存在同名数据，则会覆盖之前的。
   *
   * key是图标的名字，value 可以是以下几种情况：
   * * 是一个 Unicode 字符，则会渲染为字体形式的图标
   * * 是一个 ImageSourcePropType 对象，则会尝试使用 Image 渲染为图片（或者Icon 的 isSvg 属性为true时会使用 LocalSvg 渲染为svg）
   * * 是一个<svg>开头的字符串，会使用 SvgXml 进行渲染为 svg
   */
  configIconMap(map: IconMap) {
    for (const key in map)
    iconMap[key] = map[key];
  },
  /**
   * 从图标名称映射中获取指定名称的图标数据。
   * @param key 图标名称
   * @returns 
   */
  getIconDataFromMap(key: string) {
    return iconMap[key];
  },
};

/**
 * IconFont 图标
 *
 * 可以使用 configIconfontMap 函数设置图标名称映射
 */
export const Icon = ThemeWrapper(function (props: IconfontProp) {

  const { icon } = props;
  const size = props.size || 20;

  const iconData = iconMap[icon || ''];



  function renderImage() {

  }
  function renderSvgXml() {
    return <SvgFromXml xml={iconData as string} width={size} height={size} />;
  }
  function renderText() {
    return <Text style={{
      color: ThemeSelector.color(props.color, Color.black),
      fontSize: size,
      fontFamily: props.fontFamily || 'iconfont',
      ...props.style,
    }}>{iconData as string}</Text>;
  }
  if (typeof iconData === 'string') {
    if (iconData.length === 1) return renderText();
    else if (iconData.startsWith('<svg')) return renderSvgXml();
    else if (iconData.startsWith('http')) return renderImage();
  } else {

  }
  return <></>;
});
