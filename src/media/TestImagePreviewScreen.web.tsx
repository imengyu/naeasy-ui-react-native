import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, Text } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestImagePreview'>;
interface State {
  showTag: boolean
}

export class TestImagePreviewScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    showTag: true,
  };

  render() {
    return (
      <ScrollView>
        <ColumnView>
          <TestPageHeader
            title="ImagePreview 图片预览"
            desc="图片大图预览组件，可以预览单张或者多张图片。"
            navigation={this.props.navigation}
          />
          <Text>此组件不支持 Web</Text>
        </ColumnView>
      </ScrollView>
    );
  }
}

