import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Skeleton, Button, ColumnView, RowView, Text, H3, H4, P, Avatar, WhiteSpace } from '../lib';
import { ScrollView, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';
import { Switch } from '../../lib/src/components/form';
import { Image } from 'react-native';

type Props = StackScreenProps<RootStackParamList, 'TestSkeleton'>;

const styles = StyleSheet.create({
  test1: {
    padding: 5,
  },
});

export function TestSkeletonScreen(props: Props) {

  const [ display1, setDisplay1 ] = useState(true);
  const [ display2, setDisplay2 ] = useState(true);

  return (
    <ScrollView>
      <TestPageHeader
        title="Skeleton 骨架屏"
        desc="在需要等待加载内容的位置提供的占位组件。"
        navigation={props.navigation}
      />
      <TestHeader>基础用法</TestHeader>
      <TestGroup>
        <RowView align="center">
          <Switch value={display1} onValueChange={setDisplay1} />
          <WhiteSpace size="sm" />
          <Text>显示加载内容</Text>
        </RowView>
        <WhiteSpace size="sm" />
        <Skeleton placeholder={<Skeleton.Avatar />} loading={display1}>
          <Avatar background="blue" style={{ marginBottom: 10 }} text="U" />
        </Skeleton>
        <WhiteSpace size="sm" />
        <Skeleton placeholder={<Skeleton.Image style={{ width: 200, height: 150 }} />} loading={display1}>
          <Image
            source={{ uri: 'https://imengyu.top/assets/images/test/2.jpg' }}
            style={{ width: 200, height: 150 }}
          />
        </Skeleton>
        <WhiteSpace size="sm" />
        <Skeleton
          placeholder={<Skeleton.Title style={{ width: 80, marginBottom: 10 }} />}
          loading={display1}
        >
          <H4 style={{ marginBottom: 0 }}>Semi UI</H4>
        </Skeleton>
        <WhiteSpace size="sm" />
        <Skeleton placeholder={<Skeleton.Paragraph rows={2} style={{ width: 240 }} />} loading={display1}>
          <P style={{ width: 240 }}>精心打磨每一个组件的用户体验，从用户的角度考虑每个组件的使用场景。</P>
        </Skeleton>
        <WhiteSpace size="sm" />
        <Skeleton placeholder={<Skeleton.Button />} loading={display1}>
          <RowView>
            <Button>Button</Button>
          </RowView>
        </Skeleton>
      </TestGroup>
      <TestHeader desc="通过设置 active 属性可以展示动画效果。">加载动画</TestHeader>
      <TestGroup>
        <RowView align="center">
          <Switch value={display2} onValueChange={setDisplay2} />
          <WhiteSpace size="sm" />
          <Text>显示加载内容</Text>
        </RowView>
        <WhiteSpace size="sm" />
        <Skeleton placeholder={
          <RowView style={styles.test1}>
            <Skeleton.Avatar style={{ marginRight: 12 }} />
            <ColumnView>
              <Skeleton.Title style={{ width: 120, marginBottom: 12, marginTop: 5 }} />
              <Skeleton.Paragraph style={{ width: 240 }} rows={3} />
            </ColumnView>
          </RowView>
        } loading={display2} active>
          <RowView style={styles.test1}>
            <Avatar background="blue" style={{ marginRight: 12 }} text="UI" />
            <ColumnView>
              <H3>诗句</H3>
              <P>山有木兮木有枝，心悦君兮君不知。</P>
              <P>人生若只如初见，何事秋风悲画扇。</P>
              <P>大鹏一日同风起，扶摇直上九万里。</P>
            </ColumnView>
          </RowView>
        </Skeleton>
      </TestGroup>
      <WhiteSpace size={100} />
    </ScrollView>
  );
}

