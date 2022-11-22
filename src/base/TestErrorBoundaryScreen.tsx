import React, {useState} from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, Button } from '../lib';
import { RootStackParamList } from '../navigation';
import { ErrorBoundary } from '../../lib/src/components/error';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestErrorBoundary'>;

export function TestErrorBoundaryScreen(props: Props) {
  const [a, setA] = useState(0);

  function renderErrorTest() {
    setA(prev => {
      if (Math.random() > 0.2) {
        throw new Error('i crashed！！！');
      }
      return prev + 1;
    });
  }

  return (
    <ColumnView>
      <TestPageHeader
        title="ErrorBoundary 错误捕获"
        desc="用于捕获渲染时触发的错误，防止整个应用崩溃。"
        navigation={props.navigation}
      />
      <ErrorBoundary
        renderChildren={() => (
          <ColumnView center padding={20}>
            <Button onPress={renderErrorTest}>{'点击尝试触发错误' + a}</Button>
          </ColumnView>
        )}
      />
    </ColumnView>
  );
}
