import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Color, Rate, ColumnView } from '../lib';
import { ScrollView, Text } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';

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
        <ColumnView padding={10}>

          <Text style={TestStyles.TitleText}>基础用法</Text>
          <Rate value={this.state.value1} onValueChange={(page) => this.setState({ value1: page })} />

          <Text style={TestStyles.TitleText}>自定义图标和颜色</Text>
          <Rate value={this.state.value2} icon="cry-filling" voidIcon="cry" starActiveColor={Color.success} starColor={Color.lightGrey} onValueChange={(page) => this.setState({ value2: page })} />

          <Text style={TestStyles.TitleText}>自定义大小</Text>
          <Rate value={this.state.value3} size={40} onValueChange={(page) => this.setState({ value3: page })} />

          <Text style={TestStyles.TitleText}>可选择半星</Text>
          <Rate value={this.state.value4} half onValueChange={(page) => this.setState({ value4: page })} />

          <Text style={TestStyles.TitleText}>自定义星星数量</Text>
          <Rate value={this.state.value5} count={10} onValueChange={(page) => this.setState({ value5: page })} />

          <Text style={TestStyles.TitleText}>禁用状态</Text>
          <Rate value={this.state.value5} disabled onValueChange={(page) => this.setState({ value5: page })} />

          <Text style={TestStyles.TitleText}>只读状态</Text>
          <Rate value={this.state.value6} readonly onValueChange={(page) => this.setState({ value6: page })} />

        </ColumnView>
      </ScrollView>
    );
  }
}

