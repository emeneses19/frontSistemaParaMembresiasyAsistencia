import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ReporteMembresiaEstudianteData } from '../interfaces/membresia-estudiante-reports';
import { ReporteMembresiasEstudianteService } from './reporte-membresias-estudiante.service';
import { PagoMembresiaService } from './pago-membresia.service';
import { PagoMembresiaPayload } from '../interfaces/pago-membresia';

@Injectable({
  providedIn: 'root'
})
export class MembresiaStoreService {
  private _reporte = new BehaviorSubject<ReporteMembresiaEstudianteData | null>(null);
  reporte$ = this._reporte.asObservable();

  private _cargando = new BehaviorSubject<boolean>(false);
  cargando$ = this._cargando.asObservable();

  private _dniActual: string | null = null;

  constructor(
    private reporteApi: ReporteMembresiasEstudianteService,
    private pagoApi: PagoMembresiaService
  ) { }

  //crear data
  cargar(dni: string) {
    this._cargando.next(true);
    this._dniActual = dni;
    this.reporteApi.obtenerListaMembresiasParaEstudiante(dni).subscribe({
      next: (data) => {
        this._reporte.next(data);
        this._cargando.next(false);
      },
      error: (err) => {
        this._cargando.next(false);
        console.error('Error cargando membresías desde servicio store', err);
      }
    })
  }

  //Procesar el pago
  pagar(payload: PagoMembresiaPayload) {
    return this.pagoApi.procesarPagoMembresia(payload).pipe(
      tap(() => {
        if (this._dniActual)
          this.cargar(this._dniActual);
      })
    )
  }
  limpiar() {
    this._reporte.next(null);
    this._dniActual = null;
  }
}
