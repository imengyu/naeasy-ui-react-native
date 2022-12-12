import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ThemeColor, useThemeContext } from '../../theme/Theme';

export interface WhiteSpaceProps {
  /**
   * 自定义样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 背景颜色
   */
  backgroundColor?: ThemeColor;
  /**
   * 是否高度占满
   * @default false
   */
  fullHeight?: boolean;
  /**
   * 是否宽度占满
   * @default false
   */
  fullWidth?: boolean;
  /**
   * 上下留白的间距，可选`mini`,`small`,`medium`,`large`,`larger`，或者是数字大小。
   * @default 'medium'
   */
  size?: 'mini' | 'small' | 'medium' | 'large' | 'larger' | number;
}

/**
 * 上下留白
 */
export function WhiteSpace(props: WhiteSpaceProps) {
  const {
    size = 'medium',
    style,
    backgroundColor,
    fullHeight = false,
    fullWidth = false,
  } = props;

  let space = typeof size === 'number' ? size : 0;

  const themeContext = useThemeContext();
  const themeData = themeContext.getThemeVars({
    WhiteSpaceMini: 5,
    WhiteSpaceSmall: 10,
    WhiteSpaceMedium: 20,
    WhiteSpaceLarge: 35,
    WhiteSpaceLarger: 50,
  });

  switch (size) {
    case 'larger': space = themeData.WhiteSpaceLarger; break;
    case 'large': space = themeData.WhiteSpaceLarge; break;
    case 'medium': space = themeData.WhiteSpaceMedium; break;
    case 'small': space = themeData.WhiteSpaceSmall; break;
    case 'mini': space = themeData.WhiteSpaceMini; break;
  }

  return (
    <View style={[{
      height: fullHeight ? '100%' : space,
      width: fullWidth ? '100%' : space,
      backgroundColor: themeContext.resolveThemeColor(backgroundColor),
    }, style]} />
  );
}
