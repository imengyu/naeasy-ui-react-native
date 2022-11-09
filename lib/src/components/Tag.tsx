import React from 'react';
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Color, FonstSizes, ThemeColor, ThemeSelector } from '../styles';
import { border, paddingVH, selectStyleType } from '../utils/StyleTools';
import { Icon } from './Icon';
import { RowView } from './layout/RowView';
import { ThemeWrapper } from '../theme/Theme';

type TagTypes = 'default'|'primary'|'success'|'warning'|'danger';

type TagSizes = 'small'|'medium'|'large';

interface TagProp {
  /**
   * 文字
   */
  text?: string,
  /**
   * 支持 default、primary、success、warning、danger 五种内置颜色类型，默认为 default
   */
  type?: TagTypes,
  /**
   * 设置 plain 属性设置为空心样式。
   */
  plain?: boolean,
  /**
   * 形状 通过 square 设置方形，通过 round 设置圆形, mark设置标记样式(半圆角)。
   */
  shape?: 'square'|'round'|'mark',
  /**
   * 是否可以被关闭
   */
  closeable?: boolean,
  /**
   * 尺寸. 支持 large、medium、small 三种尺寸，默认为 medium。
   */
  size?: TagSizes,
  /**
   * 自定义文字的颜色。
   */
  textColor?: ThemeColor;
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
    minWidth: 20,
    width: 'auto',
    alignSelf: 'center',
  },
  title: {
    fontSize: 12,
  },
});

/**
 * 标记组件。用于标记关键词和概括主要内容。
 */
export const Tag = ThemeWrapper(function (props: TagProp) {
  function getStyle() {
    return {
      ...selectStyleType(props.shape, 'round', {
        round: {
          borderRadius: 10,
        },
        square: {
          borderRadius: 0,
        },
        mark: {
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        },
      }),
      ...selectStyleType<ViewStyle|TextStyle, TagTypes>(props.type, 'default', props.plain ? {
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
      }),
      ...selectStyleType<ViewStyle, TagSizes>(props.size, 'medium', {
        large: {
          ...paddingVH(5, 10),
        },
        medium: {
          ...paddingVH(2, 5),
        },
        small: {
          ...paddingVH(1, 2),
        },
      }),
    } as ViewStyle|TextStyle;
  }

  const speicalStyle = getStyle();
  return (
    <RowView center style={[
      styles.view,
      speicalStyle,
      props.style as ViewStyle,
    ]}>
      <Text style={[
        styles.title,
        {
          color: ThemeSelector.color(props.textColor) || (speicalStyle as TextStyle).color,
          fontSize: selectStyleType(props.size, 'medium', FonstSizes) - 2,
        },
      ]}>{props.text}</Text>
      {
        props.closeable ?
          <TouchableOpacity onPress={props.onClose}><Icon icon="close" size={15} color={props.textColor || (speicalStyle as TextStyle).color as string} /></TouchableOpacity>
          : <></>
      }
    </RowView>
  );
});
