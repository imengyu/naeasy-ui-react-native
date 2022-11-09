import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup, Tag, RowView, ColumnView } from '@imengyu-ui-lib-debug';
import { Text, ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestTag'>;
interface State {
  showTag: boolean
}

export class TestTagScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    showTag: true,
  };

  render() {
    return (
      <ScrollView>
        <ColumnView center>
          <CellGroup title="基础用法" inset>
            <Text style={{ padding: 10 }}>按钮支持 default、primary、success、warning、danger 五种类型，默认为 default。</Text>
            <RowView wrap style={{ padding: 10 }}>
              <Tag text="primary" type="primary" style={{ marginLeft: 5 }} />
              <Tag text="success" type="success" style={{ marginLeft: 5 }} />
              <Tag text="default" type="default" style={{ marginLeft: 5 }} />
              <Tag text="danger" type="danger" style={{ marginLeft: 5 }} />
              <Tag text="warning" type="warning" style={{ marginLeft: 5, marginTop: 10 }} />
            </RowView>
          </CellGroup>
          <CellGroup title="空心样式" inset>
            <Text style={{ padding: 10 }}>设置 plain 属性设置为空心样式。</Text>
            <RowView wrap style={{ padding: 10 }}>
              <Tag plain text="primary" type="primary" style={{ marginLeft: 5 }} />
              <Tag plain text="success" type="success" style={{ marginLeft: 5 }} />
              <Tag plain text="default" type="default" style={{ marginLeft: 5 }} />
              <Tag plain text="danger" type="danger" style={{ marginLeft: 5 }} />
              <Tag plain text="warning" type="warning" style={{ marginLeft: 5, marginTop: 10 }} />
            </RowView>
          </CellGroup>
          <CellGroup title="形状" inset>
            <RowView wrap style={{ padding: 10 }}>
              <Tag shape="square" text="方形" type="primary" style={{ marginLeft: 5 }} />
              <Tag shape="round" text="圆形" type="success" style={{ marginLeft: 5 }} />
              <Tag shape="mark" text="标记形状" type="success" style={{ marginLeft: 5 }} />
            </RowView>
          </CellGroup>
          <CellGroup title="尺寸" inset>
            <Text style={{ padding: 10 }}>支持 large、medium、small，默认为 medium 。</Text>
            <RowView wrap center style={{ padding: 10 }}>
              <Tag text="大号" type="primary" size="large" />
              <Tag text="普通" type="primary" size="medium" style={{ marginLeft: 5 }} />
              <Tag text="小型" type="primary" size="small" style={{ marginLeft: 5 }} />
            </RowView>
          </CellGroup>
          <CellGroup title="可关闭" inset>
            <Text style={{ padding: 10 }}>添加 closeable 属性表示标签是可关闭的，关闭标签时会触发 onClose 事件，在 onClose 事件中可以执行隐藏标签的逻辑。</Text>
            <RowView wrap center style={{ padding: 10 }}>
              {
                this.state.showTag ?
                  <Tag text="可关闭的标签" type="primary" size="medium" closeable style={{ marginLeft: 5 }} onClose={() => this.setState({ showTag: false })} />
                  : <></>
              }
            </RowView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

