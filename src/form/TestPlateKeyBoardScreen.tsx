import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { ScrollView, TextInput } from 'react-native';
import { Cell, CellGroup, ColumnView, PlateKeyBoard } from '../lib';

type Props = StackScreenProps<RootStackParamList, 'TestPlateKeyBoard'>;

export function TestPlateKeyBoardScreen(_props: Props) {

  const [ check1, setCheck1 ] = useState(false);
  const [ text, setText ] = useState('');

  function onInput(char: string) {
    setText(prev => prev + char);
  }
  function onDelete() {
    setText(prev => prev.substring(0, prev.length - 1));
  }

  return (
    <ScrollView>
      <ColumnView padding={10}>
        <CellGroup inset>
          <TextInput value={text} />
        </CellGroup>

        <CellGroup inset>
          <Cell title="弹出车牌号键盘" showArrow onPress={() => setCheck1(true)} />
        </CellGroup>

        <PlateKeyBoard
          show={check1}
          onInput={onInput}
          onDelete={onDelete}
          onBlur={() => setCheck1(false)}
        />
      </ColumnView>
    </ScrollView>
  );
}

