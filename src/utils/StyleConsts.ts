import { NativeModules } from "react-native";
import { Dimensions, Platform, StatusBar } from "react-native";

const { StatusBarManager } = NativeModules;

/**
 * DPI
 */
export const deviceScale = Dimensions.get("window").scale;
/**
 * 字体缩放
 */
export const deviceFontScale = Dimensions.get("window").fontScale;

/**
 * 屏幕高度（dp）
 */
export const deviceHeight = Dimensions.get("window").height;

/**
 * 屏幕宽度（dp）
 */
export const deviceWidth = Dimensions.get("window").width;

/**
 * 关于App开发中单位的说明：
 * dp(dip): device independent pixels(设备独立像素). 不同设备有不同的显示效果,这个和设备硬件有关，一般我们为了支持WVGA、HVGA和QVGA 推荐使用这个，不依赖像素。
 * dp也就是dip，这个和sp基本类似。如果设置表示长度、高度等属性时可以使用dp 或sp。但如果设置字体，需要使用sp。dp是与密度无关，sp除了与密度无关外，还与scale无关。如果屏幕密度为160，这时dp和sp和px是一 样的。1dp=1sp=1px，但如果使用px作单位，如果屏幕大小不变（假设还是3.2寸），而屏幕密度变成了320。那么原来TextView的宽度 设成160px，在密度为320的3.2寸屏幕里看要比在密度为160的3.2寸屏幕上看短了一半。但如果设置成160dp或160sp的话。系统会自动 将width属性值设置成320px的。也就是160 * 320 / 160。其中320 / 160可称为密度比例因子。也就是说，如果使用dp和sp，系统会根据屏幕密度的变化自动进行转换。
 * px: pixels(像素). 不同设备显示效果相同，一般我们HVGA代表320x480像素，这个用的比较多。
 * pt: point，是一个标准的长度单位，1pt＝1/72英寸，用于印刷业，非常简单易用；
 * sp: scaled pixels(放大像素). 主要用于字体显示best for textsize。
 */

/**
 * 相对布局的宽度
 */
export const realtiveWidth = 750;

/**
 * 计算rpx（相对屏幕单位）返回实际dp。屏幕宽度规定为 750rpx
 * @param num rpx
 */
export function rpx(num : number) {
  return (num / realtiveWidth) * deviceWidth;
}
/**
 * 计算rpx（相对屏幕单位）返回实际sp (主要用于字号)。屏幕宽度规定为 750rpx
 * @param num rpx
 */
 export function rspx(num : number) {
  return px2sp(rpx(num));
}

/**
 * 计算像素 返回实际dp。
 * @param num px
 */
export function px(num : number) {
  return px2dp(num);
}

/**
 * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
 */
export function dp2px(dpValue: number) {
  return (dpValue * deviceScale + 0.5);
}

/**
 * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
 */
 export function px2dp(pxValue: number) {
  return (pxValue / deviceScale + 0.5);
}

/**
 * 将px值转换为sp值，保证文字大小不变
 */
export function px2sp(pxValue: number) {
  return (pxValue / deviceFontScale + 0.5);
}
/**
* 将sp值转换为px值，保证文字大小不变
*/
export function sp2px(spValue: number) {
  return (spValue * deviceFontScale + 0.5);
}

let iOSStatusBarHeight = -1;

/**
 * 获取状态栏高度
 */
export function getStatusBarHeight() {
  if (Platform.OS === 'ios') {
    if (iOSStatusBarHeight === -1) {
      // 获取iOS状态栏高度
      StatusBarManager.getHeight((statusBarHeight: { height: number}) => {
        iOSStatusBarHeight = statusBarHeight.height;
      });
    }
    return iOSStatusBarHeight > 0 ? iOSStatusBarHeight : 40;
  } else
    return StatusBar.currentHeight || 0;
}

if (Platform.OS === 'ios')
  getStatusBarHeight();
