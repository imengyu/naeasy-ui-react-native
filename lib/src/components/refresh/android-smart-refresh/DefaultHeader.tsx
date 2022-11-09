import React, { Component } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTDefaultHeader = requireNativeComponent('RCTDefaultHeader');

interface DefaultHeaderProps extends ViewProps {
  primaryColor?: string;
  accentColor?: string,
  spinnerStyle?: 'translate'|'fixBehind'|'scale'|'fixFront'|'matchLayout',
}

/**
 * SmartRefreshControl 的默认刷新头
 */
export class SmartRefreshControlDefaultHeader extends Component<DefaultHeaderProps> {
  render() {
    return ( < RCTDefaultHeader { ...this.props } />);
  }
}
