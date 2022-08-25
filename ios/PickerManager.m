//
//  PickerManager.m
//  MengyuUILib
//
//  Created by roger on 2022/5/9.
//

#import <Foundation/Foundation.h>
#import <React/RCTConvert.h>
#import "PickerManager.h"
#import "BRPickerView/BRPickerView.h"

@implementation PickerManager

// To export a module
RCT_EXPORT_MODULE(PickerViewIOS);

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (NSDictionary *)constantsToExport
{
  return @{
    @"BRDatePickerModeDate": [ NSNumber numberWithInt: BRDatePickerModeDate ],
    @"BRDatePickerModeDateAndTime": [ NSNumber numberWithInt: BRDatePickerModeDateAndTime ],
    @"BRDatePickerModeTime": [ NSNumber numberWithInt: BRDatePickerModeTime ],
    @"BRDatePickerModeCountDownTimer": [ NSNumber numberWithInt: BRDatePickerModeCountDownTimer ],
    @"BRDatePickerModeYMDHMS": [ NSNumber numberWithInt: BRDatePickerModeYMDHMS ],
    @"BRDatePickerModeYMDHM": [ NSNumber numberWithInt: BRDatePickerModeYMDHM ],
    @"BRDatePickerModeYMDH": [ NSNumber numberWithInt: BRDatePickerModeYMDH ],
    @"BRDatePickerModeMDHM": [ NSNumber numberWithInt: BRDatePickerModeMDHM ],
    @"BRDatePickerModeYMD": [ NSNumber numberWithInt: BRDatePickerModeYMD ],
    @"BRDatePickerModeYM": [ NSNumber numberWithInt: BRDatePickerModeYM ],
    @"BRDatePickerModeY": [ NSNumber numberWithInt: BRDatePickerModeY ],
    @"BRDatePickerModeMD": [ NSNumber numberWithInt: BRDatePickerModeMD ],
    @"BRDatePickerModeHMS": [ NSNumber numberWithInt: BRDatePickerModeHMS ],
    @"BRDatePickerModeHM": [ NSNumber numberWithInt: BRDatePickerModeHM ],
    @"BRDatePickerModeMS": [ NSNumber numberWithInt: BRDatePickerModeMS ],
    @"BRAddressPickerModeArea": [ NSNumber numberWithInt: BRAddressPickerModeArea ],
    @"BRAddressPickerModeCity": [ NSNumber numberWithInt: BRAddressPickerModeCity ],
    @"BRAddressPickerModeProvince": [ NSNumber numberWithInt: BRAddressPickerModeProvince ],
    @"BRStringPickerComponentSingle": [ NSNumber numberWithInt: BRStringPickerComponentSingle ],
    @"BRStringPickerComponentMulti": [ NSNumber numberWithInt: BRStringPickerComponentMulti ],
    @"BRStringPickerComponentLinkage": [ NSNumber numberWithInt: BRStringPickerComponentLinkage ],
    @"BRBorderStyleNone": [ NSNumber numberWithInt: BRBorderStyleNone ],
    @"BRBorderStyleSolid": [ NSNumber numberWithInt: BRBorderStyleSolid ],
    @"BRBorderStyleFill": [ NSNumber numberWithInt: BRBorderStyleFill ],
    
    
  };
}

- (BRPickerStyle*) JSONToPickerStyle:(NSDictionary*)json {
  BRPickerStyle *customStyle = [[BRPickerStyle alloc]init];
  
  customStyle.maskColor = [ RCTConvert UIColor:json[@"maskColor"] ];
  customStyle.hiddenMaskView = [ RCTConvert BOOL:json[@"hiddenMaskView"] ];
  customStyle.alertViewColor = [ RCTConvert UIColor:json[@"alertViewColor"] ];
  customStyle.topCornerRadius = [ RCTConvert CGFloat:json[@"topCornerRadius"] ];
  customStyle.shadowLineColor = [ RCTConvert UIColor:json[@"shadowLineColor"] ];
  customStyle.shadowLineHeight = [ RCTConvert CGFloat:json[@"shadowLineHeight"] ];
  customStyle.hiddenShadowLine = [ RCTConvert BOOL:json[@"hiddenShadowLine"] ];
  customStyle.paddingBottom = [ RCTConvert CGFloat:json[@"paddingBottom"] ];
  customStyle.titleBarColor = [ RCTConvert UIColor:json[@"titleBarColor"] ];
  customStyle.titleBarHeight = [ RCTConvert CGFloat:json[@"titleBarHeight"] ];
  customStyle.titleLineColor = [ RCTConvert UIColor:json[@"titleLineColor"] ];
  customStyle.hiddenTitleLine = [ RCTConvert BOOL:json[@"hiddenTitleLine"] ];
  customStyle.titleLabelColor = [ RCTConvert UIColor:json[@"titleLabelColor"] ];
  customStyle.titleTextColor = [ RCTConvert UIColor:json[@"titleTextColor"] ];
  customStyle.hiddenTitleLabel = [ RCTConvert BOOL:json[@"hiddenTitleLabel"] ];
  customStyle.cancelColor = [ RCTConvert UIColor:json[@"cancelColor"] ];
  customStyle.cancelTextColor = [ RCTConvert UIColor:json[@"cancelTextColor"] ];
  customStyle.cancelBorderStyle = [ RCTConvert NSInteger:json[@"cancelBorderStyle"] ];
  customStyle.cancelCornerRadius = [ RCTConvert CGFloat:json[@"cancelCornerRadius"] ];
  customStyle.cancelBorderWidth = [ RCTConvert CGFloat:json[@"cancelBorderWidth"] ];
  customStyle.cancelBtnTitle = [ RCTConvert NSString:json[@"cancelBtnTitle"] ];
  customStyle.hiddenCancelBtn = [ RCTConvert BOOL:json[@"hiddenCancelBtn"] ];
  customStyle.doneColor = [ RCTConvert UIColor:json[@"doneColor"] ];
  customStyle.doneTextColor = [ RCTConvert UIColor:json[@"doneTextColor"] ];
  customStyle.doneBorderStyle = [ RCTConvert NSInteger:json[@"doneBorderStyle"] ];
  customStyle.doneCornerRadius = [ RCTConvert CGFloat:json[@"doneCornerRadius"] ];
  customStyle.doneBorderWidth = [ RCTConvert CGFloat:json[@"doneBorderWidth"] ];
  customStyle.doneBtnTitle = [ RCTConvert NSString:json[@"doneBtnTitle"] ];
  customStyle.hiddenDoneBtn = [ RCTConvert BOOL:json[@"hiddenDoneBtn"] ];
  customStyle.pickerColor = [ RCTConvert UIColor:json[@"pickerColor"] ];
  customStyle.separatorColor = [ RCTConvert UIColor:json[@"separatorColor"] ];
  customStyle.separatorHeight = [ RCTConvert CGFloat:json[@"separatorHeight"] ];
  customStyle.pickerTextColor = [ RCTConvert UIColor:json[@"pickerTextColor"] ];
  customStyle.selectRowColor = [ RCTConvert UIColor:json[@"selectRowColor"] ];
  customStyle.selectRowTextColor = [ RCTConvert UIColor:json[@"selectRowTextColor"] ];
  customStyle.pickerHeight = [ RCTConvert CGFloat:json[@"pickerHeight"] ];
  customStyle.rowHeight = [ RCTConvert CGFloat:json[@"rowHeight"] ];
  customStyle.clearPickerNewStyle = [ RCTConvert CGFloat:json[@"clearPickerNewStyle"] ];
  customStyle.language = [ RCTConvert NSString:json[@"language"] ];
  customStyle.dateUnitTextColor = [ RCTConvert UIColor:json[@"dateUnitTextColor"] ];
  customStyle.dateUnitOffsetX = [ RCTConvert CGFloat:json[@"dateUnitOffsetX"] ];
  customStyle.dateUnitOffsetY = [ RCTConvert CGFloat:json[@"dateUnitOffsetY"] ];
  
  return customStyle;
}

/**
 showTimePickerView
 参数:
 {
 title: string,
 pickerMode: number,
 isAutoSelect:boolean,
 selectValue:string,
 minDate: string|Date,
 maxDate: string|Date,
 }
 */
RCT_EXPORT_METHOD(showTimePickerView:(NSDictionary *)options
                  selectCallback:(RCTResponseSenderBlock)selectCallback
                  dismissCallback:(RCTResponseSenderBlock)dismissCallback)
{
  BRDatePickerView *datePickerView = [[BRDatePickerView alloc]init];
  
  
  NSNumber* pickerMode = [ options objectForKey:@"pickerMode" ];
  if (pickerMode)
    datePickerView.pickerMode = [ pickerMode intValue ];
  NSString* title = [ options objectForKey:@"title" ];
  if (title)
    datePickerView.title = title;
  NSObject* selectValue = [ options objectForKey:@"selectValue" ];
  if (selectValue)
    datePickerView.selectDate = [ RCTConvert NSDate:selectValue ];
  NSObject* minDate = [ options objectForKey:@"minDate" ];
  if (minDate)
    datePickerView.minDate = [RCTConvert NSDate:minDate ];
  NSObject* maxDate = [ options objectForKey:@"maxDate" ];
  if (maxDate)
    datePickerView.maxDate = [RCTConvert NSDate:maxDate ];
  NSNumber* isAutoSelect = [ options objectForKey:@"isAutoSelect" ];
  if (isAutoSelect)
    datePickerView.isAutoSelect = [ isAutoSelect boolValue ];
  NSDictionary* pickerStyle = [ options objectForKey:@"pickerStyle" ];
  if (pickerStyle)
    datePickerView.pickerStyle = [ self JSONToPickerStyle:pickerStyle ];
    
  datePickerView.resultBlock = ^(NSDate *selectDate, NSString *selectValue) {
    selectCallback(@[ [NSNumber numberWithDouble:[selectDate timeIntervalSince1970] * 1000], selectValue ]);
  };
  datePickerView.cancelBlock = ^() {
    dismissCallback(@[]);
  };

  // 显示
  [datePickerView show];
}

/**
 showAddressPickerView
 参数：
 {
 pickerMode: number,
 title: string,
 selectValue: string[],
 isAutoSelect: boolean,
 }
 */
RCT_EXPORT_METHOD(showAddressPickerView:(NSDictionary *)options
                  selectCallback:(RCTResponseSenderBlock)selectCallback
                  dismissCallback:(RCTResponseSenderBlock)dismissCallback)
{
  BRAddressPickerView *addressPickerView = [[BRAddressPickerView alloc]init];
  
  NSNumber* pickerMode = [ options objectForKey:@"pickerMode" ];
  if (pickerMode)
    addressPickerView.pickerMode = [ pickerMode intValue ];
  NSString* title = [ options objectForKey:@"title" ];
  if (title)
    addressPickerView.title = title;
  NSArray* selectValue = [ options objectForKey:@"selectValue" ];
  if (selectValue)
    addressPickerView.selectValues = selectValue;
  NSNumber* isAutoSelect = [ options objectForKey:@"isAutoSelect" ];
  if (isAutoSelect)
    addressPickerView.isAutoSelect = [ isAutoSelect boolValue ];
  NSDictionary* pickerStyle = [ options objectForKey:@"pickerStyle" ];
  if (pickerStyle)
    addressPickerView.pickerStyle = [ self JSONToPickerStyle:pickerStyle ];
  
  addressPickerView.resultBlock = ^(BRProvinceModel *province, BRCityModel *city, BRAreaModel *area) {
    selectCallback(@[
      province.name, city.name, area.name
    ]);
  };
  addressPickerView.cancelBlock = ^() {
    dismissCallback(@[]);
  };

  [addressPickerView show];
}

/**
 showOptionsPickerView
 参数：
 {
 pickerMode: number,
 title: string,
 selectValue: string[],
 isAutoSelect: boolean,
 }
 */
RCT_EXPORT_METHOD(showOptionsPickerView:(NSDictionary *)options
                  selectCallback:(RCTResponseSenderBlock)selectCallback
                  dismissCallback:(RCTResponseSenderBlock)dismissCallback)
{
  BRStringPickerView *stringPickerView = [[BRStringPickerView alloc]init];
  
  NSNumber* pickerMode = [ options objectForKey:@"pickerMode" ];
  if (pickerMode)
    stringPickerView.pickerMode = [ pickerMode intValue ];
  NSString* title = [ options objectForKey:@"title" ];
  if (title)
    stringPickerView.title = title;
  NSNumber* isAutoSelect = [ options objectForKey:@"isAutoSelect" ];
  if (isAutoSelect)
    stringPickerView.isAutoSelect = [ isAutoSelect boolValue ];
  NSDictionary* pickerStyle = [ options objectForKey:@"pickerStyle" ];
  if (pickerStyle)
    stringPickerView.pickerStyle = [ self JSONToPickerStyle:pickerStyle ];
  
  if (stringPickerView.pickerMode == BRStringPickerComponentSingle) {
    //单列
    NSArray* array = [ options objectForKey:@"array" ];
    if (array)
      stringPickerView.dataSourceArr = [ array copy ];
    
    NSNumber* selectIndex = [ options objectForKey:@"selectIndex" ];
    if (selectIndex)
      stringPickerView.selectIndex = [selectIndex intValue];
    
    stringPickerView.resultModelBlock = ^(BRResultModel *resultModel) {
      selectCallback(@[
        [ NSNumber numberWithLong: resultModel.index ]
      ]);
    };
  } else if (stringPickerView.pickerMode == BRStringPickerComponentMulti) {
    //多列
    NSArray* array = [ options objectForKey:@"array" ];
    if (array)
      stringPickerView.dataSourceArr = [ array copy ];
    
    NSArray* selectIndexs = [ options objectForKey:@"selectIndexs" ];
    if (selectIndexs)
      stringPickerView.selectIndexs = selectIndexs;
    
    stringPickerView.resultModelArrayBlock = ^(NSArray<BRResultModel *> *resultModelArr) {
      NSMutableArray* result = [[ NSMutableArray alloc ] initWithCapacity:resultModelArr.count ];
      
      for (BRResultModel *object in resultModelArr)
        [ result addObject: [ NSNumber numberWithLong:object.index] ];
      
      selectCallback(result);
    };
    
  } else if (stringPickerView.pickerMode == BRStringPickerComponentLinkage) {
    //联动
    NSArray* array = [ options objectForKey:@"array" ];
    if (array) {
      NSMutableArray* result = [[ NSMutableArray alloc ] initWithCapacity:array.count ];
      
      for (int i = 0; i < array.count; i++) {
        NSDictionary* obj = [ array objectAtIndex:i ];
        BRResultModel * model = [[BRResultModel alloc] init];
        
        NSString* key = [ obj objectForKey:@"key" ];
        if (key) model.key = key;
        NSString* parentKey = [ obj objectForKey:@"parentKey" ];
        if (parentKey) model.parentKey = parentKey;
        NSString* value = [ obj objectForKey:@"value" ];
        if (value) model.value = value;
        
        [result addObject:model ];
      }
      
      NSArray* selectIndexs = [ options objectForKey:@"selectIndexs" ];
      if (selectIndexs)
        stringPickerView.selectIndexs = selectIndexs;
      
      stringPickerView.dataSourceArr = result;
    }
    
    stringPickerView.resultModelArrayBlock = ^(NSArray<BRResultModel *> *resultModelArr) {
      NSMutableArray* result = [[ NSMutableArray alloc ] initWithCapacity:resultModelArr.count ];
      
      for (BRResultModel *object in resultModelArr)
        [ result addObject: [ NSNumber numberWithLong: object.index ]];
      
      selectCallback(result);
    };
  }
  
  stringPickerView.cancelBlock = ^() {
    dismissCallback(@[]);
  };

  [stringPickerView show];
}

@end
