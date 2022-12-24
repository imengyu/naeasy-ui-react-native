import React from "react";
import { CascadePickerWhellItem, CascadePickerWhellView, CascadePickerWhellViewProps } from "../picker";
import { wrapperPickerForField, WrapperPickerForFieldProps } from "./DatePicker";

export interface CascadeOptionsPickerProps extends Omit<CascadePickerWhellViewProps, 'selectValues'|'numberOfComponents'|'onValueChange'> {
  value?: (number|string)[],
  onValueChange?: (values: (number|string)[]) => void;
}

export interface CascadeOptionsPickerFieldProps extends CascadeOptionsPickerProps, WrapperPickerForFieldProps {
  /**
   * 未选择时的文字
   * @default '请选择'
   */
  placeholder?: string;
}
/**
 * 普通条目选择器(联动)(表单版)，用于表单的 Field 中
 */
export const CascadeOptionsPickerField = wrapperPickerForField<CascadeOptionsPickerFieldProps>(CascadeOptionsPicker, '普通条目选择器(联动)', (p, v) => {
  const {
    placeholder = '请选择',
  } = p;
  if (!p.options)
    return (v as number[]).join('-');
  return (v as number[])?.map((k) => p.options.find(j => j.value === k)?.label || placeholder).join(' ') || placeholder;
});


/**
 * 普通条目选择器(联动)，通常与弹出层组件配合使用。
 */
export function CascadeOptionsPicker(props: CascadeOptionsPickerProps) {

  const { onValueChange } = props;

  function handleWhellViewChange(valueNow: CascadePickerWhellItem[]) {
    onValueChange?.(valueNow.map(v => v.value));
  }

  return (
    <CascadePickerWhellView
      style={{ height: 200 }}
      {...props}
      selectValues={props.value}
      numberOfComponents={props.value?.length || 0}
      onValueChange={handleWhellViewChange}
    />
  );
}
