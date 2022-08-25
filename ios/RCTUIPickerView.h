//
//  RCTUIPickerViewManager.h
//  MiningApp
//
//  Created by roger on 2022/5/10.
//

#ifndef RCTUIPickerView_h
#define RCTUIPickerView_h

#import <React/RCTViewManager.h>
#import <Foundation/Foundation.h>

@interface RCTUIPickerView : UIPickerView

@property (nonatomic, copy) RCTBubblingEventBlock onSelectRow;

@property (nonatomic, assign) CGFloat rowHeight;
@property (nonatomic, strong) NSMutableArray* dataArray;
@property (nonatomic, strong) NSMutableArray* selectedIndexTemp;


@end

#endif /* RCTUIPickerView_h */
