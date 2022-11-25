import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text } from 'react-native';
import { ColumnView, Button } from '../lib';
import { RootStackParamList } from '../navigation';
import { ErrorBoundary } from '../../lib/src/components/error';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestErrorBoundary'>;

export function TestErrorBoundaryScreen(props: Props) {
  const [show, setShow] = useState(false);


  return (
    <ColumnView>
      <TestPageHeader
        title="ErrorBoundary 错误捕获"
        desc="用于捕获渲染时触发的错误，防止整个应用崩溃。"
        navigation={props.navigation}
      />
      <ErrorBoundary>
        <ColumnView center padding={20}>
          { show ? <TestErrorComponent /> : <></> }
        </ColumnView>
        <ColumnView center padding={20}>
          <Button onPress={() => setShow(p => !p)}>点击尝试触发错误</Button>
        </ColumnView>
      </ErrorBoundary>
    </ColumnView>
  );
}

export function TestErrorComponent(_props: {}) {
  if (Math.random() > 0.2) {
    throw new Error('i crashed');
  }
  return <Text>渲染正常</Text>;
}
