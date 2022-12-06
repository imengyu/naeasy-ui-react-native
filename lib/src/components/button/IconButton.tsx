import React from 'react';
import { ImageSourcePropType, ViewStyle } from 'react-native';
import { TouchableHighlight } from "react-native";
import { selectStyleType } from '../../utils/StyleTools';
import { Color, PressedColor } from "../../styles";
import { Icon, IconProp } from "../basic/Icon";
import { ImageButtonShapeType } from './ImageButton';
import { ThemeColor, useThemeContext } from '../../theme/Theme';

export interface IconButtonProps extends IconProp {
  /**
   * 显示图标
   */
  icon?: string | ImageSourcePropType;
  /**
   * 按钮按下时的背景颜色
   * @default PressedColor(Color.white)
   */
  pressedBackgroundColor?: ThemeColor,
  /**
   * 按钮边距
   */
  padding?: number,
  /**
   * 按钮形状预设
   * @default round
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
   * @default false
   */
  disabled?: boolean|undefined;
}

/**
 * 显示图标的按钮。图标同 Icon 组件。
 */
export function IconButton(props: IconButtonProps) {

  const themeContext = useThemeContext();

  return (
    <TouchableHighlight
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: props.padding,
        ...selectStyleType(props.shape, 'round', {
          "round": {
            borderRadius: themeContext.getThemeVar('IconButtonRoundBorderRadius', 50),
          },
          "custom": {},
          "square-full": {
            height: '100%',
            aspectRatio: 1,
            borderRadius: 0,
          },
        }),
        ...props.buttonStyle,
        opacity: props.disabled ? themeContext.getThemeVar('IconButtonDisabledOpacity', 0.4) : 1,
      }}
      underlayColor={themeContext.resolveThemeColor(
        props.pressedBackgroundColor,
        themeContext.getThemeVar('IconButtonPressedColor', PressedColor(Color.white))
      )}
      onPress={props.disabled ? undefined : props.onPress}
    >
      { props.icon ? <Icon {...props} /> : <></> }
    </TouchableHighlight>
  );
}
