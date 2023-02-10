---
group:
  title: 布局组件
---

# Grid 宫格

## 介绍

宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。

## 导入

```jsx
import { Grid, GridItem } from '@imengyu/naeasy-ui-react-native/dist/components/layout'
```

## 基础用法

通过 icon 属性设置格子内的图标，title 属性设置文字内容。

```jsx
<Grid>
  <GridItem title="图标" icon="picture-filling" onPress={() => console.log('test')} />
  <GridItem title="本地图片" icon={require('../images/defaultAvatar.png')} iconSize={20} />
  <GridItem title="URL图片" icon="https://imengyu.top/assets/images/test/icon.png"  />
  <GridItem title="颜色" icon="picture-filling" iconColor={Color.primary} titleColor={Color.primary} />
  <GridItem title="文字" icon="picture-filling" iconColor={Color.danger} />
  <GridItem title="文字" icon="picture-filling" iconColor={Color.success} />
  <GridItem title="文字" icon="picture-filling" iconColor={Color.warning} />
  <GridItem title="文字" icon="picture-filling" iconColor="#f60" />
</Grid>
```

## 自定义列数

默认一行展示四个格子，可以通过 columnNum 自定义列数。

```jsx
<Grid columnNum={3}>
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
</Grid>
```

## 正方形格子

设置 square 属性后，格子的高度会和宽度保持一致。

```jsx
<Grid columnNum={4} square>
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
</Grid>
```

## 内容横排

将 direction 属性设置为 horizontal，可以让宫格的内容呈横向排列。

```jsx
<Grid columnNum={3} direction="horizontal">
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
</Grid>
```

## 无边框

```jsx
<Grid columnNum={3} border={false}>
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
  <GridItem title="文字" icon="picture-filling" />
</Grid>
```

## 自定义渲染内容

```jsx
<Grid columnNum={3} direction="horizontal">
  <GridItem>
    <Image source={require('../images/apple-1.jpeg')} style={{ width: rpx(200), height: rpx(200) }} resizeMode="contain" />
  </GridItem>
  <GridItem>
    <Image source={require('../images/apple-2.jpeg')} style={{ width: rpx(200), height: rpx(200) }} resizeMode="contain" />
  </GridItem>
  <GridItem>
    <Image source={require('../images/apple-3.jpeg')} style={{ width: rpx(200), height: rpx(200) }} resizeMode="contain" />
  </GridItem>
</Grid>
```

## API 参考

### Grid

|参数|说明|类型|默认值|
|---|---|---|---|
|columnNum|自定义列数。默认一行展示四个格子。|`number`|`4`|
|square|设置 square 属性后，格子的高度会和宽度保持一致。|`boolean`|`false`|
|direction|格子内容排列的方向|`'vetical'&#124;'horizontal'`|`vetical`|
|border|是否显示边框|`number`|`true`|
|borderWidth|边框的宽度|`number`|`StyleSheet.hairlineWidth`|
|borderColor|边框颜色|`ThemeColor`|`Color.border`|
|itemProps|统一设置条目的自定义属性|`GridItemProp`|-|

### GridItem

|参数|说明|类型|默认值|
|---|---|---|---|
|title|标题|`string`|-|
|titleColor|文字颜色|`ThemeColor`|-|
|titleStyle|文字自定义样式|`TextStyle`|-|
|backgroundColor|背景颜色|`ThemeColor`|-|
|highlightColor|点击高亮颜色|`ThemeColor`|`PressedColor(Color.white)`|
|icon|图标名称或图片链接（http/https），等同于 Icon 组件的 icon|`string&#124;ImageSourcePropType`|-|
|iconSize|图标大小|`number`|`22`|
|iconColor|图标颜色|`ThemeColor`|-|
|iconProps|图标自定义属性|`IconProp`|-|
|imageAsTtile|如果填写字段，则在图片位置显示文字。同时icon不生效。|`string`|-|
|imageAsTtileColor|图片位置显示文字的颜色。|`ThemeColor`|-|
|imageAsTtileStyle|图片位置显示文字的样式。|`TextStyle`|-|
|direction|格子内容排列的方向|`'vetical'&#124;'horizontal'`|`vetical`|
|style|自定义样式|`ViewStyle`|-|
|onPress|点击事件|`() => void`|-|

## 主题变量

|名称|类型|默认值|
|--|--|--|
|GridBorder|boolean|`true`|
|GridBorderColor|ColorInfoItem|`Color.border`|
|GridBorderWidth|-|`StyleSheet.hairlineWidth`|
|GridColumnNum|number|`4`|
|GridDirection|string|`'vetical'`|
|GridItemBackgroundColor|ColorInfoItem|`Color.white`|
|GridItemDirection|string|`'vetical'`|
|GridItemHighlightColor|-|`PressedColor(Color.white)`|
|GridItemIconColor|ColorInfoItem|`Color.text`|
|GridItemIconMarginHorizontal|number|`6`|
|GridItemIconMarginVertical|number|`0`|
|GridItemIconSize|number|`22`|
|GridItemImageAsTtile|boolean|`false`|
|GridItemImageAsTtileColor|ColorInfoItem|`Color.text`|
|GridItemImageAsTtileFontSize|number|`18`|
|GridItemPaddingHorizontal|number|`8`|
|GridItemPaddingVertical|number|`8`|
|GridItemTitleColor|ColorInfoItem|`Color.black`|
|GridItemTitleFontSize|number|`14`|
|GridSquare|boolean|`false`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestGrid
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
