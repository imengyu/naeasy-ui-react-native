import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

/**
 * 标题组件
 */


const styles = StyleSheet.create({
  h1: {
    marginBottom: 10,
    fontSize: 32,
    fontWeight: '500',
  },
  h2: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: '500',
  },
  h3: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  h4: {
    marginBottom: 10,
    fontWeight: '500',
  },
  h5: {
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '500',
  },
  h6: {
    marginBottom: 10,
    fontSize: 11,
    fontWeight: '500',
  },
});


/**
 * 类似于 HTML 中的 h1 标签。
 */
export function H1(props: TextProps) {
  return (<Text style={styles.h1} {...props} />);
}
/**
 * 类似于 HTML 中的 h2 标签。
 */
export function H2(props: TextProps) {
  return (<Text style={styles.h2} {...props} />);
}
/**
 * 类似于 HTML 中的 h3 标签。
 */
export function H3(props: TextProps) {
  return (<Text style={styles.h3} {...props} />);
}
/**
 * 类似于 HTML 中的 h4 标签。
 */
export function H4(props: TextProps) {
  return (<Text style={styles.h4} {...props} />);
}
/**
 * 类似于 HTML 中的 h5 标签。
 */
export function H5(props: TextProps) {
  return (<Text style={styles.h5} {...props} />);
}
/**
 * 类似于 HTML 中的 h6 标签。
 */
export function H6(props: TextProps) {
  return (<Text style={styles.h6} {...props} />);
}
