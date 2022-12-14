import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Color, Col, Row, WhiteSpace } from '../lib';
import { RootStackParamList } from '../navigation';
import { TestGroup } from '../components/TestGroup';
import { TestHeader, TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestLayout2'>;

const styles = StyleSheet.create({
  box: {
    height: 30,
    textAlign: 'center',
    backgroundColor: Color.primary.light,
    color: Color.white.light,
  },
  box2: {
    height: 30,
    textAlign: 'center',
    backgroundColor: Color.success.light,
    color: Color.white.light,
  },
});

export class TestLayout2Screen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Layout 栅格布局"
          desc="Layout 组件提供了 24 列栅格，通过在 Col 上添加 span 属性设置列所占的宽度百分比。此外，添加 offset 属性可以设置列的偏移宽度，计算方式与 span 相同。"
          navigation={this.props.navigation}
        />
        <TestHeader>基础用法</TestHeader>
        <TestGroup>
          <Row>
            <Col span={8}><Text style={styles.box}>span: 8</Text></Col>
            <Col span={8}><Text style={styles.box2}>span: 8</Text></Col>
            <Col span={8}><Text style={styles.box}>span: 8</Text></Col>
          </Row>
          <Row>
            <Col span={4}><Text style={styles.box}>span: 4</Text></Col>
            <Col offset={10} span={10}><Text style={styles.box2}>offset: 4, span: 10</Text></Col>
          </Row>
          <Row>
            <Col offset={12} span={12}><Text style={styles.box}>offset: 12, span: 12</Text></Col>
          </Row>
        </TestGroup>
        <TestHeader desc="通过 gutter 属性可以设置列元素之间的间距，默认间距为 0。">设置列元素间距</TestHeader>
        <TestGroup>
          <Row gutter={20}>
            <Col span={8}><Text style={styles.box}>span: 8</Text></Col>
            <Col span={8}><Text style={styles.box2}>span: 8</Text></Col>
            <Col span={8}><Text style={styles.box}>span: 8</Text></Col>
          </Row>
        </TestGroup>
        <TestHeader desc="通过 justify 属性可以设置主轴上内容的对齐方式，等价于 flex 布局中的 justifyContent 属性。">对齐方式</TestHeader>
        <TestGroup>
          <Row justify="center">
            <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
            <Col span={6}><Text style={styles.box2}>span: 6</Text></Col>
            <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
          </Row>
          <Row justify="flex-end">
            <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
            <Col span={6}><Text style={styles.box2}>span: 6</Text></Col>
            <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
          </Row>
          <Row justify="space-between">
            <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
            <Col span={6}><Text style={styles.box2}>span: 6</Text></Col>
            <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
          </Row>
          <Row justify="space-around">
            <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
            <Col span={6}><Text style={styles.box2}>span: 6</Text></Col>
            <Col span={6}><Text style={styles.box}>span: 6</Text></Col>
          </Row>
        </TestGroup>
        <WhiteSpace size="larger" />
      </ScrollView>
    );
  }
}

