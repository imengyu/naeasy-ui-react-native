import { parseColor, strinifyColor } from '../utils';
import { Color, ColorInfo, ColorInfoItem } from './ColorStyles';
import { SpaceDefines } from './SizeStyles';
import { FonstSizes } from './TextStyles';

export * from './TextStyles';
export * from './SizeStyles';
export * from './CommonStyles';
export * from './ColorStyles';

/**
 * 样式相关工具类
 */
export const ThemeUtils = {
  /**
   * 通过已有不透明颜色创建半透明颜色
   * @param color 不透明颜色，十六进制格式
   * @param alpha 透明度（0-1）
   * @returns
   */
  makeAplhaColor<T extends string|ColorInfoItem>(color: T, alpha: number) : T {
    if (typeof color === 'string') {
      const colorObj = parseColor(color);
      colorObj.a = alpha;
      return strinifyColor(colorObj) as T;
    }

    const resultObj = {} as ColorInfoItem;
    for (const key in color) {
      const colorObj = parseColor((color as ColorInfoItem)[key]);
      colorObj.a = alpha;
      resultObj[key] = strinifyColor(colorObj) as string;
    }
    return resultObj as T;
  },
  /**
   * 配置颜色。请在组件初始化之前配置。
   * @param colors 颜色，可以设置多个
   */
  configColors(colors: ColorInfo) {
    for (const key in colors) {
      const oldObj = (Color as unknown as ColorInfo)[key];
      const newObj = colors[key];
      for (const key2 in newObj)
        oldObj[key2] = newObj[key2];
    }
  },
  /**
   * 配置默认的FonstSizes数据。请在组件初始化之前配置。
   * @param sizes 大小，可以设置多个
   */
  configFonstSizes(sizes: Record<string, number>) {
    for (const key in sizes) {
      (FonstSizes as Record<string, number>)[key] = sizes[key];
    }
  },
  /**
   * 配置默认的SpaceDefines数据。请在组件初始化之前配置。
   * @param sizes 大小，可以设置多个
   */
  configSpaceDefines(sizes: Record<string, number>) {
    for (const key in sizes) {
      (SpaceDefines as Record<string, number>)[key] = sizes[key];
    }
  },
};



