//
//  RCTAudio.h
//  NeteaseJukebox
//
//  Created by 刘聪 on 16/8/14.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "STKAudioPlayer.h"

@interface RCTAudio : NSObject<RCTBridgeModule, STKAudioPlayerDelegate>

@end
