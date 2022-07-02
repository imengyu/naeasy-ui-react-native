
export interface ColorInfo {
  [index: string]: string;
}

/**
 * 颜色定义
 */
export const Color = {
  white: '#ffffff',
  black: '#000000',
  text: '#333333',
  grey: '#999999',
  dark: '#333333',
  darkGrey: '#666666',
  transparent: '#00000000',
  mask: 'rgba(0,0,0,0.4)',
  maskWhite: 'rgba(255,255,255,0.7)',
  lightGrey: '#dddddd',
  header: '#f5f5f5',
  lightBackground: '#f5f5f5',
  light: '#eeeeee',
  border: '#ebedf0',
  darkBorder: '#cfcfcf',
  lightBorder: '#f3f3f3',
  yellow: '#ffd21e',
  default: 'transparent',
  primary: '#1989fa',
  success: '#07c160',
  warning: '#ff976a',
  notice: '#fffbe8',
  orangeLight: '#fffbe8',
  orangeDark: '#ed6a0c',
  danger: '#ee0a24',
  /**
   * 配置颜色
   * @param colors 颜色，可以设置多个
   */
  configColors(colors: ColorInfo) {
    for (const key in colors) {
      (Color as unknown as ColorInfo)[key] = colors[key];
    }
  },
};
/**
 * 颜色定义
 */
export const DarkColor = {
  white: '#000000',
  black: '#ffffff',
  text: '#aaaaaa',
  grey: '#777777',
  dark: '#333333',
  darkGrey: '#666666',
  transparent: '#00000000',
  mask: 'rgba(0,0,0,0.4)',
  maskWhite: 'rgba(255,255,255,0.7)',
  lightGrey: '#dddddd',
  header: '#f5f5f5',
  lightBackground: '#f5f5f5',
  light: '#eeeeee',
  border: '#ebedf0',
  darkBorder: '#cfcfcf',
  lightBorder: '#f3f3f3',
  yellow: '#ffd21e',
  default: 'transparent',
  primary: '#1989fa',
  success: '#07c160',
  warning: '#ff976a',
  notice: '#fffbe8',
  orangeLight: '#fffbe8',
  orangeDark: '#ed6a0c',
  danger: '#ee0a24',
  /**
   * 配置颜色
   * @param colors 颜色，可以设置多个
   */
  configColors(colors: ColorInfo) {
    for (const key in colors) {
      (Color as unknown as ColorInfo)[key] = colors[key];
    }
  },
};

/**
 * 按下颜色定义
 */
export const PressedColor = {
  light: 'rgba(0,0,0,0.1)',
  dark: 'rgba(255,255,255,0.2)',
  grey: '#888',
  default: '#efefef',
  primary: '#177ce1',
  success: '#06ae57',
  warning: '#e68860',
  danger: '#d70920',
  /**
   * 配置颜色
   * @param colors 颜色，可以设置多个
   */
  configColors(colors: ColorInfo) {
    for (const key in colors) {
      (Color as unknown as ColorInfo)[key] = colors[key];
    }
  },
};



