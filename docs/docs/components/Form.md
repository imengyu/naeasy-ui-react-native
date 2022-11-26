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
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestForm
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
