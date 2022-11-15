import { isIOS, isAndroid } from '../utils/PlatformTools';
import { NativeEventEmitter, NativeModules } from 'react-native';

const MToolboxModule = isIOS ? NativeModules.ToolsManagerIOS : NativeModules.MToolboxModule;
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
      MToolboxModule.getAppInfo({}, (d: { [index: string]: string | number }) => resolve({
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
    if (isAndroid || isIOS)
      MToolboxModule.getCacheInfo({}, (d: CacheInfo) => resolve(d), (e: string) => reject(e));
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
  else if (isIOS)
    MToolboxModule.clearAppCache({}, () => callback(), (e: string) => console.error('clearAppCache failed:' + e));
  else
    setTimeout(() => {
      console.error('clearAppCache not support');
      callback();
    }, 1000);
}


/**
 * 输出Log至android logcat 或者是 XCode console
 * @platform Android iOS
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
  else if (isIOS) {
    MToolboxModule.nsLog({
      tag,
      level,
      message,
    });
  } else {
    console.log(`[${tag}/${level}]`, message);
  }
}

type Theme = 'light'|'dark';

/**
 * 监听系统主题更改事件
 * @param callback 回调
 */
function addSystemThemeChangedListener(callback: (theme: Theme) => void) {
  if (isIOS)
    MToolboxModule.addSystemThemeChangedListener();
  return eventEmitter.addListener('onThemeChanged', (data) => callback(data.theme));
}
/**
 * 获取系统主题（是否是深色模式）
 * @param callback 回调
 */
function getSystemTheme() : Promise<Theme> {
  return new Promise<Theme>((resolve, reject) => {
    if (isIOS)
      MToolboxModule.getIsDarkMode({}, (isDarkMode: boolean) => resolve(isDarkMode ? 'dark' : 'light'));
    else if (isAndroid)
      MToolboxModule.getIsDarkMode((isDarkMode: boolean) => resolve(isDarkMode ? 'dark' : 'light'));
    else
     reject('Not support');
  });
}


/**
 * App 工具类
 */
export const ToolBox = {
  clearAppCache,
  getPackageInfo,
  getCacheInfo,
  installApk,
  nativeLog,
  getSystemTheme,
  addSystemThemeChangedListener,
};
