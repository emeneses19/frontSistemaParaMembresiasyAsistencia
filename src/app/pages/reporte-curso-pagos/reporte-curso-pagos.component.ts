import { Component } from '@angular/core';
import { CabeceraReportePagosComponent } from '../cabecera-reporte-pagos/cabecera-reporte-pagos.component';
import { CursoPagosComponent } from './curso-pagos/curso-pagos.component';

@Component({
  selector: 'app-reporte-curso-pagos',
  standalone: true,
  imports: [
    CabeceraReportePagosComponent,
    CursoPagosComponent
  ],
  templateUrl: './reporte-curso-pagos.component.html',
  styleUrl: './reporte-curso-pagos.component.scss'
})
export class ReporteCursoPagosComponent {

}
