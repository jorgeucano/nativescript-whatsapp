"use strict";
var core_1 = require('@angular/core');
var router_1 = require('nativescript-angular/router');
var nativescript_fancyalert_1 = require('nativescript-fancyalert');
var firebase = require('nativescript-plugin-firebase');
var cameraModule = require("camera");
var imageModule = require("ui/image");
var LoginComponent = (function () {
    function LoginComponent(routerExt) {
        this.routerExt = routerExt;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        // chequeo si la persona esta logueada!
        firebase.getCurrentUser().then(function (user) {
            _this.routerExt.navigate(["/chatListado"], {
                transition: {
                    name: "flip",
                    duration: 500,
                    curve: "linear"
                }
            });
        }, function (error) {
            nativescript_fancyalert_1.TNSFancyAlert.showSuccess('Login!', error, 'Entrar!');
        });
    };
    LoginComponent.prototype.takePicture = function () {
        cameraModule.takePicture().then(function (picture) {
            console.log("Result is an image source instance");
            var image = new imageModule.Image();
            image.imageSource = picture;
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            email: this.email,
            password: this.password
        }).then(function (result) {
            nativescript_fancyalert_1.TNSFancyAlert.showSuccess('Login!', 'Bienvenido de nuevo', 'Entrar!');
            _this.routerExt.navigate(["/chatListado"], {
                transition: {
                    name: "flip",
                    duration: 500,
                    curve: "linear"
                }
            });
        }, function (errorMessage) {
            nativescript_fancyalert_1.TNSFancyAlert.showSuccess('Error!', 'Wow, ocurrio un error.', 'retry');
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