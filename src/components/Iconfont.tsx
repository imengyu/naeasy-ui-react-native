import React from 'react';
import { Text, TextStyle } from 'react-native';

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
  color?: string|undefined,
  /**
   * 图标文字样式
   */
  style?: TextStyle,
  /**
   * 图标文字字体类名 默认是 iconfont
   */
  fontFamily?: string,
}

let iconFontMap = {} as { [index: string]: string };

/**
 * 设置 Iconfont 组件的图标名称映射
 */
export function configIconfontMap(map: { [index: string]: string }) {
  iconFontMap = map;
}

/**
 * IconFont 图标
 *
 * 可以使用 configIconfontMap 函数设置图标名称映射
 */
export function Iconfont(props: IconfontProp) {
  return (
    props.content ? (
      <Text style={{
        color: props.color,
        fontSize: props.size || 20,
        ...props.style,
        fontFamily: props.fontFamily || 'iconfont',
      }}>{props.content}</Text>
    ) : (props.icon ?
      <Text style={{
        color: props.color,
        fontSize: props.size || 20,
        ...props.style,
        fontFamily: props.fontFamily || 'iconfont',
      }}>{iconFontMap[props.icon]}</Text>
      : <Text style={props.style} />
    )
  );
}
