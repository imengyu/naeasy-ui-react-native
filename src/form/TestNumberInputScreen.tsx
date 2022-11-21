import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Color } from '../lib';
import { RootStackParamList } from '../navigation';
import { ScrollView } from 'react-native';
import { NumberInput } from '../../lib/src/components/form';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestNumberInput', 'RootStack'>;
interface State {
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  value6: string;
}

export class TestNumberInputScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: '',
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="NumberInput 数字输入"
          desc="专用于输入数字。每个输入框只允许输入一个字符，主要用于验证码、密码输入框等。。"
          navigation={this.props.navigation}
        />
        <TestHeader>基础用法</TestHeader>
        <TestGroup>
          <NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} />
        </TestGroup>
        <TestHeader desc="不使用系统键盘，使用内置的 NumberKeyBoard 键盘。">使用 NumberKeyBoard 输入键盘</TestHeader>
        <TestGroup>
          <NumberInput value={this.state.value6} onChangeText={(v) => this.setState({ value6: v })} useSystemInput={false}/>
        </TestGroup>
        <TestHeader>自定义长度</TestHeader>
        <TestGroup>
          <NumberInput value={this.state.value2} onChangeText={(v) => this.setState({ value2: v })} numberCount={8} autoSize />
        </TestGroup>
        <TestHeader>格子间距</TestHeader>
        <TestGroup>
          <NumberInput value={this.state.value3} onChangeText={(v) => this.setState({ value3: v })} gutter={14} autoSize />
        </TestGroup>
        <TestHeader>下划线边框</TestHeader>
        <TestGroup>
          <NumberInput value={this.state.value4} onChangeText={(v) => this.setState({ value4: v })}
            borderWidth={2}
            borderColor={Color.darkBorder}
            borderType="underline" activeBorderColor={Color.primary} gutter={10}
          />
        </TestGroup>
        <TestHeader>密码输入</TestHeader>
        <TestGroup>
          <NumberInput value={this.state.value5} onChangeText={(v) => this.setState({ value5: v })} isPassword info="密码为 6 位数字" />
        </TestGroup>
      </ScrollView>
    );
  }
}

