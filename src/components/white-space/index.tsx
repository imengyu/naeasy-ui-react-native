import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { SpaceDefines } from '../../styles/SizeStyles';

export interface WhiteSpaceProps {
  /**
   * 自定义样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 背景颜色
   */
  backgroundColor?: string;
  /**
   * 是否高度占满
   */
  fullHeight?: boolean;
  /**
   * 是否宽度占满
   */
  fullWidth?: boolean;
  /**
   * 上下留白的间距，可选`xs`,`sm`,`md`,`lg`,`xl`，或者是数字大小。
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
}

/**
 * 上下留白
 */
export class WhiteSpace extends React.Component<WhiteSpaceProps> {
  render() {
    const { size, style, backgroundColor, fullHeight, fullWidth } = this.props;
    const space = typeof size === 'number' ? size : SpaceDefines[size || 'md'];
    return (
      <View style={[{ height: fullHeight ? '100%' : space, width: fullWidth ? '100%' : space, backgroundColor }, style]} />
    );
  }
}
