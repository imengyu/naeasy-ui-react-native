import React, { useCallback, useEffect, useRef, useState } from 'react';
import Portal from '../portal';
import { ThemeContext, ThemeContextData, ThemeType } from '../theme/Theme';
import { DynamicThemeStyleSheetVar } from '../styles';
import { DeviceEventEmitter } from 'react-native';

export interface ProviderProps {
  theme?: ThemeType;
  children: JSX.Element|JSX.Element[],
}

/**
 * 全局 Provider，包括主题相关配置
 */
export function Provider(props: ProviderProps) {
  const {
    theme = 'light',
  } = props;

  DynamicThemeStyleSheetVar.__theme = theme;

  //全局样式数据
  const themeData = useRef<Record<string, unknown>>({});
  //传递数据
  const [ themeContextData, setThemeContextData ] = useState<ThemeContextData>({
    theme,
    themeData: themeData.current,
    setTheme: (u) => setTheme(u),
  });

  //设置当前的主题
  const setTheme = useCallback((themeNow: ThemeType) => {
    setThemeContextData({
      theme: themeNow,
      themeData: themeData.current,
      setTheme,
    });
  }, []);

  //外部传入theme更改
  useEffect(() => {
    DynamicThemeStyleSheetVar.__theme = theme;
    setTheme(theme);
  }, [ setTheme, theme ]);

  //用于监听颜色配置更改
  useEffect(() => {
    const event = DeviceEventEmitter.addListener('notifyGlobalColorChanged', () => {
      DynamicThemeStyleSheetVar.__theme = theme;
      DynamicThemeStyleSheetVar.__globalColorChangeCount++;
      setTheme(theme);
    });
    return () => {
      event.remove();
    };
  }, [ setTheme, theme ]);

  return (
    <ThemeContext.Provider value={themeContextData}>
      <Portal.Host>
        {props.children}
      </Portal.Host>
    </ThemeContext.Provider>
  );
}
