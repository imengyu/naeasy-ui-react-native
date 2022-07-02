import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { ColumnView, Pagination, DotIndicator } from 'imengyu-ui-lib';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestPagination', 'RootStack'>;
interface State {
  page: number;
}

export class TestPaginationScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    page: 1,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView padding={10}>

          <Text style={TestStyles.TitleText}>数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面。</Text>
          <Pagination pageCount={10} currentPage={this.state.page} onCurrentPageChange={(page) => this.setState({ page: page })} />

          <Text style={TestStyles.TitleText}>简单模式。将 mode 设置为 simple 来切换到简单模式，此时分页器不会展示具体的页码按钮。</Text>
          <Pagination simple pageCount={10} currentPage={this.state.page} onCurrentPageChange={(page) => this.setState({ page: page })} />

          <Text style={TestStyles.TitleText}>简单页码指示器，只读，不可操作。</Text>
          <DotIndicator currentIndex={this.state.page} count={10} size={10} />

        </ColumnView>
      </ScrollView>
    );
  }
}

