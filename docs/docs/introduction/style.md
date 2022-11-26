# 布局工具

## rpx

小程序中经常使用 rpx 作为长度单位，来使不同分辨率下显示效果一致。

所以我也将这个特性引入了此库，你可以使用 `rpx` 函数来定义大小，此函数会将你输入的 rpx 大小转为 RN 的 dp。

> 注：规定屏幕宽度为 750rpx

例如：

在属性中使用：

```jsx
<Image source={{ uri: "https://imengyu.top/assets/images/test/1.jpg" }} width={rpx(100)} height={rpx(100)} />
```

在样式中使用

```jsx
const styles = StyleSheet.create({
  myView: {
    width: rpx(300),
    height: rpx(100),
  },
});
```

## px2dp

根据手机的分辨率从 px(像素) 转成为 dp

```js
const dp = px2dp(100);
```

## dp2px

 根据手机的分辨率从 dp 的单位 转成为 px(像素)

```js
const px = dp2px(100);
```

## 常量

|名称|说明|
|--|--|
|deviceWidth|屏幕宽度（dp），等同于 `Dimensions.get("window").width`|
|deviceHeight|屏幕高度（dp），等同于 `Dimensions.get("window").height`|
|deviceFontScale|字体缩放，等同于 `Dimensions.get("window").fontScale`|
|deviceScale|DPI，等同于 `Dimensions.get("window").scale`|
