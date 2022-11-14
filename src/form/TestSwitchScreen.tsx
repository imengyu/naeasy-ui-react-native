import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, Switch, Color, Text } from '../lib';
import { ScrollView } from 'react-native';
import { Switch as NativeSwitch } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestSwitch'>;

export function TestSwitchScreen(_props: Props) {

  const [ check1, setCheck1 ] = useState(false);

  return (
    <ScrollView>
      <ColumnView padding={10}>

        <Text style={TestStyles.TitleText}>基础用法</Text>
        <ColumnView padding={10}>
          <Switch value={check1} onValueChange={setCheck1} />
        </ColumnView>

        <Text style={TestStyles.TitleText}>禁用状态</Text>
        <ColumnView padding={10}>
          <Switch value={check1} onValueChange={setCheck1} disabled />
        </ColumnView>

        <Text style={TestStyles.TitleText}>加载状态</Text>
        <ColumnView padding={10}>
          <Switch value={check1} onValueChange={setCheck1} loading />
        </ColumnView>

        <Text style={TestStyles.TitleText}>自定义大小</Text>
        <ColumnView padding={10}>
          <Switch value={check1} onValueChange={setCheck1} size={40} />
        </ColumnView>

        <Text style={TestStyles.TitleText}>自定义颜色</Text>
        <ColumnView padding={10}>
          <Switch value={check1} onValueChange={setCheck1} color={Color.danger} />
        </ColumnView>

        <Text style={TestStyles.TitleText}>原生 Switch</Text>
        <ColumnView padding={10}>
          <NativeSwitch value={check1} onValueChange={setCheck1} />
        </ColumnView>

      </ColumnView>
    </ScrollView>
  );
}

