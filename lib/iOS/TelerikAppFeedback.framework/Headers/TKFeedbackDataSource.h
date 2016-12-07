//
//  TKFeedbackRepository.h
//  TelerikUI
//
//  Copyright (c) 2014 Telerik. All rights reserved.
//

#import "TKFeedbackItem.h"

/**
 The data source protocol used to provide feedback service and storage.
 */
@protocol TKFeedbackDataSource <NSObject>

/**
 Contains the user name.
 */
@property (nonatomic, copy) NSString *userName;

/**
 Returns async the feedback items from the data source provider.
 @param handler The completion handler to call when the get operation is complete.
 */
- (void)feedbackItems:(void (^)(NSArray *items, NSError *error))handler;

/**
 Adds async the feedback item to the data source provider.
 @param item The feedback item
 @param handler The completion handler to call when the add operation is complete.
 */
- (void)addFeedback:(TKFeedbackItem *)item completionHandler:(void (^)(NSError *error))handler;

/**
 Adds async the specified feedback items to the data source provider.
 @param feedbackItems The feedback item list
 @param handler The completion handler to call when the add operation is complete.
 */
- (void)addFeedbackItems:(NSArray *)feedbackItems completionHandler:(void (^)(NSError *))handler;

/**
 Edits async the feedback item in the data source provider.
 @param key The feedback item key
 @param state The feedback item state
 @param handler The completion handler to call when the edit operation is complete.
 */
- (void)editWithKey:(NSString *)key state:(NSString *)state completionHandler:(void (^)(NSError *error))handler;

/**
 Deletes async the feedback item from the data source provider.
 @param key The feedback item key
 @param handler The completion handler to call when the delete operation is complete.
 */
- (void)deleteWithKey:(NSString *)key completionHandler:(void (^)(NSError *error))handler;

@optional

/**
 Contains the user email.
 */
@property (nonatomic, copy) NSString *userEmail;

/**
 Returns async the feedback items filtered by state.
 @param state The feedback item state used to filter data
 @param handler The completion handler to call when the get operation is complete.
 */
- (void)feedbackItemsByState:(NSString *)state completionHandler:(void (^)(NSArray *items, NSError *error))handler;

/**
 Returns async the feedback items filtered by state and skip number of items.
 @param state The feedback item state used to filter data
 @param skip The number of skipped items
 @param handler The completion handler to call when the get operation is complete.
 */
- (void)feedbackItemsByState:(NSString *)state skip:(NSInteger)skip completionHandler:(void (^)(NSArray *, NSError *))handler;

/**
 Returns screenshot image of the feedback item using key.
 @param key The feedback item key
 @param handler The completion handler to call when the image download is complete.
 */
- (void)imageForKey:(NSString *)key completionHandler:(void (^)(UIImage *image, NSError *error))handler;

/**
 Returns async the comment feedback items using a key of item from the data source provider.
 @param key The parent feedback item key
 @param handler The completion handler to call when the get operation for comments is complete.
 */
- (void)subItemsForKey:(NSString *)key completionHandler:(void (^)(NSArray *items, NSError *error))handler;

/**
 Adds async the comment feedback item using a key of item to the data source provider.
 @param key The parent feedback item key
 @param item The comment feedback item
 @param handler The completion handler to call when the add operation for comment is complete.
 */
- (void)addSubItemForKey:(NSString *)key subItem:(TKFeedbackItem *)item completionHandler:(void (^)(NSError *error))handler;

@end



