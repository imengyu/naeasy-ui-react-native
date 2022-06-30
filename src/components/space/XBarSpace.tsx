import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * 底栏高度占位组件
 */
export function XBarSpace(_props: {}) {
  const insets = useSafeAreaInsets();
  return <View style={{ height: insets.bottom }}/>;
}
