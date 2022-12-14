import React, { useMemo, useState } from 'react';
import CheckTools from '../../utils/CheckTools';
import { ActivityIndicator, ColorValue, ImageSourcePropType, StyleSheet, Text, TextStyle, TouchableHighlight, ViewProps, ViewStyle } from 'react-native';
import { Color, PressedColor } from '../../styles';
import { selectObjectByType, selectStyleType, styleConfigPadding } from '../../utils/StyleTools';
import { Icon, IconProp } from '../basic/Icon';
import { RowView } from '../layout/RowView';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicColorVar, DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';

type ButtomType = 'default'|'primary'|'success'|'warning'|'danger'|'custom'|'text';
type ButtomSizeType = 'small'|'medium'|'large'|'larger'|'mini';

export interface ButtonProp {
  /**
   * 按钮文字
   */
  text?: string,
  /**
   * 按钮支持 default、primary、success、warning、danger、custom 自定义 六种类型
   * @default 'default'
   */
  type?: ButtomType,
  /**
   * 占满父级主轴
   * @default false
   */
  block?: boolean,
  /**
   * 通过 plain 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。
   * @default false
   */
  plain?: boolean,
  /**
   * 通过 loading 属性设置按钮为加载状态，加载状态下默认会隐藏按钮文字，可以通过 loadingText 设置加载状态下的文字。
   * @default false
   */
  loading?: boolean,
  /**
   * 加载状态下的文字。
   * @default false
   */
  loadingText?: string,
  /**
   * 加载状态圆圈颜色
   */
  loadingColor?: ThemeColor,
  /**
   * 按钮形状 通过 square 设置方形按钮，通过 round 设置圆形按钮。
   * @default 'round'
   */
  shape?: 'square'|'round',
  /**
   * 左侧图标。支持 Icon 组件里的所有图标，也可以传入图标的图片 URL（http/https）。
   */
  icon?: string|ImageSourcePropType,
  /**
   * 当使用图标时，左侧图标的附加属性
   */
  iconProps?: IconProp;
  /**
   * 右侧图标。支持 Icon 组件里的所有图标，也可以传入图标的图片 URL（http/https）。
   */
  rightIcon?: string|ImageSourcePropType,
  /**
   * 当使用图标时，右侧图标的附加属性
   */
  rightIconProps?: IconProp;
  /**
   * 是否可以点击
   * @default true
   */
  touchable?: boolean,
  /**
   * 当按扭为round圆形按扭时的圆角大小。
   * @default 5
   */
  radius?: number,
  /**
   * 按钮尺寸. 支持 large、medium、small、mini 四种尺寸。
   * @default 'medium'
   */
  size?: ButtomSizeType,
  /**
   * 通过 color 属性可以自定义按钮的背景颜色，仅在 type 为 `custom` 时有效
   * @default Color.grey
   */
  color?: ThemeColor;
  /**
   * 按钮文字的颜色。
   */
  textColor?: ThemeColor;
  /**
   * 按下时按钮文字的颜色。
   */
  pressedTextColor?: ThemeColor;
  /**
   * 按钮文字的样式。
   */
  textStyle?: TextStyle;
  /**
   * 按下时的颜色，仅在 type 为 `custom` 时有效
   * @default PressedColor(Color.primary)
   */
  pressedColor?: ThemeColor;
  /**
   * 禁用时的颜色，仅在 type 为 `custom` 时有效
   * @default Color.grey
   */
  disabledColor?: ThemeColor;
  /**
   * 自定义样式
   */
  style?: ViewStyle,
  /**
   * 按扭的文字，等同于 text 属性
   */
  children?: string;
  /**
   * 强制控制按钮的边距
   * * 如果是数字，则设置所有方向边距
   * * 两位数组 [vetical,horizontal]
   * * 四位数组 [top,right,down,left]
   */
  padding?: number|number[],
  /**
   * 外层容器参数
   */
  viewProps?: ViewProps,
  /**
   * 自定义图标渲染
   */
  renderIcon?: (isLeft: boolean, name: string|ImageSourcePropType|undefined) => JSX.Element,
  /**
   * 点击事件
   */
  onPress?: () => void,
}

const styles = StyleSheet.create({
  view: {
    minWidth: 50,
    width: 'auto',
  },
  plainButtonDefault: {
    borderWidth: DynamicVar('ButtonBorderWidth', 1.5),
    borderColor: DynamicColorVar('ButtonPlainDefaultBorderColor', Color.border),
    color: DynamicColorVar('ButtonPlainDefaultColor', Color.text),
  },
  plainButtonPrimary: {
    borderWidth: DynamicVar('ButtonBorderWidth', 1.5),
    borderColor: DynamicColorVar('ButtonPlainPrimaryBorderColor', Color.primary),
    color: DynamicColorVar('ButtonPlainPrimaryColor', Color.primary),
  },
  plainButtonSuccess: {
    borderWidth: DynamicVar('ButtonBorderWidth', 1.5),
    borderColor: DynamicColorVar('ButtonPlainSuccessBorderColor', Color.success),
    color: DynamicColorVar('ButtonPlainSuccessColor', Color.success),
  },
  plainButtonWarning: {
    borderWidth: DynamicVar('ButtonBorderWidth', 1.5),
    borderColor: DynamicColorVar('ButtonPlainWarningBorderColor', Color.warning),
    color: DynamicColorVar('ButtonPlainWarningColor', Color.warning),
  },
  plainButtonDanger: {
    borderWidth: DynamicVar('ButtonBorderWidth', 1.5),
    borderColor: DynamicColorVar('ButtonPlainDangerBorderColor', Color.danger),
    color: DynamicColorVar('ButtonPlainDangerColor', Color.danger),
  },
  buttonBlock: {
    alignSelf: 'stretch',
  },
  buttonAuto: {
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: 'auto',
  },
  buttonSizeLarger: {
    paddingVertical: DynamicVar('ButtonPaddingVerticalLarger', 20),
    paddingHorizontal: DynamicVar('ButtonPaddingHorizontalLarger', 30),
  },
  buttonSizeLarge: {
    paddingVertical: DynamicVar('ButtonPaddingVerticalLarge', 15),
    paddingHorizontal: DynamicVar('ButtonPaddingHorizontalLarge', 20),
  },
  buttonSizeMedium: {
    paddingVertical: DynamicVar('ButtonPaddingVerticalMedium', 10),
    paddingHorizontal: DynamicVar('ButtonPaddingHorizontalMedium', 15),
  },
  buttonSizeSmall: {
    paddingVertical: DynamicVar('ButtonPaddingVerticalSmall', 5),
    paddingHorizontal: DynamicVar('ButtonPaddingHorizontalSmall', 10),
  },
  buttonSizeMini: {
    paddingVertical: DynamicVar('ButtonPaddingVerticalMini', 0),
    paddingHorizontal: DynamicVar('ButtonPaddingHorizontalMini', 0),
  },
  buttonPrimary: {
    backgroundColor: DynamicColorVar('ButtonPrimaryBackgroundColor', Color.primary),
    color: DynamicColorVar('ButtonPrimaryColor', Color.white),
  },
  buttonSuccess: {
    backgroundColor: DynamicColorVar('ButtonSuccessBackgroundColor', Color.success),
    color: DynamicColorVar('ButtonSuccessColor', Color.white),
  },
  buttonWarning: {
    backgroundColor: DynamicColorVar('ButtonWarningBackgroundColor', Color.warning),
    color: DynamicColorVar('ButtonWarningColor', Color.white),
  },
  buttonDanger: {
    backgroundColor: DynamicColorVar('ButtonDangerBackgroundColor', Color.danger),
    color: DynamicColorVar('ButtonDangerColor', Color.white),
  },
});

/**
 * 按钮组件。
 */
export function Button(props: ButtonProp) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    loading = false,
    loadingText,
    children,
    touchable = true,
    text,
    textColor,
    pressedTextColor,
    color = Color.primary,
    pressedColor = PressedColor(Color.primary),
    loadingColor = undefined,
    disabledColor = Color.grey,
    plain = false,
    type = 'default',
    size = 'medium',
    block = false,
    radius = 5,
    shape = "round",
    padding,
    icon,
    iconProps,
    rightIcon,
    rightIconProps,
    viewProps,
    textStyle,
    style,
    renderIcon,
    onPress,
  } = props;

  const FonstSizes = {
    mini: themeContext.getThemeVar('ButtonMiniFonstSize', 10.5),
    small: themeContext.getThemeVar('ButtonSmallFonstSize', 12),
    medium: themeContext.getThemeVar('ButtonMediumFonstSize', 14),
    large: themeContext.getThemeVar('ButtonLargeFonstSize', 20),
    larger: themeContext.getThemeVar('ButtonLargerFonstSize', 28),
  };

  const themeVars = themeContext.getThemeVars({
    ButtonBorderWidth: 1.5,
    ButtonDisableOpacity: 0.5,
  });

  const [ pressed, setPressed ] = useState(true);

  //按钮样式生成
  const currentStyle = useMemo(() => {
    const colorStyle = selectStyleType<ViewStyle|TextStyle, ButtomType>(type, 'default', plain ? {
      default: themeStyles.plainButtonDefault,
      primary: themeStyles.plainButtonPrimary,
      success: themeStyles.plainButtonSuccess,
      warning: themeStyles.plainButtonWarning,
      danger: themeStyles.plainButtonDanger,
      custom: {
        borderWidth: themeVars.ButtonBorderWidth,
        borderColor: themeContext.resolveThemeColor(color),
        color: themeContext.resolveThemeColor(color),
      },
      text: {
        color: themeContext.resolveThemeColor(color),
      },
    } : {
      default: themeStyles.plainButtonDefault,
      primary: themeStyles.buttonPrimary,
      success: themeStyles.buttonSuccess,
      warning: themeStyles.buttonWarning,
      danger: themeStyles.buttonDanger,
      custom: {
        backgroundColor: themeContext.resolveThemeColor(touchable ? color : disabledColor),
        color: themeContext.resolveThemeColor(textColor),
      },
      text: {
        color: themeContext.resolveThemeColor(textColor),
      },
    });

    const styleArray = [
      colorStyle,
      selectStyleType<ViewStyle, ButtomSizeType>(size, 'medium', {
        large: themeStyles.buttonSizeLarge,
        larger: themeStyles.buttonSizeLarger,
        medium: themeStyles.buttonSizeMedium,
        small: themeStyles.buttonSizeSmall,
        mini: themeStyles.buttonSizeMini,
      }),
      block ? themeStyles.buttonBlock : themeStyles.buttonAuto,
    ] as ViewStyle[];

    const speicalStyle = {
      opacity: touchable ? 1 : themeVars.ButtonDisableOpacity,
      borderRadius: shape === 'round' ? radius : 0,
    } as ViewStyle;

    //自定义状态下的禁用颜色
    if (disabledColor && !touchable && type === 'custom')
      speicalStyle.backgroundColor = themeContext.resolveThemeColor(disabledColor);

    //内边距样式的强制设置
    styleConfigPadding(speicalStyle, padding);

    styleArray.push(speicalStyle);

    return {
      color: (colorStyle as TextStyle).color,
      style: styleArray,
    };
  }, [
    block, color, disabledColor, padding, plain,
    radius, shape, size, textColor, touchable, type,
    themeContext, themeStyles, themeVars,
  ]);


  //渲染样式
  function doRenderIcon(left: boolean, nowColor: ColorValue|undefined) {
    const currentIcon = left ? icon : rightIcon;

    if (renderIcon)
      return renderIcon(left, currentIcon);
    if (left && loading)
      return <ActivityIndicator
        size="small"
        color={themeContext.resolveThemeColor(loadingColor) || currentStyle.color}
        style={{
          marginRight: CheckTools.isNullOrEmpty(currentText) ? undefined : 5,
        }}
      />;

    return currentIcon ? <Icon key={left ? 'leftIcon' : 'rightIcon'}
      icon={currentIcon}
      style={{
        marginRight: left ? (CheckTools.isNullOrEmpty(currentText) ? undefined : 5) : undefined,
        marginLeft: left ? undefined : (CheckTools.isNullOrEmpty(currentText) ? undefined : 5),
        fontSize: selectStyleType(size, 'medium', FonstSizes),
      }}
      color={nowColor as string}
      {...(left ? iconProps : rightIconProps)}
    /> : <></>;
  }

  const currentText = loading ? (loadingText || children || text) : children || text;
  const textColorFinal = (
    pressed ?
      themeContext.resolveThemeColor(pressedTextColor) :
      themeContext.resolveThemeColor(textColor)
  ) || currentStyle.color;

  return (
    <TouchableHighlight
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={(touchable === false || loading === true) ? undefined : onPress}
      underlayColor={type === 'custom' ? themeContext.resolveThemeColor(pressedColor) :
        themeContext.resolveThemeColor((plain || type === 'text') ?
          PressedColor(Color.notice) :
          PressedColor(selectObjectByType(type, 'notice', Color)))
      }
      style={[
        themeStyles.view,
        currentStyle.style,
        style,
      ]}
      { ...viewProps }
    >
      <RowView center>
        {
          //左图标
          doRenderIcon(true, currentStyle.color)
        }
        {/* 文本 */}
        <Text style={[
          {
            color: textColorFinal,
            fontSize: selectStyleType(size, 'medium', FonstSizes),
          },
          type === 'text' ? { fontWeight: 'bold' } : {},
          textStyle,
        ]}>{ currentText }</Text>
        {
          //右图标
          doRenderIcon(false, currentStyle.color)
        }
      </RowView>
    </TouchableHighlight>
  );
}
