import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions } from '@angular/http';
import { AuthService } from './AuthService';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class ContactoService {
    contactoList:Array<any> = []
    token = window.localStorage.getItem("tkn")
    options =  new RequestOptions({headers: new Headers({"Content-Type":"application/json","authorization":this.token})})

    constructor(private http: Http, private cookie:CookieService) { }
    
    search(data:string){
        if(data ==""){
          this.getContacto().subscribe();
        }else{
          var newList:Array<any>=[]
          for(var i =0;i < this.contactoList.length; i++){
            if(this.contactoList[i].nombreCo.includes(data) || this.contactoList[i].apellido.includes(data)){
                newList.push(this.contactoList[i]);
            }
          }
          this.contactoList = newList;
        }
    }

  getContacto(){
       return this.http.get("http://localhost:3000/api/contacto/ID/"+this.cookie.get("UDI"),this.options).map(response=>{
            this.contactoList=response.json()
        });
    }

    getAContacto(Id:string){
       return this.http.get("http://localhost:3000/api/contacto/"+Id,this.options).map(response=>response.json());
    }
    
    insertContacto(nombreCo:string, apellido:string, telefono:number, correo:string, idCategoria:number,callback){
        this.http.post("http://localhost:3000/api/contacto", {
            nombreCo: nombreCo,
            apellido: apellido,
            telefono: telefono,
            correo: correo,
            idCategoria: idCategoria,
            idUsuario: this.cookie.get("UDI")
        },this.options).toPromise().then((response)=>{
            callback(response.json().Mensaje);
        }).catch((response)=>{
            console.log(response)
            callback(false);});
    }
    
    deleteContacto(ID:number,callback){

        this.http.delete("http://localhost:3000/api/contacto/"+ID+"/"+this.cookie.get("UDI"),this.options)
        .toPromise().then((response)=>{
            callback(response.json().Mensaje);
        }).catch((response)=>{
            console.log(response)
            callback(false);})
    }
}