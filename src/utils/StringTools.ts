/**
 * 数字补0，如果数字转为字符串后不足 `n` 位，则在它前面加 `0`
 * @param num 数字
 * @param n 指定字符串位数
 * @returns 字符串
 */
function pad(num: number|string, n: number) : string {
  let str = num.toString();
  let len = str.length;
  while (len < n) {
    str = "0" + num;
    len++;
  }
  return str;
}

/**
 * 对数字进行千位逗号分隔
 * @param x 要操作的数字
 * @returns 返回字符串
 */
function numberWithCommas(x: number|string) {
  x = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
  return x;
}

/**
 * 格式化日期
 * @param time 日期
 * @param formatStr YYYY-MM-dd HH:ii:ss
 * @returns
 */
function formatTime(time: Date, formatStr?: string) {
  let str = formatStr ? formatStr : "YYYY-MM-dd HH:ii:ss";
  str = str.replace(/yyyy|YYYY/, '' + time.getFullYear());
  str = str.replace(/MM/, pad(time.getMonth() + 1, 2));
  str = str.replace(/M/, '' + time.getMonth() + 1);
  str = str.replace(/dd|DD/, pad(time.getDate(), 2));
  str = str.replace(/d/, '' + time.getDate());
  str = str.replace(/HH/, pad(time.getHours(), 2));
  str = str.replace(
    /hh/,
    pad(time.getHours() > 12 ? time.getHours() - 12 : time.getHours(), 2)
  );
  str = str.replace(/mm/, pad(time.getMinutes(), 2));
  str = str.replace(/ii/, pad(time.getMinutes(), 2));
  str = str.replace(/ss/, pad(time.getSeconds(), 2));
  return str;
}

export default {
  formatTime,
  pad,
  numberWithCommas,
};
