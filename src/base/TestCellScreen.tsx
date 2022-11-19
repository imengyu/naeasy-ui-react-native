import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, CellGroup, Cell, Text } from '../lib';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { showTestMessage, TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestCell'>;

export class TestCellScreen extends React.PureComponent<Props> {
  render() {
    return (
      <ScrollView>
        <TestPageHeader
          title="Cell 单元格"
          desc="单元格通常用于列表条目展示，也可用于操作的点击。"
          navigation={this.props.navigation}
        />
        <TestHeader desc="Cell 可以单独使用，也可以与 CellGroup 搭配使用。">基础用法</TestHeader>
        <TestGroup noHorizontalPadding>
          <Cell title="单元格标题" value="内容" />
          <Cell title="单元格标题" label="单元格说明" value="内容" />

          <CellGroup>
            <Cell title="单元格标题" value="内容" />
            <Cell title="单元格标题" label="单元格说明" value="内容" />
          </CellGroup>
        </TestGroup>
        <TestHeader desc="通过 CellGroup 的 inset 属性，可以将单元格转换为圆角卡片风格。">卡片风格</TestHeader>
        <TestGroup noHorizontalPadding>
          <CellGroup inset>
            <Cell title="单元格标题" value="内容" />
            <Cell title="单元格标题" label="单元格说明" value="内容" />
          </CellGroup>
        </TestGroup>
        <TestHeader desc="通过 size 属性可以控制单元格的大小。">单元格大小</TestHeader>
        <TestGroup noHorizontalPadding>
          <CellGroup>
            <Cell title="单元格 large" value="内容" size="large" />
            <Cell title="单元格 medium" value="内容" size="medium" />
            <Cell title="单元格 small" value="内容" size="small" />
          </CellGroup>
        </TestGroup>
        <TestHeader desc="通过 icon 属性在标题左侧或者右侧展示图标。">展示图标</TestHeader>
        <TestGroup noHorizontalPadding>
          <CellGroup>
            <Cell title="左侧图标" value="内容" icon="setting" />
            <Cell title="右侧图标" value="内容" icon="help" rightIcon="map" />
          </CellGroup>
        </TestGroup>
        <TestHeader desc="通过 CellGroup 的 title 属性可以指定分组标题。">分组标题</TestHeader>
        <TestGroup noHorizontalPadding>
          <CellGroup title="我是分组标题">
            <Cell title="单元格标题" value="内容" />
            <Cell title="单元格标题" value="内容" />
          </CellGroup>
        </TestGroup>
        <TestHeader desc="设置 showArrow 属性后会在单元格右侧显示箭头">展示箭头</TestHeader>
        <TestGroup noHorizontalPadding>
          <Cell title="显示箭头" showArrow />
          <Cell title="显示箭头" value="内容" showArrow />
        </TestGroup>
        <TestHeader>可点击</TestHeader>
        <TestGroup noHorizontalPadding>
          <Cell title="可以点击的单元格" showArrow onPress={() => showTestMessage('点击了')} />
        </TestGroup>
        <TestHeader desc="通过 center 属性可以让 Cell 的左右内容都垂直居中。">垂直居中</TestHeader>
        <TestGroup noHorizontalPadding>
          <Cell title="单元格标题" label="单元格说明说明说明" center value="内容" showArrow />
        </TestGroup>
        <TestHeader desc="如以上用法不能满足你的需求，可以使用自定义渲染函数来自定义内容。">自定义渲染</TestHeader>
        <TestGroup noHorizontalPadding>
          <Cell title="右侧是自定义渲染的图片" renderRight={() =>
            <Image source={require('../images/defaultAvatar.png')} key="right" style={{
              width: 30,
              height: 30,
            }} />
          } />
          <Cell title="左侧是自定义渲染" value="正常内容" renderLeft={() => (
            <ColumnView>
              <Text>我是自定义渲染内容</Text>
              <Image source={require('../images/defaultAvatar.png')} key="right" style={{
                width: 30,
                height: 30,
              }} />
            </ColumnView>
          )} />
        </TestGroup>
      </ScrollView>
    );
  }
}

