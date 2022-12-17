import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { ScrollView } from 'react-native';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestDropdownMenu'>;

export function TestDropdownMenuScreen(props: Props) {



  return (
    <ScrollView>
      <TestPageHeader
        title="DropdownMenu 下拉菜单"
        desc="向下弹出的菜单列表。"
        navigation={props.navigation}
      />
    </ScrollView>
  );
}

