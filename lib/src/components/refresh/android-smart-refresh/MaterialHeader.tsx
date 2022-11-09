import React, { Component } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTMaterialHeader = requireNativeComponent('RCTMaterialHeader');

/**
 * SmartRefreshControl 谷歌默认样式刷新头
 */
export class SmartRefreshControlMaterialHeader extends Component<ViewProps> {
  render() {
    return <RCTMaterialHeader {...this.props} />;
  }
}
