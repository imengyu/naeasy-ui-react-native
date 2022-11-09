import React, { ReactNode } from 'react';
import { FlexView, FlexViewProp } from './FlexView';

/**
 * 一个flex row布局的View，方便布局
 */
export class RowView extends React.PureComponent<FlexViewProp> {
  render(): ReactNode {
    return <FlexView direction="row" {...this.props} />;
  }
}
