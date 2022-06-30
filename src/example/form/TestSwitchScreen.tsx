import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from '../../components/layout/ColumnView';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { Switch } from '../../components/form/Switch';
import { Switch as NativeSwitch } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { Color } from '../../styles/ColorStyles';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestSwitch'>;

export function TestSwitchScreen(_props: Props) {

  const [ check1, setCheck1 ] = useState(false);

  return (
    <ScrollView>
      <ColumnView padding={10}>

        <Text style={TestStyles.TitleText}>基础用法</Text>
        <Switch value={check1} onValueChange={setCheck1} />

        <Text style={TestStyles.TitleText}>禁用状态</Text>
        <Switch value={check1} onValueChange={setCheck1} disabled />

        <Text style={TestStyles.TitleText}>加载状态</Text>
        <Switch value={check1} onValueChange={setCheck1} loading />

        <Text style={TestStyles.TitleText}>自定义大小</Text>
        <Switch value={check1} onValueChange={setCheck1} size={40} />

        <Text style={TestStyles.TitleText}>自定义颜色</Text>
        <Switch value={check1} onValueChange={setCheck1} color={Color.danger} />

        <Text style={TestStyles.TitleText}>原生 Switch</Text>
        <NativeSwitch value={check1} onValueChange={setCheck1} />

      </ColumnView>
    </ScrollView>
  );
}

