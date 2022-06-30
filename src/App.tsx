/**
 * App 主入口
 *
 * @format
 */

import React from 'react';
import Provider from './provider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CommonStyles } from './styles/CommonStyles';

import { NavigationContainer } from '@react-navigation/native';
import { TestAppNav } from './example/TestAppNav';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <SafeAreaProvider>
        <GestureHandlerRootView style={CommonStyles.FlexOne}>
          <Provider>
            <NavigationContainer>
              <TestAppNav />
            </NavigationContainer>
          </Provider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    );
  }
}

export default App;
