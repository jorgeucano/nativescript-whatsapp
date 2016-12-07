//
//  Header.h
//  AppFeedback
//
//  Created by Deyan Ginev on 8/16/16.
//  Copyright © 2016 Telerik. All rights reserved.
//

#import <Foundation/Foundation.h>
/**
  Represents a property bag containing property values that are used to adjust the behavior of the TKAppFeedback component.
 */
@interface TKFeedbackSettings : NSObject

/**
 Determines if the Alert window at the end of the feedback process is shown.
 */
@property (nonatomic) BOOL showFeedbackSentAlert;

/**
 Determines the title of the Alert window shown at the end of the feedback process.
 */
@property (nonatomic) NSString* feedbackSentAlertTitle;

/**
 Determines the text of the Alert window shown at the end of the feedback process.
 */
@property (nonatomic) NSString* feedbackSentAlertText;

/**
 Determines the title of the feedback window.
 */
@property (nonatomic) NSString* feedbackTitle;

/**
 Determines the text displayed in the button which starts the feedback procedure.
 */
@property (nonatomic) NSString* feedbackMenuSendCaption;

/**
 Determines the text displayed in the button which opens the settings menu of the AppFeedback component.
 */
@property (nonatomic) NSString* feedbackMenuSettingsCaption;

/**
 Determines the text of the button which shows the current feedback items.
 */
@property (nonatomic) NSString* feedbackMenuMyFeedbackCaption;

@end
