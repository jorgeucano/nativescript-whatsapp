"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ChatComponent = (function () {
    function ChatComponent(router) {
        var _this = this;
        this.router = router;
        this.router.params
            .forEach(function (params) { _this.id = +params['id']; });
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.mockChat = [{
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
            }];
    };
    ChatComponent.prototype.addText = function () {
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'chat',
            templateUrl: 'chat/chat.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map