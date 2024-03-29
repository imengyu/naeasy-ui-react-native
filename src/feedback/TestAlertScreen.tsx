import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { CellGroup, Cell, ActionSheetNative, Toast, AlertNative, ColumnView, A, Text } from '../lib';
import { RootStackParamList } from '../navigation';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestAlert'>;

export class TestAlertScreen extends React.PureComponent<Props> {

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView>
          <TestPageHeader
            title="AlertNative 图片预览"
            desc={<Text>
              对原生的 Alert、ActionSheet 进行了封装，
              用于统一 Alert、ActionSheet 在 安卓与 iOS 上的表现（安卓使用 <A href="https://github.com/kongzue/DialogX">DialogX</A> ）。
            </Text>}
            navigation={this.props.navigation}
          />
          <CellGroup title="原生对话框" inset>
            <Cell title="Alert.alert" showArrow onPress={() => {
              AlertNative.alert('提示', '这是一个弹出对话框');
            }} />
            <Cell title="Alert.prompt" showArrow onPress={() => {
              AlertNative.prompt('提示', '请输入文字', (v) => {
                Toast.info('你输入了' + v);
              });
            }} />
            <Cell title="ActionSheet" showArrow onPress={() => {
              ActionSheetNative.showNativeActionSheetWithOptions({
                options: [
                  '选项1',
                  '选项2',
                  '选项3',
                  '选项4',
                ],
                showCancel: true,
                cancelButtonIndex: 4,
              }, (i) => {
                Toast.info('点击了' + i);
              });
            }} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

