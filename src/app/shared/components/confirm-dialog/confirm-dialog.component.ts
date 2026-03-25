import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Validadores } from '../../validators/myvalidators';
export interface ConfirmData {
  titulo: string;
  mensaje: string;
  placeholder?: string;
  botonConfirmar: string;
  colorConfirmar: 'primary' | 'warn';
  requiereMotivo: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  motivoControl = new FormControl('', [Validators.required, Validators.minLength(5), Validadores.sinEspacios]);
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData) {

  }

  cancelar() {
    this.dialogRef.close(null);
  }

  confirmar() {
    if (this.data.requiereMotivo && this.motivoControl.invalid) return;
    this.dialogRef.close({
      confirmado: true,
      motivo: this.motivoControl.value
    })
  }
}
