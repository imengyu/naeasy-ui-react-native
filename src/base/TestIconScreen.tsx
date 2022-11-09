import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { FlatList } from 'react-native';
import { ColumnView, CellGroup, Text, RowView, Icon, IconUtils, rpx } from '@imengyu-ui-lib-debug';

type Props = StackScreenProps<RootStackParamList, 'TestCell'>;

interface TestIconScreenState {
  icons: string[],
}

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
      <ColumnView center style={{ padding: 10 }}>
        <CellGroup title="基础用法">
          <Text>通过 name 属性来指定需要使用的图标，我们内置了一套图标库（见下面示例），可以直接传入对应的名称来使用。</Text>
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
        <CellGroup title="图标列表">
          <Text>下面是一个完整的图标列表。</Text>
          <FlatList
            data={this.state.icons}
            renderItem={(data) => {
              return (
                <RowView style={{ alignItems: 'center', paddingVertical: 5, paddingHorizontal: 15 }}>
                  <Icon icon={data.item} size={30} />
                  <Text style={{ marginLeft: 10 }}>{data.item}</Text>
                </RowView>
              );
            }}
            keyExtractor={item => item}
            style={{
              marginVertical: 10,
              backgroundColor: '#fff',
              borderRadius: 10,
              height: rpx(590),
            }}
          />
        </CellGroup>
      </ColumnView>
    );
  }
}

