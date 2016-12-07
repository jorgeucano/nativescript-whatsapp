//
//  TKPlatformFeedbackRepository.h
//  TelerikUI
//
//  Copyright (c) 2014 Telerik. All rights reserved.
//

#import "TKFeedbackDataSource.h"

/**
 The feedback data source implementation for the Telerik Platform AppFeedback service.
 */
@interface TKPlatformFeedbackSource : NSObject<TKFeedbackDataSource>

/**
 Initializes a new instnace of the object.
 @param apiKey The apiKey used to connect with Telerik platform.
 */
- (instancetype)initWithKey:(NSString *)apiKey;

/**
 Initializes a new instnace of the object.
 @param apiKey The apiKey used to connect with Telerik platform.
 @param uid The user id used to connect with Telerik platform.
 */
- (instancetype)initWithKey:(NSString *)apiKey uid:(NSString *)uid;

/*
 Initializes a new instance of the object.
 @param apiKey The apiKey used to connect with Telerik platform.
 @param uid The user id used to connect with Telerik platform.
 @param apiBaseURL The base url to use when connecting with the server.
 @param parameters Key/value pairs that will be appended with every query to the server.
 */
- (instancetype)initWithKey:(NSString *)apiKey uid:(NSString *)uid apiBaseURL:(NSString *)apiBaseUrl parameters:(NSDictionary*)parameters;

/**
 The API key created in the Telerik AppFeedback service for your application.
 */
@property (nonatomic, copy) NSString *apiKey;

/**
 The user ID used to send feedback.
 */
@property (nonatomic, copy) NSString *UID;

/**
 The base URL to use when connecting to the server
 */
@property (nonatomic, copy) NSString *baseURL;

/**
 A dictionary containing additional parameters to sent to the server with every request.
 */
@property (nonatomic, strong) NSDictionary *parameters;

@end
