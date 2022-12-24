import React from 'react';
import StringTools from '../utils/StringTools';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup, Cell, ColumnView, Popup, Toast } from '../lib';
import { RootStackParamList } from '../navigation';
import { DatePicker, DateTimePicker, OptionsPicker, TimePicker } from '../../lib/src/components/form';
import { CascadeOptionsPicker } from '../../lib/src/components/form/CascadeOptionsPicker';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestFormPicker'>;

export class TestFormPicker extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center>
          <TestPageHeader
            title="Picker 选择器"
            desc="提供多个选项集合供用户选择，支持单列选择、多列选择和联动选择，通常与弹出层组件配合使用。"
            navigation={this.props.navigation}
          />
          <CellGroup title="基础用法" inset>
            <Cell title="DatePicker 选择日期" showArrow onPress={() => {
              Popup.show({
                position: 'bottom',
                onClose(returnData) {
                  if (returnData) {
                    Toast.text('选择日期结果：' +  StringTools.formatTime(returnData as Date));
                  }
                },
                renderContent: Popup.wrapperSimpleValueControl(DatePicker, '选择日期', new Date()),
              });
            }} />
            <Cell title="TimePicker 选择时间" showArrow onPress={() => {
              Popup.show({
                position: 'bottom',
                onClose(returnData) {
                  if (returnData) {
                    Toast.text('选择时间结果：' +  StringTools.formatTime(returnData as Date));
                  }
                },
                renderContent: Popup.wrapperSimpleValueControl(TimePicker, '选择时间', [ 12, 0, 0 ]),
              });
            }} />
            <Cell title="DateTimePicker 选择日期+时间" showArrow onPress={() => {
              Popup.show({
                position: 'bottom',
                onClose(returnData) {
                  if (returnData) {
                    Toast.text('选择日期+时间结果：' +  StringTools.formatTime(returnData as Date));
                  }
                },
                renderContent: Popup.wrapperSimpleValueControl(DateTimePicker, '选择时间', new Date()),
              });
            }} />
            <Cell title="OptionsPicker 选择单列选项" showArrow onPress={() => {
              Popup.show({
                position: 'bottom',
                onClose(returnData) {
                  if (returnData) {
                    Toast.text('选择选项结果：' +  returnData);
                  }
                },
                renderContent: Popup.wrapperSimpleValueControl(OptionsPicker, '选择选项', [ 0 ], {
                  options: [
                    [
                      { label: '苹果', value: '1'},
                      { label: '香蕉', value: '2'},
                      { label: '橘子', value: '3'},
                      { label: '葡萄', value: '4'},
                      { label: '菠萝', value: '5'},
                    ],
                  ],
                }),
              });
            }} />
            <Cell title="OptionsPicker 选择多列选项" showArrow onPress={() => {
              Popup.show({
                position: 'bottom',
                onClose(returnData) {
                  if (returnData) {
                    Toast.text('选择选项结果：' +  returnData);
                  }
                },
                renderContent: Popup.wrapperSimpleValueControl(OptionsPicker, '选择选项', [ 0, 0 ], {
                  options: [
                    [
                      { label: '苹果', value: '1'},
                      { label: '香蕉', value: '2'},
                      { label: '橘子', value: '3'},
                      { label: '葡萄', value: '4'},
                      { label: '菠萝', value: '5'},
                    ],
                    [
                      { label: '1斤', value: '1'},
                      { label: '2斤', value: '2'},
                      { label: '3斤', value: '3'},
                      { label: '4斤', value: '4'},
                      { label: '5斤', value: '5'},
                    ],
                  ],
                }),
              });
            }} />
            <Cell title="CascadePickerWhellView 选择联动选项" showArrow onPress={() => {
              Popup.show({
                position: 'bottom',
                onClose(returnData) {
                  if (returnData) {
                    Toast.text('选择联动选项结果：' +  returnData);
                  }
                },
                renderContent: Popup.wrapperSimpleValueControl(CascadeOptionsPicker, '选择联动选项', [ 0, 0 ], {
                  options: [
                    { parentValue: null, label: '水果', value: '1' },
                    { parentValue: null, label: '食品', value: '2' },
                    { parentValue: null, label: '厨具', value: '3' },
                    { parentValue: null, label: '家具', value: '4' },
                    { parentValue: '1', label: '苹果', value: '1-1' },
                    { parentValue: '1', label: '香蕉', value: '1-2' },
                    { parentValue: '1', label: '橘子', value: '1-3' },
                    { parentValue: '1', label: '葡萄', value: '1-4' },
                    { parentValue: '1', label: '菠萝', value: '1-5' },
                    { parentValue: '2', label: '披萨', value: '2-1' },
                    { parentValue: '2', label: '汉堡', value: '2-2' },
                    { parentValue: '2', label: '薯条', value: '2-3' },
                    { parentValue: '2', label: '爆米花', value: '2-4' },
                    { parentValue: '3', label: '炒锅', value: '3-1' },
                    { parentValue: '3', label: '锅铲', value: '3-2' },
                    { parentValue: '3', label: '菜刀', value: '3-3' },
                    { parentValue: '4', label: '沙发', value: '4-1' },
                    { parentValue: '4', label: '椅子', value: '4-2' },
                    { parentValue: '4', label: '衣柜', value: '4-3' },
                    { parentValue: '4', label: '茶几', value: '4-4' },
                    { parentValue: '4', label: '书桌', value: '4-5' },
                  ],
                }),
              });
            }} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

