import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { ScrollView, StyleSheet } from 'react-native';
import { Color, Cell, RowView, Button, CellGroup, ColumnView } from '../lib';
import { RootStackParamList } from '../navigation';
import { CheckBox, CheckBoxGroup, ImageCheckBox } from '../../lib/src/components/form';

type Props = StackScreenProps<RootStackParamList, 'TestCheck'>;

const styles = StyleSheet.create({
  radioStyle: {
    paddingVertical: 4,
  },
});

export function TestCheckScreen(_props: Props) {

  const check5 = React.createRef<CheckBoxGroup>();
  const [ checked1, setChecked1 ] = useState(false);
  const [ checked2, setChecked2 ] = useState<string[]>([ '0' ]);
  const [ checked3, setChecked3 ] = useState<string[]>([ '0' ]);
  const [ checked4, setChecked4 ] = useState<string[]>([ '1', '2' ]);
  const [ checked5, setChecked5 ] = useState<string[]>([ '0', '1' ]);
  const [ checked6, setChecked6 ] = useState<string[]>([ '0' ]);
  const [ checked7, setChecked7 ] = useState<string[]>([ '0' ]);

  return (
    <ScrollView>
      <ColumnView center>
        <CellGroup title="单独用法" inset>
          <ColumnView style={{ padding: 10 }}>
            <CheckBox value={checked1} onValueChange={setChecked1} text="复选框" />
          </ColumnView>
        </CellGroup>
        <CellGroup title="基础用法" inset>
          <ColumnView style={{ padding: 10 }} justify="flex-start">
            <CheckBoxGroup value={checked2} onValueChange={(v) => setChecked2(v)}>
              <CheckBox name="0" text="复选框 1" style={styles.radioStyle} />
              <CheckBox name="1" text="复选框 2" style={styles.radioStyle} />
              <CheckBox name="2" text="复选框 3" style={styles.radioStyle} />
              <CheckBox name="3" text="复选框 4" style={styles.radioStyle} />
            </CheckBoxGroup>
          </ColumnView>
        </CellGroup>
        <CellGroup title="禁用" inset>
          <ColumnView style={{ padding: 10 }}>
            <CheckBoxGroup value={checked3} onValueChange={(v) => setChecked3(v)}>
              <CheckBox name="0" disabled={true} color={Color.danger} text="复选框 1" style={styles.radioStyle} />
              <CheckBox name="1" disabled={true} color={Color.success} text="复选框 2" style={styles.radioStyle} />
            </CheckBoxGroup>
          </ColumnView>
        </CellGroup>
        <CellGroup title="自定义形状" inset>
          <ColumnView style={{ padding: 10 }}>
            <CheckBoxGroup value={checked3} onValueChange={(v) => setChecked3(v)}>
              <CheckBox name="0" shape="round" text="复选框 1" style={styles.radioStyle} />
              <CheckBox name="1" shape="square" text="复选框 2" style={styles.radioStyle} />
            </CheckBoxGroup>
          </ColumnView>
        </CellGroup>
        <CellGroup title="自定义颜色" inset>
          <ColumnView style={{ padding: 10 }}>
            <CheckBoxGroup value={checked7} onValueChange={(v) => setChecked7(v)}>
              <CheckBox name="0" color={Color.danger} text="复选框 1" style={styles.radioStyle} />
              <CheckBox name="1" color={Color.success} text="复选框 2" style={styles.radioStyle} />
            </CheckBoxGroup>
          </ColumnView>
        </CellGroup>
        <CellGroup title="自定义图片" inset>
          <ColumnView style={{ padding: 10 }}>
            <CheckBoxGroup value={checked6} onValueChange={(v) => setChecked6(v)}>
              <ImageCheckBox name="0" text="复选框 1" style={styles.radioStyle} />
              <ImageCheckBox name="1" boxImage={require('../images/test/test-check-box.png')} checkImage={require('../images/test/test-check.png')} text="复选框 2" style={styles.radioStyle} />
            </CheckBoxGroup>
          </ColumnView>
        </CellGroup>
        <CellGroup title="配合单元格组件使用" inset>
          <CheckBoxGroup value={checked4} onValueChange={(v) => setChecked4(v)}>
            <Cell key="1"><CheckBox checkPosition="right" block name="1" text="复选框 1" /></Cell>
            <Cell key="2"><CheckBox checkPosition="right" block name="2" text="复选框 2" /></Cell>
            <Cell key="3"><CheckBox checkPosition="right" block name="3" text="复选框 3" /></Cell>
            <Cell key="4"><CheckBox checkPosition="right" block name="4" text="复选框 4" /></Cell>
          </CheckBoxGroup>
        </CellGroup>
        <CellGroup title="切换选择" inset>
          <ColumnView style={{ padding: 10 }}>
            <CheckBoxGroup ref={check5} value={checked5} onValueChange={(v) => setChecked5(v)}>
              <CheckBox name="0" text="复选框 1" style={styles.radioStyle} />
              <CheckBox name="1" text="复选框 2" style={styles.radioStyle} />
              <CheckBox name="2" text="复选框 3" style={styles.radioStyle} />
              <CheckBox name="3" text="复选框 4" style={styles.radioStyle} />
            </CheckBoxGroup>
            <RowView padding={10}>
              <Button type="primary" onPress={() => check5.current?.toggleAll(true)}>全选</Button>
              <Button type="primary" style={{ marginLeft: 5 }} onPress={() => check5.current?.toggleAll(false)}>全不选</Button>
              <Button type="primary" style={{ marginLeft: 5 }} onPress={() => check5.current?.toggleAll()}>反选</Button>
            </RowView>
          </ColumnView>
        </CellGroup>
      </ColumnView>
    </ScrollView>
  );
}

