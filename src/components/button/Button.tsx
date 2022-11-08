import React from 'react';
import CheckTools from '../../utils/CheckTools';
import { ActivityIndicator, Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, TouchableHighlight, View, ViewProps, ViewStyle } from 'react-native';
import { ThemeSelector, Color, ThemeColor, PressedColor, SpaceDefines } from '../../styles';
import { FonstSizes } from '../../styles/TextStyles';
import { border, paddingVH, selectObjectByType, selectStyleType, styleConfigPadding } from '../../utils/StyleTools';
import { Iconfont } from '../Icon';
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
   * 按钮形状 通过 square 设置方形按钮，通过 round 设置圆形按钮。
   */
  shape?: 'square'|'round',
  /**
   * 左侧图标。支持 IconFont 组件里的所有图标，也可以传入图标的图片 URL（http/https）。
   */
  icon?: string|ImageSourcePropType,
  /**
   * 当使用图标字体时，图标字体的名称 TODO: Fix
   */
  iconFontFamily?: string;
  /**
   * 是否可以点击
   */
  touchable?: boolean,
  /**
   * 当按扭为round圆形按扭时的圆角大小，默认是50%
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
   * 自定义图标样式 TODO: fix
   */
  iconStyle?: TextStyle|ImageStyle,
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
  title: {
    fontSize: 15,
  },
  titleIcon: {
    fontSize: 18,
  },
  icon: {
    marginHorizontal: 6,
  },
});

/**
 * 按钮组件。
 */
export const Button = ThemeWrapper(function (props: ButtonProp) {
  function getStyle() {
    const style = {
      ...selectStyleType<ViewStyle|TextStyle, ButtomType>(props.type, 'default', props.plain ? {
        default: {
          ...border(1, 'solid', ThemeSelector.color(Color.border)),
          color: ThemeSelector.color(Color.text),
        },
        primary: {
          ...border(1, 'solid', ThemeSelector.color(Color.primary)),
          color: ThemeSelector.color(Color.primary),
        },
        success: {
          ...border(1, 'solid', ThemeSelector.color(Color.success)),
          color: ThemeSelector.color(Color.success),
        },
        warning: {
          ...border(1, 'solid', ThemeSelector.color(Color.warning)),
          color: ThemeSelector.color(Color.warning),
        },
        danger: {
          ...border(1, 'solid', ThemeSelector.color(Color.danger)),
          color: ThemeSelector.color(Color.danger),
        },
        custom: {
          ...border(1, 'solid', ThemeSelector.color(props.color || Color.primary)),
          color: ThemeSelector.color(props.color),
        },
        text: {
          color: ThemeSelector.color(props.color),
        },
      } : {
        default: {
          ...border(1, 'solid', ThemeSelector.color(Color.border)),
          color: ThemeSelector.color(Color.text),
        },
        primary: {
          backgroundColor: ThemeSelector.color(Color.primary),
          color: ThemeSelector.color(Color.white),
        },
        success: {
          backgroundColor: ThemeSelector.color(Color.success),
          color: ThemeSelector.color(Color.white),
        },
        warning: {
          backgroundColor: ThemeSelector.color(Color.warning),
          color: ThemeSelector.color(Color.white),
        },
        danger: {
          backgroundColor: ThemeSelector.color(Color.danger),
          color: ThemeSelector.color(Color.white),
        },
        custom: {
          backgroundColor: ThemeSelector.color(props.touchable === false ? props.disabledColor : props.color),
          color: ThemeSelector.color(props.textColor),
        },
        text: {
          color: ThemeSelector.color(props.textColor),
        },
      }),
      ...selectStyleType<ViewStyle, ButtomSizeType>(props.size, 'medium', {
        large: paddingVH(SpaceDefines.button_pv_large, SpaceDefines.button_ph_large),
        larger: paddingVH(SpaceDefines.button_pv_larger, SpaceDefines.button_ph_larger),
        medium: paddingVH(SpaceDefines.button_pv_medium, SpaceDefines.button_ph_medium),
        small: paddingVH(SpaceDefines.button_pv_small, SpaceDefines.button_ph_small),
        mini: paddingVH(SpaceDefines.button_pv_mini, SpaceDefines.button_ph_mini),
      }),
      opacity: props.touchable === false ? 0.5 : 1,
      borderRadius: props.shape === 'round' ? (props.radius || 100) : 0,
      ...(props.block ? {
        alignSelf: 'stretch',
      } : {
        flex: 0,
        flexShrink: 0,
        flexGrow: 0,
      }),
    } as ViewStyle|TextStyle;

    if (props.disabledColor && props.touchable === false && props.type !== 'custom' && props.plain !== true)
      style.backgroundColor = ThemeSelector.color(props.disabledColor);

    //内边距样式的强制设置
    styleConfigPadding(style, props.padding);
    return style;
  }
  function renderLeftIcon(speicalStyle: ViewStyle) {
    const marginStyle = {
      marginRight: CheckTools.isNullOrEmpty(props.text) ? undefined : 5,
    };
    if (props.renderIcon)
      return props.renderIcon(true, props.icon);
    if (typeof props.icon === 'string') {
      if (props.icon.startsWith('http'))
        return <Image key="leftIcon" style={[ styles.icon, marginStyle, props.iconStyle as ImageStyle ]} source={{ uri: props.icon }} />;
      return <Iconfont key="leftIcon" icon={props.icon} fontFamily={props.iconFontFamily} style={{
        ...styles.titleIcon,
        ...marginStyle,
        ...props.iconStyle as TextStyle,
        fontSize: selectStyleType(props.size, 'medium', FonstSizes) + 3,
      }} color={(speicalStyle as TextStyle).color as string} />;
    }
    if (typeof props.icon === 'object' || typeof props.icon === 'number')
      return <Image key="leftIcon" style={[ styles.icon, marginStyle, props.iconStyle as ImageStyle ]} source={props.icon} />;
    return <View key="leftIcon" />;
  }

  const speicalStyle = getStyle();
  const text = props.loading ? props.loadingText : (props.children || props.text);

  return (
    <TouchableHighlight
      onPress={(props.touchable === false || props.loading === true) ? undefined : props.onPress}
      underlayColor={props.pressedColor || props.type === 'custom' ? ThemeSelector.color(props.pressedColor || Color.default) :
        ThemeSelector.color((props.plain || props.type === 'text') ?
          PressedColor(Color.notice) :
          PressedColor(selectObjectByType(props.type, 'notice', Color)))
      }
      style={[
        styles.view,
        speicalStyle,
        props.style,
      ]}
      { ...props.viewProps }
    >
      <RowView center>
        {
          props.loading ?
            <ActivityIndicator size="small" color={ThemeSelector.color(props.loadingColor || Color.white)} /> :
            renderLeftIcon(speicalStyle)
        }
        <Text style={[
          styles.title,
          {
            color: ThemeSelector.color(props.textColor) || (speicalStyle as TextStyle).color,
            fontSize: selectStyleType(props.size, 'medium', FonstSizes),
            marginLeft: props.loading ? 5 : 0,
            display: CheckTools.isNullOrEmpty(text) ? 'none' : 'flex',
          },
          props.type === 'text' ? { fontWeight: 'bold' } : {},
          props.textStyle,
        ]}>
          { text }
        </Text>
      </RowView>
    </TouchableHighlight>
  );
});
