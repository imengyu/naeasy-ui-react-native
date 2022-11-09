import React, { Component } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTAnyHeader = requireNativeComponent('RCTAnyHeader');

interface AnyHeaderProps extends ViewProps {
  primaryColor?: string;
  spinnerStyle?: 'translate'|'fixBehind'|'scale'|'fixFront'|'matchLayout',
}

/**
 * SmartRefreshControl 的任意刷新头
 */
export class SmartRefreshControlAnyHeader extends Component<AnyHeaderProps> {
  render() {
    return <RCTAnyHeader {...this.props} />;
  }
}
