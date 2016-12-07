//
//  TKFeedbackItem.h
//  TelerikUI
//
//  Copyright (c) 2014 Telerik. All rights reserved.
//

/**
 The model of feedback item used to provide feedback service and storage.
 */
@interface TKFeedbackItem : NSObject<NSCoding>

/**
 The feedback item key.
 */
@property (nonatomic, copy) NSString *key;

/**
 The feedback item date of creation.
 */
@property (nonatomic, strong) NSDate *createdAt;

/**
 The feedback item date of modification.
 */
@property (nonatomic, strong) NSDate *modifiedAt;

/**
 The feedback item description text.
 */
@property (nonatomic, copy) NSString *text;

/**
 The feedback item author.
 */
@property (nonatomic, copy) NSString *author;

/**
 The feedback item screenshot image.
 */
@property (nonatomic, strong) UIImage *image;

/**
 The feedback item state ('Open', 'Resolved').
 */
@property (nonatomic, copy) NSString *state;

/**
 The feedback item comments items.
 */
- (NSArray *)subItems;

/**
 Adds a comment feedback item to the subItems collection.
 @param item The comment feedback item
 */
- (void)addSubItem:(TKFeedbackItem *)item;

/**
 Inserts a comment feedback in the subItems collection at the specified index.
 @param item The comment feedback item
 @param index The index.
 */
- (void)insertSubItem:(TKFeedbackItem *)item atIndex:(NSUInteger)index;

@end
