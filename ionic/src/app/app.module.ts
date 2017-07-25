import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CookieModule } from "ngx-cookie";

import { ContactoFormPage } from '../pages/contactos/contacto-form';
import { ContactosPage } from '../pages/contactos/contactos';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CategoriasPage } from "../pages/categorias/categorias";
import { FormCategoriasPage } from "../pages/categorias/form-categoria";
import { CitasPage } from "../pages/citas/citas";
import { FormCitasPage } from "../pages/citas/form-cita";

import { CategoriaService } from './services/CategoriaService';
import { CitaService } from './services/CitaService';
import { ContactoService } from './services/ContactoService';
import { TareaService } from './services/TareaService';
import { AuthService } from './services/AuthService';
import { UsuarioServiceService } from './services/UsuarioService';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ContactosPage,
    ContactoFormPage,
    CategoriasPage,
    FormCitasPage,
    CitasPage,
    HomePage,
    TabsPage,
    LoginPage,
    FormCategoriasPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CookieModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactosPage,
    HomePage,
    ContactoFormPage,
    CategoriasPage,
    TabsPage,
    FormCitasPage,
    CitasPage,
    LoginPage,
    FormCategoriasPage
  ],
  providers: [
    StatusBar,
    CategoriaService,
    CitaService,
    ContactoService,
    TareaService,
    AuthService,
    UsuarioServiceService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
