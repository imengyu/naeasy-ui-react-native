import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { WhiteSpace, Empty, RowView, Button, WingBlank, ColumnView, Text } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { LoadingView } from '../../lib/src/components/loading';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestEmpty'>;
interface State {
  loading: boolean;
}

export class TestEmptyScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    loading: false,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Empty 空状态。"
          desc="提供空状态时的占位提示。"
          navigation={this.props.navigation}
        />
        <TestHeader desc="Empty 组件内置了多种占位图片类型，可以在不同业务场景下使用。">基础用法</TestHeader>
        <TestGroup>
          <Empty image="error" description="非常抱歉，出错了" />
          <Empty image="network" description="网络不给力，稍后再试" />
          <Empty image="search" description="暂无数据，换一个搜索词试试吧" />
        </TestGroup>
        <TestHeader desc="通过 imageSize 属性图片的大小。">自定义大小</TestHeader>
        <TestGroup>
          <Empty image="error" description="描述文字" imageSize={140} />
        </TestGroup>
        <TestHeader desc="需要自定义图片时，可以在 image 属性中传入任意图片。">自定义图片</TestHeader>
        <TestGroup>
          <Empty image={{ uri: 'https://imengyu.top/assets/images/test/2.jpg' }} description="描述文字" />
        </TestGroup>
        <TestHeader desc="支持在下方自定义内容。">自定义按钮</TestHeader>
        <TestGroup>
          <Empty image="search" description="暂无数据，换一个搜索词试试吧">
            <WhiteSpace size="small" />
            <Button type="primary" shape="round">刷新</Button>
          </Empty>
        </TestGroup>
        <TestHeader desc="可以使用一个加载中状态视图，来包裹正在加载的内容。">加载中状态</TestHeader>
        <TestGroup>
          <RowView padding={10}>
            <Button text={'切换加载中状态: ' + (this.state.loading ? 'true' : 'false')} onPress={() => this.setState((prev) => ({ loading: !prev.loading })) } />
          </RowView>
          <ColumnView padding={10}>
            <LoadingView loading={this.state.loading} loadingPageProps={{ loadingText: '加载中，请稍后' }}>
              <WingBlank size="small">
                <Text>战式厂思省空面马六前，做造识强等，道派B无标两育。 合目治中做图是定，易斗必至听究地，入江记H两速。查少四老规影外公，方地更G集性。包，员能级干理达历中，很便F节府员里直。 业意量叫位美深J基。</Text>
              </WingBlank>
            </LoadingView>
          </ColumnView>
        </TestGroup>
        <WhiteSpace size={100} />
      </ScrollView>
    );
  }
}

