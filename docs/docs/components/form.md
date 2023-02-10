---
group:
  title: 表单组件
---

# Form 表单

## 介绍

用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型，需要与 Field 输入框 组件搭配使用。

## 导入

```jsx
import { Form, Field } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 基础用法

```jsx
<Form
  ref={(f) => { this.formRef1 = f;}}
  rules={{
    userName: { required: true, message: '请输入用户名' },
    password: [
      { required: true, message: '请输入密码' },
      { min: 6, message: '密码长度必须大于等于6位' },
    ],
    passwordRepeat: [
      { required: true, message: '请再输入一次密码' },
      {
        //表单自定义校验
        validator(rule, value, callback, source) {
          if (value !== source.password) {
            callback('两次输入密码不一致，请检查');
            return;
          }
          callback();
        },
      },
    ],
  }}
  fieldProps={{
    labelFlex: 1,
    inputFlex: 4,
    fieldStyle: Field.StyleWhiteItemField,
  }}
  onSubmit={(values) => {
    console.log('表单数据', values);
  }}
>
  <Field name="userName" label="用户名" placeholder="请输入用户名" />
  <Field name="password" label="密码" placeholder="请输入密码"  type="password" />
  <Field name="passwordRepeat" label="密码" placeholder="再输入一次"  type="password" />
</Form>
<ColumnView padding={20}>
  <Button type="primary" onPress={() => this.formRef1?.submit(true)}>提交</Button>
  <WhiteSpace size="sm" />
  <Button type="default" onPress={() => this.formRef1?.reset()}>重置</Button>
</ColumnView>
```

## 校验规则

表单使用 async-validator 进行表单校验，与 Web 中的校验方式一致

```jsx
<Form
  ref={(f) => { this.formRef2 = f;}}
  fieldProps={{
    labelFlex: 1,
    fieldStyle: Field.StyleWhiteItemField,
  }}
  rules={{
    pattern: { required: true, pattern: /\d/, message: '请输入数字' },
    validator: { required: true, validator: (rule, value) => {
      if (value !== '1') {
        return new Error('请输入1');
      }
    } },
    async: { required: true, validator: (rule, value, callback) => {
        setTimeout(() => {
          callback(value === '1' ? undefined : '请输入1');
        }, 200);
      },
    },
  }}
  validateTrigger="onBlur"
  onSubmit={(values) => {
    console.log('表单数据', values);
  }}
>
  <Field name="pattern" label="文本" placeholder="正则校验(输入数字)" />
  <Field name="validator" label="文本" placeholder="自定义校验(输入1正确，其他错误)" />
  <Field name="async" label="文本" placeholder="异步函数校验(输入1正确，其他错误)" />
</Form>
<ColumnView padding={20}>
  <Button type="primary" onPress={() => this.formRef2?.submit(true)}>提交</Button>
</ColumnView>
```

## 表单类型

```jsx
<Form
  ref={(f) => { this.formRef3 = f;}}
  fieldProps={{
    labelFlex: 2,
    fieldStyle: Field.StyleWhiteItemField,
  }}
  intitalValue={{
    text: '',
    switch: false,
    check: false,
    checkgroup: ['a'],
    radio: 'a',
    stepper: 1,
    rate: 3,
  }}
  onSubmit={(values) => {
    Dialog.alert({
      title: '表单数据',
      content: JSON.stringify(values),
    });
  }}
>
  <Field name="text" label="文本" placeholder="文本框" />
  <Field name="switch" label="开关" renderInput={() => <Switch />} />
  <Field name="check" label="复选框" center renderInput={() => <CheckBox shape="square" />} />
  <Field name="checkgroup" label="复选框组" center renderInput={() =>
    <CheckBoxGroup>
      <CheckBox name="a">复选框1</CheckBox>
      <CheckBox name="b">复选框2</CheckBox>
    </CheckBoxGroup>}
  />
  <Field name="radio" label="单选框" center renderInput={() =>
    <RadioGroup>
      <Radio name="a">单选框1</Radio>
      <Radio name="b">单选框1</Radio>
    </RadioGroup>}
  />
  <Field name="stepper" label="步进器" renderInput={() => <Stepper />} />
  <Field name="rate" label="评分" renderInput={() => <Rate />} />
  <Field name="sider" label="滑块" renderInput={() => <Slider />} />
</Form>
<ColumnView padding={20}>
  <Button type="primary" onPress={() => this.formRef3?.submit(true)}>提交</Button>
</ColumnView>
```

## API 参考

### Props

|参数|说明|类型|默认值|
|---|---|---|---|
|intitalValue|表单的初始值|`FormValues`|-|
|rules|表单验证数据|`Rules`|-|
|onReset|表单重置回调，表单数据会重置到 `intitalValue`|`() => void`|-|
|onSubmit|调用 `formApi.submit()`，数据验证成功后的回调函数|`(value: FormValues) => void`|-|
|onSubmitFail|调用 `formApi.submit()`，数据验证失败后的回调函数|`(error: ValidateError[]) => void`|-|
|validateTrigger|设置字段校验的时机: onBlur 文本框失去焦点时校验; onValueChange 数值更改时校验; onSubmit 提交时校验(默认)|`'onBlur' &#124; 'onValueChange' &#124; 'onSubmit'`|-|
|readonly|是否只读|`boolean`|`false`|
|disabled|组件是否禁用|`boolean`|`false`|
|clearValidFocus|是否在文本框激活时清除之前错误的验证结果|`boolean`|`false`|
|style|表单外层容器样式|`ViewStyle`|-|
|fieldProps|对当前表单内部的所有 `Field` 属性进行统一设置|`FieldProps`|-|
|addRequireMark|是否自动根据表单校验规则为 Field 设置必填星号|`boolean`|`true`|

### Methods

#### `blur(): void`

取消表单内部的输入框激活（通常在提交时，可以调用此方法，关闭输入框）。

#### `reset(): void`

重置表单。

#### `resetValidation(name?: string|string[]): void`

重置表单项的验证提示，支持传入 name 来重置单个或部分表单项。

#### `validate(name?: string | string[]): Promise<void>`

验证表单，支持传入 name 来验证单个或部分表单项。

#### `submit(valid?: boolean): void`

提交表单。

|参数|说明|类型|默认值|
|---|---|---|---|
|valid|提交之前是否要验证表单|`boolean`|`true`|

#### `getValues(): FormValues`

获取所有表单项当前的值。

#### `getValue(name: string): FormValueType`

获取指定表单项当前的值。

|参数|说明|类型|默认值|
|---|---|---|---|
|name|表单项的名称|`string`|-|

#### `setValue(name: string, value: FormValueType): FormValueType`

获取指定表单项当前的值。

|参数|说明|类型|默认值|
|---|---|---|---|
|name|表单项的名称|`string`|-|
|value|设置的值|`FormValueType`|-|

返回值:

|说明|类型|
|---|---|
|返回之前的值|`FormValueType`|

## 自定义表单组件

你可以自定义开发表单组件，并将其嵌入至表单中。

自定义表单组件需要嵌入表单项 [`Field`](./field.md#作为表单项) 的
`renderInput` 回调中。

### 自动劫持

表单项 [`Field`](./field.md#作为表单项) 会自动劫持子元素的事件，以保证表单工作，下方是事件的名称：

* value 当前表单项的值（必须）
* onValueChange(value: unknown) 参数更改时回调（必须回调）
* onBlur() 失去焦点时回调 （可选回调）
* onFocus() 获取焦点时回调（可选回调）
* onFocusValid() 参数更改时的验证回调（可选回调）
* onBlurValid(value: unknown) 失去焦点时的验证回调（可选回调）

如果你的自定义组件工作模式比较简单，属性与上方给出的一致，你可以直接嵌入 Field 组件中使用：

```jsx
<Field name="switch" label="开关" renderInput={() => <Switch />} />
```

如果你的自定义组件比较复杂，可以使用下方自定义处理上下文的方法。

### 上下文自定义处理

表单暴露了表单项 Context（上下文），嵌入表单项 [`Field`](./field.md#作为表单项) 中的组件可以获取当前表单项的上下文。

上下文中提供了这些回调，用于表单相关功能：

* value 当前表单项的值
* onValueChange(value: unknown) 参数更改时回调（必须回调）
* onFocusValid() 获取焦点时回调（可选回调）
* onBlurValid(value: unknown) 失去焦点时回调（可选回调）

获取上下文之后，你需要在自己的组件处理逻辑中回调这些事件，以保证表单相关功能的正常运行。

```tsx
import { FieldItemContext } from "@imengyu/naeasy-ui-react-native/dist/components/Field";

function MyComponent() {
  //获取上下文
  const formContext = useContext(FieldItemContext);
  //你的自定义组件逻辑....
  // formContext.value 当前表单项的值
  // 数据更改时回调 formContext.onValueChange(newValue)
}
```


```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestForm
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
