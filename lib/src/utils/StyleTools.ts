import CheckTools from './CheckTools';
import { ThemeColor, ThemeSelector } from './../styles/ThemeSelector';
import { StyleSheet, ViewStyle } from 'react-native';
import { rpx } from './StyleConsts';
import { DynamicColor } from '../styles';

export type StringSize = number | string;

/**
 * 自动处理各个单位的大小，并将其转为 react native 的dp大小
 * @param size 大小的字符串或者数字
 * * 数字认为是dp
 * * 字符串支持 px rpx 后缀，其他字符串会转为 dp
 */
export function solveSize(sizeValue: StringSize|undefined) {
  if (typeof sizeValue === 'string') {
    if (sizeValue.endsWith('px')) {
      return rpx(parseFloat(sizeValue.substring(0, sizeValue.length - 3)));
    } else if (sizeValue.endsWith('rpx')) {
      return rpx(parseFloat(sizeValue.substring(0, sizeValue.length - 3)));
    } else if (sizeValue.endsWith('%')) {
      return sizeValue;
    } else if (sizeValue === 'auto') {
      return sizeValue;
    } else {
      return parseFloat(sizeValue);
    }
  }
  return sizeValue;
}

/**
 * 如果数值为空或者未定义，则不显示当前View
 * @param value 要测试的数值
 */
export function displayNoneIfEmpty(...args: unknown[]) {
  const hidden = args.every((value) => CheckTools.isNullOrEmpty(value));
  return {
    display: hidden ? 'none' : 'flex',
  } as ViewStyle;
}
/**
 * 如果为参数 true，则隐藏view
 * @param hidden 要测试的数值
 */
export function displayNoneIf(hidden: boolean) {
  return {
    display: hidden ? 'none' : 'flex',
  } as ViewStyle;
}
/**
 * 如果为参数 false，则隐藏view
 */
export function displayIf(show: boolean|undefined) {
  return displayNoneIf(show === undefined || !show);
}
/**
 * border 的简写
 * @param width 线宽度，如果为0，则使用 StyleSheet.hairlineWidth 作为宽度
 * @param type 线类型
 * @param color 线颜色
 */
export function border(width: StringSize, type: 'solid' | 'dotted' | 'dashed', color: ThemeColor|undefined, dynamic = false) {
  return {
    borderColor: dynamic && typeof color === 'object' ? DynamicColor(color) : ThemeSelector.color(color),
    borderStyle: type,
    borderWidth: width === 0 ? StyleSheet.hairlineWidth : solveSize(width),
  } as ViewStyle;
}
/**
 * border-top 的简写
 */
export function borderTop(width: StringSize, type: 'solid' | 'dotted' | 'dashed', color: ThemeColor|undefined, dynamic = false) {
  return {
    borderTopColor: dynamic && typeof color === 'object' ? DynamicColor(color) : ThemeSelector.color(color),
    borderStyle: type,
    borderTopWidth: width === 0 ? StyleSheet.hairlineWidth : solveSize(width),
  } as ViewStyle;
}
/**
 * border-bottom 的简写
 */
export function borderBottom(width: StringSize, type: 'solid' | 'dotted' | 'dashed', color: ThemeColor|undefined, dynamic = false) {
  return {
    borderBottomColor: dynamic && typeof color === 'object' ? DynamicColor(color) : ThemeSelector.color(color),
    borderStyle: type,
    borderBottomWidth: width === 0 ? StyleSheet.hairlineWidth : solveSize(width),
  } as ViewStyle;
}
/**
 * border-left 的简写
 */
export function borderLeft(width: StringSize, type: 'solid' | 'dotted' | 'dashed', color: ThemeColor|undefined, dynamic = false) {
  return {
    borderLeftColor: dynamic && typeof color === 'object' ? DynamicColor(color) : ThemeSelector.color(color),
    borderStyle: type,
    borderLeftWidth: width === 0 ? StyleSheet.hairlineWidth : solveSize(width),
  } as ViewStyle;
}
/**
 * border-right 的简写
 */
export function borderRight(width: StringSize, type: 'solid' | 'dotted' | 'dashed', color: ThemeColor|undefined, dynamic = false) {
  return {
    borderRightColor: dynamic && typeof color === 'object' ? DynamicColor(color) : ThemeSelector.color(color),
    borderStyle: type,
    borderRightWidth: width === 0 ? StyleSheet.hairlineWidth : solveSize(width),
  } as ViewStyle;
}

/**
 * 内边距的简写
 * @param t 上内边距
 * @param r 右内边距
 * @param b 下内边距
 * @param l 左内边距
 */
export function padding(t: StringSize, r: StringSize, b: StringSize, l: StringSize) {
  return {
    paddingTop: solveSize(t),
    paddingRight: solveSize(r),
    paddingBottom: solveSize(b),
    paddingLeft: solveSize(l),
  } as ViewStyle;
}
/**
 * 内边距的简写2
 * @param v 垂直内边距
 * @param h 水平内边距
 */
export function paddingVH(v: StringSize, h: StringSize) {
  return {
    paddingVertical: solveSize(v),
    paddingHorizontal: solveSize(h),
  } as ViewStyle;
}

/**
 * 外边距的简写
 * @param t 上外边距
 * @param r 右外边距
 * @param b 下外边距
 * @param l 左外边距
 */
export function margin(t: StringSize, r: StringSize, b: StringSize, l: StringSize) {
  return {
    marginTop: solveSize(t),
    marginRight: solveSize(r),
    marginBottom: solveSize(b),
    marginLeft: solveSize(l),
  } as ViewStyle;
}
/**
 * 外边距的简写2
 * @param v 外直内边距
 * @param h 外平内边距
 */
export function marginVH(v: StringSize, h: StringSize) {
  return {
    marginVertical: solveSize(v),
    marginHorizontal: solveSize(h),
  } as ViewStyle;
}
/**
 * 宽高的简写
 * @param w 宽
 * @param h 高
 */
export function size(w: StringSize, h: StringSize) {
  return {
    width: solveSize(w) as number,
    height: solveSize(h) as number,
  };
}

/**
 * 上右下左的样式简写
 * @param t 上
 * @param r 右
 * @param b 下
 * @param l 左
 */
export function trbl(t: StringSize, r: StringSize, b: StringSize, l: StringSize) {
  return {
    top: solveSize(t),
    left: solveSize(l),
  };
}
/**
 * 上左的样式简写
 * @param t 上
 * @param l 左
 */
export function topLeft(t: StringSize, l: StringSize) {
  return {
    top: solveSize(t),
    left: solveSize(l),
  };
}
/**
 * 下左的样式简写
 * @param b 下
 * @param l 左
 */
export function bottomLeft(b: StringSize, l: StringSize) {
  return {
    bottom: solveSize(b),
    left: solveSize(l),
  };
}
/**
 * 上右的样式简写
 * @param t 上
 * @param r 右
 */
export function topRight(t: StringSize, r: StringSize) {
  return {
    top: solveSize(t),
    right: solveSize(r),
  };
}
/**
 * 下右的样式简写
 * @param b 下
 * @param r 右
 */
export function bottomRight(b: StringSize, r: StringSize) {
  return {
    bottom: solveSize(b),
    right: solveSize(r),
  };
}

/**
 * 通过字符串参数选择指定类型的样式对象
 * @param type 字符串参数
 * @param styleObject 样式对象，子对象key是名称。
 */
export function selectStyleType<T, K extends string>(type: K|undefined, defaultTypeName: K, styleObject: { [P in K]: T|(() => T) }) {
  const result = type ? styleObject[type] : styleObject[defaultTypeName];
  return typeof result === 'function' ? result() : result;
}

/**
 * 通过字符串参数选择指定类型的对象
 * @param type 字符串参数
 * @param object 对象，子对象key是名称。
 */
export function selectObjectByType<T, K extends string>(type: K|undefined, defaultTypeName: K, object: { [index: string]: T }) {
  return type ? object[type] : object[defaultTypeName];
}


export function styleConfigPadding(style: ViewStyle, paddingValue: number|number[]|undefined) {
  if (typeof paddingValue === 'number') {
    style.padding = paddingValue;
    style.paddingVertical = paddingValue;
    style.paddingHorizontal = paddingValue;
  } else if (paddingValue instanceof Array) {
    style.padding = undefined;
    if (paddingValue.length === 2) {
      style.paddingVertical = paddingValue[0];
      style.paddingHorizontal = paddingValue[1];
    } else if (paddingValue.length === 4) {
      style.paddingTop = paddingValue[0];
      style.paddingRight = paddingValue[1];
      style.paddingBottom = paddingValue[2];
      style.paddingLeft = paddingValue[3];
    }
  }
}
export function styleConfigMargin(style: ViewStyle, marginValue: number|number[]|undefined) {
  if (typeof marginValue === 'number') {
    style.margin = marginValue;
    style.marginVertical = marginValue;
    style.marginHorizontal = marginValue;
  } else if (marginValue instanceof Array) {
    style.margin = undefined;
    if (marginValue.length === 2) {
      style.marginVertical = marginValue[0];
      style.marginHorizontal = marginValue[1];
    } else if (marginValue.length === 4) {
      style.marginTop = marginValue[0];
      style.marginRight = marginValue[1];
      style.marginBottom = marginValue[2];
      style.marginLeft = marginValue[3];
    }
  }
}
