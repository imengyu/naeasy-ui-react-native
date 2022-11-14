import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { ScrollView } from "react-native";
import { Color, DynamicColor, DynamicThemeStyleSheet, PressedColor, ThemeColor, ThemeSelector } from "../../styles";
import { deviceHeight, rpx } from "../../utils/StyleConsts";
import { displayNoneIfEmpty } from "../../utils/StyleTools";
import { ColumnView } from "../layout/ColumnView";
import { Popup } from "../Popup";
import { PopupContainerProps } from "../PopupContainer";
import { ThemeWrapper } from "../../theme/Theme";
import { RowView } from "../layout/RowView";
import { Button } from "../button/Button";

export interface ActionSheetProps extends Omit<PopupContainerProps, 'onClose'|'position'|'renderContent'> {
  /**
   * 是否显示动作面板
   */
  show: boolean;
  /**
   * 是否显示取消按扭，默认否
   */
  showCancel?: boolean;
  /**
   * 取消条目的文字
   */
  cancelText?: string;
  /**
   * 顶部标题
   */
  title?: string;
  /**
   * 选项上方的描述信息
   */
  description?: string;
  /**
   * 面板选项列表
   */
  actions?: ActionSheetItem[];
  /**
   * 是否在点击条目后自动关闭，默认否
   */
  autoClose?: boolean;
  /**
   * 是否在屏幕居中显示
   */
  center?: boolean;
  /**
   * 居中显示时的宽度
   */
  centerWidth?: string|number;
  /**
   * 条目文字颜色
   */
  textColor?: ThemeColor;
  /**
   * 关闭事件
   */
  onClose: () => void;
  /**
   * 选择事件
   */
  onSelect?: (index: number, name: string) => void;
  /**
   * 自定义渲染内容回调，设置后 actions 无效
   */
  renderContent?: (close: () => void) => JSX.Element|JSX.Element[],
}
export interface ActionSheetItem {
  /**
   * 标题
   */
  name: string;
  /**
   * 二级标题
   */
  subname?: string;
  /**
   * 选项文字颜色
   */
  color?: ThemeColor;
  /**
   * 是否加粗当前选项
   */
  bold?: boolean;
  /**
   * 是否禁用当前选项
   */
  disabled?: boolean;
}

const styles = DynamicThemeStyleSheet.create({
  topScroll: {
    maxHeight: deviceHeight - 200,
  },
  view: {
    position: 'relative',
  },
  viewCancel: {
    position: 'relative',
    backgroundColor: DynamicColor(Color.light),
    paddingTop: 10,
  },
  item: {
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DynamicColor(Color.white),
  },
  itemTitle: {
    fontSize: 16,
    color: DynamicColor(Color.text),
  },
  itemSubTitle: {
    fontSize: 13,
    color: DynamicColor(Color.textSecond),
    marginTop: 4,
  },
  titleView: {
    paddingVertical: 5,
  },
  titleViewBorder: {
    paddingVertical: 5,
    borderColor: DynamicColor(Color.white),
    borderBottomColor: DynamicColor(Color.border),
    borderWidth: 1,
  },
  titleTextView: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 16,
    color: DynamicColor(Color.text),
  },
  description: {
    fontSize: 13,
    color: DynamicColor(Color.textSecond),
  },
});

//#region ActionSheetItemProps

export interface ActionSheetItemProps {
  name: string;
  subname: string|undefined;
  bold: boolean|undefined;
  color: string|undefined;
  disabled: boolean|undefined;
  onPress: () => void;
}

/**
 * 动作面板条目按扭组件
 */
export const ActionSheetItem = ThemeWrapper(function (props: ActionSheetItemProps) {
  return (
    <TouchableHighlight
      style={styles.item}
      underlayColor={ThemeSelector.color(PressedColor(Color.white))}
      onPress={props.disabled === true ? undefined : props.onPress}
    >
      <ColumnView center>
        <Text style={[ styles.itemTitle, { color: ThemeSelector.color(props.disabled === true ? Color.grey : (props.color || Color.text)), fontWeight: props.bold ? 'bold' : 'normal' } ]}>{props.name}</Text>
        <Text style={[ styles.itemSubTitle, displayNoneIfEmpty(props.subname) ]}>{props.subname}</Text>
      </ColumnView>
    </TouchableHighlight>
  );
});

//#endregion

//#region ActionSheet

/**
 * ActionSheet 标题组件
 */
export function ActionSheetTitle(props: {
  /**
   * 标题
   */
  title?: string,
  /**
   * 说明
   */
  description?: string,
  /**
   * 取消按钮文字，如果不为空则会在左边添加一个取消按钮
   */
  cancelText?: string,
  /**
   * 确定按钮文字，如果不为空则会在右边添加一个确定按钮
   */
  confirmText?: string,
  /**
   * 取消按钮文字颜色
   */
  cancelTextColor?: ThemeColor,
  /**
   * 确定按钮文字颜色
   */
  confirmTextColor?: ThemeColor,
  /**
   * 是否显示底部边框，默认是
   */
  border?: boolean;
  /**
   * 取消按钮点击
   */
  onCancelPressed?: () => void;
  /**
   * 确定按钮点击事件
   */
  onConfirmPressed?: () => void;
}) {
  const {
    title, description, cancelText, confirmText, cancelTextColor = Color.text,
    border = true,
    confirmTextColor = Color.primary, onCancelPressed, onConfirmPressed,
  } = props;

  return (
    (title || description || cancelText || confirmText) ? (
    <RowView style={border ? styles.titleViewBorder : styles.titleView} justify="space-between">
      { cancelText ? <Button type="text" textColor={cancelTextColor} onPress={onCancelPressed}>{cancelText}</Button> : <View /> }
      <ColumnView style={styles.titleTextView} center>
        <Text style={[ styles.title, displayNoneIfEmpty(title) ]}>{title}</Text>
        <Text style={[ styles.description, displayNoneIfEmpty(description) ]}>{description}</Text>
      </ColumnView>
      { confirmText ? <Button type="text" textColor={confirmTextColor} onPress={onConfirmPressed}>{confirmText}</Button> : <View /> }
    </RowView>) : <></>
  );
}

const ActionSheetInner = ThemeWrapper(function (props: ActionSheetProps) {

  function onItemClick(item: ActionSheetItem, index: number) {
    if (typeof props.onSelect === 'function')
      props.onSelect(index, item.name);
    if (props.autoClose === true)
      onCancelClick();
  }
  function onCancelClick() {
    if (typeof props.onClose === 'function')
      props.onClose();
  }

  return (
    <ScrollView style={[
      styles.topScroll,
      { width: props.center ? (props.centerWidth || rpx(600)) : undefined },
    ]} bounces={false}>
      <ColumnView>
        <ActionSheetTitle title={props.title} description={props.description} />
        <ColumnView style={styles.view}>
          { props.actions?.map((item, index) => <ActionSheetItem
            key={index}
            name={item.name}
            bold={item.bold || false}
            color={ThemeSelector.color(item.color || props.textColor || Color.text)}
            subname={item.subname}
            disabled={item.disabled}
            onPress={() => onItemClick(item, index)}
          />) }
        </ColumnView>
        { props.showCancel === true ? <ColumnView style={styles.viewCancel}>
          <ActionSheetItem
            name={props.cancelText || '取消'}
            bold={false}
            color={ThemeSelector.color(props.textColor || Color.text)}
            subname={''}
            disabled={false}
            onPress={onCancelClick}
          />
        </ColumnView> : <></> }
      </ColumnView>
    </ScrollView>
  );
});

/**
 * 动作面板。底部弹起的模态面板，包含与当前情境相关的多个选项。
 */
export class ActionSheet extends React.Component<ActionSheetProps> {

  /**
   * 指令式打开 ActionSheet
   * @param showProps 参数, 类型同普通 ActionSheet ，但不支持传入 show 属性。
   */
  static show(showProps: Omit<ActionSheetProps, 'show'|'onClose'>) {
    const handle = Popup.show({
      round: true,
      closeable: showProps.showCancel,
      closeIcon: showProps.showCancel ? false : undefined,
      ...showProps,
      position: showProps.center ? "center" : "bottom",
      size: showProps.center ? (showProps.centerWidth || "80%") : "auto",
      renderContent: () => <ActionSheetInner
        { ...showProps }
        show
        autoClose={true}
        onClose={() => handle.close()}
      />,
    });
    return handle;
  }

  render(): React.ReactNode {
    return (
      <Popup
        round
        closeable={this.props.showCancel}
        closeIcon={this.props.showCancel ? false : undefined}
        { ...this.props }
        onClose={this.props.onClose}
        position="bottom"
        size="auto"
        renderContent={this.props.renderContent ? this.props.renderContent : () => <ActionSheetInner {...this.props} />}
      />
    );
  }
}

//#endregion
