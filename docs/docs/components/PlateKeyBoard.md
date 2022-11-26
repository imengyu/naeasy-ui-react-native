---
group:
  title: 表单组件
---

# PlateKeyBoard 车牌号输入

## 介绍

中国车牌号输入键盘，可以配合输入框组件或自定义的输入框组件使用。

## 导入

```jsx
import { PlateKeyBoard } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 基础用法

```jsx
export function TestKeyBoardScreen(props: Props) {

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
      <Field value={text} placeholder="请输入车牌号" onChangeText={setText} />
      <Button onPress={() => setShow(true)}>弹出输入键盘</Button>
      <PlateKeyBoard
        show={show}
        onFinish={(r) => setText(r)}
        onBlur={() => setShow(false)}
      />
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
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestPlateKeyBoard
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
