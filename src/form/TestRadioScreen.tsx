import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup, Color, Cell, ColumnView } from '../lib';
import { ScrollView, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Radio, RadioGroup } from '../../lib/src/components/form';

type Props = StackScreenProps<RootStackParamList, 'TestRadio'>;

const styles = StyleSheet.create({
  radioStyle: {
    paddingVertical: 4,
  },
});

export function TestRadioScreen(_props: Props) {

  const [ checked1, setChecked1 ] = useState(false);
  const [ checked2, setChecked2 ] = useState('0');
  const [ checked3, setChecked3 ] = useState('0');

  return (
    <ScrollView>
      <ColumnView center>
        <CellGroup title="单独用法" inset>
          <ColumnView style={{ padding: 10 }}>
            <Radio value={checked1} onValueChange={setChecked1} text="单选框" />
          </ColumnView>
        </CellGroup>
        <CellGroup title="基础用法" inset>
          <ColumnView style={{ padding: 10 }}>
            <RadioGroup value={checked2} onValueChange={(v) => setChecked2(v as string)}>
              <Radio name="0" text="单选框 1" style={styles.radioStyle} />
              <Radio name="1" text="单选框 2" style={styles.radioStyle} />
              <Radio name="2" text="单选框 3" style={styles.radioStyle} />
              <Radio name="3" text="单选框 4" style={styles.radioStyle} />
            </RadioGroup>
          </ColumnView>
        </CellGroup>
        <CellGroup title="禁用状态" inset>
          <ColumnView style={{ padding: 10 }}>
            <RadioGroup value={checked3} onValueChange={(v) => setChecked3(v as string)}>
              <Radio name="0" disabled text="单选框 1" style={styles.radioStyle} />
              <Radio name="1" disabled text="单选框 2" style={styles.radioStyle} />
            </RadioGroup>
          </ColumnView>
        </CellGroup>
        <CellGroup title="自定义颜色" inset>
          <ColumnView style={{ padding: 10 }}>
            <RadioGroup value={checked3} onValueChange={(v) => setChecked3(v as string)}>
              <Radio name="0" color={Color.danger} text="单选框 1" style={styles.radioStyle} />
              <Radio name="1" color={Color.success} text="单选框 2" style={styles.radioStyle} />
            </RadioGroup>
          </ColumnView>
        </CellGroup>
        <CellGroup title="配合单元格组件使用" inset>
          <RadioGroup value={checked3} onValueChange={(v) => setChecked3(v as string)}>
            <Cell key="0"><Radio checkPosition="right" block text="单选框 1" name="1" /></Cell>
            <Cell key="1"><Radio checkPosition="right" block text="单选框 2" name="2" /></Cell>
          </RadioGroup>

        </CellGroup>
      </ColumnView>
    </ScrollView>
  );
}

