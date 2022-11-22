import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Toast, Cell, CellGroup, ColumnView, ActionSheet } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { ImagePreview } from '../../lib/src/components/media';
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

