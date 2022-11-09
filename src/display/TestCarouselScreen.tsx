import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from '@imengyu-ui-lib-debug';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { deviceWidth, WhiteSpace, DotIndicator } from '@imengyu-ui-lib-debug';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestCarousel'>;

const styles = StyleSheet.create({
  topCarousel: {
    marginTop: 15,
    zIndex: 10,
  },
  topCarouselItemImage: {
    width: deviceWidth - 30,
    height: 200,
    borderRadius: 10,
  },
  topCarouselItemImage2: {
    width: deviceWidth,
    height: 200,
  },
});

interface HerbalHomeCarouselItem {
  src: string
}
interface TopViewState {
  topCarouselItems: HerbalHomeCarouselItem[],
  topCarouselCurrentIndex: number,
}

export class TestCarouselScreen extends React.PureComponent<Props, TopViewState> {

  state = {
    topCarouselItems: [
      { src: 'https://imengyu.top/assets/images/test/1.jpg' },
      { src: 'https://imengyu.top/assets/images/test/2.jpg' },
      { src: 'https://imengyu.top/assets/images/test/3.jpg' },
      { src: 'https://imengyu.top/assets/images/test/1.jpg' },
      { src: 'https://imengyu.top/assets/images/test/2.jpg' },
    ],
    topCarouselCurrentIndex: 0,
  };

  render(): React.ReactNode {
    return (
      <GestureHandlerRootView>
        <ScrollView>
          <ColumnView center style={{ padding: 10 }}>
            <DotIndicator size={10} count={this.state.topCarouselItems.length} currentIndex={this.state.topCarouselCurrentIndex} />

            <WhiteSpace size="lg" />

          </ColumnView>
        </ScrollView>
      </GestureHandlerRootView>
    );
  }
}

