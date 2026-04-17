import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ListaSesionesComponent } from './lista-sesiones/lista-sesiones.component';
import { SesionComponent } from './sesion/sesion.component';
import { SesionService } from '../../services/sesion.service';
import { SesionModel } from '../../models/Sesion';
import { SesionData } from '../../interfaces/sesion-report';
import { SuccesDialogService } from '../../services/succes-dialog.service';


@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    MatCardModule,
    MatTabsModule,
    ListaSesionesComponent,
    SesionComponent

  ],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss'
})
export class AsistenciaComponent implements OnInit {
  cargando: boolean = false;
  private fechaInicio!: Date;
  private fechaFin!: Date;
  listaSesiones: SesionData[] = [];
  private _succesDialogService = inject(SuccesDialogService);

  constructor(private _sesionService: SesionService) {

  }
  ngOnInit(): void {
    const hoy = new Date();
    this.fechaFin = hoy;
    this.fechaInicio = hoy;
    this.obtnerSesiones(this.fechaInicio, this.fechaFin);

  }

  manejarFiltroFechas(formValue: any) {
    const { fechaInicio, fechaFin } = formValue;
    if (fechaInicio && fechaFin) {
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.obtnerSesiones(this.fechaInicio, this.fechaFin);

    }
  }
  guardarSesion(sesion: SesionModel) {
    this._sesionService.guardarSesion(sesion).subscribe({
      next: (res) => {
        console.log("Registro de sesion correcto ", res);
        this._succesDialogService.openSuccessDialog('CORRECTO', 'Sesión creada correctamente');
        this.obtnerSesiones(this.fechaInicio, this.fechaFin);
      },
      error: (err) => {
        return console.log("Ocurrio un error al registra ssion ", err);
      }
    })

  }

  obtnerSesiones(fechaInicio: Date, fechaFin: Date) {
    this._sesionService.obtenerSesiones(fechaInicio, fechaFin).subscribe(sesiones => {
      this.listaSesiones = sesiones;
      // console.log("Este es la lista de sesiones: ", this.listaSesiones);

    });
  }



}
