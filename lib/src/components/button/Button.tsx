import React, { useCallback, useEffect, useRef } from 'react';
import CheckTools from '../../utils/CheckTools';
import { ActivityIndicator, ColorValue, ImageSourcePropType, Text, TextStyle, TouchableHighlight, ViewProps, ViewStyle } from 'react-native';
import { ThemeSelector, Color, ThemeColor, PressedColor, SpaceDefines, DynamicThemeStyleSheet, DynamicColor } from '../../styles';
import { FonstSizes } from '../../styles/TextStyles';
import { border, paddingVH, selectObjectByType, selectStyleType, styleConfigPadding } from '../../utils/StyleTools';
import { Icon, IconProp } from '../basic/Icon';
import { RowView } from '../layout/RowView';
import { ThemeWrapper } from '../../theme/Theme';

type ButtomType = 'default'|'primary'|'success'|'warning'|'danger'|'custom'|'text';
type ButtomSizeType = 'small'|'medium'|'large'|'larger'|'mini';

export interface ButtonProp {
  /**
   * 按钮文字
   */
  text?: string,
  /**
   * 按钮支持 default、primary、success、warning、danger、custom 自定义 六种类型，默认为 default
   */
  type?: ButtomType,
  /**
   * 占满父级主轴。默认否
   */
  block?: boolean,
  /**
   * 通过 plain 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。
   */
  plain?: boolean,
  /**
   * 通过 loading 属性设置按钮为加载状态，加载状态下默认会隐藏按钮文字，可以通过 loadingText 设置加载状态下的文字。
   */
  loading?: boolean,
  /**
   * 加载状态下的文字。
   */
  loadingText?: string,
  /**
   * 加载状态圆圈颜色
   */
  loadingColor?: ThemeColor,
  /**
   * 按钮形状 通过 square 设置方形按钮，通过 round 设置圆形按钮。默认：round
   */
  shape?: 'square'|'round',
  /**
   * 左侧图标。支持 IconFont 组件里的所有图标，也可以传入图标的图片 URL（http/https）。
   */
  icon?: string|ImageSourcePropType,
  /**
   * 当使用图标时，左侧图标的附加属性
   */
  iconProps?: IconProp;
  /**
   * 右侧图标。支持 IconFont 组件里的所有图标，也可以传入图标的图片 URL（http/https）。
   */
  rightIcon?: string|ImageSourcePropType,
  /**
   * 当使用图标时，右侧图标的附加属性
   */
  rightIconProps?: IconProp;
  /**
   * 是否可以点击
   */
  touchable?: boolean,
  /**
   * 当按扭为round圆形按扭时的圆角大小。默认：5
   */
  radius?: number,
  /**
   * 按钮尺寸. 支持 large、normal、small、mini 四种尺寸，默认为 normal。
   */
  size?: ButtomSizeType,
  /**
   * 通过 color 属性可以自定义按钮的背景颜色。
   */
  color?: ThemeColor;
  /**
   * 按钮文字的颜色。
   */
  textColor?: ThemeColor;
  /**
   * 按钮文字的样式。
   */
  textStyle?: TextStyle;
  /**
   * 按下时的颜色，仅在 type 为 `custom` 时有效
   */
  pressedColor?: ThemeColor;
  /**
   * 禁用时的颜色，仅在 type 为 `custom` 时有效
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

const styles = DynamicThemeStyleSheet.create({
  view: {
    minWidth: 50,
    width: 'auto',
  },
  title: {
    fontSize: 15,
  },
  titleIcon: {
    fontSize: 18,
  },
  plainButtonDefault: {
    ...border(1, 'solid', Color.border, true),
    color: DynamicColor(Color.text),
  },
  plainButtonPrimary: {
    ...border(1, 'solid', Color.primary, true),
    color: DynamicColor(Color.primary),
  },
  plainButtonSuccess: {
    ...border(1, 'solid', Color.success, true),
    color: DynamicColor(Color.success),
  },
  plainButtonWarning: {
    ...border(1, 'solid', Color.warning, true),
    color: DynamicColor(Color.warning),
  },
  plainButtonDanger: {
    ...border(1, 'solid', Color.danger, true),
    color: DynamicColor(Color.danger),
  },
  buttonBlock: {
    alignSelf: 'stretch',
  },
  buttonAuto: {
    flex: 0,
    flexShrink: 0,
    flexGrow: 0,
  },
  buttonSizeLarger: paddingVH(SpaceDefines.button_pv_large, SpaceDefines.button_ph_large),
  buttonSizeLarge: paddingVH(SpaceDefines.button_pv_large, SpaceDefines.button_ph_large),
  buttonSizeMedium: paddingVH(SpaceDefines.button_pv_medium, SpaceDefines.button_ph_medium),
  buttonSizeSmall: paddingVH(SpaceDefines.button_pv_small, SpaceDefines.button_ph_small),
  buttonSizeMini: paddingVH(SpaceDefines.button_pv_mini, SpaceDefines.button_ph_mini),
  buttonPrimary: {
    backgroundColor: DynamicColor(Color.primary),
    color: DynamicColor(Color.white),
  },
  buttonSuccess: {
    backgroundColor: DynamicColor(Color.success),
    color: DynamicColor(Color.white),
  },
  buttonWarning: {
    backgroundColor: DynamicColor(Color.warning),
    color: DynamicColor(Color.white),
  },
  buttonDanger: {
    backgroundColor: DynamicColor(Color.danger),
    color: DynamicColor(Color.white),
  },
});

const ButtonSizeChoices = {
  large: styles.buttonSizeLarge,
  larger: styles.buttonSizeLarger,
  medium: styles.buttonSizeMedium,
  small: styles.buttonSizeSmall,
  mini: styles.buttonSizeMini,
};

/**
 * 按钮组件。
 */
export const Button = ThemeWrapper(function (props: ButtonProp) {

  const {
    loading, loadingText, children, touchable,
    text, textColor,
    color, pressedColor, loadingColor, disabledColor,
    plain = false, type, size, block = false, radius = 5, shape = "round", padding,
    icon, iconProps, rightIcon, rightIconProps,
    viewProps, textStyle, style,
    renderIcon,
    onPress,
  } = props;

  //按钮样式生成
  const getStyle = useCallback(() => {
    const colorStyle = selectStyleType<ViewStyle|TextStyle, ButtomType>(type, 'default', plain ? {
      default: styles.plainButtonDefault,
      primary: styles.plainButtonPrimary,
      success: styles.plainButtonSuccess,
      warning: styles.plainButtonWarning,
      danger: styles.plainButtonDanger,
      custom: {
        ...border(1, 'solid', ThemeSelector.color(color || Color.primary)),
        color: ThemeSelector.color(color),
      },
      text: {
        color: ThemeSelector.color(color),
      },
    } : {
      default: styles.plainButtonDefault,
      primary: styles.buttonPrimary,
      success: styles.buttonSuccess,
      warning: styles.buttonWarning,
      danger: styles.buttonDanger,
      custom: {
        backgroundColor: ThemeSelector.color(touchable === false ? disabledColor : color),
        color: ThemeSelector.color(textColor),
      },
      text: {
        color: ThemeSelector.color(textColor),
      },
    });

    const styleArray = [
      colorStyle,
      selectStyleType<ViewStyle, ButtomSizeType>(size, 'medium', ButtonSizeChoices),
      block ? styles.buttonBlock : styles.buttonAuto,
    ] as ViewStyle[];

    const speicalStyle = {
      opacity: touchable === false ? 0.5 : 1,
      borderRadius: shape === 'round' ? radius : 0,
    } as ViewStyle;

    if (disabledColor && touchable === false && type !== 'custom' && plain !== true)
      speicalStyle.backgroundColor = ThemeSelector.color(disabledColor);

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
  ]);

  const currentText = loading ? (loadingText || children || text) : children || text;
  const currentStyleObj = useRef(getStyle());

  //渲染样式
  function doRenderIcon(left: boolean, nowColor: ColorValue|undefined) {
    const currentIcon = left ? icon : rightIcon;

    if (renderIcon)
      return renderIcon(left, currentIcon);
    if (left && loading)
      return <ActivityIndicator
        size="small"
        color={ThemeSelector.color(loadingColor || Color.white) || currentStyleObj.current?.color}
        style={{
          marginRight: CheckTools.isNullOrEmpty(currentText) ? undefined : 5,
        }}
      />;

    return currentIcon ? <Icon key={left ? 'leftIcon' : 'rightIcon'}
      icon={currentIcon}
      style={{
        ...styles.titleIcon,
        marginRight: left ? (CheckTools.isNullOrEmpty(currentText) ? undefined : 5) : undefined,
        marginLeft: left ? undefined : (CheckTools.isNullOrEmpty(currentText) ? undefined : 5),
        fontSize: selectStyleType(size, 'medium', FonstSizes) + 2,
      }}
      color={nowColor as string}
      {...(left ? iconProps : rightIconProps)}
    /> : <></>;
  }

  //当对应参数更改时，重新生成样式对象
  useEffect(() => {
    currentStyleObj.current = getStyle();
  }, [ getStyle ]);

  return (
    //点击处理
    <TouchableHighlight
      onPress={(touchable === false || loading === true) ? undefined : onPress}
      underlayColor={pressedColor || type === 'custom' ? ThemeSelector.color(pressedColor || Color.default) :
        ThemeSelector.color((plain || type === 'text') ?
          PressedColor(Color.notice) :
          PressedColor(selectObjectByType(type, 'notice', Color)))
      }
      style={[
        styles.view,
        currentStyleObj.current?.style,
        style,
      ]}
      { ...viewProps }
    >
      <RowView center>
        {
          //左图标
          doRenderIcon(true, currentStyleObj.current?.color)
        }
        {/* 文本 */}
        <Text style={[
          styles.title,
          {
            color: ThemeSelector.color(textColor) || currentStyleObj.current?.color,
            fontSize: selectStyleType(size, 'medium', FonstSizes),
          },
          type === 'text' ? { fontWeight: 'bold' } : {},
          textStyle,
        ]}>{ currentText }</Text>
        {
          //右图标
          doRenderIcon(false, currentStyleObj.current?.color)
        }
      </RowView>
    </TouchableHighlight>
  );
});
