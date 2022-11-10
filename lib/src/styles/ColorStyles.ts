export interface ColorInfo {
  [index: string]: ColorInfoItem;
}
export type ColorInfoItem = Record<string, string>;
export interface ConstantColorInfo {
  [index: string]: string
}

/**
 * 静态颜色定义
 */
export const ConstantColor = {
  default: 'transparent',
} as ConstantColorInfo;

/**
 * 从动态颜色定义集中选取出按下时的颜色
 * @param color 动态颜色定义集
 * @returns
 */
export function PressedColor(color: ColorInfoItem): ColorInfoItem {
  const newObj = {} as ColorInfoItem;

  for (const key in color) {
    if (Object.prototype.hasOwnProperty.call(color, key)) {
      if (key.startsWith('pressed_'))
        newObj[key] = color[key];
    }
  }

  return {
    light: color.pressed_light || color.pressed || color.light,
    dark: color.pressed_dark || color.pressed || color.dark,
  };
}

/**
 * 动态颜色定义集
 */
export const Color = {
  white: {
    light: '#ffffff',
    dark: '#000000',
    pressed_light: '#efefef65',
    pressed_dark: '#66666665',
  },
  black: {
    light: '#000000',
    dark: '#ffffff',
    pressed_dark: '#efefef',
    pressed_light: '#666666',
  },
  grey: {
    light: '#dddddd',
    dark: '#222222',
  },
  light: {
    light: '#efefef',
    dark: '#222222',
  },
  switch: {
    light: '#dddddd',
    dark: '#eeeeee',
  },
  divider: {
    light: '#efefef',
    dark: '#212121',
  },
  border: {
    light: '#dfdfdf',
    dark: '#444444',
  },
  mask: {
    light: 'rgba(0,0,0,0.4)',
    dark: 'rgba(255,255,255,0.2)',
  },
  background: {
    light: '#f7f8fa',
    dark: '#121213',
  },
  link: {
    light: '#0b72cc',
    dark: '#0a5699',
    pressed_light: '#043a69',
    pressed_dark: '#043a69',
  },
  text: {
    light: '#333333',
    dark: '#dddddd',
  },
  textSecond: {
    light: '#888888',
    dark: '#aaaaaa',
  },
  default: {
    light: 'transparent',
    dark: 'transparent',
    pressed_light: 'rgba(0,0,0,0.2)',
    pressed_dark: 'rgba(255,255,255,0.2)',
  },
  primary: {
    light: '#33a3dc',
    dark: '#2779c0',
    pressed_light: '#043a69',
    pressed_dark: '#043a69',
  },
  success: {
    light: '#07c160',
    dark: '#038d45',
    pressed_light: '#06ae57',
    pressed_dark: '#06ae57',
  },
  warning: {
    light: '#f3c220',
    dark: '#E9A302',
    pressed_light: '#e68860',
    pressed_dark: '#e68860',
  },
  notice: {
    light: '#ffffff',
    dark: '#888888',
    pressed_light: '#efefef',
    pressed_dark: '#666666',
  },
  danger: {
    light: '#ee0a24',
    dark: '#be1c06',
    pressed_light: '#d70920',
    pressed_dark: '#d70920',
  },
} as ColorInfo;