"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var forms_1 = require("nativescript-angular/forms");
//router
var router_1 = require('./shared/router');
var router_2 = require('nativescript-angular/router');
//components
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var create_user_component_1 = require('./login/create.user.component');
var listado_component_1 = require('./chats/listado.component');
var chat_component_1 = require('./chat/chat.component');
var firebase = require("nativescript-plugin-firebase");
var admob = require("nativescript-admob");
firebase.init({}).then(function (instance) {
    console.log("firebase.init done");
}, function (error) {
    console.log("firebase.init error: " + error);
});
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                create_user_component_1.CreateUserComponent,
                listado_component_1.ChatListadoComponent,
                chat_component_1.ChatComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            imports: [
                platform_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                router_2.NativeScriptRouterModule,
                router_2.NativeScriptRouterModule.forRoot(router_1.router)
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map