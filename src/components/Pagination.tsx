import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { Color, PressedColor } from '../styles/ColorStyles';
import { RowView } from "./layout/RowView";

interface PaginationProps {
  /**
   * 当前的页码
   */
  currentPage: number;
  /**
   * 总共有的页数
   */
  pageCount: number;
  /**
   * 当用户点击页码跳转时发出此事件
   */
  onCurrentPageChange?: (page: number) => void;
  /**
   * 是否显示上一页下一页按钮，默认是
   */
  showNextPrev?: boolean;
  /**
   * 同时显示的页面按钮数量
   */
  showPageCount?: number;
  /**
   * 是否简单模式，默认否
   */
  simple?: boolean;
  /**
   * 上一页按钮文字
   */
  prevText?: string;
  /**
   * 下一页按钮文字
   */
  nextText?: string;
}
interface PaginationItemProps {
  text?: string;
  touchable?: boolean;
  active?: boolean;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  simpleText: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  itemButton: {
    backgroundColor: Color.white,
    flexGrow: 1,
    alignSelf: 'auto',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 13,
    textAlign: 'center',
  },
});

/**
 * 分页指示器组件
 */
export function Pagination(props: PaginationProps) {

  const showNextPrev = props.showNextPrev || true;
  const nextText = props.nextText || '下一张';
  const prevText = props.prevText || '上一张';
  const currentPage = props.currentPage;
  const canNext = currentPage < props.pageCount - 1;
  const canPrev = currentPage > 0;
  const showPageCount = props.showPageCount || 5;

  function renderItems() {
    const arr = [] as JSX.Element[];

    let startOverAdd = 0;
    let start = currentPage - Math.floor(showPageCount / 2);
    if (start < 0) {
      startOverAdd += -start;
      start = 0;
    }
    let end = currentPage + Math.ceil(showPageCount / 2) + startOverAdd;
    if (end > props.pageCount) {
      const endOverAdd = props.pageCount - end;
      if (start - endOverAdd >= 0) start += endOverAdd;
      end = props.pageCount;
    }

    for (let index = start; index < end; index++) {
      arr.push(
        <PaginationItem
          key={index}
          text={(index + 1).toString()}
          active={index === currentPage}
          onPress={() => emitChange(index)} />
      );
    }
    return arr;
  }
  function emitChange(num: number) {
    if (typeof props.onCurrentPageChange === 'function')
      props.onCurrentPageChange(num);
  }

  function PaginationItem(thisProps: PaginationItemProps) {
    const active = thisProps.active || false;
    const touchable = thisProps.touchable !== false;
    const [ pressed, setPressed ] = useState(false);

    return (
      <TouchableHighlight
        underlayColor={Color.primary}
        style={{
          ...styles.itemButton,
          backgroundColor: active ? Color.primary : (touchable ? Color.white : PressedColor.default),
        }}
        onPress={touchable && !active ? thisProps.onPress : undefined}
        onHideUnderlay={() => setPressed(false)}
        onShowUnderlay={() => setPressed(true)}
      >
        <Text style={{
          ...styles.itemText,
          color: touchable ? (pressed || active ? Color.white : Color.primary) : Color.grey,
        }}>{thisProps.text}</Text>
      </TouchableHighlight>
    );
  }

  return (
    <RowView>
      { showNextPrev ? <PaginationItem text={prevText} touchable={canPrev} onPress={() => emitChange(currentPage - 1)} /> : <></> }
      { props.simple ? <Text style={styles.simpleText}>{ `${currentPage + 1}/${props.pageCount}` }</Text> : (<>{ renderItems() }</>) }
      { showNextPrev ? <PaginationItem text={nextText} touchable={canNext} onPress={() => emitChange(currentPage + 1)} /> : <></> }
    </RowView>
  );
}
