import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Cell, CellGroup, ColumnView, ThemeSelector } from '../lib';
import { RootStackParamList } from '../navigation';
import { DeviceEventEmitter, Platform } from 'react-native';
import { Switch } from '../../lib/src/components/form';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestTheme'>;

export function TestThemeScreen(props: Props) {

  const [ isDark, setIsDark ] = useState(ThemeSelector.theme === 'dark');
  const [ isFlowSystem, setIsFlowSystem ] = useState(false);

  useEffect(() => {
    //通知 App.js 修改主题
    DeviceEventEmitter.emit('switchDarkTheme', isDark);
  }, [ isDark ]);
  useEffect(() => {
    //通知 App.js 修改主题
    DeviceEventEmitter.emit('switchDarkThemeFlowSystem', isFlowSystem);
  }, [ isFlowSystem ]);

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
    </ColumnView>
  );
}

