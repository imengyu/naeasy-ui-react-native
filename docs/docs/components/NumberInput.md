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

不使用系统键盘，使用内置的 NumberKeyBoard 键盘。

```jsx
<NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} useSystemInput={false}/>
```

## 自定义长度

```jsx
<NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} numberCount={8} autoSize />
```

## 格子间距

```jsx
<NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} numberCount={4} gutter={14} autoSize />
```

## 下划线边框

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

## 密码输入

```jsx
<NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} isPassword info="密码为 6 位数字" />
```

## API 参考

|参数|说明|类型|默认值|
|---|---|---|---|
|onPress|点击事件|``|-|
|onPress|点击事件|``|-|
|onPress|点击事件|``|-|
|onPress|点击事件|``|-|
|onPress|点击事件|``|-|
|onPress|点击事件|``|-|
|onPress|点击事件|``|-|
|onPress|点击事件|``|-|
|onPress|点击事件|``|-|
|onPress|点击事件|`&#124;`|-|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestNumberInput
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
