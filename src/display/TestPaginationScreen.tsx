import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Pagination } from '../../lib/src/components/nav';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';
import { IconButton } from '../lib';

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
        <TestPageHeader
          title="Pagination 分页器"
          desc="数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面。"
          navigation={this.props.navigation}
        />
        <TestHeader>基础用法</TestHeader>
        <TestGroup>
          <Pagination pageCount={10} currentPage={this.state.page} onCurrentPageChange={(page) => this.setState({ page: page })} />
        </TestGroup>
        <TestHeader desc="将 mode 设置为 simple 来切换到简单模式，此时分页器不会展示具体的页码按钮。">简单模式</TestHeader>
        <TestGroup>
          <Pagination simple pageCount={10} currentPage={this.state.page} onCurrentPageChange={(page) => this.setState({ page: page })} />
        </TestGroup>
        <TestHeader desc="可设置条目的自定义样式">自定义样式</TestHeader>
        <TestGroup>
          <Pagination
            buttonStyle={{
              borderRadius: 30,
              marginHorizontal: 2,
            }}
            pageCount={10}
            currentPage={this.state.page}
            onCurrentPageChange={(page) => this.setState({ page: page })}
          />
        </TestGroup>
        <TestHeader desc="允许自定义渲染按钮">自定义渲染</TestHeader>
        <TestGroup>
          <Pagination
            pageCount={10}
            currentPage={this.state.page}
            onCurrentPageChange={(page) => this.setState({ page: page })}
            renderPrev={(props) => <IconButton icon="direction-left" {...props} />}
            renderNext={(props) => <IconButton icon="direction-right" {...props}  />}
          />
        </TestGroup>
      </ScrollView>
    );
  }
}

