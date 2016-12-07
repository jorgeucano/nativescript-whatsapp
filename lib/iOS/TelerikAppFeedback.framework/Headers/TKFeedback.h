//
//  TKFeedback.h
//  TryAppFeed
//
//  Copyright (c) 2014 Telerik. All rights reserved.
//

#import "TKFeedbackSettings.h"

@protocol TKFeedbackDataSource;

@interface TKFeedback : NSObject

+ (id<TKFeedbackDataSource>)dataSource;

+ (void)setDataSource:(id<TKFeedbackDataSource>)dataSource;

+ (void)showFeedback;

+ (void)showFeedback:(UIModalTransitionStyle)transitionStyle;

+ (void)sendFeedback;

+ (BOOL)feedbackIsShown;

+ (TKFeedbackSettings*) feedbackSettings;

@end
