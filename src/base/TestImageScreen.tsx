import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { Text } from 'react-native';
import { ColumnView, CellGroup, RowView, Image, rpx, Avatar } from '../lib';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestCell'>;

export class TestImageScreen extends React.PureComponent<Props> {

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center style={{ padding: 10 }}>
          <CellGroup title="基础用法">
            <Text>基础用法与原生 Image 标签一致，增加了 width、height 宽高属性。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <Image source={{ uri: 'https://imengyu.top/assets/images/test/1.jpg' }} width={rpx(100)} height={rpx(100)} />
            </RowView>
          </CellGroup>
          <CellGroup title="圆形图片">
            <Text>通过 round 属性可以设置图片变圆， radius 可以指定圆角大小。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <Image source={{ uri: 'https://imengyu.top/assets/images/test/2.jpg' }} round radius={10} width={rpx(200)} height={rpx(200)} />
              <Image source={{ uri: 'https://imengyu.top/assets/images/test/3.jpg' }} round width={rpx(200)} height={rpx(200)} />
            </RowView>
          </CellGroup>
          <CellGroup title="头像">
            <Text>通过 Avatar 组件显示头像。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <Avatar url="https://imengyu.top/assets/images/test/2.jpg" size={50} />
            </RowView>
          </CellGroup>
          <CellGroup title="加载中">
            <Text>通过 showLoading 属性来显示加载中提示，默认是false。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <Image source={{ uri: 'https://imengyu.top/assets/images/test/2.jpg' }} showLoading loading width={rpx(200)} height={rpx(200)} />
            </RowView>
          </CellGroup>
          <CellGroup title="加载失败">
            <Text>通过 showFailed 属性来显示加载失败提示，默认是true。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <Image source={{ uri: 'https://imengyu.top/assets/images/test2/2.jpg' }} showLoading width={rpx(200)} height={rpx(200)} />
            </RowView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

