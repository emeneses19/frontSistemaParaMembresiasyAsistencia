import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
const dialog = inject(MatDialog);

  return next(req).pipe(

     catchError((error: HttpErrorResponse) => {
      let errorTitle = 'Error de Conexión';
      let errorMessage = 'No se pudo establecer comunicación con el servidor.';

      if (error.error instanceof ErrorEvent) {
        errorTitle = 'Error de Red Local';
        errorMessage = `Verifique su conexión a internet. Detalle: ${error.error.message}`;
      } else {
        errorTitle = `Error del Servidor (${error.status})`;
        switch (error.status) {
          case 400:
             errorMessage = 'El dato ingresado ya existe';
            break;
          case 401:
            errorMessage = 'Acceso no autorizado. Su sesión ha expirado.';
            break;
          case 404:
            errorMessage = 'El recurso solicitado no existe.';
            break;
          case 500:
            errorMessage = 'Fallo interno del servidor. Por favor, intente más tarde.';
            break;
          default:
            errorMessage = `Ocurrió un error inesperado. Código: ${error.status}`;
        }
      }

      dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true,
        data: {
          title: errorTitle,
          message: errorMessage,
          actionText: 'Aceptar',
        },
      });

      return throwError(() => error);
    })

  );

};
