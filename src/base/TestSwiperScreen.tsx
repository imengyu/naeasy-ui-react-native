import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Color, rpx } from '../lib';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';
import { Swiper, SwiperItem } from '../../lib/src/components/basic/Swiper';

type Props = StackScreenProps<RootStackParamList, 'TestSwiper'>;

const styles = StyleSheet.create({
  box1: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.success.light,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.warning.light,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    width: '100%',
    height: '100%',
    padding: 30,
    paddingHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: Color.success.light,
    color: 'white',
  },
  text2: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    backgroundColor: Color.warning.light,
    color: 'white',
  },
  swiper: {
    width: '100%',
    height: rpx(300),
    minHeight: rpx(300),
  },
});

export class TestSwiperScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Swiper 滑块视图容器"
          desc="支持左右滑动或者上下滑动，可作为轮播组件也可作为Tab容器组件。"
          navigation={this.props.navigation}
        />
        <TestHeader desc="">基础用法</TestHeader>
        <TestGroup>
          <Swiper style={styles.swiper}>
            <SwiperItem>
              <View style={styles.box1}>
                <Text>1</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box2}>
                <Text>2</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box1}>
                <Text>3</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box2}>
                <Text>4</Text>
              </View>
            </SwiperItem>
          </Swiper>
        </TestGroup>
        <TestHeader desc="设置 vertical=true 开启垂直滑块">垂直滑块</TestHeader>
        <TestGroup>
          <Swiper vertical style={styles.swiper}>
            <SwiperItem>
              <View style={styles.box1}>
                <Text>1</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box2}>
                <Text>2</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box1}>
                <Text>3</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box2}>
                <Text>4</Text>
              </View>
            </SwiperItem>
          </Swiper>
        </TestGroup>
        <TestHeader desc="设置 indicatorDots=true 开启底部指示器显示">显示指示器</TestHeader>
        <TestGroup>
          <Swiper indicatorDots style={styles.swiper}>
            <SwiperItem>
              <View style={styles.box1}>
                <Text>1</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box2}>
                <Text>2</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box1}>
                <Text>3</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box2}>
                <Text>4</Text>
              </View>
            </SwiperItem>
          </Swiper>
        </TestGroup>
        <TestHeader desc="设置 circular=true 开启衔接滚动">衔接滚动</TestHeader>
        <TestGroup>
          <Swiper circular indicatorDots style={styles.swiper}>
            <SwiperItem>
              <View style={styles.box1}>
                <Text>1</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box2}>
                <Text>2</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box1}>
                <Text>3</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box2}>
                <Text>4</Text>
              </View>
            </SwiperItem>
          </Swiper>
        </TestGroup>
        <TestHeader desc="设置 autoplay=true 与 interval 后，滑块将会自动切换，可用于轮播。">自动切换</TestHeader>
        <TestGroup>
          <Swiper indicatorDots autoplay interval={2000} style={styles.swiper}>
            <SwiperItem>
              <View style={styles.box1}>
                <Text>1</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box2}>
                <Text>2</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box1}>
                <Text>3</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box2}>
                <Text>4</Text>
              </View>
            </SwiperItem>
          </Swiper>
        </TestGroup>
        <TestHeader desc="设置 fadeIn=true 开启淡出淡入动画效果">淡出淡入</TestHeader>
        <TestGroup>
          <Swiper indicatorDots fadeIn={true} circular={true} style={styles.swiper}>
            <SwiperItem>
              <View style={styles.box3}>
                <Text style={styles.text1}>1</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box3}>
                <Text style={styles.text2}>2</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box3}>
                <Text style={styles.text1}>3</Text>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View style={styles.box3}>
                <Text style={styles.text2}>4</Text>
              </View>
            </SwiperItem>
          </Swiper>
        </TestGroup>
      </ScrollView>
    );
  }
}

