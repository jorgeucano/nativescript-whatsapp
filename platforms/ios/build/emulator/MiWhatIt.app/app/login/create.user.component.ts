import { Component } from '@angular/core';

import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector:'create-user',
    template:`
                <StackLayout>
                    <Label class="titulo" text="Create User"></Label>
                    <TextField hint="Email" keyboardType="text" [(ngModel)]="email"
                        autocorrect="false" autocapitalizationType="none"></TextField>
                    <TextField hint="Password" secure="true" [(ngModel)]="password"
                        autocorrect="false" autocapitalizationType="none"></TextField>
                    <Button class="submit-botton" (tap)="create()" text="Crear usuario"></Button>
                </StackLayout>
        `,
    styleUrls:['login/login.component.css']
})
export class CreateUserComponent{

    constructor(private routerExt: RouterExtensions ){}

        create(){
            alert("Create");
            this.routerExt.navigate(["/login"],{
                transition:{
                    name: "flip",
                    duration:500,
                    curve:"linear"
                }
            });
        }
}