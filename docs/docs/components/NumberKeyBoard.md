---
group:
  title: 表单组件
---

# NumberKeyBoard 数字键盘

## 介绍

数字键盘，一般用于有安全需求下的数字输入，如金额、密码、验证码输入等。

## 导入

```jsx
import { NumberKeyBoard } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 基础用法

```jsx

```

## 基础用法

```jsx
export function TestNumberKeyBoardScreen(props: Props) {

  const [ show, setShow ] = useState(false);
  const [ text, setText ] = useState('');

  function onInput(char: string) {
    setText(prev => prev + char);
  }
  function onDelete() {
    setText(prev => prev.substring(0, prev.length - 1));
  }

  return (
    <>
      <Field value={text} placeholder="请输入数字" onChangeText={setText} />
      <Button onPress={() => setShow(true)}>弹出输入键盘</Button>
      <NumberKeyBoard
        show={show}
        onInput={onInput}
        onDelete={onDelete}
        onBlur={() => setShow(false)}
      />
    </>
  );
}
```

## 带右侧栏键盘

```jsx
<NumberKeyBoard
  show={show}
  showSideButtons
  onInput={onInput}
  onDelete={onDelete}
  onBlur={() => setShow(false)}
/>
```

## 带标题的键盘

```jsx
<NumberKeyBoard
  show={show}
  title="请输入号码"
  onInput={onInput}
  onDelete={onDelete}
  onBlur={() => setShow(false)}
/>
```

## 身份证号键盘

向键盘添加一个身份证的 X 按键。

```jsx
<NumberKeyBoard
  show={show}
  extraKeys={[ { key: 'X', order: 9, replace: true } ]}
  onInput={onInput}
  onDelete={onDelete}
  onBlur={() => setShow(false)}
/>
```

## 自定义按键键盘

键盘允许你添加自定义按键或者替换原有按键。

extraKeys：既可以配置额外按键，也可以替换默认数字按键。

* order 按键插入位置。顺序是从左到右，从上到下。
* replace 是否替换原有位置上的按键。

sideKeys：配置侧边栏的按键。

```jsx
<NumberKeyBoard
  show={show}
  extraKeys={[
    { key: '0', order: 9, replace: true },
    { key: 'X', order: 10, replace: true },
    { key: 'Y', order: 11, replace: true },
    { key: 'A', order: 12, replace: true },
    { key: 'B', order: 13, replace: true },
    { key: 'C', order: 14, replace: true },
    { key: 'D', order: 15, replace: true },
    { key: 'E', order: 16, replace: true },
    { key: 'F', order: 17, replace: true },
  ]}
  sideKeys={[
    { key: 'delete', span: 2 },
    { key: 'finish', span: 4 },
  ]}
  keyHeight={40}
  showSideButtons
  onInput={onInput}
  onDelete={onDelete}
  onBlur={() => setShow(false)}
/>
```

## 随机数字键盘

```jsx
<NumberKeyBoard
  show={show}
  keyRandomOrder
  onInput={onInput}
  onDelete={onDelete}
  onBlur={() => setShow(false)}
/>
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
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestNumberKeyBoard
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
