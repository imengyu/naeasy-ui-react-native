import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { ScrollView } from 'react-native';
import { Cell, CellGroup } from '../lib';
import { Field } from '../../lib/src/components/form';
import { NumberKeyBoard } from '../../lib/src/components/keyboard';
import { TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestNumberKeyBoard'>;

export function TestNumberKeyBoardScreen(props: Props) {

  const [ check1, setCheck1 ] = useState(false);
  const [ check2, setCheck2 ] = useState(false);
  const [ check3, setCheck3 ] = useState(false);
  const [ check4, setCheck4 ] = useState(false);
  const [ check5, setCheck5 ] = useState(false);
  const [ check6, setCheck6 ] = useState(false);
  const [ text, setText ] = useState('');

  function onInput(char: string) {
    setText(prev => prev + char);
  }
  function onDelete() {
    setText(prev => prev.substring(0, prev.length - 1));
  }

  return (
    <ScrollView>

      <TestPageHeader
        title="NumberKeyBoard 数字键盘"
        desc="数字键盘，一般用于有安全需求下的数字输入，如金额、密码、验证码输入等。"
        navigation={props.navigation}
      />
      <TestGroup noHorizontalPadding>

        <CellGroup inset>
          <Field value={text} placeholder="请输入数字" onChangeText={setText} />
        </CellGroup>

        <CellGroup inset>
          <Cell title="默认键盘" showArrow onPress={() => setCheck1(true)} />
          <Cell title="带右侧栏键盘" showArrow onPress={() => setCheck2(true)} />
          <Cell title="带标题的键盘" showArrow onPress={() => setCheck3(true)} />
          <Cell title="身份证号键盘" showArrow onPress={() => setCheck4(true)} />
          <Cell title="自定义按键键盘" showArrow onPress={() => setCheck5(true)} />
          <Cell title="随机数字键盘" showArrow onPress={() => setCheck6(true)} />
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
          extraKeys={[ { key: 'X', order: 9, replace: true } ]}
          onInput={onInput}
          onDelete={onDelete}
          onBlur={() => setCheck4(false)}
        />
        <NumberKeyBoard
          show={check5}
          extraKeys={[
            { key: '0', order: 9, replace: true },
            { key: 'X', order: 10, replace: true },
            { key: 'Y', order: 11, replace: true },
            { key: 'A', order: 12, replace: true },
            { key: 'B', order: 13, replace: true },
            { key: 'C', order: 14, replace: true },
            { key: 'D', order: 15, replace: true },
            { key: 'E', order: 16, replace: true },
            { key: 'F', order: 17, replace: true },
          ]}
          sideKeys={[
            { key: 'delete', span: 2 },
            { key: 'finish', span: 4 },
          ]}
          keyHeight={40}
          showSideButtons
          onInput={onInput}
          onDelete={onDelete}
          onBlur={() => setCheck5(false)}
        />
        <NumberKeyBoard
          show={check6}
          keyRandomOrder
          onInput={onInput}
          onDelete={onDelete}
          onBlur={() => setCheck6(false)}
        />
      </TestGroup>
    </ScrollView>
  );
}

