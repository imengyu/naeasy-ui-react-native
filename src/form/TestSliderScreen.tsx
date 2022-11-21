import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Color, Toast, WhiteSpace } from '../lib';
import { Slider } from '../../lib/src/components/form';
import { TestGroup } from '../components/TestGroup';
import { TestHeader, TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestSlider', 'RootStack'>;
interface State {
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
}

export class TestSliderScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    value1: 50,
    value2: 20,
    value3: 30,
    value4: 50,
    value5: 100,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Slider 滑块"
          desc="用于在给定的范围内选择一个值。"
          navigation={this.props.navigation}
        />
        <TestHeader bar={false}>基础用法</TestHeader>
        <TestGroup>
          <Slider value={this.state.value1} onValueChange={v => this.setState({ value1: v })} />
        </TestGroup>
        <TestHeader bar={false}>指定范围</TestHeader>
        <TestGroup>
          <Slider value={this.state.value2} onValueChange={v => this.setState({ value2: v })} minValue={-50} maxValue={50} onEndChange={(v) => Toast.info(`当前值：${v}`)} />
        </TestGroup>
        <TestHeader bar={false}>禁用</TestHeader>
        <TestGroup>
          <Slider value={this.state.value3} onValueChange={v => this.setState({ value3: v })} touchable={false} />
        </TestGroup>
        <TestHeader bar={false}>指定步长</TestHeader>
        <TestGroup>
          <Slider value={this.state.value3} onValueChange={v => this.setState({ value3: v })} step={20} />
        </TestGroup>
        <TestHeader bar={false}>自定义样式</TestHeader>
        <TestGroup>
          <Slider
            value={this.state.value4}
            onValueChange={v => this.setState({ value4: v })}
            activeColor={Color.success}
            inactiveColor={Color.orangeLight}
            trackStyle={{
              backgroundColor: '#5fa',
              borderRadius: 0,
            }}
          />
        </TestGroup>
        <TestHeader bar={false}>垂直方向</TestHeader>
        <TestGroup>
          <Slider value={this.state.value5} onValueChange={v => this.setState({ value5: v })} vertical style={{ height: 200 }} />
        </TestGroup>

        <WhiteSpace size={400} />
      </ScrollView>
    );
  }
}

