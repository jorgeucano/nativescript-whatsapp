//
//  TKFeedbackController.h
//  TryAppFeed
//
//  Copyright (c) 2014 Telerik. All rights reserved.
//

@protocol TKFeedbackDataSource;

/**
 Represents a view controller that should be placed on top of your view controller hierarchy.
 This way it can detect a shake gesture and initiate the feedback process automatically.
 */
@interface TKFeedbackController : UIViewController

/**
 Initializes the feedback controller.
 @param contentController The view controller that can be used as a root view controller in the application.
 */
- (instancetype)initWithContentController:(UIViewController *)contentController;

/**
 The view controller that contain root view controller (read-only).
 */
@property (nonatomic, strong) UIViewController *contentController;

/**
 The data source used to provide the feedback service and storage.
 */
@property (nonatomic, strong) id<TKFeedbackDataSource> dataSource;

/**
 Defines whether the controller’s built-in action sheet will shown on shake the device.
 */
@property (nonatomic) BOOL showOnShake;

/**
 Shows the built-in feedback action sheet ('Send Feedback', 'Your Feedback', 'Settings')
 */
- (void)showFeedback;

/**
 Takes a snapshot of the current application screen and creates a new feedback item ready to be added and sent/saved to the data source provider.
 */
- (void)sendFeedback;

@end
