import { rpx } from '../../utils/StyleConsts';
import React from 'react';
import {
  View,
  Animated,
  Pressable,
  ScrollView,
  Text,
  Platform,
  Dimensions,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';
import { Color, DynamicColor, DynamicThemeStyleSheet, ThemeColor, ThemeSelector } from '../../styles';
import { ThemeWrapper } from '../../theme/Theme';

const WINDOW_WIDTH = Dimensions.get('window').width;

export interface ScrollableTabBarProps {
  /**
   * 用户点击，跳转指定页的事件
   */
  goToPage?: (p: number) => void;
  /**
   * tab 的最窄宽度，默认是屏幕宽度
   */
  width?: number,
  /**
  * 当前激活Tab的索引
  */
  activeTab?: number;
  /**
  * 所有tab数据
  */
  tabs?: string[];
  /**
  * 背景颜色
  */
  backgroundColor?: string;
  /**
  * 激活时tab的文字颜色
  */
  activeTextColor?: ThemeColor;
  /**
  * 未激活时tab的文字颜色
  */
  inactiveTextColor?: ThemeColor;
  /**
  * 滚动偏移
  */
  scrollOffset?: number;
  /**
  * 自定义样式
  */
  style?: ViewStyle;
  /**
  * tab的自定义样式
  */
  tabStyle?: ViewStyle;
  /**
  * tab容器的自定义样式
  */
  tabsContainerStyle?: ViewStyle;
  /**
  * tab文字的自定义样式
  */
  textStyle?: TextStyle;
  /**
   * 激活时tab文字的自定义样式
   */
  activeTextStyle?: TextStyle;
  /**
   * 自定义渲染tab函数
   */
  renderTab?: (name: string, page: number, isTabActive: boolean, onPressHandler: (page: number) => void, onLayoutHandler: (event: LayoutChangeEvent) => void) => JSX.Element;
  /**
   * 下划指示线的样式
   */
  underlineStyle?: ViewStyle;
  /**
   * 下划指示线的宽度
   */
  tabUnderlineWidth?: number;
  /**
   * pagerview绑定的滚动值
   */
  scrollValue?: Animated.Value;
  /**
   * pagerview绑定的滚动值
   */
  scrollValueOffset?: Animated.Value;
}
interface ScrollableTabBarState {
  _leftTabUnderline: Animated.Value,
  _widthTabUnderline: Animated.Value,
  _containerWidth: number|null,
}
interface MeasurementData {
  left: number,
  right: number,
  width: number,
  height: number,
}

const DEFAULT_PROPS = {
  scrollOffset: 52,
  activeTextColor: Color.primary,
  inactiveTextColor: Color.text,
  backgroundColor: 'transparent',
  style: {},
  tabStyle: {},
  tabsContainerStyle: {},
  underlineStyle: {},
};

/**
 * 一个TabView 头部组件
 */
class ScrollableTabBarComponent extends React.Component<ScrollableTabBarProps, ScrollableTabBarState> {
  static defaultProps = DEFAULT_PROPS;

  _tabsMeasurements = [] as MeasurementData[];
  _tabContainerMeasurements : LayoutRectangle = { x: 0, y: 0, width: 0, height: 0 };
  _containerMeasurements : LayoutRectangle = { x: 0, y: 0, width: 0, height: 0 };
  _scrollView: ScrollView|null = null;
  _scrollValueCurrent = 0;
  _scrollValueCurrentOffset = 0;

  constructor(props: ScrollableTabBarProps) {
    super(props);
    this._tabsMeasurements = [];
    this.state = {
      _leftTabUnderline: new Animated.Value(0),
      _widthTabUnderline: new Animated.Value(0),
      _containerWidth: null,
    };
    this.updateView = this.updateView.bind(this);
    this.updateScrollValueOffset = this.updateScrollValueOffset.bind(this);
    this.necessarilyMeasurementsCompleted =
      this.necessarilyMeasurementsCompleted.bind(this);
    this.updateTabPanel = this.updateTabPanel.bind(this);
    this.updateTabUnderline = this.updateTabUnderline.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.measureTab = this.measureTab.bind(this);
    this.onTabContainerLayout = this.onTabContainerLayout.bind(this);
    this.onContainerLayout = this.onContainerLayout.bind(this);
  }

  componentDidMount() {
    if (this.props.scrollValue) this.props.scrollValue.addListener(this.updateView);
    if (this.props.scrollValueOffset) this.props.scrollValueOffset.addListener(this.updateScrollValueOffset);
  }
  updateScrollValueOffset(v: { value: number }) {
    this._scrollValueCurrentOffset = v.value;

    const position = this._scrollValueCurrent;
    const pageOffset = this._scrollValueCurrentOffset;
    const tabCount = this.props.tabs && this.props.tabs.length || 0;

    this.updateTabUnderline(position, pageOffset, tabCount);
  }
  updateView(offset: { value: number }) {
    this._scrollValueCurrent = offset.value;

    const position = this._scrollValueCurrent;
    const pageOffset = this._scrollValueCurrentOffset;
    const tabCount = this.props.tabs && this.props.tabs.length || 0;
    const lastTabPosition = tabCount - 1;

    if (tabCount === 0 || position < 0 || position > lastTabPosition) {
      return;
    }

    if (
      this.necessarilyMeasurementsCompleted(
        position,
        position === lastTabPosition,
      )
    ) {
      this.updateTabPanel(position, pageOffset);
      this.updateTabUnderline(position, pageOffset, tabCount);
    }
  }

  necessarilyMeasurementsCompleted(position: number, isLastTab: boolean) {
    return (
      this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements
    );
  }

  updateTabPanel(position: number, pageOffset: number) {
    const containerWidth = this._containerMeasurements.width;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth =
      (nextTabMeasurements && nextTabMeasurements.width) || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -=
      (containerWidth -
        (1 - pageOffset) * tabWidth -
        pageOffset * nextTabWidth) /
      2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;

    if (Platform.OS === 'android') {
      this._scrollView?.scrollTo({ x: newScrollX, y: 0, animated: false });
    } else {
      const rightBoundScroll =
        this._tabContainerMeasurements.width -
        this._containerMeasurements.width;
      newScrollX =
        newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      this._scrollView?.scrollTo({ x: newScrollX, y: 0, animated: false });
    }
  }

  updateTabUnderline(position: number, pageOffset: number, tabCount: number) {
    const lineLeft = this._tabsMeasurements[position].left;
    const lineRight = this._tabsMeasurements[position].right;
    if (position < tabCount - 1) {
      const nextTabLeft = this._tabsMeasurements[position + 1].left;
      const nextTabRight = this._tabsMeasurements[position + 1].right;

      const newLineLeft =
        pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft;
      const newLineRight =
        pageOffset * nextTabRight + (1 - pageOffset) * lineRight;

      const originWidth = newLineRight - newLineLeft;
      const calcWidthUnderline = Math.min(
        this.props.tabUnderlineWidth || originWidth * 0.6,
        originWidth,
      );
      const calcLeftUnderline =
        newLineLeft + (originWidth - calcWidthUnderline) / 2;

      this.state._leftTabUnderline.setValue(calcLeftUnderline);
      this.state._widthTabUnderline.setValue(calcWidthUnderline);
    } else {
      const originWidth = lineRight - lineLeft;
      const calcWidthUnderline = Math.min(
        this.props.tabUnderlineWidth || originWidth * 0.6,
        originWidth,
      );
      const calcLeftUnderline =
        lineLeft + (originWidth - calcWidthUnderline) / 2;

      this.state._leftTabUnderline.setValue(calcLeftUnderline);
      this.state._widthTabUnderline.setValue(calcWidthUnderline);
    }
  }

  renderTab(name: string, page: number, isTabActive: boolean, onPressHandler: (page: number) => void, onLayoutHandler: (event: LayoutChangeEvent) => void) {
    const { activeTextColor, inactiveTextColor, textStyle, activeTextStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <Pressable
        key={`${name}_${page}`}
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}>
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text style={[{ color: ThemeSelector.color(textColor), fontWeight }, isTabActive ? activeTextStyle : textStyle]}>
            {name}
          </Text>
        </View>
      </Pressable>
    );
  }

  measureTab(page: number, event: LayoutChangeEvent) {
    const { x, width, height } = event.nativeEvent.layout;
    this._tabsMeasurements[page] = { left: x, right: x + width, width, height };
    this.updateView({ value: this._scrollValueCurrent /* this.props.scrollValue.__getValue() */ });
  }

  render() {
    const dynamicTabUnderline = {
      left: this.state._leftTabUnderline,
      width: this.state._widthTabUnderline,
    };



    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.backgroundColor },
          this.props.style,
        ]}
        onLayout={this.onContainerLayout}>
        <ScrollView
          ref={scrollView => {
            this._scrollView = scrollView;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          bounces={false}
          scrollsToTop={false}>
          <View
            style={[
              styles.tabs,
              { width: this.state._containerWidth || undefined },
              this.props.tabsContainerStyle,
            ]}
            onLayout={this.onTabContainerLayout}>
            {
              this.props.tabs && this.props.tabs.map((name, page) => {
                const isTabActive = this.props.activeTab === page;
                const renderTab = this.props.renderTab || this.renderTab;
                return renderTab(
                  name,
                  page,
                  isTabActive,
                  this.props.goToPage || (() => {}),
                  this.measureTab.bind(this, page),
                );
              })
            }
            <Animated.View
              style={[
                styles.tabUnderlineStyle,
                dynamicTabUnderline,
                this.props.underlineStyle,
              ]}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidUpdate(prevProps: ScrollableTabBarProps) {
    // If the tabs change, force the width of the tabs container to be recalculated
    if (
      JSON.stringify(prevProps.tabs) !== JSON.stringify(this.props.tabs) &&
      this.state._containerWidth
    ) {
      this.setState({ _containerWidth: null });
    }
  }

  onTabContainerLayout(e: LayoutChangeEvent) {
    this._tabContainerMeasurements = e.nativeEvent.layout;
    let width = this._tabContainerMeasurements.width;
    const minWidth = this.props.width ? this.props.width : WINDOW_WIDTH;
    if (width < minWidth) {
      width = minWidth;
    }
    this.setState({ _containerWidth: width });
    this.updateView({ value: this._scrollValueCurrent /* this.props.scrollValue.__getValue() */ });
  }

  onContainerLayout(e: LayoutChangeEvent) {
    this._containerMeasurements = e.nativeEvent.layout;
    this.updateView({ value: this._scrollValueCurrent /* this.props.scrollValue.__getValue() */ });
  }
}

/**
 * 一个TabView 头部组件
 */
export const ScrollableTabBar = ThemeWrapper(ScrollableTabBarComponent);

const styles = DynamicThemeStyleSheet.create({
  tab: {
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rpx(30),
  },
  container: {
    height: 50,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: DynamicColor(Color.border),
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabUnderlineStyle: {
    position: 'absolute',
    height: 3,
    borderRadius: 1.5,
    backgroundColor: DynamicColor(Color.primary),
    bottom: 0,
  },
});
