import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material.imports';
import { MatTabsModule } from '@angular/material/tabs';
import { ListaGeneralEstudiantesComponent } from '../lista-general-estudiantes/lista-general-estudiantes.component';
import { ReporteCursoPagosComponent } from '../reporte-curso-pagos/reporte-curso-pagos.component';
import { ReporteMembresiaPagosComponent } from '../reporte-membresia-pagos/reporte-membresia-pagos.component';
import { ReportePagoDetalladoMembresiaComponent } from '../reporte-pago-detallado-membresia/reporte-pago-detallado-membresia.component';


@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS,
    MatTabsModule,
    ListaGeneralEstudiantesComponent,
    ReporteCursoPagosComponent,
    ReporteMembresiaPagosComponent,
    ReportePagoDetalladoMembresiaComponent,
  ],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.scss'
})
export class PagosComponent {

}
