import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from 'imengyu-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';

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
    value1: 1,
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

          <Text style={TestStyles.TitleText}>其他类型的 Slider TODO</Text>

        </ColumnView>
      </ScrollView>
    );
  }
}

