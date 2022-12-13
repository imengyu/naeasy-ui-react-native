import React from 'react';
import { View, StyleSheet, ViewProps, Platform } from 'react-native';
import { AlertNative, Color, ThemeSelector } from '../lib';

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
  white?: boolean,
}

export function TestGroup(props: TestGroupProps) {
  return <View {...props} style={[
    props.noHorizontalPadding ? styles.groupFull : styles.group,
    { backgroundColor: props.white ? themeContext.resolveThemeColor(Color.white) : undefined },
  ]} />;
}

export function showTestMessage(str: string) {
  if (Platform.OS === 'web') {
    (window as any).alert(str);
  } else {
    AlertNative.alert('提示', str);
  }
}
