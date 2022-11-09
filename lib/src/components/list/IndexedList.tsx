import React, { useRef, useState, useEffect } from 'react';
import { IndexBar, IndexBarInstance } from './IndexBar';
import { ViewStyle, TextStyle, StyleSheet, FlatList, Text, NativeSyntheticEvent, NativeScrollEvent, TouchableHighlight, FlatListProps } from 'react-native';
import { Color, DynamicColor, DynamicThemeStyleSheet, PressedColor, ThemeSelector } from '../../styles';
import { ThemeRender } from '../../theme/Theme';

const styles = DynamicThemeStyleSheet.create({
  header: {
    backgroundColor: DynamicColor(Color.border),
    paddingHorizontal: 20,
    fontSize: 12,
  },
  item: {
    paddingHorizontal: 20,
    fontSize: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: DynamicColor(Color.border),
    backgroundColor: DynamicColor(Color.white),
  },
});

export interface IndexedListGrouperedData<T> {
  isTitle?: boolean,
  data: T|string,
}

export interface IndexedListProps<T> extends Omit<FlatListProps<T>, "data"|"renderItem"|'keyExtractor'|'getItemLayout'|'getItem'> {
  /**
   * 条目自定义样式
   */
  itemStyle?: ViewStyle;
  /**
   * 条目的高度
   */
  itemHeight?: number;
  /**
   * 组的头部自定义样式
   */
  groupStyle?: ViewStyle;
  /**
   * 组的头部高度
   */
  groupHeight?: number;
  /**
   * 源数据
   */
  data: T[],
  /**
   * 显示数据的prop
   */
  dataDisplayProp?: string,
  /**
   * 对数据进行分组。每个条目会调用一次这个回调，你需要在此回调中返回此条目所在分组的名字。
   */
  groupDataBy: (item: T) => string,
  /**
   * 自定义条目key
   */
  keyExtractor?: (item: T) => string,
  /**
   * 当用户点击列表条目时发出此事件
   */
  onItemPress: (item: T) => void,
  /**
   * 当用户滑动列表，当前显示的组位置更改时发出此事件
   */
  onActiveGroupChange?: (index: number) => void,
}

/**
 * 带右侧索引的列表，支持自动分组
 */
export function IndexedList<T>(props: IndexedListProps<T>) {

  const dataSource = props.data;
  const groupDataBy = props.groupDataBy;
  const dataDisplayProp = props.dataDisplayProp;
  const keyExtractor = props.keyExtractor;
  const onItemPress = props.onItemPress;

  const groupHeight = props.groupHeight || 35;
  const itemHeight = props.itemHeight || 50;

  const groupStyle = {
    ...styles.header,
    ...props.groupStyle,
    height: groupHeight,
    lineHeight: groupHeight,
  } as TextStyle;
  const itemStyle = {
    ...styles.item,
    ...props.itemStyle,
    height: itemHeight,
    lineHeight: itemHeight,
  } as ViewStyle;

  const [ data, setData ] = useState<IndexedListGrouperedData<T>[]>([]);
  const [ dataIndex, setDataIndex ] = useState<string[]>([]);

  const refList = useRef<FlatList>(null);
  const refIndexBar = useRef<IndexBarInstance>(null);

  const indexPosition = useRef<number[]>([]);
  const currentActiveGroupIndex = useRef(0);
  const isUserDragging = useRef(false);
  const isScrollLock = useRef(false);

  useEffect(() => {
    const map = new Map<string, T[]>();
    //归组数据
    dataSource.forEach((model) => {
      const groupKey = groupDataBy(model);
      let arr = map.get(groupKey);
      if (!arr){
        arr = [];
        map.set(groupKey, arr);
      }
      arr.push(model);
    });

    //清空上一次临时数据
    indexPosition.current = [];
    currentActiveGroupIndex.current = 0;

    //填充数据
    const arr = [] as IndexedListGrouperedData<T>[];
    const arrIndex = [] as string[];
    let currentY = 0;
    map.forEach((v, k) => {
      arr.push({
        isTitle: true,
        data: k,
      });

      //设置高度索引，用于判断
      indexPosition.current.push(currentY);
      currentY += groupHeight;

      v.forEach(c => {
        arr.push({
          data: c,
        });
        currentY += itemHeight;
      });
      arrIndex.push(k);
    });
    setData(arr);
    setDataIndex(arrIndex);
  }, [ dataSource, groupDataBy, groupHeight, itemHeight ]);

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    if (isUserDragging.current && !isScrollLock.current) {
      isScrollLock.current = true;
      setTimeout(() => { isScrollLock.current = false; }, 400);
      const y = e.nativeEvent.contentOffset.y;
      const newGroupIndex = findGroupIndexByYPosition(y);
      if (currentActiveGroupIndex.current !== newGroupIndex) {
        currentActiveGroupIndex.current = newGroupIndex;
        refIndexBar.current?.setActiveIndex(newGroupIndex);
        props.onActiveGroupChange?.(newGroupIndex);
      }
    }
  }
  function onScrollStartDrag() {
    isUserDragging.current = true;
  }
  function onScrollEndDrag(e: NativeSyntheticEvent<NativeScrollEvent>) {
    onScroll(e);
    isScrollLock.current = false;
    isUserDragging.current = false;
  }

  function findGroupIndexByYPosition(y: number) {
    const indexArr = indexPosition.current;
    const size = indexArr.length;
    for (let i = size - 1; i >= 0; i--) {
      if (y <= indexArr[i]) {
        if (i <= 0 || y >= indexArr[i - 1]) {
          return i - 1;
        }
      } else if (i === size - 1)
        return i;
    }
    return 0;
  }

  return (
    <>
      <IndexBar
        ref={refIndexBar}
        data={dataIndex}
        onActiveIndexChange={(i) => {
          refList.current?.scrollToOffset({
            animated: false,
            offset: indexPosition.current[i],
          });
        }}
      />
      <ThemeRender>
        {() => <FlatList<IndexedListGrouperedData<T>>
          { ...props }
          ref={refList}
          data={data}
          keyExtractor={(item, i) => {
            if (keyExtractor) {
              if (typeof item.data === 'string')
                return ('group' + i);
              keyExtractor(item.data);
            }
            return ('' + i);
          }}
          renderItem={({ item }) => (
            typeof item.data === 'string' ?
              <Text style={groupStyle}>{item.data}</Text> :
              <TouchableHighlight
                underlayColor={ThemeSelector.color(PressedColor(Color.white))}
                onPress={() => onItemPress(item.data as T)}
              >
                <Text style={itemStyle}>{dataDisplayProp ? (item.data as unknown as Record<string, string>)[dataDisplayProp] : (item.data as unknown as string) }</Text>
              </TouchableHighlight>
          )}
          onScroll={onScroll}
          onScrollBeginDrag={onScrollStartDrag}
          onScrollEndDrag={onScrollEndDrag}
          onScrollToIndexFailed={(e) => {
            console.log('onScrollToIndexFailed', e);
          }}
        />}
      </ThemeRender>
    </>
  );
}
