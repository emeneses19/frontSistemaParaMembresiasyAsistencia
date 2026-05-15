import { Component, inject, OnInit } from '@angular/core';
import { CabeceraReportePagosComponent } from '../cabecera-reporte-pagos/cabecera-reporte-pagos.component';
import { SmartTableComponent } from '../../shared/components/smart-table/smart-table.component';
import { ReportePagoCursosService } from '../../services/reporte-pago-cursos.service';
import { ReportePagoCursoData } from '../../interfaces/pago-curso-reporte-data';
import { TableColumn } from '../../interfaces/table-column.data';
import { MatDialog } from '@angular/material/dialog';
import { DetalleComponent } from './detalle/detalle.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { PagoCursoService } from '../../services/pago-curso.service';
import { SuccesDialogService } from '../../services/succes-dialog.service';


@Component({
  selector: 'app-reporte-curso-pagos',
  standalone: true,
  imports: [
    CabeceraReportePagosComponent,
    SmartTableComponent,
  ],
  templateUrl: './reporte-curso-pagos.component.html',
  styleUrl: './reporte-curso-pagos.component.scss'
})
export class ReporteCursoPagosComponent implements OnInit {

  columnas: TableColumn<ReportePagoCursoData>[] = [
    { clave: 'serie', etiqueta: 'Doc. serie', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'numerocorrelativo', etiqueta: 'Doc. número', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'fechapago', etiqueta: 'Fechapago', tipo: 'date', ordenable: true, filtrable: false, visible: true, sumable: false, formatoExportar:(valor)=>valor ? new Date(valor).toLocaleDateString('es-PE'): ''  },
    { clave: 'montoTotalPago', etiqueta: 'Total', tipo: 'currency', ordenable: true, filtrable: true, visible: true, sumable: true },
    { clave: 'estado', etiqueta: 'Estado', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'pagoCodigoMedioDePago', etiqueta: 'P. codigo pago', tipo: 'text', ordenable: true, filtrable: true, visible: false, sumable: false },
    { clave: 'pagoCursoCodigoInscripcion', etiqueta: 'P. codigo inscripcion', tipo: 'text', ordenable: true, filtrable: false, visible: false, sumable: false },
    { clave: 'usuarioregistra', etiqueta: 'Usuario registra', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'usuariomodifica', etiqueta: 'Usuario midifica', tipo: 'text', ordenable: true, filtrable: true, visible: false, sumable: false },
    { clave: 'fechadeultimamodificacion', etiqueta: 'Fec. midificación', tipo: 'date', ordenable: true, filtrable: false, visible: false, sumable: false,  formatoExportar:(valor)=>valor ? new Date(valor).toLocaleDateString('es-PE'): ''},
    { clave: 'observaciones', etiqueta: 'Observaciones', tipo: 'text', ordenable: false, filtrable: true, visible: false, sumable: false },
    { clave: 'medioDePagoCodigo', etiqueta: 'Medio p. codigo', tipo: 'text', ordenable: false, filtrable: false, visible: false, sumable: false },
    { clave: 'medioDePagoNombre', etiqueta: 'Medio de pago', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'inscripcionCodigo', etiqueta: 'Cod. inscripción', tipo: 'text', ordenable: false, filtrable: true, visible: false, sumable: false },
    { clave: 'dni', etiqueta: 'DNI', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'nombres', etiqueta: 'Nombres', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'apellidos', etiqueta: 'Apellidos', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'cursoCodigo', etiqueta: 'Cod. curso', tipo: 'text', ordenable: true, filtrable: false, visible: false, sumable: false },
    { clave: 'cursoNombre', etiqueta: 'Curso nombre', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'periodoCodigo', etiqueta: 'Cod. periodo', tipo: 'text', ordenable: true, filtrable: true, visible: false, sumable: false },
    { clave: 'periodoNombre', etiqueta: 'Periodo nombre', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },

  ]
  dataReporte: ReportePagoCursoData[] = [];
  readonly dialog = inject(MatDialog);
  private dialogServiceSucces = inject(SuccesDialogService);
  private fechaInicio!: Date;
  private fechaFin!: Date;
  constructor(
    private _pagoCursosService: PagoCursoService

  ) {

  }
  ngOnInit(): void {
    const hoy = new Date();
    this.fechaInicio = hoy;
    this.fechaFin = hoy;
    this.obtenerReporte(this.fechaInicio, this.fechaFin);
  }
  manejarFiltroFechas(formValue: any) {
    const { fechaInicio, fechaFin } = formValue;
    if (fechaInicio && fechaFin) {
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.obtenerReporte(this.fechaInicio, this.fechaFin);
    }
  }

  obtenerReporte(fechaInicio: Date, fechaFin: Date) {
    this._pagoCursosService.obtenerPagos(fechaInicio, fechaFin).subscribe(data => {
      this.dataReporte = data;
    })
  }

  //para ver el detalle de pago

  manejarEventoTabla(evento: { accion: string, fila: ReportePagoCursoData }) {
    if (evento.accion === 'ver') {
      console.log(evento.fila, 'Imprimiendon desde padre la fila');
      this.abrirDialogDetallePago(evento.fila);
    }
  }

  abrirDialogDetallePago(datosFila: ReportePagoCursoData) {
    const dialogRef = this.dialog.open(DetalleComponent, {
      width: '600px',
      data: datosFila,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'anular') {
        this.abrirConfirmacionAnulacion(datosFila);
      }
    })
  }
  abrirConfirmacionAnulacion(pago: ReportePagoCursoData) {
    const dialogConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      data: {
        titulo: 'Confirmar Anulación',
        mensaje: `¿Estás seguro de anular el pago ${pago.serie}-${pago.numerocorrelativo}?`,
        botonConfirmar: 'Anular',
        colorConfirmar: 'warn',
        requiereMotivo: false
      }
    });
    dialogConfirm.afterClosed().subscribe(resultado => {
      if (resultado && resultado.confirmado) {
        this.procesarAnulacion(pago.idPpagocurso);
      }
    })
  }
  procesarAnulacion(id: string) {
    this._pagoCursosService.anularPagoCurso(id, "Anulado").subscribe({
      next: (res) => {
        console.log('Pago anulado con éxito', res);
        this.dialogServiceSucces.openSuccessDialog('Correcto', 'Regsitro anulado con éxito');
        this.obtenerReporte(this.fechaInicio, this.fechaFin);

      },
      error: (err) => {
        console.error('Error al anular:', err);
      }
    })
  }





}
