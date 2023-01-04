import React, { useState } from 'react';
import { View } from 'react-native';
import { PopupContainer, PopupContainerProps } from './PopupContainer';
import { Portal } from '../../portal';
import { ColumnView } from '../layout';
import { ActionSheetTitle } from '../dialog';

interface PopupState {
  currentShowKey: number|null,
}

/**
 * 指令式弹出层的组件实例
 */
export interface PopupStaticHandle {
  /**
   * Portal 的key
   */
  key: number|null,
  /**
   * 关闭对话框
   */
  close: () => void;
}

/**
 * 弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。
 *
 * ## 使用方法
 * ```jsx
 * <Popup
    show={this.state.showProp1}
    onClose={() => this.setState({ showProp1: false })}
    position="center"
    renderContent={() => (
      <ColumnView center style={{ padding: 10 }}>
        <Icon icon="success-filling" color={Color.success} size={50} />
        <Text>这个是弹出层自定义内容</Text>
        <Button text="关闭" onPress={() => this.setState({ showProp1: false }) } />
      </ColumnView>
    )}
  />
  <Button title="打开弹出框" onPress={() => this.setState({ showProp1: true })} />
 * ```
 */
export class Popup extends React.Component<PopupContainerProps, PopupState> {

  state: Readonly<PopupState> = {
    currentShowKey: null,
  };

  /**
   * 指令式打开弹出框
   * @param showProps 对话框参数, 类型同普通 Popup ，但不支持传入 show 属性。
   */
  static show(showProps: PopupShowProps) : PopupStaticHandle {
    //创建PopupContainer
    let refPopupContainer : PopupContainer|null = null;
    let key = Portal.add(
      <PopupContainer
        { ...showProps }
        ref={(r) => {refPopupContainer = r;}}
        show={true}
        onCloseAnimFinished={() => {
          refPopupContainer = null;
          popupStaticHandle.key = null;
          Portal.remove(key);
        }}
        onClose={(d) => {
          popupStaticHandle.close();
          showProps.onClose?.(d);
        }}
      />,
    );
    const popupStaticHandle = {
      key: null,
      close: () => {
        //关闭PopupContainer
        refPopupContainer?.close();
        refPopupContainer = null;
      },
    };

    return popupStaticHandle;
  }

  /**
   * 对自定义组件进行包装，附带一个显示了确定、取消的标题，然后下方是自定义弹出框组件内容。
   * 在自定义组件可以调用 onChangeConfirmReturnData 设置点击确定按钮后对话框返回的数据。
   * 在 onClose 回调中获取 onChangeConfirmReturnData 设置的数据。
   * @param component 组件
   */
  static wrapperControl(component: React.FunctionComponent<PopupWrapperControlProps>|React.ComponentClass<PopupWrapperControlProps>, title: string) {
    return (onClose: (returnData?: unknown) => void) => {
      let cConfirmReturnData = null as unknown;

      return (<ColumnView>
        <ActionSheetTitle
          title={title}
          cancelText="取消"
          onCancelPressed={() => onClose(null)}
          confirmText="确定"
          onConfirmPressed={() => onClose(cConfirmReturnData)}
        />
        { React.createElement(component as unknown as string, {
          onChangeConfirmReturnData: (v: unknown) => { cConfirmReturnData = v; },
          onCancel: () => onClose(),
        }) }
      </ColumnView>);
    };
  }
  /**
   * 对自定义简单组件（value、onValueChange）进行包装，然后在 onClose 回调中获取当前组件的数据
   *
   * 使用案例：
   * ```
    Popup.show({
      position: 'bottom',
      onClose(returnData) {
        if (returnData) {
          Toast.text('选择日期结果：' +  StringTools.formatTime(returnData as Date));
        }
      },
      renderContent: Popup.wrapperSimpleValueControl(DatePicker, '选择日期', new Date()),
    });
    ```
   * @param component 组件
   * @param title 标题
   * @param intitalValue 组件初始value
   * @param additionalProps 组件附加属性
   */
  static wrapperSimpleValueControl<T>(component: React.FunctionComponent<T>|React.ComponentClass<T>, title: string, intitalValue?: unknown, additionalProps?: T) {
    return Popup.wrapperControl((props) => {
      const [ value, setVale ] = useState(intitalValue);
      return React.createElement(component as React.FunctionComponent<any>, {
        value: value,
        onValueChange: (v: unknown) => {
          setVale(v);
          props.onChangeConfirmReturnData(v);
        },
        ...additionalProps,
      });
    }, title);
  }

  private refPopupContainer : PopupContainer|null = null;

  private doShowOrHideContainer() {
    if (this.props.show) {
      if (this.state.currentShowKey === null) {
        const key = Portal.add(
          <PopupContainer
            ref={(r) => {this.refPopupContainer = r;}}
            onCloseAnimFinished={() => {
              this.refPopupContainer = null;
              Portal.remove(key);
            }}
            { ...this.props }
          />,
        );
        this.setState({
          currentShowKey: key,
        });
      }
    } else {
      if (this.state.currentShowKey) {
        this.refPopupContainer?.close();
        this.refPopupContainer = null;
        this.setState({
          currentShowKey: null,
        });
      }
    }
  }

  /**
   * 关闭弹出层
   */
  close() {
    this.refPopupContainer?.close();
  }

  componentDidMount() {
    if (this.props.show)
      this.doShowOrHideContainer();
  }
  componentDidUpdate() {
    this.doShowOrHideContainer();
  }
  componentWillUnmount() {
    this.refPopupContainer?.close();
  }

  shouldComponentUpdate(nextProps : PopupContainerProps, _nextState : PopupState) {
    return nextProps.show !== (this.state.currentShowKey !== null);
  }

  render(): React.ReactNode {
    return (<View />);
  }
}


export interface PopupShowProps extends Omit<PopupContainerProps, 'show'|'onClose'> {
  /**
   * 弹窗关闭事件
   */
  onClose?: (returnData?: unknown) => void;
}
export interface PopupWrapperControlProps {
  onChangeConfirmReturnData: (v: unknown) => void;
  onCancel: () => void;
}
