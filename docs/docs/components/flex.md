---
group:
  title: 布局组件
---

# Flex 布局封装

## 介绍

Flex 组件是对基础 View 进行封装的组件，分为 ColumnView 与 RowView，用于快速布局使用。

## 导入

```jsx
import { ColumnView, RowView } from '@imengyu/naeasy-ui-react-native/dist/components/layout'
```

## ColumnView

ColumnView 是一个flex垂直方向的view。

```jsx
<ColumnView>
  <View />
  <View />
  <View />
</ColumnView>
```

## RowView

RowView 是一个flex水平方向的view。

```jsx
<RowView>
  <View />
  <View />
  <View />
</RowView>
```

## 居中

设置 center 属性可以使内容居中。

```jsx
<RowView>
  <Text>我是居中内容</Text>
</RowView>
```

## 换行

设置 wrap 属性可以使内容换行。

```jsx
<RowView wrap>
  <View />
  <View />
  <View />
  <View />
  <View />
  <View />
  <View />
  <View />
  <View />
</RowView>
```

## 常用属性封装

支持背景颜色、大小、边距等常用属性的快速设置。

```jsx
<ColumnView>
  <ColumnView width={100} height={100} backgroundColor="#0f0">
    <Text>设置大小</Text>
  </ColumnView>
  <ColumnView backgroundColor="#f00" height={30}>
    <Text>设置背景颜色</Text>
  </ColumnView>
  <ColumnView padding={12} backgroundColor="#0f0">
    <Text>内边距10</Text>
  </ColumnView>
  <ColumnView margin={10} height={30} backgroundColor="#f00">
    <Text>外边距10</Text>
  </ColumnView>
</ColumnView>
```

## 点击事件封装

支持点击的 View。

```jsx
<ColumnView backgroundColor="#f40" touchable padding={10} onPress={() => {
  console.log('点击了！');
}}>
  <Text>ABC</Text>
</ColumnView>
```

## 使用案例

这是一个简单的使用案例，展示了如何使用 Flex View 快速布局。你可以基于这些布局组件，快速拼装出你想要的界面。

```jsx
 <RowView align="center">
  <Avatar color="blue" text="王" />
  <ColumnView padding={10}>
    <RowView align="center">
      <Icon icon="favorite-filling" color="#f60" />
      <WhiteSpace size={2}/>
      <Text size={16}>小王</Text>
    </RowView>
    <Text>1234567890@qq.com</Text>
  </ColumnView>
</RowView>
```

## API 参考

|参数|说明|类型|默认值|
|---|---|---|---|
|position|样式 position 简写|`'absolute'  'relative'`|-|
|direction|Flex 布局方向简写|`'row' &#124; 'column' &#124; 'row-reverse' &#124; 'column-reverse'`|-|
|justify|子元素在主轴上的对齐方式|`'flex-start' &#124; 'flex-end' &#124; 'center' &#124; 'space-between' &#124; 'space-around' &#124; 'space-evenly'`|-|
|alignSelf|当前元素在主轴上的对齐方式|`FlexAlignType &#124; "auto"`|-|
|align|子元素在交叉轴上的对齐方式|`FlexAlignType`|-|
|center|主轴与交叉轴是否居中|`boolean`|`false`|
|wrap|弹性布局是否换行|`boolean`|`false`|
|style|特殊样式|`ViewStyle`|-|
|flex|样式 flex 简写|`number`|-|
|flexGrow|样式 flexGrow 简写|`number`|-|
|flexShrink|样式 flexShrink 简写|`number`|-|
|padding|内边距参数。支持数字或者数组; 如果是数字，则设置所有方向边距; 两位数组 [vetical,horizontal]; 四位数组 [top,right,down,left]|`number&#124;number[]`|-|
|margin|外边距参数。支持数字或者数组; 如果是数字，则设置所有方向边距; 两位数组 [vetical,horizontal]; 四位数组 [top,right,down,left]|`number&#124;number[]`|-|
|top|样式 top 简写|`number`|-|
|right|样式 right 简写|`number`|-|
|bottom|样式 bottom 简写|`number`|-|
|left|样式 left 简写|`number`|-|
|touchable|是否可以点击|`boolean`|`false`|
|backgroundColor|背景颜色|`ThemeColor`|-|
|pressedColor|按下时的颜色，默认无颜色（使用 TouchableOpacity）; 设置了这个值，则使用 TouchableHighlight; 没有设置这个值，则使用 TouchableOpacity|`ThemeColor`|-|
|activeOpacity|按下时的透明度（仅在pressedColor未设置时有效）|`number`|-|
|width|宽度|`string&#124;number`|-|
|height|高度|`string&#124;number`|-|
|onPress|点击事件|`() => void`|-|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestLayout
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
