import React, { useMemo } from "react";
import { PickerWhellView, PickerWhellViewProps } from "../picker";
import { wrapperPickerForField, WrapperPickerForFieldProps } from "./DatePicker";

export interface OptionsPickerItem {
  /**
   * 当前条目value
   */
  value: string|number,
  /**
   * 当前条目显示文字
   */
  label: string,
}
export interface OptionsPickerProps {
  /**
   * 当前选中的数据value
   */
  value?: (number|string)[],
  /**
   * 数据
   */
  options?: OptionsPickerItem[][],
  /**
   * 选中的日期更改时发生
   */
  onValueChange?: (newValue: (number|string)[]) => void;
  /**
   * 自定义PickerWhellView属性
   */
  pickerWhellViewProps?: Omit<PickerWhellViewProps, 'options'|'selectIndex'>;
}

export interface OptionsPickerFieldProps extends OptionsPickerProps, WrapperPickerForFieldProps {}
/**
 * 普通条目选择器(表单版)，用于表单的 Field 中
 */
export const OptionsPickerField = wrapperPickerForField(OptionsPicker, '普通条目选择器');

/**
 * 普通条目选择器，通常与弹出层组件配合使用。
 */
export function OptionsPicker(props: OptionsPickerProps) {

  const {
    value = [],
    options = [],
    onValueChange,
    pickerWhellViewProps = { style: { height: 200 } },
  } = props;

  const valuesAndLabels = useMemo(() => {
    const values = [] as number[];
    const labels = [] as string[][];

    for (let i = 0; i < value.length; i++) {
      if (i >= options.length) {
        console.warn('OptionsPicker warn: value.length != options.length (' + values.length + ' != ' + options.length + ')');
        break;
      }
      labels.push(options[i].map(k => k.label));
      values.push(options[i].findIndex(k => k.value === value[i]));
    }
    return {
      values,
      labels,
    };
  }, [ value, options ]);


  function handleWhellViewChange(valueNow: number[]) {
    onValueChange?.(valueNow.map((v, i) => options[i][v].value));
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
