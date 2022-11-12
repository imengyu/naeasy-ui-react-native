import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView, Text } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import {
  Form, CellGroup, Dialog, Field, Button, Switch, CheckBox, CheckBoxGroup,
  Rate, Radio, RadioGroup, Stepper, XBarSpace, ColumnView,
} from '../../lib/src/index';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestForm', 'RootStack'>;
interface State {
  page: number;
}

export class TestFormScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    page: 1,
  };

  formRef1 : Form|null = null;
  formRef2 : Form|null = null;
  formRef3 : Form|null = null;

  render(): React.ReactNode {
    return (
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100}>
        <ScrollView>
          <ColumnView padding={10}>

            <Text style={TestStyles.TitleText}>基础用法</Text>
            <CellGroup inset>
              <Form
                ref={(f) => { this.formRef1 = f;}}
                rules={{
                  userName: { required: true, message: '请输入用户名' },
                  password: { required: true, message: '请输入密码' },
                }}
                fieldProps={{
                  labelFlex: 1,
                }}
                onSubmit={(values) => {
                  Dialog.alert({
                    title: '表单数据',
                    content: JSON.stringify(values),
                  });
                }}
              >
                <Field name="userName" label="用户名" placeholder="请输入用户名" />
                <Field name="password" label="密码" placeholder="请输入密码"  type="password" />
              </Form>
              <Button type="primary" radius={50} onPress={() => this.formRef1?.submit(true)}>提交</Button>
            </CellGroup>

            <Text style={TestStyles.TitleText}>校验规则</Text>
            <CellGroup inset>
              <Form
                ref={(f) => { this.formRef2 = f;}}
                fieldProps={{
                  labelFlex: 1,
                }}
                rules={{
                  pattern: { required: true, pattern: /\d/, message: '请输入数字' },
                  validator: { required: true, validator: (rule, value) => {
                    if (value !== '1') {
                      return new Error('请输入1');
                    }
                  } },
                  async: { required: true, validator: (rule, value, callback) => {
                      setTimeout(() => {
                        callback(value === '1' ? undefined : '请输入1');
                      }, 1000);
                    },
                  },
                }}
                validateTrigger="onBlur"
                onSubmit={(values) => {
                  Dialog.alert({
                    title: '表单数据',
                    content: JSON.stringify(values),
                  });
                }}
              >
                <Field name="pattern" label="文本" placeholder="正则校验(输入数字)" />
                <Field name="validator" label="文本" placeholder="自定义校验(输入1正确，其他错误)" />
                <Field name="async" label="文本" placeholder="异步函数校验(输入1正确，其他错误)" />
              </Form>
              <Button type="primary" radius={50} onPress={() => this.formRef2?.submit(true)}>提交</Button>
            </CellGroup>

            <Text style={TestStyles.TitleText}>表单类型</Text>
            <CellGroup inset>
              <Form
                style={{ padding: 10 }}
                ref={(f) => { this.formRef3 = f;}}
                fieldProps={{
                  labelFlex: 2,
                }}
                intitalValue={{
                  text: '',
                  switch: false,
                  check: false,
                  checkgroup: ['a'],
                  radio: 'a',
                  stepper: 1,
                  rate: 3,
                }}
                onSubmit={(values) => {
                  Dialog.alert({
                    title: '表单数据',
                    content: JSON.stringify(values),
                  });
                }}
              >
                <Field name="text" label="文本" placeholder="正则校验(输入数字)" />
                <Field name="switch" label="开关" renderInput={() => <Switch />} />
                <Field name="check" label="复选框" renderInput={() => <CheckBox shape="square" />} />
                <Field name="checkgroup" label="复选框组" center renderInput={() =>
                  <CheckBoxGroup>
                    <CheckBox name="a" shape="square">复选框1</CheckBox>
                    <CheckBox name="b" shape="square">复选框2</CheckBox>
                  </CheckBoxGroup>}
                />
                <Field name="radio" label="单选框" center renderInput={() =>
                  <RadioGroup>
                    <Radio name="a">单选框1</Radio>
                    <Radio name="b">单选框1</Radio>
                  </RadioGroup>}
                />
                <Field name="stepper" label="步进器" renderInput={() => <Stepper />} />
                <Field name="rate" label="评分" renderInput={() => <Rate />} />
              </Form>
              <Button type="primary" radius={50} onPress={() => this.formRef3?.submit(true)}>提交</Button>
            </CellGroup>
          </ColumnView>
          <XBarSpace />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

