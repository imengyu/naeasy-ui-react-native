---
group:
  title: 表单组件
---

# NumberInput 数字输入

## 介绍

专用于输入数字。每个输入框只允许输入一个字符，主要用于验证码、密码输入框等。

## 导入

```jsx
import { NumberInput } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 基础用法

```jsx
export class TestNumberInputScreen extends React.PureComponent {

  state = {
    value1: '',
  };

  render() {
    return (
      <NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} />
    );
  }
}
```

## 使用 NumberKeyBoard 输入键盘

不使用系统键盘，使用内置的 [NumberKeyBoard](./number-key-board.md) 键盘。

```jsx
<NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} useSystemInput={false}/>
```

## 自定义长度

通过 `numberCount` 设置数字长度。

```jsx
<NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} numberCount={8} autoSize />
```

## 格子间距

通过 `gutter` 设置格子的间距。

```jsx
<NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} numberCount={4} gutter={14} autoSize />
```

## 下划线边框

设置 borderType 为 underline 可以开启下划线边框，使用 borderWidth 设置边框粗细，borderColor 设置边框颜色。

```jsx
<NumberInput
  value={this.state.value4}
  onChangeText={(v) => this.setState({ value4: v })}
  numberCount={4}
  borderWidth={2}
  borderColor={Color.darkBorder}
  borderType="underline"
  activeBorderColor={Color.primary}
  gutter={10}
/>
```

## 文字提示

设置 info 可以在输入框下方显示文字提示。

```jsx
<NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} isPassword info="密码为 6 位数字" />
```

## 密码输入

设置 isPassword 开启密码输入模式，输入文本不可见。

```jsx
<NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} isPassword info="密码为 6 位数字" />
```

## API 参考

### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|value|数值|`string`|✓|-|
|onChangeText|文字更改回调|`(text: string) => void`|-|-|
|onValueChange|用于表单，更改时验证回调|`(text: unknown) => void`|-|-|
|onBlurValid|用于表单，失去焦点时验证回调|`(text: unknown) => void`|-|-|
|onEnterFinish|当输入完成（全部位数都已经输入）时返回次事件|`(text: unknown) => void`|-|-|
|errorMessage|底部错误提示文案，为空时不展示|`string`|-|-|
|numberCount|数字位数|`number`|-|`6`|
|isPassword|是否是密码|`boolean`|-|`false`|
|startFocus|是否在组件初始化时激活键盘|`boolean`|-|`false`|
|useSystemInput|使用系统输入键盘，否则使用 NumberKeyBoard 作为输入键盘，默认是|`boolean`|-|`true`|
|info|输入框下方文字提示|`string`|-|-|
|gutter|输入框格子之间的间距|`number`|-|`0`|
|autoSize|是否自动调整宽度|`boolean`|-|`false`|
|borderType|格子的边框，默认box|`NumberInputBorderType`|-|`'box'`|
|borderColor|格子的边框颜色|`ThemeColor`|-|`Color.border`|
|borderWidth|格子的边框宽度|`number`|-|`1.5`|
|activeBorderColor|已输入格子的边框颜色|`ThemeColor`|-|`Color.primary`|
|boxStyle|格子样式|`ViewStyle`|-|-|
|disableKeyPad|是否禁用点击打开键盘|`boolean`|-|`false`|
|showCursur|是显示输入闪烁光标|`boolean`|-|`true`|
|finishHideKeyPad|是否在输入完成后自动收起键盘|`boolean`|-|`true`|
|textStyle|文字样式|`TextStyle`|-|-|
|style|外层样式|`ViewStyle`|-|-|

## 主题变量

|名称|类型|默认值|
|--|--|--|
|NumberInputActiveBorderColor|ColorInfoItem|`Color.primary`|
|NumberInputBorderColor|ColorInfoItem|`Color.border`|
|NumberInputBorderType|string|`'box'`|
|NumberInputBorderWidth|number|`1.5`|
|NumberInputBoxBorderRadius|number|`10`|
|NumberInputBoxPaddingHorizontal|number|`12`|
|NumberInputBoxPaddingVertical|number|`10`|
|NumberInputCursorBackgroundColor|ColorInfoItem|`Color.text`|
|NumberInputCursorHeight|number|`18`|
|NumberInputCursorHideAnimDuration|number|`400`|
|NumberInputCursorLeft|string|`'50%'`|
|NumberInputCursorMarginLeft|number|`-0.75`|
|NumberInputCursorMarginTop|number|`-9`|
|NumberInputCursorShowAnimDuration|number|`400`|
|NumberInputCursorWidth|number|`1.5`|
|NumberInputErrorMessageColor|ColorInfoItem|`Color.danger`|
|NumberInputErrorMessageMarginTop|number|`5`|
|NumberInputGutter|number|`2`|
|NumberInputInfoColor|ColorInfoItem|`Color.textSecond`|
|NumberInputInfoMarginTop|number|`5`|
|NumberInputTextColor|ColorInfoItem|`Color.text`|
|NumberInputTextFontSize|number|`18`|
|NumberInputTextWidth|number|`20`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestNumberInput
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
