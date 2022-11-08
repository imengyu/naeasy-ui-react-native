import { isIOS, isAndroid } from './PlatformTools';
import { NativeEventEmitter, NativeModules } from 'react-native';

const MToolboxModule = NativeModules.MToolboxModule;
const eventEmitter = new NativeEventEmitter(MToolboxModule);

/**
 * App 信息
 */
export interface PackageInfo {
  /**
   * 包名
   */
  packageName: string;
  /**
   * 版本数字
   */
  versionCode: number;
  /**
   * 版本号名称
   */
  versionName: string;
}
/**
 * App 缓存信息
 */
export interface CacheInfo {
  /**
   * 内部文件存储目录路径
   */
  filesDir: string;
  /**
   * 缓存目录路径
   */
  cacheDir: string;
  /**
   * 缓存大小（字符串格式）
   */
  cacheSizeString: string;
  /**
   * 缓存大小cacheSizeString的单位
   */
  cacheUnit: string;
  /**
   * 缓存大小（字节）
   */
  cacheSize: number;
}

/**
 * 获取App的版本号
 */
function getPackageInfo() {
  return new Promise<PackageInfo>((resolve, reject) => {
    if (isAndroid)
      MToolboxModule.getPackageInfo({}, (d: PackageInfo) => resolve(d), (e: string) => reject(e));
    else if (isIOS)
      NativeModules.ToolsManagerIOS.getAppInfo({}, (d: { [index: string]: string | number }) => resolve({
        packageName: d.appBundleIdentifier as string,
        versionCode: parseInt(d.appBuildVersion as string, 10),
        versionName: d.appVersion as string,
      }), (e: string) => reject(e));
    else
      reject('Not support');
  });
}
/**
 * 安装本地Apk文件
 * @param path 本地路径
 * @platform Android
 */
function installApk(path: string) {
  return new Promise<void>((resolve, reject) => {
    if (isAndroid)
      MToolboxModule.installApk(path, () => resolve(), (e: string) => reject(e));
    else
      reject('Not support');
  });
}
/**
 * 获取App缓存信息
 */
function getCacheInfo() {
  return new Promise<CacheInfo>((resolve, reject) => {
    if (isAndroid)
      MToolboxModule.getCacheInfo({}, (d: CacheInfo) => resolve(d), (e: string) => reject(e));
    else if (isIOS)
      resolve({} as CacheInfo);
    else
      reject('Not support');
  });
}
/**
 * 清除App缓存
 * @param callback 清除完成回调
 */
function clearAppCache(callback: () => void) {
  if (isAndroid)
    MToolboxModule.clearAppCache(callback);
  else
    setTimeout(() => {
      callback();
    }, 1000);
}

/**
* 等待延时
*/
function waitTimeOut(timeOut: number) {
 return new Promise<void>((resolve) => {
   setTimeout(() => resolve(), timeOut);
 });
}

/**
 * 输出Log至android logcat
 * @platform Android
 * @param message 输出信息
 * @param tag TAG
 * @param level 输出信息等级
 */
function nativeLog(message: string, tag?: string, level?: 'verbose'|'debug'|'info'|'warn'|'error') {
  if (isAndroid)
    MToolboxModule.androidLog({
      tag,
      level,
      message,
    });
}

/**
 * 监听系统主题更改事件
 * TODO: IOS
 * @param callback 回调
 */
function addSystemThemeChangedListener(callback: (theme: 'light'|'dark') => void) {
  return eventEmitter.addListener('onLocationChanged', (data) => callback(data.theme));
}

/**
 * App 工具类
 */
export const ToolBox = {
  clearAppCache,
  getPackageInfo,
  getCacheInfo,
  installApk,
  waitTimeOut,
  nativeLog,
  addSystemThemeChangedListener,
};
