import React, { useContext, useMemo } from "react";
import StringTools from "../../utils/StringTools";
import TimeUtils from "../../utils/TimeUtils";
import { Popup } from "../basic/Popup";
import { PickerWhellView, PickerWhellViewProps } from "../picker";
import { Text } from "../typography";
import { FieldItemContext } from "./Field";

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
   * @default new Date('1990-01-01')
   */
  minDate?: Date,
  /**
   * 可选的最大时间，精确到日
   * @default new Date('2030-12-31')
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

export interface WrapperPickerForFieldProps {
  /**
   * 弹出框标题
   */
  title?: string,
}
/**
 * 包装选择器以生成用于表单 Field 的组件
 * @param component 选择器组件
 * @param defaultTitle 默认标题
 */
export function wrapperPickerForField<T>(component: React.FunctionComponent<T> | React.ComponentClass<T>, defaultTitle: string, display: (props: T, value: unknown) => string) {
  return (props: T) => {
    const formContext = useContext(FieldItemContext);
    formContext.useOnClick(() => {
      Popup.show({
        position: 'bottom',
        onClose(returnData) {
          if (returnData)
            formContext.onValueChange?.(returnData);
        },
        renderContent: Popup.wrapperSimpleValueControl(component, (props as WrapperPickerForFieldProps).title || defaultTitle, formContext.value, props),
      });
    });
    return <Text>{ display(props, formContext.value) }</Text>;
  };
}


export interface DatePickerFieldProps extends DatePickerProps, WrapperPickerForFieldProps {
  /**
   * 显示时的日期格式。
   * @default 'YYYY-MM-dd'
   */
  displayDateFormat?: string;
}
/**
 * 日期选择器(表单版)，用于表单的 Field 中
 */
export const DatePickerField = wrapperPickerForField<DatePickerFieldProps>(DatePicker, '日期选择器', (p, v) => {
  return StringTools.formatTime(v as Date, p.displayDateFormat || 'YYYY-MM-dd');
});

/**
 * 日期选择器，用于选择年、月、日，通常与弹出层组件配合使用。
 */
export function DatePicker(props: DatePickerProps) {

  const {
    value = new Date(),
    columnsType = [ 'year', 'month', 'day' ],
    minDate = new Date('1990-01-01'),
    maxDate = new Date('2030-12-31'),
    filter,
    formatter,
    onValueChange,
    pickerWhellViewProps = { style: { height: 200 } },
  } = props;

  const currentYear = value.getFullYear();
  const currentMonth = value.getMonth();
  const currentDay = value.getDate();

  const yearRows = useMemo(() => {
    const result = [] as { value: number, label: string }[];
    for (let i = minDate.getFullYear(); i <= maxDate.getFullYear(); i++) {
      if (!filter || filter('year', i)) {
        result.push({
          label: formatter ? formatter('year', i) : `${i}年`,
          value: i,
        });
      }
    }
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

    let min = 1, max = TimeUtils.getMonthDays(currentYear, currentMonth);
    if (currentYear === minDate.getFullYear() && currentMonth === minDate.getMonth())
      min = minDate.getDate();
    if (currentYear === maxDate.getFullYear() && currentMonth === maxDate.getMonth())
      max = maxDate.getDate();

    for (let i = min; i <= max; i++)
      if (!filter || filter('day', i))
        result.push({
          label: formatter ? formatter('day', i) : `${i}日`,
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
