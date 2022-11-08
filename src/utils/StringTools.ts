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

export interface PySegSortItem {
  letter: string;
  data: string[];
}

/**
 * 汉字按拼音首字母分组拼序
 * @param arr
 * @returns
 */
function pySegSort(arr: string[]) : PySegSortItem[] {
  if (!String.prototype.localeCompare)
    throw new Error("Not found localeCompare! ");

  const letters = "*abcdefghjklmnopqrstwxyz".split('');
  const zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');

  const segs = [] as PySegSortItem[];
  let curr : PySegSortItem|null = null;
  letters.forEach(function(item,i){
    curr = { letter: item, data:[] };
    arr.forEach(function(item2){
      if ((!zh[i - 1] || zh[i - 1].localeCompare(item2) <= 0) && item2.localeCompare(zh[i]) === -1) {
        curr?.data.push(item2);
      }
    });
    if (curr.data.length) {
      segs.push(curr);
      curr.data.sort(function(a,b){
        return a.localeCompare(b);
      });
    }
  });
  return segs;
}

export default {
  pad,
  numberWithCommas,
  pySegSort,
};
