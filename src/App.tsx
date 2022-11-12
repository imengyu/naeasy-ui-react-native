import React from 'react';
import { Provider } from '../lib/src/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { TestAppNav } from './TestAppNav';

class App extends React.Component {
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
