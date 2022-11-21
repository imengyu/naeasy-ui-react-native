import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, CellGroup, ColumnView, Button, RowView, Color } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestSkeleton'>;

export function TestSkeletonScreen(_props: Props) {

  return (
    <ScrollView>
      
    </ScrollView>
  );
}

