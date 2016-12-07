"use strict";
var applicationModule = require("application");
var imageAssetModule = require("image-asset");
var trace = require("trace");
var platform = require("platform");
var REQUEST_IMAGE_CAPTURE = 3453;
var REQUEST_REQUIRED_PERMISSIONS = 1234;
exports.takePicture = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            if (android.support.v4.content.ContextCompat.checkSelfPermission(applicationModule.android.currentContext, android.Manifest.permission.CAMERA) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
                reject(new Error("Application does not have permissions to use Camera"));
                return;
            }
            var types = require("utils/types");
            var utils = require("utils/utils");
            var saveToGallery_1;
            var reqWidth_1;
            var reqHeight_1;
            var shouldKeepAspectRatio_1;
            var density = utils.layout.getDisplayDensity();
            if (options) {
                saveToGallery_1 = options.saveToGallery ? true : false;
                reqWidth_1 = options.width ? options.width * density : 0;
                reqHeight_1 = options.height ? options.height * density : reqWidth_1;
                shouldKeepAspectRatio_1 = types.isNullOrUndefined(options.keepAspectRatio) ? true : options.keepAspectRatio;
            }
            if (android.support.v4.content.ContextCompat.checkSelfPermission(applicationModule.android.currentContext, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
                saveToGallery_1 = false;
            }
            var takePictureIntent = new android.content.Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
            var dateStamp = createDateTimeStamp();
            var picturePath_1;
            var nativeFile = void 0;
            var tempPictureUri = void 0;
            if (saveToGallery_1) {
                picturePath_1 = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DCIM).getAbsolutePath() + "/Camera/" + "NSIMG_" + dateStamp + ".jpg";
                nativeFile = new java.io.File(picturePath_1);
            }
            else {
                picturePath_1 = utils.ad.getApplicationContext().getExternalFilesDir(null).getAbsolutePath() + "/" + "NSIMG_" + dateStamp + ".jpg";
                nativeFile = new java.io.File(picturePath_1);
            }
            var sdkVersionInt = parseInt(platform.device.sdkVersion);
            if (sdkVersionInt >= 21) {
                tempPictureUri = android.support.v4.content.FileProvider.getUriForFile(applicationModule.android.currentContext, applicationModule.android.nativeApp.getPackageName() + ".provider", nativeFile);
            }
            else {
                tempPictureUri = android.net.Uri.fromFile(nativeFile);
            }
            takePictureIntent.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, tempPictureUri);
            if (takePictureIntent.resolveActivity(utils.ad.getApplicationContext().getPackageManager()) != null) {
                var appModule_1 = require("application");
                var previousResult_1 = appModule_1.android.onActivityResult;
                appModule_1.android.onActivityResult = function (requestCode, resultCode, data) {
                    appModule_1.android.onActivityResult = previousResult_1;
                    if (requestCode === REQUEST_IMAGE_CAPTURE && resultCode === android.app.Activity.RESULT_OK) {
                        if (saveToGallery_1) {
                            try {
                                var callback = new android.media.MediaScannerConnection.OnScanCompletedListener({
                                    onScanCompleted: function (path, uri) {
                                        if (trace.enabled) {
                                            trace.write("image from path " + path + " has been successfully scanned!", trace.categories.Debug);
                                        }
                                    }
                                });
                                android.media.MediaScannerConnection.scanFile(appModule_1.android.context, [picturePath_1], null, callback);
                            }
                            catch (ex) {
                                if (trace.enabled) {
                                    trace.write("An error occurred while scanning file " + picturePath_1 + ": " + ex.message + "!", trace.categories.Debug);
                                }
                            }
                        }
                        ;
                        var asset = new imageAssetModule.ImageAsset(picturePath_1);
                        asset.options = {
                            width: reqWidth_1,
                            height: reqHeight_1,
                            keepAspectRatio: shouldKeepAspectRatio_1
                        };
                        resolve(asset);
                    }
                };
                appModule_1.android.foregroundActivity.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
            }
        }
        catch (e) {
            if (reject) {
                reject(e);
            }
        }
    });
};
exports.isAvailable = function () {
    var utils = require("utils/utils");
    return utils.ad.getApplicationContext().getPackageManager().hasSystemFeature(android.content.pm.PackageManager.FEATURE_CAMERA);
};
exports.requestPermissions = function () {
    if (android.support.v4.content.ContextCompat.checkSelfPermission(applicationModule.android.currentContext, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
        android.support.v4.app.ActivityCompat.requestPermissions(applicationModule.android.currentContext, [android.Manifest.permission.CAMERA, android.Manifest.permission.WRITE_EXTERNAL_STORAGE], REQUEST_REQUIRED_PERMISSIONS);
    }
};
var createDateTimeStamp = function () {
    var result = "";
    var date = new Date();
    result = date.getFullYear().toString() +
        ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) +
        (date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString()) + "_" +
        date.getHours().toString() +
        date.getMinutes().toString() +
        date.getSeconds().toString();
    return result;
};
