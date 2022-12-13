import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup, Button, ColumnView, WhiteSpace, Text, Color, Icon, ThemeSelector, rpx, Toast } from '../lib';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Field } from '../../lib/src/components/form';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestField'>;

export function TestFieldScreen(props: Props) {
  const [ value1, setValue1] = useState('');
  const [ value3, setValue3] = useState('');
  const [ value4, setValue4] = useState('');
  const [ value5, setValue5] = useState('');
  const [ value6, setValue6] = useState('');
  const [ value7, setValue7] = useState('');
  const [ value8, setValue8] = useState('只读的内容');
  const [ value9, setValue9] = useState('我发现很多混得不好的人看得都很开。也不知道他们是因为看得透彻而不屑于世俗的成功，还是因为不成功而不得不看得开。');
  const [ value10, setValue10] = useState('殷勤花下同携手。更尽杯中酒。美人不用敛蛾眉。');
  const [ value11, setValue11] = useState('');
  const [ value12, setValue12] = useState('');
  const [ value13, setValue13] = useState('');
  const [ value14, setValue14] = useState('');
  const [ value15, setValue15] = useState('');
  const [ value16, setValue16] = useState('');
  const [ value17, setValue17] = useState('');
  const [ value18, setValue18] = useState('我是文字，点击按钮清除');

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={60}>
      <ScrollView>
        <TestPageHeader
          title="Field 输入框/表单项"
          desc="用户可以在文本框内输入或编辑文字。Field 同时也作为表单项使用，可以搭配 Form 组件实现表单相关功能。"
          navigation={props.navigation}
        />
        <ColumnView center>
          <CellGroup title="基础用法" inset>
            <Field label="文本" placeholder="请输入文本" value={value1} onChangeText={setValue1} />
          </CellGroup>
          <CellGroup title="自定义类型" inset>
            <Field label="整数" type="number" placeholder="请输入整数" value={value3} onChangeText={setValue3} />
            <Field label="数字" type="decimal" placeholder="请输入数字（小数）" value={value4} onChangeText={setValue4} />
            <Field label="电话" type="tel" placeholder="请输入电话" value={value5} onChangeText={setValue5} />
            <Field label="邮箱" type="email" placeholder="请输入邮箱" value={value6} onChangeText={setValue6} />
            <Field label="密码" type="password" placeholder="请输入密码" value={value11} onChangeText={setValue11} />
          </CellGroup>
          <CellGroup title="禁用" inset>
            <Field label="只读" editable={false} placeholder="输入框只读" value={value8} onChangeText={setValue8} />
            <Field label="禁用" disabled placeholder="输入框已禁用" value={value1} onChangeText={setValue1} />
          </CellGroup>
          <CellGroup title="错误提示" inset>
            <Field label="用户名" required showRequiredBadge placeholder="请输入用户名" error value={value6} onChangeText={setValue6} />
            <Field label="用户名" required showRequiredBadge placeholder="请输入用户名" errorMessage="请输入用户名" value={value7} onChangeText={setValue7} />
          </CellGroup>
          <CellGroup title="带清除按钮" inset>
            <Field clearButton clearButtonMode="unless-editing" placeholder="请输入文字" value={value18} onChangeText={setValue18} />
          </CellGroup>
          <CellGroup title="不同的自定义样式" inset>
            <Field placeholder="无左侧标签" value={value12} onChangeText={setValue12} />
            <Field label="我是标签我是标签我是标签" placeholder="自定义标签与输入框宽度占比" labelFlex={2} inputFlex={3} value={value12} onChangeText={setValue12} />
            <Field label="无冒号" colon={false} placeholder="请输入文本" value={value17} onChangeText={setValue17} />
            <ColumnView padding={10}>
              <Field placeholder="自定义样式1" fieldStyle={{
                paddingVertical: rpx(10),
                paddingHorizontal: rpx(20),
                borderBottomColor: themeContext.resolveThemeColor(Color.border),
                borderBottomWidth: rpx(4),
                backgroundColor: themeContext.resolveThemeColor(Color.white),
              }} activeFieldStyle={{
                borderBottomColor: themeContext.resolveThemeColor(Color.primary),
              }} value={value12} onChangeText={setValue12} />
              <WhiteSpace size="sm" />
              <Field placeholder="自定义样式2" fieldStyle={{
                paddingVertical: rpx(10),
                paddingHorizontal: rpx(20),
                borderRadius: 5,
                borderWidth: rpx(2),
                borderColor: themeContext.resolveThemeColor(Color.border),
              }} activeFieldStyle={{
                borderColor: themeContext.resolveThemeColor(Color.primary),
              }} value={value12} onChangeText={setValue12} />
              <WhiteSpace size="sm" />
              <Field placeholder="自定义样式3" fieldStyle={{
                paddingVertical: rpx(10),
                paddingHorizontal: rpx(20),
                borderRadius: 5,
                backgroundColor: themeContext.resolveThemeColor(Color.grey),
              }}value={value12} onChangeText={setValue12} />
            </ColumnView>
          </CellGroup>
          <CellGroup title="输入文本右对齐+后缀" inset>
            <Field
              label="身高"
              colon={false}
              type="number"
              inputAlign="right"
              placeholder="请输入身高"
              suffix={<Text width={30} align="right" color={Color.black}>cm</Text>}
              value={value13}
              onChangeText={setValue13}
            />
            <Field
              label="体重"
              colon={false}
              type="number"
              inputAlign="right"
              placeholder="请输入体重"
              suffix={<Text width={30} align="right" color={Color.black}>kg</Text>}
              value={value14}
              onChangeText={setValue14}
            />
          </CellGroup>
          <CellGroup title="插入按钮" inset>
            <Field
              label=""
              required
              center
              placeholder="请输入短信验证码"
              value={value6}
              onChangeText={setValue6}
              renderRightButton={() => (<Button size="small" type="primary" onPress={() => Toast.info('发送验证码')}>发送验证码</Button>)}
            />
          </CellGroup>
          <CellGroup title="添加图标" inset>
            <Field
              center
              renderLeftIcon={() => <Icon icon="pad" style={{ marginRight: 10 }} />}
              placeholder="请输入手机号"
              value={value15}
              onChangeText={setValue15}
            />
            <Field
              center
              placeholder="请输入短信验证码"
              value={value16}
              onChangeText={setValue16}
              renderLeftIcon={() => <Icon icon="lock" style={{ marginRight: 10 }} />}
              renderRightButton={() => (<Button size="small" type="primary" onPress={() => Toast.info('发送验证码')}>发送验证码</Button>)}
            />
          </CellGroup>
          <CellGroup title="多行文字" inset>
            <Field label="多行文字" multiline placeholder="请输入" value={value9} onChangeText={setValue9} />
          </CellGroup>
          <CellGroup title="显示字数统计" inset>
            <Field label="多行文字" multiline placeholder="请输入" showWordLimit maxLength={100} value={value10} onChangeText={setValue10} />
          </CellGroup>

          <WhiteSpace size={100} />
        </ColumnView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

