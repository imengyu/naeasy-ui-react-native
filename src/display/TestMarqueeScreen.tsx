import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet } from 'react-native';
import { HorizontalScrollText, VerticalScrollTexts, VerticalScrollText } from '../lib';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestMarquee'>;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#f80',
  },
});

const texts = [
  '山有木兮木有枝，心悦君兮君不知。',
  '人生若只如初见，何事秋风悲画扇。',
  '大鹏一日同风起，扶摇直上九万里。',
];

export function TestMarqueeScreen(props: Props) {

  const [ valueTest, setValueTest ] = useState(999999);

  useEffect(() => {
    const timer = setInterval(() => {
      setValueTest(Math.random() * 999999);
    }, 1500);
    return () => {
      clearInterval(timer);
    };
  }, []);


  return (
    <ScrollView>
      <TestPageHeader
        title="Marquee 滚动文字"
        desc="一个可滚动的文字，分为垂直滚动和水平滚动，可用于其他需要文字滚动的组件中。"
        navigation={props.navigation}
      />

      <TestHeader desc="文字在超出宽度后水平滚动。">水平滚动文字</TestHeader>
      <TestGroup>
        <HorizontalScrollText textStyle={styles.text}>季节在轮转，时间在前行，虽有不舍，但不忧伤，天气渐冷，草木枯黄，落叶落果，万物萧瑟。摒去浮华，天高地阔，安然静美。</HorizontalScrollText>
      </TestGroup>

      <TestHeader desc="文字垂直滚动切换。">垂直滚动文字</TestHeader>
      <TestGroup>
        <VerticalScrollTexts texts={texts} interval={2000} style={styles.text} />
      </TestGroup>

      <TestHeader desc="数字切换时，每个文字有不同的滚动方向动画。">数字切换滚动文字</TestHeader>
      <TestGroup>
        <VerticalScrollText numberString={valueTest.toFixed()} style={styles.text} />
      </TestGroup>
    </ScrollView>
  );
}

