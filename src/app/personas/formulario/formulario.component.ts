import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throws } from 'assert';
import { LogginService } from '../../LoggingService.service';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor(private logginService:LogginService,
    private personasServices:PersonasService,
    private router:Router,
    private route: ActivatedRoute) { 
      this.personasServices.saludar.subscribe(
        (indice:number) => alert("El indice es:" + indice)
      );
    }

  ngOnInit(): void {
      this.index = this.route.snapshot.params['id'];
      this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];
      if (this.modoEdicion != null && this.modoEdicion === 1){
        let persona: Persona = this.personasServices.encontrarPersona(this.index);
        this.nombreImput = persona.nombre;
        this.apellidoInput = persona.apellido;
      }
  }
  //@Output() personaCreada = new EventEmitter<Persona>();
  nombreImput:string;
  apellidoInput:string;
  index:number;
  modoEdicion:number;
  //@ViewChild('nombreInput') nombreInput:ElementRef;
  //@ViewChild('apellidoInput')apellidoInput:ElementRef;

  onGuardarPersona(){
    let persona1 = new Persona(
      this.nombreImput, 
      this.apellidoInput);
    if(this.modoEdicion != null && this.modoEdicion === 1){
      this.personasServices.modificarPersonas(this.index, persona1);
    }else{
      this.personasServices.agregarPersona(persona1);
      
    }

    //this.logginService.enviamensajeAConsola("Enviamos Persona con nombre: " + persona1.nombre + " Apellido: " + persona1.apellido);
    //this.personaCreada.emit(persona1);
    //this.personas.push(persona1);
    this.router.navigate(['personas']);
  }

  eliminarPersona(){
    if(this.index != null){
      this.personasServices.eliminarPersona(this.index)
    }
    this.router.navigate(['personas']);
  }
}
