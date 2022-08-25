import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ColumnView, CellGroup, RowView, Color } from 'imengyu-ui-lib';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';


type Props = StackScreenProps<RootStackParamList, 'TestLayout'>;

const styles = StyleSheet.create({
  box: {
    width: 39,
    height: 39,
    backgroundColor: Color.primary,
    borderRadius: 10,
    margin: 5,
  },
  box2: {
    width: 39,
    height: 39,
    backgroundColor: Color.success,
    borderRadius: 10,
    margin: 5,
  },
  box3: {
    width: 39,
    height: 39,
    backgroundColor: Color.warning,
    borderRadius: 10,
    margin: 5,
  },
  box4: {
    height: 39,
    width: '100%',
    backgroundColor: Color.warning,
    borderRadius: 10,
    margin: 5,
  },
  box5: {
    height: 39,
    width: '100%',
    backgroundColor: Color.success,
    borderRadius: 10,
    margin: 5,
  },
  box6: {
    height: 39,
    width: '100%',
    backgroundColor: Color.danger,
    borderRadius: 10,
    margin: 5,
  },
  title: {
    backgroundColor: Color.warning,
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
        </ColumnView>
      </ScrollView>
    );
  }
}

