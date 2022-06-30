import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaMarginProps {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  children?: React.ReactNode;
}

/**
 * 安全区边距占位组件，使用 Margin
 */
export function SafeAreaMargin(props: SafeAreaMarginProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      marginTop: props.top ? insets?.top : undefined,
      marginBottom: props.bottom ? insets?.bottom : undefined,
      marginLeft: props.left ? insets?.left : undefined,
      marginRight: props.right ? insets?.right : undefined,
    }}>
      { props.children }
    </View>
  );
}
