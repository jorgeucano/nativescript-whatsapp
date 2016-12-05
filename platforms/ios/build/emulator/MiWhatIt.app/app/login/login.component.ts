import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
@Component({
    selector:'login',
    templateUrl: 'login/login.component.html',
    styleUrls: ['login/login.component.css']
})
export class LoginComponent{

    email:string;
    password:string;

    constructor(private routerExt: RouterExtensions ){}

    login(){
        this.routerExt.navigate(["/chatListado"],{
            transition:{
                name: "flip",
                duration:500,
                curve:"linear"
            }
        });
    }

}