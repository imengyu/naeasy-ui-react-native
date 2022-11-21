import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Color } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Switch } from '../../lib/src/components/form';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestSwitch'>;

export function TestSwitchScreen(props: Props) {

  const [ check1, setCheck1 ] = useState(false);

  return (
    <ScrollView>
      <TestPageHeader
        title="Switch 开关"
        desc="用于在打开和关闭状态之间进行切换。"
        navigation={props.navigation}
      />
      <TestHeader bar={false}>基础用法</TestHeader>
      <TestGroup>
        <Switch value={check1} onValueChange={setCheck1} />
      </TestGroup>
      <TestHeader bar={false}>禁用状态</TestHeader>
      <TestGroup>
        <Switch value={check1} onValueChange={setCheck1} disabled />
      </TestGroup>
      <TestHeader bar={false}>加载状态</TestHeader>
      <TestGroup>
        <Switch value={check1} onValueChange={setCheck1} loading />
      </TestGroup>
      <TestHeader bar={false}>自定义大小</TestHeader>
      <TestGroup>
        <Switch value={check1} onValueChange={setCheck1} size={40} />
      </TestGroup>
      <TestHeader bar={false}>自定义颜色</TestHeader>
      <TestGroup>
        <Switch value={check1} onValueChange={setCheck1} color={Color.danger} />
      </TestGroup>
      <TestHeader bar={false}>原生 Switch</TestHeader>
      <TestGroup>
        <Switch native value={check1} onValueChange={setCheck1} color={Color.danger} />
      </TestGroup>
    </ScrollView>
  );
}

