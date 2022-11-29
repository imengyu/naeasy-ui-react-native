import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Color, Toast, WhiteSpace } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { NavBar } from '../../lib/src/components/nav';
import { TestGroup } from '../components/TestGroup';
import { TestHeader, TestPageHeader } from '../components/TestHeader';

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
        <TestPageHeader
          title="NavBar 导航栏"
          desc="为页面提供导航功能，常用于页面顶部。"
          navigation={this.props.navigation}
        />
        <TestHeader desc="通过 title 属性设置导航栏标题。">基础用法</TestHeader>
        <TestGroup noHorizontalPadding>
          <NavBar title="标题" backgroundColor={Color.white} onLeftButtonPressed={this.onLeftPressed} />
        </TestGroup>
        <TestHeader desc="在导航栏实现返回上级功能。">返回上级</TestHeader>
        <TestGroup noHorizontalPadding>
          <NavBar title="标题" leftButton="back" backgroundColor={Color.white} onLeftButtonPressed={this.onLeftPressed} />
        </TestGroup>
        <TestHeader desc="在导航栏右侧添加可点击的按钮。">右侧按钮</TestHeader>
        <TestGroup noHorizontalPadding>
          <NavBar
            title="标题"
            leftButton="back"
            backgroundColor={Color.white}
            rightButton="search"
            onLeftButtonPressed={this.onLeftPressed}
            onRightButtonPressed={this.onRightPressed}
          />
        </TestGroup>
        <TestHeader desc="可以通过插槽自定义导航栏两侧的内容。">自定义渲染</TestHeader>
        <TestGroup noHorizontalPadding>
          <NavBar
            title="标题"
            backgroundColor={Color.white}
            renderLeft={() => <Button key="btn" type="text" icon="save" onPress={this.onLeftPressed}>保存</Button>}
            renderRight={() => <Button key="btn" type="text" icon="home" onPress={this.onRightPressed}>主页</Button>}
          />
        </TestGroup>
        <WhiteSpace size={100} />
      </ScrollView>
    );
  }
}

