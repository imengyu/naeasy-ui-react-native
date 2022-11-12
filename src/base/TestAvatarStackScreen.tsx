import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, Text } from 'react-native';
import { ColumnView, CellGroup, RowView, AvatarStack } from '../../lib/src/index';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestAvatarStack'>;

export class TestAvatarStackScreen extends React.PureComponent<Props> {

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center style={{ padding: 10 }}>
          <CellGroup title="头像组">
            <Text>通过 AvatarStack 组件显示一组头像。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <AvatarStack urls={[
                'https://imengyu.top/assets/images/test/2.jpg',
                'https://imengyu.top/assets/images/test/3.jpg',
                'https://imengyu.top/assets/images/test/4.jpg',
                'https://imengyu.top/assets/images/test/5.jpg',
              ]} round />
            </RowView>

            <Text>头像组超出后显示数字。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <AvatarStack urls={[
                'https://imengyu.top/assets/images/test/2.jpg',
                'https://imengyu.top/assets/images/test/3.jpg',
                'https://imengyu.top/assets/images/test/4.jpg',
                'https://imengyu.top/assets/images/test/5.jpg',
                'https://imengyu.top/assets/images/test/2.jpg',
                'https://imengyu.top/assets/images/test/3.jpg',
                'https://imengyu.top/assets/images/test/4.jpg',
                'https://imengyu.top/assets/images/test/5.jpg',
              ]} round maxCount={6} />
            </RowView>

            <Text>设置头像之间的间距。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <AvatarStack imageMargin={10} urls={[
                'https://imengyu.top/assets/images/test/2.jpg',
                'https://imengyu.top/assets/images/test/3.jpg',
                'https://imengyu.top/assets/images/test/4.jpg',
                'https://imengyu.top/assets/images/test/5.jpg',
              ]} round />
            </RowView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

