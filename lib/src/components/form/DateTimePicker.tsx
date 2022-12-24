import React, { useMemo } from "react";
import TimeUtils from "../../utils/TimeUtils";
import { PickerWhellView, PickerWhellViewProps } from "../picker";

export type DateTimePickerColumnsType = 'year'|'month'|'day'|'hour'|'minute'|'second';

export interface DateTimePickerProps {
  /**
   * 当前选中的日期
   */
  value?: Date,
  /**
   * 选中的日期更改时发生
   */
  onValueChange?: (newValue: Date) => void;
  /**
   * 选项类型，由 year、month、day、hour、minute 和 second 组成的数组
   * @default [ 'year', 'month', 'day', 'hour', 'minute' ]
   */
  columnsType?: DateTimePickerColumnsType[],
  /**
   * 可选的最小时间，精确到日
   * @default new Date(2000/01/01)
   */
  minDate?: Date,
  /**
   * 可选的最大时间，精确到日
   * @default new Date()
   */
  maxDate?: Date,
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
  filter?: (columnsType: DateTimePickerColumnsType, value: number) => boolean,
  /**
   * 选项格式化函数
   * @param columnsType 选项类型
   * @param value 当前值
   * @returns 返回一个要显示的字符串
   */
  formatter?: (columnsType: DateTimePickerColumnsType, value: number) => string,
  /**
   * 自定义PickerWhellView属性
   */
  pickerWhellViewProps?: Omit<PickerWhellViewProps, 'options'|'selectIndex'>;
}

/**
 * 日期+时间选择器，用于选择年、月、日+时间，通常与弹出层组件配合使用。
 */
export function DateTimePicker(props: DateTimePickerProps) {

  const {
    value = new Date(),
    columnsType = [ 'year', 'month', 'day', 'hour', 'minute' ],
    minDate = new Date('2000/01/01'),
    maxDate = new Date(),
    minHour = 0,
    minMinute = 0,
    minSecond = 0,
    maxHour = 24,
    maxMinute = 60,
    maxSecond = 6,
    filter,
    formatter,
    onValueChange,
    pickerWhellViewProps,
  } = props;

  const currentYear = value.getFullYear();
  const currentMonth = value.getMonth();
  const currentDay = value.getDate();
  const currentHour = value.getHours();
  const currentMinute = value.getMinutes();
  const currentSecond = value.getSeconds();

  const yearRows = useMemo(() => {
    const result = [] as {
      value: number,
      label: string,
    }[];
    for (let i = minDate.getFullYear(); i <= maxDate.getFullYear(); i++)
      if (!filter || filter('year', i))
        result.push({
          label: formatter ? formatter('year', i) : i.toString(),
          value: i,
        });
    return result;
  }, [ minDate, maxDate, formatter, filter ]);
  const monthRows = useMemo(() => {
    const result = [] as {
      value: number,
      label: string,
    }[];

    let min = 0, max = 11;
    if (currentYear === minDate.getFullYear())
      min = minDate.getMonth();
    if (currentYear === maxDate.getFullYear())
      max = maxDate.getMonth();

    for (let i = min; i <= max; i++)
      if (!filter || filter('month', i))
        result.push({
          label: formatter ? formatter('month', i) : (i + 1).toString(),
          value: i,
        });
    return result;
  }, [ currentYear, minDate, maxDate, formatter, filter ]);
  const dayRows = useMemo(() => {
    const result = [] as {
      value: number,
      label: string,
    }[];

    let min = 1, max = TimeUtils.getMonthDays(currentYear, currentMonth + 1);
    if (currentYear === minDate.getFullYear() && currentMonth === minDate.getMonth())
      min = minDate.getDate();
    if (currentYear === maxDate.getFullYear() && currentMonth === maxDate.getMonth())
      max = maxDate.getDate();

    for (let i = min; i <= max; i++)
      if (!filter || filter('day', i))
        result.push({
          label: formatter ? formatter('day', i) : (i + 1).toString(),
          value: i,
        });
    return result;
  }, [ currentYear, currentMonth, minDate, maxDate, formatter, filter ]);
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

  const valuesAndLabels = useMemo(() => {
    const values = [] as number[];
    const labels = [] as string[][];

    for (const type of columnsType) {
      switch (type) {
        case 'day':
          labels.push(dayRows.map(k => k.label));
          values.push(dayRows.findIndex(k => k.value === currentDay));
          break;
        case 'month':
          labels.push(monthRows.map(k => k.label));
          values.push(monthRows.findIndex(k => k.value === currentMonth));
          break;
        case 'year':
          labels.push(yearRows.map(k => k.label));
          values.push(yearRows.findIndex(k => k.value === currentYear));
          break;
        case 'hour':
          labels.push(hourRows.map(k => k.label));
          values.push(hourRows.findIndex(k => k.value === currentHour));
          break;
        case 'minute':
          labels.push(minuteRows.map(k => k.label));
          values.push(minuteRows.findIndex(k => k.value === currentMinute));
          break;
        case 'second':
          labels.push(secondRows.map(k => k.label));
          values.push(secondRows.findIndex(k => k.value === currentSecond));
          break;
      }
    }
    return {
      values,
      labels,
    };
  }, [
    currentDay, currentMonth, currentYear, currentHour, currentMinute, currentSecond,
    columnsType, dayRows, monthRows, yearRows, hourRows, minuteRows, secondRows,
  ]);

  function handleWhellViewChange(valueNow: number[]) {
    let y = 0, m = 0, d = 0, h = 0, mm = 0, s = 0;
    for (let i = 0; i < valueNow.length; i++) {
      switch (columnsType[i]) {
        case 'day': d = dayRows[valueNow[i]].value; break;
        case 'month': m = monthRows[valueNow[i]].value; break;
        case 'year': y = yearRows[valueNow[i]].value; break;
        case 'hour': h = hourRows[valueNow[i]].value; break;
        case 'minute': mm = minuteRows[valueNow[i]].value; break;
        case 'second': s = secondRows[valueNow[i]].value; break;
      }
    }
    onValueChange?.(new Date(y, m, d, h, mm, s));
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
