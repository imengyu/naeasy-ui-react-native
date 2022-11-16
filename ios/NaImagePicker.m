//
//  NaImagePicker.m
//  RNTest
//
//  Created by roger on 2022/11/16.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NaImagePicker, NSObject)

RCT_EXTERN_METHOD(pick:(NSDictionary *)options successCallback:(RCTResponseSenderBlock)successCallback errorCallback:(RCTResponseSenderBlock)errorCallback)
RCT_EXTERN_METHOD(camera:(NSDictionary *)options successCallback:(RCTResponseSenderBlock)successCallback errorCallback:(RCTResponseSenderBlock)errorCallback)

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
