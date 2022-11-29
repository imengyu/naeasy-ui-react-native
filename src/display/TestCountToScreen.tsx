import React, { useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Button, RowView, WhiteSpace } from '../lib';
import { CountTo, CountToInstance } from '../../lib/src/components/countdown';
import { TestGroup } from '../components/TestGroup';
import { TestHeader, TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestCountTo'>;

export function TestCountToScreen(props: Props) {

  const ref = useRef<CountToInstance>(null);
  const [ valueTest, setValueTest ] = useState(999999);

  return (
    <ScrollView>
      <TestPageHeader
        title="CountTo 数字滚动"
        desc="数字变化时切换滚动效果，一般用于金额的变化。"
        navigation={props.navigation}
      />
      <TestHeader>基础用法</TestHeader>
      <TestGroup>
        <CountTo endValue={9999} />
      </TestGroup>
      <TestHeader>设置切换时间</TestHeader>
      <TestGroup>
        <CountTo startValue={0} endValue={9999} duration={8000} />
      </TestGroup>
      <TestHeader>添加千分符</TestHeader>
      <TestGroup>
        <CountTo endValue={9999} thousand />
      </TestGroup>
      <TestHeader desc="手动重新开始动画。">手动控制</TestHeader>
      <TestGroup>
        <CountTo ref={ref} endValue={9999} thousand />
        <WhiteSpace />
        <RowView>
          <Button type="primary" onPress={() => ref.current?.restart()} >重新开始</Button>
        </RowView>
      </TestGroup>
      <TestHeader desc="使用上下滚动数字效果，一般用于金额的变化。">数字滚动</TestHeader>
      <TestGroup>
        <CountTo type="scroller" decimalCount={2} endValue={valueTest} style={{ fontSize: 30 }} />
        <WhiteSpace />
        <RowView>
          <Button type="primary" onPress={() => setValueTest(Math.random() * 999999)} >更新数字</Button>
        </RowView>
      </TestGroup>
      <WhiteSpace size={100} />
    </ScrollView>
  );
}

