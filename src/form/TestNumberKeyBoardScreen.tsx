import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { ScrollView, TextInput } from 'react-native';
import { NumberKeyBoard, Cell, CellGroup, ColumnView } from '../../lib/src/index';

type Props = StackScreenProps<RootStackParamList, 'TestNumberKeyBoard'>;

export function TestNumberKeyBoardScreen(_props: Props) {

  const [ check1, setCheck1 ] = useState(false);
  const [ check2, setCheck2 ] = useState(false);
  const [ check3, setCheck3 ] = useState(false);
  const [ check4, setCheck4 ] = useState(false);
  const [ check5, setCheck5 ] = useState(false);
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
          <Cell title="弹出默认键盘" showArrow onPress={() => setCheck1(true)} />
          <Cell title="弹出带右侧栏的键盘" showArrow onPress={() => setCheck2(true)} />
          <Cell title="弹出带标题的键盘" showArrow onPress={() => setCheck3(true)} />
          <Cell title="弹出身份证号键盘" showArrow onPress={() => setCheck4(true)} />
          <Cell title="弹出配置多个按键的键盘" showArrow onPress={() => setCheck5(true)} />
        </CellGroup>

        <NumberKeyBoard
          show={check1}
          onInput={onInput}
          onDelete={onDelete}
          onBlur={() => setCheck1(false)}
        />
        <NumberKeyBoard
          show={check2}
          showSideButtons
          onInput={onInput}
          onDelete={onDelete}
          onBlur={() => setCheck2(false)}
        />
        <NumberKeyBoard
          show={check3}
          title="请输入号码"
          onInput={onInput}
          onDelete={onDelete}
          onBlur={() => setCheck3(false)}
        />
        <NumberKeyBoard
          show={check4}
          extraKey={[ 'X' ]}
          onInput={onInput}
          onDelete={onDelete}
          onBlur={() => setCheck4(false)}
        />
        <NumberKeyBoard
          show={check5}
          extraKey={[ 'Y', 'X' ]}
          showSideButtons
          onInput={onInput}
          onDelete={onDelete}
          onBlur={() => setCheck5(false)}
        />
      </ColumnView>
    </ScrollView>
  );
}

