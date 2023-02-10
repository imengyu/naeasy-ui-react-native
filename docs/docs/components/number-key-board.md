---
group:
  title: 表单组件
---

# NumberKeyBoard 数字键盘

## 介绍

数字键盘，一般用于有安全需求下的数字输入，如金额、密码、验证码输入等。

## 导入

```jsx
import { NumberKeyBoard } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 基础用法

最基础的用法。

```jsx
export function TestNumberKeyBoardScreen(props: Props) {

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
      <Field value={text} placeholder="请输入数字" onChangeText={setText} />
      <Button onPress={() => setShow(true)}>弹出输入键盘</Button>
      <NumberKeyBoard
        show={show}
        onInput={onInput}
        onDelete={onDelete}
        onBlur={() => setShow(false)}
      />
    </>
  );
}
```

## 带右侧栏键盘

设置 showSideButtons 可以显示右侧栏。

```jsx
<NumberKeyBoard
  show={show}
  showSideButtons
  onInput={onInput}
  onDelete={onDelete}
  onBlur={() => setShow(false)}
/>
```

## 带标题的键盘

通过 title 属性可以设置标题。

```jsx
<NumberKeyBoard
  show={show}
  title="请输入号码"
  onInput={onInput}
  onDelete={onDelete}
  onBlur={() => setShow(false)}
/>
```

## 身份证号键盘

向键盘添加一个身份证的 X 按键。

```jsx
<NumberKeyBoard
  show={show}
  extraKeys={[ { key: 'X', order: 9, replace: true } ]}
  onInput={onInput}
  onDelete={onDelete}
  onBlur={() => setShow(false)}
/>
```

## 自定义按键键盘

键盘允许你添加自定义按键或者替换原有按键。

extraKeys：既可以配置额外按键，也可以替换默认数字按键。

* order 按键插入位置。顺序是从左到右，从上到下。
* replace 是否替换原有位置上的按键。

sideKeys：配置侧边栏的按键。

```jsx
<NumberKeyBoard
  show={show}
  extraKeys={[
    { key: '0', order: 9, replace: true },
    { key: 'X', order: 10, replace: true },
    { key: 'Y', order: 11, replace: true },
    { key: 'A', order: 12, replace: true },
    { key: 'B', order: 13, replace: true },
    { key: 'C', order: 14, replace: true },
    { key: 'D', order: 15, replace: true },
    { key: 'E', order: 16, replace: true },
    { key: 'F', order: 17, replace: true },
  ]}
  sideKeys={[
    { key: 'delete', span: 2 },
    { key: 'finish', span: 4 },
  ]}
  keyHeight={40}
  showSideButtons
  onInput={onInput}
  onDelete={onDelete}
  onBlur={() => setShow(false)}
/>
```

## 随机数字键盘

设置 keyRandomOrder 可以让内置数字按键顺序随机，常用于安全等级较高的场景。

```jsx
<NumberKeyBoard
  show={show}
  keyRandomOrder
  onInput={onInput}
  onDelete={onDelete}
  onBlur={() => setShow(false)}
/>
```

## API 参考


### NumberKeyBoard

虚拟数字键盘，可以配合密码输入框组件或自定义的输入框组件使用。

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|show|是否显示键盘|`boolean`|✓|`false`|
|mask|是否显示键盘遮罩，显示遮罩时无法操作下方组件。|`boolean`|-|`false`|
|onBlur|键盘关闭时发出事件|`() => void`|-|-|
|title|键盘标题|`string`|-|-|
|width|键盘宽度|`number`|-|`deviceWidth`|
|defaultKeys|默认数字按键数组。|`string[]`|-|``[ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'close', '0', 'delete' ]``|
|sideKeys|默认数字按键数组。|`NumberKeyBoardSideKey[]`|-|``[ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'close', '0', 'delete' ]``|  
|extraKeys|键盘额外按键。 showSideButtons 为 true 时可配置2个额外按键，false 时可配置1个额外按键。|`NumberKeyBoardExtraKey[]`|-|-|     
|showSideButtons|是否显示侧栏，当显示侧栏时，完成与删除按钮显示在侧栏，您可以使用 extraKey 配置额外的2个按键。|`boolean`|-|`false`|    
|showCloseButton|是否显示关闭按钮。当显示 title 时，这个属性也用来控制标题栏上面的完成按钮是否显示。|`boolean`|-|`true`|
|finishButtonText|完成按钮文字|`string`|-|`'完成'`|
|keyHeight|按键高度|`number`|-|`50`|
|keyMargin|键盘之间的间距|`number`|-|`4`|
|keyColNum|键盘显示按键列数（不包括侧栏）。|`number`|-|`3`|
|keyStyle|自定义按键的样式|`ViewStyle`|-|-|
|keyTextStyle|自定义按键文字的样式|`TextStyle`|-|-|
|keyColor|按键的背景颜色。|`string`|-|`Color.white`|
|keyTextColor|完成按键的文字颜色。|`ThemeColor`|-|`Color.black`|
|keyFinishColor|完成按键的背景颜色。|`ThemeColor`|-|`Color.primary`|
|keyFinishTextColor|完成按键的文字颜色。|`ThemeColor`|-|`Color.white`|
|keyFinishPressedColor|完成按键的按下时的颜色|`ThemeColor`|-|`PressedColor(Color.white)`|
|keyPressedColor|自定义按键按下时的颜色|`ThemeColor`|-|`PressedColor(Color.white)`|
|keyPressedImpactFeedback|按键按下时是否有触感反馈(iOS)|`boolean`|-|`true`|
|keyRandomOrder|是否随机排序数字键盘，常用于安全等级较高的场景。|`boolean`|-|`false`|
|onInput|键盘点击按键时发出事件|`(char: string) => void`|-|-|
|onDelete|键盘点击删除按钮时发出事件|`() => void`|-|-|
|onFinish|键盘点击完成按钮时发出事件|`() => void`|-|-|
|renderTop|自定义渲染顶部区域|`() => Element`|-|-|

#### Methods

##### `close()`

手动关闭键盘。

### NumberKeyBoardInner

虚拟数字键盘的键盘内容组件，可单独嵌入其他对话框或者页面中。

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|title|键盘标题|`string`|-|-|
|width|键盘宽度|`number`|-|`deviceWidth`|
|defaultKeys|默认数字按键数组。|`string[]`|-|``[ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'close', '0', 'delete' ]``|
|sideKeys|默认数字按键数组。|`NumberKeyBoardSideKey[]`|-|``[ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'close', '0', 'delete' ]``|  
|extraKeys|键盘额外按键。 showSideButtons 为 true 时可配置2个额外按键，false 时可配置1个额外按键。|`NumberKeyBoardExtraKey[]`|-|-|     
|showSideButtons|是否显示侧栏，当显示侧栏时，完成与删除按钮显示在侧栏，您可以使用 extraKey 配置额外的2个按键。|`boolean`|-|`false`|    
|showCloseButton|是否显示关闭按钮。当显示 title 时，这个属性也用来控制标题栏上面的完成按钮是否显示。|`boolean`|-|`true`|
|finishButtonText|完成按钮文字|`string`|-|`'完成'`|
|keyHeight|按键高度|`number`|-|`50`|
|keyMargin|键盘之间的间距|`number`|-|`4`|
|keyColNum|键盘显示按键列数（不包括侧栏）。|`number`|-|`3`|
|keyStyle|自定义按键的样式|`ViewStyle`|-|-|
|keyTextStyle|自定义按键文字的样式|`TextStyle`|-|-|
|keyColor|按键的背景颜色。|`string`|-|`Color.white`|
|keyTextColor|完成按键的文字颜色。|`ThemeColor`|-|`Color.black`|
|keyFinishColor|完成按键的背景颜色。|`ThemeColor`|-|`Color.primary`|
|keyFinishTextColor|完成按键的文字颜色。|`ThemeColor`|-|`Color.white`|
|keyFinishPressedColor|完成按键的按下时的颜色|`ThemeColor`|-|`PressedColor(Color.white)`|
|keyPressedColor|自定义按键按下时的颜色|`ThemeColor`|-|`PressedColor(Color.white)`|
|keyPressedImpactFeedback|按键按下时是否有触感反馈(iOS)|`boolean`|-|`true`|
|keyRandomOrder|是否随机排序数字键盘，常用于安全等级较高的场景。|`boolean`|-|`false`|
|onInput|键盘点击按键时发出事件|`(char: string) => void`|-|-|
|onDelete|键盘点击删除按钮时发出事件|`() => void`|-|-|
|onFinish|键盘点击完成按钮时发出事件|`() => void`|-|-|
|renderTop|自定义渲染顶部区域|`() => Element`|-|-|

## 主题变量

|名称|类型|默认值|
|--|--|--|
|NumberKeyBoardBackgroundColor|ColorInfoItem|`Color.background`|
|NumberKeyBoardKeyBorderRadius|number|`6`|
|NumberKeyBoardKeyColor|-|`props.keyColor`|
|NumberKeyBoardKeyFinishColor|-|`props.keyFinishColor`|
|NumberKeyBoardKeyFinishFontSize|number|`20`|
|NumberKeyBoardKeyFinishPressedColor|-|`props.keyFinishPressedColor`|
|NumberKeyBoardKeyFinishTextColor|-|`props.keyFinishTextColor`|
|NumberKeyBoardKeyFontSize|number|`23`|
|NumberKeyBoardKeyHeight|number|`10`|
|NumberKeyBoardKeyMargin|-|`props.keyMargin`|
|NumberKeyBoardKeyPressedColor|-|`props.keyPressedColor`|
|NumberKeyBoardKeyTextColor|-|`props.keyTextColor`|
|NumberKeyBoardPadKeysFlex|number|`3`|
|NumberKeyBoardPadSideFlex|number|`1`|
|NumberKeyBoardTitleColor|ColorInfoItem|`Color.black`|
|NumberKeyBoardTitleFontSize|number|`16`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestNumberKeyBoard
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
