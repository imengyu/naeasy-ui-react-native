---
group:
  title: 表单组件
---

# Field 输入框/表单项

## 介绍

用户可以在文本框内输入或编辑文字。`Field` 同时也作为表单项使用，可以搭配 [`Form`](./Form.md) 组件实现表单相关功能。

## 导入

```jsx
import { Field } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 基础用法

```jsx
export function TestFieldScreen(props) {
  const [ value1, setValue1] = useState('');

  return (
    <Field label="文本" placeholder="请输入文本" value={value1} onChangeText={setValue1} />
  );
}
```

## 自定义类型

```jsx
<Field label="整数" type="number" placeholder="请输入整数" value={value3} onChangeText={setValue3} />
<Field label="数字" type="decimal" placeholder="请输入数字（小数）" value={value4} onChangeText={setValue4} />
<Field label="电话" type="tel" placeholder="请输入电话" value={value5} onChangeText={setValue5} />
<Field label="邮箱" type="email" placeholder="请输入邮箱" value={value6} onChangeText={setValue6} />
<Field label="密码" type="password" placeholder="请输入密码" value={value11} onChangeText={setValue11} />
```

## 禁用

```jsx
<Field label="只读" editable={false} placeholder="输入框只读" value={value8} onChangeText={setValue8} />
<Field label="禁用" disabled placeholder="输入框已禁用" value={value1} onChangeText={setValue1} />
```

## 错误提示

```jsx
<Field label="用户名" required showRequiredBadge placeholder="请输入用户名" error value={value6} onChangeText={setValue6} />
<Field label="用户名" required showRequiredBadge placeholder="请输入用户名" errorMessage="请输入用户名" value={value7} onChangeText={setValue7} />
```

## 带清除按钮

```jsx
<Field clearButton clearButtonMode="unless-editing" placeholder="请输入文字" value={value18} onChangeText={setValue18} />
```

## 不同的自定义样式

你可以为 Field 设置特殊样式。

```jsx
<Field placeholder="无左侧标签" value={value12} onChangeText={setValue12} />
<Field label="我是标签我是标签我是标签" placeholder="自定义标签与输入框宽度占比" labelFlex={2} inputFlex={3} value={value12} onChangeText={setValue12} />
<Field label="无冒号" colon={false} placeholder="请输入文本" value={value17} onChangeText={setValue17} />
<ColumnView padding={10}>
  <Field placeholder="自定义样式1" fieldStyle={{
    paddingVertical: rpx(10),
    paddingHorizontal: rpx(20),
    borderBottomColor: themeContext.resolveThemeColor(Color.border),
    borderBottomWidth: rpx(2),
    backgroundColor: themeContext.resolveThemeColor(Color.white),
  }} activeFieldStyle={{
    borderBottomColor: themeContext.resolveThemeColor(Color.primary),
  }} value={value12} onChangeText={setValue12} />
  <WhiteSpace size="sm" />
  <Field placeholder="自定义样式2" fieldStyle={{
    paddingVertical: rpx(10),
    paddingHorizontal: rpx(20),
    borderRadius: 5,
    borderWidth: rpx(2),
    borderColor: themeContext.resolveThemeColor(Color.border),
  }} activeFieldStyle={{
    borderColor: themeContext.resolveThemeColor(Color.primary),
  }} value={value12} onChangeText={setValue12} />
  <WhiteSpace size="sm" />
  <Field placeholder="自定义样式3" fieldStyle={{
    paddingVertical: rpx(10),
    paddingHorizontal: rpx(20),
    borderRadius: 5,
    backgroundColor: themeContext.resolveThemeColor(Color.grey),
  }}value={value12} onChangeText={setValue12} />
</ColumnView>
```

## 输入文本右对齐+后缀

```jsx
<Field
  label="身高"
  colon={false}
  type="number"
  inputAlign="right"
  placeholder="请输入身高"
  suffix={<Text width={30} align="right" color={Color.black}>cm</Text>}
  value={value13}
  onChangeText={setValue13}
/>
<Field
  label="体重"
  colon={false}
  type="number"
  inputAlign="right"
  placeholder="请输入体重"
  suffix={<Text width={30} align="right" color={Color.black}>kg</Text>}
  value={value14}
  onChangeText={setValue14}
/>
```

## 插入按钮

```jsx
<Field
  label=""
  required
  center
  placeholder="请输入短信验证码"
  value={value6}
  onChangeText={setValue6}
  renderRightButton={() => (<Button size="small" type="primary">发送验证码</Button>)}
/>
```

## 添加图标

```jsx
<Field
  center
  renderLeftIcon={() => <Icon icon="pad" style={{ marginRight: 10 }} />}
  placeholder="请输入手机号"
  value={value15}
  onChangeText={setValue15}
/>
<Field
  center
  placeholder="请输入短信验证码"
  value={value16}
  onChangeText={setValue16}
  renderLeftIcon={() => <Icon icon="lock" style={{ marginRight: 10 }} />}
  renderRightButton={() => (<Button size="small" type="primary">发送验证码</Button>)}
/>
```

## 多行文字

设置 multiline=true 开启多行文字。

```jsx
<Field label="多行文字" multiline placeholder="请输入" value={value9} onChangeText={setValue9} />
```

## 显示字数统计

设置 showWordLimit=true 开启字数显示。

```jsx
<Field label="多行文字" multiline placeholder="请输入" showWordLimit maxLength={100} value={value10} onChangeText={setValue10} />
```

## 作为表单项

`Field` 同时也作为表单项容器使用，可以搭配 [`Form`](./form.md) 组件实现表单相关功能。

你需要在 `Field` 的 `renderInput` 中嵌入你的自定义组件。

```tsx
<Form>
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
```

## API 参考

### Field

表单条目组件

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|label|输入框左侧文本|`string`|-|-|
|name|名称，作为提交表单时的标识符|`string`|-|-|
|type|输入框类型|`"number" &#124; "text" &#124; "tel" &#124; "password" &#124; "email" &#124; "decimal"`|-|`'text'`|
|maxLength|输入的最大字符数|`number`|-|-|
|placeholder|输入框占位提示文字|`string`|-|-|
|disabled|是否禁用输入框|`boolean`|-|`false`|
|center|是否内容垂直居中|`boolean`|-|`false`|
|colon|是否在 label 后面添加冒号|`boolean`|-|`true`|
|required|是否必填|`boolean`|-|`false`|
|showRequiredBadge|是否显示表单必填星号|`boolean`|-|`false`|
|clearButton|是否启用清除图标，点击清除图标后会清空输入框|`boolean`|-|`false`|
|clearButtonProps|清除图标的自定义属性|`IconProp`|-|-|
|labelWidth|左侧文本的宽度|`string &#124; number`|-|-|
|labelAlign|左侧文本对齐|`"center" &#124; "left" &#124; "right"`|-|`'left'`|
|labelFlex|左侧文本的flex占比|`number`|-|`undefined`|
|inputFlex|输入框的flex占比|`number`|-|`5`|
|labelStyle|左侧文本的样式|`TextStyle`|-|-|
|labelColor|左侧文本的颜色|`ThemeColor`|-|-|
|labelDisableColor|左侧文本的禁用颜色|`ThemeColor`|-|-|
|inputStyle|输入框样式|`TextStyle`|-|-|
|activeInputStyle|激活时的外壳样式|`TextStyle`|-|-|
|inputColor|输入框颜色|`ThemeColor`|-|-|
|inputAlign|输入框文本对齐。|`"center" &#124; "left" &#124; "right"`|-|`'left'`|
|inputDisableColor|输入框禁用颜色|`ThemeColor`|-|-|
|fieldStyle|外壳样式|`ViewStyle`|-|-|
|activeFieldStyle|激活时的外壳样式|`ViewStyle`|-|-|
|errorTextColor|错误时的文字颜色|`ThemeColor`|-|`Color.danger`|
|placeholderTextColor|文本框水印文字颜色|`ThemeColor`|-|`Color.grey`|
|formatter|输入内容格式化函数|`(text: string) => string`|-|-|
|formatTrigger|格式化函数触发的时机，可选值为 onBlur|`"onBlur" &#124; "onChangeText"`|-|`'onChangeText'`|
|validateTrigger|设置字段校验的时机：onBlur 文本框失去焦点时校验；onValueChange 数值更改时校验；onSubmit 提交时校验(默认)|`"onBlur" &#124; "onValueChange" &#124; "onSubmit"`|-|`'onSubmit'`|
|visibleIf|用于控制当前条目根据表单的值是否显示。|`(form: Form) => boolean`|-|-|
|error|是否将输入内容标红。|`boolean`|-|-|
|errorMessage|底部错误提示文案，为空时不展示|`string`|-|-|
|showWordLimit|是否显示字数统计|`boolean`|-|`false`|
|showLabel|是否显左边标题|`boolean`|-|`true`|
|showRightArrow|是否显右边箭头|`boolean`|-|`false`|
|rightArrowProps|右边箭头自定义属性|`IconProp`|-|-|
|suffix|输入框自定义后缀|`Element`|-|-|
|prefix|输入框前缀，这个前缀是显示在 label 后面，输入框前面|`Element`|-|-|
|onPress|点击回调。如果为空，则条目无法点击。|`() => void`|-|`undefined`|
|onChangeText|文字更改回调|`(text: string) => void`|-|-|
|onBlurValid|用于表单，失去焦点时验证回调|`(instance: FieldInstance, text: unknown) => void`|-|-|
|onClear|点击清除按钮时触发，返回true取消清除|`() => boolean`|-|-|
|renderLeftButton|渲染左侧按钮|`() => Element`|-|-|
|renderRightButton|渲染右侧按钮|`() => Element`|-|-|
|renderLeftIcon|渲染左侧图标区域|`() => Element`|-|-|
|renderInput|渲染输入框区域|`() => Element`|-|-|
|value|当前输入的值|`unknown`|-|-|
|onValueChange|用于表单，更改时验证回调|`(value: unknown) => void`|-|-|
|onFocusValid|用于表单，获得点时验证回调|`(instance: FieldInstance) => void`|-|-|

## 主题变量

|名称|类型|默认值|说明|
|--|--|--|--|
|FieldActiveFieldStyle|-|`{}`|-|
|FieldActiveInputStyle|-|`{}`|-|
|FieldClearIconColor|ColorInfoItem|`Color.grey`|-|
|FieldClearIconWidth|number|`30`|-|
|FieldErrorMessageColor|ColorInfoItem|`Color.danger`|-|
|FieldErrorMessageFontSize|number|`12`|-|
|FieldErrorMessageMarginTop|number|`4`|-|
|FieldErrorTextColor|ColorInfoItem|`Color.danger`|-|
|FieldFieldStyle|-|`{}`|-|
|FieldInputColor|ColorInfoItem|`Color.text`|-|
|FieldInputDisableColor|ColorInfoItem|`Color.grey`|-|
|FieldInputFlex|number|`5`|-|
|FieldInputPaddingHorizontal|number|`0`|-|
|FieldInputPaddingVertical|number|`0`|-|
|FieldInputStyle|-|`{}`|-|
|FieldLabelColor|ColorInfoItem|`Color.text`|-|
|FieldLabelDisableColor|ColorInfoItem|`Color.grey`|-|
|FieldLabelFlex|-|`undefined`|-|
|FieldLabelFontSize|number|`14`|-|
|FieldLabelMarginRight|number|`10`|-|
|FieldLabelPaddingVertical|number|`4`|-|
|FieldLabelStyle|-|`{}`|-|
|FieldPaddingHorizontal|number|`rpx(32)`|-|
|FieldPaddingVertical|number|`rpx(16)`|-|
|FieldPlaceholderTextColor|ColorInfoItem|`Color.textSecond`|-|
|FieldRequiredMark|ColorInfoItem|`Color.danger`|-|
|FieldRequiredMarkMarginHorizontal|number|`4`|-|
|FieldRequiredMarkPaddingVertical|number|`4`|-|
|FieldRightArrowSize|number|`16`|-|
|FieldWordLimitTextColor|ColorInfoItem|`Color.textSecond`|-|
|FieldWordLimitTextFontSize|number|`12`|-|
|FieldWordLimitTextTextAlign|string|`'right'`|-|
|FieldWordLimitTextWidth|string|`'100%'`|-|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestField
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
