import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, CellGroup, Button, RowView } from 'imengyu-ui-lib';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestButton'>;

export class TestButtonScreen extends React.PureComponent<Props> {
  render() {
    return (
      <ScrollView>
        <ColumnView center style={{ padding: 10 }}>
          <CellGroup title="基础用法">
            <Text>按钮支持 default、primary、success、warning、danger 五种类型，默认为 default。</Text>
            <RowView wrap style={{ padding: 10 }}>
              <Button text="primary" type="primary" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button text="success" type="success" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button text="default" type="default" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button text="danger" type="danger" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button text="warning" type="warning" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5, marginTop: 10 }} />
            </RowView>
          </CellGroup>
          <CellGroup title="朴素按钮">
            <Text>通过 plain 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。</Text>
            <RowView wrap style={{ padding: 10 }}>
              <Button plain text="primary" type="primary" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button plain text="success" type="success" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button plain text="default" type="default" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button plain text="danger" type="danger" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button plain text="warning" type="warning" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5, marginTop: 10 }} />
            </RowView>
          </CellGroup>
          <CellGroup title="禁用状态">
            <Text>通过 touchable=false 属性来禁用按钮，禁用状态下按钮不可点击。</Text>
            <RowView wrap style={{ padding: 10 }}>
              <Button touchable={false} text="primary" type="primary" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button touchable={false} text="success" type="success" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button touchable={false} text="default" type="default" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
            </RowView>
          </CellGroup>
          <CellGroup title="自定义颜色">
            <RowView wrap style={{ padding: 10 }}>
              <Button text="自定义颜色" type="custom" color="#f00" pressedColor="#0f0" textColor="#fff" onPress={()=>console.log('点击了！')} />
            </RowView>
          </CellGroup>
          <CellGroup title="加载状态">
            <RowView wrap style={{ padding: 10 }}>
              <Button loading={true} type="primary" icon="top-filling" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button loading={true} loadingText="加载中" type="success" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
            </RowView>
          </CellGroup>
          <CellGroup title="按钮形状">
            <Text>通过 square 设置方形按钮，通过 round 设置圆形按钮。</Text>
            <RowView wrap style={{ padding: 10 }}>
              <Button shape="square" text="方形按钮" type="primary" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button shape="round" text="圆形按钮" type="success" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button shape="round" radius={5} text="可以通过raduis设置圆角大小" type="primary" onPress={()=>console.log('点击了！')} style={{ marginTop: 10 }} />
            </RowView>
          </CellGroup>
          <CellGroup title="图标按钮">
            <Text>通过 icon 属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL。</Text>
            <RowView wrap style={{ padding: 10 }}>
              <Button icon="top-filling" type="primary" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button icon="top-filling" text="按钮" type="primary" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button icon="download" plain text="按钮" type="success" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
            </RowView>
          </CellGroup>
          <CellGroup title="按扭尺寸">
            <Text>支持 large、normal、small、mini 四种尺寸，默认为 normal。</Text>
            <RowView wrap center style={{ padding: 10 }}>
              <Button text="大号按钮" type="primary" size="large" onPress={()=>console.log('点击了！')} />
              <Button text="普通按钮" type="primary" size="medium" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button text="小型按钮" type="primary" size="small" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
              <Button text="迷你按钮" type="primary" size="mini" onPress={()=>console.log('点击了！')} style={{ marginLeft: 5 }} />
            </RowView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

