import CheckTools from "../../utils/CheckTools";
import React, { forwardRef, useImperativeHandle } from "react";
import { Text, TextStyle, TouchableHighlight, View, ViewStyle } from "react-native";
import { Button } from "../button/Button";
import { Icon } from "../basic/Icon";
import { RowView } from "../layout/RowView";
import { Popup } from "../basic/Popup";
import { FeedbackNative } from "../tools/Feedback";
import { WhiteSpace } from "../space/WhiteSpace";
import { Color, DynamicColor, StyleSheet, PressedColor, ThemeColor, ThemeSelector } from "../../styles";
import { ThemeWrapper } from "../../theme/Theme";
import { deviceWidth } from "../../utils";

export interface NumberKeyBoardProps extends NumberKeyBoardInnerProps {
  /**
   * 是否显示键盘
   */
  show: boolean;
  /**
   * 是否显示键盘遮罩，显示遮罩时无法操作下方组件。默认：false
   */
  mask?: boolean;
  /**
   * 键盘关闭时发出事件
   */
  onBlur?: () => void;
}

interface NumberKeyBoardSideKey {
  /**
   * 按键文字
   */
  key: string,
  /**
   * 按键是否显示图标，为 true 时 key 同时也是图标的名称。
   */
  icon?: boolean,
  /**
   * 按键所占格子数。默认：1
   */
  span?: number,
}
interface NumberKeyBoardExtraKey {
  /**
   * 按键文字
   */
  key: string,
  /**
   * 按键所占格子数。默认：1
   */
  span?: number,
  /**
   * 按键所占高度格子数。默认：1
   */
  height?: number,
  /**
   * 按键是否显示图标，为 true 时 key 同时也是图标的名称。
   */
  icon?: boolean,
  /**
   * 这个表示要在默认数字按键数组的哪一位插入。默认是在末尾添加。
   */
  order?: number,
  /**
   * 当order不为空时，指定此属性为true是直接替换指定位置的按键。
   */
  replace?: boolean,
}

export interface NumberKeyBoardInnerProps {
  /**
   * 键盘标题
   */
  title?: string;
  /**
   * 键盘宽度，默认：deviceWidth
   */
  width?: number;
  /**
   * 默认数字按键数组。默认：`[ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'close', '0', 'delete' ]`
   */
  defaultKeys?: string[],
  /**
   * 默认数字按键数组。默认：`[ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'close', '0', 'delete' ]`
   */
  sideKeys?: NumberKeyBoardSideKey[],
  /**
   * 键盘额外按键。 showSideButtons 为 true 时可配置2个额外按键，false 时可配置1个额外按键。
   */
  extraKeys?: NumberKeyBoardExtraKey[];
  /**
   * 是否显示侧栏，当显示侧栏时，完成与删除按钮显示在侧栏，您可以使用 extraKey 配置额外的2个按键。
   */
  showSideButtons?: boolean;
  /**
   * 是否显示关闭按钮。当显示 title 时，这个属性也用来控制标题栏上面的完成按钮是否显示。默认：是
   */
  showCloseButton?: boolean;
  /**
   * 完成按钮文字
   */
  finishButtonText?: string;
  /**
   * 按键高度，默认50
   */
  keyHeight?: number;
  /**
   * 键盘之间的间距
   */
  keyMargin?: number,
  /**
   * 键盘显示按键列数（不包括侧栏）。默认：3
   */
  keyColNum?: number,
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
   * 按键按下时是否有触感反馈，默认 true
   * @platform iOS
   */
  keyPressedImpactFeedback?: boolean;
  /**
   * 是否随机排序数字键盘，常用于安全等级较高的场景。默认：false
   */
  keyRandomOrder?: boolean;
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
  /**
   * 自定义渲染顶部区域
   */
  renderTop?: () => JSX.Element;
}
export interface NumberKeyBoardInstance {

}

export const NumberKeyBoardKeys = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete',
];
export const NumberKeyBoardSideKeys = [
  { key: 'delete', span: 2 },
  { key: 'finish', span: 2 },
] as NumberKeyBoardSideKey[];

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: DynamicColor(Color.background),
  },
  keyPadOut: {
    position: 'relative',
    flexDirection: 'row',
  },
  keyPadKeys: {
    flexDirection: 'row',
    flex: 3,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  keyPadSide: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'flex-start',
  },
  key: {
    height: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DynamicColor(Color.white),
    borderRadius: 6,
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

  const {
    width = deviceWidth,
    showSideButtons = false,
    keyFinishColor = Color.primary,
    keyFinishPressedColor = PressedColor(Color.white),
    keyColor = Color.white,
    keyPressedColor = PressedColor(Color.white),
    keyFinishTextColor = Color.white,
    keyTextColor = Color.black,
    finishButtonText = '完成',
    keyHeight = 51,
    keyMargin = 4,
    keyColNum = 3,
    defaultKeys = NumberKeyBoardKeys,
    sideKeys = NumberKeyBoardSideKeys,
    extraKeys = [],
    keyPressedImpactFeedback = true,
    keyRandomOrder = false,
    showCloseButton = true,
    title,
    onDelete,
    onInput,
    onFinish,
    renderTop,
  } = props;


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

  //计算按键占用宽度
  const keyColNumFinal = (keyColNum + (showSideButtons ? 1 : 0));
  const keyWidthBase = ((width - keyMargin * (keyColNumFinal + 1)) / keyColNumFinal);

  function renderKey(text: string, icon: boolean, action = '', widthCount = 1, heightCount = 1, side = false) {

    const keyWidthReal = widthCount * keyWidthBase + keyMargin * (widthCount - 1);
    const keyHeightReal = keyHeight * heightCount + (side ? keyMargin * (heightCount - 1) : 0);

    const keyStyle = {
      ...styles.key,
      backgroundColor: ThemeSelector.color(action === 'finish' ? keyFinishColor : keyColor),
      width: keyWidthReal,
      height: keyHeightReal,
      minHeight: keyHeightReal,
      marginLeft: side ? 0 : keyMargin,
      marginRight: side ? keyMargin : 0,
      marginTop: keyMargin,
      ...props.keyStyle,
    } as ViewStyle;

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
              onDelete?.();
            else if (action === 'finish')
              onFinish?.();
            else
              onInput?.(text);
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

  //生成随机数字顺序
  function makeRandomKeys() {
    const noNumberKeys = defaultKeys.filter((k) => k.length !== 1);
    const numberKeys = defaultKeys.filter((k) => k.length === 1).sort(() => 0.5 - Math.random());
    return numberKeys.concat(noNumberKeys);
  }

  //主按键
  function renderKeys() {
    const arr = [] as JSX.Element[];
    const keys = keyRandomOrder ? makeRandomKeys() : defaultKeys;

    //循环按键
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'delete') {
        if (showSideButtons)
          //删除在显示侧栏时按钮无需添加，因为侧栏已经有一个了
          arr.push(renderKey('', false, '', 1, 1, false));
        else
          arr.push(renderKey('delete', true, 'delete', 1, 1, false));
        continue;
      }

      //添加Key
      arr.push(renderKey(keys[i], keys[i].length > 1, 'key' + i, 1, 1, false));
    }

    //添加更多的按键
    if (extraKeys.length > 0) {
      extraKeys.forEach((key, i) => {
        const keyEle = renderKey(key.key, key.icon === true, 'extra' + i, key.span || 1, key.height || 1, false);
        if (key.order) {//插入或者替换
          if (key.replace)
            arr[key.order] = keyEle;
          else
            arr.splice(key.order, 0, keyEle);
        }
        else
          arr.push(keyEle);
      });
    }

    return arr;
  }

  //侧栏按键
  function renderSideButtons() {
    const arr = [] as JSX.Element[];
    for (const key of sideKeys) {
      if (key.key === 'finish')
        arr.push(renderKey(finishButtonText, false, 'finish', 1, key.span, true)); //完成键
      else if (key.key === 'delete')
        arr.push(renderKey('delete', true, 'delete', 1, key.span, true)); //后退键
      else
        arr.push(renderKey(key.key, key.icon === true, 'extra', 1, key.span, true)); //其他键
    }
    return arr;
  }

  return (
    <View style={styles.container}>
      { /* 标题 */ }
      {
        !CheckTools.isNullOrEmpty(title) ?
          <RowView padding={[ 4, 0 ]} justify="space-between" align="center">
            <RowView width={80} />
            <Text style={styles.title}>{title}</Text>
            <RowView width={80}>
              { showCloseButton ? <Button type="text" textColor={Color.primary} pressedColor={keyPressedColor} onPress={onFinish}>{finishButtonText}</Button> : <></> }
            </RowView>
          </RowView> :
          (showCloseButton ? <RowView justify="center" padding={[ 3, 6 ]}>
            <Button type="text" style={{ width: '100%' }} pressedColor={keyPressedColor} onPress={onFinish} icon="arrow-down" />
          </RowView> : <></>)
      }
      { renderTop ? renderTop() : <></> }
      { /* 键盘区域 */ }
      <View style={styles.keyPadOut}>
        <View style={[
          styles.keyPadKeys,
          {
            paddingBottom: keyMargin,
            paddingRight: keyMargin,
          },
        ]}>{ renderKeys() }</View>
        {
          showSideButtons ?
            <View style={[
              styles.keyPadSide,
              { paddingBottom: keyMargin },
            ]}>{ renderSideButtons() }</View> :
            <></>
        }
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
      mask={props.mask === true}
      position="bottom"
      onClose={onClose}
      renderContent={() => <NumberKeyBoardInner { ...props  } onFinish={onFinish} />}
    />
  );
});
