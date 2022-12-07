---
group:
  title: 基础组件
---

# Cell 单元格

## 介绍

单元格为列表中的单个展示项。

## 导入

```jsx
import { CellGroup, Cell } from '@imengyu/naeasy-ui-react-native/dist/components/basic'
```

## 基础用法

Cell 可以单独使用，也可以与 CellGroup 搭配使用，CellGroup 可以为 Cell 提供上下外边框。

```jsx
<CellGroup title="基础用法">
  <Cell title="单元格标题" value="内容" />
  <Cell title="单元格标题" label="单元格说明" value="内容" />
</CellGroup>
```

单独使用

```jsx
<Cell title="单元格标题" value="内容" />
<Cell title="单元格标题" label="单元格说明" value="内容" />
```

显示箭头的单元格

```jsx
<Cell title="显示箭头" value="内容" showArrow />
```

可以点击的单元格

```jsx
<Cell title="可以点击的单元格" showArrow onPress={() => console.log('点击了！')} />
```

## 卡片风格

通过 CellGroup 的 inset 属性，可以将单元格转换为圆角卡片风格。

```jsx
<CellGroup title="卡片风格" inset>
  <Cell title="单元格标题" value="内容" />
  <Cell title="单元格标题" label="单元格说明" value="内容" />
</CellGroup>
```

## 单元格大小

通过 size 属性可以控制单元格的大小。

```jsx
<CellGroup title="单元格大小">
  <Cell title="单元格 large" value="内容" size="large" />
  <Cell title="单元格 medium" value="内容" size="medium" />
  <Cell title="单元格 small" value="内容" size="small" />
</CellGroup>
```

## 展示图标

通过 icon 属性在标题左侧或者右侧展示图标。

```jsx
<CellGroup title="展示图标">
  <Cell title="图标" value="内容" icon="setting" />
  <Cell title="右侧图标" icon="help" rightIcon="map" />
</CellGroup>
```

## 自定义渲染

如以上用法不能满足你的需求，可以使用自定义渲染函数来自定义内容。

```jsx
<CellGroup title="自定义渲染">
  <Cell title="右侧是自定义渲染的图片" renderRight={() => <Image source={require('../images/defaultAvatar.png')} key="right" style={{
      width: 30,
      height: 30,
    }} />
  } />
</CellGroup>
```

## API 参考

### Cell

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|title|左侧标题|`string`|-|-|
|value|右侧内容|`string &#124; number`|-|-|
|valueSelectable|设置右侧内容是否可以选择|`boolean`|-|`false`|
|label|标题下方的描述信息|`string`|-|-|
|icon|左侧图标名称或图片链接（http/https），等同于 Icon 组件的 icon|`string &#124; ImageSourcePropType`|-|-|
|iconProps|当使用图标时，左图标的附加属性|`IconProp`|-|-|
|iconPlaceholder|当左侧图标未设置时，是否在左侧追加一个占位区域，以和其他单元格对齐|`boolean`|-|`false`|
|iconWidth|左侧图标区域的宽度|`number &#124; "auto"`|-|`20`|
|iconSize|左侧图标的大小|`number`|-|`15`|
|rightIconSize|右侧图标的大小|`number`|-|`15`|
|rightIcon|右侧图标名称或图片链接（http/https），等同于 Icon 组件的 icon|`string &#124; ImageSourcePropType`|-|-|
|rightIconProps|当使用图标时，右图标的附加属性|`IconProp`|-|-|
|touchable|是否可以点击|`boolean`|-|`false`|
|showArrow|是否展示右侧箭头|`boolean`|-|`false`|
|center|是否使内容垂直居中|`boolean`|-|`false`|
|size|大小|`"small" &#124; "medium" &#124; "large"`|-|`medium`|
|backgroundColor|背景颜色|`ThemeColor`|-|-|
|renderRight|自定义右侧渲染(会覆盖原有右侧内容)|`() => Element &#124; Element[]`|-|-|
|renderRightPrepend|自定义右侧渲染(在原有内容之前，不会覆盖原有内容)|`() => Element`|-|-|
|renderLeft|自定义左侧渲染|`() => Element &#124; Element[]`|-|-|
|renderIcon|自定义图标渲染|`(isLeft: boolean, name: string &#124; ImageSourcePropType) => Element`|-|-|
|children|自定义渲染子级|`Element`|-|-|
|topBorder|是否显示顶部边框|`boolean`|-|`false`|
|bottomBorder|是否显示底部边框|`boolean`|-|`true`|
|pressedColor|按下的背景颜色|`ThemeColor`|-|-|
|style|自定义样式|`ViewStyle`|-|-|
|iconStyle|自定义左侧图标样式|`TextStyle &#124; ImageStyle`|-|-|
|rightIconStyle|自定义右侧图标样式|`TextStyle &#124; ImageStyle`|-|-|
|padding|强制控制按钮的边距。如果是数字，则设置所有方向边距;两位数组 [vetical,horizontal];四位数组 [top,right,down,left]|`number &#124; number[]`|-|-|
|onPress|点击事件|`() => void`|-|-|

## 主题变量

|名称|类型|默认值|
|--|--|--|
|CellBackground|`ColorInfoItem`|`Color.white`|
|CellSize|`string` or `number`|`'medium'`|
|CellPressedColor|`ColorInfoItem`|`PressedColor(Color.white)`|
|CellPadding|-|`[]`|
|CellBottomBorder|`boolean`|`true`|
|CellTopBorder|`boolean`|`false`|
|CellIconWidth|`number`|`20`|
|CellIconSize|`number`|`15`|
|CellBorderColor|`ColorInfoItem`|`Color.boder`|
|CellBorderWidth|`number`|`1`|
|CellFontSizeLarge|`number`|`15.5`|
|CellFontSizeMedium|`number`|`13`|
|CellFontSizeSmall|`number`|`11.5`|
|CellTitleColor|`ColorInfoItem`|`Color.text`|
|CellLabelColor|`ColorInfoItem`|`Color.textSecond`|
|CellValueColor|`ColorInfoItem`|`Color.textSecond`|
|CellHeightLarge|`number`|`rpx(125)`|
|CellHeightMedium|`number`|`rpx(100)`|
|CellHeightSmall|`number`|`rpx(80)`|
|CellPaddingLarge|`number`|`rpx(15)`|
|CellPaddingMedium|`number`|`rpx(10)`|
|CellPaddingSmall|`number`|`rpx(7)`|
|CellPaddingHorizontal|`number`|`rpx(20)`|
|CellValuePaddingHorizontal|`number`|`rpx(20)`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestCell
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//-
```
