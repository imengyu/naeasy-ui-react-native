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
import { TestSearchBarScreen } from './form/TestSearchBarScreen';
import { TestFormScreen } from './form/TestFormScreen';
import { TestRateScreen } from './form/TestRateScreen';
import { TestNumberInputScreen } from './form/TestNumberInputScreen';
import { TestTypographyScreen } from './base/TestTypographyScreen';
import { TestDividerScreen } from './display/TestDividerScreen';
import { Platform } from 'react-native';
import { TestAppHome } from './TestAppHome';
import { TestIndexBarScreen } from './nav/TestIndexBarScreen';
import { TestAvatarStackScreen } from './base/TestAvatarStackScreen';
import { TestSideBarScreen } from './nav/TestSideBarScreen';
import { TestTabBarScreen } from './nav/TestTabBarScreen';
import { TestImagePreviewScreen } from './display/TestImagePreviewScreen';
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

const Stack = createStackNavigator();

export class TestAppNav extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          presentation: 'card',
          headerTitleAlign: 'center',
          ...TransitionPresets.SlideFromRightIOS,
          ...Platform.select<StackNavigationOptions>({
            android: {
              headerTitleAlign: 'center',
            },
          }),
        }}>
        <Stack.Screen name="Components" component={TestAppHome} />
        <Stack.Screen name="TestButton" component={TestButtonScreen} />
        <Stack.Screen name="TestCell" component={TestCellScreen} />
        <Stack.Screen name="TestIcon" component={TestIconScreen} />
        <Stack.Screen name="TestImage" component={TestImageScreen} />
        <Stack.Screen name="TestLayout" component={TestLayoutScreen} />
        <Stack.Screen name="TestLayout2" component={TestLayout2Screen} />
        <Stack.Screen name="TestPopup" component={TestPopupScreen} />
        <Stack.Screen name="TestToast" component={TestToastScreen} />
        <Stack.Screen name="TestBadge" component={TestBadgeScreen} />
        <Stack.Screen name="TestCollapse" component={TestCollapseScreen} />
        <Stack.Screen name="TestEmpty" component={TestEmptyScreen} />
        <Stack.Screen name="TestTag" component={TestTagScreen} />
        <Stack.Screen name="TestGrid" component={TestGridScreen} />
        <Stack.Screen name="TestPagination" component={TestPaginationScreen} />
        <Stack.Screen
          name="TestSegmentedControl"
          component={TestSegmentedControlScreen}
        />
        <Stack.Screen name="TestNoticeBar" component={TestNoticeBarScreen} />
        <Stack.Screen name="TestCarousel" component={TestCarouselScreen} />
        <Stack.Screen name="TestPicker" component={TestPickerScreen} />
        <Stack.Screen
          name="TestPickerWhellView"
          component={TestPickerWhellViewScreen}
        />
        <Stack.Screen
          name="TestSwipeableRow"
          component={TestSwipeableRowScreen}
        />
        <Stack.Screen name="TestRadio" component={TestRadioScreen} />
        <Stack.Screen name="TestCheck" component={TestCheckScreen} />
        <Stack.Screen name="TestAlert" component={TestAlertScreen} />
        <Stack.Screen name="TestProgress" component={TestProgressScreen} />
        <Stack.Screen
          name="TestActionSheet"
          component={TestActionSheetScreen}
        />
        <Stack.Screen name="TestDialog" component={TestDialogScreen} />
        <Stack.Screen name="TestField" component={TestFieldScreen} />
        <Stack.Screen name="TestSwitch" component={TestSwitchScreen} />
        <Stack.Screen name="TestStepper" component={TestStepperScreen} />
        <Stack.Screen name="TestSlider" component={TestSliderScreen} />
        <Stack.Screen name="TestSearchBar" component={TestSearchBarScreen} />
        <Stack.Screen name="TestRate" component={TestRateScreen} />
        <Stack.Screen name="TestForm" component={TestFormScreen} />
        <Stack.Screen
          name="TestNumberInput"
          component={TestNumberInputScreen}
        />
        <Stack.Screen name="TestTypography" component={TestTypographyScreen} />
        <Stack.Screen name="TestDivider" component={TestDividerScreen} />
        <Stack.Screen name="TestWhiteSpace" component={TestWhiteSpaceScreen} />
        <Stack.Screen name="TestWingBlank" component={TestWingBlankScreen} />
        <Stack.Screen name="TestCountDown" component={TestCountDownScreen} />
        <Stack.Screen
          name="TestNumberKeyBoard"
          component={TestNumberKeyBoardScreen}
        />
        <Stack.Screen name="TestCountTo" component={TestCountToScreen} />
        <Stack.Screen name="TestNotify" component={TestNotifyScreen} />
        <Stack.Screen
          name="TestImagePreview"
          component={TestImagePreviewScreen}
        />
        <Stack.Screen name="TestNavBar" component={TestNavBarScreen} />
        <Stack.Screen name="TestTabBar" component={TestTabBarScreen} />
        <Stack.Screen name="TestSideBar" component={TestSideBarScreen} />
        <Stack.Screen
          name="TestAvatarStack"
          component={TestAvatarStackScreen}
        />
        <Stack.Screen name="TestIndexBar" component={TestIndexBarScreen} />
        <Stack.Screen name="TestSimpleList" component={TestSimpleListScreen} />
        <Stack.Screen name="TestIndexedList" component={TestIndexedListScreen} />
        <Stack.Screen name="TestStep" component={TestStepScreen} />
      </Stack.Navigator>
    );
  }
}
