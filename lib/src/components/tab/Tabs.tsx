import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import { BadgeProps } from '../display';

export interface TabsItemData {
  key: string,
  text: string,
  disabled?: boolean,
  badgeProps?: BadgeProps,
}
export interface TabsProps {
  tabs: TabsItemData[];
  width?: number, 
}

export function Tabs(props: TabsProps) {

  const scrollRef = useRef<ScrollView>(null);

  return (
    <ScrollView
      ref={}
      horizontal
    >

    </ScrollView>
  );
}
