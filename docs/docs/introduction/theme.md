## 主题

本组件库大部分的组件支持动态切换主题，您只需要在 Provider 中传入当前主题，即可实现动态切换。

库内置实现了 `light` 与 `dark` 两种主题用于亮色与暗色，如果您有其他主题切换，可以在颜色中配置。

默认主题是 `light`。

```jsx
import { Provider, Color, ColumnView, Button } from 'imengyu-ui-lib';

class App extends React.Component {

  const [ theme, setTheme ] = useState('light');

  render() {
    return (
      <Provider theme={theme}> { /* 用 Provider 包裹根组件 */ }
        { /* 实际应用中下面应该是根组件，这里放了按钮用于测试主题切换 */ }
        <ColumnView backgroundColor={Color.white} style={{ flex: 1 }}>
          <Button text="primary" type="primary" text="亮色" onPress={()=>setTheme('light')} />
          <Button text="primary" type="primary" text="暗色" onPress={()=>setTheme('dark')} />
        </ColumnView>
      </Provider>
    );
  }
}

export default App;

```

## 颜色

库内置实现了一些内置颜色，与 `light`、`dark` 两种主题用于亮色与暗色，你可以声明其他主题颜色或者修改已有主题颜色。

内置主题颜色可以在源码中查看 [src\styles\ColorStyles.ts](src/styles/ColorStyles.ts)。

修改已有主题颜色：

```js
import { ThemeUtils } from 'imengyu-ui-lib';

//需要在应用启动的时候设置，之后设置了需要重新设置主题才能生效
ThemeUtils.configColors({
  //如果键值已经定义，则会覆盖
  white: {
    //默认有light，dark两个主题，你也可以定义其他主题
    light: '#ffffff',
    dark: '#000000',
    //pressed_开头则是按下颜色定义，可使用 PressedColor 函数取出按下颜色
    //这里同样也有light，dark两个主题，你也可以定义其他主题
    pressed_light: '#efefef',
    pressed_dark: '#666666',
  },
});

```

## 文字大小预设

用于按钮，文字等等组件。

```js
ThemeUtils.configFonstSizes({
  larger: 18,
  large: 16,
  medium: 14,
  small: 12,
  mini: 11,
})
```

## 空白大小预设

用于空白占位组件。

```js
ThemeUtils.configFonstSizes({
  xs: 5,
  sm: 10,
  md: 20,
  lg: 35,
  xl: 50,
})
```
