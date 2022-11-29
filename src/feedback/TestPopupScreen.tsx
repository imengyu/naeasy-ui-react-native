import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { CellGroup, Cell, Popup, Icon, Color, Button, ColumnView, Text, WhiteSpace } from '../lib';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';

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
  showProp10: boolean,
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
    showProp10: false,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView>
          <TestPageHeader
            title="Popup 弹出层"
            desc="弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。"
            navigation={this.props.navigation}
          />
          <Popup
            show={this.state.showProp1}
            onClose={() => this.setState({ showProp1: false })}
            position="center"
            renderContent={() => (
              <ColumnView center style={{ padding: 30 }}>
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
              <ColumnView center style={{ padding: 30 }}>
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
              <ColumnView center style={{ padding: 30 }}>
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
              <ColumnView center style={{ padding: 30 }}>
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
              <ColumnView center style={{ padding: 30 }}>
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
              <ColumnView center style={{ padding: 30 }}>
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
              <ColumnView center style={{ padding: 30 }}>
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
              <ColumnView center style={{ padding: 30 }}>
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
              <ColumnView center style={{ padding: 30 }}>
                <Icon icon="direction-up" color={Color.success} size={50} />
                <Text>圆角弹出层</Text>
              </ColumnView>
            )}
          />

          <TestHeader>基础用法</TestHeader>
          <TestGroup noHorizontalPadding>
            <CellGroup inset>
              <Cell title="普通弹出框，不可点击遮罩关闭" showArrow onPress={() => this.setState({ showProp1: true })} />
              <Cell title="弹出框，可点击遮罩关闭" showArrow onPress={() => this.setState({ showProp2: true })} />
            </CellGroup>
          </TestGroup>

          <TestHeader desc="通过 position 属性设置弹出位置，默认居中弹出，可以设置为 top、bottom、left、right。">弹出位置</TestHeader>
          <TestGroup noHorizontalPadding>
            <CellGroup inset>
              <Cell title="底部弹出" showArrow onPress={() => this.setState({ showProp3: true })} />
              <Cell title="顶部弹出" showArrow onPress={() => this.setState({ showProp4: true })} />
              <Cell title="左侧弹出" showArrow onPress={() => this.setState({ showProp5: true })} />
              <Cell title="右侧弹出" showArrow onPress={() => this.setState({ showProp6: true })} />
            </CellGroup>
          </TestGroup>

          <TestHeader desc="设置 round 属性后，弹窗会根据弹出位置添加不同的圆角样式。">圆角弹出层</TestHeader>
          <TestGroup noHorizontalPadding>
            <CellGroup inset>
              <Cell title="底部弹出" showArrow onPress={() => this.setState({ showProp7: true })} />
              <Cell title="顶部弹出" showArrow onPress={() => this.setState({ showProp8: true })} />
            </CellGroup>
          </TestGroup>

          <TestHeader desc="无遮罩，可以操控下方组件。">无遮罩的弹出层</TestHeader>
          <TestGroup noHorizontalPadding>
            <CellGroup inset>
              <Cell title="弹出" showArrow onPress={() => this.setState({ showProp9: true })} />
            </CellGroup>
          </TestGroup>

          <WhiteSpace size={100} />
        </ColumnView>
      </ScrollView>
    );
  }
}

