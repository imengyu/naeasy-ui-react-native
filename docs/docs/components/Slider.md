---
group:
  title: 表单组件
---

# Slider 滑块

## 介绍

用于在给定的范围内选择一个值。

## 导入

```jsx
import { Slider } from '@imengyu/naeasy-ui-react-native/dist/components/form'
```

## 基础用法

```jsx
export class TestSliderScreen extends React.PureComponent {

  state = {
    value1: 50,
    value2: 20,
    value3: 30,
    value4: 50,
    value5: 100,
  };

  render() {
    return (
      <Slider value={this.state.value1} onValueChange={v => this.setState({ value1: v })} />
    );
  }
}
```

## 指定范围

```jsx
<Slider value={this.state.value2} onValueChange={v => this.setState({ value2: v })} minValue={-50} maxValue={50} onEndChange={(v) => Toast.info(`当前值：${v}`)} />
```

## 禁用

```jsx
<Slider value={this.state.value3} onValueChange={v => this.setState({ value3: v })} touchable={false} />
```

## 指定步长

```jsx
<Slider value={this.state.value3} onValueChange={v => this.setState({ value3: v })} step={20} />
```

## 自定义样式

```jsx
<Slider
  value={this.state.value4}
  onValueChange={v => this.setState({ value4: v })}
  activeColor={Color.success}
  inactiveColor={Color.orangeLight}
  trackStyle={{
    backgroundColor: '#5fa',
    borderRadius: 0,
  }}
/>
```

## 垂直方向

```jsx
<Slider value={this.state.value5} onValueChange={v => this.setState({ value5: v })} vertical style={{ height: 200 }} />
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
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestSlider
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
