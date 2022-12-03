import React, { useContext } from "react";


export interface ThemeContextData {
  /**
   * 当前的主题
   */
  theme: ThemeType;
  /**
   * 全局数据
   */
  themeData: Record<string, unknown>;
  /**
   * 设置当前的主题
   */
  setTheme: (theme: ThemeType) => void;
}
export type ThemeType = 'light'|'dark'|string;

//Context 定义
//=======================================

/**
 * 全局的主题上下文
 */
export const ThemeContext = React.createContext<ThemeContextData>({
  theme: 'light',
  themeData: {},
  setTheme: () => console.warn('No data provider, Did you add Provider component in your root?'),
});

/**
 * useContext(ThemeContext) 的简写
 */
export const useThemeContext = () => useContext(ThemeContext);


//组件
//=======================================

/**
 * 提供一个包装组件，允许渲染时获取主题的值
 */
export function ThemeRender(props: {
  children: (theme: ThemeType, data: ThemeContextData) => JSX.Element|JSX.Element[],
}) {
  return (
    <ThemeContext.Consumer>
      {value => props.children(value.theme, value)}
    </ThemeContext.Consumer>
  );
}
/**
 * 包装高阶组件，使这个组件在主题更新后刷新
 */
export function ThemeWrapper<P extends {}>(component: React.ComponentClass<P, any>|React.FunctionComponent<P>|((props: P) => JSX.Element)) : (p: P) => JSX.Element {
  return ((props: unknown) => (
    <ThemeContext.Consumer>
      { () => React.createElement<P>(component as React.FunctionComponent<P>, props as P) }
    </ThemeContext.Consumer>
  ));
}
