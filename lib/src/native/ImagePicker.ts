import { isIOS, isAndroid } from '../utils/PlatformTools';
import { NativeModules } from 'react-native';

export interface ImagePickerBaseOptions {
  type?: 'image'|'video'|'all';
  minFileSize?: number;
  maxFileSize?: number;
  minDurationSecond?: number;
  maxDurationSecond?: number;
  recordVideoMaxSecond?: number;
  recordVideoMinSecond?: number;
  /**
   * 是否允许用户裁剪图片，传入null禁止裁剪图片
   */
  crop?: {
    maxResultSize?: [number, number];
    aspectRatio?: [number, number];
    hideBottomControls?: boolean;
    freeStyleCropEnabled?: boolean;
    showCropFrame?: boolean;
    showCropGrid?: boolean;
    circleDimmedLayer?: boolean;
    isCropDragSmoothToCenter?: boolean;
    isForbidSkipMultipleCrop?: boolean;
    isForbidCropGifWebp?: boolean;
    maxScaleMultiplier?: number;
  },
}
export interface ImagePickerCameraOptions extends ImagePickerBaseOptions {
}
export interface ImagePickerAlbumOptions extends ImagePickerBaseOptions  {
  showCamera?: boolean;
  minSelectNum?: number;
  maxSelectNum?: number;
  minVideoSelectNum?: number;
  maxVideoSelectNum?: number;
  selectedData?: ImagePickerChooseMedia[];
  imageSpanCount?: number;
  filterMaxFileSize?: number;
  filterMinFileSize?: number;
  filterVideoMaxSecond?: number;
  filterVideoMinSecond?: number;
}
export interface ImagePickerChooseMedia {
  id: number,
  path: string,
  contentPath: string,
  originalPath: string,
  mimeType: string,
  videoThumbnailPath: string,
  duration: number,
  width: number,
  height: number,
  size: number,
}
export interface ImagePickerChooseResult {
  result: ImagePickerChooseMedia[];
}

/**
 * 选择图片原生组件
 */
export const ImagePicker = {
  /**
   * 打开相机拍照
   */
  camera(options: ImagePickerCameraOptions) {
    return new Promise<ImagePickerChooseResult>((resolve, reject) => {
      if (isIOS || isAndroid) {
        NativeModules.NaImagePicker.camera(options, (resArr: ImagePickerChooseMedia[]) => {
          resolve({
            result: resArr,
          });
        }, () => reject('cancel'));
      } else reject('not support');
    });
  },
  /**
   * 打开相册选择图片
   */
  pick(options: ImagePickerAlbumOptions) {
    return new Promise<ImagePickerChooseResult>((resolve, reject) => {
      if (isIOS || isAndroid) {
        NativeModules.NaImagePicker.pick(options, (resArr: ImagePickerChooseMedia[]) => {
          resolve({
            result: resArr,
          });
        }, () => reject('cancel'));
      } else reject('not support');
    });
  },
};
