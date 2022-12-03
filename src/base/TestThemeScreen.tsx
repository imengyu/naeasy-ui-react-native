import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Cell, CellGroup, ColumnView, rpx, RowView, ThemeUtils, Text, Button, Progress, WhiteSpace, Tag } from '../lib';
import { RootStackParamList } from '../navigation';
import { DeviceEventEmitter, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox, Radio, Switch, Slider } from '../../lib/src/components/form';
import { TestPageHeader } from '../components/TestHeader';
import { showTestMessage } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestTheme'>;

const style = StyleSheet.create({
  colorButton: {
    width: rpx(100),
    height: rpx(100),
    borderRadius: rpx(10),
    marginRight: rpx(10),
    marginTop: rpx(10),
  },
});

export function TestThemeScreen(props: Props) {

  const [ isDark, setIsDark ] = useState(false);
  const [ isFlowSystem, setIsFlowSystem ] = useState(false);

  useEffect(() => {
    //通知 App.js 修改主题
    DeviceEventEmitter.emit('switchDarkTheme', isDark);
  }, [ isDark ]);
  useEffect(() => {
    //通知 App.js 修改主题
    DeviceEventEmitter.emit('switchDarkThemeFlowSystem', isFlowSystem);
  }, [ isFlowSystem ]);


  //主题色
  const colors = [
    '#f5222d',
    '#fa541c',
    '#faad14',
    '#13c2c2',
    '#52c41a',
    '#1890ff',
    '#2f54eb',
    '#722ed1',
  ];
  //更换主题色
  function changePrimaryColor(color: string) {
    ThemeUtils.configColors({
      primary: {
        light: color,
        dark: color,
        pressed_light: ThemeUtils.makeAplhaColor(color, 0.8),
        pressed_dark: ThemeUtils.makeAplhaColor(color, 0.6),
      },
    });
  }

  const [ siderValue, setSiderValue ] = useState(50);
  const [ checkValue, setCheckValue ] = useState(true);

  return (
    <ColumnView center>
      <TestPageHeader
        title="Theme 主题"
        desc="支持动态切换主题，通常用于深色亮色模式切换。也同时支持监听系统深色亮色模式切换事件。"
        navigation={props.navigation}
      />
      <CellGroup title="暗黑模式">
        <Cell title="切换暗黑模式" renderRight={() => <Switch value={isDark} onValueChange={setIsDark} />} />
        { Platform.OS !== 'web' ? <Cell title="跟随系统切换 " renderRight={() => <Switch value={isFlowSystem} onValueChange={setIsFlowSystem} />} /> : <></> }
      </CellGroup>
      <CellGroup title="主题色">
        <RowView wrap padding={[0, 20]}>
          <Text>点击更改主题色</Text>
        </RowView>
        <RowView wrap padding={20}>
          { colors.map((color, i) => <TouchableOpacity key={i} style={[style.colorButton, { backgroundColor: color }]} onPress={() => changePrimaryColor(color)} />) }
        </RowView>
        <ColumnView wrap padding={20}>
          <Button type="primary" onPress={() => showTestMessage('我是按钮')}>我是按钮</Button>
          <WhiteSpace size="sm" />
          <CheckBox value={checkValue}>我是复选框</CheckBox>
          <WhiteSpace size="sm" />
          <Radio value={checkValue}>我是单选框</Radio>
          <WhiteSpace size="sm" />
          <Switch value={checkValue} onValueChange={setCheckValue} />
          <WhiteSpace size="sm" />
          <Progress value={siderValue} showProgressText />
          <WhiteSpace size="sm" />
          <Slider value={siderValue} onValueChange={setSiderValue} />
          <WhiteSpace size="sm" />
          <Tag text="我是标记" type="primary" />
        </ColumnView>

      </CellGroup>
    </ColumnView>
  );
}

