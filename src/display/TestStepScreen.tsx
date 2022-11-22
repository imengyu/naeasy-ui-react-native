import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, RowView, Color } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Step, StepItem } from '../../lib/src/components/display';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestStep'>;

export function TestStepScreen(props: Props) {

  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ activeIndex2, setActiveIndex2 ] = useState(1);
  const [ activeIndex3, setActiveIndex3 ] = useState(0);

  return (
    <ScrollView>
      <TestPageHeader
        title="Step 步骤条"
        desc="用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。"
        navigation={props.navigation}
      />
      <TestHeader>基础用法</TestHeader>
      <TestGroup noHorizontalPadding>
        <Step activeIndex={activeIndex} onActiveIndexChange={setActiveIndex}>
          <StepItem text="步骤1" />
          <StepItem text="步骤2" />
          <StepItem text="步骤3" />
          <StepItem text="步骤4" />
          <StepItem text="步骤5" />
          <StepItem text="步骤5" />
          <StepItem text="步骤6" />
          <StepItem text="步骤7" />
          <StepItem text="步骤8" />
        </Step>
        <RowView margin={20}>
          <Button onPress={() => setActiveIndex((p) => Math.max(0, p - 1))}>上一步</Button>
          <Button type="primary" onPress={() => setActiveIndex((p) => Math.min(9, p + 1))}>下一步</Button>
        </RowView>
      </TestGroup>
      <TestHeader desc="可以通过 activeIcon 和 activeColor 等属性设置各个状态下的图标和颜色。">自定义颜色与图标</TestHeader>
      <TestGroup noHorizontalPadding>
        <Step
          activeColor={Color.danger}
          activeIndex={activeIndex3}
          onActiveIndexChange={setActiveIndex3}
        >
          <StepItem text="步骤1" />
          <StepItem text="步骤2" activeIcon="prompt" />
          <StepItem text="步骤3" inactiveIcon="history" />
          <StepItem text="步骤4" activeIcon="history" finishIcon="film" />
        </Step>
        <RowView margin={20}>
          <Button onPress={() => setActiveIndex3((p) => Math.max(0, p - 1))}>上一步</Button>
          <Button type="primary" onPress={() => setActiveIndex3((p) => Math.min(5, p + 1))}>下一步</Button>
        </RowView>
      </TestGroup>
      <TestHeader desc="可以通过设置 direction 属性来改变步骤条的显示方向。">竖向步骤</TestHeader>
      <TestGroup>
        <Step direction="vertical" activeIndex={activeIndex2} onActiveIndexChange={setActiveIndex2}>
          <StepItem text="物流状态1 2016-07-12 12:40" />
          <StepItem text="物流状态2" extra="2016-07-12 10:40" />
          <StepItem text="物流状态3" extra="2016-07-10 16:00" />
          <StepItem text="快件已发货" />
        </Step>
      </TestGroup>
    </ScrollView>
  );
}

