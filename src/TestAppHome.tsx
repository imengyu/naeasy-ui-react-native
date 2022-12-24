import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { Text, ColumnView, CellGroup, Cell, XBarSpace, WhiteSpace, A, RowView, Tag } from './lib';
import { RootStackParamList } from './navigation';

type Props = StackScreenProps<RootStackParamList, 'Components'>;

export class TestAppHome extends React.Component<Props> {

  componentDidMount(): void {
    const page = (window as any)?.getQueryVariable?.('page') as string;
    console.log('page', page);

    if (page) {
      this.props.navigation.push(page as any);
    }
  }

  render() {
    return (
      <ScrollView>
        <ColumnView flex={1}>
          <CellGroup inset>
            <ColumnView padding={10}>
              <RowView align="baseline">
                <Text size={30} weight="bold">NaEasy UI</Text>
                <WhiteSpace size="small" />
                <Tag text="React Native" type="primary" />
              </RowView>
              <Text>一款简单的移动端 UI 组件库</Text>
              <A href="https://github.com/imengyu/naeasy-ui-react-native">https://github.com/imengyu/naeasy-ui-react-native</A>
            </ColumnView>
          </CellGroup>
          <CellGroup inset title="主题">
            <Cell title="Theme 主题" touchable showArrow onPress={() => this.props.navigation.push('TestTheme')} />
          </CellGroup>
          <CellGroup inset title="基础组件">
            <Cell title="Typography 段落" touchable showArrow onPress={() => this.props.navigation.push('TestTypography')} />
            <Cell title="Button 按钮" touchable showArrow onPress={() => this.props.navigation.push('TestButton')} />
            <Cell title="Cell 单元格" touchable showArrow onPress={() => this.props.navigation.push('TestCell')} />
            <Cell title="Icon 图标" touchable showArrow onPress={() => this.props.navigation.push('TestIcon')} />
            <Cell title="Image 图片" touchable showArrow onPress={() => this.props.navigation.push('TestImage')} />
          </CellGroup>
          <CellGroup inset title="布局组件">
            <Cell title="Flex 布局封装" touchable showArrow onPress={() => this.props.navigation.push('TestLayout')} />
            <Cell title="Layout 栅格布局" touchable showArrow onPress={() => this.props.navigation.push('TestLayout2')} />
            <Cell title="Grid 宫格组" touchable showArrow onPress={() => this.props.navigation.push('TestGrid')} />
            <Cell title="WhiteSpace 空白高度" touchable showArrow onPress={() => this.props.navigation.push('TestWhiteSpace')} />
            <Cell title="WingBlank 两翼留白" touchable showArrow onPress={() => this.props.navigation.push('TestWingBlank')} />
          </CellGroup>
          <CellGroup inset title="表单组件">
            <Cell title="CheckBox 复选框" touchable showArrow onPress={() => this.props.navigation.push('TestCheck')} />
            <Cell title="Field 输入框/表单项" touchable showArrow onPress={() => this.props.navigation.push('TestField')} />
            <Cell title="Form 表单" touchable showArrow onPress={() => this.props.navigation.push('TestForm')} />
            <Cell title="NumberInput 数字输入" touchable showArrow onPress={() => this.props.navigation.push('TestNumberInput')} />
            <Cell title="NumberKeyBoard 数字键盘" touchable showArrow onPress={() => this.props.navigation.push('TestNumberKeyBoard')} />
            <Cell title="Picker 选择器" touchable showArrow onPress={() => this.props.navigation.push('TestFormPicker')} />
            <Cell title="PlateKeyBoard 车牌号键盘" touchable showArrow onPress={() => this.props.navigation.push('TestPlateKeyBoard')} />
            <Cell title="PickerWhellView 滚轮选择" touchable showArrow onPress={() => this.props.navigation.push('TestPickerWhellView')} />
            <Cell title="Radio 单选框" touchable showArrow onPress={() => this.props.navigation.push('TestRadio')} />
            <Cell title="Rate 评星" touchable showArrow onPress={() => this.props.navigation.push('TestRate')} />
            <Cell title="SearchBar 搜索框" touchable showArrow onPress={() => this.props.navigation.push('TestSearchBar')} />
            <Cell title="Slider 滑块" touchable showArrow onPress={() => this.props.navigation.push('TestSlider')} />
            <Cell title="Stepper 步进器" touchable showArrow onPress={() => this.props.navigation.push('TestStepper')} />
            <Cell title="Switch 开关" touchable showArrow onPress={() => this.props.navigation.push('TestSwitch')} />
            <Cell title="Uploader 上传" touchable showArrow onPress={() => this.props.navigation.push('TestUploader')} />
          </CellGroup>
          <CellGroup inset title="展示组件">
            <Cell title="Avatar 头像" touchable showArrow onPress={() => this.props.navigation.push('TestAvatar')} />
            <Cell title="AvatarStack 头像组" touchable showArrow onPress={() => this.props.navigation.push('TestAvatarStack')} />
            <Cell title="Badge 徽标" touchable showArrow onPress={() => this.props.navigation.push('TestBadge')} />
            <Cell title="CountDown 倒计时" touchable showArrow onPress={() => this.props.navigation.push('TestCountDown')} />
            <Cell title="CountTo 数字滚动" touchable showArrow onPress={() => this.props.navigation.push('TestCountTo')} />
            <Cell title="Divider 分隔线" touchable showArrow onPress={() => this.props.navigation.push('TestDivider')} />
            <Cell title="[未完成] DropdownMenu 下拉菜单" touchable showArrow onPress={() => this.props.navigation.push('TestDropdownMenu')} />
            <Cell title="[未完成] Collapse 可折叠" touchable showArrow onPress={() => this.props.navigation.push('TestCollapse')} />
            <Cell title="Marquee 滚动文字" touchable showArrow onPress={() => this.props.navigation.push('TestMarquee')} />
            <Cell title="NoticeBar 公告栏" touchable showArrow onPress={() => this.props.navigation.push('TestNoticeBar')} />
            <Cell title="Progress 进度条" touchable showArrow onPress={() => this.props.navigation.push('TestProgress')} />
            <Cell title="SimpleList 简单列表" touchable showArrow onPress={() => this.props.navigation.push('TestSimpleList')} />
            <Cell title="Skeleton 骨架屏" touchable showArrow onPress={() => this.props.navigation.push('TestSkeleton')} />
            <Cell title="Step 步骤条" touchable showArrow onPress={() => this.props.navigation.push('TestStep')} />
            <Cell title="Swiper 轮播/滑块视图容器" touchable showArrow onPress={() => this.props.navigation.push('TestSwiper')} />
            <Cell title="SwipeableRow 侧滑操作" touchable showArrow onPress={() => this.props.navigation.push('TestSwipeableRow')} />
            <Cell title="Tag 标签" touchable showArrow onPress={() => this.props.navigation.push('TestTag')} />
          </CellGroup>
          <CellGroup inset title="导航组件">
            <Cell title="IndexedList 索引列表" touchable showArrow onPress={() => this.props.navigation.push('TestIndexedList')} />
            <Cell title="NavBar 导航栏" touchable showArrow onPress={() => this.props.navigation.push('TestNavBar')} />
            <Cell title="Pagination 分页组件" touchable showArrow onPress={() => this.props.navigation.push('TestPagination')} />
            <Cell title="SegmentedControl 分段器" touchable showArrow onPress={() => this.props.navigation.push('TestSegmentedControl')} />
            <Cell title="Sidebar 侧边导航" touchable showArrow onPress={() => this.props.navigation.push('TestSideBar')} />
            <Cell title="Tabbar 底部标签栏" touchable showArrow onPress={() => this.props.navigation.push('TestTabBar')} />
            <Cell title="Tabs 标签页" touchable showArrow onPress={() => this.props.navigation.push('TestTabs')} />
          </CellGroup>
          <CellGroup inset title="媒体组件">
            <Cell title="ImagePreview 图片预览" touchable showArrow onPress={() => this.props.navigation.push('TestImagePreview')} />
            <Cell title="ImagePicker Native 图片选择器" touchable showArrow onPress={() => this.props.navigation.push('TestImagePicker')} />
          </CellGroup>
          <CellGroup inset title="反馈组件">
            <Cell title="ActionSheet 动作面板" touchable showArrow onPress={() => this.props.navigation.push('TestActionSheet')} />
            <Cell title="Dialog 对话框" touchable showArrow onPress={() => this.props.navigation.push('TestDialog')} />
            <Cell title="Empty 空状态" touchable showArrow onPress={() => this.props.navigation.push('TestEmpty')} />
            <Cell title="ErrorBoundary 错误捕获" touchable showArrow onPress={() => this.props.navigation.push('TestErrorBoundary')} />
            <Cell title="Notify 通知" touchable showArrow onPress={() => this.props.navigation.push('TestNotify')} />
            <Cell title="Overlay 遮罩层" touchable showArrow onPress={() => this.props.navigation.push('TestOverlay')} />
            <Cell title="Popup 弹出层" touchable showArrow onPress={() => this.props.navigation.push('TestPopup')} />
            <Cell title="Result 结果" touchable showArrow onPress={() => this.props.navigation.push('TestResult')} />
            <Cell title="Toast 轻提示" touchable showArrow onPress={() => this.props.navigation.push('TestToast')} />
          </CellGroup>
          <CellGroup inset title="Native 组件">
            <Cell title="Native Picker 选择器" touchable showArrow onPress={() => this.props.navigation.push('TestPicker')} />
            <Cell title="Native Alert/ActionSheet " touchable showArrow onPress={() => this.props.navigation.push('TestAlert')} />
          </CellGroup>
        </ColumnView>
        <WhiteSpace />
        <XBarSpace />
      </ScrollView>
    );
  }
}

