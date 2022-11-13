import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, Text } from 'react-native';
import { CellGroup, Cell, Popup, Icon, Color, Button, ColumnView } from '../lib';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestPopup'>;

interface TestPopupScreenState {
  showProp1: boolean,
  showProp2: boolean,
  showProp3: boolean,
  showProp4: boolean,
  showProp5: boolean,
  showProp6: boolean,
  showProp7: boolean,
  showProp8: boolean,
  showProp9: boolean,
}

export class TestPopupScreen extends React.PureComponent<Props, TestPopupScreenState> {

  state: Readonly<TestPopupScreenState> = {
    showProp1: false,
    showProp2: false,
    showProp3: false,
    showProp4: false,
    showProp5: false,
    showProp6: false,
    showProp7: false,
    showProp8: false,
    showProp9: false,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center>
          <Popup
            show={this.state.showProp1}
            onClose={() => this.setState({ showProp1: false })}
            position="center"
            renderContent={() => (
              <ColumnView center style={{ padding: 10 }}>
                <Icon icon="success-filling" color={Color.success} size={50} />
                <Text>这个是弹出层自定义内容</Text>
                <Button text="关闭" onPress={() => this.setState({ showProp1: false }) } />
              </ColumnView>
            )}
          />
          <Popup
            show={this.state.showProp2}
            onClose={() => this.setState({ showProp2: false })}
            position="center"
            closeable
            renderContent={() => (
              <ColumnView center style={{ padding: 10 }}>
                <Icon icon="success-filling" color={Color.success} size={50} />
                <Text>这个是弹出层是可以点击遮罩和按扭关闭的</Text>
              </ColumnView>
            )}
          />
          <Popup
            show={this.state.showProp3}
            onClose={() => this.setState({ showProp3: false })}
            position="bottom"
            closeable
            renderContent={() => (
              <ColumnView center style={{ padding: 10 }}>
                <Icon icon="direction-up" color={Color.success} size={50} />
                <Text>底部弹出</Text>
              </ColumnView>
            )}
          />
          <Popup
            show={this.state.showProp4}
            onClose={() => this.setState({ showProp4: false })}
            position="top"
            closeable
            renderContent={() => (
              <ColumnView center style={{ padding: 10 }}>
                <Icon icon="direction-down" color={Color.success} size={50} />
                <Text>顶部弹出</Text>
              </ColumnView>
            )}
          />
          <Popup
            show={this.state.showProp5}
            onClose={() => this.setState({ showProp5: false })}
            position="left"
            closeable
            renderContent={() => (
              <ColumnView center style={{ padding: 10 }}>
                <Icon icon="direction-left" color={Color.success} size={50} />
                <Text>左侧弹出</Text>
              </ColumnView>
            )}
          />
          <Popup
            show={this.state.showProp6}
            onClose={() => this.setState({ showProp6: false })}
            position="right"
            closeable
            renderContent={() => (
              <ColumnView center style={{ padding: 10 }}>
                <Icon icon="direction-right" color={Color.success} size={50} />
                <Text>右侧弹出</Text>
              </ColumnView>
            )}
          />
          <Popup
            show={this.state.showProp7}
            onClose={() => this.setState({ showProp7: false })}
            position="bottom"
            closeable
            round
            renderContent={() => (
              <ColumnView center style={{ padding: 10 }}>
                <Icon icon="direction-up" color={Color.success} size={50} />
                <Text>圆角弹出层</Text>
              </ColumnView>
            )}
          />
          <Popup
            show={this.state.showProp8}
            onClose={() => this.setState({ showProp8: false })}
            position="top"
            closeable
            round
            renderContent={() => (
              <ColumnView center style={{ padding: 10 }}>
                <Icon icon="direction-down" color={Color.success} size={50} />
                <Text>圆角弹出层</Text>
              </ColumnView>
            )}
          />
          <Popup
            show={this.state.showProp9}
            onClose={() => this.setState({ showProp9: false })}
            position="bottom"
            closeable
            round
            mask={false}
            renderContent={() => (
              <ColumnView center style={{ padding: 10 }}>
                <Icon icon="direction-up" color={Color.success} size={50} />
                <Text>圆角弹出层</Text>
              </ColumnView>
            )}
          />

          <CellGroup title="基础用法" inset>
            <Cell title="普通弹出框，不可点击遮罩关闭" showArrow onPress={() => this.setState({ showProp1: true })} />
            <Cell title="弹出框，可点击遮罩关闭" showArrow onPress={() => this.setState({ showProp2: true })} />
          </CellGroup>
          <CellGroup title="弹出位置" inset>
            <Cell title="底部弹出" showArrow onPress={() => this.setState({ showProp3: true })} />
            <Cell title="顶部弹出" showArrow onPress={() => this.setState({ showProp4: true })} />
            <Cell title="左侧弹出" showArrow onPress={() => this.setState({ showProp5: true })} />
            <Cell title="右侧弹出" showArrow onPress={() => this.setState({ showProp6: true })} />
          </CellGroup>
          <CellGroup title="圆角弹出层" inset>
            <Text style={{ padding: 10 }}>设置 round 属性后，弹窗会根据弹出位置添加不同的圆角样式。</Text>
            <Cell title="底部弹出" showArrow onPress={() => this.setState({ showProp7: true })} />
            <Cell title="顶部弹出" showArrow onPress={() => this.setState({ showProp8: true })} />
          </CellGroup>
          <CellGroup title="无遮罩的弹出层" inset>
            <Text style={{ padding: 10 }}>无遮罩，可以操控下方组件。</Text>
            <Cell title="弹出" showArrow onPress={() => this.setState({ showProp9: true })} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

