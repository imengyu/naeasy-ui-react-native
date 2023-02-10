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

设置 disabled 后禁用组件。

```jsx
<Switch disabled value={value} onValueChange={setValue} />
```

## 加载状态

设置 loading 可以人开关为加载中状态。

```jsx
<Switch loading value={value} onValueChange={setValue} />
```

## 自定义大小

```jsx
<Switch size={40} value={value} onValueChange={setValue} />
```

## 自定义颜色

```jsx
<Switch color={Color.danger} value={value} onValueChange={setValue} />
```

## 原生 Switch

使用 React native 原生的 Switch 组件。

```jsx
<Switch native value={value} onValueChange={setValue} />
```

## API 参考

### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|value|开关是否开启|`boolean`|-|`false`|
|onValueChange|开关变化回调|`(value: boolean) => void`|-|-|
|native|是否使用 RN 原生 Switch 组件|`boolean`|-|`false`|
|color|开关的主颜色|`ThemeColor`|-|`Color.primary`|
|inverseColor|开关的反色|`ThemeColor`|-|`Color.switch`|
|dotColor|开关点的颜色|`string`|-|`Color.white.light`|
|loading|开关是否是加载中状态|`boolean`|-|`false`|
|disabled|开关是否禁用|`boolean`|-|`false`|
|impactFeedback|是否有触感反馈(iOS)|`boolean`|-|`true`|
|size|开关大小|`number`|-|`30`|

## 主题变量

|名称|类型|默认值|
|--|--|--|
|SwitchAnimDuration|number|`200`|
|SwitchColor|-|`props.color`|
|SwitchDotColor|-|`props.dotColor`|
|SwitchDotElevation|number|`4`|
|SwitchDotPadding|number|`2`|
|SwitchDotShadowColor|ColorInfoItem|`Color.black`|
|SwitchDotShadowOffset|-|`{ width: 0`|
|SwitchDotShadowOpacity|number|`0.3`|
|SwitchImpactFeedback|-|`props.impactFeedback`|
|SwitchInverseColor|-|`props.inverseColor`|
|SwitchSize|-|`props.size`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestSwitch
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
