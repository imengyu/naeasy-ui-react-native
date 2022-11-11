import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup, Step, ColumnView, StepItem, Button, RowView, P } from '@imengyu-ui-lib-debug';
import { Text, ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestStep'>;

export function TestStepScreen(_props: Props) {

  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ activeIndex2, setActiveIndex2 ] = useState(2);

  return (
    <ScrollView>
      <ColumnView center>
        <CellGroup title="基础用法">
          <Text style={{ padding: 10 }}>用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。</Text>

          <RowView margin={[20, 10]}>
            <Button onPress={() => setActiveIndex((p) => Math.max(0, p - 1))}>上一步</Button>
            <Button type="primary" onPress={() => setActiveIndex((p) => Math.min(8, p + 1))}>下一步</Button>
          </RowView>

          <Step activeIndex={activeIndex} onActiveIndexChange={setActiveIndex}>
            <StepItem text="步骤1" />
            <StepItem text="步骤2" inactiveIcon="prompt" />
            <StepItem text="步骤3" inactiveIcon="history" />
            <StepItem text="步骤4" inactiveIcon="film" />
            <StepItem text="步骤5" />
            <StepItem text="步骤5" />
            <StepItem text="步骤6" />
            <StepItem text="步骤7" />
            <StepItem text="步骤8" />
          </Step>
        </CellGroup>

        <CellGroup title="竖向步骤">
          <Text style={{ padding: 10 }}>可以通过设置 direction 属性来改变步骤条的显示方向。</Text>

          <ColumnView padding={10}>
            <Step direction="vertical" activeIndex={activeIndex2} onActiveIndexChange={setActiveIndex2}>
              <StepItem text="物流状态1 2016-07-12 12:40" />
              <StepItem text={<ColumnView>
                <Text>物流状态2</Text>
                <Text>2016-07-12 10:40</Text>
              </ColumnView>} />
              <StepItem text={<ColumnView>
                <Text>物流状态3</Text>
                <Text>2016-07-10 16:00</Text>
              </ColumnView>} />
              <StepItem text="快件已发货" />
            </Step>
          </ColumnView>
        </CellGroup>
      </ColumnView>
    </ScrollView>
  );
}

