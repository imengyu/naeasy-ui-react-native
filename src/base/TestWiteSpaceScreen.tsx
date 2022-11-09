import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup } from '@imengyu-ui-lib-debug';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { ColumnView, WhiteSpace } from '@imengyu-ui-lib-debug';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestWhiteSpace'>;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#f00',
  },
  box2: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#ff0',
  },
});

export class TestWhiteSpaceScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center>
          <CellGroup title="空白高度">
            <Text style={TestStyles.TitleText}>通过 WhiteSpace 添加空白高度, 支持 lg/md/sm 或者是数字宽度 。</Text>
            <ColumnView wrap style={{ paddingVertical: 10 }}>
              <View style={styles.box}>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit iaculis velit, vitae euismod urna facilisis et. Ut orci justo, euismod at orci in,.</Text>
              </View>
              <WhiteSpace size="lg" />
              <View style={styles.box2}>
                <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. Morbi non placerat nulla, nec finibus urna. Sed vitae ullamcorper erat, et finibus massa. Ut consequat purus sit amet lacus lacinia, quis convallis nunc interdum. Phasellus pellentesque enim ante, ut tristique quam commodo eu. Curabitur sit amet facilisis neque, eget iaculis mauris. Proin dapibus lectus eu sem vestibulum tristique.</Text>
              </View>
              <WhiteSpace size="md" />
              <View style={styles.box}>
                <Text>Maecenas pharetra vel sem vel ultrices. Nulla consequat, diam ac tristique dictum, massa orci convallis libero, vitae volutpat nulla massa quis arcu. Proin tempor, nibh at blandit porttitor, metus massa faucibus mi, nec volutpat metus nunc quis velit. Pellentesque commodo augue sem, id lobortis erat mollis sed. Aliquam vitae sapien id neque pretium faucibus eu et augue. Nullam semper ornare felis sit amet hendrerit. Sed sit amet ligula in erat maximus dapibus at nec urna. In hac habitasse platea dictumst. Vivamus velit orci, auctor quis venenatis eu, aliquet eu sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius massa libero, eu viverra orci commodo in. </Text>
              </View>
              <WhiteSpace size="sm" />
              <View style={styles.box2}>
                <Text>In turpis leo, placerat eget metus a, mattis elementum diam. Suspendisse auctor ipsum sed mauris aliquet semper.</Text>
              </View>
            </ColumnView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

