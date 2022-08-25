import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { ColumnView } from 'imengyu-ui-lib';
import { ScrollView, Text } from 'react-native';
import { TestStyles } from '../styles/TestStyles';
import { NavBar } from 'imengyu-ui-lib';
import { RootStackParamList } from '../navigation';
import { Button, Color, Toast } from 'imengyu-ui-lib';

type Props = StackScreenProps<RootStackParamList, 'TestNavBar', 'RootStack'>;

export class TestNavBarScreen extends React.PureComponent<Props> {

  onLeftPressed = () => {
    Toast.info('点击左侧按钮');
  };
  onRightPressed = () => {
    Toast.info('点击右侧按钮');
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView>
          

          <Text style={TestStyles.TitleText}>基础用法</Text>
          <NavBar title="标题" backgroundColor={Color.white} onLeftButtonPressed={this.onLeftPressed} />

          <Text style={TestStyles.TitleText}>返回上级</Text>
          <NavBar title="标题" leftButton="back" backgroundColor={Color.white} onLeftButtonPressed={this.onLeftPressed} />

          <Text style={TestStyles.TitleText}>右侧按钮</Text>
          <NavBar
            title="标题"
            leftButton="back"
            backgroundColor={Color.white}
            rightButton="search"
            onLeftButtonPressed={this.onLeftPressed}
            onRightButtonPressed={this.onRightPressed}
          />

          <Text style={TestStyles.TitleText}>自定义渲染</Text>
          <NavBar
            title="标题"
            backgroundColor={Color.white}
            renderLeft={() => <Button key="btn" type="text" icon="save" onPress={this.onLeftPressed}>保存</Button>}
            renderRight={() => <Button key="btn" type="text" icon="home" onPress={this.onRightPressed}>主页</Button>}
          />

        </ColumnView>
      </ScrollView>
    );
  }
}

