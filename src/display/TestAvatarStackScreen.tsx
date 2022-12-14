import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { AvatarStack, WhiteSpace } from '../lib';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestAvatarStack'>;

export class TestAvatarStackScreen extends React.PureComponent<Props> {

  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="AvatarStack 头像组"
          desc="用于显示一组头像，通常可用于显示活动用户、好友信息等等。"
          navigation={this.props.navigation}
        />
        <TestHeader>头像组</TestHeader>
        <TestGroup>
          <AvatarStack urls={[
            'https://imengyu.top/assets/images/test/2.jpg',
            'https://imengyu.top/assets/images/test/3.jpg',
            'https://imengyu.top/assets/images/test/4.jpg',
            'https://imengyu.top/assets/images/test/5.jpg',
          ]} round />
        </TestGroup>

        <TestHeader>自定义大小</TestHeader>
        <TestGroup>
          <AvatarStack urls={[
            'https://imengyu.top/assets/images/test/2.jpg',
            'https://imengyu.top/assets/images/test/3.jpg',
            'https://imengyu.top/assets/images/test/4.jpg',
            'https://imengyu.top/assets/images/test/5.jpg',
          ]} size={50} />
        </TestGroup>

        <TestHeader>方形形状</TestHeader>
        <TestGroup>
          <AvatarStack urls={[
            'https://imengyu.top/assets/images/test/2.jpg',
            'https://imengyu.top/assets/images/test/3.jpg',
            'https://imengyu.top/assets/images/test/4.jpg',
            'https://imengyu.top/assets/images/test/5.jpg',
          ]} round={false}  />
        </TestGroup>

        <TestHeader>头像组超出后显示数字</TestHeader>
        <TestGroup>
          <AvatarStack urls={[
            'https://imengyu.top/assets/images/test/2.jpg',
            'https://imengyu.top/assets/images/test/3.jpg',
            'https://imengyu.top/assets/images/test/4.jpg',
            'https://imengyu.top/assets/images/test/5.jpg',
            'https://imengyu.top/assets/images/test/2.jpg',
            'https://imengyu.top/assets/images/test/3.jpg',
            'https://imengyu.top/assets/images/test/4.jpg',
            'https://imengyu.top/assets/images/test/5.jpg',
          ]} round maxCount={6} />
        </TestGroup>

        <TestHeader>边框</TestHeader>
        <TestGroup>
          <AvatarStack urls={[
            'https://imengyu.top/assets/images/test/2.jpg',
            'https://imengyu.top/assets/images/test/3.jpg',
            'https://imengyu.top/assets/images/test/4.jpg',
            'https://imengyu.top/assets/images/test/5.jpg',
            'https://imengyu.top/assets/images/test/2.jpg',
            'https://imengyu.top/assets/images/test/3.jpg',
            'https://imengyu.top/assets/images/test/4.jpg',
            'https://imengyu.top/assets/images/test/5.jpg',
          ]} size={50} round border borderWidth={3} maxCount={6} />
        </TestGroup>

        <TestHeader>设置头像之间的间距</TestHeader>
        <TestGroup>
          <AvatarStack imageMargin={10} urls={[
            'https://imengyu.top/assets/images/test/2.jpg',
            'https://imengyu.top/assets/images/test/3.jpg',
            'https://imengyu.top/assets/images/test/4.jpg',
            'https://imengyu.top/assets/images/test/5.jpg',
          ]} round />
        </TestGroup>

        <WhiteSpace size={100} />
      </ScrollView>
    );
  }
}

