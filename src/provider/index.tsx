import * as React from 'react';
import Portal from '../portal';

export interface ProviderProps {
  children: JSX.Element|JSX.Element[],
}

/**
 * Provider
 */
export class Provider extends React.Component<ProviderProps> {
  render() {
    return (
      <Portal.Host>{this.props.children}</Portal.Host>
    );
  }
}
