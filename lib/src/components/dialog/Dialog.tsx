import React, { useState } from "react";
import { ActivityIndicator, TouchableHighlight, Text } from "react-native";
import { ScrollView } from "react-native";
import { Color, DynamicColor, DynamicThemeStyleSheet, PressedColor, ThemeColor, ThemeSelector } from "../../styles";
import { deviceHeight, deviceWidth } from "../../utils/StyleConsts";
import { borderRight, borderTop, displayNoneIfEmpty } from "../../utils/StyleTools";
import { ColumnView } from "../layout/ColumnView";
import { FlexView } from "../layout/FlexView";
import { Popup } from "../basic/Popup";
import { PopupContainerProps } from "../basic/PopupContainer";
import { ThemeWrapper } from "../../theme/Theme";
import { Icon } from "../basic/Icon";

export interface DialogProps extends Omit<PopupContainerProps, 'onClose'|'position'|'renderContent'> {
  /**
   * 对话框的标题
   */
  title?: string;
  /**
   * 对话框的图标，显示在标题上方，同 Icon 组件的图标名字。
   */
  icon?: string|JSX.Element;
  /**
   * 图标的颜色
   */
  iconColor?: ThemeColor|undefined;
  /**
   * 图标大小，默认40
   */
  iconSize?: number;
  /**
   * 对话框的内容
   */
  content?: string|React.ReactNode;
  /**
   * 对话框内容超高后是否自动滚动，默认是
   */
  contentScroll?: boolean;
  /**
   * 对话框内容自动滚动超高高度，
   * 默认是 `deviceHeight - deviceHeight / 3`
   */
  contentScrollMaxHeight?: number,
  /**
   * 对话框内容框边距，，默认是 [ 15, 20 ]
   * 支持数字或者数组
   * * 如果是数字，则设置所有方向边距
   * * 两位数组 [vetical,horizontal]
   * * 四位数组 [top,right,down,left]
   */
  contentPadding?: number|number[],
  /**
   * 自定义渲染对话框底部内容，注意，提供此项后原有自带按扭无效
   */
  bottomContent?: (onConfirm: (name?: string) => void, onCancel: () => void) => JSX.Element;
  /**
   * 底部按扭是否垂直排版，默认否
   */
  bottomVertical?: boolean;
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
   * 自定义其他按扭，这些按扭将在 cancel 和 confirm 之间显示，建议设置 bottomVertical 使按扭垂直排列。
   */
  customButtons?: {
    name: string,
    text: string,
    color?: ThemeColor|undefined,
    bold?: boolean,
  }[];
  /**
   * 是否显示取消按扭，默认否
   */
  showCancel?: boolean;
  /**
   * 是否显示确定按扭，默认是
   */
  showConfirm?: boolean;
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
  onConfirm?: (buttonName?: string) => void|Promise<void>;
}
export type DialogConfirmProps = Omit<DialogProps, 'show'|'showCancel'|'onClose'>;

const styles = DynamicThemeStyleSheet.create({
  dialog: {
    minWidth: deviceWidth - deviceWidth / 3,
    maxWidth: deviceWidth - deviceWidth / 10,
  },
  bottomView: {
    position: 'relative',
  },
  dialogButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    ...borderTop(1, 'solid', Color.divider, true),
    ...borderRight(1, 'solid', Color.divider, true),
  },
  dialogButtonHorz: {
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginTop: 8,
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: DynamicColor(Color.text),
    fontWeight: 'bold',
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
  vertical: boolean|undefined,
  buttonColor: ThemeColor|undefined,
  pressedColor?: ThemeColor|undefined,
  onPress: () => void;
}) {
  return (
    <TouchableHighlight
      style={[
        styles.dialogButton,
        props.vertical ? {} : styles.dialogButtonHorz,
      ]}
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
export const DialogInner = ThemeWrapper(function (props: Omit<DialogProps, 'show'>) {

  const [ buttomLoadingState, setButtomLoadingState ] = useState<Record<string, boolean>>({});

  const {
    customButtons,
    showCancel,
    showConfirm = true,
    cancelText = '取消',
    cancelColor = Color.text,
    confirmText = '确定',
    confirmColor = Color.primary,
    icon,
    iconSize = 40,
    iconColor,
    bottomVertical,
    title,
    content,
    contentScroll = true,
    contentScrollMaxHeight = deviceHeight - deviceHeight / 3,
    contentPadding = [ 15, 20 ],
    width,
    onCancel,
    onConfirm,
    bottomContent,
  } = props;

  function onPopupClose() {
    if (typeof props.onClose === 'function')
      props.onClose();
  }

  function setButtonLoadingStateByName(name: string, state: boolean) {
    return setButtomLoadingState((prev) => {
      return { ...prev, [name]: state };
    });
  }
  function checkAnyButtonLoading() {
    for (const key in buttomLoadingState) {
      if (buttomLoadingState[key] === true)
        return true;
    }
    return false;
  }

  function onCancelClick() {
    if (checkAnyButtonLoading())
      return;
    if (!onCancel) {
      onPopupClose();
      return;
    }
    const ret = onCancel();
    if (typeof ret === 'object') {
      setButtonLoadingStateByName('cancel', true);
      ret.then(() => {
        setButtonLoadingStateByName('cancel', false);
        onPopupClose();
      }).catch(() => {
        setButtonLoadingStateByName('cancel', false);
      });
    } else onPopupClose();
  }
  function onConfirmClick(name: string) {
    if (checkAnyButtonLoading())
      return;
    if (!onConfirm) {
      onPopupClose();
      return;
    }
    const ret = onConfirm(name);
    if (typeof ret === 'object') {
      setButtonLoadingStateByName(name, true);
      ret.then(() => {
        setButtonLoadingStateByName(name, false);
        onPopupClose();
      }).catch(() => {
        setButtonLoadingStateByName(name, false);
      });
    } else onPopupClose();
  }

  function renderButtons() {
    const arr = [] as JSX.Element[];

    if (showCancel) {
      arr.push(<DialogButton
        key="cancel"
        vertical={bottomVertical}
        text={cancelText}
        loading={buttomLoadingState.cancel}
        buttonColor={cancelColor}
        onPress={onCancelClick} />);
    }

    customButtons?.forEach((btn) => {
      arr.push(<DialogButton
        vertical={bottomVertical}
        key={btn.name}
        text={btn.text}
        loading={buttomLoadingState[btn.name]}
        buttonColor={btn.color || Color.text}
        onPress={() => onConfirmClick(btn.name)}
      />);
    });

    if (showConfirm) {
      arr.push(<DialogButton
        vertical={bottomVertical}
        key="confirm"
        text={confirmText}
        loading={buttomLoadingState.confirm}
        buttonColor={confirmColor}
        onPress={() => onConfirmClick('confirm')}
      />);
    }

    return arr;
  }

  return (
    <ColumnView style={[
      styles.dialog,
      { width: width },
    ]}>
      <ColumnView padding={contentPadding}>
        {/* 图标 */}
        {
          icon ?
            (<ColumnView style={styles.icon}>
            {
              typeof icon === 'string' ?
                <Icon icon={icon} color={iconColor} size={iconSize || 40} />
                : icon
            }</ColumnView>) : <></>
        }
        {/* 标题 */}
        <Text style={[ styles.title, displayNoneIfEmpty(title) ]}>{title}</Text>
        {/* 内容 */}
        {
          contentScroll ?
            (<ScrollView style={{ maxHeight: contentScrollMaxHeight }}>
              { typeof content === 'string' ? <Text style={styles.contentText}>{content}</Text> : content }
            </ScrollView>) :
            typeof content === 'string' ? <Text style={styles.contentText}>{content}</Text> : content
        }
      </ColumnView>
      {/* 底部按钮 */}
      {
        bottomContent ?
          bottomContent((name) => onConfirmClick(name || 'confirm'), onCancelClick) :
          <FlexView direction={bottomVertical ? 'column' : 'row'} style={styles.bottomView}>
            { renderButtons() }
          </FlexView>
      }
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
