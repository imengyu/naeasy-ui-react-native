import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle, Animated, Easing } from "react-native";
import { Color } from "../../styles/ColorStyles";
import { selectStyleType, border as _border } from '../../utils/StyleTools';
import { ThemeColor, ThemeSelector } from '../../styles';
import { ThemeWrapper } from '../../theme/Theme';
import { VerticalScrollText } from '../countdown';
import MeasureText from '../../utils/MeasureText';
import CheckTools from '../../utils/CheckTools';

type BadgePositionTypes = 'topRight'|'topLeft'|'bottomRight'|'bottomLeft';

export interface BadgeProps {
  /**
   * 控制是否显示
   */
  show?: boolean,
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
   * 描边宽度。默认：2
   */
  borderWidth?: number;
  /**
   * 描边颜色。默认：Color.white
   */
  borderColor?: ThemeColor;
  /**
   * 徽标在父级所处位置，默认是 top-right
   */
  position?: BadgePositionTypes;
  /**
   * 是否在切换时有动画效果。默认：false
   */
  anim?: boolean,
  /**
   * 徽标定位偏移
   */
  offset?: { x: number, y: number };
  /**
   * 徽标自定义样式
   */
  badgeStyle?: ViewStyle;
  /**
   * 徽标文字自定义样式
   */
  textStyle?: TextStyle;
  /**
   * 外层容器样式
   */
  containerStyle?: ViewStyle;
  /**
   * 徽标无文字情况下的徽标大小。默认：10
   */
  badgeSize?: number;
  /**
   * 字号。默认是12.5
   */
  fontSize?: number,
  /**
   * 圆角的大小。默认：20
   */
  radius?: number;
  /**
   * 徽标有文字情况下的垂直内边距。默认：2
   */
  paddingVertical?: number,
  /**
   * 徽标有文字情况下的水平内边距。默认：4
   */
  paddingHorizontal?: number,
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
    borderRadius: 20,
    minWidth: 10,
    textAlign: 'center',
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  badgeText: {
    color: Color.white.light,
    textAlign: 'center',
  },
});

/**
 * 徽标组件。通常用于在头像，某些按钮上显示小红点或者数量
 */

export const Badge = ThemeWrapper(function Badge(props: BadgeProps) {

  const {
    color,
    show = true,
    anim = false,
    content = '',
    children,
    border,
    borderWidth = 2,
    borderColor = Color.white,
    position,
    badgeStyle,
    containerStyle,
    textStyle,
    offset,
    badgeSize = 10,
    radius = 20,
    fontSize = 12.5,
    paddingVertical = 2,
    paddingHorizontal = 4,
    hiddenIfZero = true,
  } = props;

  const [ currentStyle, setCurrentStyle ] = useState<ViewStyle[]>([ styles.badge ]);
  const [ currentTextStyle, setCurrentTextStyle ] = useState<TextStyle[]>([ styles.badgeText ]);

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
      MeasureText.measureText({
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
      let offsetY = textWidth ? (fontSize + paddingVertical + (border ? borderWidth : 0)) / 2 : 0;
      let offsetX = textWidth ? (textWidth + paddingHorizontal + (border ? borderWidth : 0)) / 2 : 0;
      if (offset) {
        offsetX += offset.x;
        offsetY += offset.y;
      }

      setCurrentStyle([
        styles.badge,
        badgeStyle as TextStyle,
        {
          backgroundColor: ThemeSelector.color(color || Color.danger),
          borderRadius: radius,
        },
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
        (border ? _border(borderWidth, 'solid', ThemeSelector.color(borderColor)) : {}),
        (contentString ? {
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
          width: textWidth ? (textWidth + 4 + paddingHorizontal * 2 + (border ? borderWidth * 2 : 0)) : undefined,
        } : {
          height: badgeSize,
          width: badgeSize,
        }),
      ]);

      setCurrentTextStyle([
        { fontSize },
        styles.badgeText,
        textStyle as TextStyle,
      ]);
    }
  }, [
    textStyle, badgeSize, badgeStyle, color,
    border, borderWidth, borderColor, radius,
    contentString, fontSize, offset, position,
    paddingHorizontal, paddingVertical,
  ]);

  useEffect(() => {
    doGenStyle();
  }, [ doGenStyle ]);

  const showBadge = show && (!hiddenIfZero || (hiddenIfZero && content !== 0 && content !== '0'));

  return (
    children ?
      (<View style={[ styles.view, containerStyle ]}>
        <BadgeInner show={showBadge} anim={anim} content={contentString} textStyle={currentTextStyle} currentStyle={currentStyle} />
        { children }
      </View>) :
      <BadgeInner relative={true} show={showBadge} anim={anim} content={contentString} textStyle={currentTextStyle} currentStyle={currentStyle} />
  );
});

function BadgeInner(props: {
  show: boolean,
  anim: boolean,
  relative?: boolean,
  content: string|undefined,
  textStyle: TextStyle[]|undefined,
  currentStyle: ViewStyle[]|undefined,
}) {
  const {
    show,
    anim,
    currentStyle,
    relative,
    textStyle,
    content,
  } = props;

  const scaleAnim = useRef(new Animated.Value(1));

  //显示与隐藏的动画
  useEffect(() => {
    if (show) {
      if (anim) {
        Animated.timing(scaleAnim.current, {
          useNativeDriver: true,
          toValue: 1,
          duration: 200,
          easing: Easing.elastic(1),
        }).start();
      } else
        scaleAnim.current.setValue(1);
    } else {
      if (anim) {
        Animated.timing(scaleAnim.current, {
          useNativeDriver: true,
          toValue: 0,
          duration: 300,
        }).start();
      } else
        scaleAnim.current.setValue(0);
    }
  }, [ show, anim ]);

  return (
    <Animated.View style={[
      {
        transform: [
          { scale: scaleAnim.current },
        ],
      },
      ...(currentStyle || []),
      relative ? {
        position: 'relative',
        top: undefined,
        right: undefined,
        left: undefined,
        bottom: undefined,
      } : {},
    ]}>
      { content ? (
        anim && CheckTools.isNumber(content) ?
          //数字滚动
          <VerticalScrollText numberString={content} style={textStyle} /> :
          //正常文字
          <Text style={textStyle}>{content}</Text>
      ) : <></> }
    </Animated.View>
  );
}
