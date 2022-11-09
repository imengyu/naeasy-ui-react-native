import React from 'react';
import { FlexView, FlexViewProp } from './FlexView';

/**
 * 一个flex column布局的View，方便布局
 */
 export class ColumnView extends React.PureComponent<FlexViewProp> {
  render(): React.ReactNode {
    return <FlexView direction="column" {...this.props} />;
  }
}
