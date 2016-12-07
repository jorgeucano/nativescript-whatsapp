//
//  TKTabLayoutBase_Protected.h
//  TelerikUI
//
//  Created by Viktor Skarlatov on 10/26/16.
//  Copyright © 2016 Telerik. All rights reserved.
//

#ifndef TKTabLayoutBase_Protected_h
#define TKTabLayoutBase_Protected_h

#import "TKTab.h"
#import <Foundation/Foundation.h>

@interface TKTabLayoutBase ()

@property (strong, nonatomic, readonly) TKTabView *tabView;
@property (strong, nonatomic, readonly) UISwipeGestureRecognizer *leftSwipe;
@property (strong, nonatomic, readonly) UISwipeGestureRecognizer *rightSwipe;
@property (strong, nonatomic, readonly) UISwipeGestureRecognizer *topSwipe;
@property (strong, nonatomic, readonly) UISwipeGestureRecognizer *bottomSwipe;

- (void) updateSelectedTabMarkerForTab: (TKTab *) selectedTab;
@end

#endif /* TKTabLayoutBase_Protected_h */
