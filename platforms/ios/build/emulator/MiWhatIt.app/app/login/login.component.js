"use strict";
var core_1 = require('@angular/core');
var router_1 = require('nativescript-angular/router');
var LoginComponent = (function () {
    function LoginComponent(routerExt) {
        this.routerExt = routerExt;
    }
    LoginComponent.prototype.login = function () {
        this.routerExt.navigate(["/chatListado"], {
            transition: {
                name: "flip",
                duration: 500,
                curve: "linear"
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'login/login.component.html',
            styleUrls: ['login/login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.RouterExtensions])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map