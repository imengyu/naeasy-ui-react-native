import React, { useRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';
import { ColumnView, CountTo, CountToInstance, Button, RowView, WhiteSpace, Text } from '../lib';

type Props = StackScreenProps<RootStackParamList, 'TestCountTo'>;

export function TestCountToScreen(_props: Props) {

  const ref = useRef<CountToInstance>(null);

  return (
    <ScrollView>
      <ColumnView padding={10}>

        <Text style={TestStyles.TitleText}>基础用法</Text>

        <ColumnView padding={10}>
          <CountTo endValue={9999} />
        </ColumnView>

        <Text style={TestStyles.TitleText}>设置起始值与时间</Text>
        <ColumnView padding={10}>
          <CountTo startValue={0} endValue={9999} duration={4000} />
        </ColumnView>

        <Text style={TestStyles.TitleText}>添加千分符</Text>
        <ColumnView padding={10}>
          <CountTo endValue={9999} thousand />
        </ColumnView>

        <Text style={TestStyles.TitleText}>手动控制</Text>
        <ColumnView padding={10}>
          <CountTo ref={ref} endValue={9999} thousand />
          <WhiteSpace />
          <RowView>
            <Button type="primary" onPress={() => ref.current?.restart()} >重新开始</Button>
          </RowView>
        </ColumnView>

      </ColumnView>
    </ScrollView>
  );
}

