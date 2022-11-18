import React from 'react';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup, Cell, Toast, ColumnView } from '../lib';
import { RootStackParamList } from '../navigation';
import StringTools from '../utils/StringTools';
import { TestStyles } from '../styles/TestStyles';
import { Picker } from '../../lib/src/components/picker';

type Props = StackScreenProps<RootStackParamList, 'TestPicker'>;

export class TestPickerScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center style={TestStyles.PaddingH}>
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
              const options = [ '苹果', '香蕉', '橘子', '葡萄', '菠萝' ];
              Picker.showOptionsPickerView<string>({
                nPicker: [ options ],
              }, (i) => {
                Toast.info('选择了 ' + options[i]);
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
              const options = [ '水果', '食品' ];
              const options2 = [
                [ '苹果', '香蕉', '橘子', '葡萄', '菠萝' ],
                [ '披萨', '汉堡', '薯条', '爆米花' ],
              ];
              Picker.showOptionsPickerView({
                picker: [ options, options2 ],
              }, (i, j) => {
                Toast.info('选择了 ' + options[i] + ' ' + options2[i][j]);
              }, () => Toast.info('取消选择'));
            }} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

