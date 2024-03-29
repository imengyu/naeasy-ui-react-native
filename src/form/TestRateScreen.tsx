import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Color } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Rate } from '../../lib/src/components/form';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestRate'>;
interface State {
  value1: number,
  value2: number,
  value3: number,
  value4: number,
  value5: number,
  value6: number,
}

export class TestRateScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    value1: 3,
    value2: 2,
    value3: 5,
    value4: 2.5,
    value5: 2,
    value6: 3.5,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Rate 评星"
          desc="用于对事物进行评级操作。"
          navigation={this.props.navigation}
        />
        <TestHeader>基础用法</TestHeader>
        <TestGroup>
          <Rate value={this.state.value1} onValueChange={(page) => this.setState({ value1: page })} />
        </TestGroup>
        <TestHeader>自定义图标和颜色</TestHeader>
        <TestGroup>
          <Rate value={this.state.value2} icon="cry-filling" voidIcon="cry" starActiveColor={Color.success} starColor={Color.lightGrey} onValueChange={(page) => this.setState({ value2: page })} />
        </TestGroup>
        <TestHeader>自定义大小</TestHeader>
        <TestGroup>
          <Rate value={this.state.value3} size={40} onValueChange={(page) => this.setState({ value3: page })} />
        </TestGroup>
        <TestHeader>可选择半星</TestHeader>
        <TestGroup>
          <Rate value={this.state.value4} half onValueChange={(page) => this.setState({ value4: page })} />
        </TestGroup>
        <TestHeader>自定义星星数量</TestHeader>
        <TestGroup>
          <Rate value={this.state.value5} count={10} onValueChange={(page) => this.setState({ value5: page })} />
        </TestGroup>
        <TestHeader>禁用状态</TestHeader>
        <TestGroup>
          <Rate value={this.state.value5} disabled onValueChange={(page) => this.setState({ value5: page })} />
        </TestGroup>
        <TestHeader desc="只读，不可选择。">只读状态</TestHeader>
        <TestGroup>
          <Rate value={this.state.value6} readonly onValueChange={(page) => this.setState({ value6: page })} />
        </TestGroup>
      </ScrollView>
    );
  }
}

