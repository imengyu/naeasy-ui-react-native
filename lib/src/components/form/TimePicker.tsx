import React, { useMemo } from "react";
import StringTools from "../../utils/StringTools";
import { PickerWhellView, PickerWhellViewProps } from "../picker";
import { wrapperPickerForField, WrapperPickerForFieldProps } from "./DatePicker";

export type TimePickerColumnsType = 'am-pm'|'hour'|'minute'|'second';

export interface TimePickerProps {
  /**
   * 当前选中的时间
   */
  value?: number[],
  /**
   * 选中的日期更改时发生
   */
  onValueChange?: (newValue: number[]) => void;
  /**
   * 选项类型，由 am-pm、hour、minute 和 second 组成的数组
   * @default [ 'hour', 'minute', 'second' ]
   */
  columnsType?: TimePickerColumnsType[],
  /**
   * 可选的最小秒
   * @default 0
   */
  minSecond?: number,
  /**
   * 可选的最大秒
   * @default 60
   */
  maxSecond?: number,
  /**
   * 可选的最小时
   * @default 0
   */
  minHour?: number,
  /**
   * 可选的最大时
   * @default 24
   */
  maxHour?: number,
  /**
   * 可选的最小分
   * @default 0
   */
  minMinute?: number,
  /**
   * 可选的最大分
   * @default 60
   */
  maxMinute?: number,
  /**
   * 选项过滤函数
   * @param columnsType 选项类型
   * @param value 当前值
   * @returns 返回true表示显示，false表示不显示
   */
  filter?: (columnsType: TimePickerColumnsType, value: number) => boolean,
  /**
   * 选项格式化函数
   * @param columnsType 选项类型
   * @param value 当前值
   * @returns 返回一个要显示的字符串
   */
  formatter?: (columnsType: TimePickerColumnsType, value: number) => string,
  /**
   * 自定义PickerWhellView属性
   */
  pickerWhellViewProps?: Omit<PickerWhellViewProps, 'options'|'selectIndex'>;
}


export interface TimePickerFieldProps extends TimePickerProps, WrapperPickerForFieldProps {
  /**
   * 未选择时的文字
   * @default '请选择'
   */
  placeholder?: string;
}
/**
 * 时间选择器(表单版)，用于表单的 Field 中
 */
export const TimePickerField = wrapperPickerForField<TimePickerFieldProps>(TimePicker, '时间选择器', (p, v) => {
  const {
    placeholder = '请选择',
  } = p;
  return (v as number[])?.map(t => StringTools.pad(t.toString(), 2))?.join(':') || placeholder;
});


/**
 * 时间选择器，通常与弹出层组件配合使用。
 */
export function TimePicker(props: TimePickerProps) {

  const {
    value = [ 0, 0, 0 ],
    columnsType = [ 'hour', 'minute', 'second' ],
    minHour = 0,
    minMinute = 0,
    minSecond = 0,
    maxHour = 24,
    maxMinute = 60,
    maxSecond = 6,
    filter,
    formatter,
    onValueChange,
    pickerWhellViewProps = { style: { height:200 }},
  } = props;

  const hourRows = useMemo(() => {
    const result = [] as {
      value: number,
      label: string,
    }[];
    for (let i = minHour; i <= maxHour; i++)
      if (!filter || filter('hour', i))
        result.push({
          label: formatter ? formatter('hour', i) : i.toString(),
          value: i,
        });
    return result;
  }, [ minHour, maxHour, formatter, filter ]);
  const minuteRows = useMemo(() => {
    const result = [] as {
      value: number,
      label: string,
    }[];
    for (let i = minMinute; i <= maxMinute; i++)
      if (!filter || filter('minute', i))
        result.push({
          label: formatter ? formatter('minute', i) : i.toString(),
          value: i,
        });
    return result;
  }, [ minMinute, maxMinute, formatter, filter ]);
  const secondRows = useMemo(() => {
    const result = [] as {
      value: number,
      label: string,
    }[];
    for (let i = minSecond; i <= maxSecond; i++)
      if (!filter || filter('second', i))
        result.push({
          label: formatter ? formatter('second', i) : i.toString(),
          value: i,
        });
    return result;
  }, [ minSecond, maxSecond, formatter, filter ]);
  const amPmRows = useMemo(() => {
    const result = [] as {
      value: number,
      label: string,
    }[];
    for (let i = 0; i <= 1; i++)
      if (!filter || filter('am-pm', i))
        result.push({
          label: formatter ? formatter('am-pm', i) : i === 0 ? 'am' : 'pm',
          value: i,
        });
    return result;
  }, [ formatter, filter ]);

  const valuesAndLabels = useMemo(() => {
    const values = [] as number[];
    const labels = [] as string[][];

    for (let i = 0; i < columnsType.length; i++) {
      switch (columnsType[i]) {
        case 'am-pm':
          labels.push(amPmRows.map(k => k.label));
          values.push(amPmRows.findIndex(k => k.value === value[i]));
          break;
        case 'hour':
          labels.push(hourRows.map(k => k.label));
          values.push(hourRows.findIndex(k => k.value === value[i]));
          break;
        case 'minute':
          labels.push(minuteRows.map(k => k.label));
          values.push(minuteRows.findIndex(k => k.value === value[i]));
          break;
        case 'second':
          labels.push(secondRows.map(k => k.label));
          values.push(secondRows.findIndex(k => k.value === value[i]));
          break;
      }
    }
    return {
      values,
      labels,
    };
  }, [ value, columnsType, amPmRows, hourRows, minuteRows, secondRows ]);

  function handleWhellViewChange(valueNow: number[]) {
    const result = [] as number[];
    for (let i = 0; i < valueNow.length; i++) {
      switch (columnsType[i]) {
        case 'am-pm': result.push(amPmRows[valueNow[i]].value); break;
        case 'hour': result.push(hourRows[valueNow[i]].value); break;
        case 'minute': result.push(minuteRows[valueNow[i]].value); break;
        case 'second': result.push(secondRows[valueNow[i]].value); break;
      }
    }
    onValueChange?.(result);
  }

  return (
    <PickerWhellView
      {...pickerWhellViewProps}
      options={valuesAndLabels.labels}
      selectedIndex={valuesAndLabels.values}
      onValueChange={handleWhellViewChange}
    />
  );
}
