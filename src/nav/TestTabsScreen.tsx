import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';
import { Tabs, TabsPage, TabsPageItem } from '../../lib/src/components/tab/Tabs';
import { rpx, RowView, Icon, Text, Color, ColumnView } from '../lib';

type Props = StackScreenProps<RootStackParamList, 'TestTabs', 'RootStack'>;

export function TestTabsScreen(props: Props) {

  const [ tabIndex1, setTabIndex1 ] = useState(0);
  const [ tabIndex2, setTabIndex2 ] = useState(0);
  const [ tabIndex3, setTabIndex3 ] = useState(0);
  const [ tabIndex4, setTabIndex4 ] = useState(0);
  const [ tabIndex5, setTabIndex5 ] = useState(0);
  const [ tabIndex6, setTabIndex6 ] = useState(0);

  return (
    <ScrollView>
      <TestPageHeader
        title="Tabs 标签页"
        desc="选项卡组件，用于在不同的内容区域之间进行切换。"
        navigation={props.navigation}
      />
      <TestHeader>基础用法</TestHeader>
      <TestGroup noHorizontalPadding white>
        <Tabs
          tabs={[
            { text: '标签页1' },
            { text: '标签页2' },
            { text: '标签页3' },
          ]}
          currentIndex={tabIndex1}
          onChange={setTabIndex1}
        />
      </TestGroup>
      <TestHeader desc="设置 autoItemWidth=false 禁用标签自动大小，此时可通过 defaultItemWidth 设置所有标签宽度，也可通过条目的 width 单独设置宽度">自定义标签宽度</TestHeader>
      <TestGroup noHorizontalPadding white>
        <Tabs
          tabs={[
            { text: '正常标签页' },
            { text: '自定义指示器宽度', width: rpx(300), indicatorWidth: rpx(300) },
            { text: '标签页3 宽度300', width: rpx(300) },
            { text: '标签页4 宽度100', width: rpx(100) },
          ]}
          autoItemWidth={false}
          defaultItemWidth={rpx(200)}
          currentIndex={tabIndex2}
          onChange={setTabIndex2}
        />
      </TestGroup>
      <TestHeader desc="设置 autoItemWidth=false 禁用标签自动大小，当标签宽度超出父级时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。">标签栏滚动</TestHeader>
      <TestGroup noHorizontalPadding white>
        <Tabs
          tabs={[
            { text: '标签页1' },
            { text: '标签页2' },
            { text: '标签页3' },
            { text: '标签页4' },
            { text: '标签页5' },
            { text: '标签页6' },
            { text: '标签页7' },
            { text: '标签页8' },
            { text: '标签页9' },
            { text: '标签页10' },
          ]}
          autoItemWidth={false}
          defaultItemWidth={rpx(200)}
          currentIndex={tabIndex3}
          onChange={setTabIndex3}
        />
      </TestGroup>
      <TestHeader desc="设置 disabled 属性即可禁用标签">禁用标签</TestHeader>
      <TestGroup noHorizontalPadding white>
        <Tabs
          tabs={[
            { text: '标签页1' },
            { text: '标签页2' },
            { text: '标签页3', disabled: true },
            { text: '标签页4', disabled: true },
            { text: '标签页5' },
          ]}
          currentIndex={tabIndex4}
          onChange={setTabIndex4}
        />
      </TestGroup>
      <TestHeader>带小红点</TestHeader>
      <TestGroup noHorizontalPadding white>
        <Tabs
          tabs={[
            { text: '标签页1' },
            { text: '带小红点', badgeProps: { offset: { x: 8, y: 2 }  } },
            { text: '带数字红点', badgeProps: { content: 423, maxCount: 99, offset: { x: 8, y: 2 }  } },
          ]}
          currentIndex={tabIndex5}
          onChange={setTabIndex5}
        />
      </TestGroup>
      <TestHeader>自定义渲染</TestHeader>
      <TestGroup noHorizontalPadding white>
        <Tabs
          tabs={[
            { text: '标签页1' },
            { text: '标签页2' },
          ]}
          currentIndex={tabIndex6}
          onChange={setTabIndex6}
          renderTab={(tab, active, width, index, onPress) => (
            <RowView key={index} center width={width} touchable onPress={onPress}>
              <Icon icon="warning" />
              <Text color={active ? Color.danger : Color.success}>{tab.text}</Text>
            </RowView>
          )}
        />
      </TestGroup>
      <TestHeader desc="基于 react-native-pager-view 封装，支持左右手势换页。你也可以参考 TabsPage 源码 +Tabs 封装自己的标签页内容组件。">标签页内容组件</TestHeader>
      <TestGroup noHorizontalPadding white>
        <TabsPage style={{ height: rpx(500) }}>
          <TabsPageItem text="标签页1">
            <ColumnView flex={1} center>
              <Text>标签页内容1</Text>
            </ColumnView>
          </TabsPageItem>
          <TabsPageItem text="标签页2">
            <ColumnView flex={1} center>
              <Text>标签页内容2</Text>
            </ColumnView>
          </TabsPageItem>
          <TabsPageItem text="标签页3">
            <ColumnView flex={1} center>
              <Text>标签页内容3</Text>
            </ColumnView>
          </TabsPageItem>
        </TabsPage>

      </TestGroup>
    </ScrollView>
  );
}

