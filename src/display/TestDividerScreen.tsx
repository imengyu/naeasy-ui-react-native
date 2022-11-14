import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, CellGroup, RowView, Divider, Color, Text } from '../lib';
import { ScrollView } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestDivider'>;
interface State {
  showTag: boolean
}

export class TestDividerScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    showTag: true,
  };

  render() {
    return (
      <ScrollView>
        <ColumnView>
          <CellGroup title="基础用法" inset>
            <Text style={TestStyles.TitleText}>通过 Divider 组件显示分割线。</Text>
            <ColumnView padding={10}>
              <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. </Text>
              <Divider />

              <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. </Text>

              <Divider text="我是带文字分割线" backgroundColor={Color.white} />
              <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. </Text>

              <Divider text="我是自定义高度的分割线" size={50} backgroundColor={Color.white} />
              <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. </Text>
            </ColumnView>
          </CellGroup>
          <CellGroup title="自定义颜色与粗细" inset>
            <ColumnView padding={10}>
              <Divider color={Color.success} />
              <Text>上面是自定义颜色分割线。</Text>

              <Divider color={Color.danger} width={5} />
              <Text>上面是自定义粗细分割线。</Text>
            </ColumnView>
          </CellGroup>
          <CellGroup title="垂直的分割线" inset>
            <RowView padding={10}>
              <Text>垂直的分割线(红色)</Text>
              <Divider type="vertical" color={Color.danger} />
              <Text>分割线</Text>
              <Divider type="vertical" />
              <Text>垂直的分割线</Text>
            </RowView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

