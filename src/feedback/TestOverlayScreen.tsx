import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, Image } from 'react-native';
import { CellGroup, Cell, Color, ColumnView, rpx } from '../lib';
import { RootStackParamList } from '../navigation';
import { Overlay } from '../../lib/src/components/dialog/Overlay';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestOverlay'>;

interface TestOverlayScreenState {
  showProp1: boolean,
  showProp2: boolean,
  showProp3: boolean,
}

export class TestOverlayScreen extends React.PureComponent<Props, TestOverlayScreenState> {

  state: Readonly<TestOverlayScreenState> = {
    showProp1: false,
    showProp2: false,
    showProp3: false,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView>
          <TestPageHeader
            title="Overlay 遮罩层"
            desc="创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。"
            navigation={this.props.navigation}
          />
          <Overlay
            show={this.state.showProp1}
            onClose={() => this.setState({ showProp1: false })}
          />
          <Overlay
            show={this.state.showProp2}
            onClose={() => this.setState({ showProp2: false })}
          >
            <ColumnView center>
              <Image
                source={require('../images/testDialog.png')}
                style={{ width: rpx(700), height: rpx(800) }}
              />
            </ColumnView>
          </Overlay>
          <Overlay
            show={this.state.showProp3}
            maskColor="rgba(2, 14, 244, 0.3)"
            onClose={() => this.setState({ showProp3: false })}
          >
            <ColumnView backgroundColor={Color.white} width={100} height={100} />
          </Overlay>

          <CellGroup title="基础用法" inset>
            <Cell title="基础遮罩" showArrow onPress={() => this.setState({ showProp1: true })} />
            <Cell title="嵌入内容" showArrow onPress={() => this.setState({ showProp2: true })} />
            <Cell title="自定义背景颜色" showArrow onPress={() => this.setState({ showProp3: true })} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

