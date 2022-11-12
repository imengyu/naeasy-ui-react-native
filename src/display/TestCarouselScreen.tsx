import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { ColumnView, WhiteSpace, DotIndicator } from '../../lib/src/index';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestCarousel'>;

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

