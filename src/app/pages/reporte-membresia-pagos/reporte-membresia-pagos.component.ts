import { Component, inject, OnInit } from '@angular/core';
import { CabeceraReportePagosComponent } from '../cabecera-reporte-pagos/cabecera-reporte-pagos.component';
import { SmartTableComponent } from '../../shared/components/smart-table/smart-table.component';
import { TableColumn } from '../../interfaces/table-column.data';
import { ReportePagoMembresiaData } from '../../interfaces/pago-membresia-reporte-data';
import { MatDialog } from '@angular/material/dialog';
import { SuccesDialogService } from '../../services/succes-dialog.service';
import { PagoMembresiaService } from '../../services/pago-membresia.service';
import { DetallePagoMembresiaComponent } from './detalle-pago-membresia/detalle-pago-membresia.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-reporte-membresia-pagos',
  standalone: true,
  imports: [
    CabeceraReportePagosComponent,
    SmartTableComponent
  ],
  templateUrl: './reporte-membresia-pagos.component.html',
  styleUrl: './reporte-membresia-pagos.component.scss'
})
export class ReporteMembresiaPagosComponent implements OnInit {
  columnas: TableColumn<ReportePagoMembresiaData>[] = [
    { clave: 'codigoPago', etiqueta: 'Codigo pago', tipo: 'text', ordenable: true, filtrable: false, visible: true, sumable: false },
    { clave: 'serie', etiqueta: 'Serie', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'numero', etiqueta: 'Doc. serie', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'fecha', etiqueta: 'Fecha pago', tipo: 'date', ordenable: true, filtrable: false, visible: true, sumable: false, formatoExportar:(valor)=>valor ? new Date(valor).toLocaleDateString('es-PE'): '' },
    { clave: 'montotal', etiqueta: 'Total', tipo: 'number', ordenable: true, filtrable: true, visible: true, sumable: true },
    { clave: 'observacion', etiqueta: 'Observación', tipo: 'text', ordenable: true, filtrable: true, visible: false, sumable: false },
    { clave: 'pagoCodMetoPago', etiqueta: 'Pago Cod. método', tipo: 'text', ordenable: true, filtrable: false, visible: false, sumable: false },
    { clave: 'estado', etiqueta: 'Estado', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'usuarioregistra', etiqueta: 'Cod. usuario registra', tipo: 'text', ordenable: true, filtrable: true, visible: false, sumable: false },
    { clave: 'usuariomodifica', etiqueta: 'Cod. usuario modifica', tipo: 'text', ordenable: true, filtrable: true, visible: false, sumable: false },
    { clave: 'fechahoraregistro', etiqueta: 'Fec. hora registro', tipo: 'date', ordenable: true, filtrable: false, visible: false, sumable: false, formatoExportar:(valor)=>valor ? new Date(valor).toLocaleDateString('es-PE'): '' },
    { clave: 'fechaultimaactualizacion', etiqueta: 'Fec. actualización', tipo: 'date', ordenable: true, filtrable: false, visible: false, sumable: false, formatoExportar:(valor)=>valor ? new Date(valor).toLocaleDateString('es-PE'): '' },
    { clave: 'metodoPagoCodigo', etiqueta: 'Cod. método pago', tipo: 'text', ordenable: true, filtrable: false, visible: false, sumable: false },
    { clave: 'metodoPagoNombre', etiqueta: 'Método pago', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'metodoPagoDescripcion', etiqueta: 'Método pago desc.', tipo: 'text', ordenable: true, filtrable: false, visible: false, sumable: false },
    { clave: 'dni', etiqueta: 'DNI', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'nombres', etiqueta: 'Nombres', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'apellidos', etiqueta: 'Apellidos', tipo: 'text', ordenable: true, filtrable: true, visible: false, sumable: false },
    { clave: 'descripcionmembresia', etiqueta: 'M. descripción', tipo: 'text', ordenable: false, filtrable: false, visible: false, sumable: false },
  ];

  dataReporte: ReportePagoMembresiaData[] = [];
  readonly dialog = inject(MatDialog);
  private dialogSuccesService = inject(SuccesDialogService);
  private fechaInicio!: Date;
  private fechaFin!: Date;
  constructor(
    private _pagoMembresiaService: PagoMembresiaService
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
    this._pagoMembresiaService.obtenerRegistroPagoPorFecha(fechaInicio, fechaFin).subscribe(data => {
      this.dataReporte = data;
    })
  }
  manejarEventoTabla(evento: { accion: string, fila: ReportePagoMembresiaData }) {
    if (evento.accion === 'ver') {
      this.abrirDialogDetallePago(evento.fila);
    }
  }

  abrirDialogDetallePago(datosFila: ReportePagoMembresiaData) {
    const dialogRef = this.dialog.open(DetallePagoMembresiaComponent, {
      width: '600px',
      data: datosFila,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'anular') {
        this.abrirConfirmacionAnulacion(datosFila);
      }
    })
  }

  abrirConfirmacionAnulacion(pago: ReportePagoMembresiaData) {
    const dialogConfirm = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      data: {
        titulo: 'Confirmar Anulación',
        mensaje: `¿Estás seguro de anular el pago ${pago.serie}-${pago.numero}?`,
        botonConfirmar: 'Anular',
        colorConfirmar: 'warn',
        requiereMotivo: false
      }
    });
    dialogConfirm.afterClosed().subscribe(result => {
      if (result && result.confirmado) {
        this.procesarAnulacion(pago.codigoPago); //falta
      }
    })

  }

  procesarAnulacion(idPago: string) {
    this._pagoMembresiaService.anularPagoMembresia(idPago, 'Anulado').subscribe({
      next: (res) => {
        console.log('Pago anulado con éxito', res);
        this.dialogSuccesService.openSuccessDialog('Correcto', '¡Registro anulado correctamente!', 'Aceptar');
        this.obtenerReporte(this.fechaInicio, this.fechaFin);

      },
      error: (err) => {
        return console.log('Error al anular el pago: ', err);
      }
    })

  }


}
