//
//  TKTabOverflowLayout.h
//  TelerikUI
//
//  Created by Viktor Skarlatov on 10/4/16.
//  Copyright © 2016 Telerik. All rights reserved.
//

#import "TKTabLayoutBase.h"

@interface TKTabOverflowLayout : TKTabLayoutBase
@property (strong, nonatomic, readonly) UIButton *overflowButton;
@property (strong, nonatomic, readonly) UIView *overflowPopup;
@end
