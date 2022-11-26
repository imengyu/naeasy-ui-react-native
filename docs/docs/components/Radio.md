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

```jsx
<RadioGroup value={checked2} onValueChange={(v) => setChecked2(v as string)}>
  <Radio name="0" disabled text="单选框 1" />
  <Radio name="1" disabled text="单选框 2" />
</RadioGroup>
```

## 自定义颜色

```jsx
<RadioGroup value={checked2} onValueChange={(v) => setChecked2(v as string)}>
  <Radio name="0" color={Color.danger} text="单选框 1" />
  <Radio name="1" color={Color.success} text="单选框 2" />
</RadioGroup>
```

## 配合单元格组件使用

```jsx
<RadioGroup value={checked3} onValueChange={(v) => setChecked3(v as string)}>
  <Cell key="0"><Radio checkPosition="right" block text="单选框 1" name="1" /></Cell>
  <Cell key="1"><Radio checkPosition="right" block text="单选框 2" name="2" /></Cell>
</RadioGroup>
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
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestRadio
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
