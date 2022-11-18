import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View, ViewStyle, Text, TextStyle } from "react-native";
import { Color, ThemeColor, ThemeSelector } from "../../styles";
import { rpx } from "../../utils";
import { Icon, IconProp } from "../basic/Icon";

export interface StepProps {
  /**
   * 步骤条的方向
   */
  direction?: 'vertical'|'horizontal',
  /**
   * 激活时的颜色，默认 Color.primary
   */
  activeColor?: ThemeColor,
  /**
   * 未激活时的颜色，默认 Color.grey
   */
  inactiveColor?: ThemeColor,
  /**
   * 文字颜色，默认 Color.text
   */
  textColor?: ThemeColor,
  /**
   * 当为水平模式时，条目的宽度，默认是 rpx(150)
   */
  lineItemWidth?: number,
  /**
   * 当为水平模式时，分隔线的边距偏移
   */
  lineOffset?: number,
  /**
   * 当前激活的步骤
   */
  activeIndex: number,
  /**
   * 激活的步骤索引更改时触发
   */
  onActiveIndexChange: (index: number) => void;
  /**
   * 步骤子组件，请使用 StepItem
   */
  children?: JSX.Element[]|JSX.Element;
  /**
   * 线段粗细，默认是 1
   */
  lineWidth?: number;

  /**
   * 同 StepItemProps.activeIcon 此项用于所有子条目的设置
   */
  activeIcon?: string,
  /**
   * 同 StepItemProps.inactiveIcon 此项用于所有子条目的设置
   */
  inactiveIcon?: string,
  /**
   * 同 StepItemProps.finishIcon 此项用于所有子条目的设置
   */
  finishIcon?: string,
  /**
   * 同 StepItemProps.iconProps 此项用于所有子条目的设置
   */
  iconProps?: IconProp;
  /**
   * 同 StepItemProps.textStyle 此项用于所有子条目的设置
   */
  textStyle?: TextStyle,
}

export type StepItemState = 'inactive'|'active'|'finish';

export interface StepItemProps {
  /**
   * 自定义激活状态图标。为空时尝试使用 inactiveIcon 的值。
   */
  activeIcon?: string,
  /**
   * 自定义未激活状态图标, 横向默认是 __default_number，竖向默认是 __default_dot
   * * 有一个特殊值 `__default_number` 表示一个圆圈中间一个当前步骤的序号。
   * * 有一个特殊值 `__default_dot` 表示一个圆圈。
   */
  inactiveIcon?: string,
  /**
   * 自定义已完成步骤对应的底部图标，优先级高于 `inactiveIcon`，默认是 success-filling
   */
  finishIcon?: string,
  /**
   * 图标的附加属性
   */
  iconProps?: IconProp;
  /**
   * 步骤的文字自定义样式
   */
  textStyle?: TextStyle,
  /**
   * 当前步骤的文字
   */
  text?: string;
  /**
   * 垂直模式下，允许你渲染附加内容
   */
  extra?: string|JSX.Element;
  /**
   * 自定义渲染
   */
  renderItem?: (props: StepItemProps, state: StepItemState) => JSX.Element;
}


const styles = StyleSheet.create({
  stepVertical: {
    position: 'relative',
    flexDirection: 'column',
  },
  stepHorizontal: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 'auto',
  },
  scrollHorizontal: {
    position: 'relative',
    flex: 0,
    width: '100%',
  },
  itemVertical: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  itemHorizontal: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
  },
  content: {
    marginTop: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface StepItemInternalProps extends StepItemProps {
  state: StepItemState,
  direction: 'vertical'|'horizontal',
  index: number,
  isLast: boolean,
  style: ViewStyle,
  activeColor: string,
  inactiveColor: string,
  textColor: string,
  lineWidth: number,
  onPress: () => void,
}

//默认的圆点图标显示组件
function StepItemInternalDotIcon(props: { color: string, size: number }) {
  return (
    <View style={{
      width: props.size - 10,
      height: props.size - 10,
      borderRadius: props.size,
      backgroundColor: props.color,
    }} />
  );
}
//默认的圆点数字图标显示组件
function StepItemInternalDotNumberIcon(props: { color: string, size: number, index: number }) {
  return (
    <View style={{
      width: props.size - 2,
      height: props.size - 2,
      borderRadius: props.size,
      borderColor: props.color,
      borderWidth: 1.5,
    }} >
      <Text style={{
        color: props.color,
        fontSize: props.size - 11,
        lineHeight: props.size - 3 - 2,
        textAlign: 'center',
      }}>{props.index}</Text>
    </View>
  );
}
//步骤条渲染组件
function StepItemInternal(props: StepItemInternalProps) {

  const {
    state, style, direction, index, isLast,
    iconProps = { size: 24 },
    lineWidth,
    activeColor, inactiveColor, textColor, text, textStyle, extra,
    activeIcon,
    finishIcon = 'success-filling',
    inactiveIcon = direction === 'horizontal' ? '__default_number' : '__default_dot',
    renderItem,
  } = props;

  function renderIcon() {
    const useDefaultIcon = (state === 'inactive' || (state === 'active' && activeIcon === undefined));
    if (useDefaultIcon && inactiveIcon === '__default_number')
      return <StepItemInternalDotNumberIcon index={index} size={iconProps.size as number} color={state === 'inactive' ? inactiveColor : activeColor} />;
    if (useDefaultIcon && inactiveIcon === '__default_dot')
      return <StepItemInternalDotIcon size={iconProps.size as number} color={state === 'inactive' ? inactiveColor : activeColor} />;
    return (<Icon
      color={state === 'active' || state === 'finish' ? activeColor : inactiveColor}
      icon={state === 'active' ? (activeIcon || inactiveIcon) : (state === 'finish' ? finishIcon : inactiveIcon)}
      {...iconProps}
    />);
  }

  const iconConSize = iconProps.size as number + 15;
  const iconSize = iconProps.size as number;

  //渲染垂直线段
  function renderVeticalLine() {
    return (<View
      key={'line' + index}
      style={{
        position: 'absolute',
        left: iconConSize / 2 - lineWidth / 2,
        top: iconConSize / 2,
        bottom: -iconConSize / 2,
        backgroundColor: state === 'finish' ? activeColor : inactiveColor,
        width: lineWidth,
      }}
    />);
  }


  return (
    renderItem ? renderItem(props, state) :
    <View style={[ style, direction === 'vertical' ? styles.itemVertical : styles.itemHorizontal ]}>
      <View style={[ styles.iconContainer, { width: iconConSize, height: iconSize }]}>{renderIcon()}</View>

      <View style={styles.content}>
        <Text style={[ { color: textColor }, styles.text, textStyle ]}>{text}</Text>
        {
          typeof extra === 'string' ?
            <Text style={[
              { color: textColor },
              styles.text,
              textStyle,
            ]}>{extra}</Text> :
            extra
        }
      </View>

      { direction === 'vertical' && !isLast ? renderVeticalLine() : <></> }
    </View>
  );
}

/**
 * 步骤条组件
 */
export function StepItem(_props: StepItemProps) {
  return <></>;
}

/**
 * 步骤条组件
 */
export function Step(props: StepProps) {
  const {
    children,
    activeIndex,
    direction = 'horizontal',
    lineItemWidth = rpx(150),
    lineOffset = 10,
    lineWidth = 1,
    onActiveIndexChange,
  } = props;

  const activeColor = ThemeSelector.colorNoNull(props.activeColor, Color.primary);
  const inactiveColor = ThemeSelector.colorNoNull(props.inactiveColor, Color.grey);
  const textColor = ThemeSelector.colorNoNull(props.textColor, Color.text);

  useEffect(() => {
    if (direction === 'horizontal') {
      //水平模式下也需要滚动至指定位置
      scrollRef.current?.scrollTo({ x: (activeIndex - 1) * lineItemWidth - lineItemWidth / 2 });
    }
  }, [ activeIndex, direction, lineItemWidth ]);

  //渲染水平间隔线
  function renderLine(index: number) {
    return (<View
      key={'line' + index}
      style={{
        position: 'absolute',
        left: ((index + 1) * lineItemWidth - lineItemWidth / 4),
        top: lineOffset,
        backgroundColor: activeIndex > index ? activeColor : inactiveColor,
        height: lineWidth,
        width: lineItemWidth / 2 ,
      }}
    />);
  }

  const scrollRef = useRef<ScrollView>(null);

  //渲染子条目
  function renderChildren() {
    const result = [] as JSX.Element[];

    //通过传入的children创建真实的条目
    function createChild(oldProps: StepItemProps, index: number, isLast: boolean) {
      return React.createElement(StepItemInternal, {
        ...props,
        ...oldProps,
        key: index,
        index: index + 1,
        isLast,
        lineWidth,
        state: activeIndex === index ? 'active' : (activeIndex > index ? 'finish' : 'inactive'),
        style: {
          width: direction === 'horizontal' ? lineItemWidth : undefined,
        },
        direction, activeColor, inactiveColor, textColor,
        onPress: () => {
          onActiveIndexChange(index);
        },
      });
    }

    //循环children
    if (children instanceof Array) {
      const count = children.length;
      for (let index = 0; index < count; index++) {
        result.push(createChild(children[index].props, index,  index === count - 1));
        //水平条目之间还需要渲染线段
        if (direction === 'horizontal' && index !== count - 1)
          result.push(renderLine(index));
      }
    } else if (children) {
      result.push(createChild(children.props, 0, true));
    }
    return result;
  }

  //水平支持滚动
  return (
    direction === 'horizontal' ?
      <ScrollView
        ref={scrollRef}
        horizontal
        style={styles.scrollHorizontal}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stepHorizontal}
      >{ renderChildren() }</ScrollView> :
      <View style={styles.stepVertical}>
       { renderChildren() }
      </View>
  );
}
