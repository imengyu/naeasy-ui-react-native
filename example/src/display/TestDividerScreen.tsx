import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, CellGroup, RowView, Divider, Color, WhiteSpace } from 'imengyu-ui-lib';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestDivider'>;
interface State {
  showTag: boolean
}

export class TestDividerScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    showTag: true,
  };

  render() {
    return (
      <ScrollView>
        <ColumnView center padding={10}>
          <CellGroup title="基础用法" inset>
            <Text style={TestStyles.TitleText}>通过 Divider 组件显示分割线。</Text>
            <ColumnView padding={10}>
              <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. </Text>
              <Divider />

              <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. </Text>

              <Divider text="我是分割线" backgroundColor="#fff" />
              <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. </Text>

              <Divider text="我是自定义高度的分割线" size={50} backgroundColor="#fff" />
              <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. Morbi non placerat nulla, nec finibus urna. Sed vitae ullamcorper erat, et finibus massa. Ut consequat purus sit amet lacus lacinia, quis convallis nunc interdum. Phasellus pellentesque enim ante, ut tristique quam commodo eu. Curabitur sit amet facilisis neque, eget iaculis mauris. Proin dapibus lectus eu sem vestibulum tristique.</Text>

              <Divider />
              <Text>上面是不带文字的分割线。</Text>

              <WhiteSpace />
              <RowView>
                <Text>垂直的分割线(红色)</Text>
                <Divider type="vertical" color={Color.danger} />
                <Text>垂直的分割线</Text>
                <Divider type="vertical" />
                <Text>垂直的分割线</Text>
              </RowView>
            </ColumnView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

