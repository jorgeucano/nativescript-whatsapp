var common = require('./drawerpage-common');
var DrawerPage = (function (_super) {
    __extends(DrawerPage, _super);
    function DrawerPage() {
        _super.call(this);
    }
    DrawerPage.prototype._addViewToNativeVisualTree = function (child, atIndex) {
        if (child == this._drawer) {
            return true;
        }
        return _super.prototype._addViewToNativeVisualTree.call(this, child, atIndex);
    };
    DrawerPage.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        if (this.sideDrawer) {
            this.sideDrawer.ios.attachDrawerToWindow();
        }
    };
    DrawerPage.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
        if (this.sideDrawer) {
            this.sideDrawer.ios.detachDrawerFromWindow();
        }
    };
    DrawerPage.prototype.onLayout = function (left, top, right, bottom) {
        _super.prototype.onLayout.call(this, left, top, right, bottom);
        if (!this.sideDrawer) {
            return;
        }
        this.sideDrawer.onLayout(left, top, right, bottom);
    };
    DrawerPage.prototype.onNavigatingFrom = function (isBackNavigation) {
        _super.prototype.onNavigatingFrom.call(this, isBackNavigation);
        if (this.sideDrawer) {
            this.sideDrawer.closeDrawer();
        }
    };
    DrawerPage.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        _super.prototype.onMeasure.call(this, widthMeasureSpec, heightMeasureSpec);
        if (!this.sideDrawer) {
            return;
        }
        this.sideDrawer.onMeasure(widthMeasureSpec, heightMeasureSpec);
    };
    DrawerPage.prototype._eachChildView = function (callback) {
        _super.prototype._eachChildView.call(this, callback);
        if (this.sideDrawer) {
            callback(this.sideDrawer);
        }
    };
    return DrawerPage;
})(common.DrawerPage);
exports.DrawerPage = DrawerPage;
