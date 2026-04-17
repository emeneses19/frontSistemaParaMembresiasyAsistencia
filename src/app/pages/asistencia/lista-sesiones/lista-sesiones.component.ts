import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material.imports';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { SesionModel } from '../../../models/Sesion';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateValidators } from '../../../shared/validators/datevalidators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SesionData } from '../../../interfaces/sesion-report';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LlamarListaComponent } from '../llamar-lista/llamar-lista.component';

@Component({
  selector: 'app-lista-sesiones',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule
  ],
  templateUrl: './lista-sesiones.component.html',
  styleUrl: './lista-sesiones.component.scss'
})
export class ListaSesionesComponent implements OnInit, OnChanges {
  filtroForm!: FormGroup;
  private fb = inject(FormBuilder);
  @Input() listaSesiones: SesionData[] = [];
  @Output() fechas = new EventEmitter<any>();
  listaSesionesPaginada: SesionData[] = [];
  tamanioPagina = 6;
  indexPagina = 0;
  totalSesiones = 0;
  readonly dialogLista = inject(MatDialog);
  ngOnInit(): void {
    this.aplicarPaginacion();
    this.filtroForm = this.fb.group({
      fechaInicio: [new Date, [Validators.required, DateValidators.fechasOrdenadas]],
      fechaFin: [new Date, [Validators.required, DateValidators.fechasOrdenadas]]
    })

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listaSesiones'] && this.listaSesiones) {
      this.totalSesiones = this.listaSesiones.length;
      this.indexPagina = 0;
      this.aplicarPaginacion();
    }

  }

  aplicarPaginacion(): void {
    const inicioIndex = this.indexPagina * this.tamanioPagina;
    const finalIndex = inicioIndex + this.tamanioPagina;
    this.listaSesionesPaginada = this.listaSesiones.slice(inicioIndex, finalIndex);

  }
  manejarCambiosDePagina(event: PageEvent): void {
    this.tamanioPagina = event.pageSize;
    this.indexPagina = event.pageIndex;
    this.aplicarPaginacion();

  }
  VerListaDeEstudiantes(sesionSeleccionada: SesionData) {
    const dialogRef = this.dialogLista.open(LlamarListaComponent, {
      data: sesionSeleccionada,
    })

  }

  eliminarsesion(codigoSesion: string) {

  }
  buscar() {
    if (this.filtroForm.invalid) {
      return console.log('Fechas no validas para buscar');
    } else {
      this.fechas.emit(this.filtroForm.value);
    }

  }


}
