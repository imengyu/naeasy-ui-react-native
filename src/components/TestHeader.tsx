import React from 'react';
import { Text, DynamicThemeStyleSheet, DynamicColor, Color, ThemeRender, ColumnView, useDidMountEffect } from '../lib';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

const styles = DynamicThemeStyleSheet.create({
  titleLine: {
    width: 30,
    height: 3,
    backgroundColor: DynamicColor(Color.primary),
    borderRadius: 10,
    marginTop: 7,
  },
  titleLine2: {
    position: 'absolute',
    left: 50,
    right: 20,
    bottom: 1,
    height: 1,
    backgroundColor: DynamicColor(Color.border),
    borderRadius: 10,
    marginTop: 7,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    position: 'relative',
  },
  desc: {
    paddingHorizontal: 20,
  },
});

export function TestHeader(props: {
  children: string,
  desc?: string,
}) {
  return (
    <ThemeRender>{
      () => <ColumnView>
      <ColumnView justify="center" style={styles.header}>
        <Text size={16} color={Color.black}>{props.children}</Text>
        <View style={styles.titleLine} />
        <View style={styles.titleLine2} />
      </ColumnView>
      { props.desc ? <Text size={14} color={Color.textSecond} style={styles.desc}>{props.desc}</Text> : <></> }
    </ColumnView>}</ThemeRender>
  );
}

export function TestPageHeader(props: {
  title: string,
  desc: string,
  navigation: StackNavigationProp<RootStackParamList>,
}) {
  useDidMountEffect(() => {
    props.navigation.setOptions({
      title: props.title,
    });
  });

  return (
    <ColumnView style={styles.header}>
      <Text size={20} weight="bold" color={Color.primary}>{props.title}</Text>
      <Text size={14} color={Color.textSecond}>{props.desc}</Text>
    </ColumnView>
  );
}

