import { Component, NgZone } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import firebase = require('nativescript-plugin-firebase');

@Component({
    selector:'chat-listado',
    templateUrl: 'chats/listado.component.html',
    styleUrls: ['chats/listado.component.css']
})
export class ChatListadoComponent{

    email:string;
    password:string;


    mockChat:Array<any> = [];

    constructor(private routerExt: RouterExtensions, private ngZone: NgZone ){
        firebase.addChildEventListener((result:any)=>{
            this.ngZone.run(() => {
                this.onQueryEvent(result);
            });
        }, "/chats");


       /* firebase.push(
            '/chats',
            {
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
            }
        ).then(
            function (result) {
                console.log("created key: " + result.key);
            }
        );*/

    }


    onQueryEvent(result:any){
        console.log("Event type: " + result.type);
        console.log("Key: " + result.key);
        console.log("Value: " + JSON.stringify(result.value));
        if(result){
            if(result.error){
                console.dir("error");
            }
            else if (result.value){
                this.mockChat.push(result.value);
            }
        }
    }



    ngOnInit(){
    }

    elegirChat(id){
        this.routerExt.navigate(["/chat", id]);
    }

}