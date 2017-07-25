import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CookieService } from "ngx-cookie"
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  private url:string;
  private headers:Headers;

  constructor(private http:Http, private _cookie:CookieService) {
    this.url = "http://localhost:3000";
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  public autenticar(usuario:any) {
    let uri = `${this.url}/auth/`;
    let data = JSON.stringify(usuario);

    return this.http.post(uri, data, { headers: this.headers})
    .map(res => {
      if(res.json().estado) {
        this.setToken(res.json().token);
        localStorage.setItem("UDI", res.json().idUsuario)
        localStorage.setItem("UNI", res.json().nick)
        this._cookie.put("UDI",res.json().idUsuario)
        this._cookie.put("UNI", res.json().nick)
       
      }
      return res.json();
    });
  }

  private setToken(token:string) {
    localStorage.setItem('TOKEN', token);
  }

  public getToken():string {
    return localStorage.getItem('TOKEN');
  }
}

