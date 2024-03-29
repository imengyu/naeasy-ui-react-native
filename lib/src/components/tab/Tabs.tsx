import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { ScrollView, StyleSheet, Text, TextStyle, Animated, ViewStyle, View, Easing} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { Color, PressedColor } from '../../styles';
import { deviceWidth, rpx } from '../../utils';
import { Swiper, SwiperItem, SwiperProps } from '../basic/Swiper';
import { Badge, BadgeProps } from '../display';
import { useThemeStyles } from '../../theme/ThemeStyleSheet';
import { ThemeColor, useThemeContext } from '../../theme/Theme';

//标签头组件
//==============================================================

export interface TabsItemData {
  /**
   * 标签显示文字
   */
  text: string|JSX.Element,
  /**
   * 是否禁用选择。
   * @default false
   */
  disabled?: boolean,
  /**
   * 红点标记的自定义属性。同 Badge 组件。
   */
  badgeProps?: BadgeProps,
  /**
   * 标签宽度。此设置优先级最高, 会覆盖 Tabs 组件的设置。
   */
  width?: number,
  /**
   * 指示器宽度，默认值从 Tabs 组件继承。
   */
  indicatorWidth?: number,
}
export interface TabsProps {
  /**
   * 标签数据
   */
  tabs: TabsItemData[];
  /**
   * 当前选中的标签位置
   */
  currentIndex: number;
  /**
   * 整个组件的高度
   * @default rpx(90)
   */
  height?: number,
  /**
   * 整个组件的宽度
   * @default deviceWidth
   */
  width?: number,
  /**
   * 是否自动根据容器宽度调整标签宽度
   * @default true
   */
  autoItemWidth?: boolean,
  /**
   * 指示器切换标签时是否有动画效果
   * @default true
   */
  indicatorAnim?: boolean,
  /**
   * 指示器动画偏移。通常用于 PagerView 的左右滚动时指示器联动动画。
   */
  indicatorOffsetAnim?: Animated.ValueXY,
  /**
   * 是否在用户切换标签后自动滚动至当前选中的条目
   * @default true
   */
  autoScroll?: boolean,
  /**
   * 标签宽度，在 autoItemWidth 为 false 时有效
   * @default rpx(100)
   */
  defaultItemWidth?: number,
  /**
   * 默认的指示器宽度。
   * @default itemWidth / 4
   */
  defaultIndicatorWidth?: number,
  /**
   * 标签自定义样式
   */
  itemStyle?: ViewStyle,
  /**
   * 标签正常状态的文字颜色
   * @default Color.text
   */
  textColor?: ThemeColor,
  /**
   * 标签禁用状态的文字颜色
   * @default Color.grey
   */
  disableTextColor?: ThemeColor,
  /**
   * 标签正常状态的文字样式
   */
  textStyle?: TextStyle,
  /**
   * 标签激活状态的文字颜色
   * @default Color.primary
   */
  activeTextColor?: ThemeColor,
  /**
   * 标签激活状态的文字样式
   */
  activeTextStyle?: TextStyle,
  /**
   * 标签按下颜色
   * @default PressedColor(Color.white）
   */
  underlayColor?: ThemeColor,
  /**
   * 指示器自定义样式
   */
  indicatorStyle?: ViewStyle,
  /**
   * 选中标签切换事件
   */
  onChange?: (index: number, tab: TabsItemData) => void;
  /**
   * 自定义渲染标签页
   */
  renderTab?: (tab: TabsItemData, active: boolean, itemWidth: number, index: number, onTabClick: () => void) => JSX.Element;
}

/**
 * 标签页顶部条组件
 */
export function Tabs(props: TabsProps) {

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);

  const {
    tabs,
    width = deviceWidth,
    height = rpx(90),
    defaultItemWidth = rpx(100),
    defaultIndicatorWidth,
    itemStyle,
    indicatorOffsetAnim = new Animated.ValueXY({ x: 0, y: 0 }),
    indicatorAnim = true,
    autoItemWidth = true,
    autoScroll =  true,
    underlayColor = PressedColor(Color.white),
    currentIndex,
    activeTextColor = Color.primary,
    activeTextStyle,
    disableTextColor = Color.grey,
    textColor = Color.text,
    textStyle,
    indicatorStyle = { backgroundColor: themeContext.resolveThemeColor(Color.primary) },
    renderTab,
    onChange,
  } = themeContext.resolveThemeProps(props, {
    width: 'TabsDefaultWidth',
    height: 'TabsDefaultHeight',
    defaultIndicatorWidth: 'TabsDefaultIndicatorWidth',
    defaultItemWidth: 'TabsDefaultItemWidth',
    underlayColor: 'TabsUnderlayColor',
    activeTextColor: 'TabsActiveTextColor',
    disableTextColor: 'TabsDisableTextColor',
    textColor: 'TabsTextColor',
  });

  const scrollRef = useRef<ScrollView>(null);

  function onTabClick(index: number) {
    onChange?.(index, tabs[index]);
  }

  const themedUnderlayColor = themeContext.resolveThemeColor(underlayColor);
  const themedActiveTextColor = themeContext.resolveThemeColor(activeTextColor);
  const themedTextColor = themeContext.resolveThemeColor(textColor);
  const themedDisableTextColor = themeContext.resolveThemeColor(disableTextColor);

  const indicatorPos = useRef(new Animated.Value(0));
  const indicatorWidth = useRef(new Animated.Value(0));

  //条目宽度计算
  const itemWidthArr = useRef<number[]>([]);
  const itemIndicatorWidthWidthArr = useRef<number[]>([]);
  const itemPosArr = useRef<number[]>([]);
  useEffect(() => {
    let targetLeft = 0;
    for (let i = 0; i <= tabs.length; i++) {
      if (i === tabs.length) {
        itemWidthArr.current[i] = 0;
        itemPosArr.current[i] = targetLeft;
        itemIndicatorWidthWidthArr.current[i] = 0;
      } else {
        const itemWidth = tabs[i].width || (autoItemWidth ? (width / tabs.length) : defaultItemWidth);
        itemWidthArr.current[i] = itemWidth;
        itemPosArr.current[i] = targetLeft;
        itemIndicatorWidthWidthArr.current[i] = tabs[currentIndex].indicatorWidth || defaultIndicatorWidth || itemWidth / 4;
        targetLeft += itemWidth;
      }
    }
  }, [
    tabs, currentIndex, autoItemWidth,
    defaultItemWidth, width, defaultIndicatorWidth,
  ]);

  //pager view滚动，使指示器移动动画
  useEffect(() => {
    const id = indicatorOffsetAnim.addListener((value) => {
      const { x, y } = value;

      const currentWidth = itemWidthArr.current[x];
      const currentIndicatorWidth = itemIndicatorWidthWidthArr.current[x];
      const startLeft = itemPosArr.current[x] + currentWidth / 2 - currentIndicatorWidth / 2;

      const nextWidth = itemWidthArr.current[x + 1];
      const nextIndicatorWidth = itemIndicatorWidthWidthArr.current[x + 1];
      const nextPos = itemPosArr.current[x + 1] + nextWidth / 2 - nextIndicatorWidth / 2;

      indicatorPos.current.setValue(startLeft + (nextPos - startLeft) * y);
    });
    return () => {
      indicatorOffsetAnim.removeListener(id);
    };
  }, [
    indicatorOffsetAnim,
  ]);

  //选中条目变换时，执行移动指示器动画
  useEffect(() => {
    const itemWidth = itemWidthArr.current[currentIndex];
    const targetWidth = itemIndicatorWidthWidthArr.current[currentIndex];
    const targetLeft = itemPosArr.current[currentIndex] + itemWidth / 2 - targetWidth / 2;
    const targetScrollLeft = targetLeft - width / 2 + targetWidth / 2;

    if (autoScroll)
      scrollRef.current?.scrollTo({ x: targetScrollLeft });

    if (indicatorAnim) {
      Animated.parallel([
        Animated.timing(indicatorPos.current, {
          useNativeDriver: false,
          toValue: targetLeft,
          easing: Easing.linear,
          duration: indicatorOffsetAnim ? 200 : 250,
        }),
        Animated.timing(indicatorWidth.current, {
          useNativeDriver: false,
          toValue: targetWidth,
          easing: indicatorOffsetAnim ? Easing.linear : Easing.ease,
          duration: indicatorOffsetAnim ? 200 : 250,
        }),
      ]).start();
    } else {
      indicatorPos.current.setValue(targetLeft);
      indicatorWidth.current.setValue(targetWidth);
    }
  }, [
    currentIndex, autoScroll, indicatorAnim, width, indicatorOffsetAnim,
  ]);

  function renderChilds() {
    return tabs.map((tabData, index) => {

      const active = currentIndex === index;
      const { disabled } = tabData;
      const itemWidth : number = tabData.width || (autoItemWidth ? (width / tabs.length) : defaultItemWidth);

      if (renderTab)
        return renderTab(tabData, active, itemWidth, index, () => onTabClick(index));

      return (
        <TouchableHighlight
          underlayColor={themedUnderlayColor}
          style={[
            themeStyles.tabItem,
            itemStyle,
            { width: itemWidth, height },
          ]}
          onPress={disabled ? undefined : () => onTabClick(index)}
          key={"tabItem" + index}
        >
          <Badge content={tabData.badgeProps ? undefined : 0} { ...tabData.badgeProps }>
            { typeof tabData.text === 'string' ? <Text
              style={[
                themeStyles.tabItemText,
                { color: disabled ? themedDisableTextColor : (active ? themedActiveTextColor : themedTextColor) },
                active ? activeTextStyle : textStyle,
              ]}
            >{tabData.text}</Text> : tabData.text }
          </Badge>
        </TouchableHighlight>
      );
    });
  }
  function renderIndicatorBar() {
    return (
      <Animated.View
        style={[
          themeStyles.tabIndicator,
          indicatorStyle,
          {
            width: indicatorWidth.current,
          },
          {
            transform: [{
              translateX: indicatorPos.current,
            }],
          },
        ]}
      />
    );
  }

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      contentContainerStyle={themeStyles.tab}
      showsHorizontalScrollIndicator={false}
      style={[
        themeStyles.tab,
        { width, height },
      ]}
    >
      { renderChilds() }
      { renderIndicatorBar() }
    </ScrollView>
  );
}

//标签页组件
//==============================================================

export interface TabsPageProps {
  /**
   * 子级，必须是 TabsPageItem
   */
  children: React.ReactElement<TabsPageItemProps>[]|React.ReactElement<TabsPageItemProps>,
  /**
   * Tabs 标签组件的自定义属性
   */
  tabsProps?: Omit<TabsProps, 'tabs'|'currentIndex'|'onChange'>,
  /**
   * Swiper 组件的自定义属性
   */
  swiperProps?: Omit<SwiperProps, 'current'|'onPageChange'>,
  /**
   * 外层样式
   */
  style?: ViewStyle;
  /**
   * 页面切换后事件
   */
  onPageSelected?: (index: number) => void;
}
export interface TabsPageItemProps extends TabsItemData {
  children: React.ReactNode;
}
export interface TabsPageInstance {
  /**
   * 切换页面
   * @param index 页码
   */
  switchPage?: (index: number, animate?: boolean) => void;
}

/**
 * TabsPage 的子级组件，用来表示标签页。
 * 此组件必须嵌入在 TabsPage 中使用。
 */
export function TabsPageItem(_props: TabsPageItemProps) {
  return <></>;
}
/**
 * 标签页组件，带内容切换
 */
export const TabsPage = forwardRef<TabsPageInstance, TabsPageProps>((props, ref) => {

  const childs = props.children instanceof Array ? props.children : [ props.children ];
  const { onPageSelected } = props;
  const [ tabIndex, setTabIndex ] = useState(0);

  useImperativeHandle(ref, () => ({
    switchPage: (p) => setTabIndex(p),
  }));

  return (
    <View
      style={[
        styles.tabPageContainer,
        props.style,
      ]}
    >
      <Tabs
        tabs={childs.map(k => k.props)}
        currentIndex={tabIndex}
        onChange={(index) => {
          setTabIndex(index);
        }}
        {...props.tabsProps}
      />
      {/* Tab页面 */}
      <Swiper
        current={tabIndex}
        onPageChange={(index) => {
          setTabIndex(index);
          onPageSelected?.(index);
        }}
        style={props.style}
        { ...props.swiperProps }
      >
        { childs.map((k, i) => (
          <SwiperItem key={k.key || i}>
            { k.props.children }
          </SwiperItem>
        )) }
      </Swiper>
    </View>
  );
});


const styles = StyleSheet.create({
  tabPageContainer: {
    position: 'relative',
    flexDirection: 'column',
    flex: 1,
  },
  tabPagePager: {
    flex: 1,
  },
  tab: {
    position: 'relative',
    ...Platform.select({
      web: {
        flexShrink: 1,
      },
    }),
    flexGrow: 0,
    height: 'auto',
  },
  tabItem: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
  },
  tabItemText: {
    fontSize: 15,
  },
  tabIndicator: {
    position: 'absolute',
    height: 3,
    borderRadius: 3,
    left: 0,
    bottom: 0,
    zIndex: 10,
  },
});
