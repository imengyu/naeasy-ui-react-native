---
group:
  title: 表单组件
---

# Switch 开关

## 介绍

用于在打开和关闭状态之间进行切换。

## 导入

```jsx
import { Switch } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 基础用法

```jsx
export function TestCheckScreen(props) {
  const [ value, setValue ] = useState(true);

  return (
    <Switch value={value} onValueChange={setValue} />
  );
}
```

## 禁用状态

```jsx
<Switch disabled value={value} onValueChange={setValue} />
```

## 加载状态

```jsx
<Switch loading value={value} onValueChange={setValue} />
```

## 自定义大小

```jsx
<Switch color={Color.danger} size={40} value={value} onValueChange={setValue} />
```

## 自定义颜色

```jsx
<Switch value={value} onValueChange={setValue} />
```

## 原生 Switch

使用 React native 原生 Switch 组件。

```jsx
<Switch native value={value} onValueChange={setValue} />
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
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestSwitch
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
