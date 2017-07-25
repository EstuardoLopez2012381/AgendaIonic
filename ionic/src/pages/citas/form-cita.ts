import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CitaService } from "../../app/Services/CitaService";
import { ContactoService } from "../../app/Services/ContactoService";
import { CitasPage } from "./citas";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-citas',
  templateUrl: 'form-cita.html',
})

export class FormCitasPage {
    private encabezado:string
    private parametro:any
    private citaTemp:any = {idCita: 0 , fecha: "", lugar: "", asunto: "", idContacto: 0, detalle: ""}

  constructor(private _contacto:ContactoService, private toast:ToastController, public alertCtrl: AlertController,public _cita:CitaService,public navCtrl: NavController, public navParams: NavParams) {
    this.parametro =this.navParams.get("parametro")
    if(this.parametro != "nuevo"){
        this.encabezado = "Detalles de la Cita"
        console.log(this.parametro);
        
        this._cita.getACita(this.parametro).toPromise()
        .then(res=>{
            this.citaTemp = res[0]
            console.log(this.citaTemp);
        })
        .catch(res=>{
            console.log(res);
        })
    }else{
        this.encabezado = "Nueva Cita"
    }
    this._contacto.getContacto().subscribe();
}

  public guardar(){
      console.log(this.citaTemp);
      
      this._cita.insertCita(this.citaTemp.fecha, this.citaTemp.lugar, this.citaTemp.asunto, this.citaTemp.idContacto, this.citaTemp.descripcion, (res)=>{
        this.toast.create({
            message: (res)? "Se agrego una cita" : "No se pudo agregar la cita" ,
            duration: 2300
        }).present()
        if(res){
            this.navCtrl.popTo(CitasPage)
        }else{
            this.citaTemp.idCita = "" ;
            this.citaTemp.fecha = "";
            this.citaTemp.lugar = "";
            this.citaTemp.asunto = "";
            this.citaTemp.idContacto = "";
            this.citaTemp.descripcion ="";
            
        }
      });
  } 
 

  public eliminar(){ 
    let prompt = this.alertCtrl.create({
      title: 'Eliminar',
      message: `¿Desea eliminar la categoria ${this.citaTemp.nombre}?` ,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this._cita.deleteCita(this.citaTemp.idCita, (res)=>{
                this.toast.create({
                    message: (res)? "Se elimino una cita" : "No se pudo edito la cita" ,
                    duration: 2300
                }).present() 
                if(res){
                    this.navCtrl.popTo(CitasPage)
                }else{
                    this.citaTemp.idCita = "" ;
                    this.citaTemp.fecha = "";
                    this.citaTemp.lugar = "";
                    this.citaTemp.asunto = "";
                    this.citaTemp.idContacto = "";
                    this.citaTemp.descripcion ="";
                }
            })
          }
        }]})
         prompt.present();
    }
}