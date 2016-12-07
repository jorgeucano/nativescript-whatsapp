//
//  TKTab.h
//  TelerikUI
//
//  Copyright (c) 2016 Telerik. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TKTabItemView.h"

@interface TKTab : NSObject

- (id) initWithTitle: (NSString *) title andView: (UIView *) view;
- (id) initWithTitle: (NSString *) title;

@property (strong, nonatomic, readonly) NSString *title;
@property (strong, nonatomic, readonly) TKTabItemView *view;
@property (strong, nonatomic) UIView *contentView;

@end
