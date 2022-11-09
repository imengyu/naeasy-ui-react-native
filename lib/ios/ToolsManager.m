//
//  ToolsManager.m
//  MiningApp
//
//  Created by roger on 2022/5/12.
//

#import <Foundation/Foundation.h>
#import "ToolsManager.h"

@interface ToolsManager ()

@property (nonatomic, strong) UISelectionFeedbackGenerator* selectionFeedbackGenerator;
@property (nonatomic, strong) UINotificationFeedbackGenerator* notificationFeedbackGenerator;

@end

@implementation ToolsManager

// To export a module
RCT_EXPORT_MODULE(ToolsManagerIOS);

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
    @"UINotificationFeedbackTypeSuccess": [ NSNumber numberWithInt: UINotificationFeedbackTypeSuccess ],
    @"UINotificationFeedbackTypeWarning": [ NSNumber numberWithInt: UINotificationFeedbackTypeWarning ],
    @"UINotificationFeedbackTypeError": [ NSNumber numberWithInt: UINotificationFeedbackTypeError ],
  };
}

RCT_EXPORT_METHOD(impactSelectionFeedbackGenerator)
{
  if (self.selectionFeedbackGenerator == nil)
    self.selectionFeedbackGenerator = [[UISelectionFeedbackGenerator alloc] init];
  [ self.selectionFeedbackGenerator selectionChanged ];
}
RCT_EXPORT_METHOD(impactNotificationFeedbackGenerator:(NSDictionary *)options)
{
  if (self.notificationFeedbackGenerator == nil)
    self.notificationFeedbackGenerator = [[UINotificationFeedbackGenerator alloc] init];
  
  UINotificationFeedbackType type = UINotificationFeedbackTypeSuccess;
  NSNumber* strType = [ options objectForKey:@"type" ];
  if (strType) type = [ strType intValue ];
  
  [ self.notificationFeedbackGenerator notificationOccurred:type ];
}
RCT_EXPORT_METHOD(getAppInfo:(NSDictionary *)options
                  c:(RCTResponseSenderBlock)successCallback
                  e:(RCTResponseSenderBlock)errorCallback)
{
  NSDictionary *infoDic = [[NSBundle mainBundle] infoDictionary];
  NSString *appVersion = [infoDic objectForKey:@"CFBundleShortVersionString"];
  NSString *appBuildVersion = [infoDic objectForKey:@"CFBundleVersion"];
  NSString *appName = [infoDic objectForKey:@"CFBundleDisplayName"];
  NSString *appBundleIdentifier = [infoDic objectForKey:@"CFBundleIdentifier"];
  
  successCallback(@[ @{
    @"appBuildVersion": appBuildVersion,
    @"appVersion": appVersion,
    @"appName": appName,
    @"appBundleIdentifier": appBundleIdentifier,
    @"DEBUG": [NSNumber numberWithBool:DEBUG],
    @"INDEV": [NSNumber numberWithInt:1],
  } ]);
}

@end
