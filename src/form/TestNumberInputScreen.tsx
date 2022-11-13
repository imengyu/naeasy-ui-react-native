import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup, NumberInput, Color, ColumnView } from '../lib';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestNumberInput', 'RootStack'>;
interface State {
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
}

export class TestNumberInputScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
  };

  render(): React.ReactNode {
    return (
      <ColumnView center style={{ padding: 10 }}>
        <CellGroup title="基础用法">
          <NumberInput value={this.state.value1} onChangeText={(v) => this.setState({ value1: v })} />
        </CellGroup>
        <CellGroup title="自定义长度">
          <NumberInput value={this.state.value2} onChangeText={(v) => this.setState({ value2: v })} numberCount={4} />
        </CellGroup>
        <CellGroup title="格子间距">
          <NumberInput value={this.state.value3} onChangeText={(v) => this.setState({ value3: v })} gutter={5} />
        </CellGroup>
        <CellGroup title="下划线边框">
          <NumberInput value={this.state.value4} onChangeText={(v) => this.setState({ value4: v })}
            borderWidth={2}
            borderColor={Color.darkBorder}
            borderType="underline" activeBorderColor={Color.primary} gutter={10}
          />
        </CellGroup>
        <CellGroup title="密码输入">
          <NumberInput value={this.state.value5} onChangeText={(v) => this.setState({ value5: v })} isPassword info="密码为 6 位数字" />
        </CellGroup>
      </ColumnView>
    );
  }
}

