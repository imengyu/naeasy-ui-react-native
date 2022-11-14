import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';
import { ColumnView, Slider, Color, RowView, Toast, WhiteSpace, Text } from '../lib';

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
        <ColumnView padding={10}>

          <Text style={TestStyles.TitleText}>滑动输入条，用于在给定的范围内选择一个值。</Text>
          <Slider value={this.state.value1} onValueChange={v => this.setState({ value1: v })} />

          <Text style={TestStyles.TitleText}>指定选择范围。</Text>
          <Slider value={this.state.value2} onValueChange={v => this.setState({ value2: v })} minValue={-50} maxValue={50} onEndChange={(v) => Toast.info(`当前值：${v}`)} />

          <Text style={TestStyles.TitleText}>禁用</Text>
          <Slider value={this.state.value3} onValueChange={v => this.setState({ value3: v })} touchable={false} />

          <Text style={TestStyles.TitleText}>指定步长</Text>
          <Slider value={this.state.value3} onValueChange={v => this.setState({ value3: v })} step={20} />

          <Text style={TestStyles.TitleText}>自定义样式</Text>
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

          <Text style={TestStyles.TitleText}>垂直方向</Text>
          <RowView justify="center">
            <Slider value={this.state.value5} onValueChange={v => this.setState({ value5: v })} vertical style={{ height: 200 }} />
          </RowView>

          <WhiteSpace size={400} />

        </ColumnView>
      </ScrollView>
    );
  }
}

