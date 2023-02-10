---
group:
  title: 表单组件
---

# PlateKeyBoard 车牌号输入

## 介绍

中国车牌号输入键盘，可以配合输入框组件或自定义的输入框组件使用。

## 导入

```jsx
import { PlateKeyBoard } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 基础用法

```jsx
export function TestKeyBoardScreen(props: Props) {

  const [ show, setShow ] = useState(false);
  const [ text, setText ] = useState('');

  function onInput(char: string) {
    setText(prev => prev + char);
  }
  function onDelete() {
    setText(prev => prev.substring(0, prev.length - 1));
  }

  return (
    <>
      <Field value={text} placeholder="请输入车牌号" onChangeText={setText} />
      <Button onPress={() => setShow(true)}>弹出输入键盘</Button>
      <PlateKeyBoard
        show={show}
        onFinish={(r) => setText(r)}
        onBlur={() => setShow(false)}
      />
    </>
  );
}
```

## API 参考

### PlateKeyBoard

中国车牌号输入键盘，可以配合输入框组件或自定义的输入框组件使用。

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|show|是否显示键盘|`boolean`|✓|-|
|onBlur|键盘关闭时发出事件|`() => void`|-|-|
|title|键盘标题|`string`|-|-|
|showFinishButton|是否显示完成按钮|`boolean`|-|`true`|
|showDeleteButton|是否显示删除按钮|`boolean`|-|`true`|
|finishButtonText|完成按钮文字|`string`|-|`'完成'`|
|deleteButtonText|删除按钮文字|`string`|-|`'删除'`|
|keyHeight|按键高度|`number`|-|`50`|
|keyStyle|自定义按键的样式|`ViewStyle`|-|-|
|keyTextStyle|自定义按键文字的样式|`TextStyle`|-|-|
|keyColor|按键的背景颜色。|`ThemeColor`|-|`Color.white`|
|keyTextColor|完成按键的文字颜色。|`ThemeColor`|-|`Color.black`|
|keyPressedColor|自定义按键按下时的颜色|`ThemeColor`|-|`PressedColor(Color.white)`|
|keyPressedImpactFeedback|按键按下时是否有触感反馈(iOS)|`boolean`|-|`true`|
|onInput|键盘点击按键时发出事件|`(char: string) => void`|-|-|
|onCancel|键盘取消|`() => void`|-|-|
|onDelete|键盘点击删除按钮时发出事件|`() => void`|-|-|
|onFinish|键盘点击完成按钮时发出事件|`(val: string) => void`|-|-|

#### Methods

##### `close()`

手动关闭键盘。

### PlateKeyBoardInner

虚拟车牌号输入键盘的键盘内容组件，可单独嵌入其他对话框或者页面中。

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|title|键盘标题|`string`|-|-|
|showFinishButton|是否显示完成按钮|`boolean`|-|`true`|
|showDeleteButton|是否显示删除按钮|`boolean`|-|`true`|
|finishButtonText|完成按钮文字|`string`|-|`'完成'`|
|deleteButtonText|删除按钮文字|`string`|-|`'删除'`|
|keyHeight|按键高度|`number`|-|`50`|
|keyStyle|自定义按键的样式|`ViewStyle`|-|-|
|keyTextStyle|自定义按键文字的样式|`TextStyle`|-|-|
|keyColor|按键的背景颜色。|`ThemeColor`|-|`Color.white`|
|keyTextColor|完成按键的文字颜色。|`ThemeColor`|-|`Color.black`|
|keyPressedColor|自定义按键按下时的颜色|`ThemeColor`|-|`PressedColor(Color.white)`|
|keyPressedImpactFeedback|按键按下时是否有触感反馈(iOS)|`boolean`|-|`true`|
|onInput|键盘点击按键时发出事件|`(char: string) => void`|-|-|
|onCancel|键盘取消|`() => void`|-|-|
|onDelete|键盘点击删除按钮时发出事件|`() => void`|-|-|
|onFinish|键盘点击完成按钮时发出事件|`(val: string) => void`|-|-|

## 主题变量

|名称|类型|默认值|
|--|--|--|
|PlateKeyBoardDotBackgroundColor|ColorInfoItem|`Color.textSecond`|
|PlateKeyBoardDotBorderRadius|number|`rpx(10)`|
|PlateKeyBoardDotHeight|number|`rpx(10)`|
|PlateKeyBoardDotMargin|number|`rpx(10)`|
|PlateKeyBoardDotWidth|number|`rpx(10)`|
|PlateKeyBoardInputBoxActiveColor|ColorInfoItem|`Color.primary`|
|PlateKeyBoardInputBoxBorderColor|ColorInfoItem|`Color.light`|
|PlateKeyBoardInputBoxBorderRadius|number|`5`|
|PlateKeyBoardInputBoxBorderWidth|number|`2`|
|PlateKeyBoardInputBoxColor|ColorInfoItem|`Color.black`|
|PlateKeyBoardInputBoxFontSize|number|`16`|
|PlateKeyBoardInputBoxFontWeight|string|`'bold'`|
|PlateKeyBoardInputBoxHeight|number|`rpx(90)`|
|PlateKeyBoardInputBoxMargin|number|`rpx(5)`|
|PlateKeyBoardKeyBorderColor|ColorInfoItem|`Color.border`|
|PlateKeyBoardKeyBorderRadius|number|`5`|
|PlateKeyBoardKeyBorderWidth|number|`1`|
|PlateKeyBoardKeyColor|-|`props.keyColor`|
|PlateKeyBoardKeyFontSize|number|`17`|
|PlateKeyBoardKeyHeight|-|`props.keyHeight`|
|PlateKeyBoardKeyMargin|number|`10`|
|PlateKeyBoardKeyPadBackgroundColor|ColorInfoItem|`Color.light`|
|PlateKeyBoardKeyPressedColor|-|`props.keyPressedColor`|
|PlateKeyBoardKeyTextColor|-|`props.keyTextColor`|
|PlateKeyBoardShowDeleteButton|-|`props.showDeleteButton`|
|PlateKeyBoardShowFinishButton|-|`props.showFinishButton`|
|PlateKeyBoardTitleColor|ColorInfoItem|`Color.black`|
|PlateKeyBoardTitleFontSize|number|`16`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestPlateKeyBoard
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
