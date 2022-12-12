import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useThemeContext } from '../../theme/Theme';

export interface WingBlankProps {
  children?: JSX.Element|JSX.Element[],
  /**
   * 自定义样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 大小，支持 'small'、'medium'、'large' 三种预设大小，或者是数字大小
   * @defalut 'medium'
   */
  size?: 'small' | 'medium' | 'large' | number;
}

/**
 * 两翼留白组件
 */
export function WingBlank(props: WingBlankProps) {
  const {
    size = 'medium',
    style,
    children,
  } = props;

  const themeContext = useThemeContext();
  const themeData = themeContext.getThemeVars({
    WingBlankSizeSmall: 5,
    WingBlankSizeMedium: 10,
    WingBlankSizeLarge: 20,
  });

  let margin = typeof size === 'number' ? size : 0;
  switch (size) {
    case 'large': margin = themeData.WingBlankSizeLarge; break;
    case 'medium': margin = themeData.WingBlankSizeMedium; break;
    case 'small': margin = themeData.WingBlankSizeSmall; break;
  }

  return (
    <View style={[{ marginLeft: margin, marginRight: margin }, style]}>
      {children}
    </View>
  );
}
