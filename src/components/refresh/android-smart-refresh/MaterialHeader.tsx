import React, { Component } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTMaterialHeader = requireNativeComponent('RCTMaterialHeader');

/**
 * SmartRefreshControl 谷歌默认样式刷新头
 */
class MaterialHeader extends Component<ViewProps> {
  render() {
    return <RCTMaterialHeader {...this.props} />;
  }
}

export default MaterialHeader;
