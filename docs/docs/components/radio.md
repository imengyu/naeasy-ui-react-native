---
group:
  title: 表单组件
---

# Radio 单选框

## 介绍

在一组备选项中进行单选。

## 导入

```jsx
import { Radio } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 单独用法

```jsx
export function TestCheckScreen(props) {
  const [ checked1, setChecked1 ] = useState(false);

  return (
    <Radio value={checked1} onValueChange={setChecked1} text="单选框" />
  );
}
```

## 基础用法

搭配 RadioGroup 组件，一组只能有一个 Radio 选中。

```jsx
export function TestCheckScreen(props) {
  const [ checked2, setChecked2 ] = useState('0');

  return (
    <RadioGroup value={checked2} onValueChange={(v) => setChecked2(v)}>
      <Radio name="0" text="单选框 1" />
      <Radio name="1" text="单选框 2" />
      <Radio name="2" text="单选框 3" />
      <Radio name="3" text="单选框 4" />
    </RadioGroup>
  );
}

```

## 禁用状态

设置 disabled 后为禁用状态。

```jsx
<RadioGroup value={checked2} onValueChange={(v) => setChecked2(v as string)}>
  <Radio name="0" disabled text="单选框 1" />
  <Radio name="1" disabled text="单选框 2" />
</RadioGroup>
```

## 自定义颜色

通过设置 color 可以修改主颜色，默认主颜色是 `Color.primary` 。

```jsx
<RadioGroup value={checked2} onValueChange={(v) => setChecked2(v as string)}>
  <Radio name="0" color={Color.danger} text="单选框 1" />
  <Radio name="1" color={Color.success} text="单选框 2" />
</RadioGroup>
```

## 配合单元格组件使用

可以嵌入 Cell 单元格中实现整行点击。配合 checkPosition 可以控制选择框的位置。

```jsx
<RadioGroup value={checked3} onValueChange={(v) => setChecked3(v as string)}>
  <Cell key="0"><Radio checkPosition="right" block text="单选框 1" name="1" /></Cell>
  <Cell key="1"><Radio checkPosition="right" block text="单选框 2" name="2" /></Cell>
</RadioGroup>
```

## API 参考

### Radio

单选框

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|value|是否选中 单选框|`boolean`|-|`false`|
|name|当前单选框在单选框组中的value，不能与其他重复|`string &#124; number`|-|-|
|text|单选框的文字|`string`|-|-|
|children|单选框的文字|`string`|-|-|
|disabled|是否禁用单选框|`boolean`|-|`false`|
|shape|单选框的形状|`"square" &#124; "round"`|-|`'round'`|
|block|复选框占满整个父元素|`boolean`|-|`false`|
|checkPosition|复选框按钮位置|`"left" &#124; "right"`|-|`'left'`|
|checkType|单选框内部形状：color 一个纯色形状；check 一个图标|`"color" &#124; "check"`|-|`'color'`|
|checkIconName|单选框内部形状，在 checkType 为 check 时有效。|`string`|-|-|
|activeOpacity|按下时透明度|`number`|-|`0.75`|
|color|单选框的颜色|`ThemeColor`|-|`Color.primary`|
|disabledColor|禁用时的颜色|`ThemeColor`|-|`Color.grey`|
|disabledTextColor|禁用时的文字颜色|`ThemeColor`|-|`Color.grey`|
|textColor|文字颜色|`ThemeColor`|-|-|
|textStyle|自定义文字样式|`TextStyle`|-|-|
|style|自定义样式|`ViewStyle`|-|-|
|onValueChange|用户更改选中时发生|`(value: boolean) => void`|-|-|
|renderButton|自定义渲染单选框按钮的回调|`(on: boolean) => Element`|-|-|

### RadioGroup

单选框组

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|value|当前单选框组选中的项目|`string &#124; number`|-|-|
|disabled|是否禁用整组单选框，设置后会禁用全部单选框。|`boolean`|-|`false`|
|onValueChange|用户更改选中时发生|`(value: string &#124; number) => void`|-|-|

## 主题变量

|名称|类型|默认值|
|--|--|--|
|RadioActiveOpacity|-|`props.activeOpacity`|
|RadioBlockMarginHorizontal|number|`0`|
|RadioBlockWidth|string|`'100%'`|
|RadioColor|-|`props.color`|
|RadioDisabledColor|-|`props.disabledColor`|
|RadioDisabledTextColor|-|`props.disabledTextColor`|
|RadioMarginHorizontal|number|`4`|
|RadioShape|-|`props.shape`|
|RadioTextColor|-|`props.textColor`|
|RadioTextFontSize|number|`14`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestRadio
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
