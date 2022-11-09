import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Progress, Color, WhiteSpace, RowView, Button, ColumnView } from '@imengyu-ui-lib-debug';
import { ScrollView, Text } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';

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
        <ColumnView padding={20}>

          <Text style={TestStyles.TitleText}>基本进度条。</Text>
          <Progress value={this.state.progress} />
          <WhiteSpace />
          <Progress progressColor={Color.success} value={this.state.progress} />
          <WhiteSpace />
          <Progress progressColor={Color.warning}  value={this.state.progress} />
          <WhiteSpace />
          <Progress progressColor={Color.danger} value={this.state.progress} />

          <Text style={TestStyles.TitleText}>从右到左的进度条。</Text>
          <Progress type="right-left" value={this.state.progress} />

          <Text style={TestStyles.TitleText}>竖向进度条。</Text>
          <RowView style={{ height: 100 }}>
            <Progress type="top-bottom" progressColor={Color.success} value={this.state.progress} />
            <WhiteSpace />
            <Progress type="top-bottom" progressColor={Color.warning}  value={this.state.progress} />
            <WhiteSpace />
            <Progress type="bottom-top" progressColor={Color.danger} value={this.state.progress} />
          </RowView>

          <Text style={TestStyles.TitleText}>有动画进度条。</Text>
          <Progress animate value={this.state.progress} />

          <Text style={TestStyles.TitleText}>控制。</Text>
          <RowView>
            <Button onPress={() => this.setState((state) => ({ progress: state.progress + 10 }))}>增加</Button>
            <WhiteSpace size="sm" />
            <Button onPress={() => this.setState((state) => ({ progress: state.progress - 10 }))}>减少</Button>
          </RowView>

        </ColumnView>
      </ScrollView>
    );
  }
}

