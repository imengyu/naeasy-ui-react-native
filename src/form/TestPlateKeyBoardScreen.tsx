import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { ScrollView } from 'react-native';
import { Cell, CellGroup } from '../lib';
import { Field } from '../../lib/src/components/form';
import { PlateKeyBoard } from '../../lib/src/components/keyboard';
import { TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestPlateKeyBoard'>;

export function TestPlateKeyBoardScreen(props: Props) {

  const [ check1, setCheck1 ] = useState(false);
  const [ text, setText ] = useState('');

  return (
    <ScrollView>
      <TestPageHeader
        title="PlateKeyBoard 车牌号输入"
        desc="中国车牌号输入键盘，可以配合输入框组件或自定义的输入框组件使用。"
        navigation={props.navigation}
      />
      <TestGroup noHorizontalPadding>
        <CellGroup inset>
          <Field value={text} placeholder="请输入车牌号" onChangeText={setText} />
        </CellGroup>

        <CellGroup inset>
          <Cell title="弹出车牌号键盘" showArrow onPress={() => setCheck1(true)} />
        </CellGroup>

        <PlateKeyBoard
          show={check1}
          onFinish={(r) => setText(r)}
          onBlur={() => setCheck1(false)}
        />
      </TestGroup>
    </ScrollView>
  );
}

