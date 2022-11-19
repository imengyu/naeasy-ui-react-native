import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Color, ColumnView, WhiteSpace } from '../lib';
import { ScrollView, Text } from 'react-native';
import { RootStackParamList } from '../navigation';
import { SegmentedControl } from '../../lib/src/components/display/SegmentedControl';
import { TestStyles } from '../styles/TestStyles';

type Props = StackScreenProps<RootStackParamList, 'TestSegmentedControl', 'RootStack'>;
interface State {
  page: number;
  page2: number;
  page3: number;
  page4: number;
  page5: number;
  page6: number;
}

export class TestSegmentedControlScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    page: 1,
    page2: 1,
    page3: 1,
    page4: 1,
    page5: 1,
    page6: 1,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center style={TestStyles.PaddingS}>

          <Text style={TestStyles.PaddingS}>分段选择器组件。</Text>
          <SegmentedControl values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page} onChange={(v) => this.setState({ page: v })} />

          <Text style={TestStyles.PaddingS}>自定义颜色。</Text>
          <SegmentedControl tintColor={Color.success} values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page2} onChange={(v) => this.setState({ page2: v })} />
          <WhiteSpace size="sm" />
          <SegmentedControl tintColor={Color.warning} values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page3} onChange={(v) => this.setState({ page3: v })} />
          <WhiteSpace size="sm" />
          <SegmentedControl tintColor={Color.danger} values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page4} onChange={(v) => this.setState({ page4: v })} />

          <Text style={TestStyles.PaddingS}>自定义圆角</Text>
          <SegmentedControl tintColor={Color.success} values={[ '选项1', '选项2', '选项3' ]} radius={30} selectedIndex={this.state.page5} onChange={(v) => this.setState({ page5: v })} />

          <Text style={TestStyles.PaddingS}>禁用，用户不能点击更改。</Text>
          <SegmentedControl touchable={false} values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page6} onChange={(v) => this.setState({ page6: v })} />

          <Text style={TestStyles.PaddingS}>部分条目禁用。</Text>
          <SegmentedControl tintColor={Color.success} values={[
            { label: '选项1' },
            { label: '选项2', disabled: true },
            { label: '选项3' },
          ]} selectedIndex={this.state.page} onChange={(v) => this.setState({ page: v })} />

        </ColumnView>
      </ScrollView>
    );
  }
}

