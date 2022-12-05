import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { WingBlank, Color, StyleSheet, DynamicColor } from '../lib';
import { ScrollView, Text } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestWingBlank'>;

const styles = StyleSheet.create({
  title: {
    backgroundColor: DynamicColor(Color.warning),
    color: DynamicColor(Color.white),
    padding: 5,
  },
  text: {
    color: DynamicColor(Color.text),
    backgroundColor: DynamicColor(Color.light),
  },
});

export class TestWingBlankScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="WingBlank 两翼留白"
          desc="通过 WingBlank 组件两翼留白, 支持 lg/md/sm 或者是数字宽度 "
          navigation={this.props.navigation}
        />
        <TestHeader>基础使用</TestHeader>
        <TestGroup noHorizontalPadding>
          <Text style={styles.title}>WingBlank 50</Text>
          <WingBlank size={50}>
            <Text style={styles.text}>In turpis leo, placerat eget metus a, mattis elementum diam. Suspendisse auctor ipsum sed mauris aliquet semper.</Text>
          </WingBlank>
          <Text style={styles.title}>WingBlank lg</Text>
          <WingBlank size="lg">
            <Text style={styles.text}>In turpis leo, placerat eget metus a, mattis elementum diam. Suspendisse auctor ipsum sed mauris aliquet semper.</Text>
          </WingBlank>
          <Text style={styles.title}>WingBlank md</Text>
          <WingBlank size="md">
            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit iaculis velit, vitae euismod urna facilisis et. Ut orci justo, euismod at orci in, gravida rhoncus ligula. Mauris at turpis porta, viverra mi quis, egestas felis. Sed metus risus, blandit id tincidunt sollicitudin, maximus a justo. </Text>
          </WingBlank>
          <Text style={styles.title}>WingBlank sm</Text>
          <WingBlank size="sm">
            <Text style={styles.text}>Maecenas pharetra vel sem vel ultrices. Nulla consequat, diam ac tristique dictum, massa orci convallis libero, vitae volutpat nulla massa quis arcu. Proin tempor, nibh at blandit porttitor, metus massa faucibus mi, nec volutpat metus nunc quis velit. </Text>
          </WingBlank>
        </TestGroup>
      </ScrollView>
    );
  }
}

