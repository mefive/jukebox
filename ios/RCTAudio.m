//
//  RCTAudio.m
//  NeteaseJukebox
//
//  Created by 刘聪 on 16/8/14.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTAudio.h"
#import "RCTEventDispatcher.h"
#import "STKAudioPlayer.h"

@implementation RCTAudio {
  STKAudioPlayer *player;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

-(instancetype) init
{
  NSLog(@"init Audio");
  
  if (self = [super init]) {
    player = [[STKAudioPlayer alloc] init];
    [player setDelegate:self];
  }
  
  return self;
}

-(void) dealloc
{
  NSLog(@"dealloc Aduio");
  [player setDelegate:nil];
  [player dispose];
}

RCT_EXPORT_METHOD(play:(NSString *)url)
{
  [player play:url];
}

RCT_EXPORT_METHOD(pause)
{
  [player pause];
}

RCT_EXPORT_METHOD(resume)
{
  [player resume];
}

RCT_EXPORT_METHOD(stop)
{
  [player stop];
}

RCT_EXPORT_METHOD(getCurrentTime: (RCTResponseSenderBlock) callback)
{
  double progress = [player progress];
  callback(@[[NSNull null], @{@"progress": @(progress)}]);
}

#pragma mark - StreamingKit Audio Player

- (void)audioPlayer:(STKAudioPlayer *)player didStartPlayingQueueItemId:(NSObject *)queueItemId
{
  NSLog(@"AudioPlayer is playing");
}

- (void)audioPlayer:(STKAudioPlayer *)player didFinishPlayingQueueItemId:(NSObject *)queueItemId withReason:(STKAudioPlayerStopReason)stopReason andProgress:(double)progress andDuration:(double)duration
{
  NSLog(@"AudioPlayer has stopped");
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent"
                                                  body:@{@"status": @"STOPPED"}];
}

- (void)audioPlayer:(STKAudioPlayer *)player didFinishBufferingSourceWithQueueItemId:(NSObject *)queueItemId
{
  NSLog(@"AudioPlayer finished buffering");
}

- (void)audioPlayer:(STKAudioPlayer *)player stateChanged:(STKAudioPlayerState)state previousState:(STKAudioPlayerState)previousState
{
  NSLog(@"AudioPlayer state has changed");
  switch (state) {
    case STKAudioPlayerStatePlaying: {
      double duration = [player duration];
      [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent"
                                                      body:@{@"status": @"PLAYING", @"duration": @(duration)}];
      break;
    }
      
    case STKAudioPlayerStatePaused:
      [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent"
                                                      body:@{@"status": @"PAUSED"}];
      break;
      
    case STKAudioPlayerStateStopped:
      
      break;
      
    case STKAudioPlayerStateBuffering:
      [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent"
                                                      body:@{@"status": @"BUFFERING"}];
      break;
      
    case STKAudioPlayerStateError:
      [self.bridge.eventDispatcher sendDeviceEventWithName:@"AudioBridgeEvent"
                                                      body:@{@"status": @"ERROR"}];
      break;
      
    default:
      break;
  }
}

- (void)audioPlayer:(STKAudioPlayer *)player unexpectedError:(STKAudioPlayerErrorCode)errorCode {
  NSLog(@"AudioPlayer unexpected Error with code %d", errorCode);
}
@end
