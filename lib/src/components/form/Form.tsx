import React from "react";
import ArrayUtils from "../../utils/ArrayUtils";
import Schema, { Rule, Rules, ValidateError } from "async-validator";
import CheckTools from "../../utils/CheckTools";
import { ViewStyle } from "react-native";
import { ColumnView } from "../layout/ColumnView";
import { FieldInstance, FieldProps } from "./Field";

export type FormValueType = Date|null|number|string|boolean|number[]|string[]|boolean[]|null[]|FormValueType[];

export interface FormValues {
  [index: string]: FormValueType;
}

interface FormValidStateItem {
  error: boolean,
  errorMessage: string,
}
interface FormState {
  /**
   * 数据存储/表单条目校验状态
   */
  [index: string]: any;
}

export interface FormProps {
  /**
   * 表单的初始值
   */
  intitalValue?: FormValues;
  /**
   * 表单验证数据
   */
  rules?: Rules;
  /**
   * 表单重置回调，表单数据会重置到 `intitalValue`
   */
  onReset?: () => void;
  /**
   * 调用 `formApi.submit()`，数据验证成功后的回调函数
   */
  onSubmit?: (value: FormValues) => void;
  /**
   * 调用 `formApi.submit()`，数据验证失败后的回调函数
   */
  onSubmitFail?: (error: ValidateError[]) => void;
  /**
   * 设置字段校验的时机
   * * onBlur 文本框失去焦点时校验
   * * onValueChange 数值更改时校验
   * * onSubmit 提交时校验(默认)
   */
  validateTrigger?: 'onBlur'|'onValueChange'|'onSubmit';
  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 组件是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否在文本框激活时清除之前错误的验证结果
   * @default false
   */
  clearValidFocus?: boolean;
  /**
   * 表单外层容器样式
   */
  style?: ViewStyle;
  /**
   * 对当前表单内部的所有 Field 属性进行统一设置
   */
  fieldProps?: FieldProps;
  /**
   * 是否自动根据表单校验规则为 Field 设置必填星号
   * @default true
   */
  addRequireMark?: boolean;

  children?: JSX.Element|JSX.Element[];
}

/**
 * 表单组件。用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型，需要与 Field 输入框 组件搭配使用。
 */
export class Form extends React.Component<FormProps, FormState> {

  state: Readonly<FormState> = {};
  currentFocusField : null|FieldInstance = null;

  componentDidMount() {
    this.reset();
  }

  /**
   * 取消表单内部的输入框激活（通常在提交时，可以调用此方法，关闭输入框）
   */
  blur() {
    if (this.currentFocusField) {
      this.currentFocusField.blur();
      this.currentFocusField = null;
    }
  }
  /**
   * 重置表单
   */
  reset() {
    const intitalValue = this.props.intitalValue || {};
    const result = {} as Record<string, unknown>;
    this.activeName.forEach((key) => {
      result[key] = intitalValue[key];
    });
    this.setState({ ...result });
    this.resetValidation();

    this.props.onReset && this.props.onReset();
  }
  /**
   * 重置表单项的验证提示，支持传入 name 来重置单个或部分表单项
   */
  resetValidation(name?: string|string[]) {
    if (typeof name === 'string') {
      const k = this.makeValidStateKey(name);
      this.setState({ [k]: undefined });
    }
    else if (name) {
      this.activeName.forEach((key) => {
        //筛选指定名字
        const k = this.makeValidStateKey(key);
        if (name.includes(key))
          return;
        this.setState({ [k]: undefined });
      });
    } else {
      this.activeName.forEach((key) => {
        const k = this.makeValidStateKey(key);
        this.setState({ [k]: undefined });
      });
    }
  }
  /**
   * 验证表单，支持传入 name 来验证单个或部分表单项
   */
  validate(name?: string|string[]) {
    const rules = this.props.rules;
    const filteredRules = {} as Record<string, Rule|undefined>;

    //筛选需要验证的字段
    this.activeName.forEach((key) => {
      const rule = rules ? rules[key] : undefined;
      if (rule) {
        if (typeof name === 'string') {
          if (name === key) filteredRules[key] = rule;
        } else if (typeof name === 'object') {
          if (name.includes(key)) filteredRules[key] = rule;
        } else
          filteredRules[key] = rule;
      }
    });

    //获取当前参数
    const nowValues = this.getValues();

    //开始验证
    return new Promise<void>((resolve, reject) => {
      const validator = new Schema(filteredRules as Rules);
      validator.validate(nowValues, {}, (errors) => {
        if (errors) {
          //验证失败，把错误字段显示
          for (const key in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, key)) {
              const err = errors[key];
              const k = this.makeValidStateKey(err.field as string);
              this.setState({ [ k ]: {
                errorMessage: err.message || '',
              } as FormValidStateItem});
            }
          }
          reject(errors);
        } else {
          //验证成功，去除之前的验证错误信息
          this.resetValidation();
          resolve();
        }
      });
    });
  }
  /**
   * 提交表单
   * @param valid 提交之前是否要验证表单，默认 true
   */
  submit(valid = true) {
    //取消输入框的激活
    this.blur();

    if (valid) {
      //验证
      this.validate().then(() => {
        this.props.onSubmit?.(this.getValues());
      }).catch((e) => {
        this.props.onSubmitFail?.(e);
      });
    } else {
      //提交
      this.props.onSubmit?.(this.getValues());
    }
  }
  /**
   * 获取所有表单项当前的值
   */
  getValues() : FormValues {
    const result = {} as FormValues;
    this.activeName.forEach((key) => {
      result[key] = this.state[key];
    });
    return result;
  }
  /**
   * 获取指定表单项当前的值
   * @param name 表单项的名称
   * @returns
   */
  getValue(name: string): FormValueType {
    return this.state[name];
  }
  /**
   * 强制设置指定表单项当前的值
   * @param name 表单项的名称
   * @param value 设置的值
   * @returns 返回之前的值
   */
  setValue(name: string, value: FormValueType): FormValueType {
    const oldValue = this.state[name];
    this.setState({ [ name ]: value });
    return oldValue;
  }

  //当前表单所有的name
  private activeName = [] as string[];

  private makeValidStateKey(k: string) { return `_validState_${k}`; }

  private renderItems() {
    const items = [] as JSX.Element[];

    //清空当前激活
    this.activeName = [];

    const {
      rules,
      fieldProps,
      validateTrigger = 'onSubmit',
      addRequireMark = true,
    } = this.props;

    const checkRuleRequired = (rule: Rule) => {
      if (rule instanceof Array)
        return rule.find((r) => r.required === true) !== undefined;
      else
        return rule.required === true;
    };

    const solveItem = (e: JSX.Element) => {
      const name = e.props.name;
      if (!CheckTools.isNullOrEmpty(name)) {

        const rule = rules ? rules[name] : undefined;
        const validState = this.state[this.makeValidStateKey(name)] as FormValidStateItem;
        const validTrigger = e.props.validateTrigger || validateTrigger;
        const visibleIf = e.props.visibleIf as (formState: Form) => boolean;

        if (typeof visibleIf === 'function' && visibleIf(this) === false)
          return;

        ArrayUtils.addOnce(this.activeName, name as string); //添加名称进入数组

        //劫持 value 和 onValueChange ，把数据同步到当前表单组件
        items.push(React.cloneElement(
          e,
          {
            ...fieldProps,
            ...e.props,
            key: name,
            value: this.state[name],
            //错误信息的控制
            error: validState ? validState.error : undefined,
            errorMessage: validState ? validState.errorMessage : undefined,
            required: addRequireMark && rule && checkRuleRequired(rule),
            //数据变化
            onValueChange: (newValue: unknown) => {
              this.setState({ [name]: newValue });

              if (rule && validTrigger === 'onValueChange')
                this.validate(name).catch(() => {});
              else if (validState)
                this.resetValidation(name);
            },
            onFocusValid: (instance: FieldInstance) => {
              this.currentFocusField = instance;
              if (this.props.clearValidFocus && validState)
                this.resetValidation(name);
            },
            onBlurValid: (instance: FieldInstance) => {
              if (rule && validTrigger === 'onBlur')
                this.validate(name).catch(() => {});
              if (this.currentFocusField === instance)
                this.currentFocusField = null;
            },
          }
        ));
      } else {
        items.push(e);
      }
    };

    //处理子元素
    if (this.props.children instanceof Array)
      this.props.children.forEach(solveItem);
    else if (this.props.children)
      solveItem(this.props.children);

    return items;
  }

  render(): React.ReactNode {
    return (
      <ColumnView style={this.props.style}>{ this.renderItems() }</ColumnView>
    );
  }
}

/**
 * 用于表单项的统一接口。表单的一级子组件请实现此接口，否则无法响应表单相关功能。
 */
export interface FormItemFieldProps {
  /**
   * 当前输入的值
   */
  value?: unknown;
  /**
   * 用于表单，更改时验证回调
   */
  onValueChange?: (value: unknown) => void;
  /**
   * 用于表单，获得点时验证回调
   */
  onFocusValid?: (instance: FieldInstance) => void;
  /**
   * 用于表单，失去焦点时验证回调
   */
  onBlurValid?: (value: unknown) => void;
}
