import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { DateValidators } from '../../../shared/validators/datevalidators';
import { GrupomiembroService } from '../../../services/grupomiembro.service';
import { GrupoMiembroModel } from '../../../models/GrupoMiembro';
import { AsistenciaService } from '../../../services/asistencia.service';
import { AsistenciasMiembrosData } from '../../../interfaces/asistencias-miembros-report';
import { TableColumn } from '../../../interfaces/table-column.data';
import { SmartTableComponent } from '../../../shared/components/smart-table/smart-table.component';

@Component({
  selector: 'app-lista-asistencias',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    SmartTableComponent
  ],
  templateUrl: './lista-asistencias.component.html',
  styleUrl: './lista-asistencias.component.scss'
})
export class ListaAsistenciasComponent implements OnInit {

  columnas: TableColumn<AsistenciasMiembrosData>[] = [
    { clave: 'dni', etiqueta: 'DNI', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'nombrescompleto', etiqueta: 'Nombre completo', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'totalAsistencias', etiqueta: 'Asistencia total', tipo: 'number', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'totalFaltas', etiqueta: 'Faltas', tipo: 'number', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'totalSesiones', etiqueta: 'Total clases', tipo: 'number', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'porcentajeAsistencia', etiqueta: 'asistencia en %', tipo: 'number', ordenable: true, filtrable: true, visible: true, sumable: false },
  ]


  filtroForm!: FormGroup;
  private fb = inject(FormBuilder);
  grupos: GrupoMiembroModel[] = [];
  asistencias: AsistenciasMiembrosData[] = [];
  cargandoGrupo: boolean = false;
  cargandoReporte: boolean = false;
  constructor(
    private _gruposService: GrupomiembroService,
    private _asistenciasMiembros: AsistenciaService,
  ) {

  }
  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      fechaInicio: [new Date, [Validators.required, DateValidators.fechasOrdenadas]],
      fechaFin: [new Date, [Validators.required, DateValidators.fechasOrdenadas]],
      idgruposmiembro: [null],

    })
    this.obtenerGrupos();
  }
  buscar() {
    if (this.filtroForm.invalid) {
      return console.log("No cumple los criterios para obtner el reporte de asistencias");
    }
    const { fechaInicio, fechaFin, idgruposmiembro } = this.filtroForm.value;
    this.obtenerReporteDeAsistencias(fechaInicio, fechaFin, idgruposmiembro);



  }

  obtenerReporteDeAsistencias(fechaInicio: Date, fechaFin: Date, codigoGrupo?: string) {
    this.cargandoReporte = true;
    this._asistenciasMiembros.reporteDeAsistenciaPorFecha(fechaInicio, fechaFin, codigoGrupo).subscribe(data => {
      this.asistencias = data;
      this.cargandoReporte = false;
      console.log(data, "esto es el reporte encontrado");
    });
  }

  obtenerGrupos() {
    this.cargandoGrupo = true;
    this._gruposService.obtenerGrupos().subscribe(grupos => {
      this.grupos = grupos;
      this.cargandoGrupo = false;
    })

  }

  limpiarGrupo() {
    const idGrupoControl = this.filtroForm.get('idgruposmiembro');
    if (idGrupoControl) {
      idGrupoControl.setValue(null);
    }
  }
}
