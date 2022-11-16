import { NativeModules } from 'react-native';
import { isAndroid } from '../utils';

const NaToolboxModule = NativeModules.NaToolboxModule;

function isGrantedPermission(permission: string) {
  return new Promise<boolean>((resolve, reject) => {
    if (!isAndroid) {
      reject("not support");
      return;
    }
    NaToolboxModule.isGrantedPermission(permission, resolve, reject);
  });
}
function isGrantedPermissions(permissions: string[]) {
  return new Promise<boolean>((resolve, reject) => {
    if (!isAndroid) {
      reject("not support");
      return;
    }
    NaToolboxModule.isGrantedPermissions(permissions, resolve, reject);
  });
}
function isSpecialPermission(permission: string) {
  return new Promise<boolean>((resolve, reject) => {
    if (!isAndroid) {
      reject("not support");
      return;
    }
    NaToolboxModule.isSpecialPermission(permission, resolve, reject);
  });
}
function isPermanentDeniedPermissions(permissions: string[]) {
  return new Promise<boolean>((resolve, reject) => {
    if (!isAndroid) {
      reject("not support");
      return;
    }
    NaToolboxModule.isPermanentDeniedPermissions(permissions, resolve, reject);
  });
}
function startPermissionActivity(permissions: string) {
  return new Promise<boolean>((resolve, reject) => {
    if (!isAndroid) {
      reject("not support");
      return;
    }
    NaToolboxModule.startPermissionActivity(permissions, resolve, reject);
  });
}
function requestPermissions(permissions: string) {
  return new Promise<boolean>((resolve, reject) => {
    if (!isAndroid) {
      reject("not support");
      return;
    }
    NaToolboxModule.startPermissionActivity(permissions, resolve, reject);
  });
}

/**
 * 基于 XXPermissions 权限请求框架：https://github.com/getActivity/XXPermissions
 * @platform Android
 */
export const XXPermission = {
  isGrantedPermission,
  isGrantedPermissions,
  isSpecialPermission,
  isPermanentDeniedPermissions,
  startPermissionActivity,
  requestPermissions,
};
