import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, Text } from '../lib';
import { ScrollView } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';
import { SearchBar } from '../../lib/src/components/form';


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

          <Text style={TestStyles.TitleText}>自定义样式</Text>
          <SearchBar
            placeholder="请输入搜索关键词"
            style={{
              borderRadius: 5,
              backgroundColor: '#9a66ec',
            }}
            inputStyle={{ color: '#fff' }}
            placeholderTextColor="#fff"
            leftIconProps={{ color: '#fff' }}
            cancelState="show"
            onValueChange={(s) => this.setState({ value3: s })} />



        </ColumnView>
      </ScrollView>
    );
  }
}

