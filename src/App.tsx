import React, { useEffect, useRef, useState } from 'react';
import { PortalHost, ThemeProvider, Color, ThemeRender, ToolBox } from './lib';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { TestAppNav } from './TestAppNav';
import { DeviceEventEmitter, StatusBar } from 'react-native';
import { ErrorBoundary } from '../lib/src/components/error';

function App() {

  const [ theme, setTheme ] = useState('light');
  const folowSystem = useRef(false);

  useEffect(() => {
    const event1 = DeviceEventEmitter.addListener('switchTheme', (value: string) => {
      setTheme(value);
    });
    const event2 = DeviceEventEmitter.addListener('switchDarkThemeFlowSystem', (value: boolean) => {
      folowSystem.current = value;
    });
    return () => {
      event1.remove();
      event2.remove();
    };
  });

  //监听系统深色模式更改
  useEffect(() => {
    const event = ToolBox.addSystemThemeChangedListener((themeNow) => {
      if (folowSystem.current) {
        setTheme(themeNow);
      }
    });
    return () => {
      event?.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* 主题支持 */}
        <ThemeProvider theme={theme}>
          {/* 弹出框等等组件使用了 Portal，需要引入 PortalHost */}
          <PortalHost>
            {/* 用于在主题更改时为 react-navigation 和 StatusBar 更换颜色 */}
            <ThemeRender>
              {(themeNow, context) => <NavigationContainer theme={{
                //React react-navigation 的样式特殊处理
                dark: themeNow === 'dark',
                colors: {
                  primary: context.resolveThemeColor(Color.primary),
                  background: context.resolveThemeColor(Color.background),
                  card: context.resolveThemeColor(Color.light),
                  text: context.resolveThemeColor(Color.text),
                  border: context.resolveThemeColor(Color.border),
                  notification: context.resolveThemeColor(Color.warning),
                },
              }}>
                {/* 状态栏的样式处理 */}
                <StatusBar
                  barStyle={themeNow === 'dark' ? 'light-content' : 'dark-content'}
                  backgroundColor={context.resolveThemeColor(Color.background)}
                />
                <ErrorBoundary>
                  <TestAppNav />
                </ErrorBoundary>
              </NavigationContainer>}
            </ThemeRender>
          </PortalHost>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
