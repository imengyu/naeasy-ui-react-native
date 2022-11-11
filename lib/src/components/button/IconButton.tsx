import React from 'react';
import { ViewStyle } from 'react-native';
import { TouchableHighlight } from "react-native";
import { selectStyleType } from '../../utils/StyleTools';
import { Color, PressedColor, ThemeColor, ThemeSelector } from "../../styles";
import { Icon, IconProp } from "../Icon";
import { ImageButtonShapeType } from './ImageButton';
import { ThemeWrapper } from '../../theme/Theme';

export interface IconButtonProps extends IconProp {
  /**
   * 显示图标
   */
  icon?: string;
  /**
   * 按钮按下时的背景颜色
   */
  pressedBackgroundColor?: ThemeColor,
  /**
   * 按钮边距
   */
  padding?: number,
  /**
   * 按钮形状预设
   */
  shape?: ImageButtonShapeType;
  /**
   * 按钮点击事件
   */
  onPress?: () => void;
  /**
   * 按钮的样式
   */
  buttonStyle?: ViewStyle;
  /**
   * 是否禁用
   */
  disabled?: boolean|undefined;
}

/**
 * 显示图标的按钮
 *
 * 当前项目使用图标库, 图标的名字请在开发者》测试页面》组件》Icon页面中查看
 */
export const IconButton = ThemeWrapper(function (props: IconButtonProps) {
  return (
    <TouchableHighlight
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: props.padding,
        ...selectStyleType(props.shape, 'round', {
          "round": {
            borderRadius: 50,
          },
          "custom": {},
          "square-full": {
            height: '100%',
            aspectRatio: 1,
            borderRadius: 0,
          },
        }),
        ...props.buttonStyle,
        opacity: props.disabled ? 0.3 : 1,
      }}
      underlayColor={ThemeSelector.color(props.pressedBackgroundColor || PressedColor(Color.white))}
      onPress={props.disabled ? undefined : props.onPress}
    >
      { props.icon ? <Icon {...props} /> : <></> }
    </TouchableHighlight>
  );
});
