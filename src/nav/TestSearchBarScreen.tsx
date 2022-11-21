import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { SearchBar } from '../../lib/src/components/form';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';


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
        <TestPageHeader
          title="SearchBar 搜索框"
          desc="用于搜索场景的输入框组件。"
          navigation={this.props.navigation}
        />
        <TestHeader>基础用法</TestHeader>
        <TestGroup>
          <SearchBar placeholder="请输入搜索关键词" onValueChange={(s) => this.setState({ value1: s })} />
        </TestGroup>
        <TestHeader>显示取消按钮</TestHeader>
        <TestGroup>
          <SearchBar placeholder="请输入搜索关键词" cancelState="show" onValueChange={(s) => this.setState({ value2: s })} />
        </TestGroup>
        <TestHeader>自定义样式</TestHeader>
        <TestGroup>
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
            onValueChange={(s) => this.setState({ value3: s })}
          />
        </TestGroup>
      </ScrollView>
    );
  }
}

