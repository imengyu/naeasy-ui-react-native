import React from "react";
import { Linking, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Color } from "../../styles";
import { Text, TextProps } from "./Text";
import { rpx } from "../../utils";
import { DynamicColor, useThemeStyle } from "../../theme/ThemeStyleSheet";

const styles = StyleSheet.create({
  italic: {
    color: DynamicColor(Color.text),
    fontStyle: 'italic',
  },
  bold: {
    color: DynamicColor(Color.text),
    fontWeight: 'bold',
  },
  underline: {
    color: DynamicColor(Color.text),
    textDecorationLine: 'underline',
  },
  link: {
    color: DynamicColor(Color.link),
    textDecorationLine: 'underline',
  },
  lineThrough: {
    color: DynamicColor(Color.text),
    textDecorationLine: 'line-through',
  },
  p: {
    color: DynamicColor(Color.text),
    marginVertical: rpx(15),
  },
});

/**
 * A 组件的
 */
export interface LinkProps extends TextProps {
  /**
   * 点击事件
   */
  onPress?: () => void;
  /**
   * 链接, 如果提供，会调用 Link 打开链接
   */
  href?: string;
}

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
  const style = useThemeStyle(styles.bold);
  return (<Text {...props} style={[ style, props.style ]} />);
}

/**
 * 斜体文字组件。类似于 HTML 中的 <i> 标签。
 */
export function I(props: TextProps) {
  const style = useThemeStyle(styles.italic);
  return (<Text {...props} style={[ style, props.style ]} />);
}


/**
 * 下划线文字组件。类似于 HTML 中的 <u> 标签。
 */
export function U(props: TextProps) {
  const style = useThemeStyle(styles.underline);
  return (<Text {...props} style={[ style, props.style ]} />);
}

/**
 * 下划线链接文字组件。类似于 HTML 中的 <a> 标签。
 */
export function A(props: LinkProps) {
  const style = useThemeStyle(styles.link);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        props.onPress?.();
        if (Platform.OS !== 'web' && props.href)
          Linking.openURL(props.href);
      }}
    >
      <Text {...props} style={[ style, props.style ]} />
    </TouchableOpacity>
  );
}

/**
 * 删除线文字组件。类似于 HTML 中的 <strike> 标签。
 */
export function S(props: TextProps) {
  const style = useThemeStyle(styles.lineThrough);
  return (<Text {...props} style={[ style, props.style ]} />);
}

/**
 * 段落文字组件。类似于 HTML 中的 <p> 标签。
 */
export function P(props: TextProps) {
  const style = useThemeStyle(styles.p);
  return (<Text {...props} style={[ style, props.style ]} />);
}
