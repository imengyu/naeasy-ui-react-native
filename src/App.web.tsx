
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, ThemeSelector, ThemeRender, Color } from './lib';
import { TestAppNav } from './TestAppNav';
import { NavigationContainer } from '@react-navigation/native';
import { DeviceEventEmitter } from 'react-native';

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
        <Provider theme={theme}>
          <ThemeRender>{
            (themeNow) =>
              <NavigationContainer
                theme={{
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
                }}
              >
                <TestAppNav />
              </NavigationContainer>
            }
          </ThemeRender>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
