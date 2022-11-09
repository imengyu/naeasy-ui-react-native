import React from "react";

/**
 * 条件判断组件
 */
export function If(props: {
  condition: unknown,
  children: JSX.Element
}) {
  return props.condition ? props.children : <></>;
}
