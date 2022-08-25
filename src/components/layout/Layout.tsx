import React from "react";
import CheckTools from "../../utils/CheckTools";
import { FlexAlignType, View, ViewStyle } from "react-native";

export interface RowProps {
  /**
   * 列元素之间的间距（单位为 dp）
   */
  gutter?: number;
  /**
   * 主轴对齐方式，可选值为
   */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | undefined;
  /**
   * 交叉轴对齐方式
   */
  align?: FlexAlignType;
  /**
   * 是否自动换行，默认 true
   */
  wrap?: boolean;

  style?: ViewStyle;
  children?: JSX.Element|JSX.Element[];
}
export interface ColProps {
  /**
   * 列元素偏移距离
   */
  offset?: number;
  /**
   * 列元素宽度
   */
  span?: number;

  style?: ViewStyle;
  children?: JSX.Element|JSX.Element[];
}

/**
 * 栅格数量
 */
const GRID_SIZE = 24;

/**
 * 24列栅格列组件。
 *
 * 提供了 24列栅格，通过在 Col 上添加 span 属性设置列所占的宽度百分比。
 *
 * 此外，添加 offset 属性可以设置列的偏移宽度，计算方式与 span 相同。
 */
export function Col(props: ColProps) {
  const pec = ((props.span || 0) / GRID_SIZE) * 100;
  return (
    <View style={{
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: `${pec}%`,
      marginLeft: props.offset ? `${(props.offset / GRID_SIZE) * 100}%` : undefined,
      maxWidth: `${pec}%`,
      ...props.style,
    }}>
      { props.children }
    </View>
  );
}
/**
 * 24列栅格行组件。
 */
export function Row(props: RowProps) {

  function resolveChildren() {
    //处理子级元素，为其增加边距
    const gutter = props.gutter || 0;
    const eles = [] as JSX.Element[];
    if (props.children) {
      if (props.children instanceof Array) {
        const count = props.children.length;
        for (let index = 0; index < count; index++) {
          eles.push(React.cloneElement(props.children[index], {
            style: {
              paddingLeft: index === 0 ? 0 : (index === count - 1 ? gutter : gutter / 2),
              paddingRight: index === count - 1 ? 0 : (index === 0 ? gutter : gutter / 2),
            },
            key: index,
          }));
        }
      } else {
        eles.push(React.cloneElement(props.children, { key: 0, style: { paddingLeft: gutter / 2, paddingRight: gutter / 2 } }));
      }
    }
    return eles;
  }

  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      flexWrap: CheckTools.returnDefinedValueOrdefault(props.wrap, true) ? 'wrap' : 'nowrap',
      justifyContent: props.justify,
      alignItems: props.align,
      ...props.style,
    }}>{ props.gutter && props.gutter > 0 ? resolveChildren() : props.children }</View>
  );
}
