import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { ScrollView } from 'react-native';
import { Cell, CellGroup, ColumnView, PlateKeyBoard, Field } from '../lib';
import { TestStyles } from '../styles/TestStyles';

type Props = StackScreenProps<RootStackParamList, 'TestPlateKeyBoard'>;

export function TestPlateKeyBoardScreen(_props: Props) {

  const [ check1, setCheck1 ] = useState(false);
  const [ text, setText ] = useState('');

  return (
    <ScrollView>
      <ColumnView style={TestStyles.PaddingH}>
        <CellGroup inset>
          <Field value={text} onChangeText={setText} />
        </CellGroup>

        <CellGroup inset>
          <Cell title="弹出车牌号键盘" showArrow onPress={() => setCheck1(true)} />
        </CellGroup>

        <PlateKeyBoard
          show={check1}
          onFinish={(r) => setText(r)}
          onBlur={() => setCheck1(false)}
        />
      </ColumnView>
    </ScrollView>
  );
}

