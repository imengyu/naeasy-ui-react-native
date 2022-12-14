import React, { useMemo } from 'react';
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Color } from '../../styles';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicColorVar, DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';
import { selectStyleType } from '../../utils/StyleTools';
import { Icon } from '../basic/Icon';
import { RowView } from '../layout/RowView';

type TagTypes = 'default'|'primary'|'success'|'warning'|'danger';

type TagSizes = 'small'|'medium'|'large';

interface TagProp {
  /**
   * 文字
   */
  text?: string,
  /**
   * 支持 default、primary、success、warning、danger 五种内置颜色类型
   * @default 'default'
   */
  type?: TagTypes,
  /**
   * 设置 plain 属性设置为空心样式。
   * @default false
   */
  plain?: boolean,
  /**
   * 形状 通过 square 设置方形，通过 round 设置圆形, mark设置标记样式(半圆角)。
   * @default 'round'
   */
  shape?: 'square'|'round'|'mark',
  /**
   * 是否可以被关闭
   * @default false
   */
  closeable?: boolean,
  /**
   * 尺寸. 支持 large、medium、small 三种尺寸。
   * @default 'medium'
   */
  size?: TagSizes,
  /**
   * 自定义文字的颜色。
   */
  textColor?: ThemeColor;
  /**
   * 圆角大小，仅在 shape=round 或者 shape=mark 时有效。
   * @default 10
   */
  borderRadius?: number;
  /**
   * 自定义颜色。
   */
  color?: string;
  /**
   * 自定义样式
   */
  style?: ViewStyle,
  /**
   * 点击关闭事件。可以执行自定义隐藏标签的逻辑。
   */
  onClose?: () => void,
}

const styles = StyleSheet.create({
  view: {
    flex: 0,
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: 'auto',
    minWidth: 20,
    width: 'auto',
    alignSelf: 'center',
  },
  title: {
    fontSize: DynamicVar('TagFontSize', 12),
  },
  plainTagDefault: {
    borderWidth: DynamicVar('TagBorderWidth', 1),
    borderColor: DynamicColorVar('TagPlainDefaultBorderColor', Color.border),
    color: DynamicColorVar('TagPlainDefaultColor', Color.text),
  },
  plainTagPrimary: {
    borderWidth: DynamicVar('TagBorderWidth', 1),
    borderColor: DynamicColorVar('TagPlainPrimaryBorderColor', Color.primary),
    color: DynamicColorVar('TagPlainPrimaryColor', Color.primary),
  },
  plainTagSuccess: {
    borderWidth: DynamicVar('TagBorderWidth', 1),
    borderColor: DynamicColorVar('TagPlainSuccessBorderColor', Color.success),
    color: DynamicColorVar('TagPlainSuccessColor', Color.success),
  },
  plainTagWarning: {
    borderWidth: DynamicVar('TagBorderWidth', 1),
    borderColor: DynamicColorVar('TagPlainWarningBorderColor', Color.warning),
    color: DynamicColorVar('TagPlainWarningColor', Color.warning),
  },
  plainTagDanger: {
    borderWidth: DynamicVar('TagBorderWidth', 1),
    borderColor: DynamicColorVar('TagPlainDangerBorderColor', Color.danger),
    color: DynamicColorVar('TagPlainDangerColor', Color.danger),
  },
  tagPrimary: {
    backgroundColor: DynamicColorVar('TagPrimaryBackgroundColor', Color.primary),
    color: DynamicColorVar('TagPrimaryColor', Color.white),
  },
  tagSuccess: {
    backgroundColor: DynamicColorVar('TagSuccessBackgroundColor', Color.success),
    color: DynamicColorVar('TagSuccessColor', Color.white),
  },
  tagWarning: {
    backgroundColor: DynamicColorVar('TagWarningBackgroundColor', Color.warning),
    color: DynamicColorVar('TagWarningColor', Color.white),
  },
  tagDanger: {
    backgroundColor: DynamicColorVar('TagDangerBackgroundColor', Color.danger),
    color: DynamicColorVar('TagDangerColor', Color.white),
  },
  tagSizeLarge: {
    paddingVertical: DynamicVar('TagSizeLargePaddingVertical', 5),
    paddingHorizontal: DynamicVar('TagSizeLargePaddingHorizontal', 10),
  },
  tagSizeMedium: {
    paddingVertical: DynamicVar('TagSizeMediumPaddingVertical', 2),
    paddingHorizontal: DynamicVar('TagSizeMediumPaddingHorizontal', 5),
  },
  tagSizeSmall: {
    paddingVertical: DynamicVar('TagSizeSmallPaddingVertical', 1),
    paddingHorizontal: DynamicVar('TagSizeSmallPaddingHorizontal', 2),
  },
});

/**
 * 标记组件。用于标记关键词和概括主要内容。
 */
export function Tag(props: TagProp) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    shape = 'round',
    type = themeContext.getThemeVar('TagType', 'default'),
    plain = themeContext.getThemeVar('TagPlain', false),
    size = themeContext.getThemeVar('TagSize', 'medium'),
    borderRadius = themeContext.getThemeVar('TagBorderRadius', 10),
    textColor = themeContext.getThemeVar('TagTextColor', undefined),
  } = props;

  const FonstSizes = {
    small: themeContext.getThemeVar('TagSmallFonstSize', 11),
    medium: themeContext.getThemeVar('TagMediumFonstSize', 14),
    large: themeContext.getThemeVar('TagLargeFonstSize', 18),
  };

  const style = useMemo(() => {
    return {
      ...selectStyleType(shape, 'round', {
        round: { borderRadius: borderRadius },
        square: { borderRadius: borderRadius },
        mark: {
          borderTopRightRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        },
      }),
      ...selectStyleType<ViewStyle|TextStyle, TagTypes>(type, 'default', plain ? {
        default: themeStyles.plainTagDefault,
        primary: themeStyles.plainTagPrimary,
        success: themeStyles.plainTagSuccess,
        warning: themeStyles.plainTagWarning,
        danger: themeStyles.plainTagDanger,
      } : {
        default: themeStyles.plainTagDefault,
        primary: themeStyles.tagPrimary,
        success: themeStyles.tagSuccess,
        warning: themeStyles.tagWarning,
        danger: themeStyles.tagDanger,
      }),
      ...selectStyleType<ViewStyle, TagSizes>(size, 'medium', {
        small: themeStyles.tagSizeSmall,
        medium: themeStyles.tagSizeMedium,
        large: themeStyles.tagSizeLarge,
      }),
    } as ViewStyle|TextStyle;
  }, [ borderRadius, plain, shape, size, type, themeStyles ]);

  return (
    <RowView center style={[
      themeStyles.view,
      style,
      props.style as ViewStyle,
    ]}>
      <Text style={[
        themeStyles.title,
        {
          color: themeContext.resolveThemeColor(textColor) || (style as TextStyle).color,
          fontSize: selectStyleType(size, 'medium', FonstSizes) - 2,
        },
      ]}>{props.text}</Text>
      {
        props.closeable ?
          <TouchableOpacity onPress={props.onClose}>
            <Icon
              icon="close"
              size={themeContext.getThemeVar('TagCloseIconSize', 15)}
              color={props.textColor || (style as TextStyle).color as string}
            />
          </TouchableOpacity>
          : <></>
      }
    </RowView>
  );
}
