import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Color, WhiteSpace } from '../lib';
import { ScrollView, Text } from 'react-native';
import { RootStackParamList } from '../navigation';
import { SegmentedControl } from '../../lib/src/components/display/SegmentedControl';
import { TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

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
        <TestPageHeader
          title="SegmentedControl 分段选择器"
          desc="分段器由至少 2 个分段控件组成，用作不同视图的显示。"
          navigation={this.props.navigation}
        />
        <TestGroup>
          <Text>分段选择器组件。</Text>
          <WhiteSpace size="small" />

          <SegmentedControl values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page} onChange={(v) => this.setState({ page: v })} />

          <WhiteSpace size="small" />
          <Text>自定义颜色。</Text>
          <WhiteSpace size="small" />

          <SegmentedControl tintColor={Color.success} values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page2} onChange={(v) => this.setState({ page2: v })} />
          <WhiteSpace size="small" />
          <SegmentedControl tintColor={Color.warning} values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page3} onChange={(v) => this.setState({ page3: v })} />
          <WhiteSpace size="small" />
          <SegmentedControl tintColor={Color.danger} values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page4} onChange={(v) => this.setState({ page4: v })} />

          <WhiteSpace size="small" />
          <Text>自定义圆角</Text>
          <WhiteSpace size="small" />

          <SegmentedControl tintColor={Color.success} values={[ '选项1', '选项2', '选项3' ]} radius={30} selectedIndex={this.state.page5} onChange={(v) => this.setState({ page5: v })} />

          <WhiteSpace size="small" />
          <Text>禁用，用户不能点击更改。</Text>
          <WhiteSpace size="small" />

          <SegmentedControl touchable={false} values={[ '选项1', '选项2', '选项3' ]} selectedIndex={this.state.page6} onChange={(v) => this.setState({ page6: v })} />

          <WhiteSpace size="small" />
          <Text>部分条目禁用。</Text>
          <WhiteSpace size="small" />

          <SegmentedControl tintColor={Color.success} values={[
            { label: '选项1' },
            { label: '选项2', disabled: true },
            { label: '选项3' },
            { label: '选项4' },
          ]} selectedIndex={this.state.page} onChange={(v) => this.setState({ page: v })} />
        </TestGroup>
      </ScrollView>
    );
  }
}

