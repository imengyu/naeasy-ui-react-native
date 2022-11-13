import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SegmentedControl, Color, ColumnView } from '../lib';
import { ScrollView, Text } from 'react-native';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestSegmentedControl', 'RootStack'>;
interface State {
  page: number;
}

export class TestSegmentedControlScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    page: 1,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center style={{ padding: 10 }}>

          <Text style={{ padding: 10 }}>分段选择器组件。</Text>
          <SegmentedControl values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page} onChange={(v) => this.setState({ page: v })} />

          <Text style={{ padding: 10 }}>自定义颜色。</Text>
          <SegmentedControl tintColor={Color.success} values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page} onChange={(v) => this.setState({ page: v })} />

          <Text style={{ padding: 10 }}>禁用，用户不能点击更改。</Text>
          <SegmentedControl enabled={false} values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page} onChange={(v) => this.setState({ page: v })} />



        </ColumnView>
      </ScrollView>
    );
  }
}

