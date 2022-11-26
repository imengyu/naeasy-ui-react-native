import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ColumnView, RowView, Color, WhiteSpace, Icon, Avatar, Text } from '../lib';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { showTestMessage, TestGroup } from '../components/TestGroup';


type Props = StackScreenProps<RootStackParamList, 'TestLayout'>;

const styles = StyleSheet.create({
  box: {
    width: 39,
    height: 39,
    backgroundColor: Color.primary.light,
    borderRadius: 10,
    margin: 5,
  },
  box2: {
    width: 39,
    height: 39,
    backgroundColor: Color.success.light,
    borderRadius: 10,
    margin: 5,
  },
  box3: {
    width: 39,
    height: 39,
    backgroundColor: Color.warning.light,
    borderRadius: 10,
    margin: 5,
  },
  box4: {
    height: 39,
    width: '100%',
    backgroundColor: Color.warning.light,
    borderRadius: 10,
    margin: 5,
  },
  box5: {
    height: 39,
    width: '100%',
    backgroundColor: Color.success.light,
    borderRadius: 10,
    margin: 5,
  },
  box6: {
    height: 39,
    width: '100%',
    backgroundColor: Color.danger.light,
    borderRadius: 10,
    margin: 5,
  },
  container: {
    borderWidth: 1,
    borderColor: Color.warning.light,
  },
  title: {
    backgroundColor: Color.warning.light,
    color: Color.white,
    padding: 5,
  },
});

export class TestLayoutScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Flex 布局"
          desc="Flex 组件是对基础 View 进行封装的组件，分为 ColumnView 与 RowView，用于快速布局使用。"
          navigation={this.props.navigation}
        />
        <TestHeader desc="ColumnView 是一个flex垂直方向的view。">ColumnView</TestHeader>
        <TestGroup>
          <ColumnView style={styles.container}>
            <View style={styles.box} />
            <View style={styles.box2} />
            <View style={styles.box3} />
          </ColumnView>
        </TestGroup>
        <TestHeader desc="RowView 是一个flex水平方向的view。">RowView</TestHeader>
        <TestGroup>
          <RowView style={styles.container}>
            <View style={styles.box} />
            <View style={styles.box2} />
            <View style={styles.box3} />
          </RowView>
        </TestGroup>
        <TestHeader desc="设置 center 属性可以使内容居中。">居中</TestHeader>
        <TestGroup>
          <ColumnView center style={styles.container} height={200}>
            <Text>我是居中内容</Text>
          </ColumnView>
        </TestGroup>
        <TestHeader desc="设置 wrap 属性可以使内容换行。">换行</TestHeader>
        <TestGroup>
          <RowView wrap style={styles.container}>
            <View style={styles.box} />
            <View style={styles.box2} />
            <View style={styles.box3} />
            <View style={styles.box} />
            <View style={styles.box2} />
            <View style={styles.box3} />
            <View style={styles.box} />
            <View style={styles.box2} />
            <View style={styles.box3} />
          </RowView>
        </TestGroup>
        <TestHeader desc="支持背景颜色、大小、边距等常用属性的快速设置。">常用属性封装</TestHeader>
        <TestGroup>
          <ColumnView>
            <ColumnView width={100} height={100} backgroundColor="#0f0">
              <Text>设置大小</Text>
            </ColumnView>
            <ColumnView backgroundColor="#f00" height={30}>
              <Text>设置背景颜色</Text>
            </ColumnView>
            <ColumnView padding={12} backgroundColor="#0f0">
              <Text>内边距10</Text>
            </ColumnView>
            <ColumnView margin={10} height={30} backgroundColor="#f00">
              <Text>外边距10</Text>
            </ColumnView>
          </ColumnView>
        </TestGroup>
        <TestHeader desc="支持点击的 View。">点击事件封装</TestHeader>
        <TestGroup>
          <ColumnView backgroundColor="#f40" touchable padding={10} onPress={() => showTestMessage('点击了！')}>
            <Text>ABC</Text>
          </ColumnView>
        </TestGroup>
        <TestHeader desc="这是一个简单的使用案例，展示了如何使用 Flex View 快速布局。你可以基于这些布局组件，快速拼装出你想要的界面。">使用案例</TestHeader>
        <TestGroup>
          <RowView align="center">
            <Avatar color="blue" text="王" />
            <ColumnView padding={10}>
              <RowView align="center">
                <Icon icon="favorite-filling" color="#f60" />
                <WhiteSpace size={2}/>
                <Text size={16}>小王</Text>
              </RowView>
              <Text>1234567890@qq.com</Text>
            </ColumnView>
          </RowView>
        </TestGroup>
        <WhiteSpace size={100} />
      </ScrollView>
    );
  }
}

