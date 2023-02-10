# 安装

推荐使用 TypeScript 以获得更好的开发体验。

## 依赖准备

本项目依赖以下项目，在安装之前你需要先安装这些依赖：

```shell
+ react-native-gesture-handler@2.8.0
+ react-native-pager-view@6.0.2
+ react-native-safe-area-context@4.4.1
+ react-native-svg@13.5.0
```

```shell
npm i -S react-native-gesture-handler react-native-pager-view react-native-safe-area-context react-native-svg
```

## 安装步骤

1. 安装

    ```shell
    npm i -S @imengyu/naeasy-ui-react-native
    ```

2. iOS 安装

    在iOS下，还需要安装pod依赖

    ```shell
    cd ios
    pod install
    ```

## 使用

1. 首先在 App.jsx （typescript项目中是 App.tsx） 中为你的组件引入 Provider, 
Provider 用于为主题、全局配置、弹出框等等提供功能：

  ```jsx
  import { Provider } from '@imengyu/naeasy-ui-react-native'; //导入Provider
  import { SafeAreaProvider } from 'react-native-safe-area-context';
  import { GestureHandlerRootView } from 'react-native-gesture-handler'; //部分组件依赖react-native-gesture-handler需要导入

  class App extends React.Component {

    //省略...

    render() {
      return (
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider> { /* 用 Provider 包裹根组件 */ }
              <NavigationContainer> { /* 这里使用了react-navigation，如果不使用，则下面直接放自己的内容 */ }
                <TestAppNav />
              </NavigationContainer>
            </Provider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      );
    }
  }

  export default App;

  ```

2. 导入你需要的组件，然后在页面中使用：

  ```jsx
  import { Button } from '@imengyu/naeasy-ui-react-native/dist/components/button'

  export class TestButtonScreen extends React.PureComponent {
    render() {
      return (
        <Button text="primary" type="primary" onPress={()=>console.log('点击了！')} />
      );
    }
  }
  ```

3. 配置主题和颜色

   参考 [主题和颜色](./theme.md)
