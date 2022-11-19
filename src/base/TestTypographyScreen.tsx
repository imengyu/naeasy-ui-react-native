import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { A } from '../lib';
import { H1, H2, H3, H4, H5, H6 } from '../lib';
import { B, Br, I, S, U, Text } from '../lib';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestTypography'>;

export class TestTypographyScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Typography 文字与内容"
          desc="封装了文字相关的组件用于显示。"
          navigation={this.props.navigation}
        />

        <TestHeader>标题</TestHeader>
        <TestGroup>
          <H1>这是标题一</H1>
          <H2>这是标题二</H2>
          <H3>这是标题三</H3>
          <H4>这是标题四</H4>
          <H5>这是标题五</H5>
          <H6>这是标题六</H6>
        </TestGroup>

        <TestHeader>文字样式</TestHeader>
        <TestGroup>
          <B>这是粗体文字</B>
          <I>这是斜体文字</I>
        </TestGroup>

        <TestHeader>文字线</TestHeader>
        <TestGroup>
          <S>这段字符串中间有条删除线</S>
          <U>这段字符串有条下划线</U>
        </TestGroup>

        <TestHeader>换行</TestHeader>
        <TestGroup>
          <Text>Br用于将文字换行。<Br />这一行文字在这里换行。</Text>
        </TestGroup>

        <TestHeader>链接</TestHeader>
        <TestGroup>
          <A href="https://www.bing.com">点击我打开 www.bing.com</A>
        </TestGroup>

        <TestHeader>组合组件</TestHeader>
        <TestGroup>
          <Text underline>可以使用封装的组件快速组合多个样式</Text>
          <Text bold italic>粗体+斜体文字</Text>
          <Text bold italic underline>粗体+斜体+下划线文字</Text>
          <Text bold italic underline lineThrough>粗体+斜体+下划线+删除线文字</Text>
        </TestGroup>
      </ScrollView>
    );
  }
}

