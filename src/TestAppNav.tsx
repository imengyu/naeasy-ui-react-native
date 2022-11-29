import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import { TestButtonScreen } from './base/TestButtonScreen';
import { TestCellScreen } from './base/TestCellScreen';
import { TestIconScreen } from './base/TestIconScreen';
import { TestImageScreen } from './base/TestImageScreen';
import { TestLayoutScreen } from './base/TestLayoutScreen';
import { TestPopupScreen } from './feedback/TestPopupScreen';
import { TestToastScreen } from './feedback/TestToastScreen';
import { TestBadgeScreen } from './display/TestBadgeScreen';
import { TestCollapseScreen } from './display/TestCollapseScreen';
import { TestEmptyScreen } from './feedback/TestEmptyScreen';
import { TestTagScreen } from './display/TestTagScreen';
import { TestGridScreen } from './base/TestGridScreen';
import { TestPaginationScreen } from './display/TestPaginationScreen';
import { TestSegmentedControlScreen } from './display/TestSegmentedControlScreen';
import { TestNoticeBarScreen } from './display/TestNoticeBarScreen';
import { TestPickerScreen } from './form/TestPickerScreen';
import { TestPickerWhellViewScreen } from './form/TestPickerWhellViewScreen';
import { TestSwipeableRowScreen } from './display/TestSwipeableRowScreen';
import { TestRadioScreen } from './form/TestRadioScreen';
import { TestCheckScreen } from './form/TestCheckScreen';
import { TestAlertScreen } from './feedback/TestAlertScreen';
import { TestProgressScreen } from './display/TestProgressScreen';
import { TestActionSheetScreen } from './feedback/TestActionSheetScreen';
import { TestDialogScreen } from './feedback/TestDialogScreen';
import { TestFieldScreen } from './form/TestFieldSheetScreen';
import { TestStepperScreen } from './form/TestStepperScreen';
import { TestSwitchScreen } from './form/TestSwitchScreen';
import { TestSliderScreen } from './form/TestSliderScreen';
import { TestSearchBarScreen } from './nav/TestSearchBarScreen';
import { TestFormScreen } from './form/TestFormScreen';
import { TestRateScreen } from './form/TestRateScreen';
import { TestNumberInputScreen } from './form/TestNumberInputScreen';
import { TestTypographyScreen } from './base/TestTypographyScreen';
import { TestDividerScreen } from './display/TestDividerScreen';
import { Platform } from 'react-native';
import { TestAppHome } from './TestAppHome';
import { TestAvatarStackScreen } from './display/TestAvatarStackScreen';
import { TestSideBarScreen } from './nav/TestSideBarScreen';
import { TestTabBarScreen } from './nav/TestTabBarScreen';
import { TestImagePreviewScreen } from './media/TestImagePreviewScreen';
import { TestNavBarScreen } from './nav/TestNavBarScreen';
import { TestNotifyScreen } from './feedback/TestNotifyScreen';
import { TestCountToScreen } from './display/TestCountToScreen';
import { TestNumberKeyBoardScreen } from './form/TestNumberKeyBoardScreen';
import { TestCountDownScreen } from './display/TestCountDownScreen';
import { TestWingBlankScreen } from './base/TestWingBlankScreen';
import { TestWhiteSpaceScreen } from './base/TestWiteSpaceScreen';
import { TestCarouselScreen } from './display/TestCarouselScreen';
import { TestLayout2Screen } from './base/TestLayout2Screen';
import { TestSimpleListScreen } from './list/TestSimpleListScreen';
import { TestIndexedListScreen } from './list/TestIndexedListScreen';
import { TestStepScreen } from './display/TestStepScreen';
import { TestPlateKeyBoardScreen } from './form/TestPlateKeyBoardScreen';
import { TestThemeScreen } from './base/TestThemeScreen';
import { TestImagePickerScreen } from './media/TestImagePickerScreen';
import { TestErrorBoundaryScreen } from './base/TestErrorBoundaryScreen';
import { TestOverlayScreen } from './feedback/TestOverlayScreen';
import { TestResultScreen } from './feedback/TestResultScreen';
import { ThemeSelector, Color } from './lib';
import { TestTabsScreen } from './nav/TestTabsScreen';
import { TestSwiperScreen } from './base/TestSwiperScreen';
import { TestSkeletonScreen } from './display/TestSkeletonScreen';
import { TestAvatarScreen } from './display/TestAvatarScreen';

const Stack = createStackNavigator();

export class TestAppNav extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          presentation: 'card',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: ThemeSelector.color(Color.background) },
          ...TransitionPresets.SlideFromRightIOS,
          ...Platform.select<StackNavigationOptions>({
            android: {
              headerTitleAlign: 'center',
            },
          }),
        }}
      >
        <Stack.Screen name="Components" component={TestAppHome as any} />
        <Stack.Screen name="TestButton" component={TestButtonScreen as any} />
        <Stack.Screen name="TestCell" component={TestCellScreen as any} />
        <Stack.Screen name="TestIcon" component={TestIconScreen as any} />
        <Stack.Screen name="TestImage" component={TestImageScreen as any} />
        <Stack.Screen name="TestLayout" component={TestLayoutScreen as any} />
        <Stack.Screen name="TestLayout2" component={TestLayout2Screen as any} />
        <Stack.Screen name="TestPopup" component={TestPopupScreen as any} />
        <Stack.Screen name="TestToast" component={TestToastScreen as any} />
        <Stack.Screen name="TestBadge" component={TestBadgeScreen as any} />
        <Stack.Screen name="TestCollapse" component={TestCollapseScreen as any} />
        <Stack.Screen name="TestEmpty" component={TestEmptyScreen as any} />
        <Stack.Screen name="TestTag" component={TestTagScreen as any} />
        <Stack.Screen name="TestGrid" component={TestGridScreen as any} />
        <Stack.Screen name="TestPagination" component={TestPaginationScreen as any} />
        <Stack.Screen
          name="TestSegmentedControl"
          component={TestSegmentedControlScreen as any}
        />
        <Stack.Screen name="TestNoticeBar" component={TestNoticeBarScreen as any} />
        <Stack.Screen name="TestCarousel" component={TestCarouselScreen as any} />
        <Stack.Screen name="TestPicker" component={TestPickerScreen as any} />
        <Stack.Screen
          name="TestPickerWhellView"
          component={TestPickerWhellViewScreen as any}
        />
        <Stack.Screen
          name="TestSwipeableRow"
          component={TestSwipeableRowScreen as any}
        />
        <Stack.Screen name="TestRadio" component={TestRadioScreen as any} />
        <Stack.Screen name="TestCheck" component={TestCheckScreen as any} />
        <Stack.Screen name="TestAlert" component={TestAlertScreen as any} />
        <Stack.Screen name="TestProgress" component={TestProgressScreen as any} />
        <Stack.Screen
          name="TestActionSheet"
          component={TestActionSheetScreen as any}
        />
        <Stack.Screen name="TestDialog" component={TestDialogScreen as any} />
        <Stack.Screen name="TestField" component={TestFieldScreen as any} />
        <Stack.Screen name="TestSwitch" component={TestSwitchScreen as any} />
        <Stack.Screen name="TestStepper" component={TestStepperScreen as any} />
        <Stack.Screen name="TestSlider" component={TestSliderScreen as any} />
        <Stack.Screen name="TestSearchBar" component={TestSearchBarScreen as any} />
        <Stack.Screen name="TestRate" component={TestRateScreen as any} />
        <Stack.Screen name="TestForm" component={TestFormScreen as any} />
        <Stack.Screen
          name="TestNumberInput"
          component={TestNumberInputScreen as any}
        />
        <Stack.Screen name="TestTypography" component={TestTypographyScreen as any} />
        <Stack.Screen name="TestDivider" component={TestDividerScreen as any} />
        <Stack.Screen name="TestWhiteSpace" component={TestWhiteSpaceScreen as any} />
        <Stack.Screen name="TestWingBlank" component={TestWingBlankScreen as any} />
        <Stack.Screen name="TestCountDown" component={TestCountDownScreen as any} />
        <Stack.Screen
          name="TestNumberKeyBoard"
          component={TestNumberKeyBoardScreen as any}
        />
        <Stack.Screen name="TestCountTo" component={TestCountToScreen as any} />
        <Stack.Screen name="TestNotify" component={TestNotifyScreen as any} />
        <Stack.Screen
          name="TestImagePreview"
          component={TestImagePreviewScreen as any}
        />
        <Stack.Screen name="TestNavBar" component={TestNavBarScreen as any} />
        <Stack.Screen name="TestTabBar" component={TestTabBarScreen as any} />
        <Stack.Screen name="TestSideBar" component={TestSideBarScreen as any} />
        <Stack.Screen
          name="TestAvatarStack"
          component={TestAvatarStackScreen as any}
        />
        <Stack.Screen name="TestSimpleList" component={TestSimpleListScreen as any} />
        <Stack.Screen name="TestIndexedList" component={TestIndexedListScreen as any} />
        <Stack.Screen name="TestStep" component={TestStepScreen as any} />
        <Stack.Screen name="TestPlateKeyBoard" component={TestPlateKeyBoardScreen as any} />
        <Stack.Screen name="TestTheme" component={TestThemeScreen as any} />
        <Stack.Screen name="TestImagePicker" component={TestImagePickerScreen as any} />
        <Stack.Screen name="TestErrorBoundary" component={TestErrorBoundaryScreen as any} />
        <Stack.Screen name="TestOverlay" component={TestOverlayScreen as any} />
        <Stack.Screen name="TestResult" component={TestResultScreen as any} />
        <Stack.Screen name="TestTabs" component={TestTabsScreen as any} />
        <Stack.Screen name="TestSwiper" component={TestSwiperScreen as any} />
        <Stack.Screen name="TestSkeleton" component={TestSkeletonScreen as any} />
        <Stack.Screen name="TestAvatar" component={TestAvatarScreen as any} />
      </Stack.Navigator>
    );
  }
}
