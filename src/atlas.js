import Vue from 'vue';
import { appInfo } from "@/util";

const callNativeWithPromise = msg => {
  return Vue.Native.callNativeWithPromise('AtlasModule', 'executeWithPromise', msg);
}

const callNative = msg => {
  return Vue.Native.callNative('AtlasModule', 'execute', msg);
}

/**
 * 定位焦点
 * $refs：this.$refs.view 需要定位焦点标签的$refs对象
 * */
const requestFocus = $refs => {
  Vue.Native.callUIFunction($refs, 'requestFocus');
}

/**
 * 清空上一次记忆焦点
 * $refs：this.$refs.view ul的$refs对象
 * */
const clearFocusMemory = $refs => {
  Vue.Native.callUIFunction($refs, 'clearFocusMemory');
}

/**
 * 预设焦点：适用于ul列表
 * $refs：this.$refs.view ul的$refs对象
 * index：第几个子标签
 * */
const setSelectChildPosition = ($refs, index) => {
  Vue.Native.callUIFunction($refs, 'setSelectChildPosition', [index]);
}


/**
 * 设置后代元素的focusability：适用于div\ul
 * $refs：this.$refs.view ul的$refs对象
 * focusability
 *  0:FOCUS_BEFORE_DESCENDANTS
 *  1:FOCUS_AFTER_DESCENDANTS
 *  2:FOCUS_BLOCK_DESCENDANTS
 * */
 const setDescendantFocusability = ($refs, focusability) => {
  Vue.Native.callUIFunction($refs, 'setDescendantFocusability', [focusability]);
}

/**
 * 通知 ListView 第几个子 item获得焦点。
 * $refs：this.$refs.view ul的$refs对象
 * index：第几个子标签
 * */
 const requestChildFocus = ($refs, position) => {
  Vue.Native.callUIFunction($refs, 'requestChildFocus', [position]);
}

/**
 *  ListView 在没有焦点时，第几个item会优先获得焦点。
 * $refs：this.$refs.view ul的$refs对象
 * index：第几个子标签
 * */
 const setTargetFocusChildPosition = ($refs, position) => {
  Vue.Native.callUIFunction($refs, 'setTargetFocusChildPosition', [position]);
}

/**
 *  ListView 设置初始化相关信息
 * $refs：this.$refs.view ul的$refs对象
 * @param {Object} params 
 * {position:number ,requestFocus:boolen ,target:String(name),oneShot:boolen ,blockOthers:boolen ,delay:int}
 *  
 * */
 const setInitPosition = ($refs, params) => {
  Vue.Native.callUIFunction($refs, 'setInitPosition', [params]);
}


/**
 * 获取设备信息
 * getDeviceInfo().then(res => {})
 * */
const getDeviceInfo = () => {
  return Vue.Native.callNativeWithPromise('AtlasModule', 'executeWithPromise', { action: '_A_GET_DEVICE_INFO_' });
}

/**
 * 获取设备信息
 * fetchDataInfo().then(res => {})
 * */
 const fetchDataInfo = (type, key) => {
  return Vue.Native.callNativeWithPromise('AtlasModule', 'executeWithPromiseByFetch', { type, key });
}

/**
 * 系统TOAST提示（各品牌电视的提示样式不同，介意的可自己做）
 * msg：提示文字
 * long: 显示时间长短，true为7秒，false为4秒，默认false
 * */
const TOAST = (msg, long) => {
  long = long || false
  Vue.Native.callNative('AtlasModule', 'Toast', { text: msg, long });
}

/**
 * 应用内打开新应用页面
 * url：页面路由
 * query：页面参数
 * clearTask：是否关闭其他页面，可用于返回首页
 * background: 新页面背景色例如 #000000
 * */
const newPage = (url, query, background, clearTask) => {
  clearTask = clearTask || false;
  Vue.Native.callNative('AtlasModule', 'execute', {action: '_A_NEW_PAGE_', packageName: appInfo.packageName, entryPage: JSON.stringify({ url, query }), background, clearTask: clearTask});
}

/**
 * 应用内打开新页面
 * url：页面路由
 * query：页面参数
 * max：最多数量
 * background: 新页面背景色例如 #000000
 * */
const newPageMax = (url, query, num, background) => {
  Vue.Native.callNative('AtlasModule', 'execute', {action: '_A_NEW_PAGE_', packageName: appInfo.packageName, entryPage: JSON.stringify({ url, query }), background, flag: route, max: num});
}

/**
 * 打开新的快应用
 * zipUrl: 资源zip包下载地址
 * params：启动参数 {url:'', query:''}
 * background: 新页面背景色例如 #000000
 * packageName：应用包名
 * */
const newApp = (zipUrl, params, background, packageName) => {
  Vue.Native.callNative('AtlasModule', 'execute', { action: '_A_NEW_PAGE_', url:zipUrl, entryPage: params, background, packageName});
}

/**
 * 同一个应用内跳转不同的路由
 * url：页面路由
 * query：页面参数
 * */
 const forward = (url, query) => {
  console.log("zsssf go forward 2");
  Vue.Native.callNative('AtlasModule', 'execute', {action: '_A_FORWARD_', packageName: appInfo.packageName, entryPage: JSON.stringify({ url, query })});
}

/**
 * 同一个应用内返回处理
 * */
 const backPress = () => {
  Vue.Native.callNative('AtlasModule', 'execute', {action: '_A_BACK_'});
}

/**
 * 打开通用跳转
 * data：{}
 * */
 const goCommonJump = (data) => {
  const _url = JSON.stringify(data);
  const _url1 = appInfo.jump + encodeURIComponent(_url) + "||||";
  openGefo(_url1);
}

/**
 * 打开gefo
 * url 地址
 * */
 const openGefo = (url) => {
  Vue.Native.callNative('AtlasModule', 'execute', { action: '_A_OPEN_GEFO_', url});
}

/**
 * 关闭当前页面
 * */
const closePage = () => {
  Vue.Native.callNative('AtlasModule', 'execute', {action: '_A_CLOSE_PAGE_'});
}

/**
 * 埋点
 * name: 事件名称
 * data: 事件参数
 * */
const eventTrack = (name, data) => {
  Vue.Native.callNative('AtlasModule', 'eventTrack', { name, data });
}

/**
 * localStorage.getItem 扩展
 * key:  key键
 * ystStamp: 数据结果校验stamp
 * */
const getItem = (key, ystStamp) => {
  return Hippy.bridge.callNativeWithPromise('StorageModule', 'multiGet', [key])
    .then((r) => {
      if (!r || !r[0] || !r[0][1]) {
        return null;
      }

      let v = {};
      v.ystStamp = ystStamp;
      v.data = JSON.parse(r[0][1]);
      return JSON.stringify(v);
    }).catch(err => convertErrors(err));
}

/**
 * localStorage.multiGet 扩展
 * keys:  key键数组
 * ystStamp: 数据结果校验stamp
 * */
const multiGet = (keys, ystStamp) => {
  return Hippy.bridge.callNativeWithPromise('StorageModule', 'multiGet', keys)
    .then((r) => {
      let v = {};
      if(ystStamp)v.ystStamp = ystStamp;
      v.data = r;
      return v;
    }).catch(err => convertErrors(err));
}

/**
 * getFullPath 获取完整assets路径
 * path:  相对路径，比如 "assets/raw/f_1.png" 等
 * getFullPath(path).then(res => {})
 * */
 const getFullPath = (path) => {
  return Vue.Native.callNativeWithPromise('AtlasModule', 'executeWithPromise', {action: '_A_GET_FULL_PATH_', path});
}

/**
 * readLocalFile 读取本地文件
 * path:  相对路径，比如 "assets/raw/f_1.png" 等
 * readLocalFile(path).then(res => {})
 * */
 const readLocalFile = (path) => {
  return Vue.Native.callNativeWithPromise('AtlasModule', 'executeWithPromise', {action: '_A_READ_LOCAL_FILE_', path});
}

/**
 * 127上报
 *
 * */
 const reportE = (action, msg) => {
  Vue.Native.callNativeWithPromise('AtlasModule', 'report', { level: 'e', action, msg });
}
const reportI = (action, msg) => {
  Vue.Native.callNativeWithPromise('AtlasModule', 'report', { level: 'i', action, msg });
}
const reportW = (action, msg) => {
  Vue.Native.callNativeWithPromise('AtlasModule', 'report', { level: 'w', action, msg });
}
const reportC = (msg) => {
  Vue.Native.callNativeWithPromise('AtlasModule', 'report', { level: 'c', action, msg });
}
/**
 * 神策上报
 *
 * */
 const reportSensors = (msg) => {
  Vue.Native.callNativeWithPromise('AtlasModule', 'reportSensors', msg);
}

export default {
  callNativeWithPromise,
  callNative,
  requestFocus,
  clearFocusMemory,
  requestChildFocus,
  setTargetFocusChildPosition,
  setSelectChildPosition,
  setDescendantFocusability,
  setInitPosition,
  getDeviceInfo,
  fetchDataInfo,
  TOAST,
  newPage,
  newPageMax,
  newApp,
  goCommonJump,
  openGefo,
  closePage,
  forward,
  backPress,
  eventTrack,
  getItem,
  multiGet,
  getFullPath,
  readLocalFile,
  reportE,
  reportI,
  reportW,
  reportC,
  reportSensors
};
