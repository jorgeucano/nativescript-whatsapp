import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';

import firebase = require('nativescript-plugin-firebase');

import cameraModule = require("camera");
import imageModule = require("ui/image");

import geolocation = require("nativescript-geolocation");


var admob = require("nativescript-admob");

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

        this.createMiniBanner();

        // chequeo si la persona esta logueada!
        firebase.getCurrentUser().then(
            (user)=>{
                /*this.routerExt.navigate(["/chatListado"],{
                    transition:{
                        name: "flip",
                        duration:500,
                        curve:"linear"
                    }
                });*/
            },
            (error)=>{
                //TNSFancyAlert.showSuccess('Login!', error, 'Entrar!');
            }
        );
    }

    createMiniBanner(){
        admob.createBanner({
            // if this 'view' property is not set, the banner is overlayed on the current top most view
            // view: ..,
            testing: true, // set to false to get real banners
            size: admob.AD_SIZE.SMART_BANNER, // anything in admob.AD_SIZE, like admob.AD_SIZE.SMART_BANNER
            iosBannerId: "ca-app-pub-XXXXXX/YYYYYY", // add your own
            androidBannerId: "ca-app-pub-AAAAAAAA/BBBBBBB", // add your own
            // Android automatically adds the connected device as test device with testing:true, iOS does not
            iosTestDeviceIds: ["yourTestDeviceUDIDs", "canBeAddedHere"],
            margins: {
                // if both are set, top wins
                //top: 10
                bottom: 50
            }
            }).then(
                function() {
                console.log("admob createBanner done");
                },
                function(error) {
                console.log("admob createBanner error: " + error);
                }
        );
    }


    hideBanner(){
        // the .then(.. bit is optional btw
        admob.hideBanner().then(
                function() {
                console.log("admob hideBanner done");
                },
                function(error) {
                console.log("admob hideBanner error: " + error);
                }
        );
    }

    createInterstitial(){
        admob.createInterstitial({
            testing: true,
            iosInterstitialId: "ca-app-pub-XXXXXX/YYYYY2", // add your own
            androidInterstitialId: "ca-app-pub-AAAAAAAA/BBBBBB2", // add your own
            // Android automatically adds the connected device as test device with testing:true, iOS does not
            iosTestDeviceIds: ["ce97330130c9047ce0d4430d37d713b2"]
            }).then(
                function() {
                console.log("admob createInterstitial done");
                },
                function(error) {
                console.log("admob createInterstitial error: " + error);
                }
        )
    };


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