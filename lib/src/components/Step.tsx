import { ThemeColor } from "../styles";
import { IconProp } from "./Icon";

export interface StepProps {
  /**
   * 步骤条的方向
   */
  direction?: 'vertical'|'horizontal',
  /**
   * 激活时的颜色，默认 Color.primary
   */
  activeColor?: ThemeColor,
  /**
   * 未激活时的颜色，默认 Color.border
   */
  inactiveColor?: ThemeColor,
  /**
   * 文字颜色，默认 Color.text
   */
  textColor?: ThemeColor,
  /**
   * 步骤子组件，请使用 StepItem
   */
  children?: JSX.Element[]|JSX.Element;
}

export interface StepItemProps {
  /**
   * 激活时的颜色，默认 Color.primary
   */
  activeColor?: ThemeColor,
  /**
   * 未激活时的颜色，默认 Color.border
   */
  inactiveColor?: ThemeColor,
  /**
   * 文字颜色，默认 Color.text
   */
  textColor?: ThemeColor,
  /**
   * 自定义激活状态图标
   */
  activeIcon?: string,
  /**
   * 自定义未激活状态图标
   */
  inactiveIcon?: string,
  /**
   * 自定义已完成步骤对应的底部图标，优先级高于 `inactiveIcon`
   */
  finishIcon?: string,
  /**
   * 图标的附加属性
   */
  iconProps?: IconProp;
  /**
   * 自定义渲染
   */
  renderItem?: () => JSX.Element;
}

/**
 * 步骤条组件
 */
export function StepItem(props: StepItemProps) {
  return (
    <View>

    </View>
  );
}

/**
 * 步骤条组件
 */
export function Step(props: StepProps) {
  return (
    <View>

    </View>
  );
}
