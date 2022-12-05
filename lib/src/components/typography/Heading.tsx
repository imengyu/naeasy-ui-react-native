
import React from "react";
import { Text, TextProps } from "./Text";
import { Color, DynamicColor, StyleSheet } from "../../styles";
import { ThemeWrapper } from "../../theme/Theme";

/**
 * 标题组件
 */


const styles = StyleSheet.create({
  h1: {
    marginBottom: 10,
    fontSize: 32,
    fontWeight: '500',
    color: DynamicColor(Color.text),
  },
  h2: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: '500',
    color: DynamicColor(Color.text),
  },
  h3: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '500',
    color: DynamicColor(Color.text),
  },
  h4: {
    marginBottom: 10,
    fontWeight: '500',
    color: DynamicColor(Color.text),
  },
  h5: {
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '500',
    color: DynamicColor(Color.text),
  },
  h6: {
    marginBottom: 10,
    fontSize: 11,
    fontWeight: '500',
    color: DynamicColor(Color.text),
  },
});


/**
 * 类似于 HTML 中的 h1 标签。
 */
export const H1 = ThemeWrapper(function (props: TextProps) {
  return (<Text style={styles.h1} {...props} />);
});
/**
 * 类似于 HTML 中的 h2 标签。
 */
export const H2 = ThemeWrapper(function (props: TextProps) {
  return (<Text style={styles.h2} {...props} />);
});
/**
 * 类似于 HTML 中的 h3 标签。
 */
export const H3 = ThemeWrapper(function (props: TextProps) {
  return (<Text style={styles.h3} {...props} />);
});
/**
 * 类似于 HTML 中的 h4 标签。
 */
export const H4 = ThemeWrapper(function (props: TextProps) {
  return (<Text style={styles.h4} {...props} />);
});
/**
 * 类似于 HTML 中的 h5 标签。
 */
export const H5 = ThemeWrapper(function (props: TextProps) {
  return (<Text style={styles.h5} {...props} />);
});
/**
 * 类似于 HTML 中的 h6 标签。
 */
export const H6 = ThemeWrapper(function (props: TextProps) {
  return (<Text style={styles.h6} {...props} />);
});
