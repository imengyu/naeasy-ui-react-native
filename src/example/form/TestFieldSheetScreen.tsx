import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from '../../components/layout/ColumnView';
import { CellGroup } from '../../components/CellGroup';
import { ScrollView } from 'react-native-gesture-handler';
import { Field } from '../../components/form/Field';
import { Button } from '../../components/Button';
import { RootStackParamList } from '../navigation';
import { KeyboardAvoidingView } from 'react-native';

type Props = StackScreenProps<RootStackParamList, 'TestField'>;

export function TestFieldScreen(_props: Props) {
  const [ value1, setValue1] = useState('');
  const [ value2, setValue2] = useState('');
  const [ value3, setValue3] = useState('');
  const [ value4, setValue4] = useState('');
  const [ value5, setValue5] = useState('');
  const [ value6, setValue6] = useState('用户名');
  const [ value7, setValue7] = useState('');
  const [ value8, setValue8] = useState('只读的内容');
  const [ value9, setValue9] = useState('我发现很多混得不好的人看得都很开。也不知道他们是因为看得透彻而不屑于世俗的成功，还是因为不成功而不得不看得开。');
  const [ value10, setValue10] = useState('殷勤花下同携手。更尽杯中酒。美人不用敛蛾眉。');
  const [ value11, setValue11] = useState('');

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={60}>
      <ScrollView>
        <ColumnView center>

          <CellGroup title="基础用法" inset>
            <Field label="文本" placeholder="请输入文本" value={value1} onChangeText={setValue1} />
          </CellGroup>
          <CellGroup title="自定义类型" inset>
            <Field label="文本" type="text" placeholder="请输入文本" value={value2} onChangeText={setValue2} />
            <Field label="密码" type="password" placeholder="请输入密码" value={value11} onChangeText={setValue11} />
            <Field label="整数" type="number" placeholder="请输入整数" value={value3} onChangeText={setValue3} />
            <Field label="数字" type="decimal" placeholder="请输入数字（小数）" value={value4} onChangeText={setValue4} />
            <Field label="电话" type="tel" placeholder="请输入电话" value={value5} onChangeText={setValue5} />
            <Field label="邮箱" type="email" placeholder="请输入邮箱" value={value6} onChangeText={setValue6} />
          </CellGroup>
          <CellGroup title="禁用" inset>
            <Field label="只读" editable={false} placeholder="输入框只读" value={value8} onChangeText={setValue8} />
            <Field label="禁用" disabled placeholder="输入框已禁用" value={value1} onChangeText={setValue1} />
          </CellGroup>
          <CellGroup title="错误提示" inset>
            <Field label="用户名" required showRequiredBadge placeholder="请输入用户名" error value={value6} onChangeText={setValue6} />
            <Field label="用户名" required showRequiredBadge placeholder="请输入用户名" errorMessage="请输入用户名" value={value7} onChangeText={setValue7} />
          </CellGroup>
          <CellGroup title="插入按钮" inset>
            <Field
              label="短信验证码"
              required
              placeholder="请输入短信验证码"
              value={value6}
              onChangeText={setValue6}
              renderRightButton={() => (<Button size="small" type="primary">发送验证码</Button>)}
            />
          </CellGroup>
          <CellGroup title="多行文字" inset>
            <Field label="多行文字" multiline placeholder="请输入"  value={value9} onChangeText={setValue9} />
          </CellGroup>
          <CellGroup title="显示字数统计" inset>
            <Field label="多行文字" multiline placeholder="请输入" showWordLimit maxLength={100} value={value10} onChangeText={setValue10} />
          </CellGroup>


        </ColumnView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

