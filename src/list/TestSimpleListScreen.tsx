import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { ColumnView, ScrollTabView, SimpleList, Text, Color } from '@imengyu-ui-lib-debug';

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
      <ScrollTabView tabBarProps={{ tabs: [ '基础列表', '自定义渲染', '选择模式', '多选模式' ] }}>
        <SimpleList<string>
          data={data}
        />
        <SimpleList<string>
          data={data}
          renderItemContent={(k, i) => (<ColumnView>
            <Text>Index: {i}</Text>
            <Text color={i % 2 === 0 ? Color.danger : Color.success}>{k}</Text>
          </ColumnView>)}
        />
        <SimpleList<string>
          data={data}
          mode="single-check"
        />
        <SimpleList<string>
          data={data}
          mode="mulit-check"
          onSelectedItemChanged={(items) => console.log('mulit selected: ', items)}
        />
      </ScrollTabView>
    );
  }
}

