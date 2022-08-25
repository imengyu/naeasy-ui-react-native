import React, { Component, createRef } from 'react';
import {
  requireNativeComponent,
  findNodeHandle,
  UIManager,
  NativeModules,
  Platform,
  PanResponder,
  ViewProps,
  PanResponderInstance,
  HostComponent,
  NativeSyntheticEvent,
  NativeMethods,
} from 'react-native';
import { SmartRefreshControlDefaultHeader } from './DefaultHeader';

const SPModule = Platform.OS === 'android' ? (NativeModules.SpinnerStyleModule || {}) : {};

const SmartRefreshLayout = Platform.OS === 'android' ? requireNativeComponent('SmartRefreshLayout') as HostComponent<SmartRefreshControlInternalProps> : undefined;

interface SmartRefreshControlHeaderEventData {
  headerHeight: number;
}
interface SmartRefreshControlHeaderPullingEventData extends SmartRefreshControlHeaderEventData {
  percent: number;
  offset: number;
}
interface SmartRefreshControlFooterMovingEventData {
  footerHeight: number;
  percent: number;
  offset: number;
}
interface SmartRefreshControlFooterReleasedEventData {
  footerHeight: number;
  maxDragHeight: number;
}
//内部使用事件
interface SmartRefreshControlInternalProps extends ViewProps {
  onSmartRefresh?: () => void,
  onRefresh?: () => void,
  onLoadMore?: () => void,
  onHeaderPulling?: (e : NativeSyntheticEvent<SmartRefreshControlHeaderPullingEventData>) => void,
  onHeaderReleased?: (e : NativeSyntheticEvent<SmartRefreshControlHeaderEventData>) => void,
  onFooterReleased?: (e : NativeSyntheticEvent<SmartRefreshControlFooterReleasedEventData>) => void,
  onFooterMoving?: (e : NativeSyntheticEvent<SmartRefreshControlFooterMovingEventData>) => void,
  onPullDownToRefresh?: () => void,
  onReleaseToRefresh?: () => void,
}


export interface SmartRefreshControlProps extends ViewProps, SmartRefreshControlInternalProps {
  /**
   * 是否启用下拉刷新功能
   */
  enableRefresh?: boolean,
  /**
   * 自定义渲染头部
   */
  renderHeader?: (() => JSX.Element)|JSX.Element,
  /**
   * 头部高度
   */
  headerHeight?: number,
  /**
   * 是否使用越界回弹
   */
  overScrollBounce?: boolean,
  /**
   * 是否使用越界拖动，类似IOS样式
   */
  overScrollDrag?: boolean,
  /**
   * 是否使用纯滚动模式
   */
  pureScroll?: boolean,
  /**
   *  显示下拉高度/手指真实下拉高度=阻尼效果
   */
  dragRate?: number,
  /**
   * 最大显示下拉高度/Header标准高度
   */
  maxDragRate?: number,
  /**
   * 主题颜色
   */
  primaryColor?: string,
  /**
   * 是否启动自动刷新
   */
  autoRefresh?: {
    refresh: boolean,
    time: number,
  },
}

/**
 * Android 的 SmartRefresh 封装组件
 */
export class SmartRefreshControl extends Component<SmartRefreshControlProps> {
  static constants = {
    TRANSLATE: SPModule.translate,
    SCALE: SPModule.scale,
    FIX_BEHIND: SPModule.fixBehind,
    FIX_FRONT: SPModule.fixFront,
    MATCH_LAYOUT: SPModule.matchLayout,
  };

  /**
   * 手动完成刷新
   * @param delayed 结束延时（ms）
   * @param success 是否成功
   * @param hasMoreData 是否还有数据
   */
  finishRefresh = (delayed = -1, success = true, hasMoreData = false) => {
    this.dispatchCommand('finishRefresh', [ delayed, success, hasMoreData ]);
  };

  private dispatchCommand = (commandName: string, params: unknown[]) => {
    UIManager.dispatchViewManagerCommand(
      this.findNode(),
      UIManager.getViewManagerConfig('SmartRefreshLayout').Commands[commandName].toString(),
      params,
    );
  };
  private findNode = () => {
    return findNodeHandle(this.refreshLayoutRef.current);
  };

  private _panResponder : PanResponderInstance|null = null;

  componentDidMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => {
        if (this.shiftPercent >= 0.039 || this.footerShiftPercent >= 0.068) {
          //满足条件捕获事件
          return true;
        }
        return false;
      },
    });
  }

  shiftPercent = 0; //header位移百分比，默认为0
  footerShiftPercent = 0; // footer位移百分比

  /**
   * 渲染Header
   */
  private renderHeader = () => {
    const { renderHeader } = this.props;
    if (renderHeader)
      return typeof renderHeader === 'function' ?  renderHeader() : renderHeader;
    return <SmartRefreshControlDefaultHeader />;
  };
  /**
   * 刷新时触发
   * @private
   */
  _onSmartRefresh = () => {
    let { onRefresh } = this.props;
    onRefresh && onRefresh();
  };
  /**
   * 下拉过程
   * @param event
   * @private
   */
  _onHeaderPulling = (event: NativeSyntheticEvent<SmartRefreshControlHeaderPullingEventData>) => {
    this.shiftPercent = event.nativeEvent.percent;
    let { onHeaderPulling } = this.props;
    onHeaderPulling && onHeaderPulling(event);
  };
  /**
   * 释放过程
   * @param event
   * @private
   */
  _onHeaderReleased = (event: NativeSyntheticEvent<SmartRefreshControlHeaderEventData>) => {
    this.shiftPercent = 1;
    let { onHeaderReleased } = this.props;
    onHeaderReleased && onHeaderReleased(event);
  };
  /**
   * 底部位移过程
   * @param event
   * @private
   */
  _onFooterMoving = (event: NativeSyntheticEvent<SmartRefreshControlFooterMovingEventData>) => {
    this.footerShiftPercent = event.nativeEvent.percent;
  };

  private refreshLayoutRef = createRef<Component<SmartRefreshControlInternalProps> & Readonly<NativeMethods>>();

  render() {
    const nativeProps = {
      ...this.props,
      ...{
        onSmartRefresh: this._onSmartRefresh,
        onHeaderPulling: this._onHeaderPulling,
        onHeaderReleased: this._onHeaderReleased,
        onFooterMoving: this._onFooterMoving,
        primaryColor: this.props.primaryColor,
      },
    };
    return (
      SmartRefreshLayout ?
        <SmartRefreshLayout
          ref={this.refreshLayoutRef}
          {...nativeProps}
          { ...(this._panResponder ? this._panResponder.panHandlers : {})}>
          {this.renderHeader()}
          {this.props.children}
        </SmartRefreshLayout> :
        <></>
    );
  }
}
