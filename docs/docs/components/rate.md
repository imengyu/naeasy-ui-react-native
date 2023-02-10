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

通过 icon 属性设置星星图标，图标与 [Icon](./icon.md) 组件的 icon 属性功能一致。

* icon 设置选中的星星图标
* voidIcon 设置未选中的星星图标
* starColor 设置未选中的星星颜色
* starActiveColor 设置选中的星星颜色

```jsx
<Rate value={value} onValueChange={setValue} icon="cry-filling" voidIcon="cry" starActiveColor={Color.success} starColor={Color.lightGrey} />
```

## 自定义大小

通过 size 设置星星的大小。

```jsx
<Rate size={40} value={value} onValueChange={setValue}  />
```

## 可选择半星

通过 half 设置星星可选择半星。

```jsx
<Rate half value={value} onValueChange={setValue}  />
```

## 自定义星星数量

通过 count 设置星星数量。

```jsx
<Rate count={10} value={value} onValueChange={setValue}  />
```

## 禁用状态

通过 disabled 设置禁用状态。

```jsx
<Rate disabled value={value} onValueChange={setValue}  />
```

## 只读状态

通过 readonly 设置只读，不可选择。

```jsx
<Rate readonly value={2.5}  />
```

## API 参考

### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|value|评星组件参数值|`number`|-|`0`|
|onValueChange|评星组件变化回调|`(value: number) => void`|-|-|
|count|星星的数量|`number`|-|`5`|
|starStyle|星星未激活自定义样式|`IconProp`|-|-|
|starActiveStyle|星星激活自定义样式|`IconProp`|-|-|
|starActiveColor|星星激活的颜色|`ThemeColor`|-|`Color.warning`|
|starColor|星星未激活的颜色|`ThemeColor`|-|`Color.grey`|
|starDisableColor|星星禁用的颜色|`ThemeColor`|-|`Color.grey`|
|icon|选中时的图标|`string`|-|`'favorite-filling'`|
|voidIcon|未选中时的图标|`string`|-|`'favorite'`|
|space|星星之间的间距|`number`|-|`3`|
|half|用户是否可以选择出半星|`boolean`|-|`false`|
|readonly|是否只读|`boolean`|-|`false`|
|disabled|评星组件是否禁用|`boolean`|-|`false`|
|size|评星组件大小|`number`|-|`24`|

## 主题变量

|名称|类型|默认值|
|--|--|--|
|RateActiveColor|-|`props.starActiveColor`|
|RateColor|-|`props.starColor`|
|RateDisableColor|-|`props.starDisableColor`|
|RateIcon|-|`props.icon`|
|RateSize|-|`props.size`|
|RateSpace|-|`props.space`|
|RateVoidIcon|-|`props.voidIcon`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestRate
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
