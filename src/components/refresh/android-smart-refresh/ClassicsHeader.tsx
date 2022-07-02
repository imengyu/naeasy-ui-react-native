import React, { Component } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTClassicsHeader = requireNativeComponent('RCTClassicsHeader');

interface ClassicsHeaderProps extends ViewProps {
  primaryColor?: string;
  accentColor?: string,
  spinnerStyle?: 'translate'|'fixBehind'|'scale'|'fixFront'|'matchLayout',
}

/**
 * SmartRefreshControl 的经典样式刷新头
 */
export class SmartRefreshControlClassicsHeader extends Component<ClassicsHeaderProps> {
  render() {
    return <RCTClassicsHeader {...this.props} />;
  }
}
