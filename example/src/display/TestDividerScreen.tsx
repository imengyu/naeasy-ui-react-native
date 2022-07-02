import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { WhiteSpace, Divider, ColumnView, CellGroup, Color, RowView } from 'imengyu-ui-lib';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParamList } from '../navigation';
import { TestStyles } from '../styles/TestStyles';

type Props = StackScreenProps<RootStackParamList, 'TestDivider'>;
interface State {
  showTag: boolean
}

export class TestDividerScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    showTag: true,
  };

  render() {
    return (
      <ScrollView>
        <ColumnView center padding={10}>
          <CellGroup title="基础用法" inset>
            <Text style={TestStyles.TitleText}>通过 Divider 组件显示分割线。</Text>
            <ColumnView padding={10}>
              <Text>战式厂思省空面马六前，验领那际用层流，认支2头住吨需吼。 从克示种动口元，口力共众众，原H多清R。领事十火风张量少团较，六二做造识强等，道派B无标两育。 合目治中关空置场自把装转上，地命导反式中与，几半F呆看土助。 见月即事至听究地，入江记H两速。查少四老规影外公，方地更G集性。包，员能级干理达历中，很便F节府员里直。 业意量叫位美深J基。</Text>

              <Divider text="我是分割线" backgroundColor="#fff" />
              <Text>见月即事至听究地，入江记H两速。查少四老规影外公，方地更G集性。包，员能级干理达历中，很便F节府员里直。 业意量叫位美深J基。</Text>

              <Divider text="我是自定义高度的分割线" size={50} backgroundColor="#fff" />
              <Text>更G集性。包，员能级干理达历中，很便F节府员里直。 业意量叫位美深J基。</Text>

              <Divider />
              <Text>上面是不带文字的分割线。</Text>

              <WhiteSpace />
              <RowView>
                <Text>垂直的分割线(红色)</Text>
                <Divider type="vertical" color={Color.danger} />
                <Text>垂直的分割线</Text>
                <Divider type="vertical" />
                <Text>垂直的分割线</Text>
              </RowView>
            </ColumnView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

