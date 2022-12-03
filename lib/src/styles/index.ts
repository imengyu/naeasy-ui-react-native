import { Color, ColorInfo } from './ColorStyles';
import { SpaceDefines } from './SizeStyles';
import { FonstSizes } from './TextStyles';
import { DeviceEventEmitter } from 'react-native';

export * from './TextStyles';
export * from './SizeStyles';
export * from './CommonStyles';
export * from './ColorStyles';
export * from './ThemeSelector';
export * from './DynamicThemeStyleSheet';

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
  makeAplhaColor(color: string, alpha: number) {
    return `${color}${(Math.floor(alpha * 255)).toString(16)}`;
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

    DeviceEventEmitter.emit('notifyGlobalColorChanged');
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



