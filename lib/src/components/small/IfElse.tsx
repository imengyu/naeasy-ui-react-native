/**
 * 条件判断组件
 */
export function IfElse(props: {
  condition: boolean,
  children: JSX.Element,
  else: JSX.Element,
}) {
  return props.condition ? props.children : props.else;
}
