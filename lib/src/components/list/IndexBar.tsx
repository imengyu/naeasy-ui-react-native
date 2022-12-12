import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { GestureResponderEvent, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Color, ThemeUtils } from "../../styles";
import { useThemeContext } from "../../theme/Theme";
import { DynamicColorVar, DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";

export interface IndexBarProps {
  /**
   * 数据
   */
  data: string[],
  /**
   * 每个条目的大小
   * @default 20
   */
  itemSize?: number,
  /**
   * 每个条目的间距
   * @default 5
   */
  itemSpace?: number,
  /**
   * 每个条目的样式
   */
  itemStyle?: ViewStyle,
  /**
   * 条目激活时的样式
   */
  activeItemStyle?: ViewStyle,
  /**
   * 条目文字样式
   */
  itemTextStyle?: TextStyle,
  /**
   * 条目激活时的文字样式
   */
  activeItemTextStyle?: TextStyle,
  /**
   * 用户拖拽更改选中条目时触发此事件
   */
  onActiveIndexChange?: (index: number) => void;
}

export interface IndexBarInstance {
  /**
   * 手动设置当前索引栏激活的条目索引
   */
  setActiveIndex: (index: number) => void;
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: DynamicVar('IndexBarLeft', undefined),
    right: DynamicVar('IndexBarRight', 0),
    top: DynamicVar('IndexBarTop', 0),
    bottom: DynamicVar('IndexBarBottom', 0),
    zIndex: DynamicVar('IndexBarZIndex', 5),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barInner: {
    paddingRight: DynamicVar('IndexBarPaddingRight', 10),
    paddingLeft: DynamicVar('IndexBarPaddingLeft', 0),
    paddingTop: DynamicVar('IndexBarPaddingTop', 0),
    paddingBottom: DynamicVar('IndexBarPaddingBottom:', 0),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DynamicColorVar('IndexBarItemBackgroundColor', 'transparent'),
    borderRadius: DynamicVar('IndexBarItemBorderRadius', 20),
  },
  barItemActive: {
    backgroundColor: DynamicColorVar('IndexBarItemActiveBackgroundColor', Color.primary),
    borderRadius: DynamicVar('IndexBarItemBorderRadius', 20),
  },
  barItemTextActive: {
    color: DynamicColorVar('IndexBarItemActiveTextColor', Color.white),
  },
  barItemText: {
    color: DynamicColorVar('IndexBarItemTextColor', Color.text),
    fontSize: DynamicVar('IndexBarItemTextFontSize', 12),
  },
  indicator: {
    position: 'absolute',
    width: DynamicVar('IndexBarIndicatorWidth', 50),
    height: DynamicVar('IndexBarIndicatorHeight', 50),
    backgroundColor: DynamicVar('IndexBarIndicatorBackgroundColor', ThemeUtils.makeAplhaColor('#000000', 0.5)),
    borderRadius: DynamicVar('IndexBarIndicatorBorderRadius', 50),
    overflow: 'hidden',
    top: DynamicVar('IndexBarIndicatorTop', '35%'),
    left: DynamicVar('IndexBarIndicatorLeft', '50%'),
    marginLeft: DynamicVar('IndexBarIndicatorMarginLeft', -25),
    zIndex: DynamicVar('IndexBarIndicatorZIndex', 10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    color: DynamicVar('IndexBarIndicatorTextColor', 'white'),
    fontSize: DynamicVar('IndexBarIndicatorTextFontSize', 30),
    fontWeight: DynamicVar('IndexBarIndicatorTextFontWeight', 'bold'),
  },
});

/**
 * 索引栏 用于列表的索引分类显示和快速定位。
 */
export const IndexBar = forwardRef<IndexBarInstance, IndexBarProps>((props, ref) => {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const itemSize = props.itemSize || themeContext.getThemeVar('IndexBarItemSize', 20);
  const itemSpace = props.itemSpace || themeContext.getThemeVar('IndexBarItemSpace', 5);
  const data = props.data;

  const [activeIndex, setActiveIndex] = useState(0);
  const emitChangeCurrentVal = useRef(0);

  useImperativeHandle(ref, () => ({
    setActiveIndex(i) {
      if (i !== activeIndex)
        setActiveIndex(i);
    },
  }));

  function onResponderMove(e: GestureResponderEvent) {
    const y = e.nativeEvent.locationY;
    let v = Math.abs(Math.ceil((y) / (itemSize + itemSpace) - 1));
    if (v !== emitChangeCurrentVal.current) {
      emitChangeCurrentVal.current = v;
      setActiveIndex(emitChangeCurrentVal.current);
      props.onActiveIndexChange && props.onActiveIndexChange(emitChangeCurrentVal.current);
    }
  }

  const sizeStyle = {
    width: itemSize,
    height: itemSize,
    marginTop: itemSpace,
  } as ViewStyle;

  return (
    <View
      style={themeStyles.bar}
      pointerEvents="box-none"
    >
      <View
        style={themeStyles.barInner}
        pointerEvents="box-only"
        onResponderMove={onResponderMove}
        onResponderRelease={onResponderMove}
        onStartShouldSetResponder={() => true}
        onStartShouldSetResponderCapture={() => true}
        onMoveShouldSetResponder={() => true}
        onMoveShouldSetResponderCapture={() => true}
      >
        {
          data.map((key, i) => (
            <View style={[
              themeStyles.barItem,
              activeIndex === i ? themeStyles.barItemActive : {},
              props.itemStyle,
              activeIndex === i ? props.activeItemStyle : {},
              sizeStyle,
            ]} key={i}>
              <Text style={[
                themeStyles.barItemText,
                activeIndex === i ? themeStyles.barItemTextActive : {},
                props.itemTextStyle,
                activeIndex === i ? props.activeItemTextStyle : {},
              ]}>{key}</Text>
            </View>
          ))
        }
      </View>
    </View>
  );
});
