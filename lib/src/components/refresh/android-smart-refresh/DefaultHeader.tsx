import React, { Component } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';
import { isAndroid } from '../../../utils';

let RCTDefaultHeader = undefined as any;

interface DefaultHeaderProps extends ViewProps {
  primaryColor?: string;
  accentColor?: string,
  spinnerStyle?: 'translate'|'fixBehind'|'scale'|'fixFront'|'matchLayout',
}

/**
 * SmartRefreshControl 的默认刷新头
 */
export class SmartRefreshControlDefaultHeader extends Component<DefaultHeaderProps> {
  componentDidMount(): void {
    if (RCTDefaultHeader === undefined)
      RCTDefaultHeader = isAndroid ? requireNativeComponent('RCTDefaultHeader') : null as any;
  }
  render() {
    return ( < RCTDefaultHeader { ...this.props } />);
  }
}
