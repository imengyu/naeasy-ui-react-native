import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from '../../components/layout/ColumnView';
import { CellGroup } from '../../components/CellGroup';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { RowView } from '../../components/layout/RowView';
import { Button } from '../../components/Button';
import Collapsible from '../../components/Collapsible';
import WingBlank from '../../components/wing-blank';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestCollapse', 'RootStack'>;
interface TestCollapseScreenState {
  isCollapsed: boolean,
  activeSections: number[],
  multipleSelect: boolean,
}


export class TestCollapseScreen extends React.PureComponent<Props, TestCollapseScreenState> {

  state: Readonly<TestCollapseScreenState> = {
    isCollapsed: false,
    activeSections: [],
    multipleSelect: false,
  };

  setSections = (sections: number[]) => {
    this.setState({
      activeSections: sections,
    });
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center style={{ padding: 10 }}>
          <CellGroup title="介绍" inset>
            <Text style={{ padding: 10 }}>将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。</Text>
          </CellGroup>
          <CellGroup title="基础用法" inset>
            <RowView style={{ padding: 10 }}>
              <Button text="展开" onPress={() => this.setState({ isCollapsed: false })} />
              <Button text="折叠" onPress={() => this.setState({ isCollapsed: true })} />
            </RowView>
            <Collapsible collapsed={this.state.isCollapsed}>
              <WingBlank size="sm">
                <Text>战式厂思省空面马六前，验领那际用层流，认支2头住吨需吼。 从克示种动口元，口力共众众，原H多清R。领事十火风张量少团较，六二做造识强等，道派B无标两育。 合目治中做图</Text>
              </WingBlank>
            </Collapsible>

          </CellGroup>
          <CellGroup title="手风琴组件TODO" inset>
            <Text style={{ padding: 10 }}>使用 Accordion 组件显示手风琴效果。</Text>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

