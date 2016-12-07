//
//  TelerikAppFeedback.h
//  TelerikAppFeedback
//
//  Copyright (c) 2013 Telerik. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface TelerikAppFeedback : NSObject

+ (NSString*)versionString;

@end

#import "TKFeedbackController.h"
#import "TKFeedbackDataSource.h"
#import "TKPlatformFeedbackSource.h"
#import "TKFeedbackItem.h"
#import "TKFeedback.h"