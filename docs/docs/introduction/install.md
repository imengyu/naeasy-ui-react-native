# 安装

## 依赖准备

本项目依赖以下项目，在安装之前你需要先安装这些依赖：

* @newbanker/react-native-measure-text ^0.2.0
* async-validator ^4.2.5
* react-native-gesture-handler ^2.5.0
* react-native-pager-view ^5.4.24
* react-native-safe-area-context ^4.3.1

```
npm i -S @newbanker/react-native-measure-text async-validator react-native-gesture-handler react-native-pager-view react-native-safe-area-context
```

## 安装

1. 安装

    ```
    npm i -S @imengyu/imengyu-ui-lib
    ```

2. iOS 安装

    在iOS下，还需要安装pod依赖

    ```
    cd ios
    pod install
    ```

## 使用

1. 首先在 App.jsx （typescript项目中是 App.tsx） 中为你的组件引入 Provider, 
Provider 用于为主题、全局配置、弹出框等等提供功能：

```jsx
import { Provider } from 'imengyu-ui-lib'; //导入Provider

class App extends React.Component {

  //省略...

  render() {
    return (
      <Provider> { /* 用 Provider 包裹根组件 */ }
        <NavigationContainer> { /* 下面是自己的内容 */ }
          <TestAppNav />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

```

2. 导入你需要的组件，然后在页面中使用：

```jsx
import { Button } from 'imengyu-ui-lib';

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
