import React from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import { Button } from '../button/Button';
import { ColumnView } from '../layout';

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
  children?: React.ReactElement|JSX.Element[];
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

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error('[ErrorBoundary]', error, info);
  }

  onRetry() {
    this.setState({
      hasError: false,
    });
  }

  renderError() {
    return this.props.renderErrorView ? this.props.renderErrorView(this.state.errorInfo, () => this.onRetry()) : (
      <ColumnView center style={styles.container}>
        <Image style={styles.image} source={require('../../images/empty-image-error.png')} />
        <Text style={styles.text}>{'组件渲染错误：' + this.state.errorInfo}</Text>
        <Button type="primary" shape="round" onPress={() => this.onRetry()}>重试</Button>
      </ColumnView>
    );
  }

  render() {
    if (this.state.hasError)
      return this.renderError();
    return this.props.renderChildren ? this.props.renderChildren() : this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
