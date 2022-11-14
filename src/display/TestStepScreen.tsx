import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, CellGroup, Step, ColumnView, StepItem, Button, RowView, Color } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestStep'>;

export function TestStepScreen(_props: Props) {

  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ activeIndex2, setActiveIndex2 ] = useState(1);
  const [ activeIndex3, setActiveIndex3 ] = useState(0);

  return (
    <ScrollView>
      <ColumnView center>
        <CellGroup title="基础用法">
          <Text style={{ padding: 10 }}>用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。</Text>

          <RowView margin={[20, 10]}>
            <Button onPress={() => setActiveIndex((p) => Math.max(0, p - 1))}>上一步</Button>
            <Button type="primary" onPress={() => setActiveIndex((p) => Math.min(9, p + 1))}>下一步</Button>
          </RowView>

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
        </CellGroup>

        <CellGroup title="自定义颜色与图标">
          <Text style={{ padding: 10 }}>可以通过 activeIcon 和 activeColor 等属性设置各个状态下的图标和颜色。</Text>

          <RowView margin={[20, 10]}>
            <Button onPress={() => setActiveIndex3((p) => Math.max(0, p - 1))}>上一步</Button>
            <Button type="primary" onPress={() => setActiveIndex3((p) => Math.min(5, p + 1))}>下一步</Button>
          </RowView>

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
        </CellGroup>

        <CellGroup title="竖向步骤">
          <Text style={{ padding: 10 }}>可以通过设置 direction 属性来改变步骤条的显示方向。</Text>

          <ColumnView padding={10}>
            <Step direction="vertical" activeIndex={activeIndex2} onActiveIndexChange={setActiveIndex2}>
              <StepItem text="物流状态1 2016-07-12 12:40" />
              <StepItem text="物流状态2" extra="2016-07-12 10:40" />
              <StepItem text="物流状态3" extra="2016-07-10 16:00" />
              <StepItem text="快件已发货" />
            </Step>
          </ColumnView>
        </CellGroup>
      </ColumnView>
    </ScrollView>
  );
}

