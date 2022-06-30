import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const styles = StyleSheet.create({
  italic: {
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: '500',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  p: {
    marginVertical: 13,
  },
});

/**
 * 换行组件。类似于 HTML 中的 <br> 标签。
 */
export function Br(props: TextProps) {
  return (<Text {...props}>{'\n'}</Text>);
}


/**
 * 加粗文字组件。类似于 HTML 中的 <b> 标签。
 */
export function B(props: TextProps) {
  return (<Text {...props} style={[ styles.bold, props.style ]} />);
}

/**
 * 斜体文字组件。类似于 HTML 中的 <i> 标签。
 */
export function I(props: TextProps) {
  return (<Text {...props} style={[ styles.italic, props.style ]} />);
}


/**
 * 下划线文字组件。类似于 HTML 中的 <u> 标签。
 */
export function U(props: TextProps) {
  return (<Text {...props} style={[ styles.underline, props.style ]} />);
}


/**
 * 删除线文字组件。类似于 HTML 中的 <strike> 标签。
 */
export function S(props: TextProps) {
  return (<Text {...props} style={[ styles.lineThrough, props.style ]} />);
}

/**
 * 段落文字组件。类似于 HTML 中的 <p> 标签。
 */
 export function P(props: TextProps) {
  return (<Text {...props} style={[ styles.p, props.style ]} />);
}
