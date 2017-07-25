import { Injectable } from '@angular/core';
import {Http, Request,RequestOptions,Headers} from '@angular/http'
import {CookieService} from "ngx-cookie"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriaService {
    categoriaList: Array<any> = []
    prioridadList: Array<any> = []

    private HEADER = new RequestOptions({headers: new Headers({"Content-Type":"application/json","authorization":window.localStorage.getItem("tkn")})});

    constructor(private _cookie:CookieService, private _http:Http) { }
    
    getCategorias(){
        return this._http.get("http://localhost:3000/api/categoria/ID/"+this._cookie.get("UDI"),this.HEADER).map(res=> {this.categoriaList= res.json();})
    }
    
    getACategorias(id:string){
        return this._http.get("http://localhost:3000/api/categoria/"+id,this.HEADER).map(res=>res.json())
    }

    insertCategoria(nombreCa:string, callback){
        this._http.post("http://localhost:3000/api/categoria", {nombreCa: nombreCa, idUsuario: this._cookie.get("UDI")},this.HEADER)
        .toPromise().then(res =>{
            callback(res.json().Mensaje)
        }).catch(res=>{
            console.log(res);
            callback(res.json().Mensaje)
        })
    }

    
    deleteCategoria(idCategoria:any, callback){
        this._http.delete("http://localhost:3000/api/categoria/"+idCategoria,this.HEADER)
        .toPromise().then(res =>{
            console.log(res);
            
            callback(res.json().Mensaje)
        }).catch(res=>{
            console.log(res);
            callback(false)
        })
    }

}
