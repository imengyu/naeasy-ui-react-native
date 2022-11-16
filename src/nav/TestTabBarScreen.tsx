import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, Icon, Image, TabBar, TabBarItem, Text } from '../lib';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';
import { Color } from '../lib';

type Props = StackScreenProps<RootStackParamList, 'TestTabBar', 'RootStack'>;
interface State {
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
}

const styles = StyleSheet.create({
  customIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
  },
  humpIcon: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
  },
});

export class TestTabBarScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    value1: 'first',
    value2: 'first',
    value3: 'first',
    value4: 'first',
    value5: 'hump',
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView>
          <Text style={TestStyles.TitleText}>基础用法</Text>
          <TabBar
            selectedTabName={this.state.value1}
            onSelectTab={name => this.setState({ value1: name })}
          >
            <TabBarItem name="first" icon="home" text="标签1" />
            <TabBarItem name="second" icon="data-view" text="标签2" />
            <TabBarItem name="third" icon="image-text" text="标签3" />
            <TabBarItem name="forth" icon="user" text="标签4" />
          </TabBar>

          <Text style={TestStyles.TitleText}>徽标提示</Text>
          <TabBar
            selectedTabName={this.state.value2}
            onSelectTab={name => this.setState({ value2: name })}
          >
            <TabBarItem name="first" icon="home" text="标签1" />
            <TabBarItem name="second" icon="data-view" text="标签2" badge={-1} />
            <TabBarItem name="third" icon="image-text" text="标签3" badge={5} />
            <TabBarItem name="forth" icon="user" text="标签4" badge={100} />
          </TabBar>

          <Text style={TestStyles.TitleText}>自定义图标</Text>
          <TabBar
            selectedTabName={this.state.value3}
            onSelectTab={name => this.setState({ value3: name })}
          >
            <TabBarItem name="first" text="标签1" renderIcon={(selected) => selected ? <Image source={require('../images/test1.png')} style={styles.customIcon} /> : <Image source={require('../images/test1-1.png')} style={styles.customIcon} />} />
            <TabBarItem name="second" text="标签2" renderIcon={() => <Image source={require('../images/test2.png')} style={styles.customIcon} />} />
            <TabBarItem name="forth" icon="user" text="标签4" />
          </TabBar>

          <Text style={TestStyles.TitleText}>自定义颜色</Text>
          <TabBar
            selectedTabName={this.state.value4}
            onSelectTab={name => this.setState({ value4: name })}
            activeColor={Color.danger}
            inactiveColor={Color.success}
          >
            <TabBarItem name="first" icon="home" text="标签1" />
            <TabBarItem name="second" icon="data-view" text="标签2" />
            <TabBarItem name="third" icon="image-text" text="标签3" />
            <TabBarItem name="forth" icon="user" text="标签4" />
          </TabBar>

          <Text style={TestStyles.TitleText}>凸起标签</Text>
          <TabBar
            selectedTabName={this.state.value5}
            onSelectTab={name => this.setState({ value5: name })}
          >
            <TabBarItem name="first" icon="home" text="标签1" />
            <TabBarItem name="second" icon="data-view" text="标签2" />
            <TabBarItem name="hump"
              icon="good"
              text="凸起标签"
              hump
              humpHeight={[ 50, 23 ]}
              renderIcon={(selected, iconProps) => selected ? <Image source={require('../images/test4.png')} style={styles.humpIcon} /> : <Icon { ...iconProps } />}
            />
            <TabBarItem name="third" icon="image-text" text="标签3" />
            <TabBarItem name="forth" icon="user" text="标签4" />
          </TabBar>

          <Text style={TestStyles.TitleText}>自定义背景</Text>
          <TabBar
            selectedTabName={this.state.value1}
            onSelectTab={name => this.setState({ value1: name })}
            activeColor="#f33"
            inactiveColor="#fff"
            style={{ backgroundColor: '#9bbbd4' }}
          >
            <TabBarItem name="first" icon="home" text="标签1" />
            <TabBarItem name="second" icon="data-view" text="标签2" />
            <TabBarItem name="third" icon="image-text" text="标签3" />
            <TabBarItem name="forth" icon="user" text="标签4" />
          </TabBar>

        </ColumnView>
      </ScrollView>
    );
  }
}

