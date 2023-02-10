---
group:
  title: 表单组件
---

# CheckBox 复选框

## 介绍

复选框用于选择一个或多个选项。

## 导入

```jsx
import { CheckBox, CheckBoxGroup } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 单独用法

```jsx
export function TestCheckScreen(props) {
  const [ checked1, setChecked1 ] = useState(false);

  return (
    <CheckBox value={checked1} onValueChange={setChecked1} text="复选框" />
  );
}
```

## 基础用法

```jsx
export function TestCheckScreen(props) {
  const [ checked2, setChecked2 ] = useState([ '0' ]);

  return (
    <CheckBoxGroup value={checked2} onValueChange={(v) => setChecked2(v)}>
      <CheckBox name="0" text="复选框 1" />
      <CheckBox name="1" text="复选框 2" />
      <CheckBox name="2" text="复选框 3" />
      <CheckBox name="3" text="复选框 4" />
    </CheckBoxGroup>
  );
}

```

## 禁用

```jsx
<CheckBoxGroup value={checked2} onValueChange={(v) => setChecked2(v)}>
  <CheckBox name="0" disabled={true} color={Color.danger} text="复选框 1" />
  <CheckBox name="1" disabled={true} color={Color.success} text="复选框 2" />
</CheckBoxGroup>
```

## 自定义形状

```jsx
<CheckBoxGroup value={checked2} onValueChange={(v) => setChecked2(v)}>
  <CheckBox name="0" shape="round" text="复选框 1" />
  <CheckBox name="1" shape="square" text="复选框 2" />
</CheckBoxGroup>
```

## 自定义颜色

```jsx
<CheckBoxGroup value={checked2} onValueChange={(v) => setChecked2(v)}>
  <CheckBox name="0" color={Color.danger} text="复选框 1" />
  <CheckBox name="1" color={Color.success} text="复选框 2" />
</CheckBoxGroup>
```

## 自定义图片

```jsx
<CheckBoxGroup value={checked2} onValueChange={(v) => setChecked2(v)}>
  <ImageCheckBox name="0" text="复选框 1" />
  <ImageCheckBox name="1" boxImage={require('../images/test/test-check-box.png')} checkImage={require('../images/test/test-check.png')} text="复选框 2" />
</CheckBoxGroup>
```

## 配合单元格组件使用

```jsx
<CheckBoxGroup value={checked2} onValueChange={(v) => setChecked2(v)}>
  <Cell key="1"><CheckBox checkPosition="right" block name="1" text="复选框 1" /></Cell>
  <Cell key="2"><CheckBox checkPosition="right" block name="2" text="复选框 2" /></Cell>
  <Cell key="3"><CheckBox checkPosition="right" block name="3" text="复选框 3" /></Cell>
  <Cell key="4"><CheckBox checkPosition="right" block name="4" text="复选框 4" /></Cell>
</CheckBoxGroup>
```

## 切换选择

通过 CheckboxGroup 实例上的 toggleAll 方法可以实现全选与反选。

```jsx
export function TestCheckScreen(props) {
  const [ checked, setChecked ] = useState([ '0' ]);
  const check = React.createRef();

  return (
    <>
      <CheckBoxGroup ref={check} value={checked} onValueChange={(v) => setChecked(v)}>
        <CheckBox name="0" text="复选框 1" />
        <CheckBox name="1" text="复选框 2" />
        <CheckBox name="2" text="复选框 3" />
        <CheckBox name="3" text="复选框 4" />
      </CheckBoxGroup>
      <RowView padding={10}>
        <Button type="primary" onPress={() => check5.current?.toggleAll(true)}>全选</Button>
        <Button type="primary" style={{ marginLeft: 5 }} onPress={() => check.current?.toggleAll(false)}>全不选</Button>
        <Button type="primary" style={{ marginLeft: 5 }} onPress={() => check.current?.toggleAll()}>反选</Button>
      </RowView>
    </>
  );
}
```

## API 参考

### CheckBox
  
复选框

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|value|是否选中复选框|`boolean`|-|`false`|
|name|当前复选框在复选框组中的value，不能与其他重复|`string`|-|-|
|text|复选框的文字|`string`|-|-|
|children|复选框的文字|`string &#124; Element`|-|-|
|shape|复选框的形状|`"square" &#124; "round"`|-|`'round'`|
|block|复选框占满整个父元素，默认否|`boolean`|-|`false`|
|checkPosition|复选框按钮位置，默认在左|`"left" &#124; "right"`|-|`'left'`|
|borderColor|复选框未选择时的边框颜色|`ThemeColor`|-|`Color.border`|
|checkColor|复选框选中时的颜色|`ThemeColor`|-|`Color.primary`|
|checkSize|复选框按钮大小，默认是 20dp|`number`|-|`20`|
|activeOpacity|按下时透明度|`number`|-|`0.75`|
|color|复选框的颜色，默认是 primary|`ThemeColor`|-|`Color.primary`|
|disabled|是否禁用复选框|`boolean`|-|`false`|
|icon|选择勾的图标|`string`|-|`'check-mark'`|
|textColor|文字颜色|`ThemeColor`|-|`Color.text`|
|disabledTextColor|禁用状态下文字颜色|`ThemeColor`|-|`Color.textSecond`|
|textStyle|自定义文字样式|`TextStyle`|-|-|
|style|自定义样式|`ViewStyle`|-|-|
|onValueChange|用户更改选中时发生|`(value: boolean) => void`|-|-|
|renderButton|自定义渲染复选框按钮的回调|`(on: boolean) => Element`|-|-|

### CheckBoxGroup

复选框组

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|value|当前复选框组选中的项目|`string[]`|-|-|
|disabled|是否禁用整组复选框，设置后会禁用全部复选框|`boolean`|-|`false`|
|onValueChange|用户更改选中时发生|`(value: string[]) =>  void`|-|-|

#### Methods

##### toggleAll(options)

切换所有复选框

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|options|传 true 为选中，false 为取消选中，不传参为取反|`boolean &#124; undefined &#124; CheckBoxGroupToggleOptions`|-|-|

### CheckBoxDefaultButton

默认的复选框按钮样式

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|on|是否处于激活状态|`boolean`|-|`false`|
|borderColor|未选中状态下边框颜色。|`string`|-|`Color.border`|
|checkedBorderColor|选中状态下边框颜色。|`string`|-|`Color.primary`|
|disableBorderColor|禁用并且未选中状态下边框颜色。|`string`|-|`Color.grey`|
|disableCheckedBorderColor|禁用并且选中状态下边框颜色。|`string`|-|`Color.grey`|
|checkColor|图标颜色。|`string`|-|`Color.white`|
|disableCheckColor|禁用状态下图标颜色。|`string`|-|`Color.grey`|
|backgroundColor|未选中状态下按钮背景颜色。|`string`|-|`Color.white`|
|checkedBackgroundColor|且选中状态下按钮背景颜色。|`string`|-|`Color.primary`|
|disableBackgroundColor|禁用并且未选中状态下按钮背景颜色。|`string`|-|`Color.background`|
|disableCheckedBackgroundColor|禁用并且选中状态下按钮背景颜色。|`string`|-|`Color.background`|
|size|按钮大小。|`number`|-|`18`|
|iconSize|图标大小。|`number`|-|`15`|
|borderWidth|边框粗细。|`number`|-|`1`|
|icon|图标。|`string`|-|`'check-mark'`|
|disabled|是否处于禁用状态。|`boolean`|-|`false`|
|style|自定义样式|`ViewStyle`|-|-|
|shape|这个按钮的形状。square：正方形 round：圆形|`"square" &#124; "round"`|-|`'round'`|
|type|这个按钮的显示模式。icon：多选按钮显示的图标 radio：单选按钮显示的圆形|`"icon" &#124; "radio"`|-|`'icon'`|

## 主题变量

|名称|类型|默认值|说明|
|--|--|--|--|
|CheckBoxActiveOpacity|-|`props.activeOpacity`|-|
|CheckBoxBorderColor|-|`props.borderColor`|-|
|CheckBoxButtonMarginRight|number|`4`|-|
|CheckBoxMarginHorizontal|number|`4`|-|
|CheckBoxTextFontSize|number|`14`|-|
|CheckBoxCheckColor|-|`props.checkColor`|-|
|CheckBoxCheckSize|-|`props.checkSize`|-|
|CheckBoxColor|-|`props.color`|-|
|CheckBoxDisabledColor|-|`props.disabledColor`|-|
|CheckBoxDisabledTextColor|-|`props.disabledTextColor`|-|
|CheckBoxShape|-|`props.shape`|-|
|CheckBoxTextColor|-|`props.textColor`|-|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestCheck
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
