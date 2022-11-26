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
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestCheck
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
