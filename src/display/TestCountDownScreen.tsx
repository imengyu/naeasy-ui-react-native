import React, { createRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RowView, Button, WhiteSpace, Text } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { CountDown, CountDownInstance } from '../../lib/src/components/countdown';
import { TestGroup } from '../components/TestGroup';
import { TestHeader, TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestCountDown', 'RootStack'>;

export class TestCountDownScreen extends React.PureComponent<Props> {

  countdownRef = createRef<CountDownInstance>();

  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="CountDown 倒计时"
          desc="用于实时展示倒计时数值，支持毫秒精度。"
          navigation={this.props.navigation}
        />
        <TestHeader>基础用法</TestHeader>
        <TestGroup>
          <CountDown time={1 * 60 * 60 * 1000} />
        </TestGroup>
        <TestHeader>自定义格式</TestHeader>
        <TestGroup>
          <CountDown time={72 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
        </TestGroup>
        <TestHeader>毫秒级渲染</TestHeader>
        <TestGroup>
          <CountDown time={1 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
        </TestGroup>
        <TestHeader>自定义样式</TestHeader>
        <TestGroup>
          <CountDown time={1 * 60 * 60 * 1000} renderText={(time) => {
            return <RowView center>
              <Text style={{ backgroundColor: '#f00', color: '#fff', padding: 10 }}>{time.hours}</Text>
              <Text style={{ marginHorizontal: 4 }}>:</Text>
              <Text style={{ backgroundColor: '#f00', color: '#fff', padding: 10 }}>{time.minutes}</Text>
              <Text style={{ marginHorizontal: 4 }}>:</Text>
              <Text style={{ backgroundColor: '#f00', color: '#fff', padding: 10 }}>{time.seconds}</Text>
            </RowView>;
          }} />
        </TestGroup>
        <TestHeader>手动控制</TestHeader>
        <TestGroup>
          <CountDown ref={this.countdownRef} time={1 * 60 * 60 * 1000} />
          <WhiteSpace />
          <RowView>
            <Button onPress={() => this.countdownRef.current?.start()}>开始</Button>
            <WhiteSpace size="small" />
            <Button onPress={() => this.countdownRef.current?.stop()} type="default">暂停</Button>
            <WhiteSpace size="small" />
            <Button onPress={() => this.countdownRef.current?.reset()} type="default">重置</Button>
          </RowView>
        </TestGroup>
      </ScrollView>
    );
  }
}

