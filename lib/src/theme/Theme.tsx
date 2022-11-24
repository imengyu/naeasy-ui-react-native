import React from "react";

/**
 * 全局的主题上下文
 */
export const ThemeContext = React.createContext('');

export type ThemeType = 'light'|'dark'|string;

/**
 * 提供一个包装组件，允许渲染时获取主题的值
 */
export function ThemeRender(props: {
  children: (theme: ThemeType) => JSX.Element|JSX.Element[],
}) {
  return (
    <ThemeContext.Consumer>
      {value => props.children(value as ThemeType)}
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
