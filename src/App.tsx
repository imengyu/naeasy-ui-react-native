import React, { useEffect, useState } from 'react';
import { Provider, ThemeSelector, Color, ThemeRender } from './lib';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { TestAppNav } from './TestAppNav';
import { DeviceEventEmitter, StatusBar } from 'react-native';

function App() {

  const [ theme, setTheme ] = useState('light');

  useEffect(() => {
    const event = DeviceEventEmitter.addListener('switchDarkTheme', (value: boolean) => {
      setTheme(value ? 'dark' : 'light');
    });
    return () => {
      event.remove();
    };
  });

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider theme={theme}>
          <ThemeRender>
            {(themeNow) => <NavigationContainer theme={{
              //React react-navigation 的样式特殊处理
              dark: themeNow === 'dark',
              colors: {
                primary: ThemeSelector.select(Color.primary),
                background: ThemeSelector.select(Color.background),
                card: ThemeSelector.select(Color.light),
                text: ThemeSelector.select(Color.text),
                border: ThemeSelector.select(Color.border),
                notification: ThemeSelector.select(Color.warning),
              },
            }}>
              {/* 状态栏的样式处理 */}
              <StatusBar barStyle={themeNow === 'dark' ? 'light-content' : 'dark-content'} />
              <TestAppNav />
            </NavigationContainer>}
          </ThemeRender>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
