import React, { createRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, CellGroup, RowView, Button, WhiteSpace, Text } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestStyles } from '../styles/TestStyles';
import { CountDown, CountDownInstance } from '../../lib/src/components/countdown';

type Props = StackScreenProps<RootStackParamList, 'TestCountDown', 'RootStack'>;

export class TestCountDownScreen extends React.PureComponent<Props> {

  countdownRef = createRef<CountDownInstance>();

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center style={TestStyles.PaddingS}>
          <CellGroup title="介绍">
            <Text style={TestStyles.PaddingS}>用于实时展示倒计时数值，支持毫秒精度。</Text>
          </CellGroup>
          <CellGroup title="基础用法">
            <ColumnView padding={10}>
              <CountDown time={1 * 60 * 60 * 1000} />
            </ColumnView>
          </CellGroup>
          <CellGroup title="自定义格式">
            <ColumnView padding={10}>
              <CountDown time={72 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
            </ColumnView>
          </CellGroup>
          <CellGroup title="毫秒级渲染">
            <ColumnView padding={10}>
              <CountDown time={1 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
            </ColumnView>
          </CellGroup>
          <CellGroup title="自定义样式">
            <ColumnView padding={10}>
              <CountDown time={1 * 60 * 60 * 1000} renderText={(time) => {
                return <RowView center>
                  <Text style={{ backgroundColor: '#f00', color: '#fff', padding: 10 }}>{time.hours}</Text>
                  <Text style={{ marginHorizontal: 4 }}>:</Text>
                  <Text style={{ backgroundColor: '#f00', color: '#fff', padding: 10 }}>{time.minutes}</Text>
                  <Text style={{ marginHorizontal: 4 }}>:</Text>
                  <Text style={{ backgroundColor: '#f00', color: '#fff', padding: 10 }}>{time.seconds}</Text>
                </RowView>;
              }} />
            </ColumnView>
          </CellGroup>
          <CellGroup title="手动控制">
            <ColumnView padding={10}>
              <CountDown ref={this.countdownRef} time={1 * 60 * 60 * 1000} />

              <WhiteSpace />
              <RowView>
                <Button onPress={() => this.countdownRef.current?.start()}>开始</Button>
                <WhiteSpace size="sm" />
                <Button onPress={() => this.countdownRef.current?.stop()} type="default">暂停</Button>
                <WhiteSpace size="sm" />
                <Button onPress={() => this.countdownRef.current?.reset()} type="default">重置</Button>
              </RowView>
            </ColumnView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

