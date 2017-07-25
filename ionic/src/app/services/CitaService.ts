import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from "ngx-cookie"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CitaService {
    constructor(private _http: Http, private _cookie:CookieService) { }

    token = window.localStorage.getItem("tkn")
    options =  new RequestOptions({headers: new Headers({"Content-Type":"application/json","authorization":this.token})})

    public citaList:Array<any>= [];

    getCitas(){
        return this._http.get("http://localhost:3000/api/citas/ID/"+this._cookie.get("UDI"),this.options).map(res=>this.citaList=res.json())
    }

    getACita(ID:string){
        return this._http.get("http://localhost:3000/api/citas/"+ID, this.options).map(res=>res.json());
    }

    insertCita(fecha:string, lugar:string, asunto:string, idContacto:string, detalle:string,  callback){
        var data = {fecha: fecha, lugar: lugar, asunto: asunto,idContacto: idContacto, detalle:detalle,  idUsuario: this._cookie.get("UDI")}
        console.log(data);
        
        this._http.post("http://localhost:3000/api/citas/", data, this.options).toPromise()
         .then(res=>{
            callback(res.json().Mensaje)
         })
         .catch(res=>{
            console.log(res.json())
            callback(false)
         })
    }


    deleteCita(idCita:number, callback){
        this._http.delete("http://localhost:3000/api/citas/"+idCita, this.options).toPromise()
         .then(res=>{
              console.log(res.json());
            callback(res.json().Mensaje)
         })
         .catch(res=>{
            console.log(res.json())
            callback(false)
         })
    }
}