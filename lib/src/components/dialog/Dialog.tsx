import React, { useState } from "react";
import { ActivityIndicator, TouchableHighlight, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Color, PressedColor } from "../../styles";
import { deviceHeight, deviceWidth } from "../../utils/StyleConsts";
import { ColumnView } from "../layout/ColumnView";
import { FlexView } from "../layout/FlexView";
import { Popup } from "../basic/Popup";
import { PopupContainerProps } from "../basic/PopupContainer";
import { Icon } from "../basic/Icon";
import { ThemeColor, useThemeContext } from "../../theme/Theme";
import { DynamicColorVar, DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";
import CheckTools from "../../utils/CheckTools";

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
   * @default Color.primary
   */
  iconColor?: ThemeColor|undefined;
  /**
   * 图标大小
   * @default 40
   */
  iconSize?: number;
  /**
   * 对话框的内容
   */
  content?: string|React.ReactNode;
  /**
   * 对话框内容超高后是否自动滚动
   * @default true
   */
  contentScroll?: boolean;
  /**
   * 对话框内容自动滚动超高高度，
   * @default deviceHeight - deviceHeight / 3
   */
  contentScrollMaxHeight?: number,
  /**
   * 对话框内容框边距。
   * 支持数字或者数组: 如果是数字，则设置所有方向边距；两位数组 [vetical,horizontal]；四位数组 [top,right,down,left]
   * @default [ 15, 20 ]
   */
  contentPadding?: number|number[],
  /**
   * 自定义渲染对话框底部内容，注意，提供此项后原有自带按扭无效
   */
  bottomContent?: (onConfirm: (name?: string) => void, onCancel: () => void) => JSX.Element;
  /**
   * 底部按扭是否垂直排版
   * @default false
   */
  bottomVertical?: boolean;
  /**
   * 取消按扭的文字
   * @default 取消
   */
  cancelText?: string|undefined;
  /**
   * 确定按扭的文字
   * @default 确定
   */
  confirmText?: string|undefined;
  /**
   * 确定按扭文字的颜色
   * @default Color.primary
   */
  confirmColor?: ThemeColor|undefined;
  /**
   * 取消按扭文字的颜色
   * @default Color.text
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
   * 是否显示取消按扭
   * @default false
   */
  showCancel?: boolean;
  /**
   * 是否显示确定按扭
   * @default true
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

const styles = StyleSheet.create({
  dialog: {
    minWidth: DynamicVar('DialogMinWidth', deviceWidth - deviceWidth / 3),
    maxWidth: DynamicVar('Dialog', deviceWidth - deviceWidth / 10),
  },
  bottomView: {
    position: 'relative',
  },
  dialogButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: DynamicVar('DialogButtonHeight', 45),
    borderTopWidth: DynamicVar('DialogButtonBorderTopWidth', 1),
    borderTopColor: DynamicColorVar('DialogButtonBorderTopColor', Color.border),
    borderRightWidth: DynamicVar('DialogButtonBorderTopWidth', 1),
    borderRightColor: DynamicColorVar('DialogButtonBorderTopColor', Color.border),
  },
  dialogButtonHorz: {
    flex: 1,
    borderBottomWidth: DynamicVar('DialogButtonBorderBottomWidth', 1),
    borderBottomColor: DynamicColorVar('DialogButtonBorderBottomColor', Color.border),
  },
  buttonText: {
    fontSize: DynamicVar('DialogButtonTextFontSize', 16),
    fontWeight: DynamicVar('DialogButtonTextFontWeight', 'bold'),
  },
  icon: {
    marginTop: DynamicVar('DialogIconMarginTop', 8),
    marginBottom: DynamicVar('DialogIconMarginBottom', 6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: DynamicVar('DialogTitleFontSize', 20),
    color: DynamicColorVar('DialogTitleColor', Color.text),
    fontWeight: DynamicVar('DialogTitleFontWeight', 'bold'),
    textAlign: 'center',
    marginBottom: DynamicVar('DialogTitleMarginBottom', 10),
  },
  contentText: {
    fontSize: DynamicVar('DialogContentTextFontSize', 14),
    color: DynamicColorVar('DialogContentTextColor', Color.textSecond),
    textAlign: DynamicVar('DialogContentTextAlign', 'center'),
  },
});

/**
 * 对话框底部按扭组件Props
 */
export interface DialogButtonProps {
  /**
   * 按钮文字
   */
  text?: string|undefined,
  /**
  * 按钮文字
  * @default false
  */
  loading?: boolean,
  /**
  * 按钮文字
  * @default false
  */
  vertical?: boolean|undefined,
  /**
  * 按钮文字
  * @default undefined
  */
  buttonColor?: ThemeColor|undefined,
  /**
  * 按钮文字
  * @default undefined
  */
  pressedColor?: ThemeColor|undefined,
  /**
   * 按钮点击事件
   */
  onPress: () => void;
}

/**
 * 对话框底部按扭组件
 */
export function DialogButton(props: DialogButtonProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    vertical = false,
    loading = false,
    buttonColor = themeContext.getThemeColorVar('DialogButtonDefaultButtonColor', Color.primary),
    pressedColor = themeContext.getThemeColorVar('DialogButtonDefaultPressedColor', PressedColor(Color.white)),
    onPress,
  } = props;

  return (
    <TouchableHighlight
      style={[
        themeStyles.dialogButton,
        vertical ? {} : themeStyles.dialogButtonHorz,
      ]}
      underlayColor={themeContext.resolveThemeColor(pressedColor)}
      onPress={loading ? undefined : onPress}
    >
      {
        loading ?
          <ActivityIndicator color={themeContext.resolveThemeColor(buttonColor)} /> :
          <Text style={[ themeStyles.buttonText, { color: themeContext.resolveThemeColor(buttonColor) } ]}>{props.text}</Text>
      }
    </TouchableHighlight>
  );
}
/**
 * 对话框内部内容组件
 */
export function DialogInner(props: Omit<DialogProps, 'show'>) {

  const [ buttomLoadingState, setButtomLoadingState ] = useState<Record<string, boolean>>({});

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    customButtons,
    showCancel,
    showConfirm = true,
    cancelText = '取消',
    cancelColor = themeContext.getThemeVar('DialogCancelColor', Color.text),
    confirmText = '确定',
    confirmColor = themeContext.getThemeVar('DialogConfirmColor', Color.primary),
    icon,
    iconSize = themeContext.getThemeVar('DialogIconSize', 40),
    iconColor = themeContext.getThemeVar('DialogIconColor', Color.primary),
    bottomVertical,
    title,
    content,
    contentScroll = true,
    contentScrollMaxHeight = themeContext.getThemeVar('DialogContentScrollMaxHeight', deviceHeight - deviceHeight / 3),
    contentPadding = themeContext.getThemeVar('DialogContentPadding', [ 15, 20 ]),
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
      themeStyles.dialog,
      { width: width },
    ]}>
      <ColumnView padding={contentPadding} align="center">
        {/* 图标 */}
        {
          icon ?
            (<ColumnView style={themeStyles.icon}>
            {
              typeof icon === 'string' ?
                <Icon icon={icon} color={iconColor} size={iconSize || 40} />
                : icon
            }</ColumnView>) : <></>
        }
        {/* 标题 */}
        { CheckTools.isNullOrEmpty(title) ? <></> : <Text style={themeStyles.title}>{title}</Text> }
        {/* 内容 */}
        {
          contentScroll ?
            (<ScrollView style={{ maxHeight: contentScrollMaxHeight }}>
              { typeof content === 'string' ? <Text style={themeStyles.contentText}>{content}</Text> : content }
            </ScrollView>) :
            typeof content === 'string' ? <Text style={themeStyles.contentText}>{content}</Text> : content
        }
      </ColumnView>
      {/* 底部按钮 */}
      {
        bottomContent ?
          bottomContent((name) => onConfirmClick(name || 'confirm'), onCancelClick) :
          <FlexView direction={bottomVertical ? 'column' : 'row'} style={themeStyles.bottomView}>
            { renderButtons() }
          </FlexView>
      }
    </ColumnView>
  );
}

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
