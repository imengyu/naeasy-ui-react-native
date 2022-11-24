import React from "react";
import { Linking, Platform, TouchableOpacity } from "react-native";
import { DynamicColor, DynamicThemeStyleSheet } from "../../styles/DynamicThemeStyleSheet";
import { ThemeWrapper } from "../../theme/Theme";
import { Color } from "../../styles";
import { Text, TextProps } from "./Text";

const styles = DynamicThemeStyleSheet.create({
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
    marginVertical: 13,
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
export const B = ThemeWrapper(function (props: TextProps) {
  return (<Text {...props} style={[ styles.bold, props.style ]} />);
});

/**
 * 斜体文字组件。类似于 HTML 中的 <i> 标签。
 */
export const I = ThemeWrapper(function (props: TextProps) {
  return (<Text {...props} style={[ styles.italic, props.style ]} />);
});


/**
 * 下划线文字组件。类似于 HTML 中的 <u> 标签。
 */
export const U = ThemeWrapper(function (props: TextProps) {
  return (<Text {...props} style={[ styles.underline, props.style ]} />);
});

/**
 * 下划线链接文字组件。类似于 HTML 中的 <a> 标签。
 */
export const A = ThemeWrapper(function (props: LinkProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        props.onPress?.();
        if (Platform.OS !== 'web' && props.href)
          Linking.openURL(props.href);
      }}
    >
      <Text {...props} style={[ styles.link, props.style ]} />
    </TouchableOpacity>
  );
});

/**
 * 删除线文字组件。类似于 HTML 中的 <strike> 标签。
 */
export const S = ThemeWrapper(function (props: TextProps) {
  return (<Text {...props} style={[ styles.lineThrough, props.style ]} />);
});

/**
 * 段落文字组件。类似于 HTML 中的 <p> 标签。
 */
 export const P = ThemeWrapper(function (props: TextProps) {
  return (<Text {...props} style={[ styles.p, props.style ]} />);
});
