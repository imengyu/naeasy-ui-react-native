import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { ColumnView } from '@imengyu-ui-lib-debug';
import { SectionList, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestIndexBar', 'RootStack'>;
interface State {
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#eaeaea',
    fontSize: 12,
    color: '#777',
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
});

export class TestIndexBarScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    list: [],
  };

  componentDidMount() {
  }

  render(): React.ReactNode {
    return (
      <ColumnView>
      </ColumnView>
    );
  }
}

