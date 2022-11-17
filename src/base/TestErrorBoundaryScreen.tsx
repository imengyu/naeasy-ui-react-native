import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ColumnView, ErrorBoundary, Button} from '../lib';
import {RootStackParamList} from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestErrorBoundary'>;

export function TestErrorBoundaryScreen(_props: Props) {
  const [a, setA] = useState(0);

  function renderErrorTest() {
    setA((prev) => {
      if (Math.random() > 0.2) {
        throw new Error('i crashed！！！');
      }
      return prev + 1;
    });
  }

  return (
    <ErrorBoundary
      renderChildren={() => (
        <ColumnView center padding={20}>
          <Button onPress={renderErrorTest}>{'点击尝试触发错误' + a}</Button>
        </ColumnView>
      )}
    />
  );
}
