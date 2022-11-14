import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, CellGroup, Toast, PickerWhellView, CascadePickerWhellItem, CascadePickerWhellView } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestStyles } from '../styles/TestStyles';

type Props = StackScreenProps<RootStackParamList, 'TestPickerWhellView', 'RootStack'>;

export class TestPickerWhellViewScreen extends React.PureComponent<Props> {
  options = [ '苹果', '香蕉', '橘子', '葡萄', '菠萝' ];
  options2 = [ '周一', '周二', '周三', '周四', '周五' ];
  options3 = ['上午', '下午', '晚上'];
  options4 = [
    { label: '水果', value: 0 },
    { label: '食品', value: 1 },
    { label: '苹果', parentValue: 0, value: 2 },
    { label: '香蕉', parentValue: 0, value: 3 },
    { label: '橘子', parentValue: 0, value: 4 },
    { label: '葡萄', parentValue: 0, value: 5 },
    { label: '菠萝', parentValue: 0, value: 6 },
    { label: '披萨', parentValue: 1, value: 7 },
    { label: '汉堡', parentValue: 1, value: 8 },
    { label: '薯条', parentValue: 1, value: 9 },
    { label: '爆米花', parentValue: 1, value: 10 },
  ] as CascadePickerWhellItem[];

  render(): React.ReactNode {
    return (
      <ScrollView disableScrollViewPanResponder={true}>
        <ColumnView center style={TestStyles.PaddingH}>
          <CellGroup title="基础用法" inset>
            <PickerWhellView
              style={{ height: 200 }}
              options={[ this.options ]}
              selectedIndex={[ 1 ]}
              onValueChange={(sel) => {
                Toast.info('选择了 ' + this.options[sel[0]]);
              }}
            />
          </CellGroup>
          <CellGroup title="多列选择" inset>
            <PickerWhellView
              style={{ height: 200 }}
              options={[ this.options2, this.options3 ]}
              selectedIndex={[ 2, 1 ]}
              onValueChange={(e) => {
                Toast.info('选择了 ' + this.options2[e[0]] + ' ' + this.options3[e[1]]);
              }}
            />
          </CellGroup>
          <CellGroup title="级联选择" inset>
            <CascadePickerWhellView
              style={{ height: 200 }}
              options={this.options4}
              numberOfComponents={2}
              onValueChange={(e) => {
                Toast.info('选择了 ' + e[0].label + ' ' + e[1].label);
              }}
            />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

