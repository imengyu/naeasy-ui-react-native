import React, { useEffect, useState } from 'react';
import { PortalHost, ThemeProvider, Color, ThemeRender } from './lib';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { TestAppNav } from './TestAppNav';
import { DeviceEventEmitter, StatusBar } from 'react-native';

function App() {

  const [ theme, setTheme ] = useState('light');

  useEffect(() => {
    const event1 = DeviceEventEmitter.addListener('switchDarkTheme', (value: boolean) => {
      setTheme(value ? 'dark' : 'light');
    });
    return () => {
      event1.remove();
    };
  });

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* 弹出框等等组件使用了 Portal，需要引入 PortalHost */}
        <PortalHost>
          {/* 主题支持 */}
          <ThemeProvider theme={theme}>
            {/* 用于在主题更改时为 react-navigation 和 StatusBar 更换颜色 */}
            <ThemeRender>
              {(themeNow, context) => <NavigationContainer theme={{
                //React react-navigation 的样式特殊处理
                dark: themeNow === 'dark',
                colors: {
                  primary: context.getThemeColor(Color.primary),
                  background: context.getThemeColor(Color.background),
                  card: context.getThemeColor(Color.light),
                  text: context.getThemeColor(Color.text),
                  border: context.getThemeColor(Color.border),
                  notification: context.getThemeColor(Color.warning),
                },
              }}>
                {/* 状态栏的样式处理 */}
                <StatusBar
                  barStyle={themeNow === 'dark' ? 'light-content' : 'dark-content'}
                  backgroundColor={context.getThemeColor(Color.background)}
                />
                <TestAppNav />
              </NavigationContainer>}
            </ThemeRender>
          </ThemeProvider>
        </PortalHost>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
