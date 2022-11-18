import CheckTools from "../../utils/CheckTools";
import React, { forwardRef, useImperativeHandle } from "react";
import { Text, TextStyle, TouchableHighlight, View, ViewStyle } from "react-native";
import { Button } from "../button/Button";
import { Icon } from "../basic/Icon";
import { RowView } from "../layout/RowView";
import { Popup } from "../basic/Popup";
import { FeedbackNative } from "../tools/Feedback";
import { WhiteSpace } from "../space/WhiteSpace";
import { Color, DynamicColor, DynamicThemeStyleSheet, PressedColor, ThemeColor, ThemeSelector } from "../../styles";
import { ThemeWrapper } from "../../theme/Theme";

export interface NumberKeyBoardProps extends NumberKeyBoardInnerProps {
  /**
   * 是否显示键盘
   */
  show: boolean;
  /**
   * 键盘关闭时发出事件
   */
  onBlur?: () => void;
}
export interface NumberKeyBoardInnerProps {
  /**
   * 键盘标题
   */
  title?: string;
  /**
   * 键盘额外按键。 showSideButtons 为 true 时可配置2个额外按键，false 时可配置1个额外按键。
   */
  extraKey?: string[];
  /**
   * 是否显示侧栏，当显示侧栏时，完成与删除按钮显示在侧栏，您可以使用 extraKey 配置额外的2个按键。
   */
  showSideButtons?: boolean;
  /**
   * 是否显示完成按钮
   */
  showFinishButton?: boolean;
  /**
   * 是否显示删除按钮
   */
  showDeleteButton?: boolean;
  /**
   * 完成按钮文字
   */
  finishButtonText?: string;
  /**
   * 按键高度，默认50
   */
  keyHeight?: number;
  /**
   * 自定义按键的样式
   */
  keyStyle?: ViewStyle;
  /**
   * 自定义按键文字的样式
   */
  keyTextStyle?: TextStyle;
  /**
   * 按键的背景颜色。默认白色
   */
  keyColor?: string;
  /**
   * 完成按键的文字颜色。默认black
   */
  keyTextColor?: ThemeColor;
  /**
   * 完成按键的背景颜色。默认primary
   */
  keyFinishColor?: ThemeColor;
  /**
   * 完成按键的文字颜色。默认white
   */
  keyFinishTextColor?: ThemeColor;
  /**
   * 完成按键的按下时的颜色
   */
  keyFinishPressedColor?: ThemeColor;
  /**
   * 自定义按键按下时的颜色
   */
  keyPressedColor?: ThemeColor;
  /**
   * 按键按下时是否有触感反馈，默认是
   * @platform iOS
   */
  keyPressedImpactFeedback?: boolean;
  /**
   * 键盘点击按键时发出事件
   */
  onInput?: (char: string) => void;
  /**
   * 键盘点击删除按钮时发出事件
   */
  onDelete?: () => void;
  /**
   * 键盘点击完成按钮时发出事件
   */
  onFinish?: () => void;
}
export interface NumberKeyBoardInstance {

}

const NumberKeyBoardKeys = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '',
];
const styles = DynamicThemeStyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
  },
  keyPadOut: {
    position: 'relative',
    flexDirection: 'row',
  },
  keyPadKeys: {
    flexDirection: 'row',
    flex: 3,
    flexWrap: 'wrap',
  },
  keyPadSide: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  key: {
    flexBasis: '33%',
    width: '33%',
    height: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: DynamicColor(Color.black),
    fontSize: 16,
  },
  keyText: {
    fontSize: 23,
  },
});

/**
 * 虚拟数字键盘的键盘内容组件，可单独嵌入其他对话框或者页面中。
 */
export const NumberKeyBoardInner = ThemeWrapper(function (props: NumberKeyBoardInnerProps) {

  const showSideButtons = props.showSideButtons === true;
  const keyFinishColor = props.keyFinishColor || Color.primary;
  const keyFinishPressedColor = props.keyFinishPressedColor || PressedColor(Color.white);
  const keyColor = props.keyColor || Color.white;
  const keyPressedColor = props.keyPressedColor || PressedColor(Color.white);
  const keyFinishTextColor = props.keyFinishTextColor || Color.white;
  const keyTextColor = props.keyTextColor || Color.black;
  const finishButtonText = props.finishButtonText || '完成';
  const keyHeight = props.keyHeight || 51;
  const extraKey = props.extraKey || [];
  const keyPressedImpactFeedback = props.keyPressedImpactFeedback !== false;
  const keyTextStyle = {
    ...styles.keyText,
    ...props.keyTextStyle,
    color: ThemeSelector.color(keyTextColor),
  };
  const keyTextStyleFinish = {
    ...styles.keyText,
    fontSize: 20,
    ...props.keyTextStyle,
    color: ThemeSelector.color(keyFinishTextColor),
  };

  function onFinish() {
    props.onFinish && props.onFinish();
  }

  function renderKey(text: string, icon: boolean, action = '', width = 0, height = 1) {

    const keyStyle = {
      ...styles.key,
      backgroundColor: ThemeSelector.color(action === 'finish' ? keyFinishColor : keyColor),
      flexBasis: `${width === 0 ? 33 : width}%`,
      width: `${width === 0 ? 33 : width}%`,
      height: keyHeight * height,
      minHeight: keyHeight * height,
      ...props.keyStyle,
    };

    //为空显示占位, 否则显示按钮
    return (
      CheckTools.isNullOrEmpty(text) ?
        <View
          key={text + action}
          style={keyStyle}
        /> :
        <TouchableHighlight
          key={text + action}
          style={keyStyle}
          underlayColor={ThemeSelector.color(action === 'finish' ? keyFinishPressedColor : keyPressedColor)}
          onPress={() => {
            if (keyPressedImpactFeedback)
              FeedbackNative.impactSelectionFeedbackGenerator();
            //键盘点击事件
            if (action === 'delete')
              props.onDelete && props.onDelete();
            else if (action === 'finish')
              onFinish();
            else
              props.onInput && props.onInput(text);
          }}
        >
          <View>
            {
              icon ?
                <Icon icon={text} style={keyTextStyle} /> :
                <Text style={action === 'finish' ? keyTextStyleFinish : keyTextStyle}>{text}</Text>
            }
          </View>
        </TouchableHighlight>
    );
  }

  function renderKeys() {
    const arr = [] as JSX.Element[];

    for (let i = 0; i < NumberKeyBoardKeys.length; i++) {
      if (!showSideButtons) {
        if (i === 9)
          arr.push(renderKey(extraKey.length >= 1 ? extraKey[0] : '', false, 'extra1')); //附加按键1
        else if (i === 11)
          arr.push(renderKey('delete', true, 'delete')); //后退键
        else
          arr.push(renderKey(NumberKeyBoardKeys[i], false)); //正常按键
      } else {
        if (i === 9 || i === 11) {
          if (i === 9 && extraKey.length >= 1)
            arr.push(renderKey(extraKey[0], false, 'extra1')); //附加按键1
          else if (i === 11 && extraKey.length >= 2)
            arr.push(renderKey(extraKey[1], false, 'extra2')); //附加按键2
        }
        else {
          let w = 0;
          if (i === 10 && extraKey.length < 2)
            w = extraKey.length === 1 ? 66 : 100;
          arr.push(renderKey(NumberKeyBoardKeys[i], false, '', w)); //正常按键
        }
      }
    }

    return arr;
  }
  function renderSideButtons() {
    const arr = [] as JSX.Element[];
    arr.push(renderKey('delete', true, 'delete', 100, 2)); //后退键
    arr.push(renderKey(finishButtonText, false, 'finish', 100, 2)); //完成键
    return arr;
  }

  return (
    <View style={styles.container}>
      { /* 标题 */ }
      {
        !CheckTools.isNullOrEmpty(props.title) ?
          <RowView padding={[ 4, 0 ]} justify="space-between" align="center">
            <RowView width={80} />
            <Text style={styles.title}>{props.title}</Text>
            <RowView width={80}>
              { !props.showSideButtons ? <Button type="text" textColor={Color.primary} pressedColor={keyPressedColor} onPress={onFinish}>{finishButtonText}</Button> : <></> }
            </RowView>
          </RowView> :
          <RowView justify="center" padding={[ 3, 6 ]}>
            <Button type="text" style={{ width: '100%' }} pressedColor={keyPressedColor} onPress={onFinish} icon="arrow-down" />
          </RowView>
      }
      { /* 键盘区域 */ }
      <View style={styles.keyPadOut}>
        <View style={styles.keyPadKeys}>{ renderKeys() }</View>
        { props.showSideButtons ? <View style={styles.keyPadSide}>{ renderSideButtons() }</View> : <></> }
      </View>
      <WhiteSpace size="sm" />
    </View>
  );
});

/**
 * 虚拟数字键盘，可以配合密码输入框组件或自定义的输入框组件使用。
 */
export const NumberKeyBoard = forwardRef<NumberKeyBoardInstance, NumberKeyBoardProps>((props, ref) => {

  useImperativeHandle(ref, () => ({

  }));

  function onClose() {
    props.onBlur && props.onBlur();
  }
  function onFinish() {
    props.onBlur && props.onBlur();
    props.onFinish && props.onFinish();
  }

  return (
    <Popup
      show={props.show}
      closeable
      closeIcon={false}
      mask={false}
      position="bottom"
      onClose={onClose}
      renderContent={() => <NumberKeyBoardInner { ...props  } onFinish={onFinish} />}
    />
  );
});
