//
//  RCTUIPickerViewManager.m
//  MiningApp
//
//  Created by roger on 2022/5/10.
//

#import <Foundation/Foundation.h>
#import <React/RCTUIManager.h>
#import "RCTUIPickerView.h"
#import "RCTUIPickerViewManager.h"

@interface RCTUIPickerViewManager ()<UIPickerViewDataSource,UIPickerViewDelegate>

@end

@implementation RCTUIPickerViewManager

RCT_EXPORT_MODULE(RCTUIPickerView)
RCT_EXPORT_VIEW_PROPERTY(onSelectRow, RCTBubblingEventBlock)

- (UIView *)view
{
  RCTUIPickerView* view = [[RCTUIPickerView alloc] init];
  view.dataSource = self;
  view.delegate = self;
  view.selectedIndexTemp = [[ NSMutableArray alloc ] init ];
  return view;
}


RCT_CUSTOM_VIEW_PROPERTY(rowHeight, NSNumber, RCTUIPickerView)
{
  view.rowHeight = [ RCTConvert CGFloat:json ];
}
RCT_CUSTOM_VIEW_PROPERTY(data, NSArray, RCTUIPickerView)
{
  if (view.dataArray == nil)
    view.dataArray =  [[ NSMutableArray alloc ] init ];

  //拷贝数据
  [ view.dataArray removeAllObjects ];
  
  if (json) {
    for (NSArray *subArray in json) {
      NSMutableArray* subArrayData = [[ NSMutableArray alloc ] init ];
      
      for (NSString *item in subArray)
        [ subArrayData addObject:item ];
      
      [ view.dataArray addObject:subArrayData ];
    }
  }
  
  // 重新加载数据
  [ view reloadAllComponents ];
  
  //延迟设置选中
  if (view.selectedIndexTemp.count > 0) {
    int i = 0;
    for (NSNumber *num in view.selectedIndexTemp) {
      [ view selectRow:[ num intValue ]
              inComponent:i
              animated:NO ];
      i++;
    }
    [ view.selectedIndexTemp removeAllObjects ];
  }
}
RCT_CUSTOM_VIEW_PROPERTY(selectedIndex, NSArray, RCTUIPickerView)
{
  NSArray *array = (NSArray *)json;
  if (array != nil && array.count > 0) {
    int i = 0;
    
    //数据不一致，需要等到设置数据的时候才进行选择
    if (view.dataArray.count != array.count) {
      for (NSNumber *num in array) {
        [ view.selectedIndexTemp addObject:num ];
      }
    } else {
      for (NSNumber *num in array) {
        [ view selectRow:[ num intValue ]
                inComponent:i
                animated:NO ];
        i++;
      }
    }
  }
}

RCT_EXPORT_METHOD(reloadAllComponents:(nonnull NSNumber*) reactTag) {
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RCTUIPickerView *view = (RCTUIPickerView *)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RCTUIPickerView class]]) {
        RCTLogError(@"Cannot find RCTUIPickerView with tag #%@", reactTag);
        return;
    }
    [view reloadAllComponents];
  }];
}
RCT_EXPORT_METHOD(selectRow:(nonnull NSNumber*)reactTag commandID:(NSInteger)commandID commandArgs:(NSArray*)commandArg) {
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RCTUIPickerView *view = (RCTUIPickerView *)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RCTUIPickerView class]]) {
        RCTLogError(@"Cannot find RCTUIPickerView with tag #%@", reactTag);
        return;
    }
    NSDictionary* options = [ commandArg objectAtIndex:0 ];
    if (options) {
      NSNumber* row = [ options objectForKey:@"row" ];
      NSNumber* component = [ options objectForKey:@"component" ];
      NSNumber* animated = [ options objectForKey:@"animated" ];
      
      // 选中
      [ view selectRow:(row ? [ row intValue ] : 0)
           inComponent:(component ? [ component intValue ] : 0)
              animated:(animated ? [ animated boolValue ] : NO) ];
    }
  }];
}
RCT_EXPORT_METHOD(reloadComponent:(nonnull NSNumber*)reactTag commandID:(NSInteger)commandID commandArgs:(NSArray*)commandArg) {
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    RCTUIPickerView *view = (RCTUIPickerView *)viewRegistry[reactTag];
    if (!view || ![view isKindOfClass:[RCTUIPickerView class]]) {
        RCTLogError(@"Cannot find RCTUIPickerView with tag #%@", reactTag);
        return;
    }
    NSDictionary* options = [ commandArg objectAtIndex:0 ];
    if (options) {
      NSNumber* component = [ options objectForKey:@"component" ];
      NSArray* data = [ options objectForKey:@"data" ];
      if (data)
        view.dataArray[[component intValue]] = data;
      
      // 选中
      [ view reloadComponent:(component ? [ component intValue ] : 0) ];
    }
  }];
}

// 返回多少列
- (NSInteger)numberOfComponentsInPickerView:(RCTUIPickerView *)pickerView
{
    return pickerView.dataArray.count;
}
// 返回多少行
- (NSInteger)pickerView:(RCTUIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
    NSArray *items = pickerView.dataArray[component];
    return items.count;
}
// 返回每行的标题
- (NSString *)pickerView:(RCTUIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component
{
    return pickerView.dataArray[component][row];
}
- (CGFloat)pickerView:(RCTUIPickerView *)pickerView rowHeightForComponent:(NSInteger)component
{
  return pickerView.rowHeight == 0 ? 30 : pickerView.rowHeight;
}
// 选中事件
- (void)pickerView:(RCTUIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component
{
  if (!pickerView.onSelectRow) {
    return;
  }

  pickerView.onSelectRow(@{
    @"row": @(row),
    @"component": @(component),
  });
}

@end
