import React, { useCallback, useEffect, useState } from 'react';
import CheckTools from '../../utils/CheckTools';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Color } from "../../styles/ColorStyles";
import { selectStyleType, border as _border, paddingVH } from '../../utils/StyleTools';
import { ThemeColor, ThemeSelector } from '../../styles';
import { ThemeWrapper } from '../../theme/Theme';
import MeasureText from '@newbanker/react-native-measure-text';

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
   * 字号。默认是12.5
   */
  fontSize?: number,
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
    borderRadius: 20,
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

  const {
    color,
    content,
    children,
    border,
    position,
    badgeStyle,
    containerStyle,
    offset,
    badgeSize = 10,
    fontSize = 12.5,
    hiddenIfZero = true,
  } = props;

  const [ currentStyle, setCurrentStyle ] = useState<TextStyle[]>([]);

  //文字处理
  let contentString : string|undefined;
  if (typeof content !== 'undefined') {
    if (typeof content === 'number')
      contentString = (props.maxCount && content > props.maxCount) ? `${props.maxCount}+` : content.toString();
    else
      contentString = content;
  }

  //样式生成
  const doGenStyle = useCallback(() => {

    //计算文字的宽度
    if (contentString) {
      MeasureText.width({
        fontSize: fontSize,
        text: contentString,
        height: badgeSize,
      }).then((textWidth) => {
        genOffset(textWidth);
      });
    } else {
      genOffset();
    }

    function genOffset(textWidth?: number) {
      //偏移计算
      let offsetY = badgeSize;
      let offsetX = textWidth ? (textWidth + 4) : badgeSize;
      if (offset) {
        offsetX += offset.x;
        offsetY += offset.y;
      }

      setCurrentStyle([
        styles.badge,
        badgeStyle as TextStyle,
        { backgroundColor: ThemeSelector.color(color || Color.danger) },
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
        (border ? _border(2, 'solid', ThemeSelector.color(Color.white)) : {}),
        (contentString ? {
          paddingHorizontal: 2,
          borderRadius: badgeSize,
          fontSize: contentString.length >= 3 ? fontSize - 2 : fontSize,
          lineHeight: badgeSize + fontSize,
        } : {
          height: badgeSize,
          width: badgeSize,
          borderRadius: badgeSize,
        }),
      ]);
    }
  }, [ badgeSize, badgeStyle, color, border, contentString, fontSize, offset, position ]);

  useEffect(() => {
    doGenStyle();
  }, [ doGenStyle ]);

  const showBadge = (!hiddenIfZero || (hiddenIfZero && content !== 0 && content !== '0'));

  return (
    children ?
      <View style={[ styles.view, containerStyle ]}>
        { showBadge ? <Text style={currentStyle}>{contentString}</Text> : <></> }
        { children }
      </View> :
      (showBadge ? <Text style={[ currentStyle, { position: 'relative' } ]}>{contentString}</Text> : <></>)
  );
});

