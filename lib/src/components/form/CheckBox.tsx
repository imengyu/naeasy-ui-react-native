import React from "react";
import CheckTools from "../../utils/CheckTools";
import ArrayUtils from "../../utils/ArrayUtils";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { Color, DynamicThemeStyleSheet, ThemeColor, ThemeSelector } from "../../styles";
import { border, selectStyleType } from "../../utils/StyleTools";
import { RowView } from "../layout/RowView";
import { Icon } from "../basic/Icon";
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

  const text = props.children || props.text;
  const {
    checkPosition = 'left',
    disabled = false,
    borderColor,
    checkColor,
    name,
    value: valueProp = false,
    block = false,
    color,
    shape = 'round',
    checkSize,
    style = {},
    onValueChange,
  } = props;


  function renderButtonStub(value: boolean) {
    return (
      props.renderButton ?
        props.renderButton(value) :
        <CheckBoxDefaultButton
          on={value}
          disabled={disabled}
          shape={shape}
          size={checkSize}
          checkedBackgroundColor={ThemeSelector.color(color)}
          checkedBorderColor={ThemeSelector.color(color)}
          borderColor={ThemeSelector.color(borderColor)}
          checkColor={ThemeSelector.color(checkColor)}
          icon={props.icon} />
      );
  }

  return (
    <CheckBoxGroupContext.Consumer>{context => {

      let value = valueProp;

      if (context) {
        if (!name) {
          console.log('CheckBox in CheckBoxGroup need name prop!');
          return;
        }
        //Set value from parent
        value = context.value && context.value.indexOf(name) >= 0;

        //Register to CheckBoxGroup
        context.onAddItem(name, disabled);
      }

      function switchOn() {
        if (disabled)
          return;
        if (context)
          context.onValueChange(name, !value);
        else if (typeof onValueChange === 'function')
          onValueChange(!value);
      }

      return (
        <RowView
          touchable
          activeOpacity={0.75}
          onPress={disabled ? undefined : switchOn}
          style={[ block ? styles.checkBoxFull : styles.checkBox, style ]}
          center
        >
          { checkPosition === 'left' ? renderButtonStub(value) : <></> }
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
          { checkPosition === 'right' ? renderButtonStub(value) : <></> }
        </RowView>
      );
    }}</CheckBoxGroupContext.Consumer>
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

  children?: JSX.Element[]|React.ReactElement;
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

export interface CheckBoxGroupContextInfo {
  value: string[],
  onValueChange: (name: string|undefined, v: boolean) => void;
  onAddItem: (name: string, disabled: boolean) => void;
}
export const CheckBoxGroupContext = React.createContext<CheckBoxGroupContextInfo|null>(null);

/**
 * 复选框组
 */
export class CheckBoxGroup extends React.PureComponent<CheckBoxGroupProps> {


  onValueChange(name: string|undefined, checked: boolean) {
    const valueNew = (this.props.value || []).concat();
    if (checked)
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
    return (
      <CheckBoxGroupContext.Provider value={{
        value: this.props.value as string[],
        onValueChange: this.onValueChange.bind(this),
        onAddItem: (name: string, disabled: boolean) => {
          this.allCheckNames.push(name);
          this.allCheckDisabled.push(disabled);
        },
      }}>
        { this.props.children }
      </CheckBoxGroupContext.Provider>
    );
  }
}

export interface CheckBoxDefaultButtonProps {
  /**
   * 是否处于激活状态
   */
  on?: boolean;
  /**
   * 未选中状态下边框颜色。默认：
   */
  borderColor?: string|undefined;
  /**
   * 选中状态下边框颜色。默认：
   */
  checkedBorderColor?: string|undefined;
  /**
   * 禁用并且未选中状态下边框颜色。默认：
   */
  disableBorderColor?: string|undefined;
  /**
   * 禁用并且选中状态下边框颜色。默认：
   */
  disableCheckedBorderColor?: string|undefined;
  /**
   * 图标颜色。默认：
   */
  checkColor?: string|undefined;
  /**
   * 禁用状态下图标颜色。默认：
   */
  disableCheckColor?: string|undefined;
  /**
   * 未选中状态下按钮背景颜色。默认：
   */
  backgroundColor?: string|undefined;
  /**
   * 且选中状态下按钮背景颜色。默认：
   */
  checkedBackgroundColor?: string|undefined;
  /**
   * 禁用并且未选中状态下按钮背景颜色。默认：
   */
  disableBackgroundColor?: string|undefined;
  /**
   * 禁用并且选中状态下按钮背景颜色。默认：
   */
  disableCheckedBackgroundColor?: string|undefined;
  /**
   * 按钮大小。默认：18
   */
  size?: number|undefined;
  /**
   * 图标大小。默认：15
   */
  iconSize?: number|undefined;
  /**
   * 边框粗细。默认：1
   */
  borderWidth?: number|undefined;
  /**
   * 图标。默认：check-mark
   */
  icon?: string;
  /**
   * 是否处于禁用状态。默认：false
   */
  disabled?: boolean;
  /**
   * 自定义样式
   */
  style?: ViewStyle,
  /**
   * 这个按钮的形状。默认：round
   * * square：正方形
   * * round：圆形
   */
  shape?: "square"|"round";
  /**
   * 这个按钮的显示模式。默认：icon
   * * icon：多选按钮显示的图标
   * * radio：单选按钮显示的圆形
   */
  type?: "icon"|"radio";
}

/**
 * 默认的复选框按钮样式
 */
export const CheckBoxDefaultButton = ThemeWrapper(function (props: CheckBoxDefaultButtonProps) {
  const {
    size = 18,
    iconSize = 15,
    borderWidth = 1,
    disabled = false,
    shape = 'round',
    type = 'icon',
    icon = 'check-mark',
    style,
    on = false,

    borderColor = Color.border,
    checkedBorderColor = Color.primary,
    disableBorderColor = Color.grey,
    disableCheckedBorderColor = Color.grey,
    checkColor = Color.white,
    disableCheckColor = Color.grey,
    backgroundColor = Color.white,
    checkedBackgroundColor = Color.primary,
    disableBackgroundColor = Color.background,
    disableCheckedBackgroundColor = Color.background,
  } = props;

  return (
    <View style={[
      styles.checkButtonOutView,
      selectStyleType(shape, 'round', {
        round: { borderRadius: size },
        square: { borderRadius: 0 },
      }),
      {
        width: size,
        height: size,
        borderWidth: borderWidth,
        borderColor: ThemeSelector.color(disabled ?
          (on ? disableCheckedBorderColor : disableBorderColor) :
          (on ? checkedBorderColor : borderColor)
        ),
        backgroundColor: ThemeSelector.color(disabled ?
          (on ? disableCheckedBackgroundColor : disableBackgroundColor) :
          (on ? checkedBackgroundColor : backgroundColor)
        ),
      },
      style,
    ]}>
      {
        on ? (
          type === 'icon' ?
            <Icon icon={icon} color={disabled ? disableCheckColor : checkColor} size={iconSize} /> :
            <View style={{
              borderRadius: iconSize,
              width: iconSize, height: iconSize,
              backgroundColor: ThemeSelector.color(disabled ? disableCheckColor : checkColor),
            }} />
        ) : <></>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    ...border(1, 'solid', Color.primary, true),
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

