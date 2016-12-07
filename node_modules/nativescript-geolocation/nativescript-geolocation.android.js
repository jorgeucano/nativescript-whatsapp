"use strict";
var appModule = require("application");
var platform = require("platform");
var enums = require("ui/enums");
var timer = require("timer");
var trace = require("trace");
var common = require("./nativescript-geolocation-common");
global.moduleMerge(common, exports);
var locationListeners = {};
var watchId = 0;
var androidLocationManager;
var minTimeUpdate = 1 * 60 * 1000;
var minRangeUpdate = 0;
function getAndroidLocationManager() {
    if (!androidLocationManager) {
        androidLocationManager = appModule.android.context.getSystemService(android.content.Context.LOCATION_SERVICE);
    }
    return androidLocationManager;
}
function createLocationListener(successCallback) {
    var locationListener = new android.location.LocationListener({
        onLocationChanged: function (location1) {
            var locationCallback = this._onLocation;
            if (locationCallback) {
                locationCallback(locationFromAndroidLocation(location1));
            }
        },
        onProviderDisabled: function (provider) {
        },
        onProviderEnabled: function (provider) {
        },
        onStatusChanged: function (arg1, arg2, arg3) {
        }
    });
    watchId++;
    locationListener._onLocation = successCallback;
    locationListener.id = watchId;
    locationListeners[watchId] = locationListener;
    return locationListener;
}
function locationFromAndroidLocation(androidLocation) {
    var location = new common.Location();
    location.latitude = androidLocation.getLatitude();
    location.longitude = androidLocation.getLongitude();
    location.altitude = androidLocation.getAltitude();
    location.horizontalAccuracy = androidLocation.getAccuracy();
    location.verticalAccuracy = androidLocation.getAccuracy();
    location.speed = androidLocation.getSpeed();
    location.direction = androidLocation.getBearing();
    location.timestamp = new Date(androidLocation.getTime());
    location.android = androidLocation;
    return location;
}
function androidLocationFromLocation(location) {
    var androidLocation = new android.location.Location('custom');
    androidLocation.setLatitude(location.latitude);
    androidLocation.setLongitude(location.longitude);
    if (location.altitude) {
        androidLocation.setAltitude(location.altitude);
    }
    if (location.speed) {
        androidLocation.setSpeed(float(location.speed));
    }
    if (location.direction) {
        androidLocation.setBearing(float(location.direction));
    }
    if (location.timestamp) {
        try {
            androidLocation.setTime(long(location.timestamp.getTime()));
        }
        catch (e) {
            console.error('invalid location timestamp');
        }
    }
    return androidLocation;
}
function criteriaFromOptions(options) {
    var criteria = new android.location.Criteria();
    if (options && options.desiredAccuracy <= enums.Accuracy.high) {
        criteria.setAccuracy(android.location.Criteria.ACCURACY_FINE);
    }
    else {
        criteria.setAccuracy(android.location.Criteria.ACCURACY_COARSE);
    }
    return criteria;
}
function watchLocationCore(successCallback, errorCallback, options, locListener) {
    var criteria = criteriaFromOptions(options);
    try {
        var updateTime = (options && typeof options.minimumUpdateTime === "number") ? options.minimumUpdateTime : minTimeUpdate;
        var updateDistance = (options && typeof options.updateDistance === "number") ? options.updateDistance : minRangeUpdate;
        getAndroidLocationManager().requestLocationUpdates(updateTime, updateDistance, criteria, locListener, null);
    }
    catch (e) {
        LocationMonitor.stopLocationMonitoring(locListener.id);
        errorCallback(e);
    }
}
function enableLocationServiceRequest(currentContext, successCallback, successArgs, errorCallback, errorArgs) {
    if (!isEnabled()) {
        var onActivityResultHandler_1 = function (data) {
            appModule.android.off(appModule.AndroidApplication.activityResultEvent, onActivityResultHandler_1);
            if (data.requestCode === 0) {
                if (isEnabled()) {
                    if (successCallback) {
                        successCallback.apply(this, successArgs);
                    }
                }
                else {
                    if (errorCallback) {
                        errorCallback.apply(this, errorArgs);
                    }
                }
            }
            appModule.android.off(appModule.AndroidApplication.activityResultEvent, onActivityResultHandler_1);
        };
        appModule.android.on(appModule.AndroidApplication.activityResultEvent, onActivityResultHandler_1);
        currentContext.startActivityForResult(new android.content.Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS), 0);
    }
    else {
        if (successCallback) {
            successCallback.apply(this, successArgs);
        }
    }
}
function enableLocationRequestCore(successCallback, successArgs, errorCallback, errorArgs) {
    var currentContext = appModule.android.currentContext;
    if (parseInt(platform.device.sdkVersion) >= 23) {
        var activityRequestPermissionsHandler_1 = function (data) {
            console.log('requestCode: ' + data.requestCode + ' permissions: ' + data.permissions + ' grantResults: ' + data.grantResults);
            if (data.requestCode === 5000) {
                if (data.grantResults.length > 0 && data.grantResults[0] == android.content.pm.PackageManager.PERMISSION_GRANTED) {
                    console.log("permission granted!!!");
                    enableLocationServiceRequest(currentContext, successCallback, successArgs, errorCallback, errorArgs);
                }
                else {
                    console.log("permission not granted!!!");
                    if (errorCallback) {
                        errorCallback.apply(this, errorArgs);
                    }
                }
            }
            appModule.android.off(appModule.AndroidApplication.activityRequestPermissionsEvent, activityRequestPermissionsHandler_1);
        };
        appModule.android.on(appModule.AndroidApplication.activityRequestPermissionsEvent, activityRequestPermissionsHandler_1);
        var res = android.support.v4.content.ContextCompat.checkSelfPermission(currentContext, android.Manifest.permission.ACCESS_FINE_LOCATION);
        if (res === -1) {
            android.support.v4.app.ActivityCompat.requestPermissions(currentContext, ['android.permission.ACCESS_FINE_LOCATION'], 5000);
        }
        else {
            enableLocationServiceRequest(currentContext, successCallback, successArgs, errorCallback, errorArgs);
        }
    }
    else {
        enableLocationServiceRequest(currentContext, successCallback, successArgs, errorCallback, errorArgs);
    }
}
function watchLocation(successCallback, errorCallback, options) {
    var locListener = createLocationListener(successCallback);
    if (!isEnabled()) {
        var notGrantedError = new Error("Location service is not enabled or using it is not granted.");
        enableLocationRequestCore(watchLocationCore, [successCallback, errorCallback, options, locListener], errorCallback, [notGrantedError]);
    }
    else {
        watchLocationCore(successCallback, errorCallback, options, locListener);
    }
    return locListener.id;
}
exports.watchLocation = watchLocation;
function getCurrentLocation(options) {
    options = options || {};
    if (options.timeout === 0) {
        return new Promise(function (resolve, reject) {
            var lastLocation = LocationMonitor.getLastKnownLocation();
            if (lastLocation) {
                if (typeof options.maximumAge === "number") {
                    if (lastLocation.timestamp.valueOf() + options.maximumAge > new Date().valueOf()) {
                        resolve(lastLocation);
                    }
                    else {
                        reject(new Error("Last known location too old!"));
                    }
                }
                else {
                    resolve(lastLocation);
                }
            }
            else {
                reject(new Error("There is no last known location!"));
            }
        });
    }
    return new Promise(function (resolve, reject) {
        var timerId;
        var stopTimerAndMonitor = function (locListenerId) {
            if (timerId !== undefined) {
                timer.clearTimeout(timerId);
            }
            LocationMonitor.stopLocationMonitoring(locListenerId);
        };
        var enabledCallback = function (resolve, reject, options) {
            var successCallback = function (location) {
                stopTimerAndMonitor(locListener.id);
                if (options && typeof options.maximumAge === "number") {
                    if (location.timestamp.valueOf() + options.maximumAge > new Date().valueOf()) {
                        resolve(location);
                    }
                    else {
                        reject(new Error("New location is older than requested maximum age!"));
                    }
                }
                else {
                    resolve(location);
                }
            };
            var locListener = LocationMonitor.createListenerWithCallbackAndOptions(successCallback, options);
            try {
                LocationMonitor.startLocationMonitoring(options, locListener);
            }
            catch (e) {
                stopTimerAndMonitor(locListener.id);
                reject(e);
            }
            if (options && typeof options.timeout === "number") {
                timerId = timer.setTimeout(function () {
                    LocationMonitor.stopLocationMonitoring(locListener.id);
                    reject(new Error("Timeout while searching for location!"));
                }, options.timeout || common.defaultGetLocationTimeout);
            }
        };
        var permissionDeniedCallback = function (reject) {
            reject(new Error("Location service is not enabled or using it is not granted."));
        };
        if (!isEnabled()) {
            enableLocationRequestCore(enabledCallback, [resolve, reject, options], permissionDeniedCallback, [reject]);
        }
        else {
            enabledCallback(resolve, reject, options);
        }
    });
}
exports.getCurrentLocation = getCurrentLocation;
function clearWatch(watchId) {
    LocationMonitor.stopLocationMonitoring(watchId);
}
exports.clearWatch = clearWatch;
function enableLocationRequest(always) {
    return new Promise(function (resolve, reject) {
        if (isEnabled()) {
            resolve();
            return;
        }
        var enabledCallback = function (resolve, reject) {
            resolve();
        };
        var permissionDeniedCallback = function (reject) {
            reject(new Error("Location service is not enabled or using it is not granted."));
        };
        enableLocationRequestCore(enabledCallback, [resolve], permissionDeniedCallback, [reject]);
    });
}
exports.enableLocationRequest = enableLocationRequest;
function isEnabled() {
    var criteria = new android.location.Criteria();
    criteria.setAccuracy(android.location.Criteria.ACCURACY_COARSE);
    var enabledProviders = getAndroidLocationManager().getProviders(criteria, true);
    return (enabledProviders.size() > 0) ? true : false;
}
exports.isEnabled = isEnabled;
function distance(loc1, loc2) {
    if (!loc1.android) {
        loc1.android = androidLocationFromLocation(loc1);
    }
    if (!loc2.android) {
        loc2.android = androidLocationFromLocation(loc2);
    }
    return loc1.android.distanceTo(loc2.android);
}
exports.distance = distance;
var LocationMonitor = (function () {
    function LocationMonitor() {
    }
    LocationMonitor.getLastKnownLocation = function () {
        var criteria = new android.location.Criteria();
        criteria.setAccuracy(android.location.Criteria.ACCURACY_COARSE);
        try {
            var iterator = getAndroidLocationManager().getProviders(criteria, false).iterator();
            var androidLocation = void 0;
            while (iterator.hasNext()) {
                var provider = iterator.next();
                var tempLocation = getAndroidLocationManager().getLastKnownLocation(provider);
                if (!androidLocation || tempLocation.getTime() > androidLocation.getTime()) {
                    androidLocation = tempLocation;
                }
            }
            if (androidLocation) {
                return locationFromAndroidLocation(androidLocation);
            }
        }
        catch (e) {
            trace.write("Error: " + e.message, "Error");
        }
        return null;
    };
    LocationMonitor.startLocationMonitoring = function (options, listener) {
        var updateTime = (options && typeof options.minimumUpdateTime === "number") ? options.minimumUpdateTime : minTimeUpdate;
        var updateDistance = (options && typeof options.updateDistance === "number") ? options.updateDistance : minRangeUpdate;
        getAndroidLocationManager().requestLocationUpdates(updateTime, updateDistance, criteriaFromOptions(options), listener, null);
    };
    LocationMonitor.createListenerWithCallbackAndOptions = function (successCallback, options) {
        return createLocationListener(successCallback);
    };
    LocationMonitor.stopLocationMonitoring = function (locListenerId) {
        var listener = locationListeners[locListenerId];
        if (listener) {
            getAndroidLocationManager().removeUpdates(listener);
            delete locationListeners[locListenerId];
        }
    };
    return LocationMonitor;
}());
exports.LocationMonitor = LocationMonitor;
