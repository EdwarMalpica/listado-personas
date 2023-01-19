import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from './persona.model';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient, 
              private loginService:LoginService
    ) { }

  //Cargar Personas
  cargarPersonas(){
    const token = this.loginService.getIdToken();
    return this.httpClient.get('https://listado-personas-e39e6-default-rtdb.firebaseio.com/datos.json?auth='+token);
  }

  //GuardarPersonas 
  guardarPersonas(personas:Persona[]){
    const token = this.loginService.getIdToken();
    this.httpClient.put('https://listado-personas-e39e6-default-rtdb.firebaseio.com/datos.json?auth='+token, personas).subscribe(
      respose => console.log("Resultado guardar Personas: " + respose), 
      error => console.log("Error al guardar Personas: " + error)
    );
  }

  //Modificarpersona 
  modificarPersona(index: number, persona: Persona){
    const token = this.loginService.getIdToken();
    let url:string;
    url = "https://listado-personas-e39e6-default-rtdb.firebaseio.com/datos/"+index+".json?auth="+token;
    this.httpClient.put(url,persona).subscribe(
      response => console.log("Resultado de modificar el objeto persona" + response),
      error => console.log("Error al modificar Persona: " + error)
      
    );
  }

  //Eliminar Persona
  eliminarPersona(index: number){
    const token = this.loginService.getIdToken();
    let url:string;
    url = "https://listado-personas-e39e6-default-rtdb.firebaseio.com/datos/"+index+".json?auth="+token;
    this.httpClient.delete(url).subscribe(
      response => console.log("Resultado de eliminar el objeto persona" + response),
      error => console.log("Error al eliminar Persona: " + error)
      
    );
  }
}
