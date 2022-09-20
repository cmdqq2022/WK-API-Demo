
let cachedApp;

// 监听按键key值
const keyDown = {
  up: 19,
  down: 20,
  left: 21,
  right: 22,
  ok: 23,
  menu: 82,
  key_0: 7,
  key_1: 8,
  key_2: 9,
  key_3: 10,
  key_4: 11,
  key_5: 12,
  key_6: 13,
  key_7: 14,
  key_8: 15,
  key_9: 16,
}

// 应用包名，必须要写
const appInfo = {
  packageName: 'com.ysten.wk.demo',
  jump: 'http://kuaitv.aitv.ysten.com:8082//preview/7111027948791001086/V1.0.1/jump.html?p=',
}
/** 
var deviceInfo = {
  ability: '',   	// 能力串
  username: '',		// 用户名
  deviceId: '',		// 串号
  mac: '',			  // MAC地址
  userToken: '',	// 用户token
  stbid: '',		  // 机顶盒id
  ystenId: '',		// 易视腾id
}
*/

function setApp(app) {
  cachedApp = app;
}

function getApp() {
  return cachedApp;
}

function warn(...context) {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return console.warn(...context);
}

/**
 * Better function checking
 */
function isFunction(func) {
  return Object.prototype.toString.call(func) === '[object Function]';
}


function dateFormt(date, f) {
  let fmt = f;
  const o = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt))
      fmt = fmt.replace(
          RegExp.$1,
          `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
      );
  // eslint-disable-next-line no-restricted-syntax
  for (const k in o)
      if (new RegExp(`(${k})`).test(fmt))
          fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length === 1
                  ? o[k]
                  : `00${o[k]}`.substr(`${o[k]}`.length)
          );
  return fmt;
}
function formatDuring(millisecond) {
  let hours = parseInt((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  hours = hours<10?'0'+hours:hours
  let minutes = parseInt((millisecond % (1000 * 60 * 60)) / (1000 * 60));
  minutes = minutes<10?'0'+minutes:minutes
  let seconds = parseInt((millisecond % (1000 * 60)) / 1000);
  seconds = seconds<10?'0'+seconds:seconds
  return hours +':'+ minutes +':'+ seconds;
  }

// 把字符串处理成时间对象
function handleDate(d) {
  let date = d;
  if (!date && date !== 0) {
      return new Date();
  }
  if (date.toString().indexOf("-") > 0) {
      date = date.replace(/-/g, "/");
      return new Date(date);
  }
  if (date.toString().length === 10) {
      date *= 1000;
  }
  date = parseInt(date, 10);
  return new Date(date);
}


function handleChanl(str) {
    // 处理频道号的展示
  if (!str) {
      return "";
  }
  if (str.length >= 3) {
      const b = str.substring(str.length - 3);
      return b;
  }
  return handleChanl(`0${str}`);
}

function arrFindIndex(list, key, target) {
  for (let i = 0; i < list.length; i++) {
      if (`${list[i][key]}` === `${target}`) {
          return i;
      }
  }
  return -1;
}

export {
  setApp,
  getApp,
  warn,
  isFunction,
  appInfo,
  keyDown,
  dateFormt,
  handleDate,
  handleChanl,
  formatDuring,
  arrFindIndex
};
