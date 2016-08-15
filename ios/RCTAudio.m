//
//  RCTAudio.m
//  NeteaseJukebox
//
//  Created by 刘聪 on 16/8/14.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTAudio.h"
#import "STKAudioPlayer.h"

@implementation RCTAudio {
  STKAudioPlayer *player;
}

RCT_EXPORT_MODULE();

-(instancetype) init
{
  NSLog(@"init Audio");
  
  if (self = [super init]) {
    player = [[STKAudioPlayer alloc] init];
  }
  
  return self;
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

-(void) dealloc
{
  NSLog(@"dealloc Audio");
  
  [player dispose];
}
@end
