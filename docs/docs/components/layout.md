---
group:
  title: 布局组件
---

# Layout 栅格布局

## 介绍

Layout 组件提供了 24 列栅格，通过在 Col 上添加 span 属性设置列所占的宽度百分比。此外，添加 offset 属性可以设置列的偏移宽度，计算方式与 span 相同。

## 导入

```jsx
import { Row, Col } from '@imengyu/naeasy-ui-react-native/dist/components/layout'
```

## 基础用法

```jsx
const styles = StyleSheet.create({
  box: {
    height: 30,
    textAlign: 'center',
    backgroundColor: '#1989fa',
    color: '#fff',
  },
  box2: {
    height: 30,
    textAlign: 'center',
    backgroundColor: '#07c160',
    color: '#fff',
  },
});
```

```jsx
<Row>
  <Col span={8}><Text style={styles.box}>span: 8</Text></Col>
  <Col span={8}><Text style={styles.box2}>span: 8</Text></Col>
  <Col span={8}><Text style={styles.box}>span: 8</Text></Col>
</Row>
<Row>
  <Col span={4}><Text style={styles.box}>span: 4</Text></Col>
  <Col offset={10} span={10}><Text style={styles.box2}>offset: 4, span: 10</Text></Col>
</Row>
<Row>
  <Col offset={12} span={12}><Text style={styles.box}>offset: 12, span: 12</Text></Col>
</Row>
```

## 设置列元素间距

通过 gutter 属性可以设置列元素之间的间距，默认间距为 0。

```jsx
<Row gutter={20}>
  <Col span={8}><Text style={styles.box}>span: 8</Text></Col>
  <Col span={8}><Text style={styles.box2}>span: 8</Text></Col>
  <Col span={8}><Text style={styles.box}>span: 8</Text></Col>
</Row>
```

## 对齐方式

通过 justify 属性可以设置主轴上内容的对齐方式，等价于 flex 布局中的 justifyContent 属性。

```jsx
<Row justify="center">
  <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
  <Col span={6}><Text style={styles.box2}>span: 6</Text></Col>
  <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
</Row>
<Row justify="flex-end">
  <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
  <Col span={6}><Text style={styles.box2}>span: 6</Text></Col>
  <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
</Row>
<Row justify="space-between">
  <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
  <Col span={6}><Text style={styles.box2}>span: 6</Text></Col>
  <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
</Row>
<Row justify="space-around">
  <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
  <Col span={6}><Text style={styles.box2}>span: 6</Text></Col>
  <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
</Row>
```

## API 参考

### Row

|参数|说明|类型|默认值|
|---|---|---|---|
|gutter|列元素之间的间距|`number`|-|
|justify|主轴对齐方式|`'flex-start' &#124; 'flex-end' &#124; 'center' &#124; 'space-between' &#124; 'space-around' &#124; 'space-evenly'`|-|
|align|交叉轴对齐方式|`FlexAlignType`|-|
|wrap|是否自动换行|`boolean`|`true`|
|style|样式|`ViewStyle`|-|

### Col

|参数|说明|类型|默认值|
|---|---|---|---|
|offset|列元素偏移距离|`number`|-|
|span|列元素宽度|`number`|-|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestLayout2
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
