import { selectStyleType } from '../../utils/StyleTools';
import React from 'react';
import { ViewStyle } from 'react-native';
import { TouchableHighlight } from "react-native";
import { PressedColor } from "../../styles/ColorStyles";
import { Iconfont, IconfontProp } from "../Iconfont";
import { ImageButtonShapeType } from './ImageButton';

export interface IconButtonProps extends IconfontProp {
  /**
   * 显示图标
   */
  icon?: string;
  /**
   * 按钮按下时的背景颜色
   */
  pressedBackgroundColor?: string,
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
export function IconButton(props: IconButtonProps) {
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
      underlayColor={props.pressedBackgroundColor || PressedColor.light}
      onPress={props.disabled ? undefined : props.onPress}
    >
      <Iconfont {...props} />
    </TouchableHighlight>
  );
}
