import React from 'react';
import { Button } from '../button/Button';
import { Empty } from '../Empty';

export interface ErrorBoundaryProps {
  /**
   * 当出错时，可以自定义渲染错误视图。
   * * error：
   * * retry： 可以用于“重试”按钮，调用此函数会尝试重置当前组件
   */
  renderErrorView?: (error: unknown, retry: () => void) => React.ReactElement;
  /**
   * 在回调中渲染子组件以便于可以捕获错误
   */
  renderChildren?: () => React.ReactElement;
  /**
   * 子组件
   */
  children?: React.ReactElement;
}
interface ErrorBoundaryState {
  hasError: boolean,
  errorInfo: unknown,
}

/**
 * 错误边界，一般用于应用根组件，捕获组件渲染时的异常。
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error('[ErrorBoundary]', error, info);
    this.setState({ hasError: true, errorInfo: error });
  }

  onRetry() {
    this.setState({
      hasError: false,
    });
  }

  renderError() {
    return this.props.renderErrorView ? this.props.renderErrorView(this.state.errorInfo, () => this.onRetry()) : (
      <Empty
        image="error"
        description={'组件渲染异常：' + this.state.errorInfo}
      >
        <Button type="primary" shape="round" onPress={() => this.onRetry()}>重试</Button>
      </Empty>
    );
  }

  render() {
    if (this.state.hasError)
      return this.renderError();
    return this.props.renderChildren ? this.props.renderChildren() : this.props.children;
  }
}
