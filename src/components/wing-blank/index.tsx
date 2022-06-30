import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { SpaceDefines } from '../../styles/SizeStyles';

export interface WingBlankProps {
  children?: JSX.Element|JSX.Element[],
  /**
   * 自定义样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 大小，支持 'sm'、'md'、'lg' 三种预设大小，或者是数字大小
   */
  size?: 'sm' | 'md' | 'lg' | number;
}

/**
 * 两翼留白组件
 */
export class WingBlank extends React.Component<WingBlankProps, any> {
  static defaultProps = {
    size: 'lg',
  }

  render() {
    const { size, style, children } = this.props;
    const margin = typeof size === 'number' ? size : SpaceDefines[size || 'md'];
    return (
      <View style={[{ marginLeft: margin, marginRight: margin }, style]}>
        {children}
      </View>
    );
  }
}

export default WingBlank;
