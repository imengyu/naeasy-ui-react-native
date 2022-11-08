import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, CellGroup, A } from 'imengyu-ui-lib';
import { ScrollView } from 'react-native';
import { H1, H2, H3, H4, H5, H6 } from 'imengyu-ui-lib';
import { B, Br, I, S, U, Text } from 'imengyu-ui-lib';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestTypography'>;

export class TestTypographyScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center>
          <CellGroup title="标题" inset>
            <ColumnView padding={10}>
              <H1>这是标题一</H1>
              <H2>这是标题二</H2>
              <H3>这是标题三</H3>
              <H4>这是标题四</H4>
              <H5>这是标题五</H5>
              <H6>这是标题六</H6>
            </ColumnView>
          </CellGroup>
          <CellGroup title="文字样式" inset>
            <ColumnView padding={10}>
              <B>这是粗体文字</B>
              <I>这是斜体文字</I>
            </ColumnView>
          </CellGroup>
          <CellGroup title="文字线" inset >
            <ColumnView padding={10}>
              <S>这段字符串中间有条删除线</S>
              <U>这段字符串有条下划线</U>
            </ColumnView>
          </CellGroup>
          <CellGroup title="换行" inset >
            <ColumnView padding={10}>
              <Text>Br用于将文字换行。<Br />这一行文字在这里换行。</Text>
            </ColumnView>
          </CellGroup>
          <CellGroup title="链接" inset >
            <ColumnView padding={10}>
              <A href="https://www.bing.com">点击我打开 www.bing.com</A>
            </ColumnView>
          </CellGroup>
          <CellGroup title="组合组件" inset >
            <ColumnView padding={10}>
              <Text underline>可以使用封装的组件快速组合多个样式</Text>
              <Text bold italic>粗体+斜体文字</Text>
              <Text bold italic underline>粗体+斜体+下划线文字</Text>
              <Text bold italic underline lineThrough>粗体+斜体+下划线+删除线文字</Text>
            </ColumnView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

