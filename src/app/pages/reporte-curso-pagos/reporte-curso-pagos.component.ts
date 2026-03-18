import { Component, OnInit } from '@angular/core';
import { CabeceraReportePagosComponent } from '../cabecera-reporte-pagos/cabecera-reporte-pagos.component';
import { SmartTableComponent } from '../../shared/components/smart-table/smart-table.component';
import { ReportePagoCursosService } from '../../services/reporte-pago-cursos.service';
import { ReportePagoCursoData } from '../../interfaces/pago-curso-reporte-data';
import { TableColumn } from '../../interfaces/table-column.data';


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
    { clave: 'fechapago', etiqueta: 'Fechapago', tipo: 'date', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'montoTotalPago', etiqueta: 'Total', tipo: 'number', ordenable: true, filtrable: true, visible: true, sumable: true },
    { clave: 'estado', etiqueta: 'Estado', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'pagoCodigoMedioDePago', etiqueta: 'P. codigo pago', tipo: 'text', ordenable: true, filtrable: true, visible: false, sumable: false },
    { clave: 'pagoCursoCodigoInscripcion', etiqueta: 'P. codigo inscripcion', tipo: 'text', ordenable: true, filtrable: false, visible: false, sumable: false },
    { clave: 'usuarioregistra', etiqueta: 'Usuario registra', tipo: 'text', ordenable: true, filtrable: true, visible: true, sumable: false },
    { clave: 'usuariomodifica', etiqueta: 'Usuario midifica', tipo: 'text', ordenable: true, filtrable: true, visible: false, sumable: false },
    { clave: 'fechadeultimamodificacion', etiqueta: 'Fec. midificación', tipo: 'date', ordenable: true, filtrable: false, visible: false, sumable: false },
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
  constructor(private _reportePagoCursoService: ReportePagoCursosService) {

  }
  ngOnInit(): void {
    const hoy = new Date();
    this.obtenerReporte(hoy, hoy);
  }
  manejarFiltroFechas(formValue: any) {
    const { fechaInicio, fechaFin } = formValue;
    if (fechaInicio && fechaFin) {
      this.obtenerReporte(fechaInicio, fechaFin);
    }
  }

  obtenerReporte(fechaInicio: Date, fechaFin: Date) {
    this._reportePagoCursoService.obtenerPagos(fechaInicio, fechaFin).subscribe(data => {
      this.dataReporte = data;
    })
  }


}
