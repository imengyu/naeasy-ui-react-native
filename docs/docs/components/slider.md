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

通过 minValue 和 maxValue 设置最终返回的参数范围，范围不会在组件上显示。

```jsx
<Slider value={this.state.value2} onValueChange={v => this.setState({ value2: v })} minValue={-50} maxValue={50} onEndChange={(v) => Toast.info(`当前值：${v}`)} />
```

## 禁用

通过 touchable 设置是用户否可以滑动。

```jsx
<Slider value={this.state.value3} onValueChange={v => this.setState({ value3: v })} touchable={false} />
```

## 指定步长

通过 step 设置滑块移动的步长。

```jsx
<Slider value={this.state.value3} onValueChange={v => this.setState({ value3: v })} step={20} />
```

## 自定义样式

通过 trackStyle 可设置滑块的样式。activeColor 设置滑块条激活颜色，inactiveColor 设置滑块条未激活颜色。

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

设置 vertical 后滑块将显示为竖向。

```jsx
<Slider value={this.state.value5} onValueChange={v => this.setState({ value5: v })} vertical style={{ height: 200 }} />
```

## API 参考

### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|value|当前数值|`number`|-|`0`|
|step|步长|`number`|-|`1`|
|onValueChange|数值变化回调|`(value: number) => void`|-|-|
|onEndChange|进度变化且结束拖动后触发|`(value: number) => void`|-|-|
|maxValue|最大值|`number`|-|`100`|
|minValue|最小值|`number`|-|`0`|
|barHeight|进度条高度|`number`|-|`5`|
|buttonSize|滑块按钮大小|`number`|-|`20`|
|activeColor|进度条激活态颜色|`ThemeColor`|-|`Color.primary`|
|inactiveColor|进度条非激活态颜色|`ThemeColor`|-|`Color.grey`|
|trackStyle|滑块的样式|`ViewStyle`|-|-|
|style|外层的样式|`ViewStyle`|-|-|
|touchable|是否可以滑动，否则无法修改滑块的值|`boolean`|-|`true`|
|vertical|是否垂直展示|`boolean`|-|`false`|
|renderButton|自定义渲染滑块按钮回调|`(valuepos: number) => Element`|-|-|

## 主题变量

|名称|类型|默认值|
|--|--|--|
|SliderActiveColor|-|`props.activeColor`|
|SliderBarBorderRadius|number|`2`|
|SliderBarHeight|-|`props.barHeight`|
|SliderDisabledOpactity|number|`0.5`|
|SliderInactiveColor|-|`props.inactiveColor`|
|SliderTrackBackgroundColor|string|`'#fff'`|
|SliderTrackDisabledBackgroundColor|string|`'#eaeaea'`|
|SliderTrackElevation|number|`2`|
|SliderTrackShadowColor|ColorInfoItem|`Color.black`|
|SliderTrackShadowOffset|-|`{ width: 0`|
|SliderTrackShadowOpacity|number|`0.1`|
|SliderTrackSize|-|`props.buttonSize`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestSlider
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
