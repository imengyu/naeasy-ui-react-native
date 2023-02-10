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

通过 step 设置每次增加、减少的步长。

```jsx
<Stepper step={3} value={value} onValueChange={setValue} />
```

## 限制输入范围

通过 minValue、maxValue 属性设置 最小值/最大值。

```jsx
<Stepper maxValue={10} value={value} onValueChange={setValue} />
```

## 限制输入整数

设置 integer 后用户只能输入整数。

```jsx
<Stepper integer value={value} onValueChange={setValue} />
```

## 禁用状态

设置 disabled 后禁用组件。

```jsx
<Stepper disabled value={value} onValueChange={setValue} />
```

## 禁用输入框

设置 disableInput 后用户无法通过点击中心输入框输入数字，但可以通过加减号更改数值。。

```jsx
<Stepper disableInput value={value} onValueChange={setValue} />
```

## 固定小数位数

设置 decimalLength 固定小数位数，通常搭配小数位数的 step 步长以让用户可以精确调整数值。

```jsx
<Stepper decimalLength={1} step={0.1} value={value} onValueChange={setValue} />
```

## API 参考

### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|value|当前数值|`number`|-|`0`|
|onValueChange|数值变化回调|`(value: number) => void`|-|-|
|maxValue|最大值，为空无限制|`number`|-|`undefined`|
|minValue|最小值|`number`|-|`1`|
|inputWidth|中间输入框的宽度|`number`|-|`50`|
|step|步长，每次点击时改变的值|`number`|-|`1`|
|defaultValue|初始值，当 value 为空时生效|`number`|-|`0`|
|decimalLength|固定显示的小数位数|`number`|-|`10`|
|disabled|是否禁用|`boolean`|-|`false`|
|disableInput|是否禁用输入框|`boolean`|-|`false`|
|integer|是否只允许输入整数|`boolean`|-|`false`|
|addIcon|加号图标名称|`string`|-|`'add-bold'`|
|minusIcon|键号图标名称|`string`|-|`'minus-bold'`|
|renderAdd|自定义渲染加号|`(props: { onPress: () => void; disabled: boolean; }) => Element`|-|-|
|renderMinus|自定义渲染减号|`(props: { onPress: () => void; disabled: boolean; }) => Element`|-|-|
|renderCenter|自定义渲染中心|`(props: RenderCenterProps) => Element`|-|-|

##### RenderCenterProps

自定义渲染中心输入框的组件参数。

```ts
{
  disableInput: boolean; 
  value: string|number; 
  editable: boolean; 
  integer: boolean; 
  onChangeText: (text: string) => void; 
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}
```

## 主题变量

|名称|类型|默认值|
|--|--|--|
|StepperAddIcon|string|`'add-bold'`|
|StepperButtonBackgroundColor|ColorInfoItem|`Color.light`|
|StepperButtonBorderRadius|number|`0`|
|StepperButtonPaddingHorizontal|number|`4`|
|StepperButtonPaddingVertical|number|`4`|
|StepperInputBackgroundColor|ColorInfoItem|`Color.light`|
|StepperInputMarginHorizontal|number|`4`|
|StepperInputMarginVertical|number|`0`|
|StepperInputPaddingHorizontal|number|`10`|
|StepperInputPaddingVertical|number|`0`|
|StepperInputTextColor|ColorInfoItem|`Color.text`|
|StepperInputWidth|number|`50`|
|StepperMinusIcon|string|`'minus-bold'`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestStepper
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
