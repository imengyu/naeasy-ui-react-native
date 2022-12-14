import React, { useRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Button, XBarSpace, ColumnView, WhiteSpace, DynamicColor, Color, useThemeStyles } from '../lib';
import {
  Form, Field, Switch, CheckBox, CheckBoxGroup,
  Rate, Radio, RadioGroup, Stepper, Slider,
} from '../../lib/src/components/form';
import { Dialog } from '../../lib/src/components/dialog';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestForm', 'RootStack'>;

const styles = StyleSheet.create({
  StyleWhiteItemField: {
    backgroundColor: DynamicColor(Color.white),
    borderBottomColor: DynamicColor(Color.background),
    borderBottomWidth: 1,
  },
});

export function TestFormScreen(props: Props) {

  const formRef1 = useRef<Form>(null);
  const formRef2 = useRef<Form>(null);
  const formRef3 = useRef<Form>(null);

  const themeStyles = useThemeStyles(styles);

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100}>
      <ScrollView>
        <TestPageHeader
          title="Form 表单"
          desc="用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型，需要与 Field 输入框 组件搭配使用。"
          navigation={props.navigation}
        />
        <TestHeader>基础用法</TestHeader>
        <TestGroup noHorizontalPadding>
          <Form
            ref={formRef1}
            rules={{
              userName: { required: true, message: '请输入用户名' },
              password: [
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码长度必须大于等于6位' },
              ],
              passwordRepeat: [
                { required: true, message: '请再输入一次密码' },
                {
                  //表单自定义校验
                  validator(rule, value, callback, source) {
                    if (value !== source.password) {
                      callback('两次输入密码不一致，请检查');
                      return;
                    }
                    callback();
                  },
                },
              ],
            }}
            fieldProps={{
              labelFlex: 1,
              inputFlex: 4,
              fieldStyle: themeStyles.StyleWhiteItemField,
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
            <Field name="passwordRepeat" label="密码" placeholder="再输入一次"  type="password" />
          </Form>
          <ColumnView padding={20}>
            <Button type="primary" onPress={() => formRef1.current?.submit(true)}>提交</Button>
            <WhiteSpace size="small" />
            <Button type="default" onPress={() => formRef1.current?.reset()}>重置</Button>
          </ColumnView>
        </TestGroup>
        <TestHeader desc="表单使用 async-validator 进行表单校验，与 Web 中的校验方式一致">校验规则</TestHeader>
        <TestGroup noHorizontalPadding>
          <Form
            ref={formRef2}
            fieldProps={{
              labelFlex: 1,
              fieldStyle: themeStyles.StyleWhiteItemField,
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
                  }, 200);
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
          <ColumnView padding={20}>
            <Button type="primary" onPress={() => formRef2.current?.submit(true)}>提交</Button>
          </ColumnView>
        </TestGroup>
        <TestHeader>表单类型</TestHeader>
        <TestGroup noHorizontalPadding>
          <Form
            ref={formRef3}
            fieldProps={{
              labelFlex: 2,
              fieldStyle: themeStyles.StyleWhiteItemField,
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
            <Field name="text" label="文本" placeholder="文本框" />
            <Field name="switch" label="开关" renderInput={() => <Switch />} />
            <Field name="check" label="复选框" center renderInput={() => <CheckBox shape="square" />} />
            <Field name="checkgroup" label="复选框组" center renderInput={() =>
              <CheckBoxGroup>
                <CheckBox name="a">复选框1</CheckBox>
                <CheckBox name="b">复选框2</CheckBox>
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
            <Field name="sider" label="滑块" renderInput={() => <Slider />} />
          </Form>
          <ColumnView padding={20}>
            <Button type="primary" onPress={() => formRef3.current?.submit(true)}>提交</Button>
          </ColumnView>
        </TestGroup>

        <WhiteSpace size={50} />
        <XBarSpace />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

