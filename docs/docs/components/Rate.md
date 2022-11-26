---
group:
  title: 表单组件
---

# Rate 评星

## 介绍

用于对事物进行评级操作。

## 导入

```jsx
import { Rate } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 基础用法

```jsx
export function TestCheckScreen(props) {
  const [ value, setValue ] = useState(5);

  return (
    <Rate value={value} onValueChange={setValue} />
  );
}
```

## 自定义图标和颜色

```jsx
<Rate value={value} onValueChange={setValue} icon="cry-filling" voidIcon="cry" starActiveColor={Color.success} starColor={Color.lightGrey} />
```

## 自定义大小

```jsx
<Rate size={40} value={value} onValueChange={setValue}  />
```

## 可选择半星

```jsx
<Rate half value={value} onValueChange={setValue}  />
```

## 自定义星星数量

```jsx
<Rate count={10} value={value} onValueChange={setValue}  />
```

## 禁用状态

```jsx
<Rate disabled value={value} onValueChange={setValue}  />
```

## 只读状态

只读，不可选择。

```jsx
<Rate readonly value={2.5}  />
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
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestRate
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
