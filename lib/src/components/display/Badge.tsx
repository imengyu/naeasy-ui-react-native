import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle, Animated, Easing } from "react-native";
import { Color } from "../../styles/ColorStyles";
import { selectStyleType } from '../../utils/StyleTools';
import MeasureText from '../../utils/MeasureText';
import CheckTools from '../../utils/CheckTools';
import { VerticalScrollText } from '../typography';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
import { DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';

type BadgePositionTypes = 'topRight'|'topLeft'|'bottomRight'|'bottomLeft';

export interface BadgeProps {
  /**
   * 控制是否显示
   * @default true
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
   * @default Color.danger
   */
  color?: ThemeColor,
  /**
   * 是否增加描边
   * @default false
   */
  border?: boolean;
  /**
   * 描边宽度
   * @default 2
   */
  borderWidth?: number;
  /**
   * 描边颜色
   * @default Color.white
   */
  borderColor?: ThemeColor;
  /**
   * 徽标在父级所处位置
   * @default 'top-right'
   */
  position?: BadgePositionTypes;
  /**
   * 是否在切换时有动画效果
   * @default false
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
   * 徽标无文字情况下的徽标大小
   * @default 10
   */
  badgeSize?: number;
  /**
   * 字号
   * @default 12.5
   */
  fontSize?: number,
  /**
   * 圆角的大小
   * @default 20
   */
  radius?: number;
  /**
   * 徽标有文字情况下的垂直内边距
   * @default 2
   */
  paddingVertical?: number,
  /**
   * 徽标有文字情况下的水平内边距
   * @default 4
   */
  paddingHorizontal?: number,
  /**
   * 如果 content===0 是否隐藏红点
   * @default true
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
    textAlign: 'center',
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  badgeText: {
    color: DynamicVar('BadgeTextColor', Color.white.light),
    fontSize: DynamicVar('BadgeTextFontSize', 11),
    textAlign: 'center',
  },
});

/**
 * 徽标组件。通常用于在头像，某些按钮上显示小红点或者数量
 */

export function Badge(props: BadgeProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    color = Color.danger,
    show = true,
    anim = themeContext.getThemeVar('BadgeAnim', false),
    content = '',
    children,
    border = themeContext.getThemeVar('BadgeBorder', false),
    borderWidth = themeContext.getThemeVar('BadgeBorderWidth', 2),
    borderColor = themeContext.getThemeVar('BadgeBorderColor', Color.white),
    position = themeContext.getThemeVar('BadgePosition', 'topLeft'),
    badgeStyle,
    containerStyle,
    textStyle,
    offset = themeContext.getThemeVar('BadgeOffset', { x: 0, y: 0 }),
    badgeSize = themeContext.getThemeVar('BadgeSize', 10),
    radius = themeContext.getThemeVar('BadgeRadius', 20),
    fontSize = themeContext.getThemeVar('BadgeFontSize', 10),
    paddingVertical = themeContext.getThemeVar('BadgePaddingVertical', 1),
    paddingHorizontal = themeContext.getThemeVar('BadgePaddingHorizontal', 3),
    hiddenIfZero = true,
  } = props;

  const [ currentStyle, setCurrentStyle ] = useState<ViewStyle[]>([ themeStyles.badge ]);
  const [ currentTextStyle, setCurrentTextStyle ] = useState<TextStyle[]>([ themeStyles.badgeText ]);

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
        themeStyles.badge,
        badgeStyle as TextStyle,
        {
          backgroundColor: themeContext.resolveThemeColor(color),
          borderRadius: radius,
          borderWidth,
          borderColor: themeContext.resolveThemeColor(borderColor),
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
        (contentString ? {
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
          width: textWidth ? (textWidth + 6 + paddingHorizontal * 2 + (border ? borderWidth * 2 : 0)) : undefined,
          aspectRatio: textWidth && contentString.length === 1 ? 1 : undefined,
        } : {
          height: badgeSize,
          width: badgeSize,
        }),
      ]);

      setCurrentTextStyle([
        { fontSize },
        themeStyles.badgeText,
        textStyle as TextStyle,
      ]);
    }
  }, [
    themeStyles, themeContext,
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
      (<View style={[ themeStyles.view, containerStyle ]}>
        <BadgeInner show={showBadge} anim={anim} content={contentString} textStyle={currentTextStyle} currentStyle={currentStyle} />
        { children }
      </View>) :
      <BadgeInner relative={true} show={showBadge} anim={anim} content={contentString} textStyle={currentTextStyle} currentStyle={currentStyle} />
  );
}

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
          <VerticalScrollText center numberString={content} style={textStyle} /> :
          //正常文字
          <Text style={textStyle}>{content}</Text>
      ) : <></> }
    </Animated.View>
  );
}
