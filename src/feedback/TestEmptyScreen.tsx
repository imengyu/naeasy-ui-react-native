import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup, Empty, RowView, Button, LoadingView, WingBlank, ColumnView, Text } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestStyles } from '../styles/TestStyles';

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
        <ColumnView center style={TestStyles.PaddingS}>
          <CellGroup title="介绍">
            <Text style={TestStyles.TitleText}>空状态时的占位提示。</Text>
          </CellGroup>
          <CellGroup title="类型">
            <Text style={TestStyles.TitleText}>Empty 组件内置了多种占位图片类型，可以在不同业务场景下使用。</Text>
            <Empty image="error" description="非常抱歉，出错了" />
            <Empty image="network" description="网络不给力，稍后再试" />
            <Empty image="search" description="暂无数据，换一个搜索词试试吧" />
          </CellGroup>
          <CellGroup title="自定义大小">
            <Text style={TestStyles.TitleText}>通过 imageSize 属性图片的大小。</Text>
            <Empty image="error" description="描述文字" imageSize={50} />
          </CellGroup>
          <CellGroup title="自定义图片">
            <Text style={TestStyles.TitleText}>需要自定义图片时，可以在 image 属性中传入任意图片。</Text>
            <Empty image={{uri:'https://cdn.jsdelivr.net/npm/@vant/assets/custom-empty-image.png'}} description="描述文字" />
          </CellGroup>
          <CellGroup title="自定义按钮">
            <Text style={TestStyles.TitleText}>支持在下方自定义内容。</Text>
            <Empty image="search" description="暂无数据，换一个搜索词试试吧">
              <Button type="primary" shape="round">刷新</Button>
            </Empty>
          </CellGroup>
          <CellGroup title="加载中状态">
            <Text style={TestStyles.TitleText}>可以使用一个加载中状态视图，来包裹正在加载的内容。</Text>
            <RowView style={TestStyles.TitleText}>
              <Button text={'切换加载中状态: ' + (this.state.loading ? 'true' : 'false')} onPress={() => this.setState((prev) => ({ loading: !prev.loading })) } />
            </RowView>
            <LoadingView loading={this.state.loading} loadingText="加载中，请稍后">
              <WingBlank size="sm">
                <Text>战式厂思省空面马六前，做造识强等，道派B无标两育。 合目治中做图是定，易斗必至听究地，入江记H两速。查少四老规影外公，方地更G集性。包，员能级干理达历中，很便F节府员里直。 业意量叫位美深J基。</Text>
              </WingBlank>
            </LoadingView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

