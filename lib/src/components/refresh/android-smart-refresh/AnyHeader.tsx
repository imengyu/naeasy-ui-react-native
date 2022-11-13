import React, { Component } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';
import { isAndroid } from '../../../utils';

const RCTAnyHeader = isAndroid ? requireNativeComponent('RCTAnyHeader') : undefined as any;

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
