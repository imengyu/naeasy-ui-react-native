export interface ColorItem {
  r: number,
  g: number,
  b: number,
  a: number,
}
export function strinifyColor(color: ColorItem) : string {
  if (color.a >= 1)
    return `rgb(${color.r},${color.g},${color.b}}`;
  else
    return `rgba(${color.r},${color.g},${color.b},${color.a}`;
}
export function parseColor(colorString: string) : ColorItem {
  if (colorString.startsWith('rgb(')) {
    const splitedArr = colorString.substring(4, colorString.length - 1).split(',');

    return {
      r: parseInt(splitedArr[0], 10),
      g: parseInt(splitedArr[1], 10),
      b: parseInt(splitedArr[2], 10),
      a: 255,
    };
  }
  else if (colorString.startsWith('rgba(')) {
    const splitedArr = colorString.substring(5, colorString.length - 1).split(',');

    return {
      r: parseInt(splitedArr[0], 10),
      g: parseInt(splitedArr[1], 10),
      b: parseInt(splitedArr[2], 10),
      a: parseInt(splitedArr[3], 10),
    };
  }
  else if (colorString.startsWith('#')) {
    if (colorString.length === 4) {
      //#f3f
      const colorChar = colorString.split('');
      return {
        r: parseInt(colorChar[0] + colorChar[0], 16),
        g: parseInt(colorChar[1] + colorChar[1], 16),
        b: parseInt(colorChar[2] + colorChar[2], 16),
        a: 1,
      };
    } else if (colorString.length === 7) {
      //#ff0055
      const colorChar = colorString.split('');
      return {
        r: parseInt(colorChar[0] + colorChar[1], 16),
        g: parseInt(colorChar[2] + colorChar[3], 16),
        b: parseInt(colorChar[4] + colorChar[5], 16),
        a: 1,
      };
    } else if (colorString.length === 9) {
      //#ff990035
      const colorChar = colorString.split('');
      return {
        r: parseInt(colorChar[0] + colorChar[1], 16),
        g: parseInt(colorChar[2] + colorChar[3], 16),
        b: parseInt(colorChar[4] + colorChar[5], 16),
        a: parseInt(colorChar[6] + colorChar[7], 16) / 255,
      };
    }
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  };
}
