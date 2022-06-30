import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from '../../components/layout/ColumnView';
import { CellGroup } from '../../components/CellGroup';
import Alert from '../../components/Alert';
import SwipeableRightActionsRow from '../../components/SwipeableRightActionsRow';
import SwipeableRow from '../../components/SwipeableRow';
import { Cell } from '../../components/Cell';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from '../../components/Button';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Color } from '../../styles';

type Props = StackScreenProps<RootStackParamList, 'TestSwipeableRow', 'RootStack'>;

export class TestSwipeableRowScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <GestureHandlerRootView>
        <ColumnView>
          <CellGroup title="基础用法">
            <SwipeableRightActionsRow
              rightThreshold={40}
              actions={[
                {
                  text: '标为未读',
                  color: Color.primary,
                  width: 80,
                  onPress: () => {
                    Alert.alert('提示', '点击了：标为未读');
                  },
                },
                {
                  text: '不显示',
                  color: Color.warning,
                  width: 70,
                  onPress: () => {
                    Alert.alert('提示', '点击了：不显示');
                  },
                },
                {
                  text: '删除',
                  color: Color.danger,
                  width: 60,
                  onPress: () => {
                    Alert.alert('提示', '点击了：删除');
                  },
                },
              ]}
            >
              <Cell title="侧滑一下这条试试" />
            </SwipeableRightActionsRow>
          </CellGroup>
          <CellGroup title="自定义左右按钮">
            <SwipeableRow
              overshootLeft={false}
              overshootRight={false}
              rightThreshold={60}
              leftThreshold={40}
              rightActions={[
                {
                  renderAction: () => (
                    <Button text="操作" type="primary" onPress={() => Alert.alert('提示', '点击了操作')} />
                  ),
                },
                {
                  width: 100,
                  renderAction: () => (
                    <View style={{ flex: 1, backgroundColor: Color.orangeLight, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>自定义侧边区域</Text>
                    </View>
                  ),
                },
              ]}
              leftActions={[
                {
                  renderAction: () => (
                    <Button text="按钮" type="danger" onPress={() => Alert.alert('提示', '点击了 按钮')} />
                  ),
                },
              ]}
            >
              <Cell title="左右滑一下这条试试" label="左右两边按钮都可以自定义的哦" />
            </SwipeableRow>
          </CellGroup>
        </ColumnView>
      </GestureHandlerRootView>
    );
  }
}

