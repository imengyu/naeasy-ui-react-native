import { NativeModules } from 'react-native';
import { isAndroid, isIOS } from '../../utils/PlatformTools';

const ChinaAddress = isAndroid ? require('../../data/ChinaAddress').ChinaAddress as [
  string[],
  string[][],
  string[][][],
] : undefined;
const PickerViewAndroid = NativeModules.PickerViewAndroid;
const PickerViewIOS = NativeModules.PickerViewIOS;

export interface PickerBaseProps {
  /**
   * 点击外围是否可以取消
   *
   * @platform Android
   */
  outSideCancelable?: boolean,
  /**
   * 蒙层颜色
   *
   * @platform iOS
   */
  maskColor?: string,
  /**
   * 分隔线类型
   *
   * @platform Android
   */
  dividerType?: 'FILL'|'WARP'|'CIRCLE',
  /**
   * 是否只显示中间选中项的label文字，false则每项item全部都带有label
   */
  centerLabel?: boolean,
  /**
   * 滚轮是否渐变透明的开关
   *
   * @platform Android
   */
  alphaGradient?: boolean,
  /**
   * 滚轮最大可见数目的设置
   *
   * @platform Android
   */
  itemVisibleCount?: number,
  /**
   * 滚轮背景颜色设置
   */
  bgColor?: string,
  /**
   * 取消按钮颜色
   */
  cancelColor?: string,
  /**
   * 取消按钮文字
   */
  cancelText?: string,
  /**
   * 滚轮文字大小设置
   */
  contentTextSize?: number,
  /**
   * 分割线颜色设置
   */
  dividerColor?: string,
  /**
   * 滚轮间距设置（1.2-2.0倍，此为文字高度的间距倍数）
   *
   * @platform Android
   */
  lineSpacingMultiplier?: number,
  /**
   * 未选中项颜色设置
   */
  outSideColor?: string,
  /**
   * 确定、取消按钮大小设置
   */
  subCalSize?: number,
  /**
   * 确定按钮颜色
   */
  submitColor?: string,
  /**
   * 确定按钮文字
   */
  submitText?: string,
  /**
   * 选中项文字颜色设置
   */
  textColorCenter?: string,
  /**
   * 未选中项文字颜色设置
   */
  textColorOut?: string,
  /**
   * 标题栏背景颜色设置
   */
  titleBgColor?: string,
  /**
   * 标题颜色设置
   */
  titleColor?: string,
  /**
   * 标题的字号
   */
  titleSize?: number,
  /**
   * 标题文字
   */
  titleText?: string,
  /**
   * 是否可以按返回按键取消
   *
   * @platform Android
   */
  keyBackCancelable?: boolean,
}

export interface PickerTimeOptions extends PickerBaseProps {
  /**
   * 设置X轴偏移量，形成弧度
   *
   * @platform Android
   */
  textXOffset?: {
    offsetYear: number,
    offsetMonth: number,
    offsetDay: number,
    offsetHours: number,
    offsetMinutes: number,
    offsetSeconds: number,
  },
  /**
   * 单位（Label）填null或空串不显示
   *
   * @platform Android
   */
  label?: {
    labelYear: number,
    labelMonth: number,
    labelDay: number,
    labelHours: number,
    labelMinutes: number,
    labelSeconds: number,
  },
  /**
   * 是否是农历日历
   *
   * @platform Android
   */
  lunarCalendar?: boolean,
  /**
   * 可选日期范围
   */
  range?: {
    start: number|Date|string,
    end: number|Date|string,
  },
  /**
   * 长度为6的布尔数组，用于控制年月日时分秒是否显示
   */
  type?: boolean[],
  /**
   * 初始选中日期
   */
  date?: number|Date|string,
  /**
   * 是否循环滚动
   *
   * @platform Android
   */
  cyclic?: boolean,
}
export interface PickerAddressProps extends PickerOptionsProps<string>  {
  /**
   * 选择器初始选择的地址(三个地名用空格隔开)，如果同时设置了selectOptions，则selectOptions无效
   */
  intitalAddress?: string;
}
export interface PickerOptionsProps<T> extends PickerBaseProps  {
  /**
   * 设置X轴偏移量，形成弧度
   */
  textXOffset?: {
    offsetOne: number,
    offsetTwo: number,
    offsetThree: number,
  },
  /**是否循环 */
  cyclic?: {
    cyclicOne: boolean,
    cyclicTwo: boolean,
    cyclicThree: boolean,
  },
  /**
   * 不联动数据
   */
  nPicker?: [ T[] ]|[ T[], T[] ]|[ T[], T[], T[] ],
  /**
   * 联动数据
   */
  picker?: [
    T[]
  ]|[
    T[],
    T[][]
  ]|[
    T[],
    T[][],
    T[][][]
  ],
  /**
   * 初始选中的条目
   */
  selectOptions?: number[],
}

function tryConvertDateAndStringToMsNumber(date: number|Date|string|undefined): number|undefined {
  if (typeof date === 'undefined') return undefined;
  if (typeof date === 'number') return date;
  if (typeof date === 'string') return new Date(date).getTime();
  if (date instanceof Date) return date.getTime();
  return undefined;
}
function convertStyleToIOSPickerStyle(options: PickerBaseProps) {
  return {
    maskColor: options.maskColor,
    titleBarColor: options.titleBgColor,
    titleTextColor: options.titleColor,
    cancelTextColor: options.cancelColor,
    cancelBtnTitle: options.cancelText,
    doneTextColor: options.submitColor,
    doneBtnTitle: options.submitText,
    pickerTextColor: options.textColorOut,
    selectRowTextColor: options.textColorCenter,
  };
}
function convertTimePickerModeToIOSPicker(options?: boolean[]) {
  if (!options)
    return PickerViewIOS.BRDatePickerModeDate;
  if (options.every((v) => v))
    return PickerViewIOS.BRDatePickerModeDateAndTime;
  if (options.every((v, i) => i < 3 ? v : !v))
    return PickerViewIOS.BRDatePickerModeDate;
  if (options.every((v, i) => i > 2 ? v : !v))
    return PickerViewIOS.BRDatePickerModeTime;
  if (options.every((v, i) => i < 5 ? v : !v))
    return PickerViewIOS.BRDatePickerModeYMDHM;
  if (options.every((v, i) => i < 4 ? v : !v))
    return PickerViewIOS.BRDatePickerModeYMDH;
  if (options.every((v, i) => i < 2 ? v : !v))
    return PickerViewIOS.BRDatePickerModeYM;
  if (options.every((v, i) => i < 1 ? v : !v))
    return PickerViewIOS.BRDatePickerModeY;
  return PickerViewIOS.BRDatePickerModeDate;
}

/**
 * 内置选择器
 */
export const Picker = {
  /**
   * TimePicker的type参数，预设了只显示日期（年月日）
   */
  TimePickerTypeDate: [ true, true, true, false, false, false ],
  /**
   * TimePicker的type参数，预设了只显示时间（时分秒）
   */
  TimePickerTypeTime: [ false, false, false , true, true, true ],
  /**
   * TimePicker的type参数，预设了全部显示时间（年月日时分秒）
   */
  TimePickerTypeAll: [ true, true, true , true, true, true ],
  /**
   * 显示
   * @param options 参数配置
   * @param selectCallback 选择回调
   * @param dismissCallback 取消回调
   */
  showTimePickerView(options: PickerTimeOptions, selectCallback: (date: Date) => void, dismissCallback?: () => void) {
    if (isAndroid) {
      options.date = tryConvertDateAndStringToMsNumber(options.date);
      if (options.range) {
        options.range.start = tryConvertDateAndStringToMsNumber(options.range.start) as number;
        options.range.end = tryConvertDateAndStringToMsNumber(options.range.end) as number;
      }
      PickerViewAndroid.showTimePickerView(options, (date: number) => selectCallback(new Date(date)), dismissCallback || (() => {}));
    }
    else if (isIOS) {
      PickerViewIOS.showTimePickerView({
        pickerMode: convertTimePickerModeToIOSPicker(options.type),
        selectDate: options.date,
        minDate: options.range ? options.range.start : undefined,
        maxDate: options.range ? options.range.end : undefined,
        title: options.titleText,
        pickerStyle: convertStyleToIOSPickerStyle(options),
      }, (date: number) => selectCallback(new Date(date)), dismissCallback || (() => {}));
    }
    else {
      throw new Error('Not implemented');
    }
  },
  /**
   * 显示自定义选择器
   * @param options 参数配置
   * @param selectCallback 选择回调
   * @param dismissCallback 取消回调
   */
  showOptionsPickerView<T>(options: PickerOptionsProps<T>, selectCallback: (option1: number, option2: number, option3: number) => void, dismissCallback?: () => void) {
    if (isAndroid)
      PickerViewAndroid.showOptionsPickerView(options, selectCallback, dismissCallback || (() => {}));
    else if (isIOS) {
      const finalOptions = {
        pickerMode: 0,
        title: options.titleText,
        pickerStyle: convertStyleToIOSPickerStyle(options),
        array: [] as unknown[],
        selectIndexs: [] as number[]|undefined,
        selectIndex: 0,
      };

      if (options.nPicker) {
        if (options.nPicker.length === 1) {
          finalOptions.pickerMode = PickerViewIOS.BRStringPickerComponentSingle;
          finalOptions.array = options.nPicker[0];
          finalOptions.selectIndex = options.selectOptions ? options.selectOptions[0] : 0;
        }
        else {
          finalOptions.pickerMode = PickerViewIOS.BRStringPickerComponentMulti;
          finalOptions.array = options.nPicker;
          finalOptions.selectIndexs = options.selectOptions ? options.selectOptions : undefined;
        }
      } else if (options.picker) {
        finalOptions.pickerMode = PickerViewIOS.BRStringPickerComponentLinkage;
        finalOptions.selectIndexs = options.selectOptions ? options.selectOptions : undefined;

        //这代码糟糕，不想改了。
        //把多维数组展平
        if (options.picker) {
          const arr = finalOptions.array;
          const picker = options.picker;
          if (picker.length === 1) {
            picker[0].forEach((v, i) => {
              arr.push({
                parentKey: '-1',
                key: i,
                value: v,
              });
            });
          } else if (options.picker.length >= 2) {
            let key = 0;
            options.picker[0].forEach((v, i) => {
              arr.push({
                parentKey: '-1',
                key: (++key).toString(),
                value: '' + v,
              });
              if (picker[1]) {
                const parentKey1 = key.toString();
                picker[1][i].forEach((v1, j) => {
                  arr.push({
                    parentKey: parentKey1,
                    key: (++key).toString(),
                    value: '' + v1,
                  });
                  if (picker[2] && picker.length === 3) {
                    const parentKey2 = key.toString();
                    picker[2][i][j].forEach((v2) => {
                      arr.push({
                        parentKey: parentKey2,
                        key: (++key).toString(),
                        value: '' + v2,
                      });
                    });
                  }
                });
              }
            });
          }
        }
      }

      PickerViewIOS.showOptionsPickerView(finalOptions, selectCallback, dismissCallback || (() => {}));
    } else {
      throw new Error('Not implemented');
    }
  },
  /**
   * 显示中国三级地址选择器
   * @param options 参数配置
   * @param selectCallback 选择回调
   * @param dismissCallback 取消回调
   */
  showAddressPickerView(options: PickerAddressProps, selectCallback: (province: string, city: string, district: string) => void, dismissCallback?: () => void) {
    if (isAndroid && ChinaAddress) {

      //设置初始选择数据
      if (options.intitalAddress) {
        let selectOne = -1;
        let selectTwo = -1;
        let selectThree = -1;
        const addressArr = options.intitalAddress.split(' ');
        if (addressArr.length > 0) {
          const addressName = addressArr[0];
          selectOne = ChinaAddress[0].findIndex((i) => i === addressName);
        }
        if (addressArr.length > 1 && selectOne >= 0) {
          const addressName = addressArr[1];
          selectTwo = ChinaAddress[1][selectOne].findIndex((i) => i === addressName);
        }
        if (addressArr.length > 2 && selectTwo >= 0) {
          const addressName = addressArr[2];
          selectThree = ChinaAddress[2][selectOne][selectTwo].findIndex((i) => i === addressName);
        }
        options.selectOptions = [];
        if (selectOne >= 0) options.selectOptions.push(selectOne);
        if (selectTwo >= 0) options.selectOptions.push(selectTwo);
        if (selectThree >= 0) options.selectOptions.push(selectThree);
      }

      PickerViewAndroid.showOptionsPickerView({
        ...options,
        picker: ChinaAddress,
      },
      (a: number, b: number, c: number) => selectCallback(ChinaAddress[0][a], ChinaAddress[1][a][b], ChinaAddress[2][a][b][c]),
      dismissCallback || (() => {}));
    } else if (isIOS) {
      PickerViewIOS.showAddressPickerView({
        pickerMode: PickerViewIOS.BRAddressPickerModeArea,
        title: options.titleText,
        pickerStyle: convertStyleToIOSPickerStyle(options),
        selectValue: options.intitalAddress ? options.intitalAddress.split(' ') : undefined,
      }, selectCallback, dismissCallback || (() => {}));
    } else {
      throw new Error('Not implemented');
    }
  },
};
