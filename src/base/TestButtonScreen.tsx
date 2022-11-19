import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, RowView } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { showTestMessage, TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestButton'>;

export class TestButtonScreen extends React.PureComponent<Props> {
  render() {
    return (
      <ScrollView>
        <TestPageHeader
          title="Button 按钮"
          desc="按钮用于触发一个操作，如提交表单。"
          navigation={this.props.navigation}
        />
        <TestHeader desc="按钮支持 default、primary、success、warning、danger 五种类型，默认为 default。">基础用法</TestHeader>
        <TestGroup>
          <RowView wrap>
            <Button text="primary" type="primary" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button text="success" type="success" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button text="default" type="default" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button text="danger" type="danger" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button text="warning" type="warning" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
          </RowView>
        </TestGroup>
        <TestHeader desc="通过 plain 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。">朴素按钮</TestHeader>
        <TestGroup>
          <RowView wrap>
            <Button plain text="primary" type="primary" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button plain text="success" type="success" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button plain text="default" type="default" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button plain text="danger" type="danger" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button plain text="warning" type="warning" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
          </RowView>
        </TestGroup>
        <TestHeader desc="通过 touchable=false 属性来禁用按钮，禁用状态下按钮不可点击。也可不提供 onPress 函数，此时按钮也无法响应点击。">禁用状态</TestHeader>
        <TestGroup>
          <RowView wrap>
            <Button touchable={false} text="primary" type="primary" style={{ marginRight: 5 }} />
            <Button touchable={false} text="success" type="success" style={{ marginRight: 5 }} />
            <Button touchable={false} text="default" type="default" style={{ marginRight: 5 }} />
          </RowView>
        </TestGroup>
        <TestHeader desc="通过 square 设置方形按钮，通过 round 设置圆形按钮。">按钮形状</TestHeader>
        <TestGroup>
          <RowView wrap>
            <Button shape="square" text="方形按钮" type="primary" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button shape="round" text="圆形按钮" type="success" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button shape="round" radius={5} text="可以通过raduis设置圆角大小" type="primary" onPress={()=>showTestMessage('点击了！')} style={{ marginTop: 10 }} />
          </RowView>
        </TestGroup>
        <TestHeader>自定义颜色</TestHeader>
        <TestGroup>
          <RowView wrap>
            <Button text="自定义颜色" type="custom" color="#f00" pressedColor="#a00" textColor="#fff" onPress={()=>showTestMessage('点击了！')} />
            <Button text="自定义颜色" type="custom" color="#0d0" pressedColor="#060" textColor="#fff" onPress={()=>showTestMessage('点击了！')} />
            <Button text="自定义颜色" type="custom" color="#18f" pressedColor="#10f" textColor="#fff" onPress={()=>showTestMessage('点击了！')} />
          </RowView>
        </TestGroup>
        <TestHeader>加载状态</TestHeader>
        <TestGroup>
          <RowView wrap>
            <Button loading={true} type="primary" icon="top-filling" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button loading={true} loadingText="加载中" type="success" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
          </RowView>
        </TestGroup>
        <TestHeader desc="通过 icon 属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL。">按钮图标</TestHeader>
        <TestGroup>
          <RowView wrap>
            <Button icon="top-filling" type="primary" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button icon="https://imengyu.top/assets/images/test/icon.png" text="按钮" type="primary" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button icon="download" plain text="按钮" type="success" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
          </RowView>
        </TestGroup>
        <TestHeader desc="支持 large、normal、small、mini 四种尺寸，默认为 normal。">按扭尺寸</TestHeader>
        <TestGroup>
          <RowView wrap align="center">
            <Button text="大号按钮" type="primary" size="large" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button text="普通按钮" type="primary" size="medium" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button text="小型按钮" type="primary" size="small" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
            <Button text="迷你按钮" type="primary" size="mini" onPress={()=>showTestMessage('点击了！')} style={{ marginRight: 5 }} />
          </RowView>
        </TestGroup>
      </ScrollView>
    );
  }
}

