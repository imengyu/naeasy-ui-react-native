import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { ColumnView, Text, Color, WhiteSpace } from '../lib';
import { IndexBar, IndexedList } from '../../lib/src/components/list';
import { TabsPage, TabsPageItem } from '../../lib/src/components/tab';

type Props = StackScreenProps<RootStackParamList, 'TestIndexedList'>;

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
  'David Lopez',
  'Nancy Harris',
  'Brenda Perez',
  'Angela Harris',
  'David Hall',
  'Deborah Martinez',
  'James Taylor',
  'Jeffrey Miller',
  'Patricia Martinez',
  'Jose Davis',
  'Ruth Gonzalez',
  'Shirley Gonzalez',
  'Carol Miller',
  'Deborah Hall',
  'Deborah White',
  'Matthew Rodriguez',
  'Jennifer Davis',
  'George Robinson',
  'Jose Brown',
  'Sarah Walker',
];
const dataIndex = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
];

export class TestIndexedListScreen extends React.PureComponent<Props> {

  render(): React.ReactNode {
    return (
      <TabsPage>
        <TabsPageItem text="基础列表">
          <IndexedList<string>
            data={data}
            groupDataBy={(item) => item.charAt(0)}
            sortGroup={arr => arr.sort()}
            onItemPress={(item) => console.log('onItemPress', item)}
          />
        </TabsPageItem>
        <TabsPageItem text="自定义渲染">
          <IndexedList<string>
            data={data}
            groupDataBy={(item) => item.charAt(0)}
            onItemPress={(item) => console.log('onItemPress', item)}
            sortGroup={arr => arr.sort()}
            groupHeight={20}
            itemHeight={36}
            renderItem={(k, i, header) => (header ? <Text style={{ height: 20, backgroundColor: 'yellow' }}>Header {k}</Text> : <ColumnView height={36}>
              <Text>Index: {i}</Text>
              <Text color={i % 2 === 0 ? Color.danger : Color.success}>{k}</Text>
            </ColumnView>)}
          />
        </TabsPageItem>
        <TabsPageItem text="单独使用 IndexedBar">
          <TestIndexedBar />
        </TabsPageItem>
      </TabsPage>
    );
  }
}

export function TestIndexedBar() {
  const [ index, setIndex ] = useState(0);

  return (
    <ColumnView padding={10} flex={1}>
      <Text>IndexBar 是 IndexedList 的侧边滑动组件，你也可以单独进行使用，将他用于你自己的 IndexedList 组件中。</Text>
      <WhiteSpace size="md" />
      <Text size={20}>当前选中索引 {index}</Text>
      <IndexBar
        data={dataIndex}
        onActiveIndexChange={setIndex}
      />
    </ColumnView>
  );
}

