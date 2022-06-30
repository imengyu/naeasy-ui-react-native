import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from '../../components/layout/ColumnView';
import { CellGroup } from '../../components/CellGroup';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { RowView } from '../../components/layout/RowView';
import { Color } from '../../styles/ColorStyles';
import WingBlank from '../../components/wing-blank';
import WhiteSpace from '../../components/white-space';
import { TestStyles } from '../styles/TestStyles';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestLayout'>;

const styles = StyleSheet.create({
  box: {
    width: 39,
    height: 39,
    backgroundColor: Color.primary,
    borderRadius: 10,
    margin: 5,
  },
  box2: {
    width: 39,
    height: 39,
    backgroundColor: Color.success,
    borderRadius: 10,
    margin: 5,
  },
  box3: {
    width: 39,
    height: 39,
    backgroundColor: Color.warning,
    borderRadius: 10,
    margin: 5,
  },
  box4: {
    height: 39,
    width: '100%',
    backgroundColor: Color.warning,
    borderRadius: 10,
    margin: 5,
  },
  box5: {
    height: 39,
    width: '100%',
    backgroundColor: Color.success,
    borderRadius: 10,
    margin: 5,
  },
  box6: {
    height: 39,
    width: '100%',
    backgroundColor: Color.danger,
    borderRadius: 10,
    margin: 5,
  },
  title: {
    backgroundColor: Color.warning,
    color: Color.white,
    padding: 5,
  },
});

export class TestLayoutScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center>
          <CellGroup title="ColumnView" inset>
            <Text style={TestStyles.TitleText}>ColumnView 是一个flex垂直方向的view。</Text>
            <ColumnView style={{ paddingVertical: 10 }}>
              <View style={styles.box} />
              <View style={styles.box2} />
              <View style={styles.box3} />
            </ColumnView>
          </CellGroup>
          <CellGroup title="RowView" inset>
            <Text style={TestStyles.TitleText}>RowView 是一个flex水平方向的view。</Text>
            <RowView style={{ paddingVertical: 10 }}>
              <View style={styles.box} />
              <View style={styles.box2} />
              <View style={styles.box3} />
            </RowView>
          </CellGroup>
          <CellGroup title="居中" inset>
            <Text style={TestStyles.TitleText}>设置 center 属性可以居中。</Text>
            <ColumnView center style={{ paddingVertical: 10 }}>
              <View style={styles.box} />
              <View style={styles.box2} />
              <View style={styles.box3} />
            </ColumnView>
          </CellGroup>
          <CellGroup title="换行" inset>
            <Text style={TestStyles.TitleText}>设置 wrap 属性可以换行。</Text>
            <RowView wrap style={{ paddingVertical: 10 }}>
              <View style={styles.box} />
              <View style={styles.box2} />
              <View style={styles.box3} />
              <View style={styles.box} />
              <View style={styles.box2} />
              <View style={styles.box3} />
              <View style={styles.box} />
              <View style={styles.box2} />
              <View style={styles.box3} />
            </RowView>
          </CellGroup>
          <CellGroup title="两翼留白" inset>
            <Text style={TestStyles.TitleText}>通过 WingBlank 组件两翼留白, 支持 lg/md/sm 或者是数字宽度 。</Text>
            <Text style={styles.title}>WingBlank lg</Text>
            <WingBlank size="lg">
              <Text>战式厂思省空面马六前，验领那际用层流，认支2头住吨需吼。 从克示种动口元，口力共众众，原H多清R。领事十火风张量少团较，六二做造识强等，道派B无标两育。 合目治中做图</Text>
            </WingBlank>
            <Text style={styles.title}>WingBlank md</Text>
            <WingBlank size="md">
              <Text>战式厂思省空面马六前，验领那际用层流，认支2头住吨需吼。 从克示种动口元，口力共众众，原H多清R。领事十火风张量少团较，六二做造识强等，道派B无标两育。 合目治中关空置场自把装转上，地命导反式中与，几半F呆看土助。 见月即事至听究地，入江记H两速。查少四老规影外公，方地更G集性。包，员能级干理达历中，很便F节府员里直。 业意量叫位美深J基。</Text>
            </WingBlank>
            <Text style={styles.title}>WingBlank sm</Text>
            <WingBlank size="sm">
              <Text>战式厂思省空面马六前，做造识强等，道派B无标两育。 合目治中做图是定，易斗必至听究地，入江记H两速。查少四老规影外公，方地更G集性。包，员能级干理达历中，很便F节府员里直。 业意量叫位美深J基。</Text>
            </WingBlank>
          </CellGroup>
          <CellGroup title="空白高度" inset>
            <Text style={TestStyles.TitleText}>通过 WhiteSpace 添加空白高度, 支持 lg/md/sm 或者是数字宽度 。</Text>
            <ColumnView wrap style={{ paddingVertical: 10 }}>
              <View style={styles.box4} />
              <View style={styles.box5} />
              <View style={styles.box6} />
              <WhiteSpace size="lg" />
              <View style={styles.box4} />
              <View style={styles.box5} />
              <WhiteSpace size="md" />
              <View style={styles.box6} />
              <View style={styles.box4} />
              <WhiteSpace size="sm" />
              <View style={styles.box5} />
              <View style={styles.box6} />
            </ColumnView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

