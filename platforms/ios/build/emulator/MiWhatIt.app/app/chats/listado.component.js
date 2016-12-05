"use strict";
var core_1 = require('@angular/core');
var router_1 = require('nativescript-angular/router');
var ChatListadoComponent = (function () {
    function ChatListadoComponent(routerExt) {
        this.routerExt = routerExt;
    }
    ChatListadoComponent.prototype.ngOnInit = function () {
        this.mockChat = [{
                "nombre": "Grupo de chat de nativeScript",
                "usuarios": {
                    "usuario_1": "jorgeucano",
                    "usuario_2": "jorgeucano2",
                    "usuario_3": "jorgeucano3"
                },
                "creacion": "12/12/2016",
                "dialogo": {
                    "date": "12/12/2016",
                    "texto": "Hola alguien vio la clase?",
                    "usuario": "jorgeucano",
                    "recibio": {
                        "usuario_1": "jorgeucano",
                        "usuario_2": "jorgeucano3"
                    }
                }
            },
            {
                "nombre": "otro chat",
                "usuarios": {
                    "usuario_1": "jorgeucano",
                    "usuario_2": "jorgeucano2",
                    "usuario_3": "jorgeucano3"
                },
                "creacion": "12/12/2016",
                "dialogo": {
                    "date": "12/12/2016",
                    "texto": "Hola alguien vio la clase?",
                    "usuario": "jorgeucano",
                    "recibio": {
                        "usuario_1": "jorgeucano",
                        "usuario_2": "jorgeucano3"
                    }
                }
            },
            {
                "nombre": "Jorge CAno",
                "usuarios": {
                    "usuario_1": "jorgeucano",
                    "usuario_2": "jorgeucano2",
                    "usuario_3": "jorgeucano3"
                },
                "creacion": "12/12/2016",
                "dialogo": {
                    "date": "12/12/2016",
                    "texto": "Hola alguien vio la clase?",
                    "usuario": "jorgeucano",
                    "recibio": {
                        "usuario_1": "jorgeucano",
                        "usuario_2": "jorgeucano3"
                    }
                }
            },
            {
                "nombre": "nativescript",
                "usuarios": {
                    "usuario_1": "jorgeucano",
                    "usuario_2": "jorgeucano2",
                    "usuario_3": "jorgeucano3"
                },
                "creacion": "12/12/2016",
                "dialogo": {
                    "date": "12/12/2016",
                    "texto": "Hola alguien vio la clase?",
                    "usuario": "jorgeucano",
                    "recibio": {
                        "usuario_1": "jorgeucano",
                        "usuario_2": "jorgeucano3"
                    }
                }
            }];
        console.dir(this.mockChat);
    };
    ChatListadoComponent.prototype.login = function () {
        this.routerExt.navigate(["/listadoChat"], {
            transition: {
                name: "flip",
                duration: 500,
                curve: "linear"
            }
        });
    };
    ChatListadoComponent = __decorate([
        core_1.Component({
            selector: 'chat-listado',
            templateUrl: 'chats/listado.component.html',
            styleUrls: ['chats/listado.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.RouterExtensions])
    ], ChatListadoComponent);
    return ChatListadoComponent;
}());
exports.ChatListadoComponent = ChatListadoComponent;
//# sourceMappingURL=listado.component.js.map