import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, Result } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestImagePicker'>;
interface State {
  showTag: boolean
}

export class TestImagePickerScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    showTag: true,
  };

  render() {
    return (
      <ScrollView>
        <ColumnView>
          <TestPageHeader
            title="ImagePicker 图片选择器"
            desc="用于选择相册图片。Android 基于 https://github.com/LuckSiege/PictureSelector/ 封装， iOS 基于 https://github.com/SilenceLove/HXPHPicker 封装。"
            navigation={this.props.navigation}
          />
          <Result status="error" description="此组件不支持 Web, 请在手机上预览" />
        </ColumnView>
      </ScrollView>
    );
  }
}

