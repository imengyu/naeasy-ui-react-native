import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { ColumnView, Text, Color, Toast } from '../lib';
import { TabsPage, TabsPageItem } from '../../lib/src/components/tab';
import { SimpleList } from '../../lib/src/components/list';

type Props = StackScreenProps<RootStackParamList, 'TestSimpleList'>;

const data = [
  'Robert Davis',
  'Sandra Allen',
  'Charles Davis',
  'Michael Brown',
  'Joseph Miller',
  'Carol Allen',
  'Deborah Hernandez',
  'Michael Jones',
  'Amy Clark',
  'Daniel Robinson',
  'Brian Clark',
  'David Taylor',
  'Jessica Gonzalez',
  'George Martin',
  'Christopher Robinson',
  'Scott Johnson',
  'Robert Clark',
  'Jennifer Hall',
  'Kenneth Lewis',
  'Margaret Wilson',
];

export class TestSimpleListScreen extends React.PureComponent<Props> {

  render(): React.ReactNode {
    return (
      <TabsPage>
        <TabsPageItem text="基础列表">
          <SimpleList<string>
            data={data}
            onItemPress={(item) => Toast.info('点击了：' + item)}
          />
        </TabsPageItem>
        <TabsPageItem text="自定义渲染">
          <SimpleList<string>
            data={data}
            onItemPress={(item) => Toast.info('点击了：' + item)}
            renderItemContent={(k, i) => (<ColumnView>
              <Text>Index: {i}</Text>
              <Text color={i % 2 === 0 ? Color.danger : Color.success}>{k}</Text>
            </ColumnView>)}
          />
        </TabsPageItem>
        <TabsPageItem text="单选择式">
          <SimpleList<string>
            data={data}
            mode="single-check"
          />
        </TabsPageItem>
        <TabsPageItem text="多选模式">
          <SimpleList<string>
            data={data}
            mode="mulit-check"
            onSelectedItemChanged={(items) => console.log('mulit selected: ', items)}
          />
        </TabsPageItem>
      </TabsPage>
    );
  }
}

