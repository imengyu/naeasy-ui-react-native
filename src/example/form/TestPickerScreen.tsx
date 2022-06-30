import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView } from '../../components/layout/ColumnView';
import { CellGroup } from '../../components/CellGroup';
import { ScrollView } from 'react-native-gesture-handler';
import { Cell } from '../../components/Cell';
import Picker from '../../components/picker/Picker';
import Toast from '../../components/Toast';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestPicker'>;

export class TestPickerScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center style={{ padding: 10 }}>
          <CellGroup title="基础用法" inset>
            <Cell title="选择日期" showArrow onPress={() => {
              Picker.showTimePickerView({
                type: Picker.TimePickerTypeDate,
              }, (time) => {
                Toast.info('选择了' + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate());
              }, () => Toast.info('取消选择'));
            }} />
            <Cell title="选择时间" showArrow onPress={() => {
              Picker.showTimePickerView({
                type: Picker.TimePickerTypeTime,
              }, (time) => {
                Toast.info('选择了' + time.getHours() + ':' + time.getMinutes());
              }, () => Toast.info('取消选择'));
            }} />
            <Cell title="选择日期和时间" showArrow onPress={() => {
              Picker.showTimePickerView({
                type: Picker.TimePickerTypeAll,
              }, (time) => {
                Toast.info('选择了' + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes());
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
                Toast.info('选择了' + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate());
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

