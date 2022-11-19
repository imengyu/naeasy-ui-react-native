import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AlertNative, RowView, Notify, Cell, CellGroup, ColumnView } from '../lib';
import { Image, ScrollView, Text } from 'react-native';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestNotify'>;

export class TestNotifyScreen extends React.PureComponent<Props> {

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center style={{ paddingVertical: 10 }}>
          <CellGroup title="基础用法" inset>
            <Cell title="显示通知" showArrow onPress={() => {
              Notify.show({ content: '这是一个通知' });
            }} />
          </CellGroup>
          <CellGroup title="通知类型" inset>
            <Cell title="主要通知" showArrow onPress={() => {
              Notify.show({ content: '这是一个主要通知', type: 'message' });
            }} />
            <Cell title="成功通知" showArrow onPress={() => {
              Notify.show({ content: '这是一个成功通知', type: 'success' });
            }} />
            <Cell title="警告通知" showArrow onPress={() => {
              Notify.show({ content: '这是一个警告通知', type: 'waring' });
            }} />
            <Cell title="危险通知" showArrow onPress={() => {
              Notify.show({ content: '这是一个危险通知', type: 'error' });
            }} />
            <Cell title="加载中通知" showArrow onPress={() => {
              Notify.show({ content: '这是一个通知', type: 'loading' });
            }} />
          </CellGroup>
          <CellGroup title="自定义配置" inset>
            <Cell title="自定义时长" showArrow onPress={() => {
              Notify.show({ content: '这是一个显示 8 秒的通知', duration: 8000 });
            }} />
            <Cell title="自定义按钮" showArrow onPress={() => {
              Notify.show({
                content: '您有一条新消息!',
                button: '查看',
                onButtonClick() {
                  AlertNative.alert('提示', '您点击了自定义按钮');
                },
              });
            }} />
            <Cell title="自定义样式与颜色" showArrow onPress={() => {
              Notify.show({
                content: '这是一个自定义样式通知',
                style: {
                  backgroundColor: '#f61',
                  borderRadius: 5,
                },
                textStyle: {
                  color: '#fff',
                },
              });
            }} />
            <Cell title="自定义内容" showArrow onPress={() => {
              Notify.show({
                content: (
                  <RowView>
                    <Image source={require('../images/test4.png')} />
                    <Text>这里是自定义内容</Text>
                  </RowView>
                ),
              });
            }} />
            <Cell title="动态修改内容" showArrow onPress={() => {
              const NotifyItem = Notify.show({
                type: 'loading',
                content: '正在加载请稍后...',
                duration: 0,
              });
              let time = 0;
              const timer = setInterval(() => {
                if (time < 8) {
                  time++;
                  NotifyItem.update({ content: `加载中 （${time}/8）...` });
                } else {
                  NotifyItem.close();
                  clearInterval(timer);
                }
              }, 1000);
            }} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

