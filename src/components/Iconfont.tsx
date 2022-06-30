import React from 'react';
import { Text, TextStyle } from 'react-native';

const IconFontMap = require('../data/IconFontMap').default;

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
}

/**
 * IconFont 图标
 *
 * 当前项目使用图标库, 图标的名字请在开发者》测试页面》组件》Icon页面中查看
 */
export function Iconfont(props: IconfontProp) {
  return (
    props.content ? (
      <Text style={{
        color: props.color,
        fontSize: props.size || 20,
        ...props.style,
        fontFamily: 'iconfont',
      }}>{props.content}</Text>
    ) : (props.icon ?
      <Text style={{
        color: props.color,
        fontSize: props.size || 20,
        ...props.style,
        fontFamily: 'iconfont',
      }}>{IconFontMap[props.icon]}</Text>
      : <Text style={props.style} />
    )
  );
}
