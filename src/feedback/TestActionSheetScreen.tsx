import React, { useState, useRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { CellGroup, Cell, ActionSheet, Toast, Color, ColumnView, ActionSheetTitle } from '../lib';
import { RootStackParamList } from '../navigation';
import { SimpleList } from '../../lib/src/components/list';

type Props = StackScreenProps<RootStackParamList, 'TestActionSheet'>;

export function TestActionSheetScreen(_props: Props) {
  const [ showActionSheet1, setShowActionSheet1] = useState(false);
  const [ showActionSheet2, setShowActionSheet2] = useState(false);
  const [ showActionSheet3, setShowActionSheet3] = useState(false);
  const [ showActionSheet4, setShowActionSheet4] = useState(false);
  const [ showActionSheet5, setShowActionSheet5] = useState(false);
  const choosedItem = useRef<string[]>([]);

  return (
    <ScrollView>
      <ColumnView center>
        <ActionSheet
          show={showActionSheet1}
          actions={[
            { name: '选项1' },
            { name: '选项2' },
            { name: '选项3' },
          ]}
          onClose={() => setShowActionSheet1(false)}
          onSelect={(i, name) => {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 autoClose 属性开启自动收起
            setShowActionSheet1(false);
            Toast.info(`选中了 ${name}`);
          }}
        />
        <ActionSheet
          show={showActionSheet2}
          showCancel
          actions={[
            { name: '选项1' },
            { name: '选项2' },
            { name: '选项3' },
          ]}
          onClose={() => setShowActionSheet2(false)}
          onSelect={(i, name) => {
            setShowActionSheet2(false);
            Toast.info(`选中了 ${name}`);
          }}
        />
        <ActionSheet
          show={showActionSheet3}
          showCancel
          description="说明文字"
          actions={[
            { name: '正常选项' },
            { name: '危险选项', color: Color.danger, subname: '删除后无法恢复', bold: true },
            { name: '禁用选项1', disabled: true  },
            { name: '禁用选项2', disabled: true, subname: '这个选项不可点击'  },
          ]}
          onClose={() => setShowActionSheet3(false)}
          onSelect={(i, name) => {
            setShowActionSheet3(false);
            Toast.info(`选中了 ${name}`);
          }}
        />
        <ActionSheet
          show={showActionSheet4}
          showCancel
          description="说明文字"
          actions={[
            { name: '选项1' },
            { name: '选项2' },
            { name: '选项3' },
            { name: '选项4' },
            { name: '选项5' },
            { name: '选项6' },
            { name: '选项7' },
            { name: '选项8' },
            { name: '选项9' },
            { name: '选项10' },
            { name: '选项11' },
            { name: '选项12' },
            { name: '选项13' },
          ]}
          onClose={() => setShowActionSheet4(false)}
          onSelect={(i, name) => {
            setShowActionSheet4(false);
            Toast.info(`选中了 ${name}`);
          }}
        />
        <ActionSheet
          show={showActionSheet5}
          closeable
          closeIcon={false}
          onClose={() => setShowActionSheet5(false)}
          renderContent={(close) => <ColumnView>
            <ActionSheetTitle
              title="请选择选项"
              cancelText="取消"
              confirmText="确定"
              onCancelPressed={close}
              border={false}
              onConfirmPressed={() => {
                Toast.info('你选择了:' + JSON.stringify(choosedItem.current));
                close();
              }}
            />
            <SimpleList<string>
              mode="mulit-check"
              onSelectedItemChanged={(v) => { choosedItem.current = v; }}
              data={[ '选项1', '选项2', '选项3', '选项4' ]}
            />
          </ColumnView>}
        />

        <CellGroup title="基础用法" inset>
          <Cell title="基础用法" showArrow onPress={() => {setShowActionSheet1(true);}} />
          <Cell title="展示取消按钮" showArrow onPress={() => {setShowActionSheet2(true);}} />
          <Cell title="展示显示描述和按扭颜色" showArrow onPress={() => {setShowActionSheet3(true);}} />
          <Cell title="超长自动滚动" showArrow onPress={() => {setShowActionSheet4(true);}} />
          <Cell title="居中 ActionSheet" showArrow onPress={() => {
            ActionSheet.show({
              showCancel: false,
              center: true,
              description: '请选择',
              actions: [
                { name: '选项1' },
                { name: '选项2' },
                { name: '选项3' },
                { name: '选项4' },
                { name: '选项5' },
                { name: '选项6' },
                { name: '选项7' },
              ],
              onSelect: (i, name) => {
                Toast.info(`选中了 ${name}`);
              },
            });
          }} />
        </CellGroup>
        <CellGroup title="自定义面板" inset>
          <Cell title="自定义面板" showArrow onPress={() => {setShowActionSheet5(true);}} />
        </CellGroup>
        <CellGroup title="指令式" inset>
          <Cell title="指令式打开 ActionSheet" showArrow onPress={() => {
            ActionSheet.show({
              showCancel: true,
              description: '请选择',
              actions: [
                { name: '正常选项' },
                { name: '危险选项', color: Color.danger, subname: '删除后无法恢复' },
                { name: '禁用选项1', disabled: true  },
                { name: '禁用选项2', disabled: true, subname: '这个选项不可点击'  },
              ],
              onSelect: (i, name) => {
                Toast.info(`选中了 ${name}`);
              },
            });
          }} />
        </CellGroup>
      </ColumnView>
    </ScrollView>
  );
}

