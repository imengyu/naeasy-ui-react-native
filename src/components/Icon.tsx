import React from 'react';
import { ImageSourcePropType, Text, TextStyle } from 'react-native';
import { Color, ThemeColor, ThemeSelector } from '../styles';
import { ThemeWrapper } from '../theme/Theme';

export interface IconfontProp {
  /**
   * 图标的名称
   */
  icon?: string,
  /**
   * 图标的名称
   */
  content?: string,
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

let iconFontMap = {} as IconMap;

export default {
  /**
   * 设置 Iconfont 组件的图标名称映射。
   * 如果已存在同名数据，则会覆盖之前的。
   *
   * key是图标的名字，value 可以是以下几种情况：
   * * 是一个 Unicode 字符，则会渲染为字体形式的图标
   * * 是一个 ImageSourcePropType 对象，则会尝试使用 Image 渲染为图片（或者Icon的isSvg 属性为true时会使用 LocalSvg 渲染为svg）
   * * 是一个<svg>开头的字符串，会使用 SvgXml 进行渲染为 svg
   */
  configIconfontMap(map: IconMap) {
    for (const key in map)
      iconFontMap[key] = map[key];
  }
};

/**
 * IconFont 图标
 *
 * 可以使用 configIconfontMap 函数设置图标名称映射
 */
export const Icon = ThemeWrapper(function (props: IconfontProp) {
  return (
    props.content ? (
      <Text style={{
        color: ThemeSelector.color(props.color, Color.black),
        fontSize: props.size || 20,
        ...props.style,
        fontFamily: props.fontFamily || 'iconfont',
      }}>{props.content}</Text>
    ) : (props.icon ?
      <Text style={{
        color: ThemeSelector.color(props.color, Color.black),
        fontSize: props.size || 20,
        ...props.style,
        fontFamily: props.fontFamily || 'iconfont',
      }}>{iconFontMap[props.icon]}</Text>
      : <Text style={props.style} />
    )
  );
});
