/**
 * @format
 */

import App from './src/App';
import { AppRegistry, Platform } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication(appName, { // 2
    initialProps: {},
    rootTag: document.getElementById('app-root'),
  });
}
