
import React from "react";
import { Text, TextProps } from "./Text";
import { Color } from "../../styles";
import { StyleSheet } from "react-native";
import { DynamicColorVar, DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";

/**
 * 标题组件
 */

const styles = StyleSheet.create({
  h1: {
    marginBottom: DynamicVar('Heading1MarginBottom', 10),
    fontSize: DynamicVar('Heading1FontSize', 32),
    fontWeight: DynamicVar('Heading1FontWeight', '500'),
    color: DynamicColorVar('Heading1Color', Color.text),
  },
  h2: {
    marginBottom: DynamicVar('Heading2MarginBottom', 10),
    fontSize: DynamicVar('Heading2FontSize', 24),
    fontWeight: DynamicVar('Heading2FontWeight', '500'),
    color: DynamicColorVar('Heading2Color', Color.text),
  },
  h3: {
    marginBottom: DynamicVar('Heading3MarginBottom', 10),
    fontSize: DynamicVar('Heading3FontSize', 18),
    fontWeight: DynamicVar('Heading3FontWeight', '500'),
    color: DynamicColorVar('Heading3Color', Color.text),
  },
  h4: {
    marginBottom: DynamicVar('Heading4MarginBottom', 10),
    fontSize: DynamicVar('Heading4FontSize', 15),
    fontWeight: DynamicVar('Heading4FontWeight', '500'),
    color: DynamicColorVar('Heading4Color', Color.text),
  },
  h5: {
    marginBottom: DynamicVar('Heading5MarginBottom', 10),
    fontSize: DynamicVar('Heading5FontSize', 13),
    fontWeight: DynamicVar('Heading5FontWeight', '500'),
    color: DynamicColorVar('Heading5Color', Color.text),
  },
  h6: {
    marginBottom: DynamicVar('Heading6MarginBottom', 10),
    fontSize: DynamicVar('Heading6FontSize', 11),
    fontWeight: DynamicVar('Heading6FontWeight', '500'),
    color: DynamicColorVar('Heading6Color', Color.text),
  },
});


/**
 * 类似于 HTML 中的 h1 标签。
 */
export function H1(props: TextProps) {
  const themeStyles = useThemeStyles(styles);
  return (<Text style={themeStyles .h1} {...props} />);
}
/**
 * 类似于 HTML 中的 h2 标签。
 */
export function H2(props: TextProps) {
  const themeStyles = useThemeStyles(styles);
  return (<Text style={themeStyles.h2} {...props} />);
}
/**
 * 类似于 HTML 中的 h3 标签。
 */
export function H3(props: TextProps) {
  const themeStyles = useThemeStyles(styles);
  return (<Text style={themeStyles.h3} {...props} />);
}
/**
 * 类似于 HTML 中的 h4 标签。
 */
export function H4(props: TextProps) {
  const themeStyles = useThemeStyles(styles);
  return (<Text style={themeStyles.h4} {...props} />);
}
/**
 * 类似于 HTML 中的 h5 标签。
 */
export function H5(props: TextProps) {
  const themeStyles = useThemeStyles(styles);
  return (<Text style={themeStyles.h5} {...props} />);
}
/**
 * 类似于 HTML 中的 h6 标签。
 */
export function H6(props: TextProps) {
  const themeStyles = useThemeStyles(styles);
  return (<Text style={themeStyles.h6} {...props} />);
}
