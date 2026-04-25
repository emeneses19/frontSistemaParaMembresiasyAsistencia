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
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

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
  @Output() codigoSesion = new EventEmitter<string>();
  listaSesionesPaginada: SesionData[] = [];
  tamanioPagina = 6;
  indexPagina = 0;
  totalSesiones = 0;
  readonly dialogLista = inject(MatDialog);
  readonly dialogConfirm = inject(MatDialog);

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

  eliminarsesion(sesion: SesionData) {
    const dialogConfirm = this.dialogConfirm.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        titulo: 'Confirmar',
        mensaje: `¿Estás seguro de deshabilitar sesión: ${sesion.sesionNombre} ?`,
        botonConfirmar: 'Aceptar',
        colorConfirmar: 'warn',
        requiereMotivo: false
      }

    })
    dialogConfirm.afterClosed().subscribe(result => {
      if (result && result.confirmado) {

        this.deshabilitarSesion(sesion.codigoSesion);
      }
    })


  }

  deshabilitarSesion(codigoSesion: string) {
    this.codigoSesion.emit(codigoSesion);

  }


  buscar() {
    if (this.filtroForm.invalid) {
      return console.log('Fechas no validas para buscar');
    } else {
      this.fechas.emit(this.filtroForm.value);
    }

  }


}
