import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, CellGroup, RowView, Color, Button, Collapsible, WingBlank } from 'imengyu-ui-lib';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestCollapse', 'RootStack'>;
interface TestCollapseScreenState {
  isCollapsed: boolean,
  activeSections: number[],
  multipleSelect: boolean,
}

const styles = StyleSheet.create({
  box: {
    width: 39,
    height: 39,
    backgroundColor: Color.grey,
    margin: 5,
  },
});

export class TestCollapseScreen extends React.PureComponent<Props, TestCollapseScreenState> {

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center style={{ padding: 10 }}>
          <CellGroup title="介绍" inset>
            <Text style={{ padding: 10 }}>将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。</Text>
          </CellGroup>
          <CellGroup title="基础用法" inset>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

