import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccesDialogData } from '../interfaces/succes-dialog-data';
import { Observable } from 'rxjs';
import { SuccesDialogComponent } from '../shared/components/succes-dialog/succes-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SuccesDialogService {
  private dialog = inject(MatDialog);


  constructor() { }
  openSuccessDialog(
    title: string,
    message: string,
    actionText: string = 'Aceptar'
  ): Observable<any> {
    
    // Configuramos los datos a pasar al diálogo
    const dialogData: SuccesDialogData = { title, message, actionText };

    const dialogRef = this.dialog.open(SuccesDialogComponent, {
      width: '350px', // Ancho fijo para diálogos pequeños
      data: dialogData, // Pasamos los datos
      disableClose: true // Opcional: Evita que el usuario cierre haciendo clic fuera
    });

    // Retornamos un Observable que se emite cuando el diálogo se cierra
    return dialogRef.afterClosed();
  }
}
