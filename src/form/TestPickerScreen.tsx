import React from 'react';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup, Cell, Toast, ColumnView } from '../lib';
import { RootStackParamList } from '../navigation';
import StringTools from '../utils/StringTools';
import { Picker } from '../../lib/src/components/picker';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestPicker'>;

export class TestPickerScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Native Picker 选择器"
          desc="原生实现的选择器，仅支持函数调用。"
          navigation={this.props.navigation}
        />
        <ColumnView center>
          <CellGroup title="基础用法" inset>
            <Cell title="选择日期" showArrow onPress={() => {
              Picker.showTimePickerView({
                type: Picker.TimePickerTypeDate,
              }, (time) => {
                Toast.info('选择了' + StringTools.formatTime(time));
              }, () => Toast.info('取消选择'));
            }} />
            <Cell title="选择时间" showArrow onPress={() => {
              Picker.showTimePickerView({
                type: Picker.TimePickerTypeTime,
              }, (time) => {
                Toast.info('选择了' + StringTools.formatTime(time));
              }, () => Toast.info('取消选择'));
            }} />
            <Cell title="选择日期和时间" showArrow onPress={() => {
              Picker.showTimePickerView({
                type: Picker.TimePickerTypeAll,
              }, (time) => {
                Toast.info('选择了' + StringTools.formatTime(time));
              }, () => Toast.info('取消选择'));
            }} />
            <Cell title="选择选项" showArrow onPress={() => {
              const options = [
                { label: '苹果', value: '1'},
                { label: '香蕉', value: '2'},
                { label: '橘子', value: '3'},
                { label: '葡萄', value: '4'},
                { label: '菠萝', value: '5'},
              ];
              Picker.showOptionsPickerView({
                nPicker: [ options ],
              }, (i, j) => {
                Toast.info('选择了 ' + j.join(''));
              }, () => Toast.info('取消选择'));
            }} />
            <Cell title="选择农历日期" showArrow onPress={() => {
              Picker.showTimePickerView({
                lunarCalendar: true,
                type: Picker.TimePickerTypeDate,
              }, (time) => {
                Toast.info('选择了' + StringTools.formatTime(time));
              }, () => Toast.info('取消选择'));
            }} />
            <Cell title="选择地址" showArrow onPress={() => {
              Picker.showAddressPickerView({
                intitalAddress: '浙江省 衢州市 柯城区',
              }, (province, city, district) => {
                Toast.info(`选择了 ${province} ${city} ${district}`);
              }, () => Toast.info('取消选择'));
            }} />
            <Cell title="联动数据" showArrow onPress={() => {
              const options = [
                { label: '水果', value: '1'},
                { label: '食品', value: '2'},
              ];
              const options2 = [
                [
                  { label: '苹果', value: '1-1'},
                  { label: '香蕉', value: '1-2'},
                  { label: '橘子', value: '1-3'},
                  { label: '葡萄', value: '1-4'},
                  { label: '菠萝', value: '1-5'},
                ],
                [
                  { label: '披萨', value: '2-1'},
                  { label: '汉堡', value: '2-2'},
                  { label: '薯条', value: '2-3'},
                  { label: '爆米花', value: '2-4'},
                ],
              ];
              Picker.showOptionsPickerView({
                picker: [ options, options2 ],
              }, (i, j) => {
                Toast.info('选择了 ' + j.join(' '));
              }, () => Toast.info('取消选择'));
            }} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

