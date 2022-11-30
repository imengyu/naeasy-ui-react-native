import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { GestureResponderEvent, Text, TextStyle, View, ViewStyle } from "react-native";
import { Color, DynamicColor, DynamicThemeStyleSheet, ThemeUtils } from "../../styles";
import { ThemeRender } from "../../theme/Theme";

export interface IndexBarProps {
  /**
   * 数据
   */
  data: string[],
  /**
   * 每个条目的大小，默认是20dp
   */
  itemSize?: number,
  /**
   * 每个条目的间距，默认是5dp
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

const styles = DynamicThemeStyleSheet.create({
  bar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  barInner: {
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  barItemActive: {
    backgroundColor: DynamicColor(Color.primary),
    borderRadius: 20,
  },
  barItemTextActive: {
    color: DynamicColor(Color.white),
  },
  barItemText: {
    color: DynamicColor(Color.text),
    fontSize: 12,
  },
  indicator: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: ThemeUtils.makeAplhaColor('#000000', 0.5),
    borderRadius: 50,
    overflow: 'hidden',
    top: '35%',
    left: '50%',
    marginLeft: -25,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

/**
 * 索引栏 用于列表的索引分类显示和快速定位。
 */
export const IndexBar = forwardRef<IndexBarInstance, IndexBarProps>((props, ref) => {
  const itemSize = props.itemSize || 20;
  const itemSpace = props.itemSpace || 5;
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
    <ThemeRender>
      {() => <View
        style={styles.bar}
        pointerEvents="box-none"
      >
        <View
          style={styles.barInner}
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
                styles.barItem,
                activeIndex === i ? styles.barItemActive : {},
                props.itemStyle,
                activeIndex === i ? props.activeItemStyle : {},
                sizeStyle,
              ]} key={i}>
                <Text style={[
                  styles.barItemText,
                  activeIndex === i ? styles.barItemTextActive : {},
                  props.itemTextStyle,
                  activeIndex === i ? props.activeItemTextStyle : {},
                ]}>{key}</Text>
              </View>
            ))
          }
        </View>
      </View>}
    </ThemeRender>
  );
});
