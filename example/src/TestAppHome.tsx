import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, ScrollView } from 'react-native';
import { ColumnView, CellGroup, Cell, XBarSpace, WhiteSpace } from 'imengyu-ui-lib';
import { RootStackParamList } from './navigation';

type Props = StackScreenProps<RootStackParamList, 'Components'>;

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
          </CellGroup>
          <CellGroup inset title="布局组件">
            <Cell title="Flex 布局组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestLayout')} />
            <Cell title="Layout 布局组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestLayout2')} />
            <Cell title="Grid 宫格组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestGrid')} />
            <Cell title="WhiteSpace 上下留白" touchable showArrow onPress={() => this.props.navigation.push('TestWhiteSpace')} />
            <Cell title="WingBlank 两翼留白" touchable showArrow onPress={() => this.props.navigation.push('TestWingBlank')} />
          </CellGroup>
          <CellGroup inset title="表单组件">
            <Cell title="CheckBox 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestCheck')} />
            <Cell title="Field 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestField')} />
            <Cell title="Form 表单示例" touchable showArrow onPress={() => this.props.navigation.push('TestForm')} />
            <Cell title="NumberInput 示例" touchable showArrow onPress={() => this.props.navigation.push('TestNumberInput')} />
            <Cell title="NumberKeyBoard 数字键盘示例" touchable showArrow onPress={() => this.props.navigation.push('TestNumberKeyBoard')} />
            <Cell title="Picker 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestPicker')} />
            <Cell title="PickerWhellView 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestPickerWhellView')} />
            <Cell title="Radio 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestRadio')} />
            <Cell title="Rate 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestRate')} />
            <Cell title="SearchBar 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestSearchBar')} />
            <Cell title="Slider 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestSlider')} />
            <Cell title="Stepper 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestStepper')} />
            <Cell title="Switch 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestSwitch')} />
          </CellGroup>
          <CellGroup inset title="展示组件">
            <Cell title="AvatarStack 头像组组件" touchable showArrow onPress={() => this.props.navigation.push('TestAvatarStack')} />
            <Cell title="Badge 徽标组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestBadge')} />
            <Cell title="CountDown 倒计时" touchable showArrow onPress={() => this.props.navigation.push('TestCountDown')} />
            <Cell title="CountTo 数字滚动" touchable showArrow onPress={() => this.props.navigation.push('TestCountTo')} />
            <Cell title="Divider 分割线组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestDivider')} />
            <Cell title="[TODO] DropdownMenu 下拉菜单" touchable showArrow onPress={() => this.props.navigation.push('TestDivider')} />
            <Cell title="[TODO 好难] Collapse 可折叠组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestCollapse')} />
            <Cell title="[TODO 好难] Carousel 轮播组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestCarousel')} />
            <Cell title="ImagePreview 图片预览" touchable showArrow onPress={() => this.props.navigation.push('TestImagePreview')} />
            <Cell title="[TODO] IndexBar 索引栏" touchable showArrow onPress={() => this.props.navigation.push('TestImagePreview')} />
            <Cell title="Pagination 分页组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestPagination')} />
            <Cell title="NavBar 导航栏" touchable showArrow onPress={() => this.props.navigation.push('TestNavBar')} />
            <Cell title="NoticeBar 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestNoticeBar')} />
            <Cell title="Progress 进度条示例" touchable showArrow onPress={() => this.props.navigation.push('TestProgress')} />
            <Cell title="SegmentedControl 分段器组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestSegmentedControl')} />
            <Cell title="Sidebar 侧边导航" touchable showArrow onPress={() => this.props.navigation.push('TestSideBar')} />
            <Cell title="[TODO] Skeleton 骨架屏" touchable showArrow onPress={() => this.props.navigation.push('TestSkeleton')} />
            <Cell title="[TODO] Step 步骤条组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestStep')} />
            <Cell title="SwipeableRow 组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestSwipeableRow')} />
            <Cell title="Tabbar 标签组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestTabBar')} />
            <Cell title="Tag 标签组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestTag')} />
            <Cell title="[TODO] Uploader 文件上传" touchable showArrow onPress={() => this.props.navigation.push('TestTag')} />
          </CellGroup>
          <CellGroup inset title="反馈组件">
            <Cell title="原生 Alert/ActionSheet 示例" touchable showArrow onPress={() => this.props.navigation.push('TestAlert')} />
            <Cell title="ActionSheet 示例" touchable showArrow onPress={() => this.props.navigation.push('TestActionSheet')} />
            <Cell title="Dialog 示例" touchable showArrow onPress={() => this.props.navigation.push('TestDialog')} />
            <Cell title="Empty 空状态组件示例" touchable showArrow onPress={() => this.props.navigation.push('TestEmpty')} />
            <Cell title="Notify 通知" touchable showArrow onPress={() => this.props.navigation.push('TestNotify')} />
            <Cell title="Popup 弹出层示例" touchable showArrow onPress={() => this.props.navigation.push('TestPopup')} />
            <Cell title="Toast 轻提示示例" touchable showArrow onPress={() => this.props.navigation.push('TestToast')} />
          </CellGroup>
        </ColumnView>
        <WhiteSpace />
        <XBarSpace />
      </ScrollView>
    );
  }
}

