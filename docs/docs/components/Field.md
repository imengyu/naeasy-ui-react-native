---
group:
  title: 表单组件
---

# Field 输入框/表单项

## 介绍

用户可以在文本框内输入或编辑文字。Field 同时也作为表单项使用，可以搭配 Form 组件实现表单相关功能。

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
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestField
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
