import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { FlatList, StyleSheet } from 'react-native';
import { ColumnView, CellGroup, Text, RowView, Icon, IconUtils, ScrollTabView } from '@imengyu-ui-lib-debug';

type Props = StackScreenProps<RootStackParamList, 'TestCell'>;

interface TestIconScreenState {
  icons: string[],
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: '47%',
  },
  itemText: { marginLeft: 10 },
});

//添加自定义图标
IconUtils.configIconMap({
  //普通图片
  'custom1': { source: require('../images/wechart.png'), svg: false },
  //svg 文件
  'custom2': { source: require('../images/wechart.svg'), svg: true },
  //svg 文字
  'custom3': `<svg viewBox="0 0 1024 1024"><path d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z"  ></path></svg>`,
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
      <ScrollTabView tabBarProps={{ tabs: [ '使用方法', '图标列表' ] }}>
        <ColumnView style={{ padding: 10 }}>
          <CellGroup title="基础用法">
            <Text>通过 name 属性来指定需要使用的图标，我们内置了一套图标库（见图标列表），可以直接传入对应的名称来使用。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <Icon icon="smile-filling" />
            </RowView>
          </CellGroup>
          <CellGroup title="图标颜色">
            <Text>通过 color 属性来设置图标的颜色。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <Icon icon="smile-filling" color="#ff0900" />
              <Icon icon="rise-filling" color="#f58220" />
              <Icon icon="success-filling" color="#1d953f" />
            </RowView>
          </CellGroup>
          <CellGroup title="图标大小">
            <Text>通过 size 属性来设置图标的尺寸大小。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <Icon icon="file-common-filling" size={20} />
              <Icon icon="file-common-filling" size={40} />
              <Icon icon="file-common-filling" size={60} />
            </RowView>
          </CellGroup>
          <CellGroup title="自定义图标">
            <Text>允许你添加自定义图标，可以是 字体图标、普通图像、svg图像。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <Icon icon="custom1" size={20} />
              <Icon icon="custom2" size={40} />
              <Icon icon="custom3" size={40} />
            </RowView>
          </CellGroup>
        </ColumnView>
        <FlatList
          data={this.state.icons}
          renderItem={(data) => {
            return (
              <RowView style={styles.item}>
                <Icon icon={data.item} size={30} />
                <Text style={styles.itemText}>{data.item}</Text>
              </RowView>
            );
          }}
          keyExtractor={item => item}
          numColumns={2}
        />
      </ScrollTabView>
    );
  }
}

