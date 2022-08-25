import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, Text } from 'react-native';
import { CellGroup, Cell, Toast, ColumnView } from 'imengyu-ui-lib';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestToast'>;

export class TestToastScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center style={{ padding: 10 }}>
          <CellGroup title="介绍" inset>
            <Text style={{ padding: 10 }}>在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。</Text>
          </CellGroup>
          <CellGroup title="基础用法" inset>
            <Cell title="文字提示" showArrow onPress={() => Toast.info('这是一个提示！')} />
            <Cell title="成功提示" showArrow onPress={() => Toast.success('这是一个成功提示！')} />
            <Cell title="失败提示" showArrow onPress={() => Toast.fail('这是一个失败提示！')} />
            <Cell title="无网络提示" showArrow onPress={() => Toast.offline('网络不给力，请稍后再试')} />
          </CellGroup>
          <CellGroup title="加载中提示" inset>
            <Cell title="显示加载中提示2秒" showArrow onPress={() => {
              //返回一个key，可以用于取消
              const key = Toast.loading('加载中请稍后', 2000);
              setTimeout(() => {
                Toast.remove(key);
              }, 2000);
            }} />
          </CellGroup>
          <CellGroup title="自定义位置" inset>
            <Text style={{ padding: 10 }}>Toast 默认渲染在屏幕正中位置，通过 position 属性可以控制 Toast 展示的位置。</Text>
            <Cell title="在顶部显示" showArrow onPress={() => Toast.info('这是一个提示！', 2000, 'top')} />
            <Cell title="在底部显示" showArrow onPress={() => Toast.info('这是一个提示！', 2000, 'bottom')} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

