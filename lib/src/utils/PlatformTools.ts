import { Platform } from 'react-native';

/**
 * 获取是否是安卓
 */
export const isAndroid = Platform.OS === 'android';
/**
 * 获取是否是iOS
 */
export const isIOS = Platform.OS === 'ios';
