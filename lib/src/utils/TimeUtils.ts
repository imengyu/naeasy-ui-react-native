
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
};
