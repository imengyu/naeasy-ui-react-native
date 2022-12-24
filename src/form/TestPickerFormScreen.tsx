import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup, Cell, ColumnView, Popup, Toast } from '../lib';
import { RootStackParamList } from '../navigation';
import { DatePicker } from '../../lib/src/components/form';
import StringTools from '../utils/StringTools';

type Props = StackScreenProps<RootStackParamList, 'TestFormPicker'>;

export class TestFormPicker extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center>
          <CellGroup title="基础用法" inset>
            <Cell title="DatePicker 选择日期" showArrow onPress={() => {
              Popup.show({
                position: 'bottom',
                onClose(returnData) {
                  if (returnData) {
                    Toast.text('选择日期结果：' +  StringTools.formatTime(returnData as Date));
                  }
                },
                renderContent: Popup.wrapperControl((props) => {
                  const [ value, setVale ] = useState(new Date());
                  return (
                    <DatePicker
                      value={value}
                      onValueChange={(v) => {
                        setVale(v);
                        props.onChangeConfirmReturnData(v);
                      }}
                    />
                  );
                }, '选择日期'),
              });
            }} />
            <Cell title="选择时间" showArrow onPress={() => {
            }} />
            <Cell title="选择日期和时间" showArrow onPress={() => {
            }} />
            <Cell title="选择选项" showArrow onPress={() => {
            }} />
            <Cell title="选择农历日期" showArrow onPress={() => {
            }} />
            <Cell title="选择地址" showArrow onPress={() => {
            }} />
            <Cell title="联动数据" showArrow onPress={() => {
            }} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

