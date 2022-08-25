import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from 'imengyu-ui-lib';
import { CellGroup } from 'imengyu-ui-lib';
import { Cell } from 'imengyu-ui-lib';
import { ScrollView } from 'react-native';
import { Image, Text } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestCell'>;

export class TestCellScreen extends React.PureComponent<Props> {
  render() {
    return (
      <ScrollView>
        <ColumnView center>
          <CellGroup title="基础用法">
            <Text style={TestStyles.TitleText}>Cell 可以单独使用，也可以与 CellGroup 搭配使用，CellGroup 可以为 Cell 提供上下外边框。</Text>
            <Cell title="单元格标题" value="内容" />
            <Cell title="单元格标题" label="单元格说明" value="内容" />
            <Cell title="显示箭头" value="内容" showArrow />
            <Cell title="可以点击的单元格" showArrow onPress={() => console.log('点击了！')} />
          </CellGroup>
          <CellGroup title="卡片风格" inset>
            <Text style={TestStyles.TitleText}>通过 CellGroup 的 inset 属性，可以将单元格转换为圆角卡片风格。</Text>
            <Cell title="单元格标题" value="内容" />
            <Cell title="单元格标题" label="单元格说明" value="内容" />
          </CellGroup>
          <CellGroup title="单元格大小">
            <Text style={TestStyles.TitleText}>通过 size 属性可以控制单元格的大小。</Text>
            <Cell title="单元格 large" value="内容" size="large" />
            <Cell title="单元格 medium" value="内容" size="medium" />
            <Cell title="单元格 small" value="内容" size="small" />
          </CellGroup>
          <CellGroup title="展示图标">
            <Text style={TestStyles.TitleText}>通过 icon 属性在标题左侧展示图标。</Text>
            <Cell title="图标" value="内容" icon="setting" />
            <Cell title="右侧图标" icon="help" rightIcon="map" />
          </CellGroup>
          <CellGroup title="自定义渲染">
            <Text style={TestStyles.TitleText}>如以上用法不能满足你的需求，可以使用自定义渲染函数来自定义内容。</Text>
            <Cell title="右侧是自定义渲染的图片" renderRight={() => <Image source={require('../images/defaultAvatar.png')} key="right" style={{
                width: 30,
                height: 30,
              }} />
            } />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

