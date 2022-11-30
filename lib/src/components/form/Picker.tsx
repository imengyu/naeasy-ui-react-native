import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Text } from "../typography/Text";
import { Picker, PickerOptionsProps } from "../picker";
import { Field, FieldProps, FormItemFieldProps } from "./Field";


export interface PickerFieldProps<T> extends FieldProps {
  /**
   * 选择器属性
   */
  pickerOptions: PickerOptionsProps<T>;
}
interface PickerControlProps<T> extends FormItemFieldProps {
  pickerOptions: PickerOptionsProps<T>,
}
interface PickerControlInstance {
  show: () => void;
}

/**
 * 选择器表单项
 */
export function PickerField<T>(options: PickerFieldProps<T>) {

  const pickerControlRef = useRef<PickerControlInstance>(null);
  const PickerControl = forwardRef<PickerControlInstance, PickerControlProps<T>>((props, ref) => {
    const {
      value,
      onValueChange,
      onBlurValid,
      pickerOptions,
    } = props;

    useImperativeHandle( ref, () => ({
      show: () => {
        Picker.showOptionsPickerView(
          pickerOptions,
          (option1: number, option2: number, option3: number) => {
            //onValueChange()
          },
          () => {
            onBlurValid?.(value);
          },
        );
      },
    }));

    return <Text>{ value as string }</Text>;
  });

  return (
    <Field
      {...options}
      showRightArrow
      onPress={() => pickerControlRef.current?.show()}
      renderInput={() => <PickerControl pickerOptions={options.pickerOptions} />}
    />
  );
}
