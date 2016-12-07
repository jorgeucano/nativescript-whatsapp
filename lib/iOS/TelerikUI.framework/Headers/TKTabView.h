//
//  TKTabView.h
//  TelerikUI
//
//  Copyright (c) 2016 Telerik. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TKTab.h"
#import "TKTabLayout.h"

#ifndef TKTAB_VIEW
#define TKTAB_VIEW

@protocol TKTabLayout;
@protocol TKTabViewDelegate <NSObject>

@optional
- (BOOL) tabViewWillSelectTab: (TKTab *) tab;
- (void) tabViewDidSelectTab: (TKTab *) tab;
- (BOOL) tabViewWillDeselectTab: (TKTab *) tab;
- (void) tabViewDidDeselectTab: (TKTab *) tab;

- (UIView *) contentViewForTab: (TKTab *) tab;

@end

@interface TKTabView : UIView

@property (strong, nonatomic) TKTab *selectedTab;
@property (strong, nonatomic) id<TKTabLayout> layout;
@property (strong, nonatomic, readonly) NSArray *tabs;
@property (weak, nonatomic) id<TKTabViewDelegate> delegate;
@property (assign, nonatomic) BOOL disableSwipe;

- (TKTab *) addTabWithTitle: (NSString *) title;
- (TKTab *) addTabWithTitle: (NSString *) title andContentView: (UIView *) contentView;
- (TKTab *) addTabWithTitle: (NSString *) title view: (UIView *) view andContentView: (UIView *) contentView;

- (void) removeTabWithTitle: (NSString *) title;

- (TKTab *) tabWithTitle: (NSString *) title;
- (BOOL) removeTab: (TKTab *) tab;

- (id<TKTabLayout>) resolveLayout;

- (TKTab *) getNextTabFromTab: (TKTab *) tab;
- (TKTab *) getPreviousTabFromTab: (TKTab *) tab;

@end

#endif
