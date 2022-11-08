import * as React from 'react';
import Portal from '../portal';
import { ThemeContext, ThemeType } from '../theme/Theme';
import { ThemeSelector } from '../styles/ThemeSelector';

export interface ProviderProps {
  theme?: ThemeType;
  children: JSX.Element|JSX.Element[],
}

/**
 * imengyu-ui-lib 的全局 Provider，包括主题相关
 */
export class Provider extends React.Component<ProviderProps> {
  render() {
    ThemeSelector.theme = this.props.theme || 'light';
    console.log('ThemeSelector.theme', ThemeSelector.theme);

    return (
      <ThemeContext.Provider value={this.props.theme || 'light'}>
        <Portal.Host>{this.props.children}</Portal.Host>
      </ThemeContext.Provider>
    );
  }
}
