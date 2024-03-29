---
group:
  title: 布局组件
---

# WhiteSpace 空白高度

## 介绍

用于在布局中添加空白高度。

## 导入

```jsx
import { WhiteSpace } from '@imengyu/naeasy-ui-react-native/dist/components/layout'
```

## 基础用法

通过 WhiteSpace 添加空白高度, 支持 lg/md/sm 或者是数字宽度 。

```js
const styles = StyleSheet.create({
  box: {
    width: '100%',
    textAlign: 'center',
  },
  box2: {
    width: '100%',
    borderWidth: 1,
    borderColor: Color.warning.light,
  },
  box5: {
    height: '100%',
    borderWidth: 1,
    borderColor: Color.warning.light,
  },
  box3: {
    width: 39,
    height: 39,
    backgroundColor: Color.success.light,
    borderRadius: 10,
    margin: 5,
  },
});

```

```jsx
<ColumnView wrap>
  <View style={styles.box}>
    <Text>我是内容</Text>
  </View>
  <WhiteSpace size={100} style={styles.box2} />
  <View style={styles.box}>
    <Text>我是内容</Text>
  </View>
  <WhiteSpace size="lg" style={styles.box2} />
  <View style={styles.box}>
    <Text>我是内容</Text>
  </View>
  <WhiteSpace size="md" style={styles.box2} />
  <View style={styles.box}>
    <Text>我是内容</Text>
  </View>
  <WhiteSpace size="sm" style={styles.box2} />
  <View style={styles.box}>
    <Text>我是内容</Text>
  </View>
</ColumnView>
```

## 水平布局中占位

也可在水平布局中占位 。

```jsx
<RowView wrap>
  <View style={styles.box3} />
  <WhiteSpace size={10} style={styles.box5} />
  <View style={styles.box4} />
  <WhiteSpace size="lg" style={styles.box5} />
  <View style={styles.box3} />
  <WhiteSpace size="md" style={styles.box5} />
  <View style={styles.box4} />
  <WhiteSpace size="sm" style={styles.box5} />
  <View style={styles.box3} />
</RowView>
```

## API 参考

### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|
|style|自定义样式|`StyleProp<ViewStyle>`|-|-|
|backgroundColor|背景颜色|`ThemeColor`|-|-|
|fullHeight|是否高度占满|`boolean`|-|`false`|
|fullWidth|是否宽度占满|`boolean`|-|`false`|
|size|上下留白的间距，可选`mini`,`small`,`medium`,`large`,`larger`，或者是数字大小。|`number &#124; "mini" &#124; "small" &#124; "medium" &#124; "large" &#124; "larger"`|-|`'medium'`|

## 主题变量

|名称|类型|默认值|
|--|--|--|
|WhiteSpaceLarge|number|`35`|
|WhiteSpaceLarger|number|`50`|
|WhiteSpaceMedium|number|`20`|
|WhiteSpaceMini|number|`5`|
|WhiteSpaceSmall|number|`10`|

```jsx | preview
/**
 * demoUrl: https://imengyu.top/pages/naeasy-ui-rn-web/?page=TestWhiteSpace
 * iframe: true
 * hideActions: ["CSB","EXTERNAL"]
 */
//此区域用来显示侧边的Demo
```
