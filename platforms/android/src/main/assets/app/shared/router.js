"use strict";
var login_component_1 = require('../login/login.component');
var create_user_component_1 = require('../login/create.user.component');
var listado_component_1 = require('../chats/listado.component');
var chat_component_1 = require('../chat/chat.component');
exports.router = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "createUser", component: create_user_component_1.CreateUserComponent },
    { path: "chatListado", component: listado_component_1.ChatListadoComponent },
    { path: "chat/:id", component: chat_component_1.ChatComponent }
];
//# sourceMappingURL=router.js.map