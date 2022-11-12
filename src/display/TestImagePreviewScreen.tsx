import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Cell, CellGroup, ImagePreview, ColumnView } from '../../lib/src/index';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';

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
        <ColumnView center>
          <CellGroup title="基础用法" inset>
            <Cell title="基础用法" showArrow onPress={() => {
              ImagePreview.show({
                imageUrls: [
                  'https://imengyu.top/assets/images/test/1.jpg',
                  'https://imengyu.top/assets/images/test/2.jpg',
                  'https://imengyu.top/assets/images/test/3.jpg',
                  'https://imengyu.top/assets/images/test/4.jpg',
                  'https://imengyu.top/assets/images/test/5.jpg',
                ],
              });
            }} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

