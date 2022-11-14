import CheckTools from '../../utils/CheckTools';
import React, { forwardRef, useImperativeHandle, useState} from 'react';
import { Text, TextStyle, TouchableHighlight, View, ViewStyle} from 'react-native';
import { RowView } from '../layout/RowView';
import { Popup } from '../Popup';
import { WhiteSpace } from '../space/WhiteSpace';
import { Button } from '../button/Button';
import { Color, DynamicColor, DynamicThemeStyleSheet, PressedColor, ThemeColor, ThemeSelector } from '../../styles';
import { FeedbackNative } from '../tools/Feedback';
import { Icon } from '../Icon';
import { rpx } from '../../utils';
import { Radio, RadioGroup } from '../form/Radio';
import { Toast } from '../feedback/Toast';
import { ThemeWrapper } from '../../theme/Theme';

export interface PlateKeyBoardProps extends PlateKeyBoardInnerProps {
  /**
   * 是否显示键盘
   */
  show: boolean;
  /**
   * 键盘关闭时发出事件
   */
  onBlur?: () => void;
}
export interface PlateKeyBoardInstance {}

export interface PlateKeyBoardInnerProps {
  /**
   * 键盘标题
   */
  title?: string;
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
   * 删除按钮文字
   */
  deleteButtonText?: string;
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
  keyColor?: ThemeColor;
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
   * 键盘取消
   */
  onCancel?: () => void;
  /**
   * 键盘点击删除按钮时发出事件
   */
  onDelete?: () => void;
  /**
   * 键盘点击完成按钮时发出事件
   */
  onFinish?: (val: string) => void;
}

const keysProvinceText = [
  '粤',
  '京',
  '冀',
  '沪',
  '津',
  '晋',
  '蒙',
  '辽',
  '吉',
  '黑',
  '苏',
  '浙',
  '皖',
  '闽',
  '赣',
  '鲁',
  '豫',
  '鄂',
  '湘',
  '桂',
  '琼',
  '渝',
  '川',
  '贵',
  '云',
  '藏',
  '陕',
  '甘',
  '青',
  '宁',
  '新',
];
const keysNumberText = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const keysWordText = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'N',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
const keysLastWordText = ['港', '澳', '学', '领', '警'];

const styles = DynamicThemeStyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
  },
  keyPad: {
    backgroundColor: DynamicColor(Color.light),
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingLeft: 10,
    paddingVertical: 10,
  },
  key: {
    flexBasis: '13%',
    width: '13%',
    height: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DynamicColor(Color.border),
    borderRadius: 5,
    margin: rpx(5),
  },
  title: {
    color: DynamicColor(Color.black),
    fontSize: 16,
  },
  keyText: {
    fontSize: 17,
  },
  inputBox: {
    height: rpx(90),
    flex: 1,
    borderWidth: 2,
    borderColor: DynamicColor(Color.light),
    borderRadius: 5,
    margin: rpx(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DynamicColor(Color.black),
  },
  inputBoxActive: {
    borderColor: DynamicColor(Color.primary),
  },
  dot: {
    margin: rpx(10),
    width: rpx(10),
    height: rpx(10),
    backgroundColor: DynamicColor(Color.textSecond),
    borderRadius: rpx(10),
  },
});

/**
 * 虚拟车牌号输入键盘的键盘内容组件，可单独嵌入其他对话框或者页面中。
 */
export const PlateKeyBoardInner = ThemeWrapper((props: PlateKeyBoardInnerProps) => {

  const [ currentText, setCurrentText ] = useState('');
  const [ isNewPlate, setIsNewPlate ] = useState(false);

  const keyFinishColor = props.keyFinishColor || Color.primary;
  const keyFinishPressedColor = props.keyFinishPressedColor || PressedColor(Color.primary);
  const keyColor = props.keyColor || Color.white;
  const keyPressedColor = props.keyPressedColor || PressedColor(Color.primary);
  const keyFinishTextColor = props.keyFinishTextColor || Color.white;
  const keyTextColor = props.keyTextColor || Color.black;
  const keyHeight = props.keyHeight || 40;
  const finishButtonText = props.finishButtonText || '完成';
  const deleteButtonText = props.deleteButtonText || '删除';
  const keyPressedImpactFeedback = props.keyPressedImpactFeedback !== false;
  const showDeleteButton = props.showDeleteButton !== false;
  const showFinishButton = props.showFinishButton !== false;
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

  function onFinish(text?: string) {
    if ((text || currentText).length < (isNewPlate ? 8 : 7)) {
      Toast.info('请输入完整的车牌号哦！');
      return;
    }

    props.onFinish && props.onFinish(text || currentText);
  }
  function onDelete() {
    setCurrentText((prev) => prev.length >= 1 ? prev.substring(0, prev.length - 1) : '');
    props.onDelete && props.onDelete();
  }
  function onCancel() {
    props.onCancel && props.onCancel();
  }

  function renderKey(text: string, icon: boolean, action = '', width = 0, height = 1) {

    const keyStyle = {
      ...styles.key,
      backgroundColor: ThemeSelector.color(action === 'finish' ? keyFinishColor : keyColor),
      flexBasis: `${width === 0 ? (100 / 8) : width}%`,
      width: `${width === 0 ? (100 / 8) : width}%`,
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
              onDelete();
            else if (action === 'finish')
              onFinish();
            else {
              props.onInput && props.onInput(text);
              setCurrentText((prev) => {
                const newText = prev + text;
                if (newText.length === (isNewPlate ? 8 : 7)) {
                  setTimeout(() => onFinish(newText), 400);
                }
                return newText;
              });
            }
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

  function InputBox(inputBoxProps: {
    text: string,
    selfIndex: number,
    activeIndex: number
  }) {
    const { text, selfIndex, activeIndex } = inputBoxProps;
    return (
      <View style={[ styles.inputBox, selfIndex === activeIndex ? styles.inputBoxActive : styles.inputBox ]}>
        <Text style={styles.inputBoxText}>{selfIndex < text.length ? text[selfIndex] : ''}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      { /* 标题 */ }
      {
        !CheckTools.isNullOrEmpty(props.title) ?
          <RowView padding={[ 4, 0 ]} justify="space-between" align="center">
            <Text style={styles.title}>{props.title}</Text>
          </RowView> :
          <RowView justify="center" padding={[ 3, 6 ]}>
            <Button type="text" style={{ width: '100%' }} pressedColor={keyPressedColor} onPress={onCancel} icon="arrow-down" />
          </RowView>
      }
      { /* 新能源选择区域 */ }
      <RowView justify="space-between" width="100%" padding={[0, 10]}>
        <RowView center>
          <RadioGroup value={isNewPlate ? 1 : 2} onValueChange={(v) => setIsNewPlate(v === 1)}>
            <Radio name={2}>普通车牌</Radio>
            <Radio name={1}>新能源车牌</Radio>
          </RadioGroup>
        </RowView>
        <RowView center>
          { showDeleteButton ? <Button type="danger" size="small" shape="round" plain onPress={onDelete}>{deleteButtonText}</Button> : <></> }
          <WhiteSpace size={5} />
          { showFinishButton ? <Button type="primary" size="small" shape="round" plain onPress={() => onFinish()}>{finishButtonText}</Button> : <></> }
        </RowView>
      </RowView>
      { /* 输入框区域 */ }
      <RowView center padding={10}>
        <InputBox text={currentText} selfIndex={0} activeIndex={currentText.length} />
        <InputBox text={currentText} selfIndex={1} activeIndex={currentText.length} />
        <View style={styles.dot} />
        <InputBox text={currentText} selfIndex={2} activeIndex={currentText.length} />
        <InputBox text={currentText} selfIndex={3} activeIndex={currentText.length} />
        <InputBox text={currentText} selfIndex={4} activeIndex={currentText.length} />
        <InputBox text={currentText} selfIndex={5} activeIndex={currentText.length} />
        <InputBox text={currentText} selfIndex={6} activeIndex={currentText.length} />
        { isNewPlate ? <InputBox text={currentText} selfIndex={7} activeIndex={currentText.length} /> : <></> }
      </RowView>
      { /* 键盘区域 */ }
      {
        currentText.length === 0 ?
        <View style={styles.keyPad}>
          { keysProvinceText.map((key) => renderKey(key, false, '')) }
          </View> : <></>
      }
      {
        currentText.length === 1 ?
        <View style={styles.keyPad}>
          { keysWordText.map((key) => renderKey(key, false, '')) }
          </View> : <></>
      }
      {
        currentText.length > 1 && currentText.length < (isNewPlate ? 7 : 6) ?
        <View style={styles.keyPad}>
          { keysWordText.map((key) => renderKey(key, false, '')) }
          { keysNumberText.map((key) => renderKey(key, false, '')) }
          </View> : <></>
      }
      {
        currentText.length >= (isNewPlate ? 7 : 6) ?
        <View style={styles.keyPad}>
          { keysWordText.map((key) => renderKey(key, false, '')) }
          { keysNumberText.map((key) => renderKey(key, false, '')) }
          { keysLastWordText.map((key) => renderKey(key, false, '')) }
          </View> : <></>
      }
      <WhiteSpace size="sm" />
    </View>
  );
});

/**
 * 中国车牌号输入键盘，可以配合输入框组件或自定义的输入框组件使用。
 */
export const PlateKeyBoard = forwardRef<
  PlateKeyBoardInstance,
  PlateKeyBoardProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({}));

  function onClose() {
    props.onBlur && props.onBlur();
  }
  function onFinish(val: string) {
    props.onBlur && props.onBlur();
    props.onFinish && props.onFinish(val);
  }

  return (
    <Popup
      show={props.show}
      closeable
      closeIcon={false}
      mask={true}
      position="bottom"
      onClose={onClose}
      renderContent={() => (
        <PlateKeyBoardInner
          {...props}
          onFinish={onFinish}
          onCancel={onClose}
        />
      )}
    />
  );
});
