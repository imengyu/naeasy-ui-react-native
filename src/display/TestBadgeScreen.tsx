import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { WhiteSpace, DynamicColor, DynamicThemeStyleSheet, RowView, Color, Button } from '../lib';
import { ScrollView, View } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Badge } from '../../lib/src/components/display/Badge';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestBadge', 'RootStack'>;

const styles = DynamicThemeStyleSheet.create({
  box: {
    width: 39,
    height: 39,
    backgroundColor: DynamicColor(Color.grey),
    margin: 5,
  },
});

export function TestBadgeScreen(props: Props) {

  const [ count, setCount ] = useState(1);
  const [ show, setShow ] = useState(true);

  return (
    <ScrollView>
      <TestPageHeader
        title="Badge 徽标"
        desc="通常用于在头像，某些按钮上显示小红点或者数量。"
        navigation={props.navigation}
      />
      <TestHeader desc="支持显示圆点、数字、文字，显示数字时支持最大值，超出最大值会以最大值+的形式显示。">基础用法</TestHeader>
      <TestGroup>
        <RowView center>
          <Badge>
            <View style={styles.box} />
          </Badge>
          <Badge content="1">
            <View style={styles.box} />
          </Badge>
          <Badge content="new">
            <View style={styles.box} />
          </Badge>
          <Badge content="新信息" border>
            <View style={styles.box} />
          </Badge>
          <Badge content={1000} maxCount={99} border>
            <View style={styles.box} />
          </Badge>
        </RowView>
      </TestGroup>
      <TestHeader>切换时有动画效果</TestHeader>
      <TestGroup>
        <RowView center>
          <Badge show={show} anim>
            <View style={styles.box} />
          </Badge>
          <Badge show={show} anim content={count}>
            <View style={styles.box} />
          </Badge>
          <Badge show={show} anim content={count} maxCount={99}>
            <View style={styles.box} />
          </Badge>
        </RowView>
          <WhiteSpace size="sm" />
        <RowView center>
          <Button onPress={() => setShow((p) => !p)}>显示/隐藏</Button>
          <WhiteSpace size="sm" />
          <Button onPress={() => setCount((c) => c - 1)}>数量-1</Button>
          <WhiteSpace size="sm" />
          <Button onPress={() => setCount((c) => c + 1)}>数量+1</Button>
        </RowView>
      </TestGroup>
      <TestHeader>不同颜色的徽标</TestHeader>
      <TestGroup>
        <RowView center>
          <Badge>
            <View style={styles.box} />
          </Badge>
          <Badge color={Color.primary}>
            <View style={styles.box} />
          </Badge>
          <Badge color={Color.success}>
            <View style={styles.box} />
          </Badge>
          <Badge color={Color.warning}>
            <View style={styles.box} />
          </Badge>
        </RowView>
      </TestGroup>
      <TestHeader>不同位置、颜色的徽标</TestHeader>
      <TestGroup>
        <RowView center>
          <Badge>
            <View style={styles.box} />
          </Badge>
          <Badge position="bottomLeft" color={Color.primary}>
            <View style={styles.box} />
          </Badge>
          <Badge position="topLeft" color={Color.success}>
            <View style={styles.box} />
          </Badge>
          <Badge position="bottomRight" color={Color.warning}>
            <View style={styles.box} />
          </Badge>
        </RowView>
      </TestGroup>
      <TestHeader>独立展示</TestHeader>
      <TestGroup>
        <RowView center>
          <Badge />
          <WhiteSpace />
          <Badge color={Color.primary} />
          <WhiteSpace />
          <Badge color={Color.success} />
          <WhiteSpace />
          <Badge color={Color.waring} />
          <WhiteSpace />
          <Badge color={Color.notice} />
        </RowView>
        <RowView center>
          <Badge />
          <WhiteSpace />
          <Badge content="1" />
          <WhiteSpace />
          <Badge content="new" border />
        </RowView>
      </TestGroup>
    </ScrollView>
  );
}

