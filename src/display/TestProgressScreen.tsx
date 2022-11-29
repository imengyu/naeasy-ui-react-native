import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Color, WhiteSpace, RowView, Button } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { Progress } from '../../lib/src/components/display/Progress';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestProgress', 'RootStack'>;
interface State {
  progress: number;
}

export class TestProgressScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    progress: 59,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Progress 进度条"
          desc="用于展示操作的当前进度。"
          navigation={this.props.navigation}
        />
        <TestHeader bar={false}>基本进度条</TestHeader>
        <TestGroup>
          <Progress value={this.state.progress} />
          <WhiteSpace />
          <Progress progressColor={Color.success} value={this.state.progress} />
          <WhiteSpace />
          <Progress progressColor={Color.warning}  value={this.state.progress} />
          <WhiteSpace />
          <Progress progressColor={Color.danger} value={this.state.progress} />
        </TestGroup>
        <TestHeader bar={false}>从右到左的进度条</TestHeader>
        <TestGroup>
          <Progress type="right-left" value={this.state.progress} />
        </TestGroup>
        <TestHeader bar={false}>线条粗细</TestHeader>
        <TestGroup>
          <Progress height={10} value={this.state.progress} />
        </TestGroup>
        <TestHeader bar={false}>显示进度文字</TestHeader>
        <TestGroup>
          <Progress value={this.state.progress} showProgressText />
        </TestGroup>
        <TestHeader bar={false}>竖向进度条</TestHeader>
        <TestGroup>
          <RowView style={{ height: 100 }}>
            <Progress type="top-bottom" progressColor={Color.success} value={this.state.progress} />
            <WhiteSpace />
            <Progress type="top-bottom" progressColor={Color.warning}  value={this.state.progress} />
            <WhiteSpace />
            <Progress type="bottom-top" progressColor={Color.danger} value={this.state.progress} />
          </RowView>
        </TestGroup>
        <TestHeader bar={false}>有动画进度条</TestHeader>
        <TestGroup>
          <Progress animate value={this.state.progress} />
          <WhiteSpace />
          <RowView>
            <Button onPress={() => this.setState((state) => ({ progress: state.progress - 10 }))}>- 减少</Button>
            <WhiteSpace size="sm" />
            <Button onPress={() => this.setState((state) => ({ progress: state.progress + 10 }))}>+ 增加</Button>
          </RowView>
        </TestGroup>
      </ScrollView>
    );
  }
}

