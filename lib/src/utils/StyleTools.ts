
import { ViewStyle } from 'react-native';

export type StringSize = number | string;

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
