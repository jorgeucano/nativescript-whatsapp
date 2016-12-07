"use strict";
var core_1 = require('@angular/core');
var router_1 = require('nativescript-angular/router');
var firebase = require('nativescript-plugin-firebase');
var ChatListadoComponent = (function () {
    function ChatListadoComponent(routerExt, ngZone) {
        var _this = this;
        this.routerExt = routerExt;
        this.ngZone = ngZone;
        this.mockChat = [];
        firebase.addChildEventListener(function (result) {
            _this.ngZone.run(function () {
                _this.onQueryEvent(result);
            });
        }, "/chats");
        firebase.push('/chats', {
            "id": 1,
            "nombre": "Grupo de chat de nativeScript",
            "usuarios": {
                "usuario_1": "jorgeucano",
                "usuario_2": "jorgeucano2",
                "usuario_3": "jorgeucano3"
            },
            "creacion": "12/12/2016",
            "dialogo": [
                {
                    "date": "12/12/2016",
                    "texto": "Hola alguien vio la clase?",
                    "usuario": "jorgeucano",
                    "recibio": {
                        "usuario_1": "jorgeucano2",
                        "usuario_2": "jorgeucano3"
                    }
                },
                {
                    "date": "12/12/2016",
                    "texto": "si yo estuvo genial",
                    "usuario": "jorgeucano2",
                    "recibio": {
                        "usuario_1": "jorgeucano",
                        "usuario_2": "jorgeucano3"
                    }
                }
            ]
        }).then(function (result) {
            console.log("created key: " + result.key);
        });
    }
    ChatListadoComponent.prototype.onQueryEvent = function (result) {
        console.log("Event type: " + result.type);
        console.log("Key: " + result.key);
        console.log("Value: " + JSON.stringify(result.value));
        if (result) {
            if (result.error) {
                console.dir("error");
            }
            else if (result.value) {
                this.mockChat.push(result.value);
            }
        }
    };
    ChatListadoComponent.prototype.ngOnInit = function () {
    };
    ChatListadoComponent.prototype.elegirChat = function (id) {
        this.routerExt.navigate(["/chat", id]);
    };
    ChatListadoComponent = __decorate([
        core_1.Component({
            selector: 'chat-listado',
            templateUrl: 'chats/listado.component.html',
            styleUrls: ['chats/listado.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.RouterExtensions, core_1.NgZone])
    ], ChatListadoComponent);
    return ChatListadoComponent;
}());
exports.ChatListadoComponent = ChatListadoComponent;
//# sourceMappingURL=listado.component.js.map