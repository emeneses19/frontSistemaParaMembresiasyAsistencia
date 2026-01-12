import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-membresia-cuenta',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    MatCardModule,
    MatCheckboxModule
    
  ],
  templateUrl: './membresia-cuenta.component.html',
  styleUrl: './membresia-cuenta.component.scss'
})
export class MembresiaCuentaComponent {
  totalListaMembresias = [];
  tamanioPagina= this.totalListaMembresias.length;
  indexPagina = 0;

  manejarCambioDePagina(event: PageEvent){

  }

}
