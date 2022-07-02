import React from "react";
import { Animated, StyleSheet, ViewStyle, View } from "react-native";
import PagerView, { PagerViewProps } from "react-native-pager-view";
import { ScrollableTabBar, ScrollableTabBarProps } from "./ScrollableTabBar";

export interface ScrollTabViewProps {
  /**
   * 子级
   */
  children?: JSX.Element|JSX.Element[];
  /**
   * ScrollableTabBar 属性
   */
  tabBarProps: ScrollableTabBarProps;
  /**
   * PagerView 属性
   */
  pagerProps?: PagerViewProps;
  /**
   * 外层样式
   */
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
  },
});

interface State {
  currentTab: number;
}

/**
 * 一个TabView组件
 */
export class ScrollTabView extends React.Component<ScrollTabViewProps, State> {

  state: Readonly<State> = {
    currentTab: (this.props.pagerProps && this.props.pagerProps.initialPage) || 0,
  };

  pagerScrollValue = new Animated.Value(0);
  pagerRef : PagerView|null = null;

  render(): React.ReactNode {
    return (
      <View style={{ ...styles.pager, ...this.props.style }}>
        <ScrollableTabBar
          { ...this.props.tabBarProps }
          activeTab={this.state.currentTab}
          goToPage={(t) => {
            this.setState({ currentTab: t });
            this.pagerRef?.setPage(t);
          }}
        />
        {/* Tab页面 */}
        <PagerView
          style={styles.pager}
          { ...this.props.pagerProps }
          ref={(v) => { this.pagerRef = v;}}
          onPageSelected={(e) => this.setState({ currentTab: e.nativeEvent.position })}
          onPageScroll={(e) => this.pagerScrollValue.setValue(e.nativeEvent.position + e.nativeEvent.offset)}
        >
          { this.props.children }
        </PagerView>
      </View>
    );
  }
}
