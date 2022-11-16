import React from "react";
import CheckTools from "../../utils/CheckTools";
import ArrayUtils from "../../utils/ArrayUtils";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { Color, DynamicThemeStyleSheet, ThemeColor, ThemeSelector } from "../../styles";
import { border, selectStyleType } from "../../utils/StyleTools";
import { RowView } from "../layout/RowView";
import { Icon } from "../Icon";
import { ThemeWrapper } from "../../theme/Theme";

export interface CheckBoxProps {
  /**
   * 是否选中复选框
   */
  value?: boolean;
  /**
   * 当前复选框在复选框组中的value，不能与其他重复
   */
  name?: string;
  /**
   * 复选框的文字
   */
  text?: string;
  /**
   * 复选框的文字
   */
  children?: string|JSX.Element;
  /**
   * 复选框的形状
   */
  shape?:"square"|"round";
  /**
   * 复选框占满整个父元素，默认否
   */
  block?: boolean,
  /**
   * 复选框按钮位置，默认在左
   */
  checkPosition?:"left"|"right";
  /**
   * 复选框未选择时的边框颜色
   */
  borderColor?: ThemeColor|undefined;
  /**
   * 复选框选中时的颜色，默认是 primary
   */
  checkColor?: ThemeColor|undefined;
  /**
   * 复选框按钮大小，默认是 20dp
   */
  checkSize?: number|undefined;
  /**
   * 复选框的颜色，默认是 primary
   */
  color?: ThemeColor|undefined;
  /**
   * 是否禁用复选框
   */
  disabled?: boolean;
  /**
   * 选择勾的图标
   */
  icon?: string;
  /**
   * 文字颜色
   */
  textColor?: ThemeColor;
  /**
   * 自定义文字样式
   */
  textStyle?: TextStyle;
  /**
   * 自定义样式
   */
  style?: ViewStyle;
  /**
   * 用户更改选中时发生
   */
  onValueChange?: (value: boolean) =>  void;
  /**
   * 自定义渲染复选框按钮的回调
   */
  renderButton?: (on: boolean) => JSX.Element;
}

/**
 * 复选框
 */
export const CheckBox = ThemeWrapper(function (props: CheckBoxProps) {

  function switchOn() {
    if (props.disabled)
      return;
    if (typeof props.onValueChange === 'function')
      props.onValueChange(!props.value);
  }

  const text = props.children || props.text;
  const {
    checkPosition = 'left',
    disabled = false,
    borderColor,
    checkColor,
    value = false,
    block = false,
    color,
    shape,
    checkSize,
    style = {},
  } = props;

  function renderButtonStub() {
    return (
      props.renderButton ?
        props.renderButton(value) :
        <CheckBoxDefaultButton
          on={value}
          disabled={disabled}
          shape={shape}
          size={checkSize}
          color={ThemeSelector.color(disabled === true ? Color.border : color)}
          borderColor={ThemeSelector.color(borderColor || Color.border)}
          checkColor={ThemeSelector.color(disabled === true ? Color.textSecond : checkColor)}
          icon={props.icon} />
      );
  }

  return (
    <RowView touchable activeOpacity={0.85} onPress={switchOn} style={[ block ? styles.checkBoxFull : styles.checkBox, style ]} center>
      { checkPosition === 'left' ? renderButtonStub() : <></> }
      {
        (typeof text === 'string' && text) ?
          (<Text style={[
            styles.checkText,
            props.textStyle,
            {
              color: ThemeSelector.color(props.disabled === true ? Color.textSecond : (props.textColor || Color.text)),
              display: CheckTools.isNullOrEmpty(text) ? 'none' : 'flex',
            },
          ]}>{text}</Text>) :
          (text as JSX.Element || <></>)
      }
      { checkPosition === 'right' ? renderButtonStub() : <></> }
    </RowView>
  );
});

export interface CheckBoxGroupProps {
  /**
   * 当前复选框组选中的项目
   */
  value?: string[];
  /**
   * 是否禁用整组复选框，设置后会禁用全部复选框。
   */
  disabled?: boolean;
  /**
   * 用户更改选中时发生
   */
  onValueChange?: (value: string[]) =>  void;
  /**
   * 渲染子check事件，这通常可以用于check不在一级子的情况, 需要使用 wapperCheckBox 包装你的 复选框，才能使它相应数据<br/>
   * 例如：
   * ```
   * <CheckBoxGroup value={checked4} onValueChange={(v) => setChecked4(v)} renderChildren={(wrapper) => ([
   *   <Cell key="1" title="复选框 1" center renderRight={() => wrapper(<CheckBox name="0" />)} />,
   *   <Cell key="2" title="复选框 2" center renderRight={() => wrapper(<CheckBox name="1" />)} />,
   *   <Cell key="3" title="复选框 2" center renderRight={() => wrapper(<CheckBox name="2" />)} />,
   * ])} />
   * ```
   */
  renderChildren?: (wapperCheckBox: (check: JSX.Element) => JSX.Element) => JSX.Element|JSX.Element[];

  children?: JSX.Element[];
}
export interface CheckBoxGroupToggleOptions {
  /**
   * 是否是选中
   */
  checked: boolean,
  /**
   * 是否跳过禁用的复选框
   */
  skipDisabled: boolean,
}

/**
 * 复选框组
 */
export class CheckBoxGroup extends React.PureComponent<CheckBoxGroupProps> {


  onValueChange(name: string|undefined, v: boolean) {
    const valueNew = (this.props.value || []).concat();
    if (v)
      ArrayUtils.addOnce(valueNew, name as string);
    else
      ArrayUtils.remove(valueNew, name as string);
    if (typeof this.props.onValueChange === 'function')
      this.props.onValueChange(valueNew);
  }

  /**
   * 切换所有复选框
   * @param options 传 true 为选中，false 为取消选中，不传参为取反
   */
  toggleAll(options?: boolean|undefined|CheckBoxGroupToggleOptions) {
    const value = this.props.value;
    const onValueChange = this.props.onValueChange;
    if (typeof options === 'undefined') {
      //反选
      const valueNew = this.allCheckNames.filter((i) => value ? !ArrayUtils.contains(value, i) : false);
      if (typeof onValueChange === 'function')
        onValueChange(valueNew);
    } else if (typeof options === 'boolean') {
      //选中/取消选中
      const valueNew = options === true ? this.allCheckNames.concat() : [];
      if (typeof onValueChange === 'function')
        onValueChange(valueNew);
    } else if (typeof options === 'object') {
      //根据参数，选择时跳过禁用的选项
      const valueNew = this.allCheckNames.filter((i, index) => {
        if (options.skipDisabled && this.allCheckDisabled[index])
          return value ? ArrayUtils.contains(value, i) : false;
        return options.checked;
      });
      if (typeof onValueChange === 'function')
        onValueChange(valueNew);
    }
  }

  allCheckNames = [] as string[];
  allCheckDisabled = [] as boolean[];

  render(): React.ReactNode {
    ArrayUtils.empty(this.allCheckNames);
    ArrayUtils.empty(this.allCheckDisabled);

    const disabled = this.props.disabled === true;
    const checkArrays = [] as JSX.Element[];
    const value = this.props.value as string[];

    this.props.children?.forEach((item) => {
      const name = item.props.name;
      if (name) {
        checkArrays.push(
          React.cloneElement(
            item,
            {
              key: name,
              value: value && ArrayUtils.contains(value, name),
              disabled: disabled ? true : undefined,
              onValueChange: (v) => this.onValueChange(name, v),
            } as CheckBoxProps
          )
        );
        this.allCheckNames.push(name);
        this.allCheckDisabled.push(disabled || item.props.disabled === true);
      }
    });

    if (this.props.renderChildren) {
      const ret = this.props.renderChildren((check) => {
        const name = check.props.name;

        this.allCheckNames.push(name);
        this.allCheckDisabled.push(disabled || check.props.disabled === true);

        return React.cloneElement(
          check,
          {
            key: name,
            value: ArrayUtils.contains(value, name),
            disabled: disabled ? true : undefined,
            onValueChange: (v) => this.onValueChange(name, v),
          } as CheckBoxProps
        );
      });
      if (ret instanceof Array)
        checkArrays.push(...ret);
      else
        checkArrays.push(ret);
    }

    return (
      <>{checkArrays}</>
    );
  }
}

export interface CheckBoxDefaultButtonProps {
  on?: boolean;
  borderColor?: string|undefined;
  checkColor?: string|undefined;
  color?: string|undefined;
  size?: number|undefined;
  iconSize?: number|undefined;
  icon?: string;
  disabled?: boolean;
  style?: ViewStyle,
  shape?: "square"|"round";
}

/**
 * 默认的复选框按钮样式
 */
export const CheckBoxDefaultButton = ThemeWrapper(function (props: CheckBoxDefaultButtonProps) {
  const {
    size = 16,
    iconSize = 14,
    shape = 'round',
    on,
    disabled = false,
    color = Color.primary,
    borderColor = Color.border,
    checkColor = Color.white,
    icon = 'check-mark',
    style,
  } = props;

  return (
    <View style={[
      styles.checkButtonOutView,
      selectStyleType(shape, 'round', {
        round: { borderRadius: size / 2 },
        square: { borderRadius: 0 },
      }),
      {
        width: size,
        height: size,
        borderColor: ThemeSelector.color((on && disabled !== true) ? color : borderColor),
      },
      style,
    ]}>
      {
        on ?
          <View style={[
            styles.checkButtonInnerView,
            {
              width: size - 2, //减去边框
              height: size - 2,
              backgroundColor: ThemeSelector.color(color),
            },
          ]}>
            <Icon icon={icon} color={checkColor} size={iconSize} />
          </View> :
          <></>
      }
    </View>
  );
});

const styles = DynamicThemeStyleSheet.create({
  checkBox: {
    alignSelf: 'flex-start',
    marginHorizontal: 4,
  },
  checkBoxFull: {
    alignSelf: 'stretch',
    width: '100%',
    justifyContent: 'space-between',
    marginHorizontal: 0,
  },
  checkButtonOutView: {
    overflow: 'hidden',
    marginRight: 4,
    ...border(1, 'solid', Color.primary, true),
  },
  checkButtonInnerView: {
    textAlign: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontSize: 14,
  },
});

