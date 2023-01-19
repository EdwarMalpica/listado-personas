import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../persona.model';
import { PersonasService } from '../personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas:Persona[] = [];
  constructor( 
    private personasService:PersonasService,
    private router:Router
    ){}
  ngOnInit(): void {
      this.personasService.obtenerPersonas().subscribe(
        (personas: object) => {
            this.personas = personas as Persona[]
            this.personasService.setPersonas(this.personas);
        }
      );
  }
  agregar(){
    this.router.navigate(['personas/agregar']);
  }
}
