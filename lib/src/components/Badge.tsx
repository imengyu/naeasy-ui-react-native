import React from 'react';
import CheckTools from '../utils/CheckTools';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Color } from "../styles/ColorStyles";
import { selectStyleType, border as _border, paddingVH } from '../utils/StyleTools';
import { ThemeColor, ThemeSelector } from '../styles';
import { ThemeWrapper } from '../theme/Theme';

type BadgePositionTypes = 'topRight'|'topLeft'|'bottomRight'|'bottomLeft';

export interface BadgeProps {
  /**
   * 徽标内容
   */
  content?: string|number,
  /**
   * 徽标数字最大值，如果徽标内容是数字，并且超过最大值，则显示 xx+。
   */
  maxCount?: number,
  /**
   * 徽标颜色
   */
  color?: ThemeColor,
  /**
   * 是否增加描边
   */
  border?: boolean;
  /**
   * 徽标在父级所处位置，默认是 top-right
   */
  position?: BadgePositionTypes;
  /**
   * 徽标定位偏移
   */
  offset?: { x: number, y: number };
  /**
   * 徽标自定义样式
   */
  badgeStyle?: TextStyle;
  /**
   * 外层容器样式
   */
  containerStyle?: ViewStyle;
  /**
   * 徽标大小
   */
  badgeSize?: number;
  /**
   * 如果 content===0 是否隐藏红点，默认是
   */
  hiddenIfZero?: boolean;

  children?: JSX.Element,
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    zIndex: 100,
    color: Color.white.light,
    borderRadius: 5,
    minWidth: 10,
    textAlign: 'center',
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
});

/**
 * 徽标组件。通常用于在头像，某些按钮上显示小红点或者数量
 */

export const Badge = ThemeWrapper(function Badge(props: BadgeProps) {

  const { content, children, border, position, badgeStyle, containerStyle, offset } = props;
  const badgeSize = props.badgeSize || 10;
  const hiddenIfZero  = props.hiddenIfZero !== false;

  const badgeStyleFinal = {
    ...styles.badge,
    ...badgeStyle,
    backgroundColor: ThemeSelector.color(props.color || Color.danger),
    ...(border ? _border(1, 'solid', ThemeSelector.color(Color.white)) : {}),
    ...(CheckTools.isNullOrEmpty(content) ? {
      height: badgeSize,
      fontSize: 0,
    } : (typeof content === 'number' || CheckTools.isNumber(content) ? {
      height: badgeSize + 6,
      width: (badgeSize * Math.max(1, ('' + content).length / 2) + 5),
      fontSize: badgeSize,
      borderRadius: (badgeSize + 5) / 2,
      paddingVertical: 2,
    } : {
      ...paddingVH(2, 4),
      fontSize: badgeSize,
      borderRadius: badgeSize - 2,
    })),
  };

  let contentString : string|undefined;
  if (typeof content !== 'undefined') {
    if (typeof content === 'number')
      contentString = (props.maxCount && content > props.maxCount) ? `${props.maxCount}+` : content.toString();
    else
      contentString = content;
  }
  let offsetY = (badgeStyleFinal.fontSize) / 4;
  let offsetX = (contentString && contentString.length > 0) ? contentString.length * (CheckTools.isNumber(contentString) ? 2 : 3.5) : 0;
  if (offset) {
    offsetX += offset.x;
    offsetY += offset.y;
  }

  const showBadge = (!hiddenIfZero || (hiddenIfZero && content !== 0 && content !== '0'));

  return (
    children ?
      <View style={{
        ...styles.view,
        ...containerStyle,
      }}>
        {
          showBadge ?
            (<Text style={[
              badgeStyleFinal,
              selectStyleType<TextStyle, BadgePositionTypes>(position, 'topRight', {
                topRight: {
                  top: -offsetY,
                  right: -offsetX,
                },
                topLeft: {
                  top: -offsetY,
                  left: -offsetX,
                },
                bottomRight: {
                  bottom: -offsetY,
                  right: -offsetX,
                },
                bottomLeft: {
                  bottom: -offsetY,
                  left: -offsetX,
                },
              }),
            ]}>{contentString}</Text>) :
            <></>
          }
        {children}
        </View> :
        (
          showBadge ?
            <Text style={{...badgeStyleFinal, position: 'relative' }}>{contentString}</Text> :
            <></>
        )
  );
});

