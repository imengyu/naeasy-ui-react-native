
import { NativeModules } from "react-native";
import { isAndroid, isIOS, isWeb } from "./PlatformTools";

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export interface MeasureOptions {
  /**
   * 字体
   */
  fontFamily?: string,
  /**
   * 字号
   */
  fontSize?: number,
  /**
   * 文字粗细
   */
  fontWeight?: FontWeight,
  /**
   * 需要计算的文字
   */
  text: string,
  /**
   * 最高高度
   */
  height?: number;
}

let canvasGlobal : any = null;

export default {
  /**
   * 计算文字宽度
   * @param options 参数
   * @returns 返回计算宽度
   */
  async measureText(options: MeasureOptions) {
    return new Promise<number>((resolve, reject) => {
      if (isAndroid)
        NativeModules.NaMeasureTextModule.measureText(options, (width: number) => resolve(width));
      else if (isIOS)
        (NativeModules.ToolsManagerIOS.measureText(options) as Promise<number>).then(resolve).catch(reject);
      else if (isWeb) {
        // eslint-disable-next-line no-eval
        const canvas = canvasGlobal || eval('canvasGlobal = document.createElement(\'canvas\')');
        const context = canvas.getContext('2d');
        context.font = `${options.fontFamily} ${options.fontSize}px`;
        const metrics = context.measureText(options.text);
        return metrics.width;
      } else
        reject('Not support');
    });
  },
};
