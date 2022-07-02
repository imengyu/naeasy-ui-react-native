import React from 'react';
import { Provider } from 'imengyu-ui-lib';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { TestAppNav } from './src/TestAppNav';
import { NativeModules } from 'react-native';

class App extends React.Component {
  componentDidMount() {
    console.log(NativeModules);
  }
  render() {
    return (
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
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
