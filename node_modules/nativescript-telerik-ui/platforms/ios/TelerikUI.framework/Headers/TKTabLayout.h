//
//  TKTabLayout.h
//  TelerikUI
//
//  Created by Viktor Skarlatov on 10/6/16.
//  Copyright © 2016 Telerik. All rights reserved.
//

#ifndef TKTabLayout_h
#define TKTabLayout_h

#import <Foundation/Foundation.h>
#import "TKTabView.h"

@class TKTabView;
typedef NS_ENUM(NSInteger, TKTabViewPosition) {
    TKTabViewPositionTop,
    TKTabViewPositionBottom,
    TKTabViewPositionLeft,
    TKTabViewPositionRight
};

typedef NS_ENUM(NSInteger, TKTabAlignment) {
    TKTabAlignmentTop,
    TKTabAlignmentBottom,
    TKTabAlignmentLeft,
    TKTabAlignmentRight,
    TKTabAlignmentCenter,
    TKTabAlignmentStretch
};

@protocol TKTabLayout <NSObject>

@property (assign, nonatomic) TKTabAlignment tabAlignment;
@property (assign, nonatomic) NSInteger tabWidth;
@property (assign, nonatomic) NSInteger tabHeight;
@property (assign, nonatomic) TKTabViewPosition tabsPosition;
@property (strong, nonatomic) UIView *selectedTabMarker;
@property (assign, nonatomic) NSInteger maxVisibleTabs;

- (void) layoutTabsInFrame:(CGRect)frame;
- (void) didAddTab: (TKTab *) tab;
- (void) didRemoveTab: (TKTab *) tab;
- (void) didSelectTab: (TKTab *) selectedTab deselectedTab: (TKTab *) deselectedTab;
- (void) load: (TKTabView *) tabView;
- (void) unload;

@end

#endif /* TKTabLayout_h */
