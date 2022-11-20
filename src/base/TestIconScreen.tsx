import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { ColumnView, Text, RowView, Icon, IconUtils } from '../lib';
import { TabsPage, TabsPageItem } from '../../lib/src/components/tab';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestCell'>;

interface TestIconScreenState {
  icons: string[],
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderColor: '#efefef',
    borderWidth: 1,
    borderBottomWidth: 0,
    width: '33%',
  },
  itemText: {
    marginTop: 10,
  },
});

//添加自定义图标
IconUtils.configIconMap({
  //普通图片
  'custom1': { source: require('../images/wechart.png'), svg: false },
  //svg 文件
  'custom2': { source: require('../images/wechart.svg'), svg: true },
  //svg 文字
  'custom3': '<svg viewBox="0 0 1024 1024"><path d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z"></path></svg>',
  //网络图片
  'custom4': 'https://imengyu.top/assets/images/test/2.jpg',
});

export class TestIconScreen extends React.PureComponent<Props, TestIconScreenState> {

  state: Readonly<TestIconScreenState> = {
    icons: [],
  };

  componentDidMount() {
    const arr : string[] = Object.keys(IconUtils.getIconMap());
    setTimeout(() => {
      this.setState({
        icons: arr,
      });
    }, 200);
  }

  render(): React.ReactNode {
    return (
      <TabsPage>
        <TabsPageItem text="使用方法">
          <ScrollView>

            <TestPageHeader
              title="Icon 图标"
              desc="Icon是基于矢量图的图标集，你可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。支持引入 iconfont 图标库。"
              navigation={this.props.navigation}
            />
            <TestHeader desc="通过 name 属性来指定需要使用的图标，我们内置了一套图标库（见图标列表），可以直接传入对应的名称来使用。">基础用法</TestHeader>
            <TestGroup>
              <RowView>
                <Icon name="smile-filling" />
                <Icon name="success" />
                <Icon name="user" />
              </RowView>
            </TestGroup>
            <TestHeader desc="通过 color 属性来设置图标的颜色。">图标颜色</TestHeader>
            <TestGroup>
              <RowView>
                <Icon name="smile-filling" color="#ff0900" />
                <Icon name="rise-filling" color="#f58220" />
                <Icon name="success-filling" color="#1d953f" />
              </RowView>
            </TestGroup>
            <TestHeader desc="通过 size 属性来设置图标的尺寸大小。">图标大小</TestHeader>
            <TestGroup>
              <RowView>
                <Icon name="file-common-filling" size={20} />
                <Icon name="file-common-filling" size={40} />
                <Icon name="file-common-filling" size={60} />
              </RowView>
            </TestGroup>
            <TestHeader desc="支持注册自定义图标，可以是 字体图标、普通图像、svg图像。具体可参考 Demo 源代码。">自定义图标</TestHeader>
            <TestGroup>
              <RowView>
                <Icon name="custom1" size={20} />
                <Icon name="custom2" size={40} />
                <Icon name="custom3" size={40} />
              </RowView>
            </TestGroup>
          </ScrollView>
        </TabsPageItem>
        <TabsPageItem text="图标列表">
          <FlatList
            data={this.state.icons}
            renderItem={(data) => {
              return (
                <ColumnView style={styles.item}>
                  <Icon name={data.item} size={30} />
                  <Text style={styles.itemText} selectable>{data.item}</Text>
                </ColumnView>
              );
            }}
            keyExtractor={item => item}
            numColumns={3}
          />
        </TabsPageItem>
      </TabsPage>
    );
  }
}

