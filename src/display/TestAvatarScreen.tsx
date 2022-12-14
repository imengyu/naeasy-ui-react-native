import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { Avatar, Color, RowView, WhiteSpace } from '../lib';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestAvatar'>;

export class TestAvatarScreen extends React.PureComponent<Props> {

  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Avatar 头像"
          desc="用于显示用户头像，支持显示文字头像。"
          navigation={this.props.navigation}
        />
        <TestHeader desc="通过 size 属性设置头像大小，text 属性设置显示文本，background 属性设置背景色">基础使用</TestHeader>
        <TestGroup>
          <RowView>
            <Avatar text="张三" size={40} background={Color.danger} />
            <WhiteSpace size="small" />
            <Avatar text="李四" size={40} background={Color.success} />
            <WhiteSpace size="small" />
            <Avatar text="王五" size={40} background={Color.primary} />
          </RowView>
          <WhiteSpace size="small" />
          <RowView>
            <Avatar text="张" size={30} background={Color.success} />
            <WhiteSpace size="small" />
            <Avatar text="李" size={30} background={Color.danger} />
            <WhiteSpace size="small" />
            <Avatar text="王" size={30} background={Color.primary} />
          </RowView>
        </TestGroup>

        <TestHeader desc="通过 url 属性设置使用图片头像">使用图片头像</TestHeader>
        <TestGroup>
          <Avatar url="https://imengyu.top/assets/images/test/2.jpg" size={50} />
        </TestGroup>

        <TestHeader desc="通过 round=false 属性设置方形头像">方形头像</TestHeader>
        <TestGroup>
          <Avatar url="https://imengyu.top/assets/images/test/2.jpg" round={false} size={50} />
        </TestGroup>

        <WhiteSpace size={100} />
      </ScrollView>
    );
  }
}

