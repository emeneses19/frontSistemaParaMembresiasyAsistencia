import { ErrorHandler, inject, Injectable, Injector, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {  
   constructor(
    private _dialogError: MatDialog,
    private _ngZone: NgZone
  ) {}

  handleError(error: any): void {
    let errorMessage = 'Ha ocurrido un fallo inesperado en la aplicación.';

    if(error  && error.message){
      errorMessage = `Detalle: ${error.message}`;
    }
    console.error('Error global capturado (Runtime):', error);

    this._ngZone.run(() => {
        this._dialogError.open(ErrorDialogComponent);
    });
  }
}
