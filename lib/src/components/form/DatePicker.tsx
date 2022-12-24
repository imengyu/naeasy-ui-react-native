import React, { useMemo } from "react";
import TimeUtils from "../../utils/TimeUtils";
import { PickerWhellView, PickerWhellViewProps } from "../picker";

export type DatePickerColumnsType = 'year'|'month'|'day';

export interface DatePickerProps {
  /**
   * 当前选中的日期
   */
  value?: Date,
  /**
   * 选中的日期更改时发生
   */
  onValueChange?: (newValue: Date) => void;
  /**
   * 选项类型，由 year、month 和 day 组成的数组
   * @default [ 'year', 'month', 'day' ]
   */
  columnsType?: DatePickerColumnsType[],
  /**
   * 可选的最小时间，精确到日
   * @default new Date(1990/01/01)
   */
  minDate?: Date,
  /**
   * 可选的最大时间，精确到日
   * @default new Date('2030/12/31')
   */
  maxDate?: Date,
  /**
   * 选项过滤函数
   * @param columnsType 选项类型
   * @param value 当前值
   * @returns 返回true表示显示，false表示不显示
   */
  filter?: (columnsType: DatePickerColumnsType, value: number) => boolean,
  /**
   * 选项格式化函数
   * @param columnsType 选项类型
   * @param value 当前值
   * @returns 返回一个要显示的字符串
   */
  formatter?: (columnsType: DatePickerColumnsType, value: number) => string,
  /**
   * 自定义PickerWhellView属性
   */
  pickerWhellViewProps?: Omit<PickerWhellViewProps, 'options'|'selectIndex'>;
}

/**
 * 日期选择器，用于选择年、月、日，通常与弹出层组件配合使用。
 */
export function DatePicker(props: DatePickerProps) {

  const {
    value = new Date(),
    columnsType = [ 'year', 'month', 'day' ],
    minDate = new Date('1990/01/01'),
    maxDate = new Date('2030/12/31'),
    filter,
    formatter,
    onValueChange,
    pickerWhellViewProps = { style: { height: 300 } },
  } = props;

  const currentYear = value.getFullYear();
  const currentMonth = value.getMonth();
  const currentDay = value.getDate();

  const yearRows = useMemo(() => {
    const result = [] as {
      value: number,
      label: string,
    }[];
    for (let i = minDate.getFullYear(); i <= maxDate.getFullYear(); i++)
      if (!filter || filter('year', i))
        result.push({
          label: formatter ? formatter('year', i) : `${i}年`,
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
          label: formatter ? formatter('month', i) : `${i + 1}月`,
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
          label: formatter ? formatter('day', i) : `${i}`,
          value: i,
        });
    return result;
  }, [ currentYear, currentMonth, minDate, maxDate, formatter, filter ]);

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
          console.log('yearRows', yearRows);
          break;
      }
    }
    return {
      values,
      labels,
    };
  }, [ currentDay, currentMonth, currentYear, columnsType, dayRows, monthRows, yearRows ]);

  function handleWhellViewChange(valueNow: number[]) {
    let y = 0, m = 0, d = 0;
    console.log('handleWhellViewChange', valueNow);
    
    for (let i = 0; i < valueNow.length; i++) {
      switch (columnsType[i]) {
        case 'day': d = dayRows[valueNow[i]].value; break;
        case 'month': m = monthRows[valueNow[i]].value; break;
        case 'year': y = yearRows[valueNow[i]].value; break;
      }
    }
    onValueChange?.(new Date(y, m, d));
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
