import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, RowView, Divider, Color, Text } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

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
        <TestPageHeader
          title="Divider 分隔线"
          desc="用于将内容分隔为多个区域。"
          navigation={this.props.navigation}
        />
        <TestHeader desc="通过 Divider 组件显示分割线。">基础用法</TestHeader>
        <TestGroup>
          <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. </Text>
          <Divider />
          <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. </Text>
        </TestGroup>
        <TestHeader>虚线分割线</TestHeader>
        <TestGroup>
          <Divider text="我是虚线分割线" dashed />
        </TestGroup>
        <TestHeader>带文字分割线</TestHeader>
        <TestGroup>
          <Divider text="我是带文字分割线" />
        </TestGroup>
        <TestHeader>自定义高度分割线</TestHeader>
        <TestGroup>
          <Divider text="我是自定义高度的分割线" size={50}  />
        </TestGroup>
        <TestHeader>自定义颜色与粗细</TestHeader>
        <TestGroup>
          <ColumnView padding={10}>
          <Divider color={Color.success} />
          <Text>上面是自定义颜色分割线。</Text>
          <Divider color={Color.danger} width={5} />
          <Text>上面是自定义粗细分割线。</Text>
        </ColumnView>
        </TestGroup>
        <TestHeader desc="说明">垂直的分割线</TestHeader>
        <TestGroup>
          <RowView padding={10}>
            <Text>垂直的分割线</Text>
            <Divider type="vertical" color={Color.danger} />
            <Text>分割线</Text>
            <Divider type="vertical" color={Color.success} width={2} dashed />
            <Text>垂直的分割线</Text>
          </RowView>
        </TestGroup>
      </ScrollView>
    );
  }
}

