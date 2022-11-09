import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaPaddingProps {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  children?: React.ReactNode;
}

/**
 * 安全区边距占位组件，使用 Padding
 */
export function SafeAreaPadding(props: SafeAreaPaddingProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      position: 'relative',
      flex: 1,
      paddingTop: props.top ? insets?.top : undefined,
      paddingBottom: props.bottom ? insets?.bottom : undefined,
      paddingLeft: props.left ? insets?.left : undefined,
      paddingRight: props.right ? insets?.right : undefined,
    }}>
      { props.children }
    </View>
  );
}
