/**
 * 字符串判空
 * @param str 字符串
 */
function isNullOrEmpty(str: string|null|undefined|unknown) : boolean {
  return !str || typeof str === 'undefined' || str === '';
}
/**
 * 检查是否定义
 * @param obj
 */
function isDefined(obj: unknown) : boolean {
  return typeof obj !== 'undefined';
}
/**
 * 检查一个变量是否定义，如果定义，返回它，否则返回一个默认值
 * @param obj
 */
function returnDefinedValueOrdefault<T>(obj: T|undefined, defaultValue: T) : T {
  return typeof obj !== 'undefined' ? obj : defaultValue;
}
/**
 * 判断是否定义并且不为 `null`
 * @param v 要判断的数值
 */
function isDefinedAndNotNull(v: unknown) : boolean {
  return v != null && typeof v !== 'undefined';
}

/**
 * 检测字符串是否是一串数字
 */
function isNumber(val: string|undefined): boolean {
  if (typeof val === 'undefined')
    return false;
  const regPos = /^\d+(\.\d+)?$/; //非负浮点数
  const regNeg =
    /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 如果数字为null或小于等于0，则返回undefined，否则返回数字
 * @param val
 */
function emptyOrNullToDefault(val: string|null|false|undefined, defaultString: string) : string {
  return isNullOrEmpty(val) ? defaultString : val as string;
}

/**
 * 用于参数检查的一个工具类
 */
const CheckTools = {
  isNullOrEmpty,
  isDefined,
  isDefinedAndNotNull,
  isNumber,
  emptyOrNullToDefault,
  returnDefinedValueOrdefault,
};

export default CheckTools;
