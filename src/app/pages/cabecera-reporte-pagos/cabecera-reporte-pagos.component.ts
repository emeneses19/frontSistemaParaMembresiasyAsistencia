import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-cabecera-reporte-pagos',
  standalone: true,
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule],
  templateUrl: './cabecera-reporte-pagos.component.html',
  styleUrl: './cabecera-reporte-pagos.component.scss'
})
export class CabeceraReportePagosComponent {

}
