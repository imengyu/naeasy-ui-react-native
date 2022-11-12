import React, { createRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, CellGroup, CountDown, CountDownInstance, RowView, Button, WhiteSpace } from '../../lib/src/index';
import { ScrollView, Text } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestStyles } from '../styles/TestStyles';

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
            <CountDown time={1 * 60 * 60 * 1000} />
          </CellGroup>
          <CellGroup title="自定义格式">
            <CountDown time={72 * 60 * 60 * 1000} format="DD 天 HH 时 mm 分 ss 秒" />
          </CellGroup>
          <CellGroup title="毫秒级渲染">
            <CountDown time={1 * 60 * 60 * 1000} millisecond format="HH:mm:ss:SS" />
          </CellGroup>
          <CellGroup title="自定义样式">
            <CountDown time={1 * 60 * 60 * 1000} renderText={(time) => {
              return <RowView center>
                <Text style={{ backgroundColor: '#f00', color: '#fff', padding: 10 }}>{time.hours}</Text>
                <Text style={{ marginHorizontal: 4 }}>:</Text>
                <Text style={{ backgroundColor: '#f00', color: '#fff', padding: 10 }}>{time.minutes}</Text>
                <Text style={{ marginHorizontal: 4 }}>:</Text>
                <Text style={{ backgroundColor: '#f00', color: '#fff', padding: 10 }}>{time.seconds}</Text>
              </RowView>;
            }} />
          </CellGroup>
          <CellGroup title="手动控制">
            <CountDown ref={this.countdownRef} time={1 * 60 * 60 * 1000} />

            <RowView>
              <Button onPress={() => this.countdownRef.current?.start()}>开始</Button>
              <WhiteSpace size="sm" />
              <Button onPress={() => this.countdownRef.current?.stop()} type="default">暂停</Button>
              <WhiteSpace size="sm" />
              <Button onPress={() => this.countdownRef.current?.reset()} type="default">重置</Button>
            </RowView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

