import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from 'imengyu-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';
import { Stepper } from 'imengyu-ui-lib';
import { Cell } from 'imengyu-ui-lib';
import { CellGroup } from 'imengyu-ui-lib';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestStepper'>;

export function TestStepperScreen(_props: Props) {

  const [ check1, setCheck1 ] = useState(1);
  const [ check2, setCheck2 ] = useState(1);
  const [ check3, setCheck3 ] = useState(1);
  const [ check4, setCheck4 ] = useState(1);
  const [ check5, setCheck5 ] = useState(3);
  const [ check6, setCheck6 ] = useState(1);
  const [ check7, setCheck7 ] = useState(1);

  return (
    <ScrollView>
      <ColumnView>
        <CellGroup inset>
          <Cell title="基础用法" center renderRight={() => <Stepper key="1" value={check1} onValueChange={setCheck1} />} />
          <Cell title="步长设置" center renderRight={() => <Stepper key="2" value={check2} onValueChange={setCheck2} step={3} />} />
          <Cell title="限制输入范围" center renderRight={() => <Stepper key="3" value={check3} onValueChange={setCheck3} maxValue={10} />} />
          <Cell title="限制输入整数" center renderRight={() => <Stepper key="4" value={check4} onValueChange={setCheck4} integer />} />
          <Cell title="禁用状态" center renderRight={() => <Stepper key="5" value={check5} onValueChange={setCheck5} disabled />} />
          <Cell title="禁用输入框" center renderRight={() => <Stepper key="6" value={check6} onValueChange={setCheck6} disableInput />} />
          <Cell title="固定小数位数" center renderRight={() => <Stepper key="7" value={check7} onValueChange={setCheck7} decimalLength={1} step={0.1} />} />
        </CellGroup>
      </ColumnView>
    </ScrollView>
  );
}

