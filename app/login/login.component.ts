import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';

import firebase = require('nativescript-plugin-firebase');

import cameraModule = require("camera");
import imageModule = require("ui/image");

import geolocation = require("nativescript-geolocation");

@Component({
    selector:'login',
    templateUrl: 'login/login.component.html',
    styleUrls: ['login/login.component.css']
})
export class LoginComponent{

    email:string;
    password:string;

    constructor(private routerExt: RouterExtensions ){}

    ngOnInit(){
        // chequeo si la persona esta logueada!
        firebase.getCurrentUser().then(
            (user)=>{
                this.routerExt.navigate(["/chatListado"],{
                    transition:{
                        name: "flip",
                        duration:500,
                        curve:"linear"
                    }
                });
            },
            (error)=>{
                //TNSFancyAlert.showSuccess('Login!', error, 'Entrar!');
            }
        )
    }

    enableLocationTap() { 
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
            this.prenderCoordenadas(1);
        }
        
    }

    prenderCoordenadas(minutos:number){
        geolocation.watchLocation(
        (loc)=>{
            if (loc) {
                console.dir("Latitud: " + loc.latitude);
                console.dir("Longitud: " + loc.longitude);
                console.dir("Speed: " + loc.speed);
            }
        }, 
        (e)=>{
            console.log("Error: " + e.message);
        }, 
        {desiredAccuracy: 3, updateDistance: 10, minimumUpdateTime : 1000 * (minutos * 60)}); // Should update every 20 seconds according to Googe documentation. Not verified.
    }



    takePicture(){
        cameraModule.takePicture().then(
            picture => {
            console.log("Result is an image source instance");
            var image = new imageModule.Image();
            image.imageSource = picture;
            console.dir(image.imageSource);
        });
    }



    login(){
        firebase.login({
            type: firebase.LoginType.PASSWORD,
            email: this.email,
            password: this.password
        }).then(
            (result)=>{
                TNSFancyAlert.showSuccess('Login!', 'Bienvenido de nuevo', 'Entrar!');
                this.routerExt.navigate(["/chatListado"],{
                    transition:{
                        name: "flip",
                        duration:500,
                        curve:"linear"
                    }
                });
            },
            (errorMessage)=>{
                TNSFancyAlert.showError('Error!', 'Wow, ocurrio un error.', 'retry');
            }
        );
    }

}