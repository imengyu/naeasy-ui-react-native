---
group:
  title: 布局组件
---

# WingBlank 两翼留白

## 介绍

通过 WingBlank 组件两翼留白, 支持 lg/md/sm 或者是数字宽度

## 导入

```jsx
import { WingBlank } from '@imengyu/naeasy-ui-react-native/dist/components/layout'
```

## 基础用法

```jsx
<Text style={styles.title}>WingBlank 50</Text>
<WingBlank size={50}>
  <Text style={styles.text}>In turpis leo, placerat eget metus a, mattis elementum diam. Suspendisse auctor ipsum sed mauris aliquet semper.</Text>
</WingBlank>
<Text style={styles.title}>WingBlank lg</Text>
<WingBlank size="lg">
  <Text style={styles.text}>In turpis leo, placerat eget metus a, mattis elementum diam. Suspendisse auctor ipsum sed mauris aliquet semper.</Text>
</WingBlank>
<Text style={styles.title}>WingBlank md</Text>
<WingBlank size="md">
  <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit iaculis velit, vitae euismod urna facilisis et. Ut orci justo, euismod at orci in, gravida rhoncus ligula. Mauris at turpis porta, viverra mi quis, egestas felis. Sed metus risus, blandit id tincidunt sollicitudin, maximus a justo. </Text>
</WingBlank>
<Text style={styles.title}>WingBlank sm</Text>
<WingBlank size="sm">
  <Text style={styles.text}>Maecenas pharetra vel sem vel ultrices. Nulla consequat, diam ac tristique dictum, massa orci convallis libero, vitae volutpat nulla massa quis arcu. Proin tempor, nibh at blandit porttitor, metus massa faucibus mi, nec volutpat metus nunc quis velit. </Text>
</WingBlank>
```

## API 参考

### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|style|自定义样式|`StyleProp<ViewStyle>`|-|-|
|size|大小，支持 'small'、'medium'、'large' 三种预设大小，或者是数字大小|`number &#124; "small" &#124; "medium" &#124; "large"`|-|`'medium'`|

## 主题变量

|名称|类型|默认值|
|--|--|--|
|WingBlankSizeLarge|number|`20`|
|WingBlankSizeMedium|number|`10`|
|WingBlankSizeSmall|number|`5`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestWingBlank
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
