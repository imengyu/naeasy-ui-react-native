import React, { useRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { Text } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';
import { ColumnView, CountTo, CountToInstance, Button, RowView, WhiteSpace } from 'imengyu-ui-lib';

type Props = StackScreenProps<RootStackParamList, 'TestCountTo'>;

export function TestCountToScreen(_props: Props) {

  const ref = useRef<CountToInstance>(null);

  return (
    <ScrollView>
      <ColumnView padding={10}>
        

        <Text style={TestStyles.TitleText}>基础用法</Text>
        <CountTo endValue={9999} />

        <Text style={TestStyles.TitleText}>设置起始值与时间</Text>
        <CountTo startValue={0} endValue={9999} duration={4000} />

        <Text style={TestStyles.TitleText}>添加千分符</Text>
        <CountTo endValue={9999} thousand />

        <Text style={TestStyles.TitleText}>手动控制</Text>
        <CountTo ref={ref} endValue={9999} thousand />
        <WhiteSpace />
        <RowView>
          <Button type="primary" onPress={() => ref.current?.restart()} >重新开始</Button>
        </RowView>
      </ColumnView>
    </ScrollView>
  );
}

