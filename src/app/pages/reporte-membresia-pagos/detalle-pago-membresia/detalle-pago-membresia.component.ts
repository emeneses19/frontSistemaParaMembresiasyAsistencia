import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ReportePagoMembresiaData } from '../../../interfaces/pago-membresia-reporte-data';

@Component({
  selector: 'app-detalle-pago-membresia',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIconModule,
    MatDividerModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './detalle-pago-membresia.component.html',
  styleUrl: './detalle-pago-membresia.component.scss'
})
export class DetallePagoMembresiaComponent {
  constructor(
    public dialogRef: MatDialogRef<DetallePagoMembresiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportePagoMembresiaData
  ) {

  }
  previsualizar() {

  }
  compartirWhatsapp() {

  }

}
