import { EventEmitter, Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { LogginService } from "./LoggingService.service";
import { Persona } from "./persona.model";

@Injectable()
export class PersonasService{

    personas:Persona[] = [];
        
    saludar = new EventEmitter<number>();
    constructor(private logginService:LogginService,
        private dataService:DataService){

    }

    setPersonas(personas:Persona[]){
        this.personas = personas;
    }

    obtenerPersonas(){
        return this.dataService.cargarPersonas();
    }

    agregarPersona(persona:Persona){
        this.logginService.enviamensajeAConsola("agregamos persona"+persona.nombre);
        if(this.personas == null){
            this.personas = [];
        }
        this.personas.push(persona);
        this.dataService.guardarPersonas(this.personas);

    }
    encontrarPersona(index: number){
        let persona:Persona = this.personas[index];
        return persona;
    }
    modificarPersonas(index: number, persona:Persona){
        let persona1:Persona = this.personas[index];
        persona1.nombre = persona.nombre;
        persona1.apellido = persona.apellido;
        this.dataService.modificarPersona(index, persona);
        //this.personas[index] = persona;
    }
    eliminarPersona(index: number){
        this.personas.splice(index, 1);
        this.dataService.eliminarPersona(index);
        //Regenerar Indices
        this.modificarPersonass()
    }
    modificarPersonass(){
        if(this.personas != null){
            this.dataService.guardarPersonas(this.personas);
        }
    }
}