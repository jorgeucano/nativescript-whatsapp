import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'chat',
    templateUrl: 'chat/chat.component.html'
})
export class ChatComponent{
    id:number;
    mockChat:any;

    constructor(private router: ActivatedRoute){
        this.router.params
                .forEach((params)=>{this.id = +params['id']});
    }

    ngOnInit(){
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

    }

    addText(){
        
    }

}