import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { Text, ColumnView, CellGroup, Cell, XBarSpace, WhiteSpace, A } from './lib';
import { RootStackParamList } from './navigation';

type Props = StackScreenProps<RootStackParamList, 'Components'>;

export class TestAppHome extends React.Component<Props> {
  render() {
    return (
      <ScrollView>
        <ColumnView flex={1}>
          <CellGroup inset>
            <ColumnView padding={10}>
              <Text size={30} weight="bold">NaEasy UI</Text>
              <Text>NaEasy UI</Text>
              <A href="https://github.com/imengyu/imengyu-ui-lib">https://github.com/imengyu/imengyu-ui-lib</A>
            </ColumnView>
          </CellGroup>
          <CellGroup inset title="暗黑模式">
            <Cell title="暗黑模式" touchable showArrow onPress={() => this.props.navigation.push('TestTheme')} />
          </CellGroup>
          <CellGroup inset title="基础组件">
            <Cell title="Typography 段落" touchable showArrow onPress={() => this.props.navigation.push('TestTypography')} />
            <Cell title="Button 按钮组件" touchable showArrow onPress={() => this.props.navigation.push('TestButton')} />
            <Cell title="Cell 单元格组件" touchable showArrow onPress={() => this.props.navigation.push('TestCell')} />
            <Cell title="Icon 图标组件" touchable showArrow onPress={() => this.props.navigation.push('TestIcon')} />
            <Cell title="Image 图片组件" touchable showArrow onPress={() => this.props.navigation.push('TestImage')} />
          </CellGroup>
          <CellGroup inset title="布局组件">
            <Cell title="Flex 布局组件" touchable showArrow onPress={() => this.props.navigation.push('TestLayout')} />
            <Cell title="Layout 布局组件" touchable showArrow onPress={() => this.props.navigation.push('TestLayout2')} />
            <Cell title="Grid 宫格组件" touchable showArrow onPress={() => this.props.navigation.push('TestGrid')} />
            <Cell title="WhiteSpace 上下留白" touchable showArrow onPress={() => this.props.navigation.push('TestWhiteSpace')} />
            <Cell title="WingBlank 两翼留白" touchable showArrow onPress={() => this.props.navigation.push('TestWingBlank')} />
          </CellGroup>
          <CellGroup inset title="表单组件">
            <Cell title="CheckBox 组件" touchable showArrow onPress={() => this.props.navigation.push('TestCheck')} />
            <Cell title="Field 组件" touchable showArrow onPress={() => this.props.navigation.push('TestField')} />
            <Cell title="Form 表单" touchable showArrow onPress={() => this.props.navigation.push('TestForm')} />
            <Cell title="NumberInput " touchable showArrow onPress={() => this.props.navigation.push('TestNumberInput')} />
            <Cell title="NumberKeyBoard 数字键盘" touchable showArrow onPress={() => this.props.navigation.push('TestNumberKeyBoard')} />
            <Cell title="PlateKeyBoard 车牌号键盘" touchable showArrow onPress={() => this.props.navigation.push('TestPlateKeyBoard')} />
            <Cell title="Picker 组件" touchable showArrow onPress={() => this.props.navigation.push('TestPicker')} />
            <Cell title="PickerWhellView 组件" touchable showArrow onPress={() => this.props.navigation.push('TestPickerWhellView')} />
            <Cell title="Radio 组件" touchable showArrow onPress={() => this.props.navigation.push('TestRadio')} />
            <Cell title="Rate 组件" touchable showArrow onPress={() => this.props.navigation.push('TestRate')} />
            <Cell title="SearchBar 组件" touchable showArrow onPress={() => this.props.navigation.push('TestSearchBar')} />
            <Cell title="Slider 组件" touchable showArrow onPress={() => this.props.navigation.push('TestSlider')} />
            <Cell title="Stepper 组件" touchable showArrow onPress={() => this.props.navigation.push('TestStepper')} />
            <Cell title="Switch 组件" touchable showArrow onPress={() => this.props.navigation.push('TestSwitch')} />
          </CellGroup>
          <CellGroup inset title="展示组件">
            <Cell title="AvatarStack 头像组组件" touchable showArrow onPress={() => this.props.navigation.push('TestAvatarStack')} />
            <Cell title="Badge 徽标组件" touchable showArrow onPress={() => this.props.navigation.push('TestBadge')} />
            <Cell title="CountDown 倒计时" touchable showArrow onPress={() => this.props.navigation.push('TestCountDown')} />
            <Cell title="CountTo 数字滚动" touchable showArrow onPress={() => this.props.navigation.push('TestCountTo')} />
            <Cell title="Divider 分割线组件" touchable showArrow onPress={() => this.props.navigation.push('TestDivider')} />
            <Cell title="[未完成] DropdownMenu 下拉菜单" touchable showArrow onPress={() => this.props.navigation.push('TestDropdownMenu')} />
            <Cell title="[未完成] Collapse 可折叠组件" touchable showArrow onPress={() => this.props.navigation.push('TestCollapse')} />
            <Cell title="[未完成] Carousel 轮播组件" touchable showArrow onPress={() => this.props.navigation.push('TestCarousel')} />
            <Cell title="NoticeBar 组件" touchable showArrow onPress={() => this.props.navigation.push('TestNoticeBar')} />
            <Cell title="Progress 进度条" touchable showArrow onPress={() => this.props.navigation.push('TestProgress')} />
            <Cell title="SimpleList 简单列表" touchable showArrow onPress={() => this.props.navigation.push('TestSimpleList')} />
            <Cell title="Sidebar 侧边导航" touchable showArrow onPress={() => this.props.navigation.push('TestSideBar')} />
            <Cell title="[未完成] Skeleton 骨架屏" touchable showArrow onPress={() => this.props.navigation.push('TestSkeleton')} />
            <Cell title="Step 步骤条组件" touchable showArrow onPress={() => this.props.navigation.push('TestStep')} />
            <Cell title="SwipeableRow 组件" touchable showArrow onPress={() => this.props.navigation.push('TestSwipeableRow')} />
            <Cell title="Tag 标签组件" touchable showArrow onPress={() => this.props.navigation.push('TestTag')} />
          </CellGroup>
          <CellGroup inset title="导航组件">
            <Cell title="IndexedList 索引列表" touchable showArrow onPress={() => this.props.navigation.push('TestIndexedList')} />
            <Cell title="NavBar 导航栏" touchable showArrow onPress={() => this.props.navigation.push('TestNavBar')} />
            <Cell title="Pagination 分页组件" touchable showArrow onPress={() => this.props.navigation.push('TestPagination')} />
            <Cell title="SegmentedControl 分段器组件" touchable showArrow onPress={() => this.props.navigation.push('TestSegmentedControl')} />
            <Cell title="Tabbar 底部标签栏" touchable showArrow onPress={() => this.props.navigation.push('TestTabBar')} />
            <Cell title="Tabs 标签页组件" touchable showArrow onPress={() => this.props.navigation.push('TestTabs')} />
          </CellGroup>
          <CellGroup inset title="媒体组件">
            <Cell title="ImagePreview 图片预览" touchable showArrow onPress={() => this.props.navigation.push('TestImagePreview')} />
            <Cell title="ImagePicker 图片选择组件" touchable showArrow onPress={() => this.props.navigation.push('TestImagePicker')} />
          </CellGroup>
          <CellGroup inset title="反馈组件">
            <Cell title="原生 Alert/ActionSheet " touchable showArrow onPress={() => this.props.navigation.push('TestAlert')} />
            <Cell title="ActionSheet " touchable showArrow onPress={() => this.props.navigation.push('TestActionSheet')} />
            <Cell title="Dialog " touchable showArrow onPress={() => this.props.navigation.push('TestDialog')} />
            <Cell title="Empty 空状态组件" touchable showArrow onPress={() => this.props.navigation.push('TestEmpty')} />
            <Cell title="ErrorBoundary 错误捕获" touchable showArrow onPress={() => this.props.navigation.push('TestErrorBoundary')} />
            <Cell title="Notify 通知" touchable showArrow onPress={() => this.props.navigation.push('TestNotify')} />
            <Cell title="Overlay 遮罩层" touchable showArrow onPress={() => this.props.navigation.push('TestOverlay')} />
            <Cell title="Popup 弹出层" touchable showArrow onPress={() => this.props.navigation.push('TestPopup')} />
            <Cell title="Result 结果" touchable showArrow onPress={() => this.props.navigation.push('TestResult')} />
            <Cell title="Toast 轻提示" touchable showArrow onPress={() => this.props.navigation.push('TestToast')} />
          </CellGroup>
        </ColumnView>
        <WhiteSpace />
        <XBarSpace />
      </ScrollView>
    );
  }
}

