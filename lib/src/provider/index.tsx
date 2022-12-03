import React, { useEffect, useState } from 'react';
import Portal from '../portal';
import { ThemeContext, ThemeContextData, ThemeType } from '../theme/Theme';
import { DynamicThemeStyleSheetVar } from '../styles';
import { DeviceEventEmitter } from 'react-native';

export interface ProviderProps {
  theme?: ThemeType;
  children: JSX.Element|JSX.Element[],
}

/**
 * imengyu-ui-lib 的全局 Provider，包括主题相关
 */
export function Provider(props: ProviderProps) {
  const {
    theme = 'light',
  } = props;

  const [ themeData, setThemeData ] = useState<ThemeContextData>({
    theme,
  });

  DynamicThemeStyleSheetVar.__theme = theme;

  useEffect(() => {
    const event = DeviceEventEmitter.addListener('notifyGlobalColorChanged', () => {
      DynamicThemeStyleSheetVar.__theme = theme;
      DynamicThemeStyleSheetVar.__globalColorChangeCount++;

      setThemeData({
        theme,
      });
    });
    return () => {
      event.remove();
    };
  }, [ theme ]);

  return (
    <ThemeContext.Provider value={themeData}>
      <Portal.Host>
        {props.children}
      </Portal.Host>
    </ThemeContext.Provider>
  );
}
