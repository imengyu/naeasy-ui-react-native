import React from 'react';
import { Text, DynamicColor, Color, ThemeRender, ColumnView, useDidMountEffect, useThemeStyles } from '../lib';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

const styles = StyleSheet.create({
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
  headerOut: {
    marginTop: 10,
    marginBottom: 10,
  },
  desc: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export function TestHeader(props: {
  children: string,
  desc?: string,
  bar?: boolean,
}) {

  const themeStyles = useThemeStyles(styles);

  return (
    <ThemeRender>{
      () => <ColumnView style={themeStyles.headerOut}>
      <ColumnView justify="center" style={themeStyles.header}>
        <Text size={16} color={Color.black}>{props.children}</Text>
        { props.bar !== false ? <View style={themeStyles.titleLine} /> : <></> }
        { props.bar !== false ?  <View style={themeStyles.titleLine2} /> : <></> }
      </ColumnView>
      { props.desc ? <Text size={14} color={Color.textSecond} style={themeStyles.desc}>{props.desc}</Text> : <></> }
    </ColumnView>}</ThemeRender>
  );
}

export function TestPageHeader(props: {
  title: string,
  desc: string|JSX.Element,
  navigation: StackNavigationProp<RootStackParamList>,
}) {
  const themeStyles = useThemeStyles(styles);

  useDidMountEffect(() => {
    props.navigation.setOptions({
      title: '',//props.title,
    });
  });

  return (
    <ColumnView style={themeStyles.header}>
      <Text size={20} weight="bold" color={Color.primary}>{props.title}</Text>
      { typeof props.desc === 'string' ? <Text size={14} color={Color.textSecond}>{props.desc}</Text> : props.desc }
    </ColumnView>
  );
}

