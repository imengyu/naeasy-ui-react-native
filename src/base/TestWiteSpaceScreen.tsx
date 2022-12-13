import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, RowView, WhiteSpace, Text, Color } from '../lib';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestWhiteSpace'>;

const styles = StyleSheet.create({
  box: {
    width: '100%',
  },
  box2: {
    width: '100%',
    borderWidth: 1,
    borderColor: Color.warning.light,
  },
  box5: {
    height: '100%',
    borderWidth: 1,
    borderColor: Color.warning.light,
  },
  box3: {
    width: 39,
    height: 39,
    backgroundColor: Color.success.light,
    borderRadius: 10,
    margin: 5,
  },
  box4: {
    width: 39,
    height: 39,
    backgroundColor: Color.warning.light,
    borderRadius: 10,
    margin: 5,
  },
});

export class TestWhiteSpaceScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="WhiteSpace 空白高度"
          desc="用于在布局中添加空白高度。"
          navigation={this.props.navigation}
        />
        <TestHeader desc="通过 WhiteSpace 添加空白高度, 支持 lg/md/sm 或者是数字宽度 。">空白高度</TestHeader>
        <TestGroup>
          <ColumnView wrap>
            <View style={styles.box}>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit iaculis velit, vitae euismod urna facilisis et. Ut orci justo, euismod at orci in,.</Text>
            </View>
            <WhiteSpace size={100} style={styles.box2} />
            <View style={styles.box}>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit iaculis velit, vitae euismod urna facilisis et. Ut orci justo, euismod at orci in,.</Text>
            </View>
            <WhiteSpace size="large" style={styles.box2} />
            <View style={styles.box}>
              <Text>Maximus a justo. Praesent ac neque commodo enim convallis auctor. Duis volutpat ultricies placerat. Morbi non placerat nulla, nec finibus urna. </Text>
            </View>
            <WhiteSpace size="medium" style={styles.box2} />
            <View style={styles.box}>
              <Text>Maecenas pharetra vel sem vel ultrices. Nulla consequat, diam ac tristique dictum, massa orci convallis libero, vitae volutpat nulla massa quis arcu. </Text>
            </View>
            <WhiteSpace size="small" style={styles.box2} />
            <View style={styles.box}>
              <Text>In turpis leo, placerat eget metus a, mattis elementum diam. Suspendisse auctor ipsum sed mauris aliquet semper.</Text>
            </View>
          </ColumnView>
        </TestGroup>
        <TestHeader desc="也可在水平布局中占位 。">水平布局中占位</TestHeader>
        <TestGroup>
          <RowView wrap>
            <View style={styles.box3} />
            <WhiteSpace size={10} style={styles.box5} />
            <View style={styles.box4} />
            <WhiteSpace size="large" style={styles.box5} />
            <View style={styles.box3} />
            <WhiteSpace size="medium" style={styles.box5} />
            <View style={styles.box4} />
            <WhiteSpace size="small" style={styles.box5} />
            <View style={styles.box3} />
          </RowView>
        </TestGroup>
      </ScrollView>
    );
  }
}

