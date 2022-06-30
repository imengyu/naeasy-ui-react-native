import React from 'react';
import Badge from '../../components/Badge';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from '../../components/layout/ColumnView';
import { CellGroup } from '../../components/CellGroup';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { RowView } from '../../components/layout/RowView';
import { Color } from '../../styles/ColorStyles';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestBadge', 'RootStack'>;

const styles = StyleSheet.create({
  box: {
    width: 39,
    height: 39,
    backgroundColor: Color.grey,
    margin: 5,
  },
});

export class TestBadgeScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center>
          <CellGroup title="介绍" inset>
            <Text style={{ padding: 10 }}>通常用于在头像，某些按钮上显示小红点或者数量。</Text>
          </CellGroup>
          <CellGroup title="基础用法" inset>
            <RowView center style={{ padding: 10 }}>
              <Badge>
                <View style={styles.box} />
              </Badge>
              <Badge content="1">
                <View style={styles.box} />
              </Badge>
              <Badge content="new">
                <View style={styles.box} />
              </Badge>
              <Badge content="新信息" border>
                <View style={styles.box} />
              </Badge>
            </RowView>
          </CellGroup>
          <CellGroup title="不同位置、颜色的徽标" inset>
            <RowView center style={{ padding: 10 }}>
              <Badge>
                <View style={styles.box} />
              </Badge>
              <Badge position="bottomLeft" color={Color.primary}>
                <View style={styles.box} />
              </Badge>
              <Badge position="topLeft" color={Color.success}>
                <View style={styles.box} />
              </Badge>
              <Badge position="bottomRight" color={Color.warning}>
                <View style={styles.box} />
              </Badge>
            </RowView>
          </CellGroup>
          <CellGroup title="独立展示" inset>
            <RowView center style={{ padding: 10 }}>
              <Badge />
              <Badge content="1" />
              <Badge content="new" border />
            </RowView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

