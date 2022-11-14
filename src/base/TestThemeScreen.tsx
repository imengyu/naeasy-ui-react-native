import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Switch, Cell, CellGroup, ColumnView, ThemeSelector } from '../lib';
import { RootStackParamList } from '../navigation';
import { DeviceEventEmitter } from 'react-native';

type Props = StackScreenProps<RootStackParamList, 'TestTheme'>;

export function TestThemeScreen(_props: Props) {

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
      <CellGroup title="暗黑模式">
        <Cell title="切换暗黑模式" renderRight={() => <Switch value={isDark} onValueChange={setIsDark} />} />
        <Cell title="跟随系统切换 " renderRight={() => <Switch value={isFlowSystem} onValueChange={setIsFlowSystem} />} />
      </CellGroup>
    </ColumnView>
  );
}

