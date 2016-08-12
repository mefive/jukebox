//
//  AudioPlayerManager.m
//  NeteaseJukebox
//
//  Created by 刘聪 on 16/8/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "AudioPlayerManager.h"
#import <AVFoundation/AVFoundation.h>

@implementation AudioPlayerManager
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(setPlayBack)
{
  //set audio category with options - for this demo we'll do playback only
  NSError *categoryError = nil;
  [[AVAudioSession sharedInstance] setCategory: AVAudioSessionCategoryPlayback error:&categoryError];

  if (categoryError) {
    RCTLogInfo(@"Error setting category! %@", [categoryError description]);
  }

  //activation of audio session
  NSError *activationError = nil;
  BOOL success = [[AVAudioSession sharedInstance] setActive: YES error: &activationError];
  if (!success) {
    if (activationError) {
      RCTLogInfo(@"Could not activate audio session. %@", [activationError localizedDescription]);
    } else {
      RCTLogInfo(@"audio session could not be activated!");
    }
  }
}
@end
