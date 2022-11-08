import React, { useState } from "react";
import { ActivityIndicator, TouchableHighlight, Text } from "react-native";
import { ScrollView } from "react-native";
import { Color, DynamicColor, DynamicThemeStyleSheet, PressedColor, ThemeColor, ThemeSelector } from "../../styles";
import { deviceHeight, deviceWidth } from "../../utils/StyleConsts";
import { borderRight, borderTop, displayNoneIfEmpty } from "../../utils/StyleTools";
import { ColumnView } from "../layout/ColumnView";
import { RowView } from "../layout/RowView";
import { Popup } from "../Popup";
import { PopupContainerProps } from "../PopupContainer";
import { ThemeWrapper } from "../../theme/Theme";

export interface DialogProps extends Omit<PopupContainerProps, 'onClose'|'position'|'renderContent'> {
  /**
   * 对话框的标题
   */
  title?: string;
  /**
   * 对话框的内容
   */
  content?: string|React.ReactNode;
  /**
   * 取消按扭的文字
   */
  cancelText?: string|undefined;
  /**
   * 确认按扭的文字
   */
  confirmText?: string|undefined;
  /**
   * 确认按扭文字的颜色
   */
  confirmColor?: ThemeColor|undefined;
  /**
   * 取消按扭文字的颜色
   */
  cancelColor?: ThemeColor|undefined;
  /**
   * 是否显示取消按扭
   */
  showCancel?: boolean;
  /**
   * 对话框宽度
   */
  width?: number|undefined;
  /**
   * 当对话框关闭时的回调
   */
  onClose?: () => void;
  /**
   * 当对话框点击取消时的回调
   */
  onCancel?: () => void|Promise<void>;
  /**
   * 当对话框点击确定的回调
   */
  onConfirm?: () => void|Promise<void>;
}
export interface DialogConfirmProps {
  /**
   * 对话框的标题
   */
  title?: string;
  /**
   * 对话框的内容
   */
  content?: string|React.ReactNode;
  /**
   * 对话框宽度
   */
  width?: number|undefined;
  /**
   * 取消按扭的文字
   */
  cancelText?: string|undefined;
  /**
   * 确认按扭的文字
   */
  confirmText?: string|undefined;
  /**
   * 确认按扭文字的颜色
   */
  confirmColor?: ThemeColor|undefined;
  /**
   * 取消按扭文字的颜色
   */
  cancelColor?: ThemeColor|undefined;
  /**
   * 是否显示取消按扭
   */
  showCancel?: boolean;
  /**
   * 当对话框点击取消时的回调
   */
  onCancel?: () => void|Promise<void>;
  /**
   * 当对话框点击确定的回调
   */
  onConfirm?: () => void|Promise<void>;
}

const styles = DynamicThemeStyleSheet.create({
  dialog: {
    minWidth: deviceWidth - deviceWidth / 3,
    maxWidth: deviceWidth - deviceWidth / 10,
  },
  dialogContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  dialogContentScroll: {
    maxHeight: deviceHeight - deviceHeight / 3,
  },
  bottomView: {
    position: 'relative',
    ...borderTop(1, 'solid', Color.divider, true),
  },
  dialogButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    flex: 1,
    ...borderRight(1, 'solid', Color.divider, true),
  },
  buttonText: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    color: DynamicColor(Color.text),
    textAlign: 'center',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 14,
    color: DynamicColor(Color.textSecond),
    textAlign: 'center',
  },
});

/**
 * 对话框底部按扭组件
 */
export const DialogButton = ThemeWrapper(function (props: {
  text: string|undefined,
  loading: boolean,
  buttonColor: ThemeColor|undefined,
  pressedColor?: ThemeColor|undefined,
  onPress: () => void;
}) {
  return (
    <TouchableHighlight
      style={styles.dialogButton}
      underlayColor={ThemeSelector.color(props.pressedColor || PressedColor(Color.white))}
      onPress={props.loading ? undefined : props.onPress}
    >
      {
        props.loading ?
          <ActivityIndicator color={ThemeSelector.color(props.buttonColor || Color.primary)} /> :
          <Text style={[ styles.buttonText, { color: ThemeSelector.color(props.buttonColor || Color.primary) } ]}>{props.text}</Text>
      }
    </TouchableHighlight>
  );
});
export const DialogInner = ThemeWrapper(function (props: {
  onClose?: () => void;
  onCancel?: () => void|Promise<void>;
  onConfirm?: () => void|Promise<void>;
  title?: string;
  content?: string|React.ReactNode;
  cancelText?: string|undefined;
  confirmText?: string|undefined;
  confirmColor?: ThemeColor|undefined;
  cancelColor?: ThemeColor|undefined;
  width?: number|undefined;
  showCancel?: boolean;
}) {
  const [ cancelLoading, setCancelLoading ] = useState(false);
  const [ confirmLoading, setConfirmLoading ] = useState(false);

  function onPopupClose() {
    if (typeof props.onClose === 'function')
      props.onClose();
  }

  function checkAnyButtonLoading() {
    return cancelLoading || confirmLoading;
  }
  function onCancelClick() {
    if (checkAnyButtonLoading())
      return;

    if (typeof props.onCancel === 'function') {
      //处理返回值是promise
      const ret = props.onCancel();
      if (typeof ret === 'object') {
        setCancelLoading(true);
        ret.then(() => {
          setCancelLoading(false);
          onPopupClose();
        }).catch(() => {
          setCancelLoading(false);
        });
      } else onPopupClose();
    }
    else onPopupClose();
  }
  function onConfirmClick() {
    if (checkAnyButtonLoading())
      return;
    if (typeof props.onConfirm === 'function') {
      //处理返回值是promise
      const ret = props.onConfirm();
      if (typeof ret === 'object') {
        setConfirmLoading(true);
        ret.then(() => {
          setConfirmLoading(false);
          onPopupClose();
        }).catch(() => {
          setConfirmLoading(false);
        });
      } else onPopupClose();
    }
    else onPopupClose();
  }

  return (
    <ColumnView style={[
      styles.dialog,
      { width: props.width },
    ]}>
      <ColumnView style={styles.dialogContent}>
        <Text style={[ styles.title, displayNoneIfEmpty(props.title) ]}>{props.title}</Text>
        <ScrollView style={styles.dialogContentScroll}>
          { typeof props.content === 'string' ? <Text style={styles.contentText}>{props.content}</Text> : props.content }
        </ScrollView>
      </ColumnView>
      <RowView style={styles.bottomView} accessibilityLabel="test">
        { props.showCancel ? <DialogButton text={props.cancelText || '取消'} loading={cancelLoading} buttonColor={props.cancelColor || Color.text} onPress={onCancelClick} /> : <></> }
        <DialogButton text={props.confirmText || '确定'} loading={confirmLoading} buttonColor={props.confirmColor || Color.primary} onPress={onConfirmClick} />
      </RowView>
    </ColumnView>
  );
});

/**
 * 一个对话框组件，允许你在弹出简单的对话框，或者在对话框中插入自定义内容。
 */
export class Dialog extends React.Component<DialogProps> {

  /**
   * 指令式打开对话框
   * @param showProps 对话框参数, 类型同普通 Dialog ，但不支持传入 show 属性。
   */
  static show(showProps: Omit<DialogProps, 'show'>) {
    const handle = Popup.show({
      round: true,
      closeIcon: false,
      position: "center",
      ...showProps,
      renderContent: () => <DialogInner { ...showProps } onClose={() => handle.close()} />,
    });
  }

  /**
   * alert 接受的参数同 show，但不支持一些自定义属性，它的返回值不是一个控制器对象，而是 Promise<void>。
   */
  static alert(showProps: Omit<DialogConfirmProps, 'cancelText'|'showCancel'|'onCancel'|'onConfirm'>) {
    return new Promise<void>((resolve) => {
      const handle = Popup.show({
        round: true,
        closeIcon: false,
        position: "center",
        ...showProps,
        renderContent: () => <DialogInner { ...showProps }
          onClose={() => handle.close()}
          onConfirm={() => resolve()}
          onCancel={() => resolve()}
        />,
      });
    });
  }
  /**
   * confirm 接受的参数同 show，但不支持一些自定义属性，它的返回值不是一个控制器对象，而是 Promise<boolean>。
   */
  static confirm(showProps: Omit<DialogConfirmProps, 'showCancel'|'onCancel'|'onConfirm'>) {
    return new Promise<boolean>((resolve) => {
      const handle = Popup.show({
        round: true,
        closeIcon: false,
        position: "center",
        ...showProps,
        renderContent: () => <DialogInner { ...showProps } showCancel
          onClose={() => handle.close()}
          onConfirm={() => resolve(true)}
          onCancel={() => resolve(false)}
        />,
      });
    });
  }

  render(): React.ReactNode {
    return (
      <Popup
        round
        closeIcon={false}
        { ...this.props }
        onClose={() => {
          if (typeof this.props.onClose === 'function')
            this.props.onClose();
        }}
        position="center"
        renderContent={() => (<DialogInner { ...this.props } />)}
      />
    );
  }
}
