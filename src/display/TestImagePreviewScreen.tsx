import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Toast, Cell, CellGroup, ImagePreview, ColumnView, ActionSheet } from '../lib';
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
            <Cell title="查看图片" showArrow onPress={() => {
              ImagePreview.show({
                imageUrls: ['https://imengyu.top/assets/images/test/1.jpg'],
              });
            }} />
            <Cell title="多图" showArrow onPress={() => {
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
            <Cell title="设置初始页码" showArrow onPress={() => {
              ImagePreview.show({
                selectIndex: 3,
                imageUrls: [
                  'https://imengyu.top/assets/images/test/1.jpg',
                  'https://imengyu.top/assets/images/test/2.jpg',
                  'https://imengyu.top/assets/images/test/3.jpg',
                  'https://imengyu.top/assets/images/test/4.jpg',
                  'https://imengyu.top/assets/images/test/5.jpg',
                ],
              });
            }} />
            <Cell title="自定义长按操作" showArrow onPress={() => {
              ImagePreview.show({
                onLongPress(index, imageUrl) {
                  ActionSheet.show({
                    showCancel: true,
                    actions: [
                      { name: '保存图片' },
                      { name: '查看原图' },
                    ],
                    onSelect(_, name) {
                      Toast.info(name + ' 第' + index + '张: ' + imageUrl);
                    },
                  });
                },
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

