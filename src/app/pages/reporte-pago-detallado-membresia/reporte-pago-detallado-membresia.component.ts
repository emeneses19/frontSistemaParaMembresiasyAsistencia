import { Component, OnInit } from '@angular/core';
import { DetallePagoMembresiaService } from '../../services/detalle-pago-membresia.service';
import { CabeceraReportePagosComponent } from '../cabecera-reporte-pagos/cabecera-reporte-pagos.component';
import { TableColumn } from '../../interfaces/table-column.data';
import { ReporteDetallePagoMembresiaData } from '../../interfaces/detalle-pago-membresia-reporte-data';
import { SmartTableComponent } from '../../shared/components/smart-table/smart-table.component';

@Component({
  selector: 'app-reporte-pago-detallado-membresia',
  standalone: true,
  imports: [
    CabeceraReportePagosComponent,
    SmartTableComponent,

  ],
  templateUrl: './reporte-pago-detallado-membresia.component.html',
  styleUrl: './reporte-pago-detallado-membresia.component.scss'
})
export class ReportePagoDetalladoMembresiaComponent  implements OnInit{
  columnas: TableColumn<ReporteDetallePagoMembresiaData>[] = [
    {clave:'pagoCodigo', etiqueta:'Código', tipo:'text', ordenable:true, filtrable:false, visible:true, sumable:false},
    {clave:'pagoCodMembresia', etiqueta:'Cod. pago Membresia', tipo:'text', ordenable:true, filtrable:true,  visible: true, sumable:false},
    {clave:'detalleCodPago', etiqueta:'Cod.Pago Detalle', tipo:'text', ordenable:true,filtrable:true, visible: true, sumable:false, },
    {clave:'pagoDescripcion', etiqueta:'Descripción', tipo:'text', ordenable:true, filtrable:true, visible: true, sumable:false },
    {clave:'montomembresia', etiqueta:'Importe', tipo:'number', ordenable:true, filtrable:true, visible:true, sumable:true},
    {clave:'detalleadicional', etiqueta:'Detalle', tipo:'text', ordenable:true, filtrable:true, visible:false, sumable:false},
    {clave:'fecha', etiqueta:'Fecha', tipo:'date', ordenable:true, filtrable:false, visible:true, sumable:false, formatoExportar:(fecha)=>fecha?new Date(fecha).toLocaleDateString('es-PE'):''},
    {clave:'serie', etiqueta:'Serie', tipo:'text', ordenable:true, filtrable:true, visible:true, sumable:false},
    {clave:'numeroDoc', etiqueta:'Número', tipo:'text', ordenable:true, filtrable:true,  visible:true, sumable:false},
    {clave:'estado', etiqueta: 'Estado', tipo:'text', ordenable:true, filtrable:true, visible:true, sumable:false},
    {clave:'usuarioregistra', etiqueta:'Usuario registra', tipo:'text', ordenable:true,  visible:true,  filtrable:true, sumable:false},
    {clave:'usuariomodifica', etiqueta:'Usuario modifica', tipo:'text', ordenable:true, filtrable:true, visible:false, sumable:false  },
    {clave:'membresiaCod', etiqueta:'Membresia Cod', tipo:'text', ordenable:true, filtrable:true, visible:false, sumable:false},
    {clave:'dni', etiqueta:'DNI', tipo:'text', ordenable:true, filtrable:true, visible:true, sumable:false},
    {clave:'membresiaDesc', etiqueta:'Desc. membresia', ordenable:false, filtrable:true, visible:false, sumable:false},
    {clave:'estudianteDNI', etiqueta:'Estudiante DNI', ordenable:true, filtrable:true, visible:false, sumable:false},
    {clave:'nombres', etiqueta:'Nombres', ordenable:true, filtrable:true, visible:true, sumable:false},
    {clave:'apellidos', etiqueta:'Apellidos', ordenable:true, filtrable:true, visible:true, sumable:false},
  ]
  dataReporte: ReporteDetallePagoMembresiaData[] = [];


  private fechaInicio!: Date;
  private fechaFin!: Date;

  constructor(private _detallePagoMembresiaService: DetallePagoMembresiaService){

  }
  ngOnInit(): void {
    const hoy = new Date();
    this.fechaInicio = hoy;
    this.fechaFin = hoy;
    this.obtenerReportePorFecha(this.fechaInicio, this.fechaFin);
  }
    manejarFiltroFechas(formValue: any) {
    const { fechaInicio, fechaFin } = formValue;
    if (fechaInicio && fechaFin) {
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.obtenerReportePorFecha(this.fechaInicio, this.fechaFin);

    }
  }

  obtenerReportePorFecha(inicio:Date, fin: Date){
    this._detallePagoMembresiaService.obtenerDetalledePagoMembresiaPorFecha(inicio, fin).subscribe(resultado =>{
      this.dataReporte = resultado;
    })
  }

}
