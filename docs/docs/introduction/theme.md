# 主题与颜色

## 主题

本组件库大部分的组件支持动态切换主题，您只需要在 Provider 中传入当前主题，即可实现动态切换。

库内置实现了 `light` 与 `dark` 两种主题用于亮色与暗色，如果您有其他主题切换，可以在颜色中配置。

默认主题是 `light`。

```jsx
import { Provider, Color, ColumnView, Button } from '@imengyu/naeasy-ui-react-native';

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

库内置的颜色是一个 key-value 对象，下文简称（颜色对象），用于表示不同的主题中不同的颜色。

库内置实现了一些内置颜色对象，每个都有 `light`、`dark` 两种主题用于亮色与暗色，你可以声明其他主题颜色或者修改已有主题颜色。

内置主题颜色可以在源码中查看 [src\styles\ColorStyles.ts](src/styles/ColorStyles.ts)。

修改已有主题颜色：

```js
import { ThemeUtils } from '@imengyu/naeasy-ui-react-native';

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

## 动态主题与跟随系统深色模式

参考 Demo app 中的 `App.tsx`，内置了主题切换与跟随系统深色模式功能。

```jsx
import { ThemeSelector, ToolBox， ThemeRender } from '@imengyu/naeasy-ui-react-native';

function App() {

  //这是主题变量
  const [ theme, setTheme ] = useState('light');

  //这个全局事件用于其他组件通过 DeviceEventEmitter.emit('setTheme', theme); 手动更改主题
  useEffect(() => {
    const event = DeviceEventEmitter.addListener('setTheme', (value: string) => {
      setTheme(value);
    });
    return () => {
      event.remove();
    };
  });

  //如果需要监听系统深色模式更改，需要通过 ToolBox.addSystemThemeChangedListener 监听事件
  useEffect(() => {
    const event = ToolBox.addSystemThemeChangedListener((themeNow) => {
      setTheme(themeNow);
    });
    return () => {
      event.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider theme={theme}>
          <ThemeRender>
            { /* 下面是应用内容，Demo 中使用了 react-navigation，所以需要特殊处理 */ }
            {(themeNow) => <NavigationContainer theme={{
              //如果你使用了 react-navigation ，需要对他的样式特殊处理
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
              {/* 状态栏的颜色处理 */}
              <StatusBar barStyle={themeNow === 'dark' ? 'light-content' : 'dark-content'} />
              {/* 下面是你的应用内容 */}
              <TestAppNav />
            </NavigationContainer>}
          </ThemeRender>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
```

## 主题变量系统

主题支持动态变量，这些动态变量用于控制组件的样式与细节（类似CSS中的var），组件库内的大部分组件都支持动态变量，你可以在 `Provider` 中指定变量的值，子组件会找寻离自己最近的一个 `Provider` 的变量值。

每一个组件文档下方都有它所支持的变量名称与默认值。

### 设置子组件变量

例如，下方案例 `Provider` 中的 `Button` 组件会使用 `Provider` 所设置的变量值。

```jsx
<Provider 
  theme={theme}
  themeData={
    ButtonBorderWidth: 2,
    ButtonSmallFonstSize: 11
  }
>
  { /**子组件**/ }
</Provider>
```

### 自定义组件使用变量

您自己写的组件也可以使用主题变量系统，

#### 动态主题变量

你可以使用 `useThemeContext` 函数获取当前主题上下文，这其中包含了有关于主题的全部功能。

* resolveThemeColor 根据当前主题选择*颜色对象*对应主题的颜色
* getThemeVar 获取主题变量
* getThemeColorVar 获取主题的*颜色对象*变量并根据当前主题选择对应颜色，相当于 resolveThemeColor(getThemeVar())

```tsx
//在组件中使用
const themeContext = useThemeContext();

//处理主题颜色
const themedColor = themeContext.resolveThemeColor(color);
//获取主题变量，如果没有 Provider 手动指定，则使用默认值
const themedFontSize = themeContext.getThemeVar('ButtonMiniFonstSize', 10.5);
//获取主题的颜色对象变量，如果没有 Provider 手动指定，则使用默认值
const themedVarColor = themeContext.getThemeColorVar(color, Color.white);

```

#### 动态主题样式

你可以在样式中使用 `DynamicVar`、`DynamicColorVar` 来把一个属性声明为动态主题样式，这有些类似CSS中的 `var`，你只需要使用 useThemeStyles 将其转为动态主题样式即可使用。

```tsx
const styles = StyleSheet.create({
  textStyle: {
    fontSize: DynamicVar('MyTextFontSize', 15),
    color: DynamicColorVar('MyTextColor', Color.text),
  },
});

function MyText(props: MyTextProps) {
  const themeContext = useThemeContext();
  //将样式转为动态主题样式
  const themeStyles = useThemeStyles(styles);

  //样式使用还是像正常一样使用
  return (
    <Text style={themeStyles.textStyle}>{ props.text }</Text>
  );
}

```
