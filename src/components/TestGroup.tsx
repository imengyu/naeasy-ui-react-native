import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { AlertNative } from '../lib';

const styles = StyleSheet.create({
  group: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  groupFull: {
    paddingVertical: 10,
  },
});

interface TestGroupProps extends ViewProps {
  noHorizontalPadding?: boolean,
}

export function TestGroup(props: TestGroupProps) {
  return <View {...props} style={props.noHorizontalPadding ? styles.groupFull : styles.group} />;
}

export function showTestMessage(str: string) {
  AlertNative.alert('提示', str);
}
