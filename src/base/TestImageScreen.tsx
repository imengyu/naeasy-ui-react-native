import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { RowView, Image, rpx } from '../lib';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestCell'>;

export class TestImageScreen extends React.PureComponent<Props> {

  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Image 图片"
          desc="为原生图片封装了一些有用的属性。"
          navigation={this.props.navigation}
        />
        <TestHeader desc="基础用法与原生 Image 标签一致，增加了 width、height 宽高属性。">基础用法</TestHeader>
        <TestGroup>
          <Image source={{ uri: 'https://imengyu.top/assets/images/test/1.jpg' }} width={rpx(100)} height={rpx(100)} />
        </TestGroup>
        <TestHeader desc="通过 round 属性可以设置图片变圆， radius 可以指定圆角大小。">圆形图片</TestHeader>
        <TestGroup>
          <RowView>
            <Image source={{ uri: 'https://imengyu.top/assets/images/test/2.jpg' }} round radius={10} width={rpx(200)} height={rpx(200)} />
            <Image source={{ uri: 'https://imengyu.top/assets/images/test/3.jpg' }} round width={rpx(200)} height={rpx(200)} />
          </RowView>
        </TestGroup>
        <TestHeader desc="通过 showLoading 属性来显示加载中提示，默认是false。">加载中</TestHeader>
        <TestGroup>
          <Image source={{ uri: 'https://imengyu.top/assets/images/test/2.jpg' }} showLoading loading width={rpx(200)} height={rpx(200)} />
        </TestGroup>
        <TestHeader desc="通过 showFailed 属性来显示加载失败提示，默认是true。">加载失败</TestHeader>
        <TestGroup>
          <Image source={{ uri: 'https://imengyu.top/assets/images/test2/2.jpg' }} showLoading width={rpx(200)} height={rpx(200)} />
        </TestGroup>
      </ScrollView>
    );
  }
}

