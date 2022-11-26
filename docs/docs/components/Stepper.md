---
group:
  title: 表单组件
---

# Stepper 步进器

## 介绍

步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。

## 导入

```jsx
import { Stepper } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 基础用法

```jsx
export function TestCheckScreen(props) {
  const [ value, setValue ] = useState(0);

  return (
    <Stepper value={value} onValueChange={setValue} />
  );
}
```

## 步长设置

```jsx
<Stepper step={3} value={value} onValueChange={setValue} />
```

## 限制输入范围

```jsx
<Stepper maxValue={10} value={value} onValueChange={setValue} />
```

## 限制输入整数

```jsx
<Stepper integer value={value} onValueChange={setValue} />
```

## 禁用状态

```jsx
<Stepper disabled value={value} onValueChange={setValue} />
```

## 禁用输入框

```jsx
<Stepper disableInput value={value} onValueChange={setValue} />
```

## 固定小数位数

```jsx
<Stepper decimalLength={1} step={0.1} value={value} onValueChange={setValue} />
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
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestStepper
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
