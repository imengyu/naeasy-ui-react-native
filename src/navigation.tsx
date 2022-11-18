import { StackScreenProps } from '@react-navigation/stack';

/**
 * 根路由的名称与参数配置
 */
export type RootStackParamList = {
  Components: undefined;
  TestTheme: undefined;
  TestButton: undefined;
  TestCell: undefined;
  TestIcon: undefined;
  TestImage: undefined;
  TestLayout: undefined;
  TestPopup: undefined;
  TestToast: undefined;
  TestBadge: undefined;
  TestAnimtation: undefined;
  TestCollapse: undefined;
  TestEmpty: undefined;
  TestTag: undefined;
  TestGrid: undefined;
  TestPagination: undefined;
  TestSegmentedControl: undefined;
  TestNoticeBar: undefined;
  TestWebView: undefined;
  TestCarousel: undefined;
  TestPicker: undefined;
  TestPickerWhellView: undefined;
  TestSwipeableRow: undefined;
  TestRadio: undefined;
  TestAlert: undefined;
  TestCheck: undefined;
  TestProgress: undefined;
  TestActionSheet: undefined;
  TestDialog: undefined;
  TestField: undefined;
  TestStepper: undefined;
  TestSwitch: undefined;
  TestSlider: undefined;
  TestSearchBar: undefined;
  TestRate: undefined;
  TestForm: undefined;
  TestRequest: undefined;
  TestAnim: undefined;
  TestLightBox: undefined;
  TestNumberInput: undefined;
  TestTypography: undefined;
  TestDivider: undefined;
  TestLayout2: undefined;
  TestWhiteSpace: undefined;
  TestWingBlank: undefined;
  TestNumberKeyBoard: undefined;
  TestPlateKeyBoard: undefined;
  TestAvatarStack: undefined;
  TestSimpleList: undefined;
  TestIndexedList: undefined;
  TestCountDown: undefined;
  TestCountTo: undefined;
  TestImagePreview: undefined;
  TestImagePicker: undefined;
  TestNavBar: undefined;
  TestSideBar: undefined;
  TestSkeleton: undefined;
  TestStep: undefined;
  TestTabBar: undefined;
  TestNotify: undefined;
  TestErrorBoundary: undefined;
  TestDarkTheme: undefined;
  TestOverlay: undefined;
  TestResult: undefined;
  TestDropdownMenu: undefined;
};

/**
 * 根路由的参数类型
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

