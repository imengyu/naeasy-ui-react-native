import React from 'react';
import { WhiteSpace } from 'imengyu-ui-lib';
import { Text } from 'react-native';
import { ColumnView } from 'imengyu-ui-lib';
import { CellGroup } from 'imengyu-ui-lib';
import { Cell } from 'imengyu-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParamList } from './navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { XBarSpace } from 'imengyu-ui-lib';

type Props = StackScreenProps<RootStackParamList, 'Components', 'RootStack'>;

export class TestAppHome extends React.Component<Props> {
  render() {
    return (
      <ScrollView>
        <ColumnView flex={1}>
          <CellGroup inset>
            <ColumnView padding={10}>
              <Text>组件使用示例，标记了🧭是第三方库实现的组件</Text>
            </ColumnView>
          </CellGroup>
          <CellGroup inset title="基础组件">
            <Cell title="Typography 段落示例" touchable showArrow onPress={() => this.props.navigation.push('TestTypography')} />
            <Cell title="Button 按钮组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestButton')} />
            <Cell title="Cell 单元格组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestCell')} />
            <Cell title="Icon 图标组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestIcon')} />
            <Cell title="Image 图片组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestImage')} />
            <Cell title="Grid 宫格组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestGrid')} />
            <Cell title="Layout 布局组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestLayout')} />
          </CellGroup>
          <CellGroup inset title="表单组件">
            <Cell title="CheckBox 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestCheck')} />
            <Cell title="Field 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestField')} />
            <Cell title="Form 表单示例" touchable showArrow onPress={() => this.props.navigation.push('TestForm')} />
            <Cell title="NumberInput 示例" touchable showArrow onPress={() => this.props.navigation.push('TestNumberInput')} />
            <Cell title="Picker 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestPicker')} />
            <Cell title="PickerWhellView 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestPickerWhellView')} />
            <Cell title="Radio 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestRadio')} />
            <Cell title="Rate 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestRate')} />
            <Cell title="SearchBar 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestSearchBar')} />
            <Cell title="Slider 组件示例 [🧭]" touchable showArrow onPress={() => this.props.navigation.push('TestSlider')} />
            <Cell title="Stepper 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestStepper')} />
            <Cell title="Switch 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestSwitch')} />
          </CellGroup>
          <CellGroup inset title="展示组件">
            <Cell title="Badge 徽标组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestBadge')} />
            <Cell title="Divider 分割线组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestDivider')} />
            <Cell title="Collapse 可折叠组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestCollapse')} />
            <Cell title="Carousel 轮播组件示例 [🧭]" touchable showArrow onPress={() => this.props.navigation.push('TestCarousel')} />
            <Cell title="Pagination 分页组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestPagination')} />
            <Cell title="NoticeBar 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestNoticeBar')} />
            <Cell title="Progress 进度条示例" touchable showArrow onPress={() => this.props.navigation.push('TestProgress')} />
            <Cell title="SegmentedControl 分段器组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestSegmentedControl')} />
            <Cell title="SwipeableRow 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestSwipeableRow')} />
            <Cell title="Tag 标签组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestTag')} />
          </CellGroup>
          <CellGroup inset title="反馈组件">
            <Cell title="原生 Alert/ActionSheet 示例" touchable showArrow onPress={() => this.props.navigation.push('TestAlert')} />
            <Cell title="ActionSheet 示例" touchable showArrow onPress={() => this.props.navigation.push('TestActionSheet')} />
            <Cell title="Dialog 示例" touchable showArrow onPress={() => this.props.navigation.push('TestDialog')} />
            <Cell title="Empty 空状态组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestEmpty')} />
            <Cell title="Popup 弹出层示例" touchable showArrow onPress={() => this.props.navigation.push('TestPopup')} />
            <Cell title="Toast 轻提示示例" touchable showArrow onPress={() => this.props.navigation.push('TestToast')} />
          </CellGroup>
          <CellGroup inset title="媒体">
            <Cell title="图片选择器示例 [🧭]" touchable showArrow onPress={() => this.props.navigation.push('TestImagePicker')} />
          </CellGroup>
          <CellGroup inset title="浏览器">
            <Cell title="WebView 示例 [🧭]" touchable showArrow onPress={() => this.props.navigation.push('TestWebView')} />
          </CellGroup>
        </ColumnView>
        <WhiteSpace />
        <XBarSpace />
      </ScrollView>
    );
  }
}

