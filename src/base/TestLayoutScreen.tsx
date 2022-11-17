import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ColumnView, CellGroup, RowView, Color, AlertNative, WhiteSpace } from '../lib';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';


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
        <ColumnView center>
          <CellGroup title="ColumnView" inset>
            <Text style={TestStyles.TitleText}>ColumnView 是一个flex垂直方向的view。</Text>
            <ColumnView style={{ paddingVertical: 10 }}>
              <View style={styles.box} />
              <View style={styles.box2} />
              <View style={styles.box3} />
            </ColumnView>
          </CellGroup>
          <CellGroup title="RowView" inset>
            <Text style={TestStyles.TitleText}>RowView 是一个flex水平方向的view。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <View style={styles.box} />
              <View style={styles.box2} />
              <View style={styles.box3} />
            </RowView>
          </CellGroup>
          <CellGroup title="居中" inset>
            <Text style={TestStyles.TitleText}>设置 center 属性可以居中。</Text>
            <ColumnView center style={{ paddingVertical: 10 }}>
              <View style={styles.box} />
              <View style={styles.box2} />
              <View style={styles.box3} />
            </ColumnView>
          </CellGroup>
          <CellGroup title="换行" inset>
            <Text style={TestStyles.TitleText}>设置 wrap 属性可以换行。</Text>
            <RowView wrap style={{ paddingVertical: 10 }}>
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
          </CellGroup>
          <CellGroup title="常用属性封装" inset>
            <Text style={TestStyles.TitleText}>支持背景颜色、大小、边距等常用属性。</Text>
            <ColumnView style={{ paddingVertical: 10 }}>
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
          </CellGroup>
          <CellGroup title="点击事件封装" inset>
            <Text style={TestStyles.TitleText}>支持点击的 View。</Text>
            <ColumnView backgroundColor="#f40" touchable padding={10} onPress={() => {
              AlertNative.alert('提示', '点击了！');
            }}>
              <Text>ABC</Text>
            </ColumnView>
          </CellGroup>
          <WhiteSpace size={100} />
        </ColumnView>
      </ScrollView>
    );
  }
}

