var commonModule = require("./sidedrawer-common");
var viewModule = require("ui/core/view");
var contentView = require("ui/content-view");
var utils = require("utils/utils");
require("utils/module-merge").merge(commonModule, exports);
////////////////////////////////////////////////
var RadSideDrawer = (function (_super) {
    __extends(RadSideDrawer, _super);
    function RadSideDrawer() {
        _super.call(this);
        this._mainContentHost = new contentView.ContentView();
        this._drawerContentHost = new contentView.ContentView();
        var screen = utils.ios.getter(UIScreen, UIScreen.mainScreen);
        this._ios = TKSideDrawerView.alloc().initWithFrameMainView(screen.bounds, this._mainContentHost.ios);
        this._ios.defaultSideDrawer.content = this._drawerContentHost.ios;
        this._nativeDelegate = TKSideDrawerDelegateImpl.new().initWithOwner(this);
        this._ios.defaultSideDrawer.width = this.drawerContentSize;
        this._ios.defaultSideDrawer.style.blurType = 0;
        this._ios.defaultSideDrawer.headerView = null;
        this._ios.defaultSideDrawer.footerView = null;
        this._addView(this._mainContentHost);
        this._addView(this._drawerContentHost);
        this._ios.defaultSideDrawer.delegate = this._nativeDelegate;
    }
    Object.defineProperty(RadSideDrawer.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawer.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        if (this.showOverNavigation) {
            this._ios.attachDrawerToWindow();
        }
    };
    RadSideDrawer.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
        if (this.showOverNavigation) {
            this._ios.detachDrawerFromWindow();
        }
    };
    //data changed event handlers
    RadSideDrawer.prototype._onDrawerLocationChanged = function (eventData) {
        var newLocation = eventData.newValue;
        if (!eventData.newValue) {
            return;
        }
        this.setDrawerLocation(newLocation);
    };
    RadSideDrawer.prototype._onGesturesEnabledChanged = function (eventData) {
        var newValue = eventData.newValue;
        this.ios.defaultSideDrawer.allowGestures = newValue;
    };
    RadSideDrawer.prototype.setDrawerLocation = function (newLocation) {
        var newLocationToLower = newLocation.toLocaleLowerCase();
        switch (newLocationToLower) {
            case commonModule.SideDrawerLocation.Left.toLocaleLowerCase():
                this._ios.defaultSideDrawer.position = TKSideDrawerPosition.TKSideDrawerPositionLeft;
                break;
            case commonModule.SideDrawerLocation.Right.toLocaleLowerCase():
                this._ios.defaultSideDrawer.position = TKSideDrawerPosition.TKSideDrawerPositionRight;
                break;
            case commonModule.SideDrawerLocation.Top.toLocaleLowerCase():
                this._ios.defaultSideDrawer.position = TKSideDrawerPosition.TKSideDrawerPositionTop;
                break;
            case commonModule.SideDrawerLocation.Bottom.toLocaleLowerCase():
                this._ios.defaultSideDrawer.position = TKSideDrawerPosition.TKSideDrawerPositionBottom;
                break;
        }
    };
    RadSideDrawer.prototype._onDrawerContentSizeChanged = function (eventData) {
        var value = eventData.newValue;
        this._ios.defaultSideDrawer.width = value;
    };
    RadSideDrawer.prototype._onDrawerTransitionChanged = function (eventData) {
        var value = eventData.newValue;
        this._ios.defaultSideDrawer.transition = value.getNativeContent();
    };
    RadSideDrawer.prototype._onMainContentChanged = function (eventData) {
        var drawer = eventData.object;
        var newContent = eventData.newValue;
        if (newContent instanceof viewModule.View) {
            this._removeView(this._mainContentHost);
            drawer._mainContentHost.content = newContent;
            this._addView(this._mainContentHost);
        }
    };
    RadSideDrawer.prototype._onDrawerContentChanged = function (eventData) {
        var drawer = eventData.object;
        var newContent = eventData.newValue;
        if (newContent instanceof viewModule.View) {
            this._removeView(this._drawerContentHost);
            drawer._drawerContentHost.content = newContent;
            this._addView(this._drawerContentHost);
        }
    };
    Object.defineProperty(RadSideDrawer.prototype, "_nativeView", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawer.prototype.closeDrawer = function () {
        if (this._ios) {
            this._ios.defaultSideDrawer.dismiss();
            _super.prototype.closeDrawer.call(this);
        }
    };
    RadSideDrawer.prototype.showDrawer = function () {
        if (this._ios) {
            this._ios.defaultSideDrawer.show();
            _super.prototype.showDrawer.call(this);
        }
    };
    RadSideDrawer.prototype._eachChildView = function (callback) {
        if (this._mainContentHost) {
            callback(this._mainContentHost);
        }
        if (this._drawerContentHost) {
            callback(this._drawerContentHost);
        }
    };
    RadSideDrawer.prototype.onLayout = function (left, top, right, bottom) {
        var width = right - left;
        var height = bottom - top;
        var screenWidth = width;
        var screenHeight = height;
        var screen = utils.ios.getter(UIScreen, UIScreen.mainScreen);
        if (this.showOverNavigation) {
            screenWidth = screen.bounds.size.width;
            screenHeight = screen.bounds.size.height;
        }
        var pos = this._ios.defaultSideDrawer.position;
        if (pos == TKSideDrawerPosition.TKSideDrawerPositionTop || pos == TKSideDrawerPosition.TKSideDrawerPositionBottom) {
            this._drawerContentHost.layout(0, 0, screenWidth, this.drawerContentSize);
        }
        else {
            this._drawerContentHost.layout(0, 0, this.drawerContentSize, screenHeight);
        }
        this._mainContentHost.layout(0, 0, width, height);
    };
    RadSideDrawer.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var pos = this._ios.defaultSideDrawer.position;
        var drawerWidth = widthMeasureSpec;
        var drawerHeight = heightMeasureSpec;
        if (this.showOverNavigation) {
            var screen = utils.ios.getter(UIScreen, UIScreen.mainScreen);
            drawerWidth = utils.layout.makeMeasureSpec(screen.bounds.size.width, utils.layout.EXACTLY);
            drawerHeight = utils.layout.makeMeasureSpec(screen.bounds.size.height, utils.layout.EXACTLY);
        }
        if (pos == TKSideDrawerPosition.TKSideDrawerPositionTop || pos == TKSideDrawerPosition.TKSideDrawerPositionBottom) {
            viewModule.View.measureChild(this, this._drawerContentHost, drawerWidth, utils.layout.makeMeasureSpec(this.drawerContentSize, utils.layout.EXACTLY));
        }
        else {
            viewModule.View.measureChild(this, this._drawerContentHost, utils.layout.makeMeasureSpec(this.drawerContentSize, utils.layout.EXACTLY), drawerHeight);
        }
        var result = viewModule.View.measureChild(this, this._mainContentHost, widthMeasureSpec, heightMeasureSpec);
        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
        var widthAndState = viewModule.View.resolveSizeAndState(result.measuredWidth, width, widthMode, 0);
        var heightAndState = viewModule.View.resolveSizeAndState(result.measuredHeight, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    return RadSideDrawer;
})(commonModule.RadSideDrawer);
exports.RadSideDrawer = RadSideDrawer;
////////////////////////////////////////////////
//              TRANSITIONS
////////////////////////////////////////////////
var FadeTransition = (function (_super) {
    __extends(FadeTransition, _super);
    function FadeTransition() {
        _super.apply(this, arguments);
    }
    FadeTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeFadeIn;
    };
    return FadeTransition;
})(commonModule.DrawerTransitionBase);
exports.FadeTransition = FadeTransition;
var PushTransition = (function (_super) {
    __extends(PushTransition, _super);
    function PushTransition() {
        _super.apply(this, arguments);
    }
    PushTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypePush;
    };
    return PushTransition;
})(commonModule.DrawerTransitionBase);
exports.PushTransition = PushTransition;
var RevealTransition = (function (_super) {
    __extends(RevealTransition, _super);
    function RevealTransition() {
        _super.apply(this, arguments);
    }
    RevealTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeReveal;
    };
    return RevealTransition;
})(commonModule.DrawerTransitionBase);
exports.RevealTransition = RevealTransition;
var ReverseSlideOutTransition = (function (_super) {
    __extends(ReverseSlideOutTransition, _super);
    function ReverseSlideOutTransition() {
        _super.apply(this, arguments);
    }
    ReverseSlideOutTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeReverseSlideOut;
    };
    return ReverseSlideOutTransition;
})(commonModule.DrawerTransitionBase);
exports.ReverseSlideOutTransition = ReverseSlideOutTransition;
var ScaleDownPusherTransition = (function (_super) {
    __extends(ScaleDownPusherTransition, _super);
    function ScaleDownPusherTransition() {
        _super.apply(this, arguments);
    }
    ScaleDownPusherTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeScaleDownPusher;
    };
    return ScaleDownPusherTransition;
})(commonModule.DrawerTransitionBase);
exports.ScaleDownPusherTransition = ScaleDownPusherTransition;
var ScaleUpTransition = (function (_super) {
    __extends(ScaleUpTransition, _super);
    function ScaleUpTransition() {
        _super.apply(this, arguments);
    }
    ScaleUpTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeScaleUp;
    };
    return ScaleUpTransition;
})(commonModule.DrawerTransitionBase);
exports.ScaleUpTransition = ScaleUpTransition;
var SlideAlongTransition = (function (_super) {
    __extends(SlideAlongTransition, _super);
    function SlideAlongTransition() {
        _super.apply(this, arguments);
    }
    SlideAlongTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeSlideAlong;
    };
    return SlideAlongTransition;
})(commonModule.DrawerTransitionBase);
exports.SlideAlongTransition = SlideAlongTransition;
var SlideInOnTopTransition = (function (_super) {
    __extends(SlideInOnTopTransition, _super);
    function SlideInOnTopTransition() {
        _super.apply(this, arguments);
    }
    SlideInOnTopTransition.prototype.getNativeContent = function () {
        return TKSideDrawerTransitionType.TKSideDrawerTransitionTypeSlideInOnTop;
    };
    return SlideInOnTopTransition;
})(commonModule.DrawerTransitionBase);
exports.SlideInOnTopTransition = SlideInOnTopTransition;
////////////////////////////////////////////////
//      Delegate implementation
////////////////////////////////////////////////
var TKSideDrawerDelegateImpl = (function (_super) {
    __extends(TKSideDrawerDelegateImpl, _super);
    function TKSideDrawerDelegateImpl() {
        _super.apply(this, arguments);
    }
    TKSideDrawerDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    TKSideDrawerDelegateImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    TKSideDrawerDelegateImpl.prototype.willShowSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerOpeningEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerOpeningEvent,
                object: this._owner,
                returnValue: false
            };
            this._owner.notify(args);
        }
    };
    ;
    TKSideDrawerDelegateImpl.prototype.didShowSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerOpenedEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerOpenedEvent,
                object: this._owner,
            };
            this._owner.notify(args);
        }
    };
    ;
    TKSideDrawerDelegateImpl.prototype.willDismissSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerClosingEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerClosingEvent,
                object: this._owner,
                returnValue: false
            };
            this._owner.notify(args);
        }
    };
    ;
    TKSideDrawerDelegateImpl.prototype.didDismissSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerClosedEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerClosedEvent,
                object: this._owner,
            };
            this._owner.notify(args);
        }
    };
    ;
    TKSideDrawerDelegateImpl.ObjCProtocols = [TKSideDrawerDelegate];
    return TKSideDrawerDelegateImpl;
})(NSObject);
