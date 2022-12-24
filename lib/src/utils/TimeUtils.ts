
/**
 * 将毫秒分隔为时分秒
 * @param ms 毫秒
 */
function splitMillSeconds(ms: number) {
  let nowSub = ms;
  const days = Math.floor(nowSub / 86400000); nowSub -= days * 86400000;
  const hours = Math.floor(nowSub / 3600000); nowSub -= hours * 3600000;
  const minutes = Math.floor(nowSub / 60000); nowSub -= minutes * 60000;
  const seconds = Math.floor(nowSub / 1000); nowSub -= seconds * 1000;

  return {
    total: ms,
    days,
    hours,
    minutes,
    seconds,
    milliseconds: nowSub,
  };
}

/**
 * 获取某年的某月共多少天
 * @param year 年
 * @param month 月
 * @returns 共多少天
 */
function getMonthDays(year: number, month: number) {
  switch (month + 1) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
  }
  return 0;
}

/**
* 等待延时
*/
function waitTimeOut(timeOut: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeOut);
  });
}

export default {
  waitTimeOut,
  splitMillSeconds,
  getMonthDays,
};
