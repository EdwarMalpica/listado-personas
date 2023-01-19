import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { LoginService } from './login/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titulo = 'Listado de Personas';


  constructor(private loginService:LoginService){}


  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyC08kvRTCo1UcsC0Q7QMqRCTHs_pbniNm0",
      authDomain: "listado-personas-e39e6.firebaseapp.com",
    })
  }
  isAutenticado(){
      return this.loginService.isAutenticado();
  }

  salir(){
    this.loginService.logout();
  }
 
    /*personaAgregada(persona:Persona){
        //this.logginService.enviamensajeAConsola("Enviamos a la persona "+ persona.nombre)
        //this.personas.push(persona);
      this.personasService.agregarPersona(persona);
    }
    */
}
