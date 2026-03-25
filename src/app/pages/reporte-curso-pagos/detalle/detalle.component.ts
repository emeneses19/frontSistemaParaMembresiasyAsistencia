import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIconModule,
    MatDividerModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent {
  constructor(
    public dialogRef: MatDialogRef<DetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  previsualizar() {

  }
  compartirWhatsapp() {

  }

}
