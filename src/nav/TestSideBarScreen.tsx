import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, Toast, Text, RowView } from '../lib';
import { ScrollView, StyleSheet } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';
import { SideBar, SideBarItem } from '../../lib/src/components/nav';

type Props = StackScreenProps<RootStackParamList, 'TestSideBar', 'RootStack'>;
interface State {
  value1: string;
  value2: string;
  value3: string;
  value4: string;
}

const styles = StyleSheet.create({
  sideStyle: {
    width: 100,
  },
});

export class TestSideBarScreen extends React.PureComponent<Props> {
  state: Readonly<State> = {
    value1: 'first',
    value2: 'first',
    value3: 'first',
    value4: 'first',
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView padding={20}>
          <RowView justify="space-around">
            <ColumnView>
              <Text style={TestStyles.TitleText}>基础用法</Text>
              <SideBar
                style={styles.sideStyle}
                selectedItemName={this.state.value1}
                onSelectItem={name => this.setState({ value1: name })}
              >
                <SideBarItem name="first" text="选项1" />
                <SideBarItem name="second" text="选项2" />
                <SideBarItem name="third" text="选项3" />
                <SideBarItem name="fourth" text="选项4" />
              </SideBar>
            </ColumnView>

            <ColumnView>
              <Text style={TestStyles.TitleText}>徽标提示</Text>
              <SideBar
                style={styles.sideStyle}
                selectedItemName={this.state.value2}
                onSelectItem={name => this.setState({ value2: name })}
              >
                <SideBarItem name="first" text="选项1" />
                <SideBarItem name="second" text="选项2" badge={-1} />
                <SideBarItem name="third" text="选项3" badge={50} />
                <SideBarItem name="fourth" text="选项4" badge={100} />
              </SideBar>
            </ColumnView>
          </RowView>


          <RowView justify="space-around" margin={[20, 0,0,0]}>
            <ColumnView>
              <Text style={TestStyles.TitleText}>禁用选项</Text>
              <SideBar
                style={styles.sideStyle}
                selectedItemName={this.state.value3}
                onSelectItem={name => this.setState({ value3: name })}
              >
                <SideBarItem name="first" text="选项1" />
                <SideBarItem name="second" text="选项2" touchable={false} />
                <SideBarItem name="third" text="选项3" touchable={false} />
                <SideBarItem name="fourth" text="选项4" />
              </SideBar>
            </ColumnView>
            <ColumnView>
              <Text style={TestStyles.TitleText}>监听切换事件</Text>
              <SideBar
                style={styles.sideStyle}
                selectedItemName={this.state.value4}
                onSelectItem={name => {
                  this.setState({ value4: name });
                  Toast.info('选中' + name);
                }}
                onClickItem={name => {
                  Toast.info('点击已选中' + name);
                }}
              >
                <SideBarItem name="first" text="选项1" />
                <SideBarItem name="second" text="选项2" />
                <SideBarItem name="third" text="选项3" />
                <SideBarItem name="fourth" text="选项4" />
              </SideBar>
            </ColumnView>
          </RowView>
        </ColumnView>
      </ScrollView>
    );
  }
}

