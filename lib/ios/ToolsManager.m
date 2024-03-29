//
//  ToolsManager.m
//  MiningApp
//
//  Created by roger on 2022/5/12.
//

#import <Foundation/Foundation.h>
#import <React/RCTConstants.h>
#import "RCTConvert.h"
#import "ToolsManager.h"

@interface ToolsManager ()

@property (nonatomic, strong) UISelectionFeedbackGenerator* selectionFeedbackGenerator;
@property (nonatomic, strong) UINotificationFeedbackGenerator* notificationFeedbackGenerator;

@property (nonatomic) BOOL isListenedStyleDidChangeNotification;

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
- (NSArray<NSString *> *)supportedEvents
{
  return @[ @"onThemeChanged" ];
}

#pragma mark - 触摸反馈

//UISelectionFeedbackGenerator selectionChanged
RCT_EXPORT_METHOD(impactSelectionFeedbackGenerator)
{
  if (self.selectionFeedbackGenerator == nil)
    self.selectionFeedbackGenerator = [[UISelectionFeedbackGenerator alloc] init];
  [ self.selectionFeedbackGenerator selectionChanged ];
}
//UINotificationFeedbackGenerator notificationOccurred
RCT_EXPORT_METHOD(impactNotificationFeedbackGenerator:(NSDictionary *)options)
{
  if (self.notificationFeedbackGenerator == nil)
    self.notificationFeedbackGenerator = [[UINotificationFeedbackGenerator alloc] init];
  
  UINotificationFeedbackType type = UINotificationFeedbackTypeSuccess;
  NSNumber* strType = [ options objectForKey:@"type" ];
  if (strType) type = [ strType intValue ];
  
  [ self.notificationFeedbackGenerator notificationOccurred:type ];
}

#pragma mark - App 工具

//获取包信息
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


//计算缓存大小
- (CGFloat)calculateCache {
    CGFloat folderSize = 0;
    //获取路径
    NSString *cachePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory,NSUserDomainMask,YES)firstObject];
    //获取所有文件的数组
    NSArray *files = [[NSFileManager defaultManager] subpathsAtPath:cachePath];
    for(NSString *path in files) {
        NSString*filePath = [cachePath stringByAppendingString:[NSString stringWithFormat:@"/%@",path]];
        //累加
        folderSize += [[NSFileManager defaultManager]attributesOfItemAtPath:filePath error:nil].fileSize;
    }
    return folderSize;
}
//清除缓存
- (void)removeCache {
    //获取路径
    NSString*cachePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory,NSUserDomainMask,YES)objectAtIndex:0];
    //返回路径中的文件数组
    NSArray*files = [[NSFileManager defaultManager]subpathsAtPath:cachePath];
    for(NSString *p in files){
      NSError*error;
      NSString*path = [cachePath stringByAppendingString:[NSString stringWithFormat:@"/%@",p]];
      if([[NSFileManager defaultManager]fileExistsAtPath:path]) {
        [[NSFileManager defaultManager]removeItemAtPath:path error:&error];
      }
    }
}

//获取缓存信息
RCT_EXPORT_METHOD(getCacheInfo:(NSDictionary *)options
                  c:(RCTResponseSenderBlock)successCallback
                  e:(RCTResponseSenderBlock)errorCallback)
{
  NSString *cachePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory,NSUserDomainMask,YES)firstObject];
  NSString * cacheUnit = @"B";
  CGFloat cacheSize = [ self calculateCache ];
  CGFloat cacheSizeTransform = cacheSize;
  
  if (cacheSize > 1024 * 1024 * 1024) {
    cacheUnit = @"G";
    cacheSizeTransform = cacheSize / 1024 / 1024 / 1024;
  } else if (cacheSize > 1024 * 1024) {
    cacheUnit = @"M";
    cacheSizeTransform = cacheSize / 1024 / 1024;
  } else if (cacheSize > 1024) {
    cacheUnit = @"K";
    cacheSizeTransform = cacheSize / 1024;
  }
  
  successCallback(@[ @{
    @"cacheDir": cachePath,
    @"cacheUnit": cacheUnit,
    @"cacheSizeString": [ NSString stringWithFormat:@"%f%@", cacheSizeTransform, cacheUnit ],
    @"cacheSize": [ NSNumber numberWithFloat:cacheSize ],
    @"filesDir": @"",
  } ]);
}

//清除缓存
RCT_EXPORT_METHOD(clearAppCache:(NSDictionary *)options
                  c:(RCTResponseSenderBlock)successCallback
                  e:(RCTResponseSenderBlock)errorCallback)
{
  [ self removeCache ];
  successCallback(@[]);
}

//NSLog
RCT_EXPORT_METHOD(nsLog:(NSDictionary *)options)
{
  NSString *tag = [options objectForKey:@"tag"];
  NSString *message = [options objectForKey:@"message"];
  NSString *level = [options objectForKey:@"level"];
  if (!tag) tag = @"unknow";
  if (!message) message = @"empty";
  if (!level) level = @"verbose";
  NSLog(@"[%@/%@] %@", tag, level, message);
}

#pragma mark - 深色模式获取

- (UIViewController *)getCurrentVCFrom:(UIViewController *)rootVC
{
  UIViewController *currentVC;
  if ([rootVC presentedViewController]) {
    rootVC = [rootVC presentedViewController];
  }
  if ([rootVC isKindOfClass:[UITabBarController class]]) {
    // 根视图为UITabBarController
    currentVC = [self getCurrentVCFrom:[(UITabBarController *)rootVC selectedViewController]];
  } else if ([rootVC isKindOfClass:[UINavigationController class]]){
    // 根视图为UINavigationController
    currentVC = [self getCurrentVCFrom:[(UINavigationController *)rootVC visibleViewController]];
  } else {
    // 根视图为非导航类
    currentVC = rootVC;
  }
  return currentVC;
}

//获取当前深色模式状态
RCT_EXPORT_METHOD(getIsDarkMode:(NSDictionary *)options
                  c:(RCTResponseSenderBlock)successCallback)
{
  UIViewController *rootViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
  UIViewController *currentVC = [self getCurrentVCFrom:rootViewController];
  if (@available(iOS 12.0, *)) {
    NSNumber *value = [NSNumber numberWithBool:(currentVC.traitCollection.userInterfaceStyle == UIUserInterfaceStyleDark) ];
    successCallback(@[ value ]);
  } else {
    successCallback(@[ @false ]);
  }
}

#pragma mark - 深色模式更改

//深色模式更改
- (void) onSystemThemeChanged:(NSNotification *)notification {

  if (@available(iOS 12.0, *)) {
    //获取对象，来自 RCTRootView.m
    //https://github.com/facebook/react-native/blob/main/React/Base/RCTRootView.m#L386
    UITraitCollection * traitCollection = [[notification userInfo]  objectForKey:RCTUserInterfaceStyleDidChangeNotificationTraitCollectionKey];
    //发送消息到JS
    [self sendEventWithName:@"onThemeChanged" body:@{
      @"theme": traitCollection.userInterfaceStyle == UIUserInterfaceStyleDark ? @"dark" : @"light"
    }];
  } else {
    [self sendEventWithName:@"onThemeChanged" body:@{
      @"theme": @"light"
    }];
  }
}

//开启深色模式消息接收
RCT_EXPORT_METHOD(addSystemThemeChangedListener)
{
  if (!self.isListenedStyleDidChangeNotification) {
    self.isListenedStyleDidChangeNotification = TRUE;

    [[NSNotificationCenter defaultCenter] addObserver:self
                                            selector:@selector(onSystemThemeChanged:)
                                                name:RCTUserInterfaceStyleDidChangeNotification object:nil];
  }
}

#pragma mark - 字体宽度计算

RCT_EXPORT_METHOD(measureText:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    float height = [RCTConvert float:options[@"height"]];
    CGFloat fontSize = [RCTConvert CGFloat:options[@"fontSize"]];
    NSString *text = [RCTConvert NSString:options[@"text"]];
    NSString *fontFamily = [RCTConvert NSString:options[@"fontFamily"]];
    NSString *fontWeight = [RCTConvert NSString:options[@"fontWeight"]];
    
    UIFont *font = [self getFont:fontFamily size:fontSize weight:fontWeight];
    NSTextContainer *textContainer = [[NSTextContainer alloc] initWithSize: CGSizeMake(FLT_MAX, height)];
    CGRect resultRect = [self fitText:text withFont:font container:textContainer];

    resolve([NSNumber numberWithFloat:resultRect.size.width]);
}


- (CGRect)fitText:(NSString*)text withFont:(UIFont *)font container:(NSTextContainer *)textContainer {
    NSTextStorage *textStorage = [[NSTextStorage alloc] initWithString:text];
    NSLayoutManager *layoutManager = [[NSLayoutManager alloc] init];

    [layoutManager addTextContainer:textContainer];
    [textStorage addLayoutManager:layoutManager];
    
    [textStorage addAttribute:NSFontAttributeName value:font
                        range:NSMakeRange(0, [textStorage length])];
    [textContainer setLineFragmentPadding:0.0];
    (void) [layoutManager glyphRangeForTextContainer:textContainer];
    return [layoutManager usedRectForTextContainer:textContainer];
}

- (UIFontWeight)convertStringToUIFontWeight:(NSString *)string {
    NSDictionary *weightMapping = @{
        @"ultraLight" : @(UIFontWeightUltraLight),
        @"thin" : @(UIFontWeightThin),
        @"light" : @(UIFontWeightLight),
        @"regular" : @(UIFontWeightRegular),
        @"medium" : @(UIFontWeightMedium),
        @"semibold" : @(UIFontWeightSemibold),
        @"bold" : @(UIFontWeightBold),
        @"heavy" : @(UIFontWeightHeavy),
        @"black" : @(UIFontWeightBlack)
    };
    
    NSNumber *weightNumber = weightMapping[string.lowercaseString];
    if (weightNumber) {
        return (UIFontWeight)weightNumber.doubleValue;
    } else {
        return UIFontWeightRegular; // 默认返回普通字体权重
    }
}

- (UIFont *)getFont:(NSString *)fontFamily size:(CGFloat)fontSize weight:(NSString*)fontWeight {
    if (fontWeight == nil) {
        fontWeight = @"normal";
    };
    
    UIFontWeight fontWeightFloat = [self convertStringToUIFontWeight:fontWeight];
    
    if (fontFamily == nil) {
        return [UIFont systemFontOfSize:fontSize weight:fontWeightFloat];
    }
    UIFont *customFont = [UIFont fontWithName:fontFamily size:fontSize];
    if (customFont) {
        return customFont;
    } else {
        return [UIFont systemFontOfSize:17];
    }
}

@end
