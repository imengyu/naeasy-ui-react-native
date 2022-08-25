import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from 'imengyu-ui-lib';
import { ScrollView, Text } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { SearchBar } from 'imengyu-ui-lib';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestSearchBar', 'RootStack'>;
interface State {
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
}

export class TestSearchBarScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView padding={10}>

          <Text style={TestStyles.TitleText}>基础用法</Text>
          <SearchBar placeholder="请输入搜索关键词" onValueChange={(s) => this.setState({ value1: s })} />

          <Text style={TestStyles.TitleText}>显示取消按钮</Text>
          <SearchBar placeholder="请输入搜索关键词" cancelState="show" onValueChange={(s) => this.setState({ value2: s })} />

        </ColumnView>
      </ScrollView>
    );
  }
}

