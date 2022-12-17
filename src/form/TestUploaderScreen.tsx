import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestUploader'>;

export function TestUploaderScreen(props: Props) {

  return (
    <ScrollView>
      <TestPageHeader
        title="Uploader 文件/图片上传"
        desc="用于让用户上传文件或者图片，支持多选"
        navigation={props.navigation}
      />
      <TestHeader>基础用法</TestHeader>
      <TestGroup>
        
      </TestGroup>
    </ScrollView>
  );
}

