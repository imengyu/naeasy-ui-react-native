import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { Color, Col, Row, CellGroup, ColumnView } from '../lib';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestLayout2'>;

const styles = StyleSheet.create({
  box: {
    height: 30,
    textAlign: 'center',
    backgroundColor: Color.primary.light,
  },
  box2: {
    height: 30,
    textAlign: 'center',
    backgroundColor: Color.success.light,
  },
});

export class TestLayout2Screen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center padding={10}>
          <CellGroup title="基础用法">
            <Text style={TestStyles.TitleText}>Layout 组件提供了 24列栅格，通过在 Col 上添加 span 属性设置列所占的宽度百分比。此外，添加 offset 属性可以设置列的偏移宽度，计算方式与 span 相同。</Text>
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
          </CellGroup>
          <CellGroup title="设置列元素间距">
            <Text style={TestStyles.TitleText}>通过 gutter 属性可以设置列元素之间的间距，默认间距为 0。</Text>
            <Row gutter={20}>
              <Col span={8}><Text style={styles.box}>span: 8</Text></Col>
              <Col span={8}><Text style={styles.box2}>span: 8</Text></Col>
              <Col span={8}><Text style={styles.box}>span: 8</Text></Col>
            </Row>
          </CellGroup>
          <CellGroup title="对齐方式">
            <Text style={TestStyles.TitleText}>通过 justify 属性可以设置主轴上内容的对齐方式，等价于 flex 布局中的 justify-content 属性。</Text>
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
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

