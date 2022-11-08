import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Color, CellGroup, DynamicThemeStyleSheet, DynamicColor } from 'imengyu-ui-lib';
import { ScrollView, Text } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { ColumnView, WingBlank } from 'imengyu-ui-lib';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestWingBlank'>;

const styles = DynamicThemeStyleSheet.create({
  title: {
    backgroundColor: DynamicColor(Color.warning),
    color: DynamicColor(Color.white),
    padding: 5,
    marginVertical: 15,
  },
  text: {
    color: DynamicColor(Color.text),
    backgroundColor: DynamicColor(Color.lightGrey),
  },
});

export class TestWingBlankScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center>
          <CellGroup title="两翼留白">
            <Text style={TestStyles.TitleText}>通过 WingBlank 组件两翼留白, 支持 lg/md/sm 或者是数字宽度 。</Text>
            <Text style={styles.title}>WingBlank lg</Text>
            <WingBlank size="lg">
              <Text style={styles.text}>In turpis leo, placerat eget metus a, mattis elementum diam. Suspendisse auctor ipsum sed mauris aliquet semper.</Text>
            </WingBlank>
            <Text style={styles.title}>WingBlank md</Text>
            <WingBlank size="md">
              <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit iaculis velit, vitae euismod urna facilisis et. Ut orci justo, euismod at orci in, gravida rhoncus ligula. Mauris at turpis porta, viverra mi quis, egestas felis. Sed metus risus, blandit id tincidunt sollicitudin, maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. Morbi non placerat nulla, nec finibus urna. Sed vitae ullamcorper erat, et finibus massa. Ut consequat purus sit amet lacus lacinia, quis convallis nunc interdum. Phasellus pellentesque enim ante, ut tristique quam commodo eu. Curabitur sit amet facilisis neque, eget iaculis mauris. Proin dapibus lectus eu sem vestibulum tristique.</Text>
            </WingBlank>
            <Text style={styles.title}>WingBlank sm</Text>
            <WingBlank size="sm">
              <Text style={styles.text}>Maecenas pharetra vel sem vel ultrices. Nulla consequat, diam ac tristique dictum, massa orci convallis libero, vitae volutpat nulla massa quis arcu. Proin tempor, nibh at blandit porttitor, metus massa faucibus mi, nec volutpat metus nunc quis velit. Pellentesque commodo augue sem, id lobortis erat mollis sed. Aliquam vitae sapien id neque pretium faucibus eu et augue. Nullam semper ornare felis sit amet hendrerit. Sed sit amet ligula in erat maximus dapibus at nec urna. In hac habitasse platea dictumst. Vivamus velit orci, auctor quis venenatis eu, aliquet eu sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius massa libero, eu viverra orci commodo in. In turpis leo, placerat eget metus a, mattis elementum diam. Suspendisse auctor ipsum sed mauris aliquet semper.</Text>
            </WingBlank>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

