import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { ColumnView, NoticeBar } from 'imengyu-ui-lib';
import { ScrollView, Text } from 'react-native';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestNoticeBar', 'RootStack'>;
interface State {
  show: boolean;
}

export class TestNoticeBarScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    show: true,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView>

          <Text style={{ padding: 10 }}>通知栏，用于循环播放展示一组消息通知。</Text>
          <NoticeBar content="不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。" />

          <Text style={{ padding: 10 }}>禁用滚动。</Text>
          <NoticeBar content="不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。" scroll={false} />

          <Text style={{ padding: 10 }}>禁用滚动情况下换行显示。</Text>
          <NoticeBar content="不会回头的东西有四件：说出口的话、离弦的箭、逝去的生活和失去的机会。" scroll={false} wrap />

          <Text style={{ padding: 10 }}>自定义样式</Text>
          <NoticeBar content="米袋虽空——樱花开哉！" scroll={false} icon="smile" backgroundColor="rgb(236, 249, 255)" textColor="rgb(25, 137, 250)" />

          <Text style={{ padding: 10 }}>可以关闭</Text>
          { this.state.show ? <NoticeBar content="米袋虽空——樱花开哉！" closeable scroll={false} onClose={() => this.setState({ show: false })} /> : <></> }

        </ColumnView>
      </ScrollView>
    );
  }
}

