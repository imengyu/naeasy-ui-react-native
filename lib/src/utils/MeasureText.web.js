let canvasGlobal = null;

/**
 * 计算宽度
 * @param options
 * @returns
 */
export default {
  async measureText(options) {
    // getTextWidth.canvas 这里主要为了复用一个canvas   getTextWidth.canvas就是一个全局变量
    // getTextWidth.任意变量 首次定义只能在getTextWidth函数内定义
    // 然后在其他函数内就可以定义 getTextWidth.其他变量  但是不建议这么使用
    const canvas =
      canvasGlobal || (canvasGlobal = document.createElement('canvas'));
    const context = canvas.getContext('2d');
    context.font = `${options.fontFamily} ${options.fontSize}px`;
    // 不需要在画布上输出就可以计算文字的宽度
    const metrics = context.measureText(options.text);
    return metrics.width;
  },
};
