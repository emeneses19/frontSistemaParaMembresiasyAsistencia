import { Component, inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import { PeriodoComponent } from '../periodo/periodo.component';
import { AreaComponent } from '../area/area.component';
import { A11yModule } from "@angular/cdk/a11y";
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { CargoComponent } from '../cargo/cargo.component';
import { GrupomiembroComponent } from '../grupomiembro/grupomiembro.component';
import { MetodopagoComponent } from '../metodopago/metodopago.component';

@Component({
  selector: 'app-auxiliar',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    MatCardModule,
    A11yModule
],
  templateUrl: './auxiliar.component.html',
  styleUrl: './auxiliar.component.scss'
})
export class AuxiliarComponent {
   readonly dialog = inject(MatDialog);

  constructor(){

  }
  irAPeriodo(){
    this.dialog.open(PeriodoComponent)
  }

  irAArea(){
    this.dialog.open(AreaComponent);
  }
  irACargo(){
    this.dialog.open(CargoComponent);
  }
  irAGrupoMiembro(){
    this.dialog.open(GrupomiembroComponent);
  }
  irAMetodoPago(){
    this.dialog.open(MetodopagoComponent);
  }

  

}
