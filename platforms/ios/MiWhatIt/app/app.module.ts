import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

//router
import { router } from './shared/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

//components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { CreateUserComponent } from './login/create.user.component';
import { ChatListadoComponent } from './chats/listado.component';
import { ChatComponent } from './chat/chat.component';


import firebase = require("nativescript-plugin-firebase");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
  (instance) => {
    console.log("firebase.init done");
  },
  (error) => {
    console.log("firebase.init error: " + error);
  }
);

@NgModule({
    declarations: [
            AppComponent,
            LoginComponent,
            CreateUserComponent,
            ChatListadoComponent,
            ChatComponent
        ],
    bootstrap: [AppComponent],
    imports: [
            NativeScriptModule,
            NativeScriptFormsModule,
            NativeScriptRouterModule,
            NativeScriptRouterModule.forRoot(router)
            ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
