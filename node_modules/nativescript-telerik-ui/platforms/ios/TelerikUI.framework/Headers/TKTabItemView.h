//
//  TKTabItemView.h
//  TelerikUI
//
//  Created by Viktor Skarlatov on 10/24/16.
//  Copyright © 2016 Telerik. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface TKTabItemView : UIView

@property (strong, nonatomic) UIImageView *imageView;
@property (strong, nonatomic) UILabel *textView;

@property (assign, nonatomic) BOOL selected;

@property (strong, nonatomic) UIImage *selectedImage;
@property (strong, nonatomic) UIImage *deselectedImage;

@property (strong, nonatomic) UIColor *selectedBackgroundColor;
@property (strong, nonatomic) UIColor *deselectedBackgroundColor;

@property (strong, nonatomic) UIColor *selectedForegroundColor;
@property (strong, nonatomic) UIColor *deselectedForegroundColor;

@end
