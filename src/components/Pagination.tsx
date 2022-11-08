import React, { useState } from 'react';
import { Text } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { Color, DynamicColor, DynamicThemeStyleSheet, PressedColor, ThemeColor, ThemeSelector } from '../styles';
import { RowView } from "./layout/RowView";
import { ThemeWrapper } from '../theme/Theme';

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
  /**
   * 按钮按下颜色
   */
  pressedColor?: ThemeColor;
  /**
   * 按钮按下时文字的颜色
   */
  pressedTextColor?: ThemeColor;
  /**
   * 按钮激活时（为当前页码）颜色
   */
  activeColor?: ThemeColor;
  /**
   * 按钮为非当前页码下颜色
   */
  deactiveColor?: ThemeColor;
  /**
   * 按钮激活时（为当前页码）文字颜色
   */
  activeTextColor?: ThemeColor;
  /**
   * 按钮为非当前页码下文字颜色
   */
  deactiveTextColor?: ThemeColor;
}
interface PaginationItemProps {
  text?: string;
  touchable?: boolean;
  active?: boolean;
  onPress?: () => void;
}

const styles = DynamicThemeStyleSheet.create({
  simpleText: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  itemButton: {
    backgroundColor: DynamicColor(Color.white),
    flexGrow: 1,
    alignSelf: 'auto',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    textAlign: 'center',
  },
  itemText: {
    color: DynamicColor(Color.text),
    fontSize: 13,
    textAlign: 'center',
  },
});

/**
 * 分页指示器组件
 */
export const Pagination = ThemeWrapper(function (props: PaginationProps) {

  const showNextPrev = props.showNextPrev || true;
  const nextText = props.nextText || '下一张';
  const prevText = props.prevText || '上一张';
  const currentPage = props.currentPage;
  const canNext = currentPage < props.pageCount - 1;
  const canPrev = currentPage > 0;
  const showPageCount = props.showPageCount || 5;
  const pressedColor = ThemeSelector.color(props.pressedColor || PressedColor(Color.white));
  const pressedTextColor = ThemeSelector.color(props.pressedTextColor || Color.textSecond);
  const activeColor = ThemeSelector.color(props.activeColor || Color.primary);
  const deactiveColor = ThemeSelector.color(props.deactiveColor || Color.white);
  const activeTextColor = ThemeSelector.color(props.activeTextColor || Color.white);
  const deactiveTextColor = ThemeSelector.color(props.deactiveTextColor || Color.text);

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
        underlayColor={pressedColor}
        style={{
          ...styles.itemButton,
          backgroundColor: active ? activeColor : (touchable ? deactiveColor : pressedColor),
        }}
        onPress={touchable && !active ? thisProps.onPress : undefined}
        onHideUnderlay={() => setPressed(false)}
        onShowUnderlay={() => setPressed(true)}
      >
        <Text style={{
          ...styles.itemText,
          color: touchable ? (pressed ? pressedTextColor : (active ? activeTextColor : deactiveTextColor)) : pressedTextColor,
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
});
